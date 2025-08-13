import { supabase } from '@/integrations/supabase/client';

export interface EmailData {
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
  orderId: string;
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
  console.log('Starting to send gift notification emails...');
  console.log('Gift data:', giftData);

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

  // Email to recipient
  const recipientEmailData: EmailData = {
    from: 'Stock4U <onboarding@resend.dev>',
    to: giftData.recipientDetails?.email || giftData.recipientEmail || 'test@example.com',
    subject: `🎁 קיבלת מתנת מניות מ-${giftData.senderName || 'השולח'}!`,
    senderName: giftData.senderName || 'השולח',
    recipientName: giftData.recipientDetails?.name || giftData.recipientName || 'המקבל',
    giftDetails: {
      stocks: stocksList,
      totalValue,
      message: giftData.greetingMessage || giftData.message || 'מתנה מיוחדת בשבילך!',
      deliveryDate: giftData.recipientDetails?.deliveryDate || giftData.deliveryDate || 'מיידי'
    },
    companyLogo: giftData.companyLogo || giftData.uploadedImage,
    hasLogo: giftData.hasLogo || (giftData.companyLogo || giftData.uploadedImage) ? true : false,
    orderId: orderId
  };

  console.log('Recipient email data:', recipientEmailData);

  // Email to sender (confirmation)
  const senderEmailData: EmailData = {
    from: 'Stock4U <onboarding@resend.dev>',
    to: giftData.senderEmail || 'test@example.com',
    subject: `✅ המתנה נשלחה בהצלחה ל-${giftData.recipientDetails?.name || giftData.recipientName || 'המקבל'}`,
    senderName: giftData.senderName || 'השולח',
    recipientName: giftData.recipientDetails?.name || giftData.recipientName || 'המקבל',
    giftDetails: {
      stocks: stocksList,
      totalValue,
      message: giftData.greetingMessage || giftData.message || 'מתנה מיוחדת!',
      deliveryDate: giftData.recipientDetails?.deliveryDate || giftData.deliveryDate || 'מיידי'
    },
    companyLogo: giftData.companyLogo || giftData.uploadedImage,
    hasLogo: giftData.hasLogo || (giftData.companyLogo || giftData.uploadedImage) ? true : false,
    orderId: orderId
  };

  console.log('Sender email data:', senderEmailData);

  try {
    console.log('Sending emails...');
    
    await Promise.all([
      sendGiftEmails(recipientEmailData),
      sendGiftEmails(senderEmailData)
    ]);
    
    console.log('All emails sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending gift emails:', error);
    throw error;
  }
};