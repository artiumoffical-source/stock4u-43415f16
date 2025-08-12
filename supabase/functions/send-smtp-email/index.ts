import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.54.0";

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
  orderId: string;
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

const generateGiftEmailHTML = (emailData: EmailData, isForRecipient: boolean, giftToken?: string): string => {
  const { senderName, recipientName, giftDetails, companyLogo, hasLogo } = emailData;
  
  // Use the exact design from the user's specifications
  return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>מתנת מניות</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5; direction: rtl;">
      
      <div style="width: 100%; background-color: #f5f5f5; padding: 20px 0;">
        <div style="max-width: 800px; margin: 0 auto; background-color: #FFF;">
          
          <!-- Header -->
          <div style="background-color: #4C7EFB; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: bold;">Stock4U</h1>
          </div>
          
          <!-- Yellow background section with decorative elements -->
          <div style="position: relative; width: 100%; height: 327px; background: #FFC547; overflow: hidden;">
            
            <!-- Background pattern image -->
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/8748bb1fb3ec0f322beee2fda95614b39ec269b6?width=4258" 
              style="position: absolute; width: 888px; height: 561px; left: -49px; top: -109px;"
              alt="Background Pattern"
            />

            <!-- Decorative elements positioned exactly from Figma -->
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/dc30876d4e45ff347666118bde718b5cf5c9ffb0?width=175" 
              style="position: absolute; width: 37px; height: 60px; transform: rotate(19.423deg); filter: drop-shadow(5.4px 5.4px 0 rgba(0, 0, 0, 0.10)); left: 599px; top: 24px;"
              alt="Decorative element"
            />

            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/a70d9027dcb8137595aae5c3f6f8bb37597cbfdd?width=175" 
              style="position: absolute; width: 37px; height: 60px; transform: rotate(-0.058deg); filter: drop-shadow(5.4px 5.4px 0 rgba(0, 0, 0, 0.10)); left: 121px; top: 256px;"
              alt="Decorative element"
            />

            <!-- Robot character -->
            <div style="position: absolute; width: 43px; height: 52px; left: 268px; top: 40px; transform: rotate(-8.311deg);">
              <svg width="121" height="140" viewBox="0 0 121 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M108.563 50.6977C106.027 45.1443 101.507 41.499 94.8496 39.7071C96.5785 31.8934 95.3729 27.4654 93.78 24.1438C91.2834 18.9219 86.5934 15.3014 80.9356 14.2208C75.5839 13.1918 67.7214 13.9647 62.0723 14.7899C35.3923 18.6875 29.1784 27.5803 26.8141 33.9458C26.7793 34.0376 23.3666 43.4458 20.591 53.5894C19.116 58.987 17.2852 65.708 17.2013 71.9908C17.0274 84.7788 24.3213 89.6081 28.6886 91.3492C30.9289 92.2452 33.8296 93.1122 39.98 93.0806C36.4764 111.296 36.121 120.797 42.454 127.819C46.3266 132.108 52.0414 134.172 57.7565 133.337C59.8973 133.024 61.9614 132.318 63.9044 131.245C66.3546 129.885 72.8494 126.278 92.0002 96.4233C96.8717 88.8247 101.2 81.527 104.169 75.8727C108.81 67.0266 112.352 59.0345 108.564 50.707L108.563 50.6977Z" fill="#1B1919"/>
                <path d="M99.3108 43.8138C96.7753 38.2604 92.2551 34.6152 85.5976 32.8234C87.3265 25.0096 86.1209 20.5814 84.528 17.2599C82.0314 12.038 77.3414 8.41754 71.6836 7.33691C66.3319 6.30787 58.4694 7.0809 52.8203 7.90615C26.1404 11.8037 19.9264 20.6964 17.5621 27.0619C17.5274 27.1537 14.1146 36.562 11.339 46.7056C9.864 52.1032 8.03325 58.8241 7.94933 65.1069C7.77545 77.8949 15.0693 82.7242 19.4366 84.4653C21.6769 85.3613 24.5777 86.2283 30.728 86.1967C27.2245 104.412 26.869 113.914 33.202 120.935C37.0746 125.224 42.7894 127.288 48.5045 126.453C50.6453 126.14 52.7094 125.434 54.6524 124.361C57.1026 123.001 63.5975 119.394 82.7482 89.5394C87.6198 81.9408 91.9477 74.6431 94.9167 68.9887C99.5578 60.1427 103.1 52.1507 99.3121 43.8232L99.3108 43.8138Z" fill="white"/>
                <path d="M32.8728 32.6946C32.1618 34.619 20.6182 67.3593 25.4781 69.3078C30.338 71.2563 51.5599 67.6456 51.5599 67.6456C51.5599 67.6456 39.8287 113.937 46.742 110.095C53.6459 106.255 86.6986 55.452 84.474 50.5756C82.2494 45.6993 61.5451 48.8973 61.5451 48.8973C61.5451 48.8973 74.4872 24.477 68.6095 23.3418C62.7223 22.2079 35.4081 25.8514 32.8728 32.6946Z" fill="#FFC547"/>
              </svg>
            </div>

            <!-- White gift card exactly matching user's design -->
            <div style="position: absolute; width: 494px; height: 250px; padding: 9px 8px; border-radius: 14.4px; background: #FFF; box-shadow: 0 1.7px 16.3px 0 rgba(0, 0, 0, 0.25); left: 153px; top: 262px; display: flex; justify-content: center; align-items: center;">
              <div style="width: 452px; display: flex; flex-direction: column; align-items: center; gap: 24px;">
                
                <!-- Main headings exactly matching Figma -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 5.6px;">
                  <div style="width: 195px; color: #E96036; text-align: center; font-family: Arial, sans-serif; font-size: 14.2px; font-weight: 800;">
                    איזה כיף!
                  </div>
                  <div style="width: 195px; color: #E96036; text-align: center; font-family: Arial, sans-serif; font-size: 26.7px; font-weight: 800;">
                    קיבלת מתנה!
                  </div>
                </div>

                <!-- Subtitle -->
                <div style="width: 141.5px; color: #4C7EFB; text-align: center; font-family: Arial, sans-serif; font-size: 10px; font-weight: 400;">
                  ממי המתנה? ${senderName}${hasLogo ? '' : ' כמובן!'}
                </div>

                <!-- Company Logo if provided -->
                ${hasLogo && companyLogo ? `
                <img 
                  src="${companyLogo}" 
                  alt="${senderName} Logo"
                  style="width: 230.5px; height: 43.9px; border-radius: 6.4px; object-fit: contain;"
                />
                ` : ''}

                <!-- Button with exact styling from Figma -->
                <div style="width: 113px; height: 29px;">
                  <a href="${giftToken ? `https://ggquxuidarjnayqkhthv.supabase.co/gift-registration?token=${giftToken}` : '#'}" style="display: flex; justify-content: center; align-items: center; width: 113px; height: 29px; padding: 4.2px; gap: 4.2px; border-radius: 23.4px; background: #4C7EFB; box-shadow: 4.2px 4.2px 0 0 rgba(0, 0, 0, 0.10); text-decoration: none;">
                    <div style="width: 48px; height: 6px; color: #FFF; text-align: center; font-family: Arial, sans-serif; font-size: 7.5px; font-weight: 700;">
                      לצפייה במתנה
                    </div>
                  </a>
                </div>

                <!-- Legal notice -->
                <div style="margin-top: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
                  <p style="margin: 0; color: #666; font-size: 11px; line-height: 1.4;">
                    על פי החוק, נדרשת הרשמה לפתיחת חשבון מניות.<br>
                    לחצו על הכפתור להשלמת התהליך.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0 0 10px 0;">
              <strong>Stock4U</strong> - פלטפורמת המניות המובילה בישראל
            </p>
            <p style="margin: 0; line-height: 1.4;">
              מייל זה נשלח אוטומטית. אנא אל תשיבו למייל זה.<br>
              לשאלות ותמיכה: support@stock4u.co.il
            </p>
          </div>
        </div>
      </div>
      
    </body>
    </html>`;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received email request');
    const emailData: EmailData = await req.json();
    console.log('Email data:', emailData);

    // Create gift registration token
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate unique token for gift registration
    const token = crypto.randomUUID();
    
    // Create gift registration record
    const { error: regError } = await supabase
      .from('gift_registrations')
      .insert({
        order_id: emailData.orderId, // This should be passed from the calling function
        token: token,
        recipient_name: emailData.recipientName,
        recipient_email: emailData.to,
        registration_status: 'pending'
      });

    if (regError) {
      console.error('Error creating gift registration:', regError);
      throw new Error('Failed to create gift registration');
    }

    const recipientHTML = generateGiftEmailHTML(emailData, true, token);
    
    const emailRequest = {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      html: recipientHTML
    };
    
    console.log('Sending email with data:', {
      from: emailRequest.from,
      to: emailRequest.to,
      subject: emailRequest.subject
    });
    
    const result = await resend.emails.send(emailRequest);
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
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);