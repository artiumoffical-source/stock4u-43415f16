import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RequestBody {
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { token }: RequestBody = await req.json();

    if (!token) {
      return new Response(JSON.stringify({
        success: false,
        message: "Token is required"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Looking for gift registration with token:', token);

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
      console.error('Error finding gift registration:', regError);
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

    // Check if already registered
    if (giftRegistration.registration_status === 'completed') {
      return new Response(JSON.stringify({
        success: false,
        message: "המתנה כבר נרשמה בעבר"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log('Gift registration found:', giftRegistration);

    return new Response(JSON.stringify({
      success: true,
      gift: giftRegistration.orders
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error in get-gift-details function:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);