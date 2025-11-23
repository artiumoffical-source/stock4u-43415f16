import { supabase } from '@/integrations/supabase/client';

export interface EmailData {
  from: string;
  to: string;
  subject: string;
  senderName: string;
  recipientName: string;
  orderId: string;
  isForRecipient?: boolean;
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

export const sendGiftEmails = async (emailData: EmailData) => {
  console.log('Sending email with data:', emailData);
  
  try {
    console.log('Calling Supabase Edge Function securely...');
    
    const { data, error } = await supabase.functions.invoke('send-smtp-email', {
      body: emailData
    });

    if (error) {
      console.error('Error response:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendGiftNotificationEmails = async (giftData: any, orderId: string) => {
  console.log('[EMAIL_START] Starting to send gift notification emails...');
  console.log('Gift data:', giftData);

  // Validate required email addresses
  const recipientEmail = giftData.recipientDetails?.email || giftData.recipientEmail;
  if (!recipientEmail) {
    console.error('[EMAIL_VALIDATION_ERROR] Recipient email is required but missing');
    throw new Error('Recipient email is required but missing');
  }

  const stocksList = giftData.selectedStocks?.map((stock: any) => ({
    symbol: stock.symbol,
    name: stock.name,
    amount: stock.amount
  })) || [];

  const totalValue = giftData.selectedStocks?.reduce((sum: number, stock: any) => 
    sum + (stock.amount * (stock.price || 0)), 0
  ) || 0;

  console.log('Stocks list:', stocksList);
  console.log('Total value:', totalValue);
  console.log('Recipient email:', recipientEmail);
  console.log('Sender email:', giftData.senderEmail);

  // Email to recipient (REQUIRED)
  const recipientEmailData: EmailData = {
    from: 'Stock4U <onboarding@resend.dev>',
    to: recipientEmail,
    subject: `🎁 קיבלת מתנת מניות מ-${giftData.senderName || 'השולח'}!`,
    senderName: giftData.senderName || 'השולח',
    recipientName: giftData.recipientDetails?.name || giftData.recipientName || 'המקבל',
    orderId: orderId,
    isForRecipient: true,
    giftDetails: {
      stocks: stocksList,
      totalValue,
      message: giftData.greetingMessage || giftData.message || 'מתנה מיוחדת בשבילך!',
      deliveryDate: giftData.recipientDetails?.deliveryDate || giftData.deliveryDate || 'מיידי'
    },
    companyLogo: giftData.companyLogo || giftData.uploadedImage,
    hasLogo: giftData.hasLogo || (giftData.companyLogo || giftData.uploadedImage) ? true : false,
  };

  console.log('Recipient email data:', recipientEmailData);

  try {
    console.log('[EMAIL_START] Sending recipient email...');
    await sendGiftEmails(recipientEmailData);
    console.log('[EMAIL_OK] Recipient email sent successfully');

    // Email to sender (OPTIONAL - only if sender email exists)
    if (giftData.senderEmail && giftData.senderEmail.trim() !== '') {
      console.log('[EMAIL_START] Sending sender confirmation email...');
      
      const senderEmailData: EmailData = {
        from: 'Stock4U <onboarding@resend.dev>',
        to: giftData.senderEmail.trim(),
        subject: `✅ המתנה נשלחה בהצלחה ל-${giftData.recipientDetails?.name || giftData.recipientName || 'המקבל'}`,
        senderName: giftData.senderName || 'השולח',
        recipientName: giftData.recipientDetails?.name || giftData.recipientName || 'המקבל',
        orderId: orderId,
        isForRecipient: false,
        giftDetails: {
          stocks: stocksList,
          totalValue,
          message: giftData.greetingMessage || giftData.message || 'מתנה מיוחדת!',
          deliveryDate: giftData.recipientDetails?.deliveryDate || giftData.deliveryDate || 'מיידי'
        },
        companyLogo: giftData.companyLogo || giftData.uploadedImage,
        hasLogo: giftData.hasLogo || (giftData.companyLogo || giftData.uploadedImage) ? true : false,
      };

      try {
        await sendGiftEmails(senderEmailData);
        console.log('[EMAIL_OK] Sender confirmation email sent successfully');
      } catch (senderError) {
        // Log but don't fail - sender email is optional
        console.warn('[EMAIL_FAIL] Failed to send sender email (non-critical):', senderError);
      }
    } else {
      console.log('[EMAIL_SKIP] Sender email not provided, skipping sender confirmation');
    }
    
    return true;
  } catch (error) {
    console.error('[EMAIL_FAIL] Error sending gift emails:', error);
    throw error;
  }
};