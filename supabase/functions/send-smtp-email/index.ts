import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

const apiKey = Deno.env.get("RESEND_API_KEY");
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
  isForRecipient?: boolean;
  selectedCard?: string;
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
  // Get card design colors (used for header background only, not displayed as text)
  const selectedCard = emailData.selectedCard || 'lightblue';
  let cardBgColor = '#4C7EFB'; // Default blue
  
  if (selectedCard === 'red') {
    cardBgColor = '#E85D4A';
  } else if (selectedCard === 'yellow') {
    cardBgColor = '#F5B942';
  }
  
  console.log(`[CARD_DESIGN] Using card design: ${selectedCard} with color ${cardBgColor}`);
  
  // Dynamic app URL for links (redemption button etc.)
  const appUrl = Deno.env.get('SUPABASE_URL')?.includes('localhost') 
    ? 'http://localhost:5173' 
    : (Deno.env.get('APP_URL') || 'https://stock4u.co.il');
  
  // Use production URL for logo (emails need stable public HTTPS URL)
  const stock4uLogoUrl = 'https://stock4u.co.il/emails/stock4u-logo.png';

  const logoSection = emailData.hasLogo && emailData.companyLogo ? `
    <div style="text-align: center; margin-bottom: 16px;">
      <img src="${emailData.companyLogo}" alt="לוגו החברה" style="max-width: 80px; height: auto; border-radius: 8px;">
    </div>
  ` : '';

  // Build stocks display - compact card style for each stock
  const stocksHtml = emailData.giftDetails.stocks.map(stock => `
    <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 12px; text-align: center;">
      <div style="font-size: 24px; font-weight: 700; color: #059669; margin-bottom: 4px;">₪${stock.amount.toLocaleString()}</div>
      <div style="font-size: 18px; font-weight: 600; color: #1e293b;">${stock.symbol}</div>
      <div style="font-size: 13px; color: #64748b; margin-top: 2px;">${stock.name}</div>
    </div>
  `).join('');

  // Action button for recipient to redeem gift
  const actionButton = isForRecipient && giftToken ? `
    <div style="text-align: center; margin-top: 24px;">
      <a href="${appUrl}/redeem?token=${giftToken}" 
         style="display: inline-block; background: linear-gradient(135deg, #4C7EFB 0%, #6366f1 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(76, 126, 251, 0.3); min-width: 200px;">
        🎁 קבל את המתנה
      </a>
      <p style="color: #64748b; font-size: 12px; margin: 12px 0 0 0;">
        לחיצה על הכפתור תעביר אותך לטופס הזיהוי המאובטח
      </p>
    </div>
    
    <div style="text-align: center; padding: 16px; background: #f8fafc; border-radius: 12px; margin-top: 20px;">
      <p style="color: #64748b; font-size: 12px; margin: 0;">
        <strong>זקוק לעזרה?</strong><br>
        📧 support@stock4u.co.il
      </p>
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>מתנת מניות מ-Stock4U</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 12px !important; }
          .content-card { padding: 20px !important; }
          .header-section { padding: 24px 16px !important; }
          .headline { font-size: 26px !important; }
          .sender-text { font-size: 16px !important; }
          .stock-card { padding: 14px !important; }
          .stock-amount { font-size: 22px !important; }
          .stock-symbol { font-size: 16px !important; }
          .cta-button { padding: 14px 24px !important; font-size: 15px !important; width: 100% !important; }
          .process-section { padding: 16px !important; }
          .process-item { padding: 12px !important; }
          .footer-text { font-size: 11px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9; direction: rtl;">
      
      <!-- Wrapper Table -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            
            <!-- Main Container -->
            <table role="presentation" class="container" width="100%" cellpadding="0" cellspacing="0" style="max-width: 420px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              
              <!-- Clean Header - NO HERO -->
              <tr>
                <td style="padding: 24px 24px 16px 24px; text-align: center; border-bottom: 1px solid #e2e8f0;">
                  
                  <!-- Logo -->
                  <img src="${stock4uLogoUrl}" alt="Stock4U" style="max-width: 180px; width: 70%; height: auto; display: block; margin: 0 auto 16px auto;" />

                  <!-- Main Headline -->
                  <h1 class="headline" style="color: #1e293b; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.3;">
                    ${isForRecipient ? 'קיבלת מתנה מיוחדת 🎁' : 'המתנה נשלחה בהצלחה! ✓'}
                  </h1>
                  
                  <!-- Sender/Recipient Line -->
                  <p class="sender-text" style="color: #64748b; font-size: 16px; margin: 0; font-weight: 500;">
                    ${isForRecipient ? `מ- ${emailData.senderName}` : `ל- ${emailData.recipientName}`}
                  </p>
                  
                </td>
              </tr>
              
              <!-- Content Section -->
              <tr>
                <td class="content-card" style="padding: 24px;">
                  
                  ${logoSection}
                  
                  <!-- Gift Title -->
                  <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; text-align: center;">
                    מניות במתנה
                  </h2>
                  
                  <!-- Stocks Display -->
                  <div style="margin-bottom: 20px;">
                    ${stocksHtml}
                  </div>
                  
                  <!-- Total Section -->
                  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 16px; text-align: center; border: 1px solid #bbf7d0;">
                    <span style="color: #64748b; font-size: 14px;">סה״כ</span>
                    <div style="font-size: 28px; font-weight: 700; color: #059669; margin-top: 4px;">
                      ₪${emailData.giftDetails.totalValue.toLocaleString()}
                    </div>
                  </div>
                  
                  ${emailData.giftDetails.message ? `
                    <!-- Personal Message -->
                    <div style="background: #fefce8; border: 1px solid #fde047; border-radius: 12px; padding: 16px; margin-top: 20px; text-align: center;">
                      <p style="color: #854d0e; margin: 0; font-style: italic; font-size: 14px; line-height: 1.5;">
                        "${emailData.giftDetails.message}"
                      </p>
                    </div>
                  ` : ''}
                  
                  ${actionButton}
                  
                  ${isForRecipient ? `
                    <!-- Redemption Process Section -->
                    <div class="process-section" style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 20px; margin-top: 24px;">
                      
                      <h3 style="color: #0369a1; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-align: center;">
                        📋 תהליך מימוש המתנה
                      </h3>
                      
                      <div class="process-item" style="background: white; padding: 14px; border-radius: 8px; margin-bottom: 12px;">
                        <h4 style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 6px 0;">
                          🏦 חשבון נאמנות ייעודי
                        </h4>
                        <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
                          ערך המתנה שלך (₪${emailData.giftDetails.totalValue.toLocaleString()}) מוחזק בחשבון נאמנות ייעודי על שמך. הכספים מאובטחים ומוגנים על פי חוק.
                        </p>
                      </div>
                      
                      <div class="process-item" style="background: white; padding: 14px; border-radius: 8px; margin-bottom: 12px;">
                        <h4 style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 6px 0;">
                          ✅ תהליך זיהוי (KYC/AML)
                        </h4>
                        <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">
                          על מנת לקבל את המתנה, עליך להשלים תהליך זיהוי מלא בהתאם לדרישות הרגולציה הישראלית.
                        </p>
                        <p style="color: #64748b; font-size: 13px; line-height: 1.6; margin: 10px 0 0 0;">
                          <strong>מה נדרש:</strong><br>
                          • צילום ת.ז / דרכון בתוקף<br>
                          • אימות פרטים אישיים<br>
                          • חתימה דיגיטלית
                        </p>
                      </div>
                      
                      <div style="background: #fefce8; padding: 12px; border-radius: 8px; border: 1px solid #fde047;">
                        <p style="color: #854d0e; font-size: 12px; line-height: 1.5; margin: 0;">
                          <strong>⏱️ זמני טיפול:</strong> 2-5 ימי עסקים<br>
                          <strong>🔒 אבטחה:</strong> הכספים נשמרים בנאמנות עד להשלמת התהליך
                        </p>
                      </div>
                      
                    </div>
                  ` : `
                    <!-- Sender Confirmation -->
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin-top: 24px; text-align: center;">
                      <h3 style="color: #166534; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                        ✅ המתנה נשלחה בהצלחה!
                      </h3>
                      <p style="color: #15803d; font-size: 13px; line-height: 1.5; margin: 0;">
                        שלחנו ל-<strong>${emailData.recipientName}</strong> מייל עם הוראות לקבלת המתנה.<br>
                        תקבל/י עדכון כשהמתנה תמומש.
                      </p>
                    </div>
                  `}
                  
                  <!-- Order Details -->
                  <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                      מזהה הזמנה: ${emailData.orderId}
                    </p>
                    ${emailData.giftDetails.deliveryDate ? `
                      <p style="color: #94a3b8; font-size: 12px; margin: 6px 0 0 0;">
                        תאריך: ${emailData.giftDetails.deliveryDate}
                      </p>
                    ` : ''}
                  </div>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="text-align: center; padding: 24px 16px;">
                  <p class="footer-text" style="color: #94a3b8; font-size: 12px; margin: 0;">
                    © 2024 Stock4U - פלטפורמת המניות המובילה בישראל
                  </p>
                  <p class="footer-text" style="color: #94a3b8; font-size: 11px; margin: 6px 0 0 0;">
                    המייל נשלח אוטומטית, אין צורך להשיב
                  </p>
                </td>
              </tr>
              
            </table>
            
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

  // Validate API key exists
  if (!apiKey) {
    console.error('CRITICAL: RESEND_API_KEY is not configured!');
    return new Response(
      JSON.stringify({ error: 'Email service not configured - missing API key' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    let emailData: EmailData;
    try {
      emailData = await req.json();
    } catch (jsonError: any) {
      console.error('JSON PARSE ERROR:', jsonError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body', details: jsonError.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }
    
    // Log basic request info
    console.log('[EMAIL_FUNCTION] Parsed email data', {
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject,
      isForRecipient: emailData.isForRecipient,
      orderId: emailData.orderId,
    });

    // Validate and sanitize email data
    if (!emailData.to || !emailData.from || !emailData.subject) {
      throw new Error('Missing required email fields');
    }
    
    // Normalize and validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Normalize "to" email and support optional "Name <email>" format
    let toEmail = emailData.to.trim();
    const toMatch = toEmail.match(/<([^>]+)>/);
    if (toMatch) {
      toEmail = toMatch[1];
    }

    if (!emailRegex.test(toEmail)) {
      console.error('Invalid "to" email format after normalization:', emailData.to);
      throw new Error(`Invalid recipient email format: ${emailData.to}`);
    }
    emailData.to = toEmail;
    
    // Extract and validate "from" email - handle both "email" and "Name <email>" formats
    let fromEmail = emailData.from.trim();
    const fromEmailMatch = fromEmail.match(/<([^>]+)>/);
    if (fromEmailMatch) {
      fromEmail = fromEmailMatch[1];
    }
    
    if (!emailRegex.test(fromEmail)) {
      throw new Error('Invalid sender email format');
    }
    
    // Sanitize text fields
    emailData.subject = emailData.subject.slice(0, 200);
    emailData.senderName = emailData.senderName?.slice(0, 100) || '';
    emailData.recipientName = emailData.recipientName?.slice(0, 100) || '';

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
        order_id: emailData.orderId,
        token: token,
        recipient_name: emailData.recipientName,
        recipient_email: emailData.to,
        registration_status: 'pending'
      });

    if (regError) {
      console.error('[GIFT_REG_ERROR] Failed to create gift registration:', regError);
      throw new Error('Failed to create gift registration');
    }

    // Determine if this email is for the recipient or sender
    const isForRecipient = emailData.isForRecipient ?? emailData.subject.includes('קיבלת מתנת');
    const recipientHTML = generateGiftEmailHTML(emailData, isForRecipient, token);
    
    const emailRequest = {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: recipientHTML
    };

    console.log('[EMAIL_SEND_ATTEMPT]', {
      to: emailRequest.to,
      subject: emailRequest.subject,
      isForRecipient,
      orderId: emailData.orderId,
    });

    let result;
    try {
      result = await resend.emails.send(emailRequest);
      console.log('[EMAIL_SEND_SUCCESS]', {
        to: emailRequest.to,
        id: (result as any)?.id,
      });
    } catch (sendError: any) {
      console.error('[EMAIL_SEND_ERROR]', sendError);
      throw new Error(sendError?.message || 'Failed to send email via Resend');
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
    
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
