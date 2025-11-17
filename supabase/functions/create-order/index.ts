import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute

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

// Validation schema
const stockSchema = z.object({
  symbol: z.string().min(1).max(10).regex(/^[A-Z0-9]+$/),
  name: z.string().min(1).max(100),
  amount: z.number().positive().max(1000000)
});

const orderSchema = z.object({
  buyer_name: z.string().min(1).max(100),
  buyer_email: z.string().email().max(255),
  buyer_phone: z.string().max(20).optional(),
  buyer_id: z.string().max(20).optional(),
  recipient_name: z.string().min(1).max(100).nullish(),
  recipient_email: z.string().email().max(255).nullish(),
  recipient_phone: z.string().max(20).optional(),
  delivery_method: z.string().max(50).optional(),
  delivery_date: z.string().nullable().optional(),
  selected_stocks: z.array(stockSchema).min(1).max(10),
  total_amount: z.number().positive().min(1).max(10000000),
  currency: z.string().max(3).optional(),
  selected_card: z.string().max(50).optional(),
  personal_message: z.string().max(500).optional(),
  sender_name: z.string().max(100).optional(),
  status: z.string().max(50).optional(),
  payment_status: z.string().max(50).optional()
});

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
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const rawData = await req.json();
    
    // Validate input
    const validationResult = orderSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error);
      return new Response(
        JSON.stringify({ error: 'Invalid order data', details: validationResult.error.issues }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const orderData = validationResult.data;
    
    // Validate total amount matches stock amounts
    const calculatedTotal = orderData.selected_stocks.reduce((sum, stock) => sum + stock.amount, 0);
    if (Math.abs(calculatedTotal - orderData.total_amount) > 0.01) {
      return new Response(
        JSON.stringify({ error: 'Total amount does not match selected stocks' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

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