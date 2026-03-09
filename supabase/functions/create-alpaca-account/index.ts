import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const userDataSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().min(9).max(15),
  address: z.string().min(2).max(300),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(2).max(10),
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

    // Store onboarding record
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
        status: 'PENDING',
      })
      .select()
      .single();

    if (dbError) {
      console.error('DB error:', dbError);
      throw new Error('Failed to create account record: ' + dbError.message);
    }

    // --- Call Alpaca Broker API ---
    const alpacaKeyId = Deno.env.get('ALPACA_KEY_ID');
    const alpacaSecretKey = Deno.env.get('ALPACA_SECRET_KEY');

    if (!alpacaKeyId || !alpacaSecretKey) {
      throw new Error('Alpaca API credentials not configured');
    }

    const basicAuth = btoa(`${alpacaKeyId}:${alpacaSecretKey}`);

    // Build the Alpaca account creation payload
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
        tax_id_type: "NOT_SPECIFIED",
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
        {
          agreement: "margin_agreement",
          signed_at: new Date().toISOString(),
          ip_address: "0.0.0.0",
        },
        {
          agreement: "account_agreement",
          signed_at: new Date().toISOString(),
          ip_address: "0.0.0.0",
        },
        {
          agreement: "customer_agreement",
          signed_at: new Date().toISOString(),
          ip_address: "0.0.0.0",
        },
      ],
    };

    console.log('Sending to Alpaca:', JSON.stringify(alpacaPayload, null, 2));

    const alpacaResponse = await fetch(
      'https://broker-api.sandbox.alpaca.markets/v1/accounts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alpacaPayload),
      }
    );

    const alpacaResponseText = await alpacaResponse.text();
    console.log('Alpaca response status:', alpacaResponse.status);
    console.log('Alpaca response body:', alpacaResponseText);

    let alpacaData: any;
    try {
      alpacaData = JSON.parse(alpacaResponseText);
    } catch {
      alpacaData = { raw: alpacaResponseText };
    }

    if (!alpacaResponse.ok) {
      // Update DB record with error
      await supabase
        .from('alpaca_onboarding')
        .update({ status: 'ALPACA_ERROR' })
        .eq('id', dbRecord.id);

      return new Response(
        JSON.stringify({
          success: false,
          error: `Alpaca API error (${alpacaResponse.status})`,
          alpacaStatus: alpacaResponse.status,
          alpacaError: alpacaData,
          sentPayload: alpacaPayload,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Success - update DB with Alpaca account ID
    const alpacaAccountId = alpacaData.id || null;
    await supabase
      .from('alpaca_onboarding')
      .update({
        alpaca_account_id: alpacaAccountId,
        status: alpacaData.status || 'SUBMITTED',
      })
      .eq('id', dbRecord.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Account created successfully',
        accountId: dbRecord.id,
        alpacaAccountId,
        alpacaStatus: alpacaData.status,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error:', error);
    const message = error instanceof z.ZodError
      ? 'Invalid input data: ' + error.errors.map(e => e.message).join(', ')
      : error.message || 'Internal server error';

    return new Response(
      JSON.stringify({ success: false, error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});
