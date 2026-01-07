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

      {/* Main Content - Mobile responsive */}
      <div
        className="flex flex-col justify-center items-center gap-6 md:gap-12 max-w-[1200px] mx-auto px-4 md:px-10 py-8 md:py-16 bg-white"
      >
        {/* Title */}
        <div className="text-center">
          <h2
            className="text-2xl md:text-[32px] font-bold text-[#486284]"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            בחרו עיצוב:
          </h2>
        </div>

        {/* Card Templates - Mobile: Full width scroll, Desktop: Flex wrap */}
        <div
          className="flex md:justify-center items-start gap-4 md:gap-10 w-full md:flex-wrap overflow-x-auto md:overflow-visible scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0"
          style={{ maxWidth: "1100px" }}
        >
          {cardTemplates.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={`flex flex-col items-center gap-4 md:gap-5 cursor-pointer p-3 md:p-5 rounded-2xl md:rounded-3xl transition-all flex-shrink-0 ${
                selectedCard === card.id 
                  ? "border-[3px] md:border-[5px] border-[#5B8DEE] bg-[#F0F4FF]" 
                  : "border-[3px] md:border-[5px] border-transparent"
              }`}
            >
              {/* Card Preview Image - Mobile: Smaller */}
              <div
                className="w-[200px] md:w-[340px] h-[150px] md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover scale-[1.2]"
                />
              </div>

              {/* Card Name and Eye Icon */}
              <div className="flex items-center gap-2 md:gap-3 justify-center">
                <span
                  className="text-base md:text-xl text-[#486284] font-semibold"
                  style={{ fontFamily: "Assistant, sans-serif" }}
                >
                  {card.name}
                </span>
                <Eye
                  size={24}
                  className="text-[#486284] cursor-pointer md:w-7 md:h-7"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button - Mobile optimized */}
        <div className="flex justify-center mt-4 md:mt-5 w-full px-4 md:px-0">
          <button
            onClick={handleContinue}
            disabled={!selectedCard}
            className={`w-full md:w-[340px] h-14 md:h-[60px] rounded-full text-lg md:text-xl font-bold transition-all ${
              selectedCard 
                ? "bg-[#486284] text-white cursor-pointer shadow-lg" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
            }`}
            style={{ fontFamily: "Assistant, sans-serif" }}
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
