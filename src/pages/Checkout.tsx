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
  const { giftData } = useGift();
  const { toast } = useToast();

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
      total_amount: giftData.selectedStocks.reduce((total, stock) => total + (stock.amount * 100), 0),
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
      console.error('Error saving order:', orderError || orderResult.error);
      console.error('Order data:', orderData);
      console.error('Gift data:', giftData);
      throw new Error(orderError?.message || orderResult.error || 'Failed to create order');
    }

    return orderResult;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing payment...", formData);

    // Simulate payment processing
    setTimeout(async () => {
      // Scroll to top before navigation
      window.scrollTo(0, 0);

      // For now, always navigate to success page
      // In the future, this will be determined by actual payment processing result
      const paymentSuccess = true; // This would come from payment gateway response

      if (paymentSuccess) {
        try {
          const orderData = createOrderData('paid');
          const orderResult = await saveOrder(orderData);

          console.log('Order saved successfully, ID:', orderResult.orderId);
          
          // Send gift notification emails
          try {
            console.log('Attempting to send gift notification emails...');
            await sendGiftNotificationEmails(giftData, orderResult.orderId);
            
            console.log('Emails sent successfully');
            toast({
              title: "המתנה נשלחה בהצלחה!",
              description: "מיילים נשלחו לשולח ולמקבל המתנה",
            });
          } catch (emailError) {
            console.error("Failed to send emails:", emailError);
            toast({
              title: "שגיאה בשליחת המיילים",
              description: emailError instanceof Error ? emailError.message : "אנא צרו קשר עם השירות",
              variant: "destructive",
            });
          }
        } catch (error: any) {
          console.error('Error in checkout process:', error);
          toast({
            title: "שגיאה בתהליך הרכישה",
            description: error.message || "אירעה שגיאה. אנא נסה שנית.",
            variant: "destructive",
          });
          return;
        }
        navigate("/purchase-success");
      } else {
        navigate("/purchase-error");
      }
    }, 1000);
  };

  const handleAlternativePayment = async (method: string) => {
    console.log(`Processing payment with ${method}...`);

    // Simulate alternative payment processing
    setTimeout(async () => {
      // Scroll to top before navigation
      window.scrollTo(0, 0);

      // For now, always navigate to success page
      // In the future, this will be determined by actual payment processing result
      const paymentSuccess = true; // This would come from payment gateway response

      if (paymentSuccess) {
        try {
          const orderData = createOrderData('paid');
          const orderResult = await saveOrder(orderData);

          // Send gift notification emails
          await sendGiftNotificationEmails(giftData, orderResult.orderId);
          toast({
            title: "המתנה נשלחה בהצלחה!",
            description: `מיילים נשלחו לשולח ולמקבל המתנה (תשלום דרך ${method})`,
          });
        } catch (error: any) {
          console.error("Failed to process payment:", error);
          toast({
            title: error.message.includes('order') ? "שגיאה בשמירת ההזמנה" : "המתנה נשלחה בהצלחה",
            description: error.message.includes('order') ? error.message : "אבל הייתה בעיה בשליחת המיילים. אנא צרו קשר עם השירות",
            variant: error.message.includes('order') ? "destructive" : "default",
          });
        }
        navigate("/purchase-success");
      } else {
        navigate("/purchase-error");
      }
    }, 1000);
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
      <div
        style={{
          maxWidth: "1400px",
          margin: "80px auto",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* Credit Card Payment Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "70px",
            width: "100%",
          }}
        >
          {/* Title */}
          <h2
            style={{
              color: "#486284",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
              fontFamily:
                "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              margin: 0,
            }}
          >
            תשלום בכרטיס אשראי:
          </h2>

          {/* Credit Card Form */}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "63px",
                width: "100%",
              }}
            >
              {/* First Row - RTL Order: Card Number, Name, ID (right to left) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "40px",
                  width: "100%",
                  direction: "rtl",
                }}
              >
                {/* Card Number - First (rightmost) */}
                <div
                  style={{
                    display: "flex",
                    width: "360px",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: "100%",
                    }}
                  >
                    {/* Payment Icons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "17px",
                      }}
                    >
                      {/* Diners Club */}
                      <svg
                        width="43"
                        height="30"
                        viewBox="0 0 43 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.612429"
                          y="0.967898"
                          width="41.6452"
                          height="28.1718"
                          rx="4.28701"
                          fill="white"
                          stroke="#D9D9D9"
                          strokeWidth="1.22486"
                        />
                        <path
                          d="M23.3283 24.2401C28.1022 24.2631 32.4596 20.311 32.4596 15.5032C32.4596 10.2461 28.1022 6.61181 23.3283 6.61377H19.2196C14.3888 6.61181 10.4121 10.2471 10.4121 15.5032C10.4121 20.3119 14.3888 24.2631 19.2196 24.2401H23.3283Z"
                          fill="#4C7EFB"
                        />
                        <path
                          d="M19.2392 7.34229C14.8244 7.34376 11.2476 10.9545 11.2461 15.411C11.2476 19.867 14.8244 23.4777 19.2392 23.4792C23.6545 23.4777 27.2328 19.867 27.2333 15.411C27.2328 10.9545 23.655 7.34376 19.2392 7.34229ZM14.1729 15.411C14.172 14.3806 14.4819 13.3739 15.0622 12.5225C15.6425 11.671 16.4662 11.0144 17.4255 10.6385V20.1829C16.4661 19.8073 15.6423 19.1508 15.062 18.2994C14.4817 17.448 14.1718 16.4413 14.1729 15.411ZM21.0524 20.1849V10.638C22.0125 11.0134 22.8369 11.6699 23.4176 12.5217C23.9983 13.3734 24.3083 14.3806 24.307 15.4115C24.3081 16.4423 23.998 17.4494 23.4173 18.3011C22.8366 19.1528 22.0124 19.8093 21.0524 20.1849Z"
                          fill="white"
                        />
                      </svg>

                      {/* Visa */}
                      <div
                        style={{
                          width: "42.87px",
                          height: "29.397px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: "43px",
                            height: "29px",
                            borderRadius: "4.899px",
                            border: "1.225px solid #D9D9D9",
                            background: "#FFF",
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                          }}
                        />
                        <svg
                          style={{
                            width: "30px",
                            height: "10px",
                            fill: "#1521B2",
                            position: "absolute",
                            left: "6px",
                            top: "10px",
                          }}
                          width="31"
                          height="11"
                          viewBox="0 0 31 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.03187 10.2695H5.43478L3.48728 2.83965C3.39484 2.49788 3.19857 2.19574 2.90986 2.05333C2.18936 1.69546 1.39542 1.41065 0.529297 1.26701V0.980957H4.71301C5.29043 0.980957 5.72349 1.41065 5.79566 1.90969L6.80614 7.26908L9.40197 0.980957H11.9269L8.03187 10.2695ZM13.3694 10.2695H10.9167L12.9364 0.980957H15.3891L13.3694 10.2695ZM18.5636 3.55427C18.6358 3.054 19.0688 2.76795 19.5741 2.76795C20.368 2.69613 21.2328 2.83977 21.9546 3.1964L22.3877 1.19654C21.6659 0.910489 20.872 0.766846 20.1515 0.766846C17.7709 0.766846 16.0387 2.05345 16.0387 3.83908C16.0387 5.19751 17.2657 5.91077 18.1318 6.34046C19.0688 6.76892 19.4297 7.05497 19.3575 7.48342C19.3575 8.1261 18.6358 8.41215 17.9153 8.41215C17.0491 8.41215 16.183 8.19792 15.3903 7.84005L14.9573 9.84116C15.8234 10.1978 16.7604 10.3414 17.6265 10.3414C20.2958 10.412 21.9546 9.12665 21.9546 7.19737C21.9546 4.76781 18.5636 4.62541 18.5636 3.55427ZM30.5391 10.2695L28.5916 0.980957H26.4998C26.0667 0.980957 25.6336 1.26701 25.4893 1.69546L21.883 10.2695H24.4079L24.9119 8.91231H28.0142L28.3029 10.2695H30.5391ZM26.8591 3.48241L27.5796 6.9831H25.56L26.8591 3.48241Z"
                            fill="#1521B2"
                          />
                        </svg>
                      </div>

                      {/* Mastercard */}
                      <div
                        style={{
                          width: "42.87px",
                          height: "29.397px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: "43px",
                            height: "29px",
                            borderRadius: "4.899px",
                            border: "1.225px solid #D9D9D9",
                            background: "#FFF",
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                          }}
                        />
                        <div
                          style={{
                            width: "28px",
                            height: "17px",
                            position: "absolute",
                            left: "8px",
                            top: "6px",
                          }}
                        >
                          <svg
                            style={{
                              width: "28px",
                              height: "17px",
                              fill: "#E96036",
                              position: "absolute",
                              left: "0px",
                              top: "0px",
                            }}
                            width="28"
                            height="18"
                            viewBox="0 0 28 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.2002 0.479736C23.816 0.479984 27.5575 4.26536 27.5576 8.93481C27.5576 13.6043 23.8161 17.3896 19.2002 17.3899C17.1308 17.3899 15.238 16.6276 13.7783 15.3674C12.3187 16.6274 10.4266 17.3899 8.35742 17.3899C3.74153 17.3897 0 13.6043 0 8.93481C7.1201e-05 4.26534 3.74157 0.479958 8.35742 0.479736C10.4263 0.479736 12.3188 1.24161 13.7783 2.50122C15.2379 1.24133 17.1311 0.479736 19.2002 0.479736Z"
                              fill="#E96036"
                            />
                          </svg>
                          <svg
                            style={{
                              width: "14px",
                              height: "17px",
                              fill: "#F9A000",
                              position: "absolute",
                              left: "14px",
                              top: "0px",
                            }}
                            width="15"
                            height="18"
                            viewBox="0 0 15 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.19824 0.479736C10.8141 0.479984 14.5556 4.26536 14.5557 8.93481C14.5557 13.6043 10.8141 17.3896 6.19824 17.3899C4.12909 17.3899 2.23696 16.6273 0.777344 15.3674C2.57365 13.8166 3.71387 11.511 3.71387 8.93481C3.71383 6.35836 2.57397 4.05203 0.777344 2.50122C2.23688 1.24162 4.12938 0.479736 6.19824 0.479736Z"
                              fill="#F9A000"
                            />
                          </svg>
                          <svg
                            style={{
                              width: "6px",
                              height: "13px",
                              fill: "#FF5E00",
                              position: "absolute",
                              left: "11px",
                              top: "2px",
                            }}
                            width="7"
                            height="14"
                            viewBox="0 0 7 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.77832 0.502197C5.57499 2.053 6.71578 4.35833 6.71582 6.93481C6.71582 9.51129 5.57495 11.8166 3.77832 13.3674C1.982 11.8166 0.841797 9.51104 0.841797 6.93481C0.841836 4.35858 1.98195 2.053 3.77832 0.502197Z"
                              fill="#FF5E00"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <label
                      style={{
                        color: "#1B1919",
                        textAlign: "right",
                        fontFamily:
                          "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "20px",
                        fontWeight: "400",
                        marginBottom: "0",
                      }}
                    >
                      מספר כרטיס
                    </label>
                  </div>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    placeholder="הכניסו מספר כרטיס"
                    style={{
                      width: "100%",
                      height: "64px",
                      padding: "21px 28px",
                      borderRadius: "10px",
                      border: "1px solid #4C7EFB",
                      background: "rgba(245, 247, 252, 1)",
                      color: "#3C4382",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    height: "113px",
                    background: "#1B1919",
                    opacity: 0.2,
                  }}
                />

                {/* Card Holder Name - Second (middle) */}
                <div
                  style={{
                    display: "flex",
                    width: "360px",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "22px",
                  }}
                >
                  <label
                    style={{
                      color: "#1B1919",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      marginBottom: "0",
                    }}
                  >
                    שם בעל הכרטיס
                  </label>
                  <input
                    type="text"
                    value={formData.cardHolderName}
                    onChange={(e) =>
                      handleInputChange("cardHolderName", e.target.value)
                    }
                    placeholder="הכניסו שם כאן"
                    style={{
                      width: "100%",
                      height: "64px",
                      padding: "21px 28px",
                      borderRadius: "10px",
                      border: "1px solid #4C7EFB",
                      background: "rgba(245, 247, 252, 1)",
                      color: "#3C4382",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    height: "113px",
                    background: "#1B1919",
                    opacity: 0.2,
                  }}
                />

                {/* ID Number - Third (leftmost) */}
                <div
                  style={{
                    display: "flex",
                    width: "360px",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "22px",
                  }}
                >
                  <label
                    style={{
                      color: "#1B1919",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      marginBottom: "0",
                    }}
                  >
                    תעודת זהות מחזיק כרטיס
                  </label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) =>
                      handleInputChange("idNumber", e.target.value)
                    }
                    placeholder="הכניסו מספר תעודת זהות"
                    style={{
                      width: "100%",
                      height: "64px",
                      padding: "21px 28px",
                      borderRadius: "10px",
                      border: "1px solid #4C7EFB",
                      background: "rgba(245, 247, 252, 1)",
                      color: "#3C4382",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Second Row - RTL Order: Installments, CVV, Expiry Date (right to left) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "40px",
                  width: "100%",
                  direction: "rtl",
                }}
              >
                {/* Installments - First (rightmost) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "22px",
                  }}
                >
                  <label
                    style={{
                      color: "#1B1919",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      marginBottom: "0",
                    }}
                  >
                    מספר תשלומים
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={formData.installments}
                      onChange={(e) =>
                        handleInputChange("installments", e.target.value)
                      }
                      style={{
                        width: "170px",
                        height: "64px",
                        padding: "21px 28px",
                        borderRadius: "10px",
                        border: "1px solid #4C7EFB",
                        background: "rgba(245, 247, 252, 1)",
                        color: "#3C4382",
                        textAlign: "center",
                        fontFamily:
                          "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "20px",
                        fontWeight: "400",
                        outline: "none",
                        boxSizing: "border-box",
                        appearance: "none",
                        letterSpacing: "3.4px",
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                    </select>
                    <svg
                      style={{
                        position: "absolute",
                        left: "28px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.68433L9.13477 9.81946L17.2699 1.68433"
                        stroke="#486284"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    height: "113px",
                    background: "#1B1919",
                    opacity: 0.2,
                  }}
                />

                {/* CVV - Second (middle) */}
                <div
                  style={{
                    display: "flex",
                    width: "360px",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "22px",
                  }}
                >
                  <label
                    style={{
                      color: "#1B1919",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      marginBottom: "0",
                    }}
                  >
                    CVV (3 ספרות בגב הכרטיס)
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    placeholder="XXX"
                    maxLength={3}
                    style={{
                      width: "100%",
                      height: "64px",
                      padding: "21px 28px",
                      borderRadius: "10px",
                      border: "1px solid #4C7EFB",
                      background: "rgba(245, 247, 252, 1)",
                      color: "#3C4382",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                      letterSpacing: "3.4px",
                    }}
                  />
                </div>

                {/* Divider */}
                <div
                  style={{
                    width: "1px",
                    height: "113px",
                    background: "#1B1919",
                    opacity: 0.2,
                  }}
                />

                {/* Expiry Date - Third (leftmost) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "22px",
                  }}
                >
                  <label
                    style={{
                      color: "#1B1919",
                      textAlign: "right",
                      fontFamily:
                        "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      marginBottom: "0",
                    }}
                  >
                    תאריך תוקף הכרטיס
                  </label>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                      gap: "30px",
                      direction: "rtl",
                    }}
                  >
                    {/* Year - First (rightmost) */}
                    <div style={{ position: "relative" }}>
                      <select
                        value={formData.expiryYear}
                        onChange={(e) =>
                          handleInputChange("expiryYear", e.target.value)
                        }
                        style={{
                          width: "171px",
                          height: "64px",
                          padding: "21px 28px",
                          borderRadius: "10px",
                          border: "1px solid #4C7EFB",
                          background: "rgba(245, 247, 252, 1)",
                          color: "#3C4382",
                          textAlign: "center",
                          fontFamily:
                            "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "20px",
                          fontWeight: "400",
                          outline: "none",
                          boxSizing: "border-box",
                          appearance: "none",
                          letterSpacing: "3.4px",
                        }}
                      >
                        <option value="">שנה</option>
                        {Array.from(
                          { length: 10 },
                          (_, i) => new Date().getFullYear() + i,
                        ).map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <svg
                        style={{
                          position: "absolute",
                          left: "28px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.730469 1.68433L8.86523 9.81946L17.0004 1.68433"
                          stroke="#486284"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>

                    {/* Month - Second (leftmost) */}
                    <div style={{ position: "relative" }}>
                      <select
                        value={formData.expiryMonth}
                        onChange={(e) =>
                          handleInputChange("expiryMonth", e.target.value)
                        }
                        style={{
                          width: "170px",
                          height: "64px",
                          padding: "21px 28px",
                          borderRadius: "10px",
                          border: "1px solid #4C7EFB",
                          background: "rgba(245, 247, 252, 1)",
                          color: "#3C4382",
                          textAlign: "center",
                          fontFamily:
                            "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "20px",
                          fontWeight: "400",
                          outline: "none",
                          boxSizing: "border-box",
                          appearance: "none",
                        }}
                      >
                        <option value="">חודש</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <option
                              key={month}
                              value={month.toString().padStart(2, "0")}
                            >
                              {month.toString().padStart(2, "0")}
                            </option>
                          ),
                        )}
                      </select>
                      <svg
                        style={{
                          position: "absolute",
                          left: "28px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.730469 1.68433L8.86523 9.81946L17.0004 1.68433"
                          stroke="#486284"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>


        {/* Alternative Payment Options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "56px",
            width: "100%",
            maxWidth: "615px",
          }}
        >
          <h3
            style={{
              color: "#486284",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
              fontFamily:
                "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              margin: 0,
            }}
          >
            אופציות נוספות לתשלום:
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              width: "100%",
              direction: "rtl",
            }}
          >
            {/* Google Pay */}
            <div
              onClick={() => handleAlternativePayment("Google Pay")}
              style={{
                display: "flex",
                width: "191.83px",
                height: "57.924px",
                padding: "14px 17px",
                justifyContent: "center",
                alignItems: "center",
                gap: "11px",
                borderRadius: "9.654px",
                border: "2.413px solid #DBE3F3",
                background: "#FFF",
                cursor: "pointer",
                transition: "all 0.3s ease",
                direction: "rtl",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(76, 126, 251, 0.25)";
                e.currentTarget.style.borderColor = "#4C7EFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#DBE3F3";
              }}
            >
              <span
                style={{
                  color: "#1B1919",
                  fontFamily:
                    "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                שלמו עם -
              </span>
              <svg
                width="19.967"
                height="20.668"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_google"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="21"
                  height="21"
                >
                  <path
                    d="M20.0664 10.6487C20.0664 9.9454 20.0098 9.24214 19.8967 8.55322H10.291V12.5288H15.7941C15.5678 13.8062 14.8321 14.9544 13.757 15.672V18.2554H17.039C18.963 16.4614 20.0664 13.8062 20.0664 10.6487Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2897 20.7527C13.0342 20.7527 15.3543 19.8342 17.0377 18.2554L13.7557 15.672C12.8361 16.3035 11.662 16.6623 10.2897 16.6623C7.63013 16.6623 5.3808 14.8396 4.57443 12.3997H1.19336V15.0692C2.91926 18.5568 6.44181 20.7527 10.2897 20.7527Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.57423 12.4001C4.14976 11.1228 4.14976 9.7306 4.57423 8.43888V5.78369H1.19262C-0.264728 8.69723 -0.264728 12.1418 1.19262 15.0553L4.57423 12.4001Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10.2897 4.17577C11.7468 4.14707 13.1474 4.70681 14.1942 5.72583L17.1085 2.76924C15.2552 1.01825 12.822 0.0566366 10.2897 0.0853414C6.44181 0.0853414 2.91926 2.29561 1.19336 5.78324L4.57443 8.45279C5.3808 5.99853 7.63013 4.17577 10.2897 4.17577Z"
                    fill="#EA4335"
                  />
                </mask>
                <g mask="url(#mask0_google)">
                  <path
                    d="M20.0664 10.6487C20.0664 9.9454 20.0098 9.24214 19.8967 8.55322H10.291V12.5288H15.7941C15.5678 13.8062 14.8321 14.9544 13.757 15.672V18.2554H17.039C18.963 16.4614 20.0664 13.8062 20.0664 10.6487Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2897 20.7527C13.0342 20.7527 15.3543 19.8342 17.0377 18.2554L13.7557 15.672C12.8361 16.3035 11.662 16.6623 10.2897 16.6623C7.63013 16.6623 5.3808 14.8396 4.57443 12.3997H1.19336V15.0692C2.91926 18.5568 6.44181 20.7527 10.2897 20.7527Z"
                    fill="#27B345"
                  />
                  <path
                    d="M4.57423 12.4001C4.14976 11.1228 4.14976 9.7306 4.57423 8.43888V5.78369H1.19262C-0.264728 8.69723 -0.264728 12.1418 1.19262 15.0553L4.57423 12.4001Z"
                    fill="#FFC547"
                  />
                  <path
                    d="M10.2897 4.17577C11.7468 4.14707 13.1474 4.70681 14.1942 5.72583L17.1085 2.76924C15.2552 1.01825 12.822 0.0566366 10.2897 0.0853414C6.44181 0.0853414 2.91926 2.29561 1.19336 5.78324L4.57443 8.45279C5.3808 5.99853 7.63013 4.17577 10.2897 4.17577Z"
                    fill="#E96036"
                  />
                </g>
              </svg>
              <span
                style={{
                  color: "#486284",
                  fontSize: "23px",
                  fontWeight: "400",
                  fontFamily:
                    "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Pay
              </span>
            </div>

            {/* Apple Pay */}
            <div
              onClick={() => handleAlternativePayment("Apple Pay")}
              style={{
                display: "flex",
                width: "191.83px",
                height: "57.924px",
                padding: "14px 17px",
                justifyContent: "center",
                alignItems: "center",
                gap: "11px",
                borderRadius: "9.654px",
                border: "2.413px solid #DBE3F3",
                background: "#FFF",
                cursor: "pointer",
                transition: "all 0.3s ease",
                direction: "rtl",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(76, 126, 251, 0.25)";
                e.currentTarget.style.borderColor = "#4C7EFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#DBE3F3";
              }}
            >
              <span
                style={{
                  color: "#1B1919",
                  fontFamily:
                    "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                שלמו עם -
              </span>
              <svg
                width="61"
                height="26"
                viewBox="0 0 62 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.63879 5.37878C9.77323 5.47448 10.9077 4.80461 11.6167 3.95531C12.3139 3.08209 12.7748 1.90982 12.6566 0.713623C11.6521 0.761471 10.4113 1.38349 9.70232 2.25671C9.05239 3.01032 8.49699 4.23043 8.63879 5.37878ZM22.131 20.7858V2.1372H29.044C32.6127 2.1372 35.1061 4.62528 35.1061 8.26171C35.1061 11.8981 32.5655 14.4101 28.9495 14.4101H24.9907V20.7858H22.131ZM12.6424 5.60572C11.643 5.5475 10.7311 5.90997 9.99451 6.20275C9.5205 6.39117 9.1191 6.55072 8.81372 6.55072C8.47102 6.55072 8.05305 6.38263 7.58376 6.19392C6.96884 5.94664 6.26582 5.66393 5.52858 5.6775C3.83875 5.70142 2.26708 6.67033 1.40444 8.21342C-0.368112 11.2996 0.943578 15.8691 2.65705 18.3811C3.49606 19.6251 4.5005 20.9888 5.82401 20.9409C6.40627 20.9187 6.82512 20.7388 7.25859 20.5526C7.75762 20.3382 8.27604 20.1155 9.08551 20.1155C9.86691 20.1155 10.3627 20.3324 10.8385 20.5406C11.291 20.7386 11.7256 20.9286 12.3706 20.917C13.7414 20.8931 14.6041 19.673 15.4431 18.4289C16.3485 17.0937 16.7464 15.7906 16.8068 15.5929L16.8138 15.57C16.8124 15.5685 16.8012 15.5634 16.7815 15.5542C16.4788 15.4139 14.1654 14.3419 14.1432 11.4671C14.1209 9.05408 15.9781 7.83151 16.2705 7.63906C16.2883 7.62734 16.3003 7.61944 16.3057 7.61533C15.124 5.84496 13.2806 5.65357 12.6424 5.60572ZM40.3294 20.9292C42.1256 20.9292 43.7918 20.0081 44.548 18.5488H44.6071V20.7857H47.2542V11.5032C47.2542 8.81177 45.1271 7.07729 41.8538 7.07729C38.8168 7.07729 36.5716 8.83569 36.4888 11.252H39.0649C39.2777 10.1037 40.3294 9.35006 41.771 9.35006C43.52 9.35006 44.5008 10.1754 44.5008 11.6946V12.7233L40.932 12.9386C37.6115 13.142 35.8153 14.5176 35.8153 16.91C35.8153 19.3263 37.6705 20.9292 40.3294 20.9292ZM41.0992 18.7168C39.5748 18.7168 38.6059 17.9751 38.6059 16.8387C38.6059 15.6665 39.5394 14.9846 41.3238 14.877L44.5025 14.6736V15.7263C44.5025 17.4727 43.0372 18.7168 41.0992 18.7168ZM56.0327 21.515C54.8865 24.7806 53.5748 25.8572 50.786 25.8572C50.5733 25.8572 49.8642 25.8333 49.6988 25.7854V23.5486C49.8761 23.5725 50.3133 23.5964 50.5378 23.5964C51.8022 23.5964 52.5113 23.0581 52.9485 21.6586L53.2085 20.8332L48.3635 7.25642H51.3532L54.721 18.2734H54.7801L58.148 7.25642H61.055L56.0327 21.515ZM24.9923 4.57778H28.2893C30.7708 4.57778 32.1889 5.91752 32.1889 8.27402C32.1889 10.6305 30.7708 11.9822 28.2775 11.9822H24.9923V4.57778Z"
                  fill="#1B1919"
                />
              </svg>
            </div>

            {/* Bit */}
            <div
              onClick={() => handleAlternativePayment("Bit")}
              style={{
                display: "flex",
                width: "191.83px",
                height: "57.924px",
                padding: "14px 17px",
                justifyContent: "center",
                alignItems: "center",
                gap: "11px",
                direction: "rtl",
                borderRadius: "9.654px",
                border: "2.413px solid #DBE3F3",
                background: "#FFF",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(76, 126, 251, 0.25)";
                e.currentTarget.style.borderColor = "#4C7EFB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#DBE3F3";
              }}
            >
              <span
                style={{
                  color: "#1B1919",
                  fontFamily:
                    "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
              >
                שלמו עם -
              </span>
              <svg
                width="39"
                height="22"
                viewBox="0 0 40 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_bit)">
                  <path
                    d="M3.5872 8.55969C3.64583 8.62749 4.77851 7.74609 4.95908 7.64789C6.9993 6.52451 9.59532 6.73727 11.5628 7.91559C14.7862 9.84439 15.6515 14.131 14.3781 17.5058C14.1014 18.2399 13.6769 18.8922 13.2595 19.5457C16.2683 18.7052 18.5676 16.3626 18.8291 13.1759C18.9534 11.661 18.6169 9.70528 18.8385 8.27563C19.0941 6.62505 21.5306 6.4345 22.0595 8.08976C22.2377 10.0349 22.0841 12.0678 22.0595 14.0527C22.0513 14.7845 22.0595 15.5104 22.1099 16.2223C22.2787 18.6397 23.1675 20.0811 25.8081 19.783C29.7197 19.3411 28.648 12.7189 28.7981 10.0805H26.2771C26.2255 10.0805 25.4798 9.64566 25.3954 9.55682C24.8865 9.0226 24.9263 8.00092 25.3965 7.44917C25.5443 7.27616 26.0965 6.9243 26.2771 6.9243H28.7981V1.83812C28.7981 1.36001 29.9624 0.728765 30.469 0.755651C31.1678 0.793058 32.0812 1.60315 32.0812 2.3057V6.92313H36.7128C37.224 6.92313 37.9463 7.96936 37.9463 8.50124C37.9463 9.11846 37.2052 10.0794 36.5955 10.0794H32.0812V16.9178C32.0812 17.0733 32.399 18.0634 32.4904 18.2633C33.0204 19.4253 34.3618 19.7409 35.4476 19.105C36.001 18.7812 36.5896 17.7969 37.1876 17.6835C39.4131 17.2638 39.6359 19.714 38.359 21.0712C36.1323 23.4383 31.319 23.263 29.8522 20.1325C27.2433 24.2356 20.1681 23.3249 19.4165 18.2621L18.3671 19.61C15.2153 22.7755 7.54923 23.6207 3.70328 21.478C0.910281 19.9221 0.424848 17.0604 0.298213 14.1181C0.155163 10.8006 0.02032 5.89561 0.299386 2.65289C0.400224 1.48509 1.11313 0.429509 2.41817 0.782538C2.70779 0.860859 3.5872 1.57744 3.5872 1.83812V8.55969ZM6.84218 10.2266C2.56122 10.8474 2.51549 19.0033 7.28072 19.4299C13.1856 19.9583 13.1575 9.31134 6.84218 10.2266Z"
                    fill="#4C7EFB"
                  />
                  <path
                    d="M20.33 0.752282C22.7056 0.566416 22.946 4.18438 20.6455 4.35505C18.1726 4.5374 18.019 0.933473 20.33 0.752282Z"
                    fill="#4C7EFB"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_bit">
                    <rect
                      width="39"
                      height="22"
                      fill="white"
                      transform="translate(0.136719 0.713623)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ width: "281px", height: "50px", marginTop: "40px" }}>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              height: "100%",
              padding: "11px 26px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "56px",
              background: "#4C7EFB",
              boxShadow: "10px 10px 0 0 rgba(0, 0, 0, 0.10)",
              color: "#FFF",
              textAlign: "center",
              fontFamily:
                "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: "normal",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "12px 12px 0 0 rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "10px 10px 0 0 rgba(0, 0, 0, 0.10)";
            }}
          >
            מעבר לתשלום
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}