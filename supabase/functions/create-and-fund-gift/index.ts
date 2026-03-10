import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ALPACA_URL = "https://broker-api.sandbox.alpaca.markets/v1";

const HEBREW_REGEX = /[\u0590-\u05FF]/;

const userDataSchema = z.object({
  firstName: z.string().min(1).max(100).refine(val => !HEBREW_REGEX.test(val), 'Name must contain English characters only'),
  lastName: z.string().min(1).max(100).refine(val => !HEBREW_REGEX.test(val), 'Name must contain English characters only'),
  email: z.string().email().max(254),
  phone: z.string().min(9).max(15),
  address: z.string().min(2).max(300).refine(val => !HEBREW_REGEX.test(val), 'Address must contain English characters only'),
  city: z.string().min(2).max(100).refine(val => !HEBREW_REGEX.test(val), 'City must contain English characters only'),
  postalCode: z.string().regex(/^\d{5,}$/),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  taxId: z.string().regex(/^\d{9}$/),
  giftId: z.string().uuid('Invalid gift ID'),
});

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

    const giftAmount = Number(giftRecord.total_amount);
    console.log(`[create-and-fund-gift] Verified gift amount from DB: $${giftAmount} for giftId: ${validated.giftId}`);

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
        // Show actual Alpaca error for debugging unrecognized issues
        userMessage = `שגיאה: ${account.message || JSON.stringify(account)}`;
      }

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
    });

    // ─── Step 2: Wait 5s then re-check status ───
    console.log('[create-and-fund-gift] Waiting 5 seconds for account approval...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    const statusCheckResponse = await fetch(`${ALPACA_URL}/accounts/${newAccountId}`, {
      headers: { "Authorization": `Basic ${auth}` },
    });
    if (statusCheckResponse.ok) {
      const refreshed = await statusCheckResponse.json();
      console.log('[create-and-fund-gift] Refreshed status:', refreshed.status);
      status = refreshed.status;
    } else {
      console.warn('[create-and-fund-gift] Could not refresh status, proceeding with:', status);
      await statusCheckResponse.text();
    }

    // ─── Step 3: Attempt journal transfer regardless of status ───
    // Use $20 for sandbox testing
    const transferAmount = 20;
    console.log(`[create-and-fund-gift] Attempting journal transfer of $${transferAmount} (status: ${status})...`);

    let journalData = null;
    let giftSent = false;

    const journalResponse = await fetch(`${ALPACA_URL}/journals`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Basic ${auth}` },
      body: JSON.stringify({
        entry_type: "JNLC",
        from_account: firmAccountId,
        to_account: newAccountId,
        amount: String(transferAmount),
        description: `Gift for ${validated.firstName} ${validated.lastName}`,
      }),
    });

    journalData = await journalResponse.json();
    giftSent = journalResponse.ok;

    console.log('[create-and-fund-gift] Journal response status:', journalResponse.status);
    console.log('[create-and-fund-gift] Journal result:', JSON.stringify(journalData));

    if (giftSent) {
      await supabase.from('alpaca_onboarding')
        .update({ status: 'FUNDED' })
        .eq('alpaca_account_id', newAccountId);
    }

    return new Response(
      JSON.stringify({
        success: true,
        accountId: newAccountId,
        accountStatus: status,
        giftSent,
        giftAmount,
        needsApproval: status !== 'APPROVED' && status !== 'ACTIVE',
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
