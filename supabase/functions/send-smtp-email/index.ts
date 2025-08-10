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
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background-color: #ffffff; direction: rtl; }
        table { border-collapse: collapse; }
        .hebrew-font { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; }
        .container { width: 600px; max-width: 600px; margin: 0 auto; background: white; }
        
        @media only screen and (max-width: 640px) {
          .container { width: 100% !important; max-width: 100% !important; }
          .header-flex { flex-direction: column !important; gap: 10px !important; }
          .nav-section { display: none !important; }
          .yellow-bg { padding: 20px 10px !important; }
          .decorative-desktop { display: none !important; }
          .mascot-container { width: 150px !important; height: 200px !important; }
          .content-card { margin: 15px !important; padding: 25px 15px !important; width: calc(100% - 30px) !important; }
          .heading-large { font-size: 28px !important; }
          .heading-medium { font-size: 20px !important; }
          .stats-flex { flex-direction: column !important; gap: 15px !important; }
          .footer-flex { flex-direction: column !important; gap: 20px !important; text-align: center !important; }
          .logo-img { max-width: 250px !important; }
        }
      </style>
    </head>
    <body>
      <table class="container" cellpadding="0" cellspacing="0" border="0">
        
        <!-- Header Section -->
        <tr>
          <td style="background: white; border: 1px solid #DDD; padding: 13px 33px; height: 100px;">
            <div class="header-flex" style="display: flex; justify-content: space-between; align-items: center; height: 61px;">
              <!-- Left side - Cart & Exit -->
              <div style="display: flex; align-items: center; gap: 20px;">
                <div style="width: 47px; height: 47px; background: #4C7EFB; border-radius: 50%; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.10); display: flex; align-items: center; justify-content: center;">
                  <svg style="width: 25px; height: 25px; color: white;" viewBox="0 0 25 25" fill="none">
                    <path d="M19.9003 10.3121H5.30426C5.00888 10.3124 4.71739 10.3795 4.45158 10.5083C4.18577 10.6372 3.95252 10.8244 3.76926 11.0561C3.58676 11.2871 3.45924 11.5566 3.39635 11.8442C3.33345 12.1318 3.33684 12.43 3.40626 12.7161L4.97126 19.1241C5.19785 19.9497 5.68982 20.6778 6.37126 21.1961C7.05326 21.7151 7.88826 21.9961 8.74726 21.9961H16.4553C17.3143 21.9961 18.1493 21.7151 18.8313 21.1961C19.5127 20.6778 20.0047 19.9497 20.2313 19.1241L21.7963 12.7171C21.9016 12.2851 21.8554 11.8301 21.6653 11.4282C21.4753 11.0262 21.1529 10.7018 20.7523 10.5091C20.4857 10.3811 20.194 10.3138 19.8983 10.3121M8.68926 14.2061V18.1011M12.6023 14.2061V18.1011M16.5153 14.2061V18.1011M19.4503 10.3121C19.4499 9.41614 19.2725 8.52909 18.9283 7.70191C18.584 6.87473 18.0797 6.12374 17.4443 5.4921C16.1577 4.21259 14.4167 3.4949 12.6023 3.4961C10.7878 3.4949 9.04678 4.21259 7.76026 5.4921C7.12502 6.12383 6.62088 6.87485 6.2768 7.70203C5.93271 8.5292 5.75547 9.41621 5.75526 10.3121" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div style="width: 119px; height: 47px; background: #DBE3F3; border-radius: 25px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: #4C7EFB; font-weight: bold; font-size: 18px;">יציאה</span>
                </div>
              </div>
              <!-- Logo Center -->
              <div style="text-align: center;">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/b4b3197717142c54d34f612cc618c552d7d121d6?width=562" alt="Stock4U Logo" style="width: 200px; height: auto;"/>
              </div>
              <!-- Right Navigation -->
              <div class="nav-section" style="display: flex; align-items: center; gap: 24px; color: #4C7EFB; font-size: 18px;">
                <div>בית</div>
                <div>אודות</div>
                <div>רשימת מתנות</div>
                <div>קריירה</div>
                <div>חיפוש</div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Yellow Background Section -->
        <tr>
          <td class="yellow-bg" style="background: #FFC547; padding: 40px 20px; position: relative; text-align: center;">
            <!-- Mascot -->
            <div style="margin: 20px 0;">
              <div class="mascot-container" style="position: relative; display: inline-block; width: 220px; height: 300px;">
                <div style="background: white; border-radius: 20px; padding: 20px; filter: drop-shadow(5px 5px 0 rgba(0, 0, 0, 0.10));">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/bc95305a408a0a10cdd090884c0f2965277b826e?width=340" alt="Stock4U Mascot" style="width: 170px; height: 238px;"/>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Main Content Card -->
        <tr>
          <td style="padding: 20px;">
            <div class="content-card" style="width: 560px; margin: 0 auto; background: #FFF; border-radius: 34px; box-shadow: 0 4px 39px 0 rgba(0, 0, 0, 0.25); padding: 40px 20px; text-align: center;">
              
              <!-- Heading -->
              <div style="margin-bottom: 40px;">
                <div class="heading-medium hebrew-font" style="font-weight: bold; color: #E96036; font-size: 34px; margin-bottom: 10px;">איזה כיף!</div>
                <div class="heading-large hebrew-font" style="font-weight: bold; color: #E96036; font-size: 64px; margin-bottom: 20px;">קיבלת מתנה!</div>
              </div>

              <!-- Sender Info -->
              <div style="color: #4C7EFB; font-size: 24px; margin-bottom: 40px;">
                ממי המתנה? <strong>${senderName}</strong> כמובן!
              </div>

              <!-- Company Logo -->
              ${hasLogo && companyLogo ? `
              <div style="margin: 40px auto;">
                <img src="${companyLogo}" alt="${senderName} Logo" class="logo-img" style="max-width: 552px; height: 105px; border-radius: 15px; object-fit: contain;">
              </div>
              ` : ''}

              <!-- Stocks Table -->
              <div style="margin: 40px 0;">
                <div style="font-size: 18px; font-weight: 600; color: #486284; margin-bottom: 20px;">המניות שקיבלת במתנה:</div>
                <table style="width: 100%; border: 1px solid #E0E7FF; border-radius: 12px; overflow: hidden;">
                  <thead>
                    <tr style="background: #F5F7FC;">
                      <th style="padding: 15px; text-align: center; color: #486284; font-weight: 600;">כמות</th>
                      <th style="padding: 15px; text-align: center; color: #486284; font-weight: 600;">שם החברה</th>
                      <th style="padding: 15px; text-align: center; color: #486284; font-weight: 600;">סמל</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${giftDetails.stocks.map(stock => `
                    <tr>
                      <td style="padding: 15px; text-align: center; color: #4C7EFB; font-weight: 600; font-size: 18px;">${stock.amount}</td>
                      <td style="padding: 15px; text-align: center; color: #486284;">${stock.name}</td>
                      <td style="padding: 15px; text-align: center; color: #486284; font-weight: 500;">${stock.symbol}</td>
                    </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <!-- Message -->
              ${giftDetails.message ? `
              <div style="margin: 40px 0; padding: 20px; background: #F8FAFF; border-radius: 12px; border-right: 4px solid #4C7EFB;">
                <div style="color: #486284; font-size: 16px; line-height: 1.6; font-style: italic;">"${giftDetails.message}"</div>
              </div>
              ` : ''}

              <!-- Action Button -->
              <div style="margin: 40px 0;">
                <div style="position: relative; width: 270px; height: 70px; margin: 0 auto;">
                  <a href="#" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 50px; background: #4C7EFB; border-radius: 25px; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.10); color: white; font-weight: bold; font-size: 18px; text-decoration: none;">
                    לצפייה במתנה
                  </a>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Statistics -->
        <tr>
          <td style="padding: 20px;">
            <div class="stats-flex" style="display: flex; gap: 24px; width: 560px; margin: 0 auto;">
              <div style="flex: 1; padding: 32px; text-align: center; background: rgba(239,242,246,0.40); border-radius: 24px;">
                <div style="color: #486284; font-size: 60px; font-weight: bold; margin-bottom: 16px;">24+</div>
                <div style="color: #8CA2C0; font-size: 20px;">מדינות שבהם אנו עובדים</div>
              </div>
              <div style="flex: 1; padding: 32px; text-align: center; background: rgba(239,242,246,0.40); border-radius: 24px;">
                <div style="color: #486284; font-size: 60px; font-weight: bold; margin-bottom: 16px;">17M</div>
                <div style="color: #8CA2C0; font-size: 20px;">אנשים שהאמינו בנו</div>
              </div>
              <div style="flex: 1; padding: 32px; text-align: center; background: rgba(239,242,246,0.40); border-radius: 24px;">
                <div style="color: #486284; font-size: 60px; font-weight: bold; margin-bottom: 16px;">+95%</div>
                <div style="color: #8CA2C0; font-size: 20px;">לקוחות מרוצים</div>
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background: #DBE3F3; padding: 30px 20px;">
            <div class="footer-flex" style="display: flex; justify-content: center; align-items: center; gap: 48px;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/c6f4ef138fe2fcff4c861a628f2808355b08ca4e?width=247" style="width: 64px; height: 80px;" alt="Stock4U Mascot"/>
                <div style="color: #4C7EFB; font-size: 20px; font-weight: bold;">STOCK4U</div>
              </div>
              <div style="text-align: center; color: #4C7EFB; font-size: 14px;">
                support@stock4u.co.il | 03-12345678<br>
                <span style="color: #8CA2C0; font-size: 12px;">© 2024 Stock4U. כל הזכויות שמורות.</span>
              </div>
            </div>
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
    console.log('Email data:', emailData);

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