import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ALPACA_URL = "https://broker-api.sandbox.alpaca.markets/v1";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Find all unfunded accounts
    const { data: pendingAccounts, error: queryError } = await supabase
      .from('alpaca_onboarding')
      .select('id, alpaca_account_id, gift_id, first_name, last_name, status')
      .in('status', ['SUBMITTED', 'PENDING']);

    if (queryError) {
      console.error('[retry-gift-funding] Query error:', queryError);
      throw new Error('Failed to query pending accounts');
    }

    if (!pendingAccounts || pendingAccounts.length === 0) {
      console.log('[retry-gift-funding] No pending accounts found');
      return new Response(
        JSON.stringify({ success: true, processed: 0, message: 'No pending accounts' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[retry-gift-funding] Found ${pendingAccounts.length} pending account(s)`);

    const results: Array<{ accountId: string; giftId: string | null; result: string }> = [];

    for (const account of pendingAccounts) {
      const { alpaca_account_id, gift_id, first_name, last_name } = account;

      if (!alpaca_account_id) {
        results.push({ accountId: 'none', giftId: gift_id, result: 'skipped_no_alpaca_id' });
        continue;
      }

      // Check current Alpaca status
      const statusRes = await fetch(`${ALPACA_URL}/accounts/${alpaca_account_id}`, {
        headers: { "Authorization": `Basic ${auth}` },
      });

      if (!statusRes.ok) {
        const errText = await statusRes.text();
        console.warn(`[retry-gift-funding] Status check failed for ${alpaca_account_id}: ${errText}`);
        results.push({ accountId: alpaca_account_id, giftId: gift_id, result: `status_check_failed` });
        continue;
      }

      const alpacaAccount = await statusRes.json();

      if (alpacaAccount.status !== 'ACTIVE') {
        console.log(`[retry-gift-funding] ${alpaca_account_id} still ${alpacaAccount.status}`);
        results.push({ accountId: alpaca_account_id, giftId: gift_id, result: `still_${alpacaAccount.status}` });
        continue;
      }

      // Account is ACTIVE — look up gift amount
      if (!gift_id) {
        console.warn(`[retry-gift-funding] ${alpaca_account_id} is ACTIVE but no gift_id linked`);
        results.push({ accountId: alpaca_account_id, giftId: null, result: 'no_gift_id' });
        continue;
      }

      const { data: gift, error: giftErr } = await supabase
        .from('gifts')
        .select('total_amount')
        .eq('id', gift_id)
        .single();

      if (giftErr || !gift) {
        console.error(`[retry-gift-funding] Gift lookup failed for ${gift_id}:`, giftErr);
        results.push({ accountId: alpaca_account_id, giftId: gift_id, result: 'gift_not_found' });
        continue;
      }

      const amountNIS = Number(gift.total_amount);
      let usdToIlsRate = 3.10;
      try {
        const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
        if (rateRes.ok) {
          const rateData = await rateRes.json();
          if (rateData?.rates?.ILS) usdToIlsRate = rateData.rates.ILS;
        }
      } catch (e) {
        console.warn('[retry-gift-funding] Failed to fetch live rate:', e.message);
      }
      const amountUSD = Math.round((amountNIS / usdToIlsRate) * 100) / 100;
      console.log(`[retry-gift-funding] Journaling $${amountUSD} (₪${amountNIS}, rate: ${usdToIlsRate}) from ${firmAccountId} to ${alpaca_account_id}`);

      const journalRes = await fetch(`${ALPACA_URL}/journals`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Basic ${auth}` },
        body: JSON.stringify({
          entry_type: "JNLC",
          from_account: firmAccountId,
          to_account: alpaca_account_id,
          amount: String(amountUSD),
          description: `Stock4U Gift retry for ${first_name} ${last_name} (giftId: ${gift_id})`,
        }),
      });

      const journalData = await journalRes.json();

      if (journalRes.ok) {
        console.log(`[retry-gift-funding] ✅ Journal success for ${alpaca_account_id}`);
        await supabase.from('alpaca_onboarding')
          .update({ status: 'FUNDED' })
          .eq('alpaca_account_id', alpaca_account_id);
        results.push({ accountId: alpaca_account_id, giftId: gift_id, result: 'funded' });
      } else {
        console.error(`[retry-gift-funding] ❌ Journal failed for ${alpaca_account_id}:`, JSON.stringify(journalData));
        results.push({ accountId: alpaca_account_id, giftId: gift_id, result: `journal_failed: ${journalData.message || JSON.stringify(journalData)}` });
      }
    }

    return new Response(
      JSON.stringify({ success: true, processed: pendingAccounts.length, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[retry-gift-funding] Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
