import React from "react";

interface StepHeroProps {
  currentStep: 1 | 2 | 3;
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  return (
    <div style={{
      background: "linear-gradient(135deg, #102A43 0%, #1c3d5a 100%)",
      minHeight: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "#C6A96F",
        opacity: "0.1",
        top: "-100px",
        right: "-100px"
      }} />
      
      {/* Progress indicator */}
      <div style={{
        display: "flex",
        gap: "40px",
        marginBottom: "40px"
      }}>
        {[1,2,3,4].map(step => (
          <div key={step} style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: step === currentStep ? "#C6A96F" : "rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: "20px"
          }}>
            {step}
          </div>
        ))}
      </div>
      
      {/* Title */}
      <h1 style={{
        color: "#FFF",
        fontSize: "48px",
        fontWeight: "700",
        textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        {currentStep === 1 && "פרטי ההזמנה"}
        {currentStep === 2 && "עיצוב המתנה"}
        {currentStep === 3 && "סיכום ותשלום"}
      </h1>
      
      {/* Subtitle */}
      <p style={{
        color: "#C6A96F",
        fontSize: "20px",
        fontWeight: "400"
      }}>
        שלב {currentStep} מתוך 3
      </p>
    </div>
  );
};