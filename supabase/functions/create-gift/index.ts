import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

// Validation schema for the simplified gift
const giftItemSchema = z.object({
  symbol: z.string().min(1).max(10),
  name: z.string().min(1).max(100),
  amount: z.number().positive().max(1000000)
});

const giftSchema = z.object({
  // Gift items
  gift_items: z.array(giftItemSchema).min(1).max(20),
  total_amount: z.number().positive().min(1).max(10000000),
  
  // Sender info
  sender_name: z.string().min(1).max(100),
  sender_email: z.string().email().max(255),
  
  // Recipient info
  recipient_name: z.string().min(1).max(100),
  recipient_phone: z.string().max(20).optional(),
  recipient_email: z.string().email().max(255),
  
  // Delivery settings
  delivery_method: z.enum(['email', 'whatsapp']),
  delivery_timing: z.enum(['now', 'scheduled']),
  scheduled_at: z.string().datetime().optional().nullable(),
  
  // Payment info (secure - only last 4 digits)
  card_last_four: z.string().max(4).optional(),
  cardholder_id: z.string().max(20).optional(),
  payment_status: z.enum(['pending', 'completed', 'failed']).optional(),
  
  // Status
  status: z.enum(['draft', 'pending_payment', 'paid', 'delivered', 'cancelled']).optional()
});

// Send admin notification email
async function sendAdminNotification(giftData: z.infer<typeof giftSchema>, giftId: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  if (!resendApiKey) {
    console.error('[ADMIN_NOTIFICATION] Missing RESEND_API_KEY');
    return;
  }

  const stocksList = giftData.gift_items
    .map(s => `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;">${s.symbol}</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${s.name}</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">₪${s.amount.toLocaleString()}</td></tr>`)
    .join('');

  const htmlContent = `
    <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🎁 מתנת מניות חדשה!</h1>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h3 style="margin: 0 0 10px 0; color: #374151;">מזהה מתנה: ${giftId.slice(0, 8)}</h3>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #374151;">👤 שולח המתנה</h4>
          <p style="margin: 5px 0; color: #4b5563;"><strong>שם:</strong> ${giftData.sender_name}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>אימייל:</strong> ${giftData.sender_email}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #374151;">🎁 מקבל המתנה</h4>
          <p style="margin: 5px 0; color: #4b5563;"><strong>שם:</strong> ${giftData.recipient_name}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>אימייל:</strong> ${giftData.recipient_email}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>טלפון:</strong> ${giftData.recipient_phone || 'לא צוין'}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>משלוח:</strong> ${giftData.delivery_method === 'whatsapp' ? 'וואטסאפ' : 'אימייל'}</p>
          <p style="margin: 5px 0; color: #4b5563;"><strong>תזמון:</strong> ${giftData.delivery_timing === 'scheduled' ? `מתוזמן ל-${giftData.scheduled_at}` : 'מיידי'}</p>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #374151;">📈 מניות במתנה</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f3f4f6;">
                <th style="padding: 8px; text-align: right;">סימול</th>
                <th style="padding: 8px; text-align: right;">שם</th>
                <th style="padding: 8px; text-align: left;">סכום</th>
              </tr>
            </thead>
            <tbody>
              ${stocksList}
            </tbody>
          </table>
        </div>
        
        <div style="background: #10b981; padding: 15px; border-radius: 8px; text-align: center;">
          <h3 style="margin: 0; color: white;">סה"כ: ₪${giftData.total_amount.toLocaleString()}</h3>
        </div>
      </div>
      
      <div style="background: #374151; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
        <p style="margin: 0; color: #9ca3af; font-size: 12px;">Stock4U - התראה אוטומטית</p>
      </div>
    </div>
  `;

  try {
    console.log('[ADMIN_NOTIFICATION] Sending gift notification email');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Stock4U <noreply@stock4u.co.il>',
        to: ['support@stock4u.co.il'],
        subject: `🎁 מתנה חדשה - ${giftData.sender_name} -> ${giftData.recipient_name}`,
        html: htmlContent,
      }),
    });

    if (response.ok) {
      console.log('[ADMIN_NOTIFICATION] Email sent successfully');
    } else {
      const errorData = await response.json();
      console.error('[ADMIN_NOTIFICATION] Failed to send:', errorData);
    }
  } catch (error) {
    console.error('[ADMIN_NOTIFICATION] Error sending notification:', error);
  }
}

const handler = async (req: Request): Promise<Response> => {
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
    const validationResult = giftSchema.safeParse(rawData);
    if (!validationResult.success) {
      console.error('[CREATE_GIFT] Validation failed:', validationResult.error.issues);
      return new Response(
        JSON.stringify({ error: 'Invalid gift data', details: validationResult.error.issues }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const giftData = validationResult.data;
    
    // Validate total amount matches gift items
    const calculatedTotal = giftData.gift_items.reduce((sum, item) => sum + item.amount, 0);
    if (Math.abs(calculatedTotal - giftData.total_amount) > 0.01) {
      return new Response(
        JSON.stringify({ error: 'Total amount does not match gift items' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate scheduled_at if delivery_timing is 'scheduled'
    if (giftData.delivery_timing === 'scheduled' && !giftData.scheduled_at) {
      return new Response(
        JSON.stringify({ error: 'Scheduled delivery requires a scheduled_at timestamp' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Prepare data for insertion
    const insertData = {
      gift_items: giftData.gift_items,
      total_amount: giftData.total_amount,
      sender_name: giftData.sender_name,
      sender_email: giftData.sender_email,
      recipient_name: giftData.recipient_name,
      recipient_phone: giftData.recipient_phone || null,
      recipient_email: giftData.recipient_email,
      delivery_method: giftData.delivery_method,
      delivery_timing: giftData.delivery_timing,
      scheduled_at: giftData.scheduled_at || null,
      card_last_four: giftData.card_last_four || null,
      cardholder_id: giftData.cardholder_id || null,
      payment_status: giftData.payment_status || 'pending',
      status: giftData.status || 'pending_payment',
    };

    // Insert the gift
    const { data: gift, error: giftError } = await supabase
      .from('gifts')
      .insert([insertData])
      .select('id')
      .single();

    if (giftError) {
      console.error('[CREATE_GIFT] Insert failed:', giftError);
      return new Response(
        JSON.stringify({ error: giftError.message }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Send admin notification in background
    sendAdminNotification(giftData, gift.id).catch(err => {
      console.error('[ADMIN_NOTIFICATION] Background send failed:', err);
    });

    console.log('[CREATE_GIFT] Gift created successfully:', gift.id);

    return new Response(
      JSON.stringify({ success: true, giftId: gift.id }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: any) {
    console.error('[CREATE_GIFT] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
