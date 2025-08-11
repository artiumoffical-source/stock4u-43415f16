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
      <title>מתנת מניות מ-${senderName}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          direction: rtl; 
          background: #FFF;
          margin: 0;
          padding: 0;
          line-height: 1.4;
        }
        
        /* Main container using table for email compatibility */
        .email-container { 
          width: 800px; 
          height: 800px; 
          background: #FFF; 
          margin: 0 auto; 
          position: relative;
          overflow: hidden;
        }
        
        /* Header with Stock4U */
        .header {
          width: 800px;
          height: 42px;
          background: #4C7EFB;
          text-align: center;
          padding-top: 8px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 15;
        }
        
        .header-text {
          color: #FFF;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        
        /* Yellow section - exact 327px height as specified */
        .yellow-bg {
          position: absolute;
          width: 800px;
          height: 327px;
          background: #FFE23D;
          top: 42px;
          left: 0;
          z-index: 1;
        }
        
        /* White gift card - exact positioning and size as specified */
        .gift-card {
          position: absolute;
          width: 494px;
          height: 250px;
          left: 153px;
          top: 262px;
          background: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 10;
          padding: 20px;
          text-align: center;
        }
        
        .main-title {
          color: #333;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
          line-height: 1.2;
        }
        
        .sub-title {
          color: #666;
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        
        .from-text {
          color: #4C7EFB;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .logo-section {
          margin: 10px 0 15px 0;
          max-width: 100%;
        }
        
        .company-logo {
          max-width: 180px;
          max-height: 50px;
          border-radius: 8px;
          object-fit: contain;
        }
        
        .view-btn {
          background: #4C7EFB;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          margin-top: 5px;
        }
        
        .stocks-info {
          color: #666;
          font-size: 12px;
          margin-top: 10px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .message-text {
          color: #555;
          font-size: 11px;
          margin-top: 5px;
          font-style: italic;
        }
        
        /* Builder.io API images positioned exactly */
        .deco-img {
          position: absolute;
          z-index: 5;
        }
        
        /* Responsive design */
        @media (max-width: 600px) {
          .email-container { 
            width: 100% !important; 
            min-width: 320px !important;
            height: auto !important;
          }
          .header { width: 100% !important; }
          .yellow-bg { 
            width: 100% !important; 
            height: 250px !important; 
          }
          .gift-card { 
            width: 90% !important; 
            left: 5% !important; 
            top: 180px !important;
            height: auto !important;
            padding: 25px !important;
          }
          .main-title { font-size: 24px !important; }
          .sub-title { font-size: 14px !important; }
          .deco-img { display: none !important; }
        }
      </style>
    </head>
    <body>
      <table width="800" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; background: #FFF; position: relative;">
        <tr>
          <td>
            <div class="email-container">
              
              <!-- Header -->
              <div class="header">
                <div class="header-text">Stock4U</div>
              </div>
              
              <!-- Yellow background - exact 327px height -->
              <div class="yellow-bg">
                
                <!-- Decorative images from Builder.io API with exact positioning -->
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F0fc5077f49854ad9b4e41ef7c82ad3fc" 
                     class="deco-img" style="left: 70px; top: 45px; width: 70px; height: 70px;" alt="">
                
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F5b1b4b6c14154fadb4fce3ff70d8c1ca" 
                     class="deco-img" style="left: 680px; top: 70px; width: 65px; height: 65px;" alt="">
                
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F88b8e3e2de334de2a09e91da67e8f8b9" 
                     class="deco-img" style="left: 200px; top: 35px; width: 60px; height: 60px;" alt="">
                
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2Fb0fc4659f36c44919ea1f4e2b7b92e7a" 
                     class="deco-img" style="left: 580px; top: 180px; width: 55px; height: 55px;" alt="">
                
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F70ba789d4d044b05b8e6a7ed5b8bc1fe" 
                     class="deco-img" style="left: 120px; top: 160px; width: 50px; height: 50px;" alt="">
                
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F5f96b8d78b5c4c789e32e2b5a4c8d9f2" 
                     class="deco-img" style="left: 450px; top: 55px; width: 45px; height: 45px;" alt="">
                
                <!-- Main mascot/robot character with exact positioning -->
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F2f85d64c7b4a4a81a5f7e3b8c9d0e1f2" 
                     class="deco-img" style="left: 300px; top: 20px; width: 120px; height: 120px;" alt="Robot mascot">
                
                <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2F3a94e75d8c5b5b92b6e8f4a9d1e2f3b4" 
                     class="deco-img" style="left: 620px; top: 25px; width: 40px; height: 40px;" alt="">
                
              </div>
              
              <!-- Main gift card with exact positioning -->
              <div class="gift-card">
                <div class="main-title">איזה כיף! קיבלת מתנה!</div>
                <div class="sub-title">מתנת מניות מיוחדת</div>
                <div class="from-text">מאת: ${senderName}</div>
                
                ${hasLogo && companyLogo ? `
                <div class="logo-section">
                  <img src="${companyLogo}" alt="לוגו החברה" class="company-logo">
                </div>
                ` : `
                <!-- United logo as default -->
                <div class="logo-section">
                  <img src="https://cdn.builder.io/api/v1/image/assets%2F85dcaa8ab7cd4e54bb1e22de3e5ccef1%2Funited-logo-placeholder" 
                       alt="United Logo" class="company-logo">
                </div>
                `}
                
                <a href="#" class="view-btn">לצפייה במתנה</a>
                
                <div class="stocks-info">
                  <strong>המניות שלך:</strong><br>${stocksList}
                </div>
                
                ${giftDetails.message ? `
                <div class="message-text">"${giftDetails.message}"</div>
                ` : ''}
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
  console.log('Received email request');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const emailData: EmailData = await req.json();
    console.log('Email data:', emailData);

    const html = generateGiftEmailHTML(emailData, true);
    
    console.log('Sending email with data:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    const result = await resend.emails.send({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: html,
    });

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
    console.error('Resend error details:', error.response?.body || error.message);
    
    return new Response(
      JSON.stringify({ 
        error: `Resend error: ${JSON.stringify(error.response?.body || error.message)}` 
      }),
      {
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