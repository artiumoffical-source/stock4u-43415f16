import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          direction: rtl;
          width: 100%;
        }
        table { border-collapse: collapse; }
        
        /* Responsive adjustments for email clients */
        @media only screen and (max-width: 600px) {
          .email-container { width: 100% !important; height: auto !important; }
          .header { width: 100% !important; position: relative !important; }
          .yellow-section { width: 100% !important; position: relative !important; height: auto !important; }
          .content-card { width: 90% !important; left: 5% !important; position: relative !important; top: auto !important; margin: 20px auto !important; }
          .statistics { width: 100% !important; position: relative !important; left: 0 !important; top: auto !important; flex-direction: column !important; }
          .footer { width: 100% !important; position: relative !important; left: 0 !important; top: auto !important; }
          .decorative-element { display: none !important; }
          .heading-large { font-size: 40px !important; }
          .heading-small { font-size: 24px !important; }
        }
      </style>
    </head>
    <body>
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background: white;">
        <!-- Header Section -->
        <tr>
          <td style="background: white; border: 1px solid #DDD; padding: 20px; text-align: center;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="text-align: left; width: 33%;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding-left: 10px;">
                        <div style="width: 40px; height: 40px; background: #4C7EFB; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">
                          <svg width="20" height="20" viewBox="0 0 25 25" fill="none">
                            <path d="M19.9003 10.3121H5.30426C5.00888 10.3124 4.71739 10.3795 4.45158 10.5083C4.18577 10.6372 3.95252 10.8244 3.76926 11.0561C3.58676 11.2871 3.45924 11.5566 3.39635 11.8442C3.33345 12.1318 3.33684 12.43 3.40626 12.7161L4.97126 19.1241C5.19785 19.9497 5.68982 20.6778 6.37126 21.1961C7.05326 21.7151 7.88826 21.9961 8.74726 21.9961H16.4553C17.3143 21.9961 18.1493 21.7151 18.8313 21.1961C19.5127 20.6778 20.0047 19.9497 20.2313 19.1241L21.7963 12.7171C21.9016 12.2851 21.8554 11.8301 21.6653 11.4282C21.4753 11.0262 21.1529 10.7018 20.7523 10.5091C20.4857 10.3811 20.194 10.3138 19.8983 10.3121M8.68926 14.2061V18.1011M12.6023 14.2061V18.1011M16.5153 14.2061V18.1011M19.4503 10.3121C19.4499 9.41614 19.2725 8.52909 18.9283 7.70191C18.584 6.87473 18.0797 6.12374 17.4443 5.4921C16.1577 4.21259 14.4167 3.4949 12.6023 3.4961C10.7878 3.4949 9.04678 4.21259 7.76026 5.4921C7.12502 6.12383 6.62088 6.87485 6.2768 7.70203C5.93271 8.5292 5.75547 9.41621 5.75526 10.3121" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                      </td>
                      <td style="padding-left: 10px;">
                        <div style="background: #DBE3F3; border-radius: 25px; padding: 8px 16px; color: #4C7EFB; font-weight: bold; font-size: 14px;">יציאה</div>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="text-align: center; width: 33%;">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/b4b3197717142c54d34f612cc618c552d7d121d6?width=562" alt="Stock4U Logo" style="width: 150px; height: auto;">
                </td>
                <td style="text-align: right; width: 33%; color: #4C7EFB; font-size: 14px;">
                  <div style="display: inline-block; margin-left: 15px;">בית</div>
                  <div style="display: inline-block; margin-left: 15px;">אודות</div>
                  <div style="display: inline-block; margin-left: 15px;">קריירה</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Yellow Background Section -->
        <tr>
          <td style="background: #FFC547; padding: 40px 20px; text-align: center; position: relative;">
            <!-- Background decorative elements simplified for email -->
            <div style="position: absolute; top: 10px; right: 10px; opacity: 0.3;">💰</div>
            <div style="position: absolute; bottom: 10px; left: 10px; opacity: 0.3;">⭐</div>
            <div style="position: absolute; top: 50%; right: 20%; opacity: 0.3;">💎</div>
            
            <!-- Mascot placeholder - simplified for email -->
            <div style="margin: 20px 0;">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/bc95305a408a0a10cdd090884c0f2965277b826e?width=340" alt="Stock4U Mascot" style="width: 120px; height: auto; filter: drop-shadow(3px 3px 0 rgba(0, 0, 0, 0.1));">
            </div>
          </td>
        </tr>

        <!-- Main Content Card -->
        <tr>
          <td style="padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #FFF; border-radius: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); padding: 40px 20px;">
              <tr>
                <td style="text-align: center;">
                  <!-- Heading Section -->
                  <div style="margin-bottom: 20px;">
                    <div style="font-weight: bold; color: #E96036; text-align: center; font-size: 28px; margin-bottom: 10px;">איזה כיף!</div>
                    <div style="font-weight: bold; color: #E96036; text-align: center; font-size: 48px; margin-bottom: 20px;">קיבלת מתנה!</div>
                  </div>

                  <!-- Sender Info -->
                  <div style="color: #4C7EFB; text-align: center; font-size: 20px; margin-bottom: 30px;">
                    ממי המתנה? ${senderName} כמובן!
                  </div>

                  <!-- Company Logo -->
                  ${hasLogo && companyLogo ? `
                  <div style="margin: 30px 0;">
                    <img src="${companyLogo}" alt="${senderName} Logo" style="max-width: 300px; max-height: 80px; border-radius: 10px;">
                  </div>
                  ` : ''}

                  <!-- Stocks Table -->
                  <div style="margin: 30px 0;">
                    <div style="font-size: 16px; font-weight: 600; color: #486284; margin-bottom: 15px;">המניות שקיבלת במתנה:</div>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E0E7FF; border-radius: 8px; overflow: hidden;">
                      <thead>
                        <tr style="background: #F5F7FC;">
                          <th style="padding: 12px; text-align: center; color: #486284; font-weight: 600; font-size: 14px; border-bottom: 1px solid #E0E7FF;">כמות</th>
                          <th style="padding: 12px; text-align: center; color: #486284; font-weight: 600; font-size: 14px; border-bottom: 1px solid #E0E7FF;">שם החברה</th>
                          <th style="padding: 12px; text-align: center; color: #486284; font-weight: 600; font-size: 14px; border-bottom: 1px solid #E0E7FF;">סמל</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${giftDetails.stocks.map(stock => `
                        <tr>
                          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #E0E7FF; color: #4C7EFB; font-weight: 600;">${stock.amount}</td>
                          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #E0E7FF; color: #486284;">${stock.name}</td>
                          <td style="padding: 12px; text-align: center; border-bottom: 1px solid #E0E7FF; color: #486284; font-weight: 500;">${stock.symbol}</td>
                        </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>

                  <!-- Greeting Message -->
                  ${giftDetails.message ? `
                  <div style="margin: 30px 0; padding: 20px; background: #F8FAFF; border-radius: 10px; border-right: 4px solid #4C7EFB;">
                    <div style="color: #486284; font-size: 16px; line-height: 1.6;">"${giftDetails.message}"</div>
                  </div>
                  ` : ''}

                  <!-- Action Button -->
                  <div style="margin: 30px 0;">
                    <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                      <tr>
                        <td style="background: #4C7EFB; border-radius: 25px; box-shadow: 5px 5px 0 rgba(0,0,0,0.1);">
                          <a href="#" style="display: block; padding: 15px 30px; color: white; font-weight: bold; font-size: 16px; text-decoration: none;">לצפייה במתנה</a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Statistics Section -->
        <tr>
          <td style="padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width: 33%; padding: 20px; text-align: center; background: rgba(239,242,246,0.4); border-radius: 15px; margin-left: 10px;">
                  <div style="color: #486284; font-size: 36px; font-weight: bold; margin-bottom: 10px;">24+</div>
                  <div style="color: #8CA2C0; font-size: 14px;">מדינות שבהם אנו עובדים</div>
                </td>
                <td style="width: 33%; padding: 20px; text-align: center; background: rgba(239,242,246,0.4); border-radius: 15px; margin: 0 5px;">
                  <div style="color: #486284; font-size: 36px; font-weight: bold; margin-bottom: 10px;">17M</div>
                  <div style="color: #8CA2C0; font-size: 14px;">אנשים שהאמינו בנו</div>
                </td>
                <td style="width: 33%; padding: 20px; text-align: center; background: rgba(239,242,246,0.4); border-radius: 15px; margin-right: 10px;">
                  <div style="color: #486284; font-size: 36px; font-weight: bold; margin-bottom: 10px;">+95%</div>
                  <div style="color: #8CA2C0; font-size: 14px;">לקוחות מרוצים</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background: #DBE3F3; padding: 30px 20px; text-align: center;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="text-align: center;">
                  <!-- Logo and Brand -->
                  <div style="margin-bottom: 20px;">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/c6f4ef138fe2fcff4c861a628f2808355b08ca4e?width=247" alt="Stock4U Mascot" style="width: 40px; height: auto; vertical-align: middle; margin-left: 10px;">
                    <span style="color: #4C7EFB; font-size: 18px; font-weight: bold; vertical-align: middle;">STOCK4U</span>
                  </div>
                  
                  <!-- Contact and Links -->
                  <div style="color: #4C7EFB; font-size: 14px; line-height: 1.6;">
                    <div style="margin-bottom: 10px;">
                      <strong>צרו קשר:</strong> support@stock4u.co.il | 03-12345678
                    </div>
                    <div style="margin-bottom: 15px;">
                      <span style="margin: 0 10px;">אודות</span>
                      <span style="margin: 0 10px;">מדיניות פרטיות</span>
                      <span style="margin: 0 10px;">תנאי שימוש</span>
                    </div>
                    <div style="color: #8CA2C0; font-size: 12px;">
                      © 2024 Stock4U. כל הזכויות שמורות.
                    </div>
                  </div>
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