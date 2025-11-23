import React from "react";
import { Check } from "lucide-react";
import stepHeroBg from "@/assets/step-hero-bg.png";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "410px",
        flexShrink: 0,
        backgroundImage: `url(${stepHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Steps Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          direction: "rtl",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Step 3 - סיום ותשלום */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            minWidth: "180px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: currentStep >= 3 ? "#5B8DEE" : "#B0BED1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "32px",
              fontWeight: "700",
              fontFamily: "Assistant, sans-serif",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            3
          </div>
          <div
            style={{
              color: "#486284",
              fontSize: "22px",
              fontWeight: "600",
              fontFamily: "Assistant, sans-serif",
              textShadow: "0px 2px 4px rgba(255, 255, 255, 0.9)",
              whiteSpace: "nowrap",
            }}
          >
            סיום ותשלום
          </div>
        </div>

        {/* Step 2 - עיצוב המתנה */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "relative",
            minWidth: "280px",
          }}
        >
          {/* Connection line to step 1 */}
          <div
            style={{
              position: "absolute",
              right: "calc(50% + 32px)",
              top: "32px",
              width: "160px",
              height: "8px",
              background: currentStep >= 2 ? "#5B8DEE" : "#B0BED1",
              borderRadius: "4px",
              zIndex: 0,
            }}
          />
          
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: currentStep >= 2 ? "#5B8DEE" : "#B0BED1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "32px",
              fontWeight: "700",
              fontFamily: "Assistant, sans-serif",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
              zIndex: 1,
            }}
          >
            2
          </div>
          <div
            style={{
              color: "#486284",
              fontSize: "22px",
              fontWeight: "600",
              fontFamily: "Assistant, sans-serif",
              textShadow: "0px 2px 4px rgba(255, 255, 255, 0.9)",
              whiteSpace: "nowrap",
            }}
          >
            עיצוב המתנה
          </div>
        </div>

        {/* Step 1 - פרטים וברכה */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            minWidth: "180px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: currentStep >= 2 ? "#E8F0FF" : "#5B8DEE",
              border: currentStep >= 2 ? "3px solid #5B8DEE" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: currentStep >= 2 ? "#5B8DEE" : "#fff",
              fontSize: "32px",
              fontWeight: "700",
              fontFamily: "Assistant, sans-serif",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {currentStep >= 2 ? <Check size={40} strokeWidth={3.5} /> : "1"}
          </div>
          <div
            style={{
              color: "#486284",
              fontSize: "22px",
              fontWeight: "600",
              fontFamily: "Assistant, sans-serif",
              textShadow: "0px 2px 4px rgba(255, 255, 255, 0.9)",
              whiteSpace: "nowrap",
            }}
          >
            פרטים וברכה
          </div>
        </div>
      </div>
    </div>
  );
};
