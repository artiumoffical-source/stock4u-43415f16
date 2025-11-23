import React from "react";
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
      }}
    >
    </div>
  );
};
