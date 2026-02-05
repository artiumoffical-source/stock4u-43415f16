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
  title: string;
  subtitle: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, subtitle }) => (
  <div
    className="flex flex-col items-center justify-center bg-white rounded-[20px] w-[150px] h-[140px] md:w-[180px] md:h-[160px]"
    style={{
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
    }}
  >
    {/* Big sticker number with Fredoka One font */}
    <span
      className="leading-none"
      style={{
        fontFamily: "'Fredoka One', cursive",
        fontSize: "70px",
        color: "#FFC845",
        WebkitTextStroke: "7px white",
        paintOrder: "stroke fill",
        filter: "drop-shadow(0px 3px 0px rgba(0,0,0,0.08))",
      }}
    >
      {number}
    </span>
    <h3
      className="font-bold text-base md:text-lg mt-1 hebrew-font text-center"
      style={{ color: "#4F86F9" }}
    >
      {title}
    </h3>
    <p
      className="text-sm text-center hebrew-font"
      style={{ color: "#4F86F9", opacity: 0.7 }}
    >
      {subtitle}
    </p>
  </div>
);

export const HowItWorksSteps: React.FC = () => {
  return (
    <div className="relative w-full min-h-[340px] md:min-h-[400px] flex flex-col items-center justify-center py-8 px-4">
      {/* Floating Currency Stickers */}
      <img
        src={dollarImg}
        alt="$"
        className="absolute top-4 right-6 md:top-6 md:right-20 w-16 h-16 md:w-24 md:h-24 object-contain"
      />
      <img
        src={coinImg}
        alt="coin"
        className="absolute top-[35%] right-2 md:right-10 w-14 h-14 md:w-18 md:h-18 object-contain"
      />
      <img
        src={shekelImg}
        alt="₪"
        className="absolute top-6 left-10 md:top-8 md:left-28 w-14 h-14 md:w-20 md:h-20 object-contain"
      />
      <img
        src={euroImg}
        alt="€"
        className="absolute top-20 left-20 md:top-14 md:left-52 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={poundImg}
        alt="£"
        className="absolute bottom-20 left-6 md:bottom-16 md:left-20 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={coinImg}
        alt="coin"
        className="absolute bottom-6 left-12 md:bottom-10 md:left-36 w-14 h-14 md:w-18 md:h-18 object-contain"
      />
      <img
        src={yenImg}
        alt="¥"
        className="absolute bottom-4 right-6 md:bottom-8 md:right-24 w-14 h-14 md:w-20 md:h-20 object-contain"
      />

      {/* Title */}
      <h2
        className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 hebrew-font"
        style={{ color: "#2B5FAE" }}
      >
        זה כלכך פשוט!
      </h2>

      {/* Steps with Arrows - RTL Layout: Step 1 on RIGHT */}
      <div className="flex flex-row-reverse items-center justify-center gap-0">
        {/* STEP 1 - FAR RIGHT */}
        <StepCard number="1" title="בוחרים חבילה" subtitle="או חברה" />

        {/* ARROW 1→2 (curved, pointing left) */}
        <div className="hidden md:flex items-center justify-center w-12 h-16 -mx-2 mt-8">
          <img
            src={arrow1Img}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* STEP 2 - CENTER */}
        <StepCard number="2" title="מוסיפים ברכה" subtitle="(נעזור לך!)" />

        {/* ARROW 2→3 (curved with loop, pointing left) */}
        <div className="hidden md:flex items-center justify-center w-14 h-16 -mx-2 mt-16">
          <img
            src={arrow2Img}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* STEP 3 - FAR LEFT */}
        <StepCard number="3" title="מעניקים מניות" subtitle="במתנה!" />
      </div>

      {/* Mobile: vertical arrows between cards */}
      <div className="flex md:hidden flex-col items-center mt-4 gap-2">
        {/* Mobile layout handled by responsive classes above */}
      </div>
    </div>
  );
};

export default HowItWorksSteps;
