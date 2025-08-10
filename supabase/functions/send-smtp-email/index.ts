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
  const stocksList = emailData.giftDetails.stocks.map(stock => 
    `<div style="display: flex; justify-content: space-between; padding: 15px 20px; border-bottom: 1px solid #E0E7FF; color: #486284; font-size: 16px;">
      <span style="font-weight: 600; color: #4C7EFB;">${stock.amount}</span>
      <span style="flex: 1; text-align: center;">${stock.name}</span>
      <span style="font-weight: 500;">${stock.symbol}</span>
    </div>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isForRecipient ? `🎁 קיבלת מתנת מניות מ-${emailData.senderName}!` : `✅ המתנה נשלחה בהצלחה ל-${emailData.recipientName}`}</title>
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
          padding: 0;
          direction: rtl;
          line-height: 1.6;
          width: 100%;
          min-height: 100vh;
        }
        
        .hebrew-font {
          font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .email-container {
          position: relative;
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          background: white;
          min-height: 1919px;
        }
        
        .header {
          position: relative;
          z-index: 20;
          width: 100%;
          height: 100px;
          background: white;
          border-bottom: 1px solid #DDD;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          width: 1868px;
          position: absolute;
          left: 33px;
          top: 13px;
          height: 61px;
        }
        
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .cart-icon {
          position: relative;
          width: 47.832px;
          height: 46.549px;
        }
        
        .cart-circle {
          width: 48px;
          height: 48px;
          background: #4C7EFB;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 10px 10px 0 0 rgba(0,0,0,0.10);
        }
        
        .exit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 119px;
          height: 47px;
          background: #DBE3F3;
          border-radius: 25px;
          color: #4C7EFB;
          font-weight: bold;
          font-size: 18px;
        }
        
        .header-nav {
          display: flex;
          align-items: center;
          gap: 24px;
          color: #4C7EFB;
          font-size: 18px;
        }
        
        .stock4u-logo {
          position: absolute;
          width: 281px;
          height: 66px;
          left: 820px;
          top: 14px;
        }
        
        .main-section {
          position: relative;
          width: 100%;
          height: 785px;
          background: #FFC547;
          overflow: hidden;
          top: 0;
        }
        
        .background-pattern {
          position: absolute;
          width: 2129px;
          height: 1344px;
          left: -118px;
          top: -261px;
          background: url('https://api.builder.io/api/v1/image/assets/TEMP/7a0ce1897b9a92990f9d99cb40666973ee6b2c50?width=4258');
          background-size: cover;
        }
        
        .decorative-elements {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .mascot-container {
          position: absolute;
          width: 220px;
          height: 348px;
          left: 846px;
          top: 106px;
          filter: drop-shadow(5.036px 5.036px 0 rgba(0, 0, 0, 0.10));
        }
        
        .main-card {
          position: absolute;
          width: 1184px;
          height: 599px;
          left: 368px;
          top: 628px;
          padding: 21px 19px;
          border-radius: 34.431px;
          background: #FFF;
          box-shadow: 0 4px 39.1px 0 rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          width: 1084px;
        }
        
        .heading-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 762.805px;
        }
        
        .excitement-text {
          font-weight: bold;
          color: #E96036;
          text-align: center;
          font-size: 34px;
          width: 468.08px;
        }
        
        .gift-text {
          font-weight: bold;
          color: #E96036;
          text-align: center;
          font-size: 64px;
          width: 468.08px;
        }
        
        .sender-info {
          color: #4C7EFB;
          text-align: center;
          font-size: 24px;
          font-weight: normal;
          width: 338.879px;
        }
        
        .company-logo {
          border-radius: 15.421px;
          width: 552.254px;
          height: 105.149px;
          object-fit: contain;
        }
        
        .action-button {
          position: relative;
          width: 270px;
          height: 70px;
        }
        
        .button-content {
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          padding: 8px;
          width: 270px;
          height: 70px;
        }
        
        .button-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 25px;
          background: #4C7EFB;
          box-shadow: 10px 10px 0 0 rgba(0,0,0,0.10);
          width: 100%;
          height: 50px;
        }
        
        .button-text {
          font-weight: bold;
          color: white;
          font-size: 18px;
        }
        
        .stats-section {
          position: absolute;
          display: flex;
          align-items: flex-start;
          gap: 24px;
          width: 1216px;
          left: 352px;
          top: 1358px;
          height: 188px;
        }
        
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          flex: 1;
          padding: 32px;
          border-radius: 24px;
          background: rgba(239,242,246,0.40);
        }
        
        .stat-number {
          color: #486284;
          text-align: center;
          font-size: 60px;
          font-weight: bold;
          line-height: 76px;
          letter-spacing: 0.5px;
          font-family: 'DM Sans', sans-serif;
        }
        
        .stat-description {
          color: #8CA2C0;
          text-align: center;
          font-size: 20px;
          font-weight: normal;
          line-height: 32px;
          letter-spacing: 0.5px;
        }
        
        .footer {
          position: absolute;
          left: 0;
          top: 1611px;
          width: 100%;
          background: #DBE3F3;
          padding: 32px 0;
        }
        
        .footer-content {
          display: flex;
          justify-content: center;
        }
        
        .footer-inner {
          display: flex;
          align-items: center;
          gap: 48px;
          max-width: 1024px;
        }
        
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .footer-mascot {
          position: relative;
          width: 64px;
          height: 80px;
        }
        
        .footer-logo-text {
          color: #4C7EFB;
          font-size: 20px;
          font-weight: bold;
        }
        
        .footer-section {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        
        .footer-title {
          color: #4C7EFB;
          font-size: 18px;
          font-weight: bold;
        }
        
        .footer-links {
          display: flex;
          gap: 16px;
          font-size: 14px;
        }
        
        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .footer-contact-text {
          color: #4C7EFB;
          font-size: 14px;
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100%;
            min-height: auto;
          }
          
          .header {
            height: 80px;
          }
          
          .header-content {
            width: 100%;
            left: 20px;
            right: 20px;
            padding: 0 20px;
          }
          
          .stock4u-logo {
            position: static;
            width: 200px;
            height: 50px;
          }
          
          .main-section {
            height: 500px;
          }
          
          .main-card {
            position: static;
            width: 95%;
            margin: 20px auto;
            height: auto;
            padding: 20px;
          }
          
          .card-content {
            width: 100%;
            gap: 20px;
          }
          
          .gift-text {
            font-size: 48px;
          }
          
          .excitement-text {
            font-size: 24px;
          }
          
          .company-logo {
            width: 100%;
            height: auto;
            max-height: 80px;
          }
          
          .stats-section {
            position: static;
            width: 95%;
            margin: 20px auto;
            flex-direction: column;
            height: auto;
            gap: 16px;
          }
          
          .footer {
            position: static;
          }
          
          .footer-inner {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container hebrew-font" dir="rtl">
        <!-- Header Section -->
        <header class="header">
          <div class="header-content">
            <!-- Left side - Cart & Exit -->
            <div class="header-left">
              <!-- Cart Icon -->
              <div class="cart-icon">
                <div class="cart-circle">
                  <svg width="24" height="24" viewBox="0 0 25 25" fill="none">
                    <path d="M19.9003 10.3121H5.30426C5.00888 10.3124 4.71739 10.3795 4.45158 10.5083C4.18577 10.6372 3.95252 10.8244 3.76926 11.0561C3.58676 11.2871 3.45924 11.5566 3.39635 11.8442C3.33345 12.1318 3.33684 12.43 3.40626 12.7161L4.97126 19.1241C5.19785 19.9497 5.68982 20.6778 6.37126 21.1961C7.05326 21.7151 7.88826 21.9961 8.74726 21.9961H16.4553C17.3143 21.9961 18.1493 21.7151 18.8313 21.1961C19.5127 20.6778 20.0047 19.9497 20.2313 19.1241L21.7963 12.7171C21.9016 12.2851 21.8554 11.8301 21.6653 11.4282C21.4753 11.0262 21.1529 10.7018 20.7523 10.5091C20.4857 10.3811 20.194 10.3138 19.8983 10.3121M8.68926 14.2061V18.1011M12.6023 14.2061V18.1011M16.5153 14.2061V18.1011M19.4503 10.3121C19.4499 9.41614 19.2725 8.52909 18.9283 7.70191C18.584 6.87473 18.0797 6.12374 17.4443 5.4921C16.1577 4.21259 14.4167 3.4949 12.6023 3.4961C10.7878 3.4949 9.04678 4.21259 7.76026 5.4921C7.12502 6.12383 6.62088 6.87485 6.2768 7.70203C5.93271 8.5292 5.75547 9.41621 5.75526 10.3121" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <!-- Exit Button -->
              <div class="exit-button">
                <span>יציאה</span>
              </div>
            </div>

            <!-- Right side - Navigation -->
            <div class="header-nav">
              <div style="display: flex; align-items: center; gap: 8px; padding: 8px;">
                <svg width="20" height="20" viewBox="0 0 23 22" fill="none">
                  <path d="M20.5659 18.2617L16.1504 14.047C17.4096 12.6648 18.0573 10.8699 17.9571 9.04073C17.8569 7.21155 17.0166 5.49097 15.6133 4.24167C14.21 2.99237 12.3534 2.31195 10.4347 2.34385C8.51614 2.37574 6.68546 3.11746 5.3286 4.41265C3.97173 5.70784 3.1947 7.45531 3.16128 9.2867C3.12786 11.1181 3.84068 12.8903 5.14947 14.2298C6.45827 15.5693 8.26078 16.3715 10.1771 16.4671C12.0933 16.5628 13.9737 15.9445 15.4217 14.7426L19.8371 18.9573C19.9349 19.0443 20.0642 19.0916 20.1978 19.0894C20.3313 19.0871 20.4588 19.0355 20.5533 18.9453C20.6477 18.8551 20.7018 18.7334 20.7042 18.6059C20.7066 18.4784 20.657 18.355 20.5659 18.2617ZM4.21715 9.42203C4.21715 8.22144 4.59012 7.0478 5.28889 6.04955C5.98767 5.05129 6.98087 4.27324 8.14289 3.81379C9.30492 3.35435 10.5836 3.23413 11.8172 3.46836C13.0508 3.70258 14.1839 4.28072 15.0733 5.12967C15.9627 5.97862 16.5683 7.06025 16.8137 8.23777C17.0591 9.4153 16.9331 10.6358 16.4518 11.745C15.9705 12.8542 15.1554 13.8023 14.1096 14.4693C13.0638 15.1363 11.8343 15.4923 10.5765 15.4923C8.89054 15.4904 7.2742 14.8502 6.08203 13.7122C4.88985 12.5743 4.21919 11.0314 4.21715 9.42203Z" fill="currentColor"/>
                </svg>
                <span style="opacity: 0.3; color: #4C7EFB; letter-spacing: -2.34px;">________________</span>
                <span>חיפוש</span>
              </div>
              <div style="padding: 8px;"><span>קריירה</span></div>
              <div style="padding: 8px;"><span>רשימת מתנות</span></div>
              <div style="padding: 8px;"><span>אודות</span></div>
              <div style="padding: 8px;"><span>בית</span></div>
            </div>
          </div>

          <!-- Stock4U Logo - Center -->
          <div class="stock4u-logo">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/b4b3197717142c54d34f612cc618c552d7d121d6?width=562" 
              alt="Stock4U Logo" 
              style="width: 100%; height: 100%; object-fit: contain;"
            />
          </div>
        </header>

        <!-- Main Yellow Background Section -->
        <main class="main-section">
          <!-- Background Pattern -->
          <div class="background-pattern"></div>

          <!-- Decorative Elements -->
          <div class="decorative-elements">
            <!-- Currency Icons -->
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/dc30876d4e45ff347666118bde718b5cf5c9ffb0?width=175"
              alt="Currency"
              style="position: absolute; width: 88px; height: 143px; transform: rotate(19.423deg); filter: drop-shadow(12.862px 12.862px 0 rgba(0, 0, 0, 0.10)); left: 1438px; top: 58px;"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a70d9027dcb8137595aae5c3f6f8bb37597cbfdd?width=175"
              alt="Currency"
              style="position: absolute; width: 88px; height: 143px; transform: rotate(-0.058deg); filter: drop-shadow(12.862px 12.862px 0 rgba(0, 0, 0, 0.10)); left: 291px; top: 612px;"
            />
            <!-- More decorative elements... -->
          </div>

          <!-- Stock4U Mascot -->
          <div class="mascot-container">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1e0545a47a34fcc8241c785c8ca54af1ef8130e1?width=434" 
              alt="Stock4U Mascot" 
              style="width: 100%; height: 100%; object-fit: contain;"
            />
          </div>
        </main>

        <!-- Main Content Card -->
        <div class="main-card">
          <div class="card-content">
            <!-- Heading Section -->
            <div class="heading-section">
              <div class="excitement-text hebrew-font">
                איזה כיף!
              </div>
              <div class="gift-text hebrew-font">
                קיבלת מתנה!
              </div>
            </div>

            <!-- Sender Info -->
            <div class="sender-info">
              ממי המתנה? ${emailData.senderName} כמובן!
            </div>

            <!-- Company Logo - Only show if hasLogo is true -->
            ${emailData.hasLogo && emailData.companyLogo ? `
            <img 
              src="${emailData.companyLogo}" 
              alt="${emailData.senderName} Logo" 
              class="company-logo"
            />
            ` : ''}

            <!-- Stock Details -->
            <div style="width: 100%; max-width: 600px;">
              <div style="background: #F8FAFF; border-radius: 12px; border: 1px solid #E0E7FF; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #689EDA 0%, #4C7EFB 100%); color: white; padding: 16px; text-align: center; font-size: 18px; font-weight: 600;">
                  📊 המניות שקיבלת במתנה
                </div>
                ${stocksList}
                <div style="padding: 20px; text-align: center; background: linear-gradient(135deg, #4C7EFB 0%, #689EDA 100%); color: white;">
                  <div style="font-size: 16px; margin-bottom: 8px;">💎 סך הכל שווי המתנה</div>
                  <div style="font-size: 28px; font-weight: bold;">₪${emailData.giftDetails.totalValue.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <!-- Personal Message -->
            ${emailData.giftDetails.message ? `
            <div style="background: linear-gradient(135deg, #DBE3F3 0%, #F8FAFF 100%); border-right: 4px solid #4C7EFB; padding: 20px; border-radius: 12px; width: 100%; max-width: 600px;">
              <div style="color: #486284; font-weight: 600; margin-bottom: 8px;">💌 הודעה אישית מ${emailData.senderName}:</div>
              <div style="color: #8CA2C0; font-size: 15px; line-height: 1.6;">${emailData.giftDetails.message}</div>
            </div>
            ` : ''}

            <!-- Action Button -->
            <div class="action-button">
              <div class="button-content">
                <div class="button-inner">
                  <span class="button-text hebrew-font">לצפייה במתנה</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics Section -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-number">
              24+
            </div>
            <div class="stat-description">
              מדינות שבהם אנו עובדים
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-number">
              17M
            </div>
            <div class="stat-description">
              אנשים שהאמינו בנו
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-number">
              +95%
            </div>
            <div class="stat-description">
              לקוחות מרוצים
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
          <div class="footer-content">
            <div class="footer-inner">
              <!-- Stock4U Logo and Mascot -->
              <div class="footer-brand">
                <div class="footer-mascot">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/c6f4ef138fe2fcff4c861a628f2808355b08ca4e?width=247"
                    alt="Stock4U Mascot"
                    style="width: 100%; height: 100%; object-fit: contain;"
                  />
                </div>
                <div class="footer-logo-text hebrew-font">
                  STOCK4U
                </div>
              </div>

              <!-- Contact -->
              <div class="footer-section">
                <h3 class="footer-title hebrew-font">צרו קשר</h3>
                <div class="footer-contact-item">
                  <span class="footer-contact-text">support@stock4u.co.il</span>
                  <svg width="16" height="16" viewBox="0 0 35 33" fill="none">
                    <path d="M27.9883 11.6182V21.0832C27.9883 21.8484 27.696 22.5847 27.171 23.1414C26.646 23.6982 25.9282 24.0333 25.1643 24.0782L24.9883 24.0832H10.9883C10.2231 24.0832 9.48677 23.7908 8.93002 23.2659C8.37327 22.7409 8.03817 22.0231 7.99328 21.2592L7.98828 21.0832V11.6182L17.4333 17.9152L17.5493 17.9812C17.686 18.048 17.8361 18.0827 17.9883 18.0827C18.1404 18.0827 18.2906 18.048 18.4273 17.9812L18.5433 17.9152L27.9883 11.6182Z" fill="currentColor"/>
                    <path d="M24.9886 8.08301C26.0686 8.08301 27.0156 8.65301 27.5436 9.51001L17.9886 15.88L8.43359 9.51001C8.68439 9.10283 9.02888 8.76151 9.43837 8.5145C9.84785 8.26749 10.3104 8.12195 10.7876 8.09001L10.9886 8.08301H24.9886Z" fill="currentColor"/>
                  </svg>
                </div>
                <div class="footer-contact-item">
                  <span class="footer-contact-text">03-12345678</span>
                  <svg width="16" height="16" viewBox="0 0 34 31" fill="none">
                    <path d="M10.2383 6.95801C10.2383 6.22866 10.528 5.52919 11.0437 5.01346C11.5595 4.49774 12.2589 4.20801 12.9883 4.20801H21.2383C21.9676 4.20801 22.6671 4.49774 23.1828 5.01346C23.6985 5.52919 23.9883 6.22866 23.9883 6.95801V23.458C23.9883 24.1874 23.6985 24.8868 23.1828 25.4026C22.6671 25.9183 21.9676 26.208 21.2383 26.208H12.9883C12.2589 26.208 11.5595 25.9183 11.0437 25.4026C10.528 24.8868 10.2383 24.1874 10.2383 23.458V6.95801ZM18.4883 22.083C18.4883 21.7183 18.3434 21.3686 18.0856 21.1107C17.8277 20.8529 17.478 20.708 17.1133 20.708C16.7486 20.708 16.3989 20.8529 16.141 21.1107C15.8831 21.3686 15.7383 21.7183 15.7383 22.083C15.7383 22.4477 15.8831 22.7974 16.141 23.0553C16.3989 23.3131 16.7486 23.458 17.1133 23.458C17.478 23.458 17.8277 23.3131 18.0856 23.0553C18.3434 22.7974 18.4883 22.4477 18.4883 22.083Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              <!-- Social Media -->
              <div class="footer-section">
                <h3 class="footer-title hebrew-font">עקבו אחרינו</h3>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span class="footer-contact-text">פייסבוק</span>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M15.7918 1.5H3.18346C2.97682 1.5 2.77863 1.58209 2.63251 1.72821C2.48639 1.87433 2.4043 2.07252 2.4043 2.27917V14.8875C2.4043 15.0941 2.48639 15.2923 2.63251 15.4385C2.77863 15.5846 2.97682 15.6667 3.18346 15.6667H9.9693V10.1771H8.12763V8.05208H9.9693V6.45833C9.93115 6.08416 9.97532 5.70617 10.0987 5.35088C10.2221 4.99559 10.4218 4.67159 10.6836 4.40162C10.9455 4.13165 11.2633 3.92225 11.6146 3.78809C11.966 3.65392 12.3425 3.59826 12.7176 3.625C13.269 3.62119 13.82 3.64958 14.368 3.71V5.6225H13.2418C12.3493 5.6225 12.1793 6.0475 12.1793 6.66375V8.03083H14.3043L14.028 10.1558H12.1793V15.6667H15.7918C15.8941 15.6667 15.9954 15.6465 16.09 15.6074C16.1845 15.5682 16.2704 15.5108 16.3428 15.4385C16.4151 15.3661 16.4725 15.2802 16.5117 15.1857C16.5508 15.0911 16.571 14.9898 16.571 14.8875V2.27917C16.571 2.17685 16.5508 2.07553 16.5117 1.98099C16.4725 1.88646 16.4151 1.80057 16.3428 1.72821C16.2704 1.65586 16.1845 1.59847 16.09 1.55931C15.9954 1.52015 15.8941 1.5 15.7918 1.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span class="footer-contact-text">אינסטגרם</span>
                    <svg width="16" height="16" viewBox="0 0 33 34" fill="none">
                      <path d="M17.5108 8.74902C18.4483 8.75152 18.9241 8.75652 19.335 8.76819L19.4966 8.77402C19.6833 8.78069 19.8675 8.78902 20.09 8.79902C20.9766 8.84069 21.5816 8.98069 22.1125 9.18652C22.6625 9.39819 23.1258 9.68486 23.5891 10.1474C24.013 10.5638 24.3409 11.0678 24.55 11.624C24.7558 12.1549 24.8958 12.7599 24.9375 13.6474C24.9475 13.869 24.9558 14.0532 24.9625 14.2407L24.9675 14.4024C24.98 14.8124 24.985 15.2882 24.9866 16.2257L24.9875 16.8474V17.939C24.9895 18.5469 24.9831 19.1547 24.9683 19.7624L24.9633 19.924C24.9566 20.1115 24.9483 20.2957 24.9383 20.5174C24.8966 21.4049 24.755 22.009 24.55 22.5407C24.3409 23.097 24.013 23.6009 23.5891 24.0174C23.1727 24.4413 22.6687 24.7692 22.1125 24.9782C21.5816 25.184 20.9766 25.324 20.09 25.3657L19.4966 25.3907L19.335 25.3957C18.9241 25.4074 18.4483 25.4132 17.5108 25.4149L16.8891 25.4157H15.7983C15.1902 25.4178 14.5821 25.4114 13.9741 25.3965L13.8125 25.3915C13.6146 25.384 13.4168 25.3754 13.2191 25.3657C12.3325 25.324 11.7275 25.184 11.1958 24.9782C10.6398 24.7691 10.1362 24.4412 9.71995 24.0174C9.29574 23.601 8.96754 23.097 8.75829 22.5407C8.55245 22.0099 8.41245 21.4049 8.37079 20.5174L8.34579 19.924L8.34162 19.7624C8.32626 19.1547 8.31931 18.5469 8.32079 17.939V16.2257C8.31848 15.6179 8.32459 15.01 8.33912 14.4024L8.34495 14.2407C8.35162 14.0532 8.35995 13.869 8.36995 13.6474C8.41162 12.7599 8.55162 12.1557 8.75745 11.624C8.9672 11.0675 9.29597 10.5636 9.72079 10.1474C10.1367 9.72365 10.6401 9.39575 11.1958 9.18652C11.7275 8.98069 12.3316 8.84069 13.2191 8.79902C13.4408 8.78902 13.6258 8.78069 13.8125 8.77402L13.9741 8.76902C14.5818 8.75422 15.1896 8.74783 15.7975 8.74986L17.5108 8.74902ZM16.6541 12.9157C15.5491 12.9157 14.4892 13.3547 13.7078 14.1361C12.9264 14.9175 12.4875 15.9773 12.4875 17.0824C12.4875 18.1874 12.9264 19.2472 13.7078 20.0286C14.4892 20.81 15.5491 21.249 16.6541 21.249C17.7592 21.249 18.819 20.81 19.6004 20.0286C20.3818 19.2472 20.8208 18.1874 20.8208 17.0824C20.8208 15.9773 20.3818 14.9175 19.6004 14.1361C18.819 13.3547 17.7592 12.9157 16.6541 12.9157ZM16.6541 14.5824C16.9824 14.5823 17.3075 14.6469 17.6109 14.7725C17.9142 14.8981 18.1898 15.0822 18.422 15.3143C18.6542 15.5464 18.8384 15.822 18.9641 16.1253C19.0898 16.4286 19.1545 16.7536 19.1545 17.0819C19.1546 17.4102 19.09 17.7353 18.9644 18.0387C18.8388 18.342 18.6547 18.6176 18.4226 18.8498C18.1905 19.082 17.9149 19.2662 17.6116 19.3919C17.3083 19.5176 16.9833 19.5823 16.655 19.5824C15.9919 19.5824 15.356 19.319 14.8872 18.8501C14.4183 18.3813 14.155 17.7454 14.155 17.0824C14.155 16.4193 14.4183 15.7834 14.8872 15.3146C15.356 14.8457 15.9919 14.5824 16.655 14.5824M21.03 11.6657C20.7537 11.6657 20.4887 11.7754 20.2934 11.9708C20.098 12.1661 19.9883 12.4311 19.9883 12.7074C19.9883 12.9836 20.098 13.2486 20.2934 13.4439C20.4887 13.6393 20.7537 13.749 21.03 13.749C21.3062 13.749 21.5712 13.6393 21.7665 13.4439C21.9619 13.2486 22.0716 12.9836 22.0716 12.7074C22.0716 12.4311 21.9619 12.1661 21.7665 11.9708C21.5712 11.7754 21.3062 11.6657 21.03 11.6657Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Quick Links -->
              <div class="footer-section">
                <h3 class="footer-title hebrew-font">קישורים</h3>
                <div class="footer-links">
                  <span class="footer-contact-text">אודות</span>
                  <span class="footer-contact-text">מדיניות פרטיות</span>
                  <span class="footer-contact-text">תנאי שימוש</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
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