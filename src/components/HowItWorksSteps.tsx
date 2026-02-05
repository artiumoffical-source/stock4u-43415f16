import React from "react";
import shekelImg from "@/assets/how-it-works/shekel.png";
import poundImg from "@/assets/how-it-works/pound.png";
import euroImg from "@/assets/how-it-works/euro.png";
import yenImg from "@/assets/how-it-works/yen.png";
import dollarImg from "@/assets/how-it-works/dollar.png";
import coinImg from "@/assets/how-it-works/coin.png";
import arrow1Img from "@/assets/how-it-works/arrow-1.png";
import arrow2Img from "@/assets/how-it-works/arrow-2.png";

interface StepCardProps {
  number: string;
  lines: string[];
}

const StepCard: React.FC<StepCardProps> = ({ number, lines }) => (
  <div
    className="flex flex-col items-center justify-center bg-white rounded-2xl w-[130px] h-[120px] md:w-[160px] md:h-[140px]"
    style={{
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    }}
  >
    {/* Sticker-style number with Fredoka font */}
    <span
      className="text-5xl md:text-6xl leading-none"
      style={{
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        color: "#FFCA42",
        WebkitTextStroke: "5px white",
        paintOrder: "stroke fill",
        filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.15))",
      }}
    >
      {number}
    </span>
    <div className="mt-1 text-center">
      {lines.map((line, idx) => (
        <p
          key={idx}
          className="text-sm md:text-base font-semibold leading-tight hebrew-font"
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
      <img
        src={dollarImg}
        alt="$"
        className="absolute top-2 right-4 md:top-4 md:right-16 w-14 h-14 md:w-20 md:h-20 object-contain"
      />
      <img
        src={coinImg}
        alt="coin"
        className="absolute top-1/3 right-2 md:right-8 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={shekelImg}
        alt="₪"
        className="absolute top-4 left-8 md:top-6 md:left-24 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={euroImg}
        alt="€"
        className="absolute top-16 left-16 md:top-12 md:left-48 w-10 h-10 md:w-14 md:h-14 object-contain"
      />
      <img
        src={poundImg}
        alt="£"
        className="absolute bottom-24 left-4 md:bottom-20 md:left-16 w-10 h-10 md:w-14 md:h-14 object-contain"
      />
      <img
        src={coinImg}
        alt="coin"
        className="absolute bottom-8 left-8 md:bottom-12 md:left-32 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
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

      {/* Steps Cards with Arrows - RTL: flex-row-reverse puts Step 1 on RIGHT */}
      <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-3 md:gap-1">
        {/* Step 1 - appears on FAR RIGHT due to flex-row-reverse */}
        <StepCard number={steps[0].number} lines={steps[0].lines} />

        {/* Arrow 1→2 (pointing left) */}
        <img
          src={arrow1Img}
          alt=""
          className="hidden md:block w-14 h-10 object-contain -mx-1"
        />

        {/* Step 2 - Center */}
        <StepCard number={steps[1].number} lines={steps[1].lines} />

        {/* Arrow 2→3 (pointing left with curl) */}
        <img
          src={arrow2Img}
          alt=""
          className="hidden md:block w-14 h-12 object-contain -mx-1"
        />

        {/* Step 3 - appears on FAR LEFT due to flex-row-reverse */}
        <StepCard number={steps[2].number} lines={steps[2].lines} />
      </div>
    </div>
  );
};

export default HowItWorksSteps;
