import React from "react";
import stepHeroBg from "@/assets/step-hero-bg.png";
import { Check } from "lucide-react";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
}

interface StepConfig {
  label: string;
  stepNumber: number;
}

const steps: StepConfig[] = [
  { label: "פרטים וברכה", stepNumber: 1 },
  { label: "עיצוב המתנה", stepNumber: 2 },
  { label: "סיום ותשלום", stepNumber: 3 },
];

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  const getStepState = (stepNumber: number): 'completed' | 'active' | 'inactive' => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'inactive';
  };

  return (
    <div
      className="w-full h-[410px] flex-shrink-0 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: `url(${stepHeroBg})`,
      }}
    >
      {/* Progress Stepper - Centered */}
      <div className="absolute inset-0 flex items-center justify-center" dir="rtl">
        <div className="flex items-center gap-0">
          {steps.map((step, index) => {
            const state = getStepState(step.stepNumber);
            const isLast = index === steps.length - 1;
            
            return (
              <React.Fragment key={step.stepNumber}>
                {/* Step Item */}
                <div className="flex flex-col items-center gap-3">
                  {/* Circle */}
                  {state === 'completed' ? (
                    <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#4B7BE5] flex items-center justify-center">
                      <Check className="w-6 h-6 text-[#4B7BE5] stroke-[3]" />
                    </div>
                  ) : state === 'active' ? (
                    <div className="w-12 h-12 rounded-full bg-[#4B7BE5] flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{step.stepNumber}</span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 font-medium text-xl">{step.stepNumber}</span>
                    </div>
                  )}
                  
                  {/* Label */}
                  <span 
                    className={`text-base font-medium whitespace-nowrap ${
                      state === 'inactive' ? 'text-gray-400' : 'text-[#4B7BE5]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div 
                    className={`w-32 md:w-48 h-[3px] mx-4 -mt-8 ${
                      getStepState(step.stepNumber + 1) !== 'inactive' 
                        ? 'bg-[#4B7BE5]' 
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
