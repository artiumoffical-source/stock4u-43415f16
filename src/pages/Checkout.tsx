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
          maxWidth: "600px",
          margin: "0 auto",
          padding: "60px 40px",
          background: "#fff",
        }}
      >
        {/* Title */}
        <h2
          style={{
            color: "#1B1919",
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "Poppins",
            margin: "0 0 40px 0",
            textAlign: "center",
          }}
        >
          תשלום בכרטיס אשראי
        </h2>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {/* Card Number */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#1B1919",
                fontSize: "14px",
                fontFamily: "Poppins",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              מספר כרטיס
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="הכניסו מספר כרטיס"
                style={{
                  width: "100%",
                  height: "50px",
                  border: "2px solid #E0E7FF",
                  borderRadius: "8px",
                  padding: "0 60px 0 16px",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  direction: "ltr",
                  textAlign: "left",
                }}
                required
              />
              {/* Credit Card Icons */}
              <div
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "16px",
                    background: "#EB5013",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  MC
                </div>
                <div
                  style={{
                    width: "24px",
                    height: "16px",
                    background: "#1A1F71",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  VISA
                </div>
                <div
                  style={{
                    width: "24px",
                    height: "16px",
                    background: "#0079BE",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "8px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  D
                </div>
              </div>
            </div>
          </div>

          {/* Card Holder Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#1B1919",
                fontSize: "14px",
                fontFamily: "Poppins",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              שם בעל הכרטיס
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="הכניסו שם בעל הכרטיס"
              style={{
                width: "100%",
                height: "50px",
                border: "2px solid #E0E7FF",
                borderRadius: "8px",
                padding: "0 16px",
                fontSize: "16px",
                fontFamily: "Poppins",
              }}
              required
            />
          </div>

          {/* Expiry and CVV */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#1B1919",
                fontSize: "14px",
                fontFamily: "Poppins",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              תוקף זיהוי מהיר הכרטיס
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 120px 120px",
                gap: "12px",
              }}
            >
              <div style={{ position: "relative" }}>
                <select
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "2px solid #E0E7FF",
                    borderRadius: "8px",
                    padding: "0 16px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "white",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option>בחירה</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <div
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  ▼
                </div>
              </div>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="XXX"
                style={{
                  width: "100%",
                  height: "50px",
                  border: "2px solid #E0E7FF",
                  borderRadius: "8px",
                  padding: "0 16px",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  textAlign: "center",
                }}
                required
              />
              <div style={{ position: "relative" }}>
                <select
                  style={{
                    width: "100%",
                    height: "50px",
                    border: "2px solid #E0E7FF",
                    borderRadius: "8px",
                    padding: "0 16px",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "white",
                    appearance: "none",
                    cursor: "pointer",
                  }}
                >
                  <option>שנה</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
                <div
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                color: "#1B1919",
                fontSize: "14px",
                fontFamily: "Poppins",
                marginBottom: "16px",
                fontWeight: "500",
              }}
            >
              אופציות נוספות לתשלום:
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E0E7FF",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  color: "#486284",
                  cursor: "pointer",
                }}
              >
                💳 Bit - ביט
              </div>
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E0E7FF",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  color: "#486284",
                  cursor: "pointer",
                }}
              >
                🍎 Apple Pay - אפל פיי
              </div>
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E0E7FF",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  color: "#486284",
                  cursor: "pointer",
                }}
              >
                🎯 Google Pay - גוגל פיי
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              background: "#4C7EFB",
              color: "#FFF",
              border: "none",
              borderRadius: "25px",
              fontSize: "16px",
              fontFamily: "Poppins",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            מעבר לתשלום
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;