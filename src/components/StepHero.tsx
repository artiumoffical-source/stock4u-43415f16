import React from "react";
import { Check } from "lucide-react";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
  variant?: "default" | "all-numbers";
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep, variant = "default" }) => {
  // Steps in VISUAL order (Left to Right on screen): 3, 2, 1
  // This ensures Step 1 appears on the RIGHT side
  const steps = [
    { number: 3, label: "סיום ותשלום" },
    { number: 2, label: "עיצוב המתנה" },
    { number: 1, label: "פרטים וברכה" },
  ];

  const getStepStyle = (stepNumber: number) => {
    if (variant === "all-numbers") {
      return {
        circle: "bg-[#4880FF] text-white",
        showCheck: false,
      };
    }

    if (stepNumber < currentStep) {
      return {
        circle: "bg-[#4880FF] text-white",
        showCheck: true,
      };
    } else if (stepNumber === currentStep) {
      return {
        circle: "bg-white text-[#4880FF] ring-4 ring-[#4880FF]",
        showCheck: false,
      };
    } else {
      return {
        circle: "bg-gray-200 text-gray-400",
        showCheck: false,
      };
    }
  };

  return (
    <div 
      className="w-full h-[220px] md:h-[280px] lg:h-[320px] relative overflow-hidden"
      style={{ backgroundColor: '#E0E7F5' }}
    >
      {/* 3D Currency Stickers - Positioned to match reference */}
      {/* Euro - Top Left */}
      <div className="absolute top-4 md:top-6 left-[3%] text-4xl md:text-5xl font-black z-10" style={{ color: '#22c55e', textShadow: '3px 3px 0 #166534, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>€</div>
      
      {/* Euro - Top Right */}
      <div className="absolute top-8 md:top-12 right-[5%] text-3xl md:text-4xl font-black z-10 -rotate-12" style={{ color: '#22c55e', textShadow: '3px 3px 0 #166534, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>€</div>
      
      {/* Shekel - Top Center */}
      <div className="absolute top-0 md:top-2 left-1/2 -translate-x-1/2 text-4xl md:text-5xl font-black z-10" style={{ color: '#22c55e', textShadow: '3px 3px 0 #166534, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>₪</div>
      
      {/* Dollar - Upper area */}
      <div className="absolute top-12 md:top-16 left-[32%] text-3xl md:text-4xl font-black z-10 rotate-6" style={{ color: '#22c55e', textShadow: '3px 3px 0 #166534, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>$</div>
      
      {/* Pound - Bottom Left */}
      <div className="absolute bottom-16 md:bottom-20 left-[6%] text-3xl md:text-4xl font-black z-10 rotate-12" style={{ color: '#22c55e', textShadow: '3px 3px 0 #166534, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>£</div>
      
      {/* Yen - Bottom Right */}
      <div className="absolute bottom-12 md:bottom-16 right-[4%] text-3xl md:text-4xl font-black z-10 -rotate-12" style={{ color: '#22c55e', textShadow: '3px 3px 0 #166534, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>¥</div>

      {/* Decorative Stars */}
      <div className="absolute top-16 md:top-20 left-[2%] z-10">
        <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="#FF6347">
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>
      </div>
      <div className="absolute top-6 md:top-8 right-[25%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#FF6347">
          <polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" />
        </svg>
      </div>
      <div className="absolute top-14 md:top-16 left-[22%] z-10">
        <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#FFD93D">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="absolute top-20 md:top-24 left-[38%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#4880FF">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="absolute top-16 md:top-20 right-[2%] z-10">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#22c55e">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 md:bottom-24 left-[15%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#FFD93D">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="absolute bottom-24 md:bottom-28 right-[18%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#4880FF">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>

      {/* STEPPER - Laid out LEFT to RIGHT: 3 -> 2 -> 1 */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex items-center justify-center z-20">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const style = getStepStyle(step.number);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className="flex items-center">
                {/* Step Item */}
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg ${style.circle}`}
                  >
                    {style.showCheck ? (
                      <Check className="w-6 h-6 md:w-7 md:h-7" strokeWidth={3} />
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

                {/* Connecting Line - after each step except last */}
                {!isLast && (
                  <div className="w-16 md:w-28 lg:w-36 h-1 bg-[#4880FF] mx-4 md:mx-6 -mt-8 md:-mt-10 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
