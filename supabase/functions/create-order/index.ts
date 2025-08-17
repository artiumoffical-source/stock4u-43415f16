import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderRequest {
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  buyer_id?: string;
  recipient_name?: string;
  recipient_email?: string;
  recipient_phone?: string;
  delivery_method?: string;
  delivery_date?: string | null;
  selected_stocks: Array<{
    symbol: string;
    name: string;
    amount: number;
  }>;
  total_amount: number;
  currency?: string;
  selected_card?: string;
  personal_message?: string;
  sender_name?: string;
  status?: string;
  payment_status?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const orderData: OrderRequest = await req.json();
    
    console.log('Creating order with data:', orderData);

    // Insert the order using service role permissions
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select('id')
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return new Response(
        JSON.stringify({ error: orderError.message }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Order created successfully:', order);

    return new Response(
      JSON.stringify({ success: true, orderId: order.id }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error('Error in create-order function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);