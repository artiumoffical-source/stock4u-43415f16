import React from "react";
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

// Floating currency decorations
const FloatingDecorations = () => (
  <>
    {/* Euro - Top Left */}
    <span className="absolute top-8 left-16 text-4xl font-bold text-green-500 drop-shadow-md rotate-[-10deg]">€</span>
    
    {/* Star - Top Left Area */}
    <span className="absolute top-16 left-[25%] text-3xl text-yellow-400">✦</span>
    
    {/* Shekel - Top Center */}
    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-bold text-green-500 drop-shadow-md">₪</span>
    
    {/* Star - Top Right Area */}
    <span className="absolute top-6 right-[30%] text-2xl text-orange-500">✴</span>
    
    {/* Dollar - Top Right */}
    <span className="absolute top-16 right-[25%] text-4xl font-bold text-green-500 drop-shadow-md">$</span>
    
    {/* Euro - Far Right */}
    <span className="absolute top-24 right-8 text-3xl font-bold text-green-500 drop-shadow-md rotate-[10deg]">€</span>
    
    {/* Star - Left Side */}
    <span className="absolute top-1/2 left-8 text-2xl text-orange-500">✴</span>
    
    {/* Pound - Left Side */}
    <span className="absolute bottom-24 left-20 text-4xl font-bold text-green-500 drop-shadow-md">£</span>
    
    {/* Yen - Right Side */}
    <span className="absolute bottom-20 right-16 text-4xl font-bold text-green-500 drop-shadow-md rotate-[5deg]">¥</span>
    
    {/* Stars - Various */}
    <span className="absolute bottom-32 left-[35%] text-xl text-yellow-400">✦</span>
    <span className="absolute top-1/3 right-12 text-lg text-blue-300">✦</span>
    <span className="absolute bottom-16 right-[30%] text-xl text-yellow-400">✦</span>
    <span className="absolute bottom-8 left-12 text-lg text-blue-300">✦</span>
  </>
);

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  const getStepState = (stepNumber: number): 'completed' | 'active' | 'inactive' => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'inactive';
  };

  return (
    <div className="w-full py-20 bg-[#E8EDF8] relative overflow-hidden">
      {/* Floating Currency Decorations */}
      <FloatingDecorations />
      
      {/* Progress Stepper - Centered */}
      <div className="relative z-10 flex items-center justify-center px-4" dir="rtl">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const state = getStepState(step.stepNumber);
            const isLast = index === steps.length - 1;
            
            return (
              <React.Fragment key={step.stepNumber}>
                {/* Step Item */}
                <div className="flex flex-col items-center gap-3">
                  {/* Circle */}
                  {state === 'completed' ? (
                    <div className="w-14 h-14 rounded-full bg-white border-[3px] border-[#4B7BE5] flex items-center justify-center shadow-sm">
                      <Check className="w-7 h-7 text-[#4B7BE5] stroke-[3]" />
                    </div>
                  ) : state === 'active' ? (
                    <div className="w-14 h-14 rounded-full bg-[#4B7BE5] flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-2xl">{step.stepNumber}</span>
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-gray-400 font-medium text-2xl">{step.stepNumber}</span>
                    </div>
                  )}
                  
                  {/* Label */}
                  <span 
                    className={`text-lg font-bold whitespace-nowrap ${
                      state === 'inactive' ? 'text-gray-400' : 'text-[#4B7BE5]'
                    } ${state === 'active' ? 'text-xl' : ''}`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div 
                    className={`w-40 md:w-56 h-[3px] mx-6 -mt-10 ${
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
