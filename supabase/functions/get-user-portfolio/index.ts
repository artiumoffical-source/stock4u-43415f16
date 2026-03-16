import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = user.id;

    // Fetch profile to get alpaca_account_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("alpaca_account_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      return new Response(JSON.stringify({ error: "Failed to fetch profile" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!profile?.alpaca_account_id) {
      return new Response(
        JSON.stringify({ status: "pending" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const alpacaAccountId = profile.alpaca_account_id;
    const alpacaKeyId = Deno.env.get("ALPACA_KEY_ID")!;
    const alpacaSecret = Deno.env.get("ALPACA_SECRET_KEY")!;
    const alpacaAuth = btoa(`${alpacaKeyId}:${alpacaSecret}`);
    const alpacaBase = "https://broker-api.sandbox.alpaca.markets";

    // Fetch account + positions + exchange rate in parallel
    const [accountRes, positionsRes, exchangeRes] = await Promise.all([
      fetch(`${alpacaBase}/v1/trading/accounts/${alpacaAccountId}/account`, {
        headers: { Authorization: `Basic ${alpacaAuth}` },
      }),
      fetch(`${alpacaBase}/v1/trading/accounts/${alpacaAccountId}/positions`, {
        headers: { Authorization: `Basic ${alpacaAuth}` },
      }),
      fetch("https://open.er-api.com/v6/latest/USD").catch(() => null),
    ]);

    if (!accountRes.ok) {
      const errText = await accountRes.text();
      console.error("Alpaca account error:", accountRes.status, errText);
      // If account not found or not active, treat as pending
      if (accountRes.status === 404 || accountRes.status === 403) {
        return new Response(
          JSON.stringify({ status: "pending" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ error: "Failed to fetch account" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const account = await accountRes.json();

    let positions: any[] = [];
    if (positionsRes.ok) {
      positions = await positionsRes.json();
    } else {
      console.warn("Positions fetch failed:", positionsRes.status);
    }

    // Exchange rate
    let exchangeRate = 3.10;
    if (exchangeRes && exchangeRes.ok) {
      try {
        const rateData = await exchangeRes.json();
        exchangeRate = rateData?.rates?.ILS ?? 3.10;
      } catch {
        console.warn("Exchange rate parse failed, using fallback");
      }
    }

    const totalEquity = parseFloat(account.equity || "0");
    const cash = parseFloat(account.cash || "0");

    const mappedPositions = positions.map((p: any) => ({
      symbol: p.symbol,
      qty: p.qty,
      market_value: p.market_value,
      unrealized_pl: p.unrealized_pl,
      unrealized_plpc: p.unrealized_plpc,
      current_price: p.current_price,
      cost_basis: p.cost_basis,
      avg_entry_price: p.avg_entry_price,
    }));

    return new Response(
      JSON.stringify({
        status: "active",
        account: {
          total_equity: totalEquity,
          cash,
          equity_ils: Math.round(totalEquity * exchangeRate * 100) / 100,
          cash_ils: Math.round(cash * exchangeRate * 100) / 100,
        },
        positions: mappedPositions,
        exchange_rate: exchangeRate,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
