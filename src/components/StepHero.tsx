import React from "react";
import { Check } from "lucide-react";
import stepHero3dBg from "@/assets/step-hero-3d-bg.png";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
  variant?: "default" | "all-numbers";
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep, variant = "default" }) => {
  // Steps ordered for RTL: Step 1 (right) -> Step 2 (center) -> Step 3 (left)
  const steps = [
    { number: 1, label: "פרטים וברכה" },
    { number: 2, label: "עיצוב המתנה" },
    { number: 3, label: "סיום ותשלום" },
  ];

  const getStepStyle = (stepNumber: number) => {
    if (variant === "all-numbers") {
      return {
        circle: "bg-[#4880FF] text-white",
        showCheck: false,
        showNumber: true,
      };
    }

    if (stepNumber < currentStep) {
      return {
        circle: "bg-[#4880FF] text-white",
        showCheck: true,
        showNumber: false,
      };
    } else if (stepNumber === currentStep) {
      return {
        circle: "bg-white text-[#4880FF] ring-4 ring-[#4880FF]",
        showCheck: false,
        showNumber: true,
      };
    } else {
      return {
        circle: "bg-gray-200 text-gray-400",
        showCheck: false,
        showNumber: true,
      };
    }
  };

  return (
    <div 
      className="w-full h-[200px] md:h-[260px] lg:h-[300px] relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${stepHero3dBg})`,
      }}
      dir="rtl"
    >
      {/* Stepper Container - Positioned at bottom center */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex items-center justify-center z-20">
        <div className="flex items-center gap-0">
          {steps.map((step, index) => {
            const style = getStepStyle(step.number);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="flex items-center">
                {/* Step Item */}
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  {/* Circle */}
                  <div
                    className={`w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg ${style.circle}`}
                  >
                    {style.showCheck ? (
                      <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                    ) : (
                      step.number
                    )}
                  </div>
                  {/* Label */}
                  <span 
                    className="text-base md:text-lg font-bold text-[#4880FF] whitespace-nowrap"
                    style={{
                      textShadow: '3px 3px 0px white, -3px -3px 0px white, 3px -3px 0px white, -3px 3px 0px white, 0px 3px 0px white, 0px -3px 0px white, 3px 0px 0px white, -3px 0px 0px white'
                    }}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connecting Line - appears AFTER each step except last */}
                {!isLast && (
                  <div className="w-16 md:w-28 lg:w-36 h-1 bg-[#4880FF] mx-2 md:mx-4 mb-8 md:mb-10 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
