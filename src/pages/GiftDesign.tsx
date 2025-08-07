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
  
  const [selectedCard, setSelectedCard] = useState(giftData.selectedCard || "card1");

  const cardTemplates = [
    {
      id: "card1",
      name: "שייר פור יו - צבע",
      preview: "/lovable-uploads/81dd987e-08a3-468b-b6c0-d9b5f424e75d.png",
      bgColor: "linear-gradient(135deg, #ff6b6b, #ffa8a8)"
    },
    {
      id: "card2", 
      name: "שייר פור יו - כחול",
      preview: "/lovable-uploads/81dd987e-08a3-468b-b6c0-d9b5f424e75d.png",
      bgColor: "linear-gradient(135deg, #4ecdc4, #96ceb4)"
    },
    {
      id: "card3",
      name: "שייר פור יו - אדום",
      preview: "/lovable-uploads/81dd987e-08a3-468b-b6c0-d9b5f424e75d.png",
      bgColor: "linear-gradient(135deg, #e74c3c, #ec7063)"
    }
  ];

  const handleContinue = () => {
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
            בחרו את כרטיס הברכה המושלם
          </h2>
          <p
            style={{
              color: "#486284",
              fontSize: "18px",
              fontFamily: "Poppins",
              margin: "0",
            }}
          >
            בחרו עיצוב שמבטא בדיוק לשלחתכם את דין הממה החיובית
          </p>
        </div>

        {/* Card Templates */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            width: "100%",
            flexWrap: "wrap",
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
              }}
            >
              {/* Card Preview */}
              <div
                style={{
                  width: "280px",
                  height: "200px",
                  borderRadius: "16px",
                  background: card.bgColor,
                  position: "relative",
                  overflow: "hidden",
                  border: selectedCard === card.id ? "3px solid #4C7EFB" : "2px solid #E0E7FF",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Card Content - Mock design with coins and decorations */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "#FFD700",
                    }}
                  />
                </div>
                
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "30px",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.3)",
                  }}
                />
                
                {/* Center logo area */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    style={{
                      color: "#FFF",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    STOCK4U
                  </div>
                </div>

                {/* Bottom coins */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#FFD700",
                        border: "2px solid rgba(255, 255, 255, 0.5)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Card Name and Preview Button */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Eye
                  size={20}
                  color="#486284"
                  style={{ cursor: "pointer" }}
                />
                <span
                  style={{
                    color: "#1B1919",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                >
                  {card.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <button
            onClick={handleContinue}
            style={{
              width: "300px",
              height: "50px",
              background: "#486284",
              color: "#FFF",
              border: "none",
              borderRadius: "25px",
              fontSize: "18px",
              fontFamily: "Poppins",
              cursor: "pointer",
              fontWeight: "500",
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