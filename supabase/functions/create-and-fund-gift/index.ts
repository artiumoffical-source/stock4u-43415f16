import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ENGLISH_ONLY_REGEX = /^[A-Za-z\s\-'".,:;()0-9/]+$/;

const userDataSchema = z.object({
  firstName: z.string().min(1).max(100).regex(ENGLISH_ONLY_REGEX, 'Name must contain English characters only'),
  lastName: z.string().min(1).max(100).regex(ENGLISH_ONLY_REGEX, 'Name must contain English characters only'),
  email: z.string().email().max(254),
  phone: z.string().min(9).max(15),
  address: z.string().min(2).max(300).regex(ENGLISH_ONLY_REGEX, 'Address must contain English characters only'),
  city: z.string().min(2).max(100).regex(ENGLISH_ONLY_REGEX, 'City must contain English characters only'),
  postalCode: z.string().regex(/^\d{5,}$/),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  taxId: z.string().regex(/^\d{9}$/),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userData } = await req.json();
    const validated = userDataSchema.parse(userData);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const alpacaKeyId = Deno.env.get('ALPACA_KEY_ID');
    const alpacaSecretKey = Deno.env.get('ALPACA_SECRET_KEY');
    const firmAccountId = Deno.env.get('ALPACA_FIRM_ACCOUNT_ID');

    if (!alpacaKeyId || !alpacaSecretKey || !firmAccountId) {
      throw new Error('Alpaca API credentials not configured');
    }

    const basicAuth = btoa(`${alpacaKeyId}:${alpacaSecretKey}`);

    // ─── Step 1: Create Alpaca Brokerage Account ───
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
    const accountResponse = await fetch(
      'https://broker-api.sandbox.alpaca.markets/v1/accounts',
      {
        method: 'POST',
        headers: { 'Authorization': `Basic ${basicAuth}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(alpacaPayload),
      }
    );

    const accountText = await accountResponse.text();
    console.log('[create-and-fund-gift] Alpaca account response:', accountResponse.status, accountText);

    let accountData: any;
    try { accountData = JSON.parse(accountText); } catch { accountData = { raw: accountText }; }

    if (!accountResponse.ok) {
      // Check for ASCII / identity issues
      const errorStr = JSON.stringify(accountData).toLowerCase();
      let userMessage = 'חלה שגיאה זמנית בחיבור, אנא נסה שוב בעוד רגע';
      
      if (errorStr.includes('tax_id')) {
        userMessage = 'מספר תעודת הזהות אינו נראה תקין, אנא וודא שהקלדת מספר נכון';
      } else if (errorStr.includes('given_name') || errorStr.includes('family_name') || errorStr.includes('ascii') || errorStr.includes('latin')) {
        userMessage = 'שם פרטי ושם משפחה חייבים להיות באנגלית בלבד (אותיות לטיניות)';
      } else if (errorStr.includes('city') || errorStr.includes('address') || errorStr.includes('street')) {
        userMessage = 'כתובת ועיר חייבים להיות באנגלית בלבד';
      }

      return new Response(
        JSON.stringify({ success: false, error: userMessage, alpacaStatus: accountResponse.status }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    const alpacaAccountId = accountData.id;
    const accountStatus = accountData.status; // SUBMITTED, APPROVED, ACTION_REQUIRED, etc.

    // ─── Step 2: Store onboarding record ───
    const { data: dbRecord, error: dbError } = await supabase
      .from('alpaca_onboarding')
      .insert({
        first_name: validated.firstName,
        last_name: validated.lastName,
        email: validated.email,
        tax_id: validated.taxId,
        street_address: validated.address,
        city: validated.city,
        postal_code: validated.postalCode,
        date_of_birth: validated.dob,
        alpaca_account_id: alpacaAccountId,
        status: accountStatus || 'SUBMITTED',
      })
      .select()
      .single();

    if (dbError) {
      console.error('[create-and-fund-gift] DB error:', dbError);
    }

    // ─── Step 3: If account is APPROVED, initiate journal transfer ───
    let fundingStatus = 'pending_approval';
    let journalId: string | null = null;
    const giftAmount = 161; // $161 gift

    if (accountStatus === 'APPROVED' || accountStatus === 'ACTIVE') {
      console.log('[create-and-fund-gift] Account approved, initiating journal transfer...');
      
      const journalPayload = {
        from_account: firmAccountId,
        entry_type: "JNLC", // Journal cash
        to_account: alpacaAccountId,
        amount: giftAmount.toString(),
        description: "Stock4U Gift Transfer",
      };

      const journalResponse = await fetch(
        'https://broker-api.sandbox.alpaca.markets/v1/journals',
        {
          method: 'POST',
          headers: { 'Authorization': `Basic ${basicAuth}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(journalPayload),
        }
      );

      const journalText = await journalResponse.text();
      console.log('[create-and-fund-gift] Journal response:', journalResponse.status, journalText);

      if (journalResponse.ok) {
        const journalData = JSON.parse(journalText);
        journalId = journalData.id;
        fundingStatus = journalData.status || 'executed';

        // Update DB record
        if (dbRecord) {
          await supabase
            .from('alpaca_onboarding')
            .update({ status: 'FUNDED' })
            .eq('id', dbRecord.id);
        }
      } else {
        fundingStatus = 'funding_failed';
        console.error('[create-and-fund-gift] Journal failed:', journalText);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        accountId: alpacaAccountId,
        accountStatus,
        fundingStatus,
        journalId,
        giftAmount,
        needsApproval: accountStatus !== 'APPROVED' && accountStatus !== 'ACTIVE',
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
