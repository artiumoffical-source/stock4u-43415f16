import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

const requestSchema = z.object({
  token: z.string().uuid()
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({
        success: false,
        message: "יותר מדי ניסיונות. אנא נסה שוב מאוחר יותר"
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rawData = await req.json();
    
    // Validate input
    const validationResult = requestSchema.safeParse(rawData);
    if (!validationResult.success) {
      return new Response(JSON.stringify({
        success: false,
        message: "פורמט הקישור לא תקין"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { token } = validationResult.data;
    console.log(`[GET_GIFT] Looking up token: ${token}`);

    // Find the gift registration
    const { data: giftRegistration, error: regError } = await supabase
      .from('gift_registrations')
      .select(`
        *,
        orders:order_id (
          id,
          order_number,
          sender_name,
          recipient_name,
          recipient_email,
          personal_message,
          selected_stocks,
          total_amount,
          delivery_date
        )
      `)
      .eq('token', token)
      .single();

    if (regError) {
      console.log(`[GET_GIFT] Database error for token ${token}:`, regError.message);
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה או שהקישור לא תקין"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!giftRegistration) {
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Check if already registered (but allow viewing for submitted/under_review)
    if (giftRegistration.registration_status === 'completed' || 
        giftRegistration.registration_status === 'approved') {
      console.log(`[GET_GIFT] Gift already completed: ${token}`);
      return new Response(JSON.stringify({
        success: false,
        message: "המתנה כבר נרשמה בעבר"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`[GET_GIFT] Successfully found gift for token: ${token}, status: ${giftRegistration.registration_status}`);

    // Return both giftDetails (for RedeemGift page) and gift (for GiftRegistration page)
    return new Response(JSON.stringify({
      success: true,
      giftDetails: {
        id: giftRegistration.id,
        order_id: giftRegistration.order_id,
        recipient_name: giftRegistration.recipient_name,
        recipient_email: giftRegistration.recipient_email,
        registration_status: giftRegistration.registration_status,
        created_at: giftRegistration.created_at
      },
      gift: giftRegistration.orders
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      message: "שגיאת שרת. אנא נסה שוב מאוחר יותר"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);