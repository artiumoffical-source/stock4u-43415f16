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
          background-color: #ffffff;
          direction: rtl;
          line-height: 1.5;
        }
        table { border-collapse: collapse; }
        .hebrew-font { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; min-width: auto !important; }
          .header-container { padding: 10px !important; }
          .header-content { flex-direction: column !important; gap: 15px !important; }
          .navigation { display: none !important; }
          .yellow-section { padding: 20px 10px !important; }
          .decorative-element { display: none !important; }
          .mascot { width: 120px !important; height: 190px !important; }
          .content-card { margin: 20px 10px !important; padding: 20px 15px !important; width: calc(100% - 40px) !important; }
          .heading-large { font-size: 32px !important; }
          .heading-small { font-size: 20px !important; }
          .logo-container { max-width: 280px !important; height: auto !important; }
          .statistics-container { flex-direction: column !important; gap: 15px !important; }
          .stat-card { margin-bottom: 15px !important; }
          .footer-content { padding: 15px !important; }
        }
      </style>
    </head>
    <body>
      <table class="container" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px; margin: 0 auto; background: white;">
        
        <!-- Header Section -->
        <tr>
          <td class="header-container" style="background: white; border: 1px solid #DDD; padding: 20px;">
            <div class="header-content" style="display: flex; justify-content: space-between; align-items: center;">
              <!-- Left side - Cart & Exit -->
              <div style="display: flex; align-items: center; gap: 15px;">
                <!-- Cart Icon -->
                <div style="width: 47px; height: 47px; background: #4C7EFB; border-radius: 50%; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.10); display: flex; align-items: center; justify-content: center;">
                  <svg style="width: 24px; height: 24px; color: white;" viewBox="0 0 25 25" fill="none">
                    <path d="M19.9003 10.3121H5.30426C5.00888 10.3124 4.71739 10.3795 4.45158 10.5083C4.18577 10.6372 3.95252 10.8244 3.76926 11.0561C3.58676 11.2871 3.45924 11.5566 3.39635 11.8442C3.33345 12.1318 3.33684 12.43 3.40626 12.7161L4.97126 19.1241C5.19785 19.9497 5.68982 20.6778 6.37126 21.1961C7.05326 21.7151 7.88826 21.9961 8.74726 21.9961H16.4553C17.3143 21.9961 18.1493 21.7151 18.8313 21.1961C19.5127 20.6778 20.0047 19.9497 20.2313 19.1241L21.7963 12.7171C21.9016 12.2851 21.8554 11.8301 21.6653 11.4282C21.4753 11.0262 21.1529 10.7018 20.7523 10.5091C20.4857 10.3811 20.194 10.3138 19.8983 10.3121M8.68926 14.2061V18.1011M12.6023 14.2061V18.1011M16.5153 14.2061V18.1011M19.4503 10.3121C19.4499 9.41614 19.2725 8.52909 18.9283 7.70191C18.584 6.87473 18.0797 6.12374 17.4443 5.4921C16.1577 4.21259 14.4167 3.4949 12.6023 3.4961C10.7878 3.4949 9.04678 4.21259 7.76026 5.4921C7.12502 6.12383 6.62088 6.87485 6.2768 7.70203C5.93271 8.5292 5.75547 9.41621 5.75526 10.3121" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                
                <!-- Exit Button -->
                <div style="display: flex; align-items: center; justify-center; padding: 12px 16px; background: #DBE3F3; border-radius: 25px;">
                  <span style="color: #4C7EFB; font-weight: bold; font-size: 16px;">יציאה</span>
                </div>
              </div>

              <!-- Right side - Navigation -->
              <div class="navigation" style="display: flex; align-items: center; gap: 20px; color: #4C7EFB; font-size: 16px;">
                <div>בית</div>
                <div>אודות</div>
                <div>רשימת מתנות</div>
                <div>קריירה</div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <svg style="width: 16px; height: 16px;" viewBox="0 0 23 22" fill="none">
                    <path d="M20.5659 18.2617L16.1504 14.047C17.4096 12.6648 18.0573 10.8699 17.9571 9.04073C17.8569 7.21155 17.0166 5.49097 15.6133 4.24167C14.21 2.99237 12.3534 2.31195 10.4347 2.34385C8.51614 2.37574 6.68546 3.11746 5.3286 4.41265C3.97173 5.70784 3.1947 7.45531 3.16128 9.2867C3.12786 11.1181 3.84068 12.8903 5.14947 14.2298C6.45827 15.5693 8.26078 16.3715 10.1771 16.4671C12.0933 16.5628 13.9737 15.9445 15.4217 14.7426L19.8371 18.9573C19.9349 19.0443 20.0642 19.0916 20.1978 19.0894C20.3313 19.0871 20.4588 19.0355 20.5533 18.9453C20.6477 18.8551 20.7018 18.7334 20.7042 18.6059C20.7066 18.4784 20.657 18.355 20.5659 18.2617ZM4.21715 9.42203C4.21715 8.22144 4.59012 7.0478 5.28889 6.04955C5.98767 5.05129 6.98087 4.27324 8.14289 3.81379C9.30492 3.35435 10.5836 3.23413 11.8172 3.46836C13.0508 3.70258 14.1839 4.28072 15.0733 5.12967C15.9627 5.97862 16.5683 7.06025 16.8137 8.23777C17.0591 9.4153 16.9331 10.6358 16.4518 11.745C15.9705 12.8542 15.1554 13.8023 14.1096 14.4693C13.0638 15.1363 11.8343 15.4923 10.5765 15.4923C8.89054 15.4904 7.2742 14.8502 6.08203 13.7122C4.88985 12.5743 4.21919 11.0314 4.21715 9.42203Z" fill="currentColor"/>
                  </svg>
                  <span>חיפוש</span>
                </div>
              </div>
            </div>

            <!-- Stock4U Logo - Center -->
            <div style="text-align: center; margin-top: 15px;">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/b4b3197717142c54d34f612cc618c552d7d121d6?width=562" 
                alt="Stock4U Logo" 
                style="width: 200px; height: auto; max-width: 100%;"
              />
            </div>
          </td>
        </tr>

        <!-- Main Yellow Background Section -->
        <tr>
          <td class="yellow-section" style="background: #FFC547; padding: 40px 20px; text-align: center; position: relative; overflow: hidden;">
            
            <!-- Background decorative elements -->
            <div style="position: absolute; top: 20px; right: 30px; width: 60px; height: 100px; background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/dc30876d4e45ff347666118bde718b5cf5c9ffb0?width=175'); background-size: contain; background-repeat: no-repeat; transform: rotate(19deg); filter: drop-shadow(8px 8px 0 rgba(0, 0, 0, 0.10)); opacity: 0.8;" class="decorative-element"></div>
            
            <div style="position: absolute; bottom: 20px; left: 30px; width: 60px; height: 100px; background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/a70d9027dcb8137595aae5c3f6f8bb37597cbfdd?width=175'); background-size: contain; background-repeat: no-repeat; filter: drop-shadow(8px 8px 0 rgba(0, 0, 0, 0.10)); opacity: 0.8;" class="decorative-element"></div>
            
            <!-- Stars -->
            <div style="position: absolute; top: 30px; right: 120px; color: #E96036; font-size: 30px; filter: drop-shadow(5px 5px 0 rgba(0, 0, 0, 0.10));" class="decorative-element">⭐</div>
            <div style="position: absolute; bottom: 30px; left: 80px; color: #E96036; font-size: 30px; filter: drop-shadow(5px 5px 0 rgba(0, 0, 0, 0.10));" class="decorative-element">⭐</div>
            
            <!-- Stock4U Mascot -->
            <div style="margin: 20px 0;">
              <div style="position: relative; display: inline-block;">
                <!-- White background shape -->
                <div style="width: 150px; height: 160px; background: white; border-radius: 20px; position: relative; filter: drop-shadow(5px 5px 0 rgba(0, 0, 0, 0.10));">
                  <!-- Mascot Character -->
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/TEMP/bc95305a408a0a10cdd090884c0f2965277b826e?width=340" 
                    alt="Stock4U Mascot" 
                    class="mascot"
                    style="width: 140px; height: 200px; position: absolute; left: 5px; top: -20px; filter: drop-shadow(3px 3px 0 rgba(0, 0, 0, 0.10));"
                  />
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Main Content Card -->
        <tr>
          <td style="padding: 20px;">
            <div class="content-card" style="background: #FFF; border-radius: 34px; box-shadow: 0 4px 39px 0 rgba(0, 0, 0, 0.25); padding: 40px 20px; text-align: center;">
              
              <!-- Heading Section -->
              <div style="margin-bottom: 30px;">
                <div class="heading-small hebrew-font" style="font-weight: bold; color: #E96036; font-size: 34px; margin-bottom: 10px;">איזה כיף!</div>
                <div class="heading-large hebrew-font" style="font-weight: bold; color: #E96036; font-size: 48px; margin-bottom: 20px;">קיבלת מתנה!</div>
              </div>

              <!-- Sender Info -->
              <div style="color: #4C7EFB; font-size: 24px; font-weight: normal; margin-bottom: 30px;">
                ממי המתנה? <strong>${senderName}</strong> כמובן!
              </div>

              <!-- Company Logo -->
              ${hasLogo && companyLogo ? `
              <div class="logo-container" style="margin: 30px auto; max-width: 400px;">
                <img src="${companyLogo}" alt="${senderName} Logo" style="max-width: 100%; height: auto; border-radius: 15px;">
              </div>
              ` : ''}

              <!-- Stocks Information -->
              <div style="margin: 30px 0;">
                <div style="font-size: 18px; font-weight: 600; color: #486284; margin-bottom: 20px;">המניות שקיבלת במתנה:</div>
                
                <table style="width: 100%; border: 1px solid #E0E7FF; border-radius: 12px; overflow: hidden; margin-bottom: 20px;">
                  <thead>
                    <tr style="background: #F5F7FC;">
                      <th style="padding: 15px; text-align: center; color: #486284; font-weight: 600; font-size: 16px; border-bottom: 1px solid #E0E7FF;">כמות</th>
                      <th style="padding: 15px; text-align: center; color: #486284; font-weight: 600; font-size: 16px; border-bottom: 1px solid #E0E7FF;">שם החברה</th>
                      <th style="padding: 15px; text-align: center; color: #486284; font-weight: 600; font-size: 16px; border-bottom: 1px solid #E0E7FF;">סמל</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${giftDetails.stocks.map((stock, index) => `
                    <tr ${index < giftDetails.stocks.length - 1 ? 'style="border-bottom: 1px solid #E0E7FF;"' : ''}>
                      <td style="padding: 15px; text-align: center; color: #4C7EFB; font-weight: 600; font-size: 18px;">${stock.amount}</td>
                      <td style="padding: 15px; text-align: center; color: #486284; font-size: 16px;">${stock.name}</td>
                      <td style="padding: 15px; text-align: center; color: #486284; font-weight: 500; font-size: 16px;">${stock.symbol}</td>
                    </tr>
                    `).join('')}
                  </tbody>
                </table>

                ${giftDetails.totalValue ? `
                <div style="background: #4C7EFB; color: white; padding: 15px; border-radius: 12px; margin-top: 20px;">
                  <div style="font-size: 14px; opacity: 0.9; margin-bottom: 5px;">סה"כ שווי המתנה</div>
                  <div style="font-size: 24px; font-weight: bold;">₪${giftDetails.totalValue.toLocaleString()}</div>
                </div>
                ` : ''}
              </div>

              <!-- Greeting Message -->
              ${giftDetails.message ? `
              <div style="margin: 30px 0; padding: 20px; background: #F8FAFF; border-radius: 12px; border-right: 4px solid #4C7EFB;">
                <div style="color: #8CA2C0; font-size: 14px; margin-bottom: 8px;">הודעה מיוחדת בשבילך:</div>
                <div style="color: #486284; font-size: 16px; line-height: 1.6; font-style: italic;">"${giftDetails.message}"</div>
              </div>
              ` : ''}

              <!-- Action Button -->
              <div style="margin: 30px 0;">
                <div style="position: relative; width: 270px; height: 70px; margin: 0 auto;">
                  <div style="display: flex; align-items: center; justify-center; width: 100%; height: 50px; background: #4C7EFB; border-radius: 25px; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.10);">
                    <a href="#" style="color: white; font-weight: bold; font-size: 18px; text-decoration: none; display: block; padding: 15px 30px;">לצפייה במתנה</a>
                  </div>
                </div>
              </div>

              <!-- Delivery Info -->
              ${giftDetails.deliveryDate ? `
              <div style="background: #FFF8E1; border: 1px solid #FFE082; border-radius: 10px; padding: 12px; margin-top: 20px;">
                <div style="color: #F57C00; font-size: 14px;">📅 תאריך משלוח: ${giftDetails.deliveryDate}</div>
              </div>
              ` : ''}
            </div>
          </td>
        </tr>

        <!-- Statistics Section -->
        <tr>
          <td style="padding: 20px;">
            <div class="statistics-container" style="display: flex; gap: 20px;">
              <div class="stat-card" style="flex: 1; padding: 30px 20px; text-align: center; background: rgba(239,242,246,0.40); border-radius: 24px;">
                <div style="color: #486284; font-size: 48px; font-weight: bold; margin-bottom: 10px; font-family: 'DM Sans', sans-serif;">24+</div>
                <div style="color: #8CA2C0; font-size: 16px; line-height: 1.5;">מדינות שבהם אנו עובדים</div>
              </div>
              <div class="stat-card" style="flex: 1; padding: 30px 20px; text-align: center; background: rgba(239,242,246,0.40); border-radius: 24px;">
                <div style="color: #486284; font-size: 48px; font-weight: bold; margin-bottom: 10px; font-family: 'DM Sans', sans-serif;">17M</div>
                <div style="color: #8CA2C0; font-size: 16px; line-height: 1.5;">אנשים שהאמינו בנו</div>
              </div>
              <div class="stat-card" style="flex: 1; padding: 30px 20px; text-align: center; background: rgba(239,242,246,0.40); border-radius: 24px;">
                <div style="color: #486284; font-size: 48px; font-weight: bold; margin-bottom: 10px; font-family: 'DM Sans', sans-serif;">+95%</div>
                <div style="color: #8CA2C0; font-size: 16px; line-height: 1.5;">לקוחות מרוצים</div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer-content" style="background: #DBE3F3; padding: 30px 20px;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 40px; max-width: 500px; margin: 0 auto;">
              
              <!-- Stock4U Logo and Brand -->
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 48px; height: 60px;">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/c6f4ef138fe2fcff4c861a628f2808355b08ca4e?width=247"
                    style="width: 100%; height: 100%; object-contain;"
                    alt="Stock4U Mascot"
                  />
                </div>
                <div style="color: #4C7EFB; font-size: 20px; font-weight: bold;">STOCK4U</div>
              </div>

              <!-- Contact & Links -->
              <div style="text-align: center;">
                <div style="color: #4C7EFB; font-size: 14px; margin-bottom: 8px; font-weight: bold;">צרו קשר</div>
                <div style="color: #4C7EFB; font-size: 12px; margin-bottom: 5px;">support@stock4u.co.il</div>
                <div style="color: #4C7EFB; font-size: 12px; margin-bottom: 10px;">03-12345678</div>
                <div style="color: #8CA2C0; font-size: 11px;">© 2024 Stock4U. כל הזכויות שמורות.</div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
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