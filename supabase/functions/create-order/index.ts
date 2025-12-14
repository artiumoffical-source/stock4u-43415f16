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

// Send admin notification email
async function sendAdminNotification(orderData: OrderRequest, orderNumber: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.error('[ADMIN_NOTIFICATION] Missing RESEND_API_KEY');
    return;
  }

  const stocksList = orderData.selected_stocks
    .map(s => `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;">${s.symbol}</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">₪${s.amount.toLocaleString()}</td></tr>`)
    .join('');

  const htmlContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🔔 הזמנה חדשה התקבלה!</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">מספר הזמנה: ${orderNumber}</h3>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #374151;">👤 פרטי הקונה</h4>
          <p style="margin: 5px 0; color: #4b5563;"><strong>שם:</strong> ${orderData.buyer_name}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>אימייל:</strong> ${orderData.buyer_email}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>טלפון:</strong> ${orderData.buyer_phone || 'לא צוין'}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #374151;">🎁 מקבל המתנה</h4>
          <p style="margin: 5px 0; color: #4b5563;"><strong>שם:</strong> ${orderData.recipient_name || 'לא צוין'}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>אימייל:</strong> ${orderData.recipient_email || 'לא צוין'}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #374151;">📈 מניות</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px; text-align: right;">סימול</th>
                <th style="padding: 8px; text-align: left;">סכום</th>
              </tr>
            </thead>
            <tbody>
              ${stocksList}
            </tbody>
          </table>
        </div>
        
        <div style="background: #10b981; padding: 15px; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0; color: white;">סה"כ: ₪${orderData.total_amount.toLocaleString()}</h3>
        </div>
      </div>
      
      <div style="background: #374151; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Stock4U - התראה אוטומטית</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Stock4U <noreply@stock4u.co.il>',
        to: ['support@stock4u.co.il'],
        subject: `🔔 הזמנה חדשה - ${orderNumber}`,
        html: htmlContent,
      }),
    });

    if (response.ok) {
      console.log('[ADMIN_NOTIFICATION] Email sent successfully to support@stock4u.co.il');
    } else {
      const errorData = await response.text();
      console.error('[ADMIN_NOTIFICATION] Failed to send:', errorData);
    }
  } catch (error) {
    console.error('[ADMIN_NOTIFICATION] Error sending notification:', error);
  }
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
      .select('id, order_number')
      .single();

    if (orderError) {
      return new Response(
        JSON.stringify({ error: orderError.message }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Send admin notification in background (don't block response)
    const orderNumber = order.order_number || `ORD-${order.id.slice(0, 8)}`;
    sendAdminNotification(orderData, orderNumber).catch(err => {
      console.error('[ADMIN_NOTIFICATION] Background send failed:', err);
    });

    return new Response(
      JSON.stringify({ success: true, orderId: order.id }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
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