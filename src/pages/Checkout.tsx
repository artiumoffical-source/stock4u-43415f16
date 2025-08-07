import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { giftData } = useGift();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing payment...", formData);

    setTimeout(() => {
      window.scrollTo(0, 0);
      const paymentSuccess = true;

      if (paymentSuccess) {
        navigate("/purchase-success");
      } else {
        navigate("/purchase-error");
      }
    }, 1000);
  };

  const handleAlternativePayment = (method: string) => {
    console.log(`Processing payment with ${method}...`);

    setTimeout(() => {
      window.scrollTo(0, 0);
      const paymentSuccess = true;

      if (paymentSuccess) {
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
      <StepHero currentStep={3} />

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "70px",
            width: "100%",
          }}
        >
          <h2
            style={{
              color: "#486284",
              fontSize: "30px",
              fontWeight: "700",
              textAlign: "center",
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              margin: 0,
            }}
          >
            תשלום בכרטיס אשראי:
          </h2>

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
              {/* First Row */}
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
                {/* Card Number */}
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "17px",
                      }}
                    >
                      {/* Credit card icons */}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <div style={{ width: "30px", height: "20px", backgroundColor: "#1A1F71", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "white", fontWeight: "bold" }}>V</div>
                        <div style={{ width: "30px", height: "20px", backgroundColor: "#EB5013", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", color: "white", fontWeight: "bold" }}>MC</div>
                        <div style={{ width: "30px", height: "20px", backgroundColor: "#0079BE", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "white", fontWeight: "bold" }}>D</div>
                      </div>
                    </div>
                    <label
                      style={{
                        color: "#1B1919",
                        textAlign: "right",
                        fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
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
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ width: "1px", height: "113px", background: "#1B1919", opacity: 0.2 }} />

                {/* Card Holder Name */}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
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
                    onChange={(e) => handleInputChange("cardHolderName", e.target.value)}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ width: "1px", height: "113px", background: "#1B1919", opacity: 0.2 }} />

                {/* ID Number */}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
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
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Second Row */}
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
                {/* Installments */}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
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
                      onChange={(e) => handleInputChange("installments", e.target.value)}
                      style={{
                        width: "170px",
                        height: "64px",
                        padding: "21px 28px",
                        borderRadius: "10px",
                        border: "1px solid #4C7EFB",
                        background: "rgba(245, 247, 252, 1)",
                        color: "#3C4382",
                        textAlign: "center",
                        fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                        fontSize: "20px",
                        fontWeight: "400",
                        outline: "none",
                        boxSizing: "border-box",
                        appearance: "none",
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                </div>

                <div style={{ width: "1px", height: "113px", background: "#1B1919", opacity: 0.2 }} />

                {/* CVV */}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                      fontSize: "20px",
                      fontWeight: "400",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ width: "1px", height: "113px", background: "#1B1919", opacity: 0.2 }} />

                {/* Expiry Date */}
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
                      fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
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
                    <div style={{ position: "relative" }}>
                      <select
                        value={formData.expiryYear}
                        onChange={(e) => handleInputChange("expiryYear", e.target.value)}
                        style={{
                          width: "171px",
                          height: "64px",
                          padding: "21px 28px",
                          borderRadius: "10px",
                          border: "1px solid #4C7EFB",
                          background: "rgba(245, 247, 252, 1)",
                          color: "#3C4382",
                          textAlign: "center",
                          fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "20px",
                          fontWeight: "400",
                          outline: "none",
                          boxSizing: "border-box",
                          appearance: "none",
                        }}
                      >
                        <option value="">שנה</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <option key={year} value={year.toString()}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ position: "relative" }}>
                      <select
                        value={formData.expiryMonth}
                        onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
                        style={{
                          width: "170px",
                          height: "64px",
                          padding: "21px 28px",
                          borderRadius: "10px",
                          border: "1px solid #4C7EFB",
                          background: "rgba(245, 247, 252, 1)",
                          color: "#3C4382",
                          textAlign: "center",
                          fontFamily: "Assistant, -apple-system, Roboto, Helvetica, sans-serif",
                          fontSize: "20px",
                          fontWeight: "400",
                          outline: "none",
                          boxSizing: "border-box",
                          appearance: "none",
                        }}
                      >
                        <option value="">חודש</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month.toString().padStart(2, "0")}>
                            {month.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "1256px",
            height: "1px",
            background: "#4C7EFB",
            opacity: 0.2,
            margin: "40px 0",
          }}
        />

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
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
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
            <button
              onClick={() => handleAlternativePayment("Google Pay")}
              style={{
                width: "191.83px",
                height: "57.924px",
                padding: "14px 17px",
                borderRadius: "9.654px",
                border: "2.413px solid #DBE3F3",
                background: "#FFF",
                cursor: "pointer",
                fontSize: "20px",
                color: "#1B1919",
              }}
            >
              Google Pay
            </button>

            <button
              onClick={() => handleAlternativePayment("Apple Pay")}
              style={{
                width: "191.83px",
                height: "57.924px",
                padding: "14px 17px",
                borderRadius: "9.654px",
                border: "2.413px solid #DBE3F3",
                background: "#FFF",
                cursor: "pointer",
                fontSize: "20px",
                color: "#1B1919",
              }}
            >
              🍎 Pay
            </button>

            <button
              onClick={() => handleAlternativePayment("Bit")}
              style={{
                width: "191.83px",
                height: "57.924px",
                padding: "14px 17px",
                borderRadius: "9.654px",
                border: "2.413px solid #DBE3F3",
                background: "#FFF",
                cursor: "pointer",
                fontSize: "20px",
                color: "#3F5CE3",
              }}
            >
              bit
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "56px" }}>
          <button
            onClick={handleSubmit}
            style={{
              width: "615px",
              height: "79px",
              borderRadius: "24px",
              background: "#4C7EFB",
              border: "none",
              cursor: "pointer",
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "30px",
              fontWeight: "700",
              color: "#FFF",
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