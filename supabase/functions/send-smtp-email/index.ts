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
  isForRecipient?: boolean;
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
  // FIX ISSUE #1: Display gift amounts in ₪, not share counts
  const stocksHtml = emailData.giftDetails.stocks.map(stock => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #333;">${stock.symbol}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; color: #666;">${stock.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #333; text-align: left;">₪${stock.amount.toLocaleString()}</td>
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

  // FIX ISSUE #3: Use dynamic app URL instead of hardcoded domain
  const appUrl = Deno.env.get('SUPABASE_URL')?.includes('localhost') 
    ? 'http://localhost:5173' 
    : (Deno.env.get('APP_URL') || 'https://stock4u.co.il');

  const actionButton = isForRecipient && giftToken ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px;">
      <tr>
        <td style="text-align: center;">
          <a href="${appUrl}/redeem?token=${giftToken}" 
             class="cta-button"
             style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
            🎁 התחל תהליך זיהוי וקבלת המתנה
          </a>
          <p style="color: #666; font-size: 13px; margin: 12px 0 0 0;">
            לחיצה על הכפתור תעביר אותך לטופס הזיהוי המאובטח
          </p>
        </td>
      </tr>
    </table>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
      <tr>
        <td style="text-align: center; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="color: #666; font-size: 13px; margin: 0 0 8px 0;">
            <strong>זקוק לעזרה?</strong>
          </p>
          <p style="color: #666; font-size: 13px; margin: 0;">
            📧 support@stock4u.co.il | 📞 03-1234567<br>
            שעות פעילות: ראשון-חמישי 9:00-18:00
          </p>
        </td>
      </tr>
    </table>
  ` : '';

  // FIX ISSUE #2: Add responsive CSS and viewport meta tag
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>מתנת מניות מ-Stock4U</title>
      <style>
        body { margin: 0; padding: 0; }
        @media only screen and (max-width: 600px) {
          .main-table { width: 100% !important; }
          .gift-card { width: 95% !important; padding: 20px !important; }
          .hide-mobile { display: none !important; }
          h1 { font-size: 24px !important; }
          h2 { font-size: 20px !important; }
          .cta-button { padding: 14px 24px !important; font-size: 15px !important; }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; max-width: 100%;">
        
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
          <td style="padding: 20px;">
            
            <!-- Centered container with max-width -->
            <table class="main-table" width="600" cellpadding="0" cellspacing="0" style="margin: 0 auto; max-width: 600px;">
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
                              
                              <h3 style="color: #333; font-size: 18px; margin: 0 0 16px 0;">המתנה שלך:</h3>
                              
                              <table width="100%" cellpadding="0" cellspacing="0" style="word-wrap: break-word;">
                                ${stocksHtml}
                              </table>
                              
                              <!-- Total Value -->
                              <table width="100%" cellpadding="0" cellspacing="0" 
                                     style="border-top: 2px solid #e5e7eb; margin-top: 16px; padding-top: 16px;">
                                <tr>
                                  <td style="font-size: 18px; font-weight: bold; color: #333;">סה"כ ערך המתנה:</td>
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
                        
                        ${isForRecipient ? `
                          <!-- Legal Process Information -->
                          <table width="100%" cellpadding="20" cellspacing="0" 
                                 style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 12px; margin: 24px 0;">
                            <tr>
                              <td>
                                <h3 style="color: #1e40af; font-size: 20px; font-weight: bold; margin: 0 0 16px 0; text-align: center;">
                                  📋 תהליך מימוש המתנה
                                </h3>
                                
                                <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
                                  <h4 style="color: #333; font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">
                                    🏦 חשבון נאמנות ייעודי
                                  </h4>
                                  <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
                                    ערך המתנה שלך (₪${emailData.giftDetails.totalValue.toLocaleString()}) מוחזק בחשבון נאמנות ייעודי על שמך. 
                                    הכספים מאובטחים ומוגנים על פי חוק, ואינם נגישים לשום צד שלישי עד להשלמת תהליך הזיהוי.
                                  </p>
                                </div>
                                
                                <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
                                  <h4 style="color: #333; font-size: 16px; font-weight: bold; margin: 0 0 8px 0;">
                                    ✅ תהליך זיהוי (KYC/AML) - חובה על פי חוק
                                  </h4>
                                  <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0 0 12px 0;">
                                    על מנת לקבל את המתנה, עליך להשלים תהליך זיהוי מלא בהתאם לדרישות הרגולציה הישראלית למניעת הלבנת הון ומימון טרור.
                                  </p>
                                  <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
                                    <strong>מה נדרש ממך:</strong><br>
                                    • צילום תעודת זהות / דרכון בתוקף<br>
                                    • אימות פרטים אישיים (שם, כתובת, טלפון)<br>
                                    • חתימה דיגיטלית על הצהרות רגולטוריות
                                  </p>
                                </div>
                                
                                <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border: 1px solid #fbbf24;">
                                  <p style="color: #92400e; font-size: 13px; line-height: 1.6; margin: 0;">
                                    <strong>⏱️ זמני טיפול:</strong> התהליך הממוצע נמשך 2-5 ימי עסקים מרגע הגשת כל המסמכים הנדרשים.
                                    <br><br>
                                    <strong>🔒 אבטחה:</strong> עד להשלמת התהליך, הכספים נשמרים בנאמנות ואינם ניתנים להעברה או משיכה על ידי אף אחד מלבד המוטב החוקי (אתה).
                                  </p>
                                </div>
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
                  
                  ${!isForRecipient ? `
                    <table width="100%" cellpadding="20" cellspacing="0" 
                           style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; margin: 24px 0;">
                      <tr>
                        <td style="text-align: center;">
                          <h3 style="color: #065f46; font-size: 18px; font-weight: bold; margin: 0 0 12px 0;">
                            ✅ המתנה נשלחה בהצלחה!
                          </h3>
                          <p style="color: #047857; font-size: 14px; line-height: 1.6; margin: 0;">
                            שלחנו ל-<strong>${emailData.recipientName}</strong> מייל עם הוראות לקבלת המתנה.<br>
                            המקבל/ת יצטרכו להשלים תהליך זיהוי (KYC) לפני שיוכלו לממש את המתנה.<br><br>
                            תקבל/י עדכון נוסף ברגע שהמתנה תמומש על ידי המקבל/ת.
                          </p>
                        </td>
                      </tr>
                    </table>
                  ` : ''}
                  
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
  console.log("STEP 1: entering handler");
  
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
    console.log('Received email request');
    console.log('Using API key:', apiKey?.substring(0, 7) + '...');
    
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
    
    console.log("STEP 2: emailData parsed", emailData);
    console.log('Email request received for:', emailData.to);
    console.log('Subject:', emailData.subject);
    console.log('Is for recipient:', emailData.isForRecipient);
    
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
    
    console.log("STEP 3: inserting registration");
    
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
      console.error('Error creating gift registration:', regError);
      throw new Error('Failed to create gift registration');
    }

    console.log("STEP 4: registration inserted");

    // Determine if this email is for the recipient or sender
    const isForRecipient = emailData.isForRecipient ?? emailData.subject.includes('קיבלת מתנת');
    console.log('Email type determined - isForRecipient:', isForRecipient);
    
    console.log("STEP 5: generating HTML");
    const recipientHTML = generateGiftEmailHTML(emailData, isForRecipient, token);
    
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
    
    console.log("STEP 6: calling Resend");
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
    console.log("FINAL ERROR", error);
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
