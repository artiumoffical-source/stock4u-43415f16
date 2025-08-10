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
}

export const sendGiftEmails = async (emailData: EmailData) => {
  console.log('Sending email with data:', emailData);
  
  try {
    console.log('Making request to Supabase Edge Function...');
    
    const response = await fetch('https://ggquxuidarjnayqkhthv.supabase.co/functions/v1/send-smtp-email', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncXV4dWlkYXJqbmF5cWtodGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTY1NjksImV4cCI6MjA3MDMzMjU2OX0.2CxN1Sj1l8dftUVigcMJXp9jNFfPPfQpE3MVSkAnp4A',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendGiftNotificationEmails = async (giftData: any) => {
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
    from: 'support@stock4u.co.il',
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
    hasLogo: giftData.hasLogo || (giftData.companyLogo || giftData.uploadedImage) ? true : false
  };

  console.log('Recipient email data:', recipientEmailData);

  // Email to sender (confirmation)
  const senderEmailData: EmailData = {
    from: 'support@stock4u.co.il',
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
    hasLogo: giftData.hasLogo || (giftData.companyLogo || giftData.uploadedImage) ? true : false
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