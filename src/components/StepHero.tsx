import React from "react";
import { Check } from "lucide-react";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
  variant?: "default" | "all-numbers";
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep, variant = "default" }) => {
  const steps = [
    { number: 1, label: "פרטים וברכה" },
    { number: 2, label: "עיצוב המתנה" },
    { number: 3, label: "סיום ותשלום" },
  ];

  const getStepStyle = (stepNumber: number) => {
    if (variant === "all-numbers") {
      // All steps show as solid blue with white numbers
      return {
        circle: "bg-blue-600 text-white",
        showCheck: false,
        showNumber: true,
      };
    }

    // Default variant - show checkmarks for completed steps
    if (stepNumber < currentStep) {
      return {
        circle: "bg-blue-600 text-white",
        showCheck: true,
        showNumber: false,
      };
    } else if (stepNumber === currentStep) {
      return {
        circle: "bg-white text-blue-600 ring-4 ring-blue-600",
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
      className="w-full h-[180px] md:h-[220px] lg:h-[260px] relative overflow-hidden"
      style={{ backgroundColor: '#E0E7F5' }}
    >
      {/* Floating 3D Currency Symbols */}
      {/* Euro - Top Left */}
      <div className="absolute top-6 left-[5%] text-3xl md:text-4xl font-bold text-green-500 drop-shadow-[2px_2px_0px_#1a5f3c] transform -rotate-12 z-10">
        €
      </div>
      {/* Euro - Top Right */}
      <div className="absolute top-8 right-[8%] text-2xl md:text-3xl font-bold text-green-500 drop-shadow-[2px_2px_0px_#1a5f3c] transform rotate-6 z-10">
        €
      </div>
      {/* Dollar - Top Center Right */}
      <div className="absolute top-10 right-[30%] text-3xl md:text-4xl font-bold text-green-500 drop-shadow-[2px_2px_0px_#1a5f3c] transform rotate-12 z-10">
        $
      </div>
      {/* Shekel - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl md:text-5xl font-bold text-green-500 drop-shadow-[2px_2px_0px_#1a5f3c] z-10">
        ₪
      </div>
      {/* Pound - Bottom Left */}
      <div className="absolute bottom-12 left-[8%] text-3xl md:text-4xl font-bold text-green-500 drop-shadow-[2px_2px_0px_#1a5f3c] transform rotate-12 z-10">
        £
      </div>
      {/* Yen - Bottom Right */}
      <div className="absolute bottom-10 right-[6%] text-3xl md:text-4xl font-bold text-green-500 drop-shadow-[2px_2px_0px_#1a5f3c] transform -rotate-12 z-10">
        ¥
      </div>

      {/* Decorative Stars */}
      <div className="absolute top-12 right-[18%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#FF6347">
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>
      </div>
      <div className="absolute top-16 left-[15%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#FF6347">
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-[25%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#4880FF">
          <polygon points="12,2 14,8 20,8 15,12 17,19 12,15 7,19 9,12 4,8 10,8" />
        </svg>
      </div>
      <div className="absolute top-8 left-[35%] z-10">
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#FFD93D">
          <polygon points="12,2 14,8 20,8 15,12 17,19 12,15 7,19 9,12 4,8 10,8" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-[20%] z-10">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFD93D">
          <polygon points="12,2 14,8 20,8 15,12 17,19 12,15 7,19 9,12 4,8 10,8" />
        </svg>
      </div>
      <div className="absolute top-20 right-[5%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#00C9A7">
          <polygon points="12,2 14,8 20,8 15,12 17,19 12,15 7,19 9,12 4,8 10,8" />
        </svg>
      </div>

      {/* Stepper Container */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex flex-row-reverse items-center gap-2 md:gap-4 px-4">
          {steps.map((step, index) => {
            const style = getStepStyle(step.number);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="flex flex-row-reverse items-center">
                {/* Step Item */}
                <div className="flex flex-col items-center gap-2">
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg ${style.circle}`}
                  >
                    {style.showCheck ? (
                      <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                    ) : (
                      step.number
                    )}
                  </div>
                  {/* Label */}
                  <span 
                    className="text-sm md:text-base font-bold text-blue-600 whitespace-nowrap"
                    style={{
                      textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white, 0px 2px 0px white, 0px -2px 0px white, 2px 0px 0px white, -2px 0px 0px white'
                    }}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div className="w-12 md:w-20 lg:w-28 h-1 bg-blue-600 mx-2 md:mx-3 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
