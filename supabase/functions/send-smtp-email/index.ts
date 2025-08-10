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
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Stock4U - ${isForRecipient ? 'מתנת מניות' : 'אישור שליחת מתנה'}</title>
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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #ffffff;
          direction: rtl;
          margin: 0;
          padding: 0;
          width: 100%;
          min-width: 100%;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        
        .email-wrapper {
          width: 100%;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          position: relative;
        }
        
        /* Header Section */
        .header-section {
          background-color: #ffffff;
          border: 1px solid #DDD;
          padding: 10px 20px;
          text-align: center;
        }
        
        .header-content {
          display: table;
          width: 100%;
        }
        
        .header-left, .header-right {
          display: table-cell;
          vertical-align: middle;
          width: 25%;
        }
        
        .header-center {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          width: 50%;
        }
        
        .cart-icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-color: #4C7EFB;
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          box-shadow: 5px 5px 0 0 rgba(0,0,0,0.10);
        }
        
        .exit-button {
          display: inline-block;
          background-color: #DBE3F3;
          color: #4C7EFB;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          text-decoration: none;
          margin-right: 10px;
        }
        
        .header-nav {
          color: #4C7EFB;
          font-size: 14px;
          text-align: left;
        }
        
        .logo-img {
          max-width: 180px;
          height: auto;
        }
        
        /* Main Yellow Section */
        .hero-section {
          background-color: #FFC547;
          padding: 30px 20px;
          text-align: center;
          position: relative;
          background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/7a0ce1897b9a92990f9d99cb40666973ee6b2c50?width=4258');
          background-size: cover;
          background-position: center;
        }
        
        .decorative-element {
          position: absolute;
          opacity: 0.7;
        }
        
        .currency-1 {
          width: 40px;
          height: 60px;
          right: 20px;
          top: 20px;
          background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/dc30876d4e45ff347666118bde718b5cf5c9ffb0?width=175');
          background-size: contain;
          background-repeat: no-repeat;
          transform: rotate(20deg);
        }
        
        .currency-2 {
          width: 40px;
          height: 60px;
          left: 20px;
          bottom: 20px;
          background-image: url('https://api.builder.io/api/v1/image/assets/TEMP/a70d9027dcb8137595aae5c3f6f8bb37597cbfdd?width=175');
          background-size: contain;
          background-repeat: no-repeat;
        }
        
        .star-red {
          width: 30px;
          height: 35px;
          right: 50px;
          top: 50px;
          background: #E96036;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        
        .star-yellow {
          width: 35px;
          height: 40px;
          left: 50px;
          top: 30px;
          background: #FFC547;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        
        .mascot-container {
          position: relative;
          display: inline-block;
          margin: 20px 0;
        }
        
        .mascot-bg {
          background: white;
          border-radius: 20px;
          padding: 15px;
          filter: drop-shadow(5px 5px 0 rgba(0,0,0,0.1));
          display: inline-block;
        }
        
        .mascot-image {
          width: 120px;
          height: auto;
          max-height: 150px;
        }
        
        /* Main Content Card */
        .content-card {
          background: #ffffff;
          margin: 20px;
          padding: 30px 20px;
          border-radius: 25px;
          box-shadow: 0 4px 25px rgba(0,0,0,0.15);
          text-align: center;
          position: relative;
          top: -30px;
        }
        
        .content-heading {
          font-weight: bold;
          color: #E96036;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .content-title {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .content-subtitle {
          font-size: 36px;
          margin-bottom: 20px;
        }
        
        .sender-info {
          color: #4C7EFB;
          font-size: 18px;
          margin-bottom: 25px;
        }
        
        .company-logo {
          max-width: 300px;
          height: auto;
          max-height: 80px;
          border-radius: 10px;
          margin: 20px auto;
          display: block;
        }
        
        .cta-button {
          display: inline-block;
          background-color: #4C7EFB;
          color: white !important;
          padding: 12px 25px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          font-size: 16px;
          margin: 20px 0;
          box-shadow: 8px 8px 0 0 rgba(0,0,0,0.10);
          transition: transform 0.2s;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
        }
        
        .gift-details {
          background: #f8f9ff;
          padding: 20px;
          border-radius: 15px;
          margin: 20px 0;
          text-align: right;
        }
        
        .stock-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }
        
        .stock-item:last-child {
          border-bottom: none;
        }
        
        .stock-symbol {
          font-weight: bold;
          color: #4C7EFB;
          font-size: 16px;
        }
        
        .stock-name {
          color: #666;
          font-size: 14px;
          margin-top: 3px;
        }
        
        .stock-amount {
          font-weight: bold;
          color: #E96036;
          font-size: 16px;
        }
        
        .total-value {
          background: #E96036;
          color: white;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0;
        }
        
        .message-section {
          background: #FFC547;
          padding: 20px;
          border-radius: 15px;
          margin: 20px 0;
          font-style: italic;
          text-align: center;
          font-size: 16px;
        }
        
        /* Statistics Section */
        .stats-section {
          padding: 20px;
          background: rgba(239,242,246,0.4);
        }
        
        .stats-container {
          display: flex;
          gap: 15px;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .stat-item {
          flex: 1;
          background: rgba(255,255,255,0.8);
          padding: 20px 10px;
          border-radius: 15px;
          text-align: center;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #486284;
          margin-bottom: 8px;
          font-family: 'DM Sans', sans-serif;
        }
        
        .stat-label {
          font-size: 12px;
          color: #8CA2C0;
          line-height: 1.4;
        }
        
        /* Footer Section */
        .footer-section {
          background-color: #DBE3F3;
          padding: 25px 20px;
          text-align: center;
        }
        
        .footer-content {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          flex-wrap: wrap;
        }
        
        .footer-logo-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .footer-mascot {
          width: 40px;
          height: 50px;
        }
        
        .footer-brand {
          color: #4C7EFB;
          font-size: 16px;
          font-weight: bold;
        }
        
        .footer-info {
          color: #4C7EFB;
          font-size: 12px;
          text-align: center;
        }
        
        .footer-links {
          color: #4C7EFB;
          font-size: 11px;
          margin-top: 8px;
        }
        
        /* Mobile Responsive */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            max-width: none !important;
          }
          
          .header-content {
            display: block !important;
          }
          
          .header-left, .header-center, .header-right {
            display: block !important;
            width: 100% !important;
            text-align: center !important;
            padding: 5px 0 !important;
          }
          
          .header-nav {
            display: none !important;
          }
          
          .logo-img {
            max-width: 150px !important;
          }
          
          .hero-section {
            padding: 20px 10px !important;
          }
          
          .decorative-element {
            display: none !important;
          }
          
          .mascot-image {
            width: 100px !important;
            max-height: 120px !important;
          }
          
          .content-card {
            margin: 10px !important;
            padding: 20px 15px !important;
          }
          
          .content-subtitle {
            font-size: 28px !important;
          }
          
          .content-title {
            font-size: 20px !important;
          }
          
          .sender-info {
            font-size: 16px !important;
          }
          
          .company-logo {
            max-width: 90% !important;
          }
          
          .stats-container {
            flex-direction: column !important;
            gap: 10px !important;
          }
          
          .stat-number {
            font-size: 24px !important;
          }
          
          .stat-label {
            font-size: 11px !important;
          }
          
          .footer-content {
            flex-direction: column !important;
            gap: 15px !important;
          }
          
          .cta-button {
            width: 80% !important;
            margin: 15px auto !important;
            display: block !important;
            text-align: center !important;
          }
          
          .gift-details {
            text-align: center !important;
          }
        }
        
        /* Gmail App specific fixes */
        @media screen and (max-width: 480px) {
          .hero-section {
            background-size: cover !important;
          }
          
          .content-card {
            border-radius: 15px !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .content-card {
            background: #ffffff !important;
            color: #333333 !important;
          }
        }
        
        /* Outlook specific fixes */
        <!--[if mso]>
        .hero-section {
          background-color: #FFC547 !important;
        }
        <![endif]-->
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-container">
          <!-- Header Section -->
          <div class="header-section">
            <div class="header-content">
              <div class="header-left">
                <div class="cart-icon">
                  <svg width="20" height="20" viewBox="0 0 25 25" fill="none">
                    <path d="M19.9003 10.3121H5.30426" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M8.68926 14.2061V18.1011M12.6023 14.2061V18.1011M16.5153 14.2061V18.1011" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <a href="#" class="exit-button">יציאה</a>
              </div>
              
              <div class="header-center">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/b4b3197717142c54d34f612cc618c552d7d121d6?width=562" alt="Stock4U Logo" class="logo-img">
              </div>
              
              <div class="header-right">
                <div class="header-nav">בית | אודות | קריירה</div>
              </div>
            </div>
          </div>
          
          <!-- Main Yellow Background Section -->
          <div class="hero-section">
            <!-- Decorative Elements -->
            <div class="decorative-element currency-1"></div>
            <div class="decorative-element currency-2"></div>
            <div class="decorative-element star-red"></div>
            <div class="decorative-element star-yellow"></div>
            
            <!-- Stock4U Mascot -->
            <div class="mascot-container">
              <div class="mascot-bg">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/bc95305a408a0a10cdd090884c0f2965277b826e?width=340" alt="Stock4U Mascot" class="mascot-image">
              </div>
            </div>
          </div>
          
          <!-- Main Content Card -->
          <div class="content-card">
            <!-- Heading Section -->
            <div class="content-heading content-title">איזה כיף!</div>
            <div class="content-heading content-subtitle">${isForRecipient ? 'קיבלת מתנה!' : 'המתנה נשלחה!'}</div>
            
            <!-- Sender Info -->
            <div class="sender-info">
              ${isForRecipient ? `ממי המתנה? ${senderName} כמובן!` : `המתנה נשלחה ל-${recipientName} בהצלחה!`}
            </div>
            
            <!-- Company Logo -->
            ${hasLogo && companyLogo ? `
              <img src="${companyLogo}" alt="${senderName} Logo" class="company-logo">
            ` : ''}
            
            <!-- Action Button -->
            ${isForRecipient ? `
              <a href="https://stock4u.co.il/gift-redeem" class="cta-button">לצפייה במתנה</a>
            ` : ''}
            
            <!-- Gift Details -->
            <div class="gift-details">
              <h3 style="color: #4C7EFB; margin-bottom: 15px; font-size: 18px; text-align: center;">פרטי המתנה:</h3>
              ${giftDetails.stocks.map(stock => `
                <div class="stock-item">
                  <div>
                    <div class="stock-symbol">${stock.symbol}</div>
                    <div class="stock-name">${stock.name}</div>
                  </div>
                  <div class="stock-amount">${stock.amount} מניות</div>
                </div>
              `).join('')}
            </div>
            
            <!-- Total Value -->
            <div class="total-value">
              סה"כ ערך המתנה: ₪${giftDetails.totalValue.toLocaleString()}
            </div>
            
            <!-- Message -->
            ${giftDetails.message ? `
              <div class="message-section">
                "${giftDetails.message}"
              </div>
            ` : ''}
            
            <!-- Delivery Date -->
            <p style="text-align: center; color: #666; margin-top: 20px; font-size: 14px;">
              תאריך מסירה: ${giftDetails.deliveryDate}
            </p>
          </div>
          
          <!-- Statistics Section -->
          <div class="stats-section">
            <div class="stats-container">
              <div class="stat-item">
                <div class="stat-number">24+</div>
                <div class="stat-label">מדינות שבהם אנו עובדים</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">17M</div>
                <div class="stat-label">אנשים שהאמינו בנו</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">+95%</div>
                <div class="stat-label">לקוחות מרוצים</div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer-section">
            <div class="footer-content">
              <!-- Stock4U Logo and Mascot -->
              <div class="footer-logo-section">
                <img src="https://api.builder.io/api/v1/image/assets/TEMP/c6f4ef138fe2fcff4c861a628f2808355b08ca4e?width=247" alt="Stock4U Mascot" class="footer-mascot">
                <div class="footer-brand">STOCK4U</div>
              </div>
              
              <!-- Contact & Links -->
              <div class="footer-info">
                <div>support@stock4u.co.il | 03-12345678</div>
                <div class="footer-links">אודות | מדיניות פרטיות | תנאי שימוש</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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