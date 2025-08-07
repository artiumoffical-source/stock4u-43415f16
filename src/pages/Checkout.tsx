import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";
import { CreditCard, Shield, Lock, Check } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { giftData } = useGift();
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
  });

  const totalAmount = giftData.selectedStocks.reduce((sum, stock) => sum + stock.amount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment
    navigate("/payment-success");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#FFF",
        direction: "rtl",
      }}
    >
      <Header />

      <StepHero currentStep={3} />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 40px",
          background: "#fff",
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              color: "#1B1919",
              fontSize: "32px",
              fontWeight: "600",
              fontFamily: "Poppins",
              margin: "0 0 16px 0",
            }}
          >
            השלמת רכישה
          </h2>
          <p
            style={{
              color: "#486284",
              fontSize: "18px",
              fontFamily: "Poppins",
              margin: "0",
            }}
          >
            השלם את פרטי התשלום שלך בצורה מאובטחת
          </p>
        </div>

        {/* Form and Summary Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "60px",
            width: "100%",
            alignItems: "start",
          }}
        >
          {/* Payment Form */}
          <div
            style={{
              background: "#FFF",
              borderRadius: "16px",
              border: "1px solid #E0E7FF",
              padding: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "30px",
              }}
            >
              <CreditCard size={24} color="#486284" />
              <h3
                style={{
                  color: "#1B1919",
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                  margin: "0",
                }}
              >
                פרטי תשלום
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#1B1919",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      marginBottom: "8px",
                    }}
                  >
                    שם פרטי
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #E0E7FF",
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "16px",
                      fontFamily: "Poppins",
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#1B1919",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      marginBottom: "8px",
                    }}
                  >
                    שם משפחה
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #E0E7FF",
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "16px",
                      fontFamily: "Poppins",
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    marginBottom: "8px",
                  }}
                >
                  כתובת אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    height: "48px",
                    border: "1px solid #E0E7FF",
                    borderRadius: "8px",
                    padding: "0 16px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    marginBottom: "8px",
                  }}
                >
                  מספר כרטיס אשראי
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  style={{
                    width: "100%",
                    height: "48px",
                    border: "1px solid #E0E7FF",
                    borderRadius: "8px",
                    padding: "0 16px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                  required
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#1B1919",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      marginBottom: "8px",
                    }}
                  >
                    תוקף
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    style={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #E0E7FF",
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "16px",
                      fontFamily: "Poppins",
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#1B1919",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      marginBottom: "8px",
                    }}
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    style={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #E0E7FF",
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "16px",
                      fontFamily: "Poppins",
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    marginBottom: "8px",
                  }}
                >
                  כתובת לחיוב
                </label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    height: "48px",
                    border: "1px solid #E0E7FF",
                    borderRadius: "8px",
                    padding: "0 16px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                  required
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#1B1919",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      marginBottom: "8px",
                    }}
                  >
                    עיר
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #E0E7FF",
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "16px",
                      fontFamily: "Poppins",
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#1B1919",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      marginBottom: "8px",
                    }}
                  >
                    מיקוד
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #E0E7FF",
                      borderRadius: "8px",
                      padding: "0 16px",
                      fontSize: "16px",
                      fontFamily: "Poppins",
                    }}
                    required
                  />
                </div>
              </div>

              {/* Security Badges */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                  padding: "20px",
                  background: "#F8FAFC",
                  borderRadius: "8px",
                  border: "1px solid #E0E7FF",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Shield size={16} color="#16a34a" />
                  <span
                    style={{
                      color: "#486284",
                      fontSize: "12px",
                      fontFamily: "Poppins",
                    }}
                  >
                    SSL מאובטח
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Lock size={16} color="#16a34a" />
                  <span
                    style={{
                      color: "#486284",
                      fontSize: "12px",
                      fontFamily: "Poppins",
                    }}
                  >
                    הצפנה 256-bit
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Check size={16} color="#16a34a" />
                  <span
                    style={{
                      color: "#486284",
                      fontSize: "12px",
                      fontFamily: "Poppins",
                    }}
                  >
                    PCI תואם
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div
            style={{
              background: "#FFF",
              borderRadius: "16px",
              border: "1px solid #E0E7FF",
              padding: "40px",
              position: "sticky",
              top: "20px",
            }}
          >
            <h3
              style={{
                color: "#1B1919",
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Poppins",
                margin: "0 0 30px 0",
              }}
            >
              סיכום הזמנה
            </h3>

            <div style={{ marginBottom: "30px" }}>
              {giftData.selectedStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#1B1919",
                        fontSize: "16px",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {stock.name}
                    </p>
                    <p
                      style={{
                        color: "#486284",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        margin: "0",
                      }}
                    >
                      {stock.symbol}
                    </p>
                  </div>
                  <p
                    style={{
                      color: "#1B1919",
                      fontSize: "16px",
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      margin: "0",
                    }}
                  >
                    ₪{stock.amount}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                height: "1px",
                background: "#E0E7FF",
                margin: "30px 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <span
                style={{
                  color: "#1B1919",
                  fontSize: "18px",
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
              >
                סה"כ לתשלום:
              </span>
              <span
                style={{
                  color: "#486284",
                  fontSize: "18px",
                  fontWeight: "700",
                  fontFamily: "Poppins",
                }}
              >
                ₪{totalAmount}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  height: "50px",
                  background: "#486284",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "25px",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                השלם תשלום - ₪{totalAmount}
              </button>

              <button
                onClick={() => navigate("/gift-design")}
                style={{
                  width: "100%",
                  height: "50px",
                  background: "transparent",
                  color: "#486284",
                  border: "1px solid #E0E7FF",
                  borderRadius: "25px",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                חזור לעיצוב המתנה
              </button>
            </div>

            <p
              style={{
                color: "#486284",
                fontSize: "12px",
                fontFamily: "Poppins",
                textAlign: "center",
                margin: "20px 0 0 0",
                lineHeight: "1.4",
              }}
            >
              בלחיצה על "השלם תשלום" אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;