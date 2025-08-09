import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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
  const stocksList = emailData.giftDetails.stocks.map(stock => 
    `<tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 8px; text-align: right;">${stock.symbol}</td>
      <td style="padding: 8px; text-align: right;">${stock.name}</td>
      <td style="padding: 8px; text-align: right;">${stock.amount}</td>
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
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 20px;
          direction: rtl;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          padding: 30px 20px;
        }
        .content { 
          padding: 30px; 
          text-align: right; 
        }
        .gift-box {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 10px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
          color: white;
        }
        .stocks-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
        }
        .stocks-table th {
          background: #667eea;
          color: white;
          padding: 12px;
          text-align: right;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          border-top: 3px solid #667eea;
        }
        .message-box {
          background: #e3f2fd;
          border-right: 4px solid #2196f3;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">🎁 Stock4U</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">מתנות מניות מקצועיות</p>
        </div>
        
        <div class="content">
          <h2 style="color: #333; margin-bottom: 20px;">${title}</h2>
          
          <p style="font-size: 18px; color: #555; line-height: 1.6;">${greeting}</p>
          <p style="font-size: 16px; color: #666; line-height: 1.6;">${mainMessage}</p>
          
          ${emailData.giftDetails.message ? `
          <div class="message-box">
            <strong>הודעה אישית:</strong><br>
            ${emailData.giftDetails.message}
          </div>
          ` : ''}
          
          <div class="gift-box">
            <h3 style="margin: 0 0 10px 0;">💎 פרטי המתנה</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold;">₪${emailData.giftDetails.totalValue.toLocaleString()}</p>
          </div>
          
          <h3 style="color: #333;">📊 המניות שנבחרו:</h3>
          <table class="stocks-table">
            <thead>
              <tr>
                <th>סמל</th>
                <th>שם החברה</th>
                <th>כמות</th>
              </tr>
            </thead>
            <tbody>
              ${stocksList}
            </tbody>
          </table>
          
          <p style="color: #666; margin-top: 20px;">
            <strong>תאריך מסירה:</strong> ${emailData.giftDetails.deliveryDate || 'מיידי'}
          </p>
          
          ${isForRecipient ? `
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #667eea; font-size: 18px; font-weight: bold;">
              🎉 ברכות! קיבלת מתנה מיוחדת!
            </p>
          </div>
          ` : `
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #4caf50; font-size: 18px; font-weight: bold;">
              ✅ המתנה נשלחה בהצלחה!
            </p>
          </div>
          `}
        </div>
        
        <div class="footer">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Stock4U</strong> - פלטפורמת מתנות המניות המובילה בישראל
          </p>
          <p style="margin: 5px 0 0 0; color: #999; font-size: 12px;">
            support@stock4u.co.il | www.stock4u.co.il
          </p>
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
    console.log('Sending email via SMTP:', emailData);
    
    const password = Deno.env.get('STOCK4U_EMAIL_PASSWORD');
    if (!password) {
      throw new Error('STOCK4U_EMAIL_PASSWORD not configured');
    }

    // Determine if this is for recipient or sender based on subject
    const isForRecipient = emailData.subject.includes('קיבלת מתנת');
    
    const htmlContent = generateGiftEmailHTML(emailData, isForRecipient);
    
    // Configure nodemailer with your SMTP settings
    const nodemailer = (await import('npm:nodemailer@6.9.7')).default;
    
    const transporter = nodemailer.createTransporter({
      host: 'mail.stock4u.co.il',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: 'support@stock4u.co.il',
        pass: password,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: '"Stock4U" <support@stock4u.co.il>',
      to: emailData.to,
      subject: emailData.subject,
      html: htmlContent,
      replyTo: 'support@stock4u.co.il'
    });

    console.log('Email sent successfully via SMTP:', info.messageId);
    
    const result = {
      success: true,
      messageId: info.messageId,
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