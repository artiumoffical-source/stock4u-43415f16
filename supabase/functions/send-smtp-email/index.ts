import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const apiKey = Deno.env.get("RESEND_API_KEY");
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length);
console.log('API Key starts with re_:', apiKey?.startsWith('re_'));
const resend = new Resend(apiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

interface EmailData {
  from: string;
  to: string;
  subject: string;
  senderName: string;
  recipientName: string;
  orderId: string;
  giftDetails: {
    stocks: Array<{
      symbol: string;
      name: string;
      amount: number;
    }>;
    totalValue: number;
    message?: string;
    deliveryDate?: string;
  };
  companyLogo?: string;
  hasLogo?: boolean;
}

const generateGiftEmailHTML = (emailData: EmailData, isForRecipient: boolean, giftToken?: string): string => {
  const stocksHtml = emailData.giftDetails.stocks.map(stock => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #333;">${stock.symbol}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #666;">${stock.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #333; text-align: left;">${stock.amount} מניות</td>
    </tr>
  `).join('');

  const logoSection = emailData.hasLogo && emailData.companyLogo ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
      <tr>
        <td style="text-align: center;">
          <img src="${emailData.companyLogo}" alt="לוגו החברה" style="max-width: 120px; height: auto; border-radius: 8px;">
        </td>
      </tr>
    </table>
  ` : '';

  const actionButton = isForRecipient && giftToken ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
      <tr>
        <td style="text-align: center;">
          <a href="${Deno.env.get('SUPABASE_URL')?.replace('https://', 'https://').split('.supabase.co')[0]}.lovableproject.com/login" 
             style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            🎁 להרשמה ולקבלת המתנה - לחץ כאן
          </a>
        </td>
      </tr>
    </table>
  ` : '';

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>מתנת מניות מ-Stock4U</title>
      <style>
        @media only screen and (max-width: 600px) {
          .main-table { width: 100% !important; }
          .gift-card { width: 95% !important; padding: 20px !important; }
          .hide-mobile { display: none !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        
        <!-- Header -->
        <tr>
          <td>
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #4C7EFB; padding: 20px;">
              <tr>
                <td style="text-align: center;">
                  <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Stock4U</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Yellow Header Section -->
        <tr>
          <td>
            <table width="100%" cellpadding="0" cellspacing="0" style="background: #FFC547; padding: 40px 20px;">
              <tr>
                <td style="text-align: center; position: relative;">
                  
                  <!-- Gift Box Icon -->
                  <div style="font-size: 48px; margin-bottom: 20px;">🎁</div>
                  
                  <!-- Main Title -->
                  <h1 style="color: white; font-size: 32px; font-weight: bold; margin: 0 0 10px 0;">
                    ${isForRecipient ? 'קיבלת מתנה מיוחדת!' : 'המתנה נשלחה בהצלחה!'}
                  </h1>
                  
                  <p style="color: white; font-size: 18px; margin: 0;">
                    ${isForRecipient ? `מ-${emailData.senderName}` : `ל-${emailData.recipientName}`}
                  </p>
                  
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td style="padding: 40px 20px;">
            
            <!-- Centered container -->
            <table class="main-table" width="600" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
              <tr>
                <td>
                  
                  <!-- White Gift Card -->
                  <table class="gift-card" width="100%" cellpadding="32" cellspacing="0" 
                         style="background: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); margin: 0 auto;">
                    <tr>
                      <td style="text-align: center;">
                        
                        ${logoSection}
                        
                        <h2 style="color: #333; font-size: 24px; font-weight: bold; margin: 0 0 16px 0;">
                          מתנת מניות
                        </h2>
                        
                        <!-- Stocks Table -->
                        <table width="100%" cellpadding="0" cellspacing="0" 
                               style="background: #f8f9fa; border-radius: 12px; margin: 20px 0;">
                          <tr>
                            <td style="padding: 20px;">
                              
                              <h3 style="color: #333; font-size: 18px; margin: 0 0 16px 0;">המניות שלך:</h3>
                              
                              <table width="100%" cellpadding="0" cellspacing="0">
                                ${stocksHtml}
                              </table>
                              
                              <!-- Total Value -->
                              <table width="100%" cellpadding="0" cellspacing="0" 
                                     style="border-top: 2px solid #e5e7eb; margin-top: 16px; padding-top: 16px;">
                                <tr>
                                  <td style="font-size: 18px; font-weight: bold; color: #333;">סה"כ ערך:</td>
                                  <td style="font-size: 18px; font-weight: bold; color: #059669; text-align: left;">
                                    ₪${emailData.giftDetails.totalValue.toLocaleString()}
                                  </td>
                                </tr>
                              </table>
                              
                            </td>
                          </tr>
                        </table>
                        
                        ${emailData.giftDetails.message ? `
                          <table width="100%" cellpadding="16" cellspacing="0" 
                                 style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; margin: 20px 0;">
                            <tr>
                              <td>
                                <p style="color: #92400e; margin: 0; font-style: italic; text-align: center;">
                                  "${emailData.giftDetails.message}"
                                </p>
                              </td>
                            </tr>
                          </table>
                        ` : ''}
                        
                        <!-- Order Details -->
                        <table width="100%" cellpadding="0" cellspacing="0" 
                               style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                          <tr>
                            <td style="text-align: center;">
                              <p style="color: #666; font-size: 14px; margin: 0;">
                                מזהה הזמנה: ${emailData.orderId}
                              </p>
                              <p style="color: #666; font-size: 14px; margin: 8px 0 0 0;">
                                תאריך מסירה: ${emailData.giftDetails.deliveryDate}
                              </p>
                            </td>
                          </tr>
                        </table>
                        
                        ${actionButton}
                        
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
            </table>
            
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="text-align: center; padding: 40px 20px 20px 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              © 2024 Stock4U - פלטפורמת המניות המובילה בישראל
            </p>
            <p style="color: #666; font-size: 12px; margin: 8px 0 0 0;">
              המייל נשלח אוטומטית, אין צורך להשיב
            </p>
          </td>
        </tr>
        
      </table>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received email request');
    const emailData: EmailData = await req.json();
    
    // Validate and sanitize email data
    if (!emailData.to || !emailData.from || !emailData.subject) {
      throw new Error('Missing required email fields');
    }
    
    // Validate email addresses - support both simple emails and "Name <email>" format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate "to" email
    if (!emailRegex.test(emailData.to)) {
      console.error('Invalid "to" email format:', emailData.to);
      throw new Error(`Invalid recipient email format: ${emailData.to}`);
    }
    
    // Extract and validate "from" email - handle both "email" and "Name <email>" formats
    let fromEmail = emailData.from;
    const fromEmailMatch = emailData.from.match(/<([^>]+)>/);
    if (fromEmailMatch) {
      fromEmail = fromEmailMatch[1];
    }
    
    if (!emailRegex.test(fromEmail)) {
      console.error('Invalid "from" email format:', emailData.from, 'extracted:', fromEmail);
      throw new Error(`Invalid sender email format: ${emailData.from}`);
    }
    
    console.log('Email validation passed. From:', emailData.from, 'To:', emailData.to);
    
    // Sanitize text fields
    emailData.subject = emailData.subject.slice(0, 200);
    emailData.senderName = emailData.senderName?.slice(0, 100) || '';
    emailData.recipientName = emailData.recipientName?.slice(0, 100) || '';
    
    console.log('Email data validated:', { to: emailData.to, from: emailData.from, subject: emailData.subject });

    // Create gift registration token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate unique token for gift registration
    const token = crypto.randomUUID();
    
    // Create gift registration record
    const { error: regError } = await supabase
      .from('gift_registrations')
      .insert({
        order_id: emailData.orderId, // This should be passed from the calling function
        token: token,
        recipient_name: emailData.recipientName,
        recipient_email: emailData.to,
        registration_status: 'pending'
      });

    if (regError) {
      console.error('Error creating gift registration:', regError);
      throw new Error('Failed to create gift registration');
    }

    const recipientHTML = generateGiftEmailHTML(emailData, true, token);
    
    const emailRequest = {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: recipientHTML
    };
    
    console.log('Sending email with data:', {
      from: emailRequest.from,
      to: emailRequest.to,
      subject: emailRequest.subject
    });
    
    const result = await resend.emails.send(emailRequest);
    console.log('Email sent successfully:', result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
    
  } catch (error: any) {
    console.error('Error in send-smtp-email function:', error);
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