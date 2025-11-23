import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";
import { Eye } from "lucide-react";
import cardLightblue from "@/assets/card-lightblue.png";
import cardYellow from "@/assets/card-yellow.png";
import cardRed from "@/assets/card-red.png";

const GiftDesign = () => {
  const navigate = useNavigate();
  const { giftData, updateGiftData } = useGift();
  
  const [selectedCard, setSelectedCard] = useState(giftData.selectedCard || "");

  const cardTemplates = [
    {
      id: "lightblue",
      name: "שייר פור יו - תכלת",
      image: cardLightblue
    },
    {
      id: "yellow", 
      name: "שייר פור יו - צהוב",
      image: cardYellow
    },
    {
      id: "red",
      name: "שייר פור יו - אדום",
      image: cardRed
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
          gap: "48px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 40px 80px",
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
              fontSize: "32px",
              fontWeight: "700",
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
            gap: "40px",
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
                gap: "20px",
                cursor: "pointer",
                position: "relative",
                padding: "20px",
                borderRadius: "24px",
                border: selectedCard === card.id ? "5px solid #5B8DEE" : "5px solid transparent",
                transition: "all 0.2s ease",
                background: selectedCard === card.id ? "#F0F4FF" : "transparent",
              }}
            >
              {/* Card Preview Image */}
              <div
                style={{
                  width: "340px",
                  height: "260px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scale(1.2)",
                    transformOrigin: "center center",
                  }}
                />
              </div>

              {/* Card Name and Eye Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "#486284",
                    fontSize: "20px",
                    fontFamily: "Assistant, sans-serif",
                    fontWeight: "600",
                  }}
                >
                  {card.name}
                </span>
                <Eye
                  size={28}
                  color="#486284"
                  strokeWidth={2}
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
              width: "340px",
              height: "60px",
              background: selectedCard ? "#486284" : "#D1D5DB",
              color: "#FFF",
              border: "none",
              borderRadius: "30px",
              fontSize: "20px",
              fontFamily: "Assistant, sans-serif",
              cursor: selectedCard ? "pointer" : "not-allowed",
              fontWeight: "700",
              opacity: selectedCard ? 1 : 0.6,
              transition: "all 0.2s ease",
              boxShadow: selectedCard ? "0 4px 12px rgba(72, 98, 132, 0.3)" : "none",
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
