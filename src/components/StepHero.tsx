import React from "react";
import { Check } from "lucide-react";

// Import real PNG assets
import euro1 from "@/assets/step-hero/euro-1.png";
import euro2 from "@/assets/step-hero/euro-2.png";
import pound from "@/assets/step-hero/pound.png";
import redStar from "@/assets/step-hero/red-star.png";
import yellowSparkle from "@/assets/step-hero/yellow-sparkle.png";
import stepCircle1 from "@/assets/step-hero/step-circle-1.png";
import stepCircle2 from "@/assets/step-hero/step-circle-2.png";
import stepCircle3 from "@/assets/step-hero/step-circle-3.png";
import labelStep1 from "@/assets/step-hero/label-step-1.png";
import labelStep2 from "@/assets/step-hero/label-step-2.png";
import labelStep3 from "@/assets/step-hero/label-step-3.png";
import shekel from "@/assets/step-hero/shekel.png";
import dollar from "@/assets/step-hero/dollar.png";
import yen from "@/assets/step-hero/yen.png";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  // RTL: Step 1 appears on the RIGHT, Step 3 on the LEFT
  const steps = [
    { number: 1, label: "פרטים וברכה", labelImage: labelStep1, circleImage: stepCircle1 },
    { number: 2, label: "עיצוב המתנה", labelImage: labelStep2, circleImage: stepCircle2 },
    { number: 3, label: "סיום ותשלום", labelImage: labelStep3, circleImage: stepCircle3 },
  ];

  const getStepState = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return "completed"; // Show checkmark
    } else if (stepNumber === currentStep) {
      return "current"; // White circle with shadow
    } else {
      return "future"; // Blue circle (PNG)
    }
  };

  return (
    <div 
      className="w-full h-[180px] md:h-[280px] lg:h-[320px] relative overflow-hidden"
      style={{ backgroundColor: '#E0E7F5' }}
    >
      {/* ===== DECORATIVE 3D STICKERS ===== */}
      
      {/* Euro 1 - Top Left */}
      <img 
        src={euro1} 
        alt="" 
        className="hidden md:block absolute top-4 md:top-8 left-[2%] md:left-[4%] w-12 md:w-16 lg:w-20 h-auto z-10"
      />
      
      {/* Euro 2 - Top Right */}
      <img 
        src={euro2} 
        alt="" 
        className="hidden md:block absolute top-6 md:top-10 right-[3%] md:right-[5%] w-10 md:w-14 lg:w-16 h-auto z-10 -rotate-12"
      />
      
      {/* Pound - Bottom Left */}
      <img 
        src={pound} 
        alt="" 
        className="hidden md:block absolute bottom-16 md:bottom-20 left-[4%] md:left-[6%] w-10 md:w-14 lg:w-16 h-auto z-10"
      />
      
      {/* Red Star - Top Left area */}
      <img 
        src={redStar} 
        alt="" 
        className="hidden md:block absolute top-14 md:top-20 left-[1%] md:left-[2%] w-6 md:w-8 lg:w-10 h-auto z-10"
      />
      
      {/* Red Star - Top Right area */}
      <img 
        src={redStar} 
        alt="" 
        className="hidden md:block absolute top-4 md:top-6 right-[22%] md:right-[24%] w-4 md:w-6 lg:w-7 h-auto z-10"
      />
      
      {/* Yellow Sparkle - Upper center-left */}
      <img 
        src={yellowSparkle} 
        alt="" 
        className="hidden md:block absolute top-12 md:top-16 left-[18%] md:left-[20%] w-5 md:w-6 lg:w-8 h-auto z-10"
      />
      
      {/* Yellow Sparkle - Bottom left area */}
      <img 
        src={yellowSparkle} 
        alt="" 
        className="hidden md:block absolute bottom-20 md:bottom-24 left-[12%] md:left-[14%] w-4 md:w-5 lg:w-6 h-auto z-10"
      />

      {/* Shekel - Top Center */}
      <img 
        src={shekel} 
        alt="" 
        className="hidden md:block absolute top-0 md:top-2 left-1/2 -translate-x-1/2 w-10 md:w-14 lg:w-16 h-auto z-10"
      />
      
      {/* Dollar - Upper area */}
      <img 
        src={dollar} 
        alt="" 
        className="hidden md:block absolute top-10 md:top-14 left-[30%] md:left-[32%] w-8 md:w-12 lg:w-14 h-auto z-10 rotate-6"
      />
      
      {/* Yen - Bottom Right */}
      <img 
        src={yen} 
        alt="" 
        className="hidden md:block absolute bottom-14 md:bottom-18 right-[3%] md:right-[4%] w-10 md:w-14 lg:w-16 h-auto z-10 -rotate-12"
      />

      {/* CSS Sparkles for variety */}
      <div className="hidden md:block absolute top-20 md:top-24 left-[36%] md:left-[38%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#4880FF">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="hidden md:block absolute top-14 md:top-18 right-[2%] md:right-[3%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#22c55e">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="hidden md:block absolute bottom-24 md:bottom-28 right-[16%] md:right-[18%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#4880FF">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>

      {/* ===== STEPPER - NO CONNECTING LINES ===== */}
      <div className="absolute bottom-4 md:bottom-12 left-0 right-0 flex items-center justify-center z-20 px-2">
        <div className="flex items-center gap-6 md:gap-16 lg:gap-24">
          {steps.map((step) => {
            const state = getStepState(step.number);

            return (
              <div key={step.number} className="flex flex-col items-center gap-2 md:gap-3">
                {/* Circle */}
                {state === "completed" ? (
                  // Completed - Blue circle with checkmark (CSS)
                  <div className="w-9 h-9 md:w-14 md:h-14 rounded-full bg-[#4880FF] flex items-center justify-center">
                    <Check className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  // Current or Future - Use PNG image for circle
                  <img 
                    src={step.circleImage} 
                    alt={`שלב ${step.number}`}
                    className="w-9 h-9 md:w-14 md:h-14"
                  />
                )}

                {/* Label - Always use PNG image */}
                <img 
                  src={step.labelImage} 
                  alt={step.label}
                  className="h-5 md:h-8 lg:h-9 w-auto"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
