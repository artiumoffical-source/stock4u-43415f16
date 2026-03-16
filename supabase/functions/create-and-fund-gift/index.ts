import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ALPACA_URL = "https://broker-api.sandbox.alpaca.markets/v1";

const HEBREW_REGEX = /[\u0590-\u05FF]/;

// Israeli ID checksum validation (Luhn-like algorithm)
function isValidIsraeliId(id: string): boolean {
  if (!/^\d{9}$/.test(id)) return false;
  // Reject trivially invalid IDs (all same digit, sequential)
  if (/^(\d)\1{8}$/.test(id)) return false;
  const digits = id.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let num = digits[i] * ((i % 2) + 1);
    if (num > 9) num = Math.floor(num / 10) + (num % 10);
    sum += num;
  }
  return sum % 10 === 0;
}

const userDataSchema = z.object({
  firstName: z.string().min(1).max(100).refine(val => !HEBREW_REGEX.test(val), 'Name must contain English characters only'),
  lastName: z.string().min(1).max(100).refine(val => !HEBREW_REGEX.test(val), 'Name must contain English characters only'),
  email: z.string().email().max(254),
  phone: z.string().min(9).max(15).regex(/^(\+972|05)\d{7,8}$/, 'Phone must be a valid Israeli format (+972... or 05...)'),
  address: z.string().min(2).max(300).refine(val => !HEBREW_REGEX.test(val), 'Address must contain English characters only'),
  city: z.string().min(2).max(100).refine(val => !HEBREW_REGEX.test(val), 'City must contain English characters only'),
  postalCode: z.string().regex(/^\d{5,}$/),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  taxId: z.string().regex(/^\d{9}$/).refine(isValidIsraeliId, 'Israeli ID checksum is invalid'),
  giftId: z.string().uuid('Invalid gift ID'),
  userId: z.string().uuid('Invalid user ID').optional(),
});

// Log an audit entry (never includes sensitive data like taxId/government_id)
async function logAuditEntry(
  supabase: ReturnType<typeof createClient>,
  action: string,
  entityId: string,
  details: Record<string, unknown>
) {
  try {
    await supabase.from('audit_logs').insert({
      action,
      entity_type: 'alpaca_sync',
      entity_id: entityId,
      user_type: 'service',
      details,
    });
  } catch (e) {
    console.error('[audit] Failed to write audit log:', e.message);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userData } = await req.json();
    const validated = userDataSchema.parse(userData);

    const keyId = Deno.env.get("ALPACA_KEY_ID");
    const secretKey = Deno.env.get("ALPACA_SECRET_KEY");
    const firmAccountId = Deno.env.get("ALPACA_FIRM_ACCOUNT_ID");

    if (!keyId || !secretKey || !firmAccountId) {
      throw new Error("Alpaca API credentials not configured");
    }

    const auth = btoa(`${keyId}:${secretKey}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // ─── Verify gift amount from DB (server-side, tamper-proof) ───
    const { data: giftRecord, error: giftError } = await supabase
      .from('gifts')
      .select('total_amount')
      .eq('id', validated.giftId)
      .single();

    if (giftError || !giftRecord) {
      console.error('[create-and-fund-gift] Gift lookup failed:', giftError);
      return new Response(
        JSON.stringify({ success: false, error: 'מתנה לא נמצאה, אנא ודא שהקישור תקין' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const giftAmountNIS = Number(giftRecord.total_amount);

    // ─── Currency conversion: NIS → USD (dynamic rate with fallback) ───
    let usdToIlsRate = 3.10; // fallback rate
    try {
      const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
      if (rateRes.ok) {
        const rateData = await rateRes.json();
        if (rateData?.rates?.ILS) {
          usdToIlsRate = rateData.rates.ILS;
          console.log(`[create-and-fund-gift] Fetched live USD/ILS rate: ${usdToIlsRate}`);
        }
      }
    } catch (e) {
      console.warn('[create-and-fund-gift] Failed to fetch live rate, using fallback:', e.message);
    }
    const giftAmountUSD = Math.round((giftAmountNIS / usdToIlsRate) * 100) / 100;
    console.log(`[create-and-fund-gift] Gift amount: ₪${giftAmountNIS} → $${giftAmountUSD} (USD/ILS rate: ${usdToIlsRate}) for giftId: ${validated.giftId}`);

    // ─── Step 1: Create Alpaca account ───
    const alpacaPayload = {
      contact: {
        email_address: validated.email,
        phone_number: validated.phone,
        street_address: [validated.address],
        city: validated.city,
        postal_code: validated.postalCode,
        country: "ISR",
      },
      identity: {
        given_name: validated.firstName,
        family_name: validated.lastName,
        date_of_birth: validated.dob,
        tax_id: validated.taxId,
        tax_id_type: "ISR_ID",
        country_of_citizenship: "ISR",
        country_of_birth: "ISR",
        country_of_tax_residence: "ISR",
        funding_source: ["employment_income"],
      },
      disclosures: {
        is_control_person: false,
        is_affiliated_exchange_or_finra: false,
        is_politically_exposed: false,
        immediate_family_exposed: false,
      },
      agreements: [
        { agreement: "margin_agreement", signed_at: new Date().toISOString(), ip_address: "0.0.0.0" },
        { agreement: "account_agreement", signed_at: new Date().toISOString(), ip_address: "0.0.0.0" },
        { agreement: "customer_agreement", signed_at: new Date().toISOString(), ip_address: "0.0.0.0" },
      ],
    };

    console.log('[create-and-fund-gift] Creating Alpaca account...');

    const accountResponse = await fetch(`${ALPACA_URL}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Basic ${auth}` },
      body: JSON.stringify(alpacaPayload),
    });

    const account = await accountResponse.json();

    if (!accountResponse.ok) {
      console.error('[create-and-fund-gift] Alpaca error:', JSON.stringify(account));

      const errorStr = JSON.stringify(account).toLowerCase();
      let userMessage = 'חלה שגיאה זמנית בחיבור, אנא נסה שוב בעוד רגע';

      if (errorStr.includes('tax_id')) {
        userMessage = 'מספר תעודת הזהות אינו נראה תקין, אנא וודא שהקלדת מספר נכון';
      } else if (errorStr.includes('ascii') || errorStr.includes('latin')) {
        userMessage = 'שם, כתובת ועיר חייבים להיות באנגלית בלבד (אותיות לטיניות)';
      } else if (errorStr.includes('already exists')) {
        userMessage = 'כבר קיים חשבון עם כתובת האימייל הזו';
      } else if (errorStr.includes('postal') || errorStr.includes('zip')) {
        userMessage = 'מיקוד אינו תקין';
      } else {
        userMessage = `שגיאה: ${account.message || JSON.stringify(account)}`;
      }

      // Audit log the failure (no sensitive data)
      await logAuditEntry(supabase, 'ALPACA_ACCOUNT_CREATION_FAILED', validated.giftId, {
        error: userMessage,
        alpaca_error_code: account?.code || null,
        email: validated.email,
      });

      return new Response(
        JSON.stringify({ success: false, error: userMessage }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const newAccountId = account.id;
    let status = account.status;

    console.log('[create-and-fund-gift] Account created:', newAccountId, 'status:', status);

    // Save to DB
    await supabase.from('alpaca_onboarding').insert({
      first_name: validated.firstName,
      last_name: validated.lastName,
      email: validated.email,
      tax_id: validated.taxId,
      street_address: validated.address,
      city: validated.city,
      postal_code: validated.postalCode,
      date_of_birth: validated.dob,
      alpaca_account_id: newAccountId,
      status: status || 'SUBMITTED',
      gift_id: validated.giftId,
    });

    // ─── Step 2: Poll for ACTIVE status (up to 15 attempts, 4s apart = 60s) ───
    const MAX_POLLS = 15;
    const POLL_INTERVAL_MS = 4000;

    for (let attempt = 1; attempt <= MAX_POLLS; attempt++) {
      console.log(`[create-and-fund-gift] Poll attempt ${attempt}/${MAX_POLLS}, waiting ${POLL_INTERVAL_MS}ms...`);
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));

      const statusCheckResponse = await fetch(`${ALPACA_URL}/accounts/${newAccountId}`, {
        headers: { "Authorization": `Basic ${auth}` },
      });

      if (statusCheckResponse.ok) {
        const refreshed = await statusCheckResponse.json();
        status = refreshed.status;
        console.log(`[create-and-fund-gift] Poll ${attempt}: status = ${status}`);
        if (status === 'ACTIVE') break;
      } else {
        const errText = await statusCheckResponse.text();
        console.warn(`[create-and-fund-gift] Poll ${attempt} failed (${statusCheckResponse.status}): ${errText}`);
      }
    }

    // ─── Step 3: Journal transfer (only if ACTIVE) ───
    let journalData = null;
    let giftSent = false;

    if (status !== 'ACTIVE') {
      console.warn(`[create-and-fund-gift] Account not ACTIVE after polling (status: ${status}). Skipping journal transfer.`);

      await logAuditEntry(supabase, 'ALPACA_ACCOUNT_PENDING', validated.giftId, {
        alpaca_account_id: newAccountId,
        final_status: status,
        message: 'Account not active after polling, will be retried by cron',
      });

      // Create profile with pending sync status (if userId provided)
      if (validated.userId) {
        await supabase.from('profiles').upsert({
          user_id: validated.userId,
          full_name: `${validated.firstName} ${validated.lastName}`,
          phone: validated.phone,
          government_id: null,
          government_id_synced: false,
          alpaca_account_id: newAccountId,
        }, { onConflict: 'user_id' });
      }

      return new Response(
        JSON.stringify({
          success: true,
          accountId: newAccountId,
          accountStatus: status,
          giftSent: false,
          giftAmountNIS,
          giftAmountUSD,
          exchangeRate: usdToIlsRate,
          needsApproval: true,
          message: `החשבון נוצר בהצלחה אך עדיין בסטטוס ${status}. ההפקדה תתבצע לאחר אישור החשבון.`,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Use converted USD amount for Alpaca
    const transferAmount = giftAmountUSD;
    console.log(`[create-and-fund-gift] Attempting journal transfer of $${transferAmount} (₪${giftAmountNIS}) from firm ${firmAccountId} to ${newAccountId}...`);

    const journalResponse = await fetch(`${ALPACA_URL}/journals`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Basic ${auth}` },
      body: JSON.stringify({
        entry_type: "JNLC",
        from_account: firmAccountId,
        to_account: newAccountId,
        amount: String(transferAmount),
        description: `Stock4U Gift for ${validated.firstName} ${validated.lastName} (giftId: ${validated.giftId})`,
      }),
    });

    journalData = await journalResponse.json();
    giftSent = journalResponse.ok;

    console.log(`[create-and-fund-gift] Journal HTTP status: ${journalResponse.status}`);
    console.log(`[create-and-fund-gift] Journal response: ${JSON.stringify(journalData)}`);

    if (!giftSent) {
      console.error(`[create-and-fund-gift] JOURNAL FAILED — Alpaca error code: ${journalData?.code}, message: ${journalData?.message}`);

      await logAuditEntry(supabase, 'ALPACA_JOURNAL_FAILED', validated.giftId, {
        alpaca_account_id: newAccountId,
        journal_error: journalData?.message || 'Unknown',
        amount_usd: transferAmount,
        amount_nis: giftAmountNIS,
      });
    }

    if (giftSent) {
      await supabase.from('alpaca_onboarding')
        .update({ status: 'FUNDED' })
        .eq('alpaca_account_id', newAccountId);

      // Audit success
      await logAuditEntry(supabase, 'ALPACA_GIFT_FUNDED', validated.giftId, {
        alpaca_account_id: newAccountId,
        amount_usd: transferAmount,
        amount_nis: giftAmountNIS,
        exchange_rate: usdToIlsRate,
      });

      // ─── Profile upsert stub (will be wired to auth user_id in Step 2) ───
      // For now, we store the alpaca_account_id linkage. When auth is implemented,
      // the user_id will be set during the magic-link sign-in flow.
      // The government_id is intentionally NOT stored here — it only exists
      // temporarily in alpaca_onboarding and is sent directly to Alpaca.
    }

    return new Response(
      JSON.stringify({
        success: true,
        accountId: newAccountId,
        accountStatus: status,
        giftSent,
        giftAmountNIS,
        giftAmountUSD,
        exchangeRate: usdToIlsRate,
        needsApproval: false,
        journalError: giftSent ? null : (journalData?.message || 'Unknown journal error'),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('[create-and-fund-gift] Error:', error);
    const message = error instanceof z.ZodError
      ? 'נתונים לא תקינים: ' + error.errors.map(e => e.message).join(', ')
      : error.message || 'שגיאה פנימית';

    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});
