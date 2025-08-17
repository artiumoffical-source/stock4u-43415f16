import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.54.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  buyer_id?: string;
  recipient_name?: string;
  recipient_email?: string;
  recipient_phone?: string;
  delivery_method: string;
  delivery_date?: string;
  selected_stocks: Array<{
    symbol: string;
    name: string;
    amount: number;
  }>;
  total_amount: number;
  currency: string;
  selected_card?: string;
  personal_message?: string;
  sender_name?: string;
  status: string;
  payment_status: string;
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

    const orderData: OrderData = await req.json();
    
    console.log('Creating order with data:', orderData);
    
    // Validate required fields
    if (!orderData.buyer_email && !orderData.recipient_email) {
      throw new Error('Either buyer email or recipient email is required');
    }
    
    if (!orderData.selected_stocks || orderData.selected_stocks.length === 0) {
      throw new Error('At least one stock must be selected');
    }

    // Insert order into database using service role
    const { data: orderResult, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select('id')
      .single();

    if (orderError) {
      console.error('Error saving order:', orderError);
      throw new Error(`Failed to save order: ${orderError.message}`);
    }

    console.log('Order created successfully with ID:', orderResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: orderResult.id,
        message: 'Order created successfully' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in create-order function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);