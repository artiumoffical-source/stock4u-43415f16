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
      <title>מתנת מניות מ-${senderName}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Heebo', Arial, sans-serif; direction: rtl; background: #ffffff; }
        table { border-collapse: collapse; }
        .container { width: 800px; max-width: 100%; margin: 0 auto; background: #ffffff; }
        .header { background: #4C7EFB; padding: 20px; text-align: center; color: white; }
        .logo { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
        .tagline { font-size: 14px; opacity: 0.9; }
        .main-content { position: relative; background: #FFC547; width: 100%; height: 327px; }
        .decorative-bg { position: absolute; top: -109px; left: -49px; width: 888px; height: 561px; 
          background: url('https://api.builder.io/api/v1/image/assets/TEMP/8748bb1fb3ec0f322beee2fda95614b39ec269b6?width=4258') no-repeat; background-size: cover; z-index: 1; }
        .gift-card { position: absolute; width: 494px; height: 250px; left: 153px; top: 262px; 
          background: #ffffff; border-radius: 14.4px; box-shadow: 0 1.7px 16.3px 0 rgba(0,0,0,0.25); 
          padding: 9px 8px; z-index: 10; }
        .gift-card-inner { display: table; width: 100%; height: 100%; }
        .gift-content { display: table-cell; vertical-align: middle; text-align: center; }
        .gift-title { color: #E96036; font-size: 14.2px; font-weight: 800; margin-bottom: 5.6px; }
        .gift-subtitle { color: #E96036; font-size: 26.7px; font-weight: 800; margin-bottom: 20px; }
        .gift-from { color: #4C7EFB; font-size: 10px; margin-bottom: 20px; }
        .company-logo { width: 230.5px; height: 43.9px; margin: 0 auto 20px auto; border-radius: 6.4px; display: block; }
        .view-btn { width: 113px; height: 29px; background: #4C7EFB; border-radius: 23.4px; 
          box-shadow: 4.2px 4.2px 0 0 rgba(0,0,0,0.10); margin: 0 auto; }
        .btn-text { color: #ffffff; font-size: 7.5px; font-weight: 700; line-height: 29px; text-align: center; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
        @media (max-width: 600px) {
          .container { width: 100% !important; }
          .main-content { height: auto !important; min-height: 300px !important; }
          .gift-card { position: relative !important; width: 90% !important; left: auto !important; 
            top: 50px !important; margin: 0 auto !important; }
          .gift-subtitle { font-size: 22px !important; }
          .company-logo { width: 80% !important; max-width: 200px !important; height: auto !important; }
        }
      </style>
    </head>
    <body>
      <table role="presentation" width="800" cellspacing="0" cellpadding="0" border="0" class="container">
        <tr><td class="header">
          <div class="logo">Stock4U</div>
          <div class="tagline">המתנה המושלמת לכל אירוע</div>
        </td></tr>
        <tr><td>
          <div class="main-content">
            <div class="decorative-bg"></div>
            <div class="gift-card">
              <div class="gift-card-inner">
                <div class="gift-content">
                  <div class="gift-title">איזה כיף!</div>
                  <div class="gift-subtitle">קיבלת מתנה!</div>
                  <div class="gift-from">ממי המתנה? ${senderName} כמובן!</div>
                  ${hasLogo && companyLogo ? `<img src="${companyLogo}" alt="לוגו החברה" class="company-logo">` : ''}
                  <div class="view-btn">
                    <div class="btn-text">לצפייה במתנה</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td></tr>
        <tr><td class="footer">
          <h3>Stock4U</h3>
          <p>המתנה המושלמת לכל אירוע</p>
          <p style="font-size: 12px; opacity: 0.7; margin-top: 15px;">© 2024 Stock4U. כל הזכויות שמורות.</p>
        </td></tr>
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