import React from "react";

interface StepHeroProps {
  currentStep: 1 | 2 | 3;
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "559px",
        flexShrink: 0,
        background: "#DBE3F3",
        position: "relative",
        overflow: "hidden",
        marginLeft: "1px",
      }}
    >
      {/* Content Container */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "40px",
          zIndex: 10,
        }}
      >
        {/* Step Progress Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: currentStep >= 1 ? "50px" : "40px",
                height: currentStep >= 1 ? "50px" : "40px",
                borderRadius: "50%",
                background: currentStep >= 1 ? "#4C7EFB" : "rgba(76, 126, 251, 0.3)",
                color: currentStep >= 1 ? "#FFF" : "#4C7EFB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "700",
                fontFamily: "Poppins",
                transition: "all 0.3s ease",
              }}
            >
              1
            </div>
            <span
              style={{
                color: currentStep >= 1 ? "#4C7EFB" : "rgba(76, 126, 251, 0.6)",
                fontSize: "16px",
                fontWeight: currentStep >= 1 ? "600" : "400",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              פרטי הזמנה
            </span>
          </div>

          {/* Connector Line */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background: currentStep >= 2 ? "#4C7EFB" : "rgba(76, 126, 251, 0.3)",
              transition: "background 0.3s ease",
            }}
          />

          {/* Step 2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: currentStep >= 2 ? "50px" : "40px",
                height: currentStep >= 2 ? "50px" : "40px",
                borderRadius: "50%",
                background: currentStep >= 2 ? "#4C7EFB" : "rgba(76, 126, 251, 0.3)",
                color: currentStep >= 2 ? "#FFF" : "#4C7EFB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "700",
                fontFamily: "Poppins",
                transition: "all 0.3s ease",
              }}
            >
              2
            </div>
            <span
              style={{
                color: currentStep >= 2 ? "#4C7EFB" : "rgba(76, 126, 251, 0.6)",
                fontSize: "16px",
                fontWeight: currentStep >= 2 ? "600" : "400",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              עיצוב מתנה
            </span>
          </div>

          {/* Connector Line */}
          <div
            style={{
              width: "60px",
              height: "2px",
              background: currentStep >= 3 ? "#4C7EFB" : "rgba(76, 126, 251, 0.3)",
              transition: "background 0.3s ease",
            }}
          />

          {/* Step 3 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: currentStep >= 3 ? "50px" : "40px",
                height: currentStep >= 3 ? "50px" : "40px",
                borderRadius: "50%",
                background: currentStep >= 3 ? "#4C7EFB" : "rgba(76, 126, 251, 0.3)",
                color: currentStep >= 3 ? "#FFF" : "#4C7EFB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "700",
                fontFamily: "Poppins",
                transition: "all 0.3s ease",
              }}
            >
              3
            </div>
            <span
              style={{
                color: currentStep >= 3 ? "#4C7EFB" : "rgba(76, 126, 251, 0.6)",
                fontSize: "16px",
                fontWeight: currentStep >= 3 ? "600" : "400",
                fontFamily: "Poppins",
                textAlign: "center",
              }}
            >
              סיכום והזמנה
            </span>
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h1
            style={{
              color: "#4C7EFB",
              fontSize: "48px",
              fontWeight: "700",
              fontFamily: "Poppins",
              textAlign: "center",
              margin: 0,
            }}
          >
            {currentStep === 1 && "פרטי ההזמנה"}
            {currentStep === 2 && "עיצוב המתנה"}
            {currentStep === 3 && "סיכום ותשלום"}
          </h1>
          <p
            style={{
              color: "#486284",
              fontSize: "20px",
              fontWeight: "400",
              fontFamily: "Poppins",
              textAlign: "center",
              margin: 0,
              maxWidth: "600px",
            }}
          >
            {currentStep === 1 && "מלאו את הפרטים הנדרשים לשליחת המתנה"}
            {currentStep === 2 && "בחרו את עיצוב המתנה והברכה האישית"}
            {currentStep === 3 && "בדקו את הפרטים ובצעו תשלום"}
          </p>
        </div>
      </div>
    </div>
  );
};