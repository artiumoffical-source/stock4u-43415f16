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
  const stocksRows = emailData.giftDetails.stocks.map(stock => 
    `<tr>
      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #E0E7FF; color: #4C7EFB; font-weight: 600; font-size: 16px;">${stock.amount}</td>
      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #E0E7FF; color: #486284; font-size: 16px;">${stock.name}</td>
      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #E0E7FF; color: #486284; font-weight: 500; font-size: 16px;">${stock.symbol}</td>
    </tr>`
  ).join('');

  const greetingMessage = emailData.giftDetails.message || 'מתנה מיוחדת בשבילך!';
  const mainTitle = isForRecipient ? 'איזה כיף! קיבלת מתנה!' : 'המתנה נשלחה בהצלחה!';
  const senderText = isForRecipient ? `ממי המתנה? ${emailData.senderName}` : `המתנה נשלחה ל-${emailData.recipientName}`;

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${emailData.subject}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body { 
          font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #F5F7FC;
          margin: 0;
          padding: 20px;
          direction: rtl;
          line-height: 1.6;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .header {
          background: white;
          padding: 30px;
          text-align: center;
          border-bottom: 1px solid #E0E7FF;
        }
        
        .logo {
          width: 120px;
          height: auto;
          margin: 0 auto;
        }
        
        .main-content {
          padding: 40px 30px;
          text-align: center;
        }
        
        .gift-title {
          font-size: 32px;
          font-weight: bold;
          color: #E96036;
          margin-bottom: 20px;
        }
        
        .sender-info {
          font-size: 20px;
          color: #4C7EFB;
          margin-bottom: 30px;
        }
        
        .company-logo-container {
          margin: 30px 0;
        }
        
        .company-logo {
          max-width: 300px;
          max-height: 80px;
          width: auto;
          height: auto;
          border-radius: 10px;
        }
        
        .stocks-section {
          margin: 30px 0;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #486284;
          margin-bottom: 15px;
        }
        
        .stocks-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #E0E7FF;
        }
        
        .table-header {
          background: #F5F7FC;
        }
        
        .table-header th {
          padding: 15px 12px;
          text-align: center;
          color: #486284;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 2px solid #E0E7FF;
        }
        
        .greeting-section {
          margin: 30px 0;
          padding: 20px;
          background: #F8FAFF;
          border-radius: 10px;
          border-right: 4px solid #4C7EFB;
        }
        
        .greeting-text {
          font-size: 16px;
          color: #486284;
          line-height: 1.6;
        }
        
        .cta-button {
          display: inline-block;
          background: #4C7EFB;
          color: white;
          padding: 15px 30px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          margin: 30px 0;
          transition: background 0.3s ease;
        }
        
        .footer {
          background: #F5F7FC;
          padding: 20px 30px;
          text-align: center;
          color: #8CA2C0;
          font-size: 14px;
        }
        
        .footer-logo {
          color: #4C7EFB;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 10px;
            border-radius: 15px;
          }
          
          .main-content {
            padding: 30px 20px;
          }
          
          .gift-title {
            font-size: 28px;
          }
          
          .sender-info {
            font-size: 18px;
          }
          
          .company-logo {
            max-width: 250px;
            max-height: 60px;
          }
          
          .table-header th {
            padding: 12px 8px;
            font-size: 13px;
          }
          
          .stocks-table td {
            padding: 10px 8px;
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
          <div class="logo">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
              <text x="60" y="20" text-anchor="middle" fill="#4C7EFB" font-family="Heebo" font-size="18" font-weight="bold">Stock4U</text>
            </svg>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Gift Title -->
          <h1 class="gift-title">${mainTitle}</h1>
          
          <!-- Sender Info -->
          <div class="sender-info">${senderText}</div>
          
          <!-- Company Logo (if exists) -->
          ${emailData.hasLogo && emailData.companyLogo ? `
          <div class="company-logo-container">
            <img src="${emailData.companyLogo}" alt="Company Logo" class="company-logo" />
          </div>
          ` : ''}
          
          <!-- Stocks Section -->
          <div class="stocks-section">
            <div class="section-title">המניות שקיבלת במתנה:</div>
            <table class="stocks-table">
              <thead class="table-header">
                <tr>
                  <th>כמות</th>
                  <th>שם החברה</th>
                  <th>סמל המניה</th>
                </tr>
              </thead>
              <tbody>
                ${stocksRows}
              </tbody>
            </table>
          </div>
          
          <!-- Greeting Message -->
          ${greetingMessage && greetingMessage !== 'מתנה מיוחדת בשבילך!' ? `
          <div class="greeting-section">
            <div class="greeting-text">${greetingMessage}</div>
          </div>
          ` : ''}
          
          <!-- Call to Action -->
          ${isForRecipient ? `
          <a href="#" class="cta-button">צפה במתנה שלך</a>
          ` : `
          <div style="color: #4C7EFB; font-weight: 600; margin: 20px 0;">
            🎉 המתנה נשלחה בהצלחה!
          </div>
          `}
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">Stock4U</div>
          <div>הפלטפורמה המובילה למתנות מניות בישראל</div>
          <div>© 2024 Stock4U. כל הזכויות שמורות.</div>
        </div>
      </div>
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

    const { data, error } = await resend.emails.send({
      from: emailData.from,
      to: [emailData.to],
      subject: emailData.subject,
      html: htmlBody,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error(`Resend error: ${error.message}`);
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