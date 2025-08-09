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
}

export const sendGiftEmails = async (emailData: EmailData) => {
  try {
    const response = await fetch('https://ggquxuidarjnayqkhthv.supabase.co/functions/v1/resend-email', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdncXV4dWlkYXJqbmF5cWtodGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3NTY1NjksImV4cCI6MjA3MDMzMjU2OX0.2CxN1Sj1l8dftUVigcMJXp9jNFfPPfQpE3MVSkAnp4A',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendGiftNotificationEmails = async (giftData: any) => {
  const stocksList = giftData.selectedStocks.map((stock: any) => ({
    symbol: stock.symbol,
    name: stock.name,
    amount: stock.amount
  }));

  const totalValue = giftData.selectedStocks.reduce((sum: number, stock: any) => 
    sum + (stock.amount * stock.price), 0
  );

  // Email to recipient
  const recipientEmailData: EmailData = {
    from: 'support@stock4u.co.il',
    to: giftData.recipientEmail,
    subject: `🎁 קיבלת מתנת מניות מ-${giftData.senderName}!`,
    senderName: giftData.senderName,
    recipientName: giftData.recipientName,
    giftDetails: {
      stocks: stocksList,
      totalValue,
      message: giftData.message,
      deliveryDate: giftData.deliveryDate
    }
  };

  // Email to sender (confirmation)
  const senderEmailData: EmailData = {
    from: 'support@stock4u.co.il',
    to: giftData.senderEmail || giftData.recipientEmail, // fallback if no sender email
    subject: `✅ המתנה נשלחה בהצלחה ל-${giftData.recipientName}`,
    senderName: giftData.senderName,
    recipientName: giftData.recipientName,
    giftDetails: {
      stocks: stocksList,
      totalValue,
      message: giftData.message,
      deliveryDate: giftData.deliveryDate
    }
  };

  try {
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