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
  giftId: z.string().uuid()
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
        message: "פורמט הבקשה לא תקין"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const { giftId } = validationResult.data;
    console.log(`[GET_GIFT] Looking up gift: ${giftId}`);

    // Find the gift in the new gifts table
    const { data: gift, error: giftError } = await supabase
      .from('gifts')
      .select('*')
      .eq('id', giftId)
      .single();

    if (giftError) {
      console.log(`[GET_GIFT] Database error for gift ${giftId}:`, giftError.message);
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    if (!gift) {
      return new Response(JSON.stringify({
        success: false,
        message: "מתנה לא נמצאה"
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`[GET_GIFT] Successfully found gift: ${giftId}, status: ${gift.status}`);

    // Return gift details (excluding sensitive payment info)
    return new Response(JSON.stringify({
      success: true,
      gift: {
        id: gift.id,
        sender_name: gift.sender_name,
        sender_email: gift.sender_email,
        recipient_name: gift.recipient_name,
        recipient_email: gift.recipient_email,
        recipient_phone: gift.recipient_phone,
        gift_items: gift.gift_items,
        total_amount: gift.total_amount,
        status: gift.status,
        delivery_method: gift.delivery_method,
        delivery_timing: gift.delivery_timing,
        scheduled_at: gift.scheduled_at,
        created_at: gift.created_at
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[GET_GIFT] Server error: ${errorMessage}`);
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
