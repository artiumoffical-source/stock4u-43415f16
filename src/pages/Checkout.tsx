import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";
import { sendGiftNotificationEmails } from "@/services/emailService";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Checkout() {
  const navigate = useNavigate();
  const { giftData, resetGiftData } = useGift();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState({
    idNumber: "",
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    installments: "1",
    expiryMonth: "",
    expiryYear: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Extract order creation logic to reduce duplication
  const createOrderData = (paymentStatus: 'paid' | 'pending' = 'paid') => {
    return {
      buyer_name: formData.cardHolderName || giftData.senderName || 'Guest',
      buyer_email: giftData.senderEmail || 'noemail@example.com',
      buyer_phone: '',
      buyer_id: formData.idNumber,
      recipient_name: giftData.recipientDetails?.name || null,
      recipient_email: giftData.recipientDetails?.email || null,
      recipient_phone: '',
      delivery_method: 'email',
      delivery_date: (giftData.recipientDetails?.deliveryDate && giftData.recipientDetails.deliveryDate !== '//' && giftData.recipientDetails.deliveryDate.trim() !== '') 
        ? giftData.recipientDetails.deliveryDate 
        : null,
      selected_stocks: giftData.selectedStocks,
      total_amount: giftData.selectedStocks.reduce((total, stock) => total + stock.amount, 0),
      currency: 'ILS',
      selected_card: giftData.selectedCard || '',
      personal_message: giftData.greetingMessage || '',
      sender_name: giftData.senderName || '',
      status: 'new',
      payment_status: paymentStatus
    };
  };

  const saveOrder = async (orderData: any) => {
    const { data: orderResult, error: orderError } = await supabase.functions.invoke('create-order', {
      body: orderData
    });

    if (orderError || !orderResult.success) {
      throw new Error(orderError?.message || orderResult.error || 'Failed to create order');
    }

    return orderResult;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // [PAYMENT_DUPLICATE_GUARD] Prevent double submission
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, always navigate to success page
      const paymentSuccess = true;

      if (paymentSuccess) {
        const orderData = createOrderData('paid');
        const orderResult = await saveOrder(orderData);
        
        // Send gift notification emails (non-blocking)
        try {
          await sendGiftNotificationEmails(giftData, orderResult.orderId);
          toast({
            title: "המתנה נשלחה בהצלחה!",
            description: "מיילים נשלחו לשולח ולמקבל המתנה",
          });
        } catch (emailError) {
          toast({
            title: "שגיאה בשליחת המיילים",
            description: emailError instanceof Error ? emailError.message : "אנא צרו קשר עם השירות",
            variant: "destructive",
          });
        }
        
        // Clear cart data before navigation
        resetGiftData();
        navigate("/purchase-success");
      } else {
        navigate("/purchase-error");
      }
    } catch (error: any) {
      toast({
        title: "שגיאה בתהליך הרכישה",
        description: error.message || "אירעה שגיאה. אנא נסה שנית.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const handleAlternativePayment = async (method: string) => {
    // [PAYMENT_DUPLICATE_GUARD] Prevent double submission
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      // Simulate alternative payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const paymentSuccess = true;

      if (paymentSuccess) {
        const orderData = createOrderData('paid');
        const orderResult = await saveOrder(orderData);

        // Send gift notification emails (non-blocking)
        try {
          await sendGiftNotificationEmails(giftData, orderResult.orderId);
          toast({
            title: "המתנה נשלחה בהצלחה!",
            description: `מיילים נשלחו לשולח ולמקבל המתנה (תשלום דרך ${method})`,
          });
        } catch (error: any) {
          toast({
            title: error.message.includes('order') ? "שגיאה בשמירת ההזמנה" : "המתנה נשלחה בהצלחה",
            description: error.message.includes('order') ? error.message : "אבל הייתה בעיה בשליחת המיילים. אנא צרו קשר עם השירות",
            variant: error.message.includes('order') ? "destructive" : "default",
          });
        }
        
        resetGiftData();
        navigate("/purchase-success");
      } else {
        navigate("/purchase-error");
      }
    } catch (error: any) {
      toast({
        title: "שגיאה בתהליך התשלום",
        description: error.message || "אירעה שגיאה. אנא נסה שנית.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFF",
        direction: "rtl",
        fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
      }}
    >
      <Header />

      {/* Hero Section with Steps */}
      <StepHero currentStep={3} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12" dir="rtl">
        {/* Credit Card Payment Section */}
        <div className="flex flex-col items-center gap-10">
          {/* Title */}
          <h2 className="text-[#486284] text-2xl md:text-3xl font-bold text-center">
            תשלום בכרטיס אשראי:
          </h2>

          {/* Credit Card Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-8">
            {/* Row 1: Card Number (full width) */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  {/* Mastercard */}
                  <div className="w-9 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <svg width="22" height="14" viewBox="0 0 28 18" fill="none">
                      <circle cx="9" cy="9" r="8" fill="#E96036"/>
                      <circle cx="19" cy="9" r="8" fill="#F9A000"/>
                      <path d="M14 2.5C15.5 4 16.5 6.3 16.5 9C16.5 11.7 15.5 14 14 15.5C12.5 14 11.5 11.7 11.5 9C11.5 6.3 12.5 4 14 2.5Z" fill="#FF5E00"/>
                    </svg>
                  </div>
                  {/* Visa */}
                  <div className="w-9 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <svg width="24" height="8" viewBox="0 0 31 11" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.03187 10.2695H5.43478L3.48728 2.83965C3.39484 2.49788 3.19857 2.19574 2.90986 2.05333C2.18936 1.69546 1.39542 1.41065 0.529297 1.26701V0.980957H4.71301C5.29043 0.980957 5.72349 1.41065 5.79566 1.90969L6.80614 7.26908L9.40197 0.980957H11.9269L8.03187 10.2695ZM13.3694 10.2695H10.9167L12.9364 0.980957H15.3891L13.3694 10.2695ZM18.5636 3.55427C18.6358 3.054 19.0688 2.76795 19.5741 2.76795C20.368 2.69613 21.2328 2.83977 21.9546 3.1964L22.3877 1.19654C21.6659 0.910489 20.872 0.766846 20.1515 0.766846C17.7709 0.766846 16.0387 2.05345 16.0387 3.83908C16.0387 5.19751 17.2657 5.91077 18.1318 6.34046C19.0688 6.76892 19.4297 7.05497 19.3575 7.48342C19.3575 8.1261 18.6358 8.41215 17.9153 8.41215C17.0491 8.41215 16.183 8.19792 15.3903 7.84005L14.9573 9.84116C15.8234 10.1978 16.7604 10.3414 17.6265 10.3414C20.2958 10.412 21.9546 9.12665 21.9546 7.19737C21.9546 4.76781 18.5636 4.62541 18.5636 3.55427ZM30.5391 10.2695L28.5916 0.980957H26.4998C26.0667 0.980957 25.6336 1.26701 25.4893 1.69546L21.883 10.2695H24.4079L24.9119 8.91231H28.0142L28.3029 10.2695H30.5391ZM26.8591 3.48241L27.5796 6.9831H25.56L26.8591 3.48241Z" fill="#1521B2"/>
                    </svg>
                  </div>
                  {/* Diners */}
                  <div className="w-9 h-6 bg-white border border-gray-300 rounded flex items-center justify-center">
                    <svg width="18" height="14" viewBox="0 0 22 18" fill="none">
                      <path d="M12.3 17C17 17 21 13 21 8.5C21 3.5 17 0 12.3 0H9C4 0 0 3.5 0 8.5C0 13 4 17 9 17H12.3Z" fill="#4C7EFB"/>
                      <path d="M9 1C4.6 1 1 4.6 1 9C1 13.4 4.6 17 9 17C13.4 17 17 13.4 17 9C17 4.6 13.4 1 9 1ZM4 9C4 6.5 5.5 4.3 7.5 3.5V14.5C5.5 13.7 4 11.5 4 9ZM10.5 14.5V3.5C12.5 4.3 14 6.5 14 9C14 11.5 12.5 13.7 10.5 14.5Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                <label className="text-[#1B1919] text-lg font-normal">
                  מספר כרטיס
                </label>
              </div>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                placeholder="הכניסו מספר כרטיס"
                className="w-full h-14 px-5 rounded-lg border border-[#4C7EFB] bg-[#F5F7FC] text-[#3C4382] text-right text-lg focus:outline-none focus:ring-2 focus:ring-[#4C7EFB]"
              />
            </div>

            {/* Row 2: Cardholder Name | ID Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cardholder Name */}
              <div>
                <label className="block text-[#1B1919] text-lg font-normal mb-3 text-right">
                  שם בעל הכרטיס
                </label>
                <input
                  type="text"
                  value={formData.cardHolderName}
                  onChange={(e) => handleInputChange("cardHolderName", e.target.value)}
                  placeholder="הכניסו שם כאן"
                  className="w-full h-14 px-5 rounded-lg border border-[#4C7EFB] bg-[#F5F7FC] text-[#3C4382] text-right text-lg focus:outline-none focus:ring-2 focus:ring-[#4C7EFB]"
                />
              </div>

              {/* ID Number */}
              <div>
                <label className="block text-[#1B1919] text-lg font-normal mb-3 text-right">
                  תעודת זהות מחזיק כרטיס
                </label>
                <input
                  type="text"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="הכניסו מספר תעודת זהות"
                  className="w-full h-14 px-5 rounded-lg border border-[#4C7EFB] bg-[#F5F7FC] text-[#3C4382] text-right text-lg focus:outline-none focus:ring-2 focus:ring-[#4C7EFB]"
                />
              </div>
            </div>

            {/* Row 3: Expiry Date | CVV */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expiry Date */}
              <div>
                <label className="block text-[#1B1919] text-lg font-normal mb-3 text-right">
                  תאריך תוקף הכרטיס
                </label>
                <div className="flex gap-4" dir="rtl">
                  {/* Year */}
                  <div className="relative flex-1">
                    <select
                      value={formData.expiryYear}
                      onChange={(e) => handleInputChange("expiryYear", e.target.value)}
                      className="w-full h-14 px-5 pr-10 rounded-lg border border-[#4C7EFB] bg-[#F5F7FC] text-[#3C4382] text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#4C7EFB] appearance-none cursor-pointer"
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                        <option key={year} value={year.toString()}>{year}</option>
                      ))}
                    </select>
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="8" viewBox="0 0 18 12" fill="none">
                      <path d="M1 1.68L9.13 9.82L17.27 1.68" stroke="#486284" strokeWidth="2"/>
                    </svg>
                  </div>
                  {/* Month */}
                  <div className="relative flex-1">
                    <select
                      value={formData.expiryMonth}
                      onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
                      className="w-full h-14 px-5 pr-10 rounded-lg border border-[#4C7EFB] bg-[#F5F7FC] text-[#3C4382] text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#4C7EFB] appearance-none cursor-pointer"
                    >
                      <option value="">חודש</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month.toString().padStart(2, "0")}>
                          {month.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="8" viewBox="0 0 18 12" fill="none">
                      <path d="M1 1.68L9.13 9.82L17.27 1.68" stroke="#486284" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* CVV */}
              <div>
                <label className="block text-[#1B1919] text-lg font-normal mb-3 text-right">
                  CVV (3 ספרות בגב הכרטיס)
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  placeholder="XXX"
                  maxLength={3}
                  className="w-full h-14 px-5 rounded-lg border border-[#4C7EFB] bg-[#F5F7FC] text-[#3C4382] text-right text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-[#4C7EFB]"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Alternative Payment Options */}
        <div className="flex flex-col items-center gap-10 mt-16">
          <h3 className="text-[#486284] text-2xl md:text-3xl font-bold text-center">
            אופציות נוספות לתשלום:
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4" dir="rtl">
            {/* Google Pay */}
            <button
              type="button"
              onClick={() => handleAlternativePayment("Google Pay")}
              className="flex items-center justify-center gap-2 px-5 py-3 min-w-[160px] rounded-xl border-2 border-[#DBE3F3] bg-white hover:border-[#4C7EFB] hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="text-[#1B1919] text-base">שלמו עם -</span>
              <svg width="18" height="18" viewBox="0 0 21 21" fill="none">
                <path d="M20.07 10.65C20.07 9.95 20.01 9.24 19.9 8.55H10.29V12.53H15.79C15.57 13.81 14.83 14.95 13.76 15.67V18.26H17.04C18.96 16.46 20.07 13.81 20.07 10.65Z" fill="#4285F4"/>
                <path d="M10.29 20.75C13.03 20.75 15.35 19.83 17.04 18.26L13.76 15.67C12.84 16.3 11.66 16.66 10.29 16.66C7.63 16.66 5.38 14.84 4.57 12.4H1.19V15.07C2.92 18.56 6.44 20.75 10.29 20.75Z" fill="#27B345"/>
                <path d="M4.57 12.4C4.15 11.12 4.15 9.73 4.57 8.44V5.78H1.19C-0.26 8.7-0.26 12.14 1.19 15.06L4.57 12.4Z" fill="#FFC547"/>
                <path d="M10.29 4.18C11.75 4.15 13.15 4.71 14.19 5.73L17.11 2.77C15.26 1.02 12.82 0.06 10.29 0.09C6.44 0.09 2.92 2.3 1.19 5.78L4.57 8.45C5.38 6 7.63 4.18 10.29 4.18Z" fill="#E96036"/>
              </svg>
              <span className="text-[#486284] text-lg">Pay</span>
            </button>

            {/* Apple Pay */}
            <button
              type="button"
              onClick={() => handleAlternativePayment("Apple Pay")}
              className="flex items-center justify-center gap-2 px-5 py-3 min-w-[160px] rounded-xl border-2 border-[#DBE3F3] bg-white hover:border-[#4C7EFB] hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="text-[#1B1919] text-base">שלמו עם -</span>
              <svg width="50" height="20" viewBox="0 0 62 26" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.64 5.38C9.77 5.47 10.91 4.8 11.62 3.96C12.31 3.08 12.77 1.91 12.66 0.71C11.65 0.76 10.41 1.38 9.7 2.26C9.05 3.01 8.5 4.23 8.64 5.38ZM22.13 20.79V2.14H29.04C32.61 2.14 35.11 4.63 35.11 8.26C35.11 11.9 32.57 14.41 28.95 14.41H24.99V20.79H22.13ZM12.64 5.61C11.64 5.55 10.73 5.91 9.99 6.2C9.52 6.39 9.12 6.55 8.81 6.55C8.47 6.55 8.05 6.38 7.58 6.19C6.97 5.95 6.27 5.66 5.53 5.68C3.84 5.7 2.27 6.67 1.4 8.21C-0.37 11.3 0.94 15.87 2.66 18.38C3.5 19.63 4.5 20.99 5.82 20.94C6.41 20.92 6.83 20.74 7.26 20.55C7.76 20.34 8.28 20.12 9.09 20.12C9.87 20.12 10.36 20.33 10.84 20.54C11.29 20.74 11.73 20.93 12.37 20.92C13.74 20.89 14.6 19.67 15.44 18.43C16.35 17.09 16.75 15.79 16.81 15.59L16.81 15.57C16.81 15.57 16.8 15.56 16.78 15.55C16.48 15.41 14.17 14.34 14.14 11.47C14.12 9.05 15.98 7.83 16.27 7.64L16.31 7.62C15.12 5.84 13.28 5.65 12.64 5.61ZM40.33 20.93C42.13 20.93 43.79 20.01 44.55 18.55H44.61V20.79H47.25V11.5C47.25 8.81 45.13 7.08 41.85 7.08C38.82 7.08 36.57 8.84 36.49 11.25H39.06C39.28 10.1 40.33 9.35 41.77 9.35C43.52 9.35 44.5 10.18 44.5 11.69V12.72L40.93 12.94C37.61 13.14 35.82 14.52 35.82 16.91C35.82 19.33 37.67 20.93 40.33 20.93ZM41.1 18.72C39.57 18.72 38.61 17.98 38.61 16.84C38.61 15.67 39.54 14.98 41.32 14.88L44.5 14.67V15.73C44.5 17.47 43.04 18.72 41.1 18.72ZM56.03 21.52C54.89 24.78 53.57 25.86 50.79 25.86C50.57 25.86 49.86 25.83 49.7 25.79V23.55C49.88 23.57 50.31 23.6 50.54 23.6C51.8 23.6 52.51 23.06 52.95 21.66L53.21 20.83L48.36 7.26H51.35L54.72 18.27H54.78L58.15 7.26H61.06L56.03 21.52ZM24.99 4.58H28.29C30.77 4.58 32.19 5.92 32.19 8.27C32.19 10.63 30.77 11.98 28.28 11.98H24.99V4.58Z" fill="#1B1919"/>
              </svg>
            </button>

            {/* Bit */}
            <button
              type="button"
              onClick={() => handleAlternativePayment("Bit")}
              className="flex items-center justify-center gap-2 px-5 py-3 min-w-[160px] rounded-xl border-2 border-[#DBE3F3] bg-white hover:border-[#4C7EFB] hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="text-[#1B1919] text-base">שלמו עם -</span>
              <svg width="35" height="18" viewBox="0 0 40 23" fill="none">
                <path d="M3.59 8.56C3.65 8.63 4.78 7.75 4.96 7.65C7 6.52 9.6 6.74 11.56 7.92C14.79 9.84 15.65 14.13 14.38 17.51C14.1 18.24 13.68 18.89 13.26 19.55C16.27 18.71 18.57 16.36 18.83 13.18C18.95 11.66 18.62 9.71 18.84 8.28C19.09 6.63 21.53 6.43 22.06 8.09C22.24 10.03 22.08 12.07 22.06 14.05C22.05 14.78 22.06 15.51 22.11 16.22C22.28 18.64 23.17 20.08 25.81 19.78C29.72 19.34 28.65 12.72 28.8 10.08H26.28C26.23 10.08 25.48 9.65 25.4 9.56C24.89 9.02 24.93 8 25.4 7.45C25.54 7.28 26.1 6.92 26.28 6.92H28.8V1.84C28.8 1.36 29.96 0.73 30.47 0.76C31.17 0.79 32.08 1.6 32.08 2.31V6.92H36.71C37.22 6.92 37.95 7.97 37.95 8.5C37.95 9.12 37.21 10.08 36.6 10.08H32.08V16.92C32.08 17.07 32.4 18.06 32.49 18.26C33.02 19.43 34.36 19.74 35.45 19.11C36 18.78 36.59 17.8 37.19 17.68C39.41 17.26 39.64 19.71 38.36 21.07C36.13 23.44 31.32 23.26 29.85 20.13C27.24 24.24 20.17 23.32 19.42 18.26L18.37 19.61C15.22 22.78 7.55 23.62 3.7 21.48C0.91 19.92 0.42 17.06 0.3 14.12C0.16 10.8 0.02 5.9 0.3 2.65C0.4 1.49 1.11 0.43 2.42 0.78C2.71 0.86 3.59 1.58 3.59 1.84V8.56ZM6.84 10.23C2.56 10.85 2.52 19 7.28 19.43C13.19 19.96 13.16 9.31 6.84 10.23Z" fill="#4C7EFB"/>
                <path d="M20.33 0.75C22.71 0.57 22.95 4.18 20.65 4.36C18.17 4.54 18.02 0.93 20.33 0.75Z" fill="#4C7EFB"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-12">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-12 py-3 rounded-full bg-[#4C7EFB] text-white text-lg font-bold shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "מעבד..." : "מעבר לתשלום"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}