import React from "react";
import shekelImg from "@/assets/how-it-works/shekel.png";
import poundImg from "@/assets/how-it-works/pound.png";
import euroImg from "@/assets/how-it-works/euro.png";
import yenImg from "@/assets/how-it-works/yen.png";
import dollarImg from "@/assets/how-it-works/dollar.png";
import coinImg from "@/assets/how-it-works/coin.png";

const CurvedArrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="40"
    height="32"
    viewBox="0 0 40 32"
    fill="none"
    className={className}
  >
    <path
      d="M38 8C30 8 25 8 20 16C15 24 10 24 2 24"
      stroke="#4F86F9"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M8 18L2 24L8 30"
      stroke="#4F86F9"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

interface StepCardProps {
  number: string;
  lines: string[];
}

const StepCard: React.FC<StepCardProps> = ({ number, lines }) => (
  <div
    className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md w-[140px] h-[130px] md:w-[180px] md:h-[150px]"
    style={{
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    }}
  >
    <span
      className="text-4xl md:text-5xl font-bold leading-none"
      style={{ color: "#FFC845", fontFamily: "Poppins, sans-serif" }}
    >
      {number}
    </span>
    <div className="mt-2 text-center">
      {lines.map((line, idx) => (
        <p
          key={idx}
          className="text-sm md:text-base font-medium leading-tight hebrew-font"
          style={{ color: "#2B5FAE" }}
        >
          {line}
        </p>
      ))}
    </div>
  </div>
);

export const HowItWorksSteps: React.FC = () => {
  const steps = [
    { number: "1", lines: ["בוחרים חבילה", "או חברה"] },
    { number: "2", lines: ["מוסיפים ברכה", "(נעזור לך!)"] },
    { number: "3", lines: ["מעניקים מניות", "במתנה!"] },
  ];

  return (
    <div className="relative w-full min-h-[320px] md:min-h-[380px] flex flex-col items-center justify-center py-6 px-4">
      {/* Floating Currency Stickers */}
      {/* Dollar - Top Right */}
      <img
        src={dollarImg}
        alt="$"
        className="absolute top-2 right-4 md:top-4 md:right-16 w-14 h-14 md:w-20 md:h-20 object-contain"
      />
      {/* Coin - Right side */}
      <img
        src={coinImg}
        alt="coin"
        className="absolute top-1/3 right-2 md:right-8 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      {/* Shekel - Top Left */}
      <img
        src={shekelImg}
        alt="₪"
        className="absolute top-4 left-8 md:top-6 md:left-24 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      {/* Euro - Top Left area */}
      <img
        src={euroImg}
        alt="€"
        className="absolute top-16 left-16 md:top-12 md:left-48 w-10 h-10 md:w-14 md:h-14 object-contain"
      />
      {/* Pound - Left side */}
      <img
        src={poundImg}
        alt="£"
        className="absolute bottom-24 left-4 md:bottom-20 md:left-16 w-10 h-10 md:w-14 md:h-14 object-contain"
      />
      {/* Coin - Bottom Left */}
      <img
        src={coinImg}
        alt="coin"
        className="absolute bottom-8 left-8 md:bottom-12 md:left-32 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      {/* Yen - Bottom Right */}
      <img
        src={yenImg}
        alt="¥"
        className="absolute bottom-6 right-4 md:bottom-10 md:right-20 w-12 h-12 md:w-16 md:h-16 object-contain"
      />

      {/* Title */}
      <h2
        className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 hebrew-font"
        style={{ color: "#2B5FAE" }}
      >
        זה כלכך פשוט!
      </h2>

      {/* Steps Cards with Arrows - RTL order */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4 md:gap-2">
        {/* Step 1 (Rightmost in RTL) */}
        <StepCard number={steps[0].number} lines={steps[0].lines} />

        {/* Arrow 1→2 */}
        <div className="rotate-90 md:rotate-0 my-2 md:my-0 md:mx-1">
          <CurvedArrow />
        </div>

        {/* Step 2 (Center) */}
        <StepCard number={steps[1].number} lines={steps[1].lines} />

        {/* Arrow 2→3 */}
        <div className="rotate-90 md:rotate-0 my-2 md:my-0 md:mx-1">
          <CurvedArrow />
        </div>

        {/* Step 3 (Leftmost in RTL) */}
        <StepCard number={steps[2].number} lines={steps[2].lines} />
      </div>
    </div>
  );
};

export default HowItWorksSteps;
