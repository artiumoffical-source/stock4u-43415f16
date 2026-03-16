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
    // Auth
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

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Parse body
    const body = await req.json();
    const { symbol, qty } = body;

    if (!symbol || typeof symbol !== "string" || symbol.length > 20) {
      return new Response(JSON.stringify({ error: "Invalid symbol" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const qtyNum = parseFloat(qty);
    if (!qty || isNaN(qtyNum) || qtyNum <= 0) {
      return new Response(JSON.stringify({ error: "Invalid quantity" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get alpaca_account_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("alpaca_account_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileError || !profile?.alpaca_account_id) {
      return new Response(JSON.stringify({ error: "Trading account not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const alpacaAccountId = profile.alpaca_account_id;
    const alpacaKeyId = Deno.env.get("ALPACA_KEY_ID")!;
    const alpacaSecret = Deno.env.get("ALPACA_SECRET_KEY")!;
    const alpacaAuth = btoa(`${alpacaKeyId}:${alpacaSecret}`);
    const alpacaBase = "https://broker-api.sandbox.alpaca.markets";

    // Execute market sell order
    const orderPayload = {
      symbol: symbol.trim().toUpperCase(),
      qty: String(qtyNum),
      side: "sell",
      type: "market",
      time_in_force: "day",
    };

    console.log(`Sell order for user ${userId}:`, orderPayload);

    const orderRes = await fetch(
      `${alpacaBase}/v1/trading/accounts/${alpacaAccountId}/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${alpacaAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      }
    );

    if (!orderRes.ok) {
      const errBody = await orderRes.text();
      console.error("Alpaca sell order error:", orderRes.status, errBody);

      // Parse Alpaca error for user-friendly messages
      let userMessage = "שגיאה בביצוע פקודת המכירה.";
      try {
        const parsed = JSON.parse(errBody);
        const msg = (parsed.message || "").toLowerCase();
        if (msg.includes("market is not open") || msg.includes("market_closed")) {
          userMessage = "השוק סגור כרגע. נסה שוב בשעות המסחר (16:30–23:00 שעון ישראל).";
        } else if (msg.includes("insufficient")) {
          userMessage = "אין מספיק מניות לביצוע המכירה.";
        } else if (msg.includes("not found")) {
          userMessage = "המניה לא נמצאה בחשבון שלך.";
        }
      } catch {
        // use default message
      }

      return new Response(
        JSON.stringify({ error: userMessage, details: errBody }),
        {
          status: orderRes.status >= 500 ? 500 : 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const order = await orderRes.json();
    console.log("Sell order created:", order.id, order.status);

    return new Response(
      JSON.stringify({
        success: true,
        order_id: order.id,
        status: order.status,
        symbol: order.symbol,
        qty: order.qty,
        message: "פקודת המכירה נשלחה בהצלחה!",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "שגיאת שרת פנימית." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
