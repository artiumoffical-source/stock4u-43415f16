import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const apiKey = Deno.env.get("RESEND_API_KEY");
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey?.length);
console.log('API Key starts with re_:', apiKey?.startsWith('re_'));
const resend = new Resend(apiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailData {
  from: string;
  to: string;
  subject: string;
  senderName: string;
  recipientName: string;
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

const generateGiftEmailHTML = (emailData: EmailData, isForRecipient: boolean): string => {
  const { senderName, recipientName, giftDetails, companyLogo, hasLogo } = emailData;
  
  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>מתנת מניות מ-${senderName}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
          background-color: #f8faff;
          direction: rtl;
          line-height: 1.5;
        }
        table { border-collapse: collapse; }
        .container { max-width: 480px; margin: 0 auto; background: white; }
        
        @media only screen and (max-width: 480px) {
          .container { width: 100% !important; }
          .content { padding: 15px !important; }
          .heading-large { font-size: 28px !important; }
          .heading-small { font-size: 18px !important; }
        }
      </style>
    </head>
    <body>
      <table class="container" cellpadding="0" cellspacing="0" border="0">
        
        <!-- Header with Logo -->
        <tr>
          <td style="background: #FFC547; padding: 20px; text-align: center;">
            <div style="background: white; padding: 15px; border-radius: 15px; display: inline-block; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <div style="width: 35px; height: 35px; background: #4C7EFB; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center;">
                  🎁
                </div>
                <span style="color: #4C7EFB; font-size: 20px; font-weight: bold;">STOCK4U</span>
              </div>
            </div>
          </td>
        </tr>

        <!-- Hero Section -->
        <tr>
          <td style="background: #FFC547; padding: 0 20px 30px 20px; text-align: center;">
            <div style="font-size: 20px; color: #E96036; font-weight: bold; margin-bottom: 5px;">איזה כיף!</div>
            <div style="font-size: 32px; color: #E96036; font-weight: bold; margin-bottom: 15px;" class="heading-large">קיבלת מתנה!</div>
            <div style="font-size: 16px; color: #4C7EFB; margin-bottom: 20px;">
              ממי המתנה? <strong>${senderName}</strong> כמובן!
            </div>
            
            <!-- Gift illustration -->
            <div style="background: white; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
              <span style="font-size: 40px;">🎁</span>
            </div>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td class="content" style="background: white; padding: 25px;">
            
            <!-- Company Logo -->
            ${hasLogo && companyLogo ? `
            <div style="text-align: center; margin-bottom: 25px;">
              <img src="${companyLogo}" alt="${senderName} Logo" style="max-width: 200px; max-height: 60px; border-radius: 8px;">
            </div>
            ` : ''}

            <!-- Stocks Section -->
            <div style="margin-bottom: 25px;">
              <div style="font-size: 16px; font-weight: 600; color: #486284; margin-bottom: 12px; text-align: center;">המניות שקיבלת במתנה:</div>
              
              ${giftDetails.stocks.map(stock => `
              <div style="background: #F8FAFF; border: 1px solid #E0E7FF; border-radius: 12px; padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="text-align: center; flex: 1;">
                  <div style="color: #4C7EFB; font-weight: bold; font-size: 18px;">${stock.amount}</div>
                  <div style="color: #8CA2C0; font-size: 12px;">כמות</div>
                </div>
                <div style="text-align: center; flex: 2;">
                  <div style="color: #486284; font-weight: 600; font-size: 14px;">${stock.name}</div>
                  <div style="color: #8CA2C0; font-size: 12px;">שם החברה</div>
                </div>
                <div style="text-align: center; flex: 1;">
                  <div style="color: #486284; font-weight: bold; font-size: 16px;">${stock.symbol}</div>
                  <div style="color: #8CA2C0; font-size: 12px;">סמל</div>
                </div>
              </div>
              `).join('')}
              
              <div style="background: #4C7EFB; color: white; padding: 12px; border-radius: 10px; text-align: center; margin-top: 15px;">
                <div style="font-size: 14px; opacity: 0.9;">סה"כ שווי המתנה</div>
                <div style="font-size: 20px; font-weight: bold;">₪${giftDetails.totalValue?.toLocaleString() || 'לא מוגדר'}</div>
              </div>
            </div>

            <!-- Message -->
            ${giftDetails.message ? `
            <div style="background: #F8FAFF; border-right: 4px solid #4C7EFB; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
              <div style="color: #8CA2C0; font-size: 12px; margin-bottom: 5px;">הודעה מיוחדת בשבילך:</div>
              <div style="color: #486284; font-size: 14px; line-height: 1.6; font-style: italic;">"${giftDetails.message}"</div>
            </div>
            ` : ''}

            <!-- Action Button -->
            <div style="text-align: center; margin: 25px 0;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="background: #4C7EFB; border-radius: 25px; padding: 12px 25px;">
                    <a href="#" style="color: white; font-weight: bold; font-size: 14px; text-decoration: none; display: block;">
                      לצפייה במתנה 👀
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Delivery Info -->
            ${giftDetails.deliveryDate ? `
            <div style="background: #FFF8E1; border: 1px solid #FFE082; border-radius: 8px; padding: 12px; text-align: center; margin-top: 20px;">
              <div style="color: #F57C00; font-size: 12px;">📅 תאריך משלוח: ${giftDetails.deliveryDate}</div>
            </div>
            ` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background: #F8FAFF; padding: 20px; text-align: center; border-top: 1px solid #E0E7FF;">
            <div style="margin-bottom: 15px;">
              <span style="color: #4C7EFB; font-size: 14px; font-weight: bold;">STOCK4U</span>
            </div>
            <div style="color: #8CA2C0; font-size: 11px; line-height: 1.4;">
              © 2024 Stock4U. כל הזכויות שמורות.<br>
              support@stock4u.co.il | מוקד שירות: 03-12345678
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received email request');
    
    const emailData: EmailData = await req.json();
    console.log('Email data:', emailData);

    // Determine if this is for recipient or sender based on subject
    const isForRecipient = emailData.subject.includes('קיבלת מתנת מניות');
    
    const htmlBody = generateGiftEmailHTML(emailData, isForRecipient);

    console.log('Sending email with data:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    const { data, error } = await resend.emails.send({
      from: emailData.from,
      to: [emailData.to],
      subject: emailData.subject,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error details:', JSON.stringify(error, null, 2));
      console.error('Resend error message:', error.message);
      console.error('Resend error type:', typeof error);
      throw new Error(`Resend error: ${JSON.stringify(error)}`);
    }

    console.log('Email sent successfully:', data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      },
    });

  } catch (error) {
    console.error('Error in send-smtp-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }), {
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