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
  const stocksList = giftDetails.stocks.map(stock => `${stock.symbol} (${stock.amount} מניות)`).join(', ');
  
  return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>מתנת מניות</title>
    </head>
    <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5; direction: rtl;">
      
      <!-- Main Email Container -->
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <tr>
          <td style="background-color: #4C7EFB; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Stock4U</h1>
          </td>
        </tr>
        
        <!-- Gift Announcement -->
        <tr>
          <td style="background: linear-gradient(135deg, #FFC547 0%, #FFD700 100%); padding: 40px 20px; text-align: center; position: relative;">
            <div style="position: relative; z-index: 2;">
              <h2 style="margin: 0 0 10px 0; color: #E96036; font-size: 32px; font-weight: bold;">🎁 איזה כיף!</h2>
              <h3 style="margin: 0; color: #E96036; font-size: 36px; font-weight: bold;">קיבלת מתנה!</h3>
            </div>
            <!-- Decorative elements -->
            <div style="position: absolute; top: 10px; right: 20px; font-size: 24px;">⭐</div>
            <div style="position: absolute; bottom: 10px; left: 20px; font-size: 20px;">💎</div>
            <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); font-size: 18px;">🚀</div>
          </td>
        </tr>
        
        <!-- Gift Details -->
        <tr>
          <td style="padding: 40px 20px; text-align: center;">
            
            <!-- Sender Information -->
            <div style="margin-bottom: 30px;">
              <p style="margin: 0 0 15px 0; color: #4C7EFB; font-size: 18px; font-weight: 600;">
                ממי המתנה? <strong>${senderName}</strong>${hasLogo ? '' : ' כמובן!'}
              </p>
              
              ${hasLogo && companyLogo ? `
              <div style="margin: 20px 0;">
                <img src="${companyLogo}" alt="${senderName} Logo" style="max-width: 200px; height: auto; border-radius: 8px; border: 2px solid #f0f0f0;">
              </div>
              ` : ''}
            </div>
            
            <!-- Stock Information -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0; border-right: 4px solid #4C7EFB;">
              <h4 style="margin: 0 0 15px 0; color: #333; font-size: 20px; font-weight: bold;">פרטי המתנה</h4>
              
              <div style="text-align: right; margin-bottom: 15px;">
                <strong style="color: #E96036; font-size: 16px;">המניות שקיבלת:</strong>
                <div style="margin-top: 8px; color: #666; font-size: 14px; line-height: 1.5;">
                  ${stocksList}
                </div>
              </div>
              
              <div style="text-align: right; margin-bottom: 15px;">
                <strong style="color: #4C7EFB; font-size: 18px;">
                  ערך כולל: ₪${giftDetails.totalValue.toLocaleString()}
                </strong>
              </div>
              
              ${giftDetails.message ? `
              <div style="margin-top: 20px; padding: 15px; background-color: white; border-radius: 8px; border-right: 3px solid #FFC547;">
                <strong style="color: #E96036;">הודעה מ${senderName}:</strong>
                <p style="margin: 8px 0 0 0; color: #555; font-style: italic;">"${giftDetails.message}"</p>
              </div>
              ` : ''}
            </div>
            
            <!-- Action Button -->
            <div style="margin: 30px 0;">
              <a href="#" style="display: inline-block; background-color: #4C7EFB; color: white; text-decoration: none; padding: 15px 30px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(76, 126, 251, 0.3); transition: all 0.3s ease;">
                לצפייה במתנה המלאה →
              </a>
            </div>
            
            <!-- Additional Info -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
                ${isForRecipient ? 
                  `שלום ${recipientName},<br>מזל טוב! קיבלת מתנת מניות מ${senderName}. המניות כבר ממתינות לך במערכת.` :
                  `שלום ${senderName},<br>המתנה נשלחה בהצלחה ל${recipientName}! הם יקבלו הודעה עם כל הפרטים.`
                }
              </p>
            </div>
            
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0 0 10px 0;">
              <strong>Stock4U</strong> - פלטפורמת המניות המובילה בישראל
            </p>
            <p style="margin: 0; line-height: 1.4;">
              מייל זה נשלח אוטומטית. אנא אל תשיבו למייל זה.<br>
              לשאלות ותמיכה: support@stock4u.co.il
            </p>
          </td>
        </tr>
        
      </table>
      
    </body>
    </html>`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received email request');
    const emailData: EmailData = await req.json();
    console.log('Email data:', emailData);

    const recipientHTML = generateGiftEmailHTML(emailData, true);
    
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