import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";
import { Eye } from "lucide-react";

const GiftDesign = () => {
  const navigate = useNavigate();
  const { giftData, updateGiftData } = useGift();
  
  const [selectedCard, setSelectedCard] = useState(giftData.selectedCard || "");

  const cardTemplates = [
    {
      id: "red",
      name: "שייר פור יו - אדום",
      bgColor: "#E85D4A"
    },
    {
      id: "yellow", 
      name: "שייר פור יו - צהוב",
      bgColor: "#F5B942"
    },
    {
      id: "lightblue",
      name: "שייר פור יו - תכלת",
      bgColor: "#C4D3E8"
    }
  ];

  const handleContinue = () => {
    if (!selectedCard) {
      console.log('[CARD_DESIGN_VALIDATION] No card selected');
      return;
    }
    updateGiftData({
      selectedCard: selectedCard
    });
    navigate("/checkout");
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

      <StepHero currentStep={2} />

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 40px",
          background: "#fff",
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#486284",
              fontSize: "28px",
              fontWeight: "600",
              fontFamily: "Assistant, sans-serif",
              margin: "0",
            }}
          >
            בחרו עיצוב:
          </h2>
        </div>

        {/* Card Templates */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "32px",
            width: "100%",
            flexWrap: "wrap",
            maxWidth: "1100px",
          }}
        >
          {cardTemplates.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                position: "relative",
                padding: "16px",
                borderRadius: "20px",
                border: selectedCard === card.id ? "4px solid #5B8DEE" : "4px solid transparent",
                transition: "all 0.2s ease",
                background: selectedCard === card.id ? "#F0F4FF" : "transparent",
              }}
            >
              {/* Card Preview Container */}
              <div
                style={{
                  width: "320px",
                  height: "380px",
                  borderRadius: "16px",
                  background: card.bgColor,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {/* Top decorative pattern */}
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    background: `url('/lovable-uploads/81dd987e-08a3-468b-b6c0-d9b5f424e75d.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.4,
                  }}
                />
                
                {/* Bottom message area */}
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    background: card.bgColor === "#E85D4A" 
                      ? "rgba(232, 93, 74, 0.4)" 
                      : card.bgColor === "#F5B942"
                      ? "rgba(245, 185, 66, 0.4)"
                      : "rgba(196, 211, 232, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* Three coin decorations */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          background: "#F5B942",
                          border: "3px solid rgba(255, 255, 255, 0.6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        ₪
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Name and Eye Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#486284",
                    fontSize: "18px",
                    fontFamily: "Assistant, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  {card.name}
                </span>
                <Eye
                  size={24}
                  color="#486284"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleContinue}
            disabled={!selectedCard}
            style={{
              width: "320px",
              height: "56px",
              background: selectedCard ? "#486284" : "#D1D5DB",
              color: "#FFF",
              border: "none",
              borderRadius: "28px",
              fontSize: "18px",
              fontFamily: "Assistant, sans-serif",
              cursor: selectedCard ? "pointer" : "not-allowed",
              fontWeight: "600",
              opacity: selectedCard ? 1 : 0.6,
              transition: "all 0.2s ease",
            }}
          >
            המשך לתשלום
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GiftDesign;