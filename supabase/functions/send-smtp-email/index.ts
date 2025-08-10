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
}

const generateGiftEmailHTML = (emailData: EmailData, isForRecipient: boolean): string => {
  // תיקון הבעיה של כמות המניות - נציג את הכמות הנכונה במקום 300
  const stocksList = emailData.giftDetails.stocks.map(stock => 
    `<tr style="border-bottom: 1px solid #e0e7ff; transition: background-color 0.2s;">
      <td style="padding: 12px 16px; text-align: center; font-weight: 500; color: #486284;">${stock.symbol}</td>
      <td style="padding: 12px 16px; text-align: right; color: #486284;">${stock.name}</td>
      <td style="padding: 12px 16px; text-align: center; font-weight: 600; color: #4C7EFB;">${stock.amount}</td>
    </tr>`
  ).join('');

  const title = isForRecipient 
    ? `🎁 קיבלת מתנת מניות מ-${emailData.senderName}!`
    : `✅ המתנה נשלחה בהצלחה ל-${emailData.recipientName}`;

  const greeting = isForRecipient
    ? `שלום ${emailData.recipientName},`
    : `שלום ${emailData.senderName},`;

  const mainMessage = isForRecipient
    ? `${emailData.senderName} שלח/ה לך מתנת מניות מיוחדת!`
    : `המתנה נשלחה בהצלחה ל-${emailData.recipientName}`;

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body { 
          font-family: 'Heebo', -apple-system, Roboto, Helvetica, sans-serif;
          background: linear-gradient(135deg, #DBE3F3 0%, #689EDA 100%);
          margin: 0;
          padding: 20px;
          direction: rtl;
          line-height: 1.6;
        }
        
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: #FFFFFF; 
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(72, 98, 132, 0.15);
          border: 1px solid #E0E7FF;
        }
        
        .header {
          background: linear-gradient(135deg, #4C7EFB 0%, #689EDA 100%);
          color: white;
          text-align: center;
          padding: 40px 30px;
          position: relative;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="0.5" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="0.3" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.4" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          pointer-events: none;
        }
        
        .logo {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }
        
        .subtitle {
          font-size: 16px;
          font-weight: 400;
          opacity: 0.9;
          position: relative;
          z-index: 1;
        }
        
        .content { 
          padding: 40px 30px; 
          text-align: right; 
          background: #FFFFFF;
        }
        
        .main-title {
          color: #486284;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          text-align: center;
        }
        
        .greeting {
          font-size: 18px;
          color: #486284;
          font-weight: 500;
          margin-bottom: 16px;
        }
        
        .main-message {
          font-size: 16px;
          color: #8CA2C0;
          margin-bottom: 30px;
          line-height: 1.7;
        }
        
        .gift-summary {
          background: linear-gradient(135deg, #4C7EFB 0%, #689EDA 100%);
          border-radius: 16px;
          padding: 24px;
          margin: 30px 0;
          text-align: center;
          color: white;
          box-shadow: 0 8px 25px rgba(76, 126, 251, 0.3);
        }
        
        .gift-summary h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .gift-value {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .stocks-section {
          margin: 30px 0;
        }
        
        .section-title {
          color: #486284;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .stocks-table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(72, 98, 132, 0.1);
          border: 1px solid #E0E7FF;
        }
        
        .stocks-table th {
          background: linear-gradient(135deg, #689EDA 0%, #4C7EFB 100%);
          color: white;
          padding: 16px 12px;
          text-align: center;
          font-weight: 600;
          font-size: 14px;
        }
        
        .stocks-table tbody tr:hover {
          background-color: #F8FAFF;
        }
        
        .message-box {
          background: linear-gradient(135deg, #DBE3F3 0%, #F8FAFF 100%);
          border-right: 4px solid #4C7EFB;
          padding: 20px;
          margin: 24px 0;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(76, 126, 251, 0.1);
        }
        
        .message-box strong {
          color: #486284;
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
        }
        
        .message-text {
          color: #8CA2C0;
          font-size: 15px;
          line-height: 1.6;
        }
        
        .delivery-info {
          background: #F8FAFF;
          padding: 16px 20px;
          border-radius: 12px;
          border: 1px solid #E0E7FF;
          margin: 20px 0;
        }
        
        .delivery-info strong {
          color: #486284;
          font-weight: 600;
        }
        
        .celebration-box {
          text-align: center;
          margin: 30px 0;
          padding: 24px;
          background: linear-gradient(135deg, #FFC547 0%, #FFD700 100%);
          border-radius: 16px;
          color: #1B1919;
          box-shadow: 0 8px 25px rgba(255, 197, 71, 0.3);
        }
        
        .success-box {
          text-align: center;
          margin: 30px 0;
          padding: 24px;
          background: linear-gradient(135deg, #689EDA 0%, #4C7EFB 100%);
          border-radius: 16px;
          color: white;
          box-shadow: 0 8px 25px rgba(76, 126, 251, 0.3);
        }
        
        .celebration-text, .success-text {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }
        
        .footer {
          background: linear-gradient(135deg, #486284 0%, #8CA2C0 100%);
          padding: 30px 20px;
          text-align: center;
          color: white;
        }
        
        .footer-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .footer-contact {
          font-size: 13px;
          opacity: 0.9;
          margin-top: 8px;
        }
        
        .footer-contact a {
          color: #FFC547;
          text-decoration: none;
        }
        
        .footer-contact a:hover {
          text-decoration: underline;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #E0E7FF 50%, transparent 100%);
          margin: 20px 0;
        }

        @media only screen and (max-width: 600px) {
          .container {
            margin: 10px;
            border-radius: 16px;
          }
          
          .content {
            padding: 24px 20px;
          }
          
          .header {
            padding: 30px 20px;
          }
          
          .logo {
            font-size: 28px;
          }
          
          .main-title {
            font-size: 20px;
          }
          
          .stocks-table th,
          .stocks-table td {
            padding: 10px 8px;
            font-size: 13px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎁 Stock4U</div>
          <div class="subtitle">פלטפורמת מתנות המניות המובילה בישראל</div>
        </div>
        
        <div class="content">
          <h2 class="main-title">${title}</h2>
          
          <p class="greeting">${greeting}</p>
          <p class="main-message">${mainMessage}</p>
          
          ${emailData.giftDetails.message ? `
          <div class="message-box">
            <strong>הודעה אישית:</strong>
            <div class="message-text">${emailData.giftDetails.message}</div>
          </div>
          ` : ''}
          
          <div class="gift-summary">
            <h3>💎 סך הכל שווי המתנה</h3>
            <p class="gift-value">₪${emailData.giftDetails.totalValue.toLocaleString()}</p>
          </div>
          
          <div class="divider"></div>
          
          <div class="stocks-section">
            <h3 class="section-title">📊 המניות שנבחרו עבורך:</h3>
            <table class="stocks-table">
              <thead>
                <tr>
                  <th style="width: 20%;">סמל</th>
                  <th style="width: 60%;">שם החברה</th>
                  <th style="width: 20%;">כמות</th>
                </tr>
              </thead>
              <tbody>
                ${stocksList}
              </tbody>
            </table>
          </div>
          
          <div class="delivery-info">
            <strong>📅 תאריך מסירה:</strong> ${emailData.giftDetails.deliveryDate || 'מיידי'}
          </div>
          
          ${isForRecipient ? `
          <div class="celebration-box">
            <p class="celebration-text">
              🎉 מזל טוב! קיבלת מתנה מיוחדת ומשמעותית!
            </p>
          </div>
          ` : `
          <div class="success-box">
            <p class="success-text">
              ✅ המתנה נשלחה בהצלחה והגיעה ליעדה!
            </p>
          </div>
          `}
        </div>
        
        <div class="footer">
          <div class="footer-title">Stock4U - העתיד של מתנות</div>
          <div class="footer-contact">
            <a href="mailto:support@stock4u.co.il">support@stock4u.co.il</a> | 
            <a href="https://stock4u.co.il" target="_blank">www.stock4u.co.il</a>
          </div>
          <div style="margin-top: 12px; font-size: 12px; opacity: 0.8;">
            הודעה זו נשלחה אוטומטיות ממערכת Stock4U
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
    const emailData: EmailData = await req.json();
    console.log('Sending email via Resend:', emailData);
    
    // Determine if this is for recipient or sender based on subject
    const isForRecipient = emailData.subject.includes('קיבלת מתנת');
    
    const htmlContent = generateGiftEmailHTML(emailData, isForRecipient);
    
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Stock4U <onboarding@resend.dev>',
      to: [emailData.to],
      subject: emailData.subject,
      html: htmlContent,
    });

    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }

    console.log('Email sent successfully via Resend:', data?.id);
    
    const result = {
      success: true,
      messageId: data?.id,
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    };

    console.log('Email sent successfully:', result);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
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