import React from "react";
import stepHero3dBg from "@/assets/step-hero-3d-bg.png";

interface StepHeroProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const StepHero: React.FC<StepHeroProps> = ({ currentStep }) => {
  // The background image contains the stepper with 3D currency decorations
  // For now we display it as-is - the stepper in image shows completed step 1, 2 and active step 3
  // This matches the checkout page (step 3) perfectly
  
  return (
    <div 
      className="w-full h-[220px] md:h-[280px] lg:h-[320px] relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${stepHero3dBg})`,
      }}
    />
  );
};
