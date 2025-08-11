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
        
        /* Main container */
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
          display: flex;
          align-items: center;
          justify-content: center;
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
        
        /* Yellow section with gradient */
        .yellow-bg {
          position: absolute;
          width: 800px;
          height: 758px;
          background: linear-gradient(135deg, #FFC547 0%, #FFB347 50%, #FFA047 100%);
          top: 42px;
          left: 0;
          z-index: 1;
        }
        
        /* Background pattern overlay */
        .bg-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.1) 20px,
            rgba(255,255,255,0.1) 40px
          );
          z-index: 2;
        }
        
        /* Decorative elements positioning */
        .deco {
          position: absolute;
          z-index: 5;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
        }
        
        /* White gift card - main focus */
        .gift-card {
          position: absolute;
          width: 494px;
          height: 280px;
          left: 153px;
          top: 240px;
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border-radius: 20px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255,255,255,0.8) inset;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 25px 20px;
          text-align: center;
        }
        
        .main-title {
          color: #E96036;
          font-size: 36px;
          font-weight: 900;
          margin-bottom: 8px;
          line-height: 1.1;
          text-shadow: 0 1px 2px rgba(233,96,54,0.2);
        }
        
        .sub-title {
          color: #E96036;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 15px;
          opacity: 0.9;
        }
        
        .from-text {
          color: #4C7EFB;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
          background: rgba(76, 126, 251, 0.1);
          padding: 8px 16px;
          border-radius: 15px;
        }
        
        .logo-section {
          margin: 15px 0 20px 0;
          max-width: 100%;
        }
        
        .company-logo {
          max-width: 220px;
          max-height: 65px;
          border-radius: 12px;
          object-fit: contain;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 2px solid rgba(255,255,255,0.8);
        }
        
        .view-btn {
          background: linear-gradient(135deg, #4C7EFB 0%, #3B5EE6 100%);
          color: white;
          padding: 14px 32px;
          border-radius: 30px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
          display: inline-block;
          box-shadow: 
            0 6px 20px rgba(76, 126, 251, 0.4),
            0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: 2px solid rgba(255,255,255,0.3);
        }
        
        .stocks-info {
          color: #666;
          font-size: 14px;
          margin-top: 15px;
          max-width: 420px;
          background: rgba(0,0,0,0.05);
          padding: 10px 15px;
          border-radius: 10px;
          font-weight: 500;
        }
        
        .message-text {
          color: #555;
          font-size: 13px;
          margin-top: 8px;
          font-style: italic;
          opacity: 0.8;
        }
        
        /* Footer */
        .footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 800px;
          height: 80px;
          background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 500;
          z-index: 15;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        /* Responsive design */
        @media (max-width: 600px) {
          .email-container, .header, .yellow-bg, .footer { 
            width: 100% !important; 
            min-width: 320px !important;
          }
          .email-container { height: auto !important; min-height: 600px !important; }
          .gift-card { 
            width: 90% !important; 
            left: 5% !important; 
            top: 120px !important;
            height: auto !important;
            padding: 35px 25px !important;
            margin-bottom: 20px !important;
          }
          .main-title { font-size: 32px !important; }
          .sub-title { font-size: 18px !important; }
          .from-text { font-size: 15px !important; }
          .view-btn { 
            font-size: 16px !important; 
            padding: 12px 28px !important; 
          }
          .company-logo {
            max-width: 180px !important;
            max-height: 50px !important;
          }
          .footer { 
            position: relative !important;
            margin-top: 400px !important;
            font-size: 14px !important;
          }
          .deco { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        
        <!-- Header -->
        <div class="header">
          <div class="header-text">Stock4U</div>
        </div>
        
        <!-- Yellow background -->
        <div class="yellow-bg">
          <div class="bg-pattern"></div>
          
          <!-- Decorative gift icons -->
          <svg class="deco" style="left: 120px; top: 60px; width: 45px; height: 45px;" viewBox="0 0 24 24" fill="#E96036">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          
          <svg class="deco" style="left: 630px; top: 90px; width: 40px; height: 40px;" viewBox="0 0 24 24" fill="#FFD700">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          
          <svg class="deco" style="left: 70px; top: 200px; width: 35px; height: 35px;" viewBox="0 0 24 24" fill="#FF6B35">
            <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
            <path d="M9 9h6v6H9z"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
          
          <svg class="deco" style="left: 680px; top: 170px; width: 38px; height: 38px;" viewBox="0 0 24 24" fill="#FFD700">
            <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
            <path d="M9 9h6v6H9z"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
          
          <svg class="deco" style="left: 220px; top: 35px; width: 50px; height: 50px;" viewBox="0 0 24 24" fill="#FF6B35">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            <circle cx="12" cy="12" r="3" fill="#FFD700"/>
          </svg>
          
          <svg class="deco" style="left: 540px; top: 220px; width: 42px; height: 42px;" viewBox="0 0 24 24" fill="#4C7EFB">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8M12 8v8" stroke="white" stroke-width="2"/>
          </svg>
          
          <svg class="deco" style="left: 450px; top: 50px; width: 38px; height: 38px;" viewBox="0 0 24 24" fill="#E96036">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            <circle cx="12" cy="12" r="4" fill="#FFD700"/>
          </svg>
          
          <!-- Robot icon -->
          <svg class="deco" style="left: 300px; top: 45px; width: 55px; height: 55px; transform: rotate(-8deg);" viewBox="0 0 24 24" fill="#4C7EFB">
            <rect x="5" y="5" width="14" height="14" rx="3" ry="3"/>
            <circle cx="9" cy="9" r="1.5" fill="white"/>
            <circle cx="15" cy="9" r="1.5" fill="white"/>
            <path d="M8 14h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 2v3M4 8L2 6M20 8l2-2M5 19l-2 2M19 19l2 2" stroke="#4C7EFB" stroke-width="2"/>
          </svg>
          
          <svg class="deco" style="left: 600px; top: 30px; width: 35px; height: 35px;" viewBox="0 0 24 24" fill="#FFD700">
            <circle cx="12" cy="12" r="8"/>
            <circle cx="12" cy="12" r="4" fill="#FF6B35"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
        </div>
        
        <!-- Main gift card -->
        <div class="gift-card">
          <div class="main-title">איזה כיף! קיבלת מתנה!</div>
          <div class="sub-title">מתנת מניות מיוחדת</div>
          <div class="from-text">מאת: ${senderName}</div>
          
          ${hasLogo && companyLogo ? `
          <div class="logo-section">
            <img src="${companyLogo}" alt="לוגו החברה" class="company-logo">
          </div>
          ` : ''}
          
          <a href="#" class="view-btn">לצפייה במתנה</a>
          
          <div class="stocks-info">
            <strong>המניות שלך:</strong><br>${stocksList}
          </div>
          
          ${giftDetails.message ? `
          <div class="message-text">"${giftDetails.message}"</div>
          ` : ''}
        </div>
        
        <!-- Footer -->
        <div class="footer">
          Stock4U - פלטפורמת מתנות המניות המובילה בישראל
        </div>
        
      </div>
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