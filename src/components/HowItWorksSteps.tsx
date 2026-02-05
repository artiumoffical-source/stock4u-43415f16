import React from "react";
import shekelImg from "@/assets/how-it-works/shekel.png";
import poundImg from "@/assets/how-it-works/pound.png";
import euroImg from "@/assets/how-it-works/euro.png";
import yenImg from "@/assets/how-it-works/yen.png";
import dollarImg from "@/assets/how-it-works/dollar.png";
import coinImg from "@/assets/how-it-works/coin.png";

export const HowItWorksSteps: React.FC = () => {
  return (
    <div 
      className="relative w-full min-h-[280px] md:min-h-[350px] flex flex-col items-center justify-center py-8 px-4"
      style={{ backgroundColor: "#E0E7F5" }}
    >
      {/* Floating Currency Stickers */}
      <img
        src={dollarImg}
        alt="$"
        className="absolute top-4 right-4 md:top-6 md:right-16 w-14 h-14 md:w-20 md:h-20 object-contain"
      />
      <img
        src={coinImg}
        alt="coin"
        className="absolute top-[40%] right-0 md:right-8 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={shekelImg}
        alt="₪"
        className="absolute top-4 left-8 md:top-6 md:left-24 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={euroImg}
        alt="€"
        className="absolute top-12 left-16 md:top-10 md:left-44 w-10 h-10 md:w-14 md:h-14 object-contain"
      />
      <img
        src={poundImg}
        alt="£"
        className="absolute bottom-16 left-4 md:bottom-12 md:left-16 w-10 h-10 md:w-14 md:h-14 object-contain"
      />
      <img
        src={coinImg}
        alt="coin"
        className="absolute bottom-4 left-10 md:bottom-6 md:left-32 w-12 h-12 md:w-16 md:h-16 object-contain"
      />
      <img
        src={yenImg}
        alt="¥"
        className="absolute bottom-2 right-4 md:bottom-4 md:right-20 w-12 h-12 md:w-16 md:h-16 object-contain"
      />

      {/* Title */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 hebrew-font"
        style={{ color: "#2B5FAE" }}
      >
        זה כלכך פשוט!
      </h2>

      {/* Steps Container - LOCKED RTL with flex-row-reverse, TIGHT spacing */}
      <div className="flex flex-row-reverse items-start justify-center gap-1 md:gap-2 w-full max-w-2xl">
        {/* STEP 1 (Rightmost due to row-reverse) */}
        <div className="flex flex-col items-center z-10">
          <div 
            className="rounded-2xl w-[120px] h-[100px] md:w-[160px] md:h-[130px] flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
            }}
          >
            <span
              className="leading-none"
              style={{
                fontFamily: "'Titan One', cursive",
                fontSize: "clamp(50px, 8vw, 70px)",
                color: "#FFC845",
                WebkitTextStroke: "5px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 2px 0px rgba(0,0,0,0.08))",
              }}
            >
              1
            </span>
          </div>
          <h3
            className="font-bold text-sm md:text-base mt-1 hebrew-font text-center"
            style={{ color: "#4F86F9" }}
          >
            בוחרים חבילה
          </h3>
          <p 
            className="text-xs md:text-sm hebrew-font text-center"
            style={{ color: "#4F86F9", opacity: 0.7 }}
          >
            או חברה
          </p>
        </div>

        {/* ARROW 1 (Curved pointing left) */}
        <div className="hidden md:flex items-center justify-center w-10 h-10 mt-16 mx-[-4px]">
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
            <path
              d="M 38 5 C 28 8, 18 18, 5 22"
              stroke="#4F86F9"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 10 18 L 5 22 L 10 26"
              stroke="#4F86F9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* STEP 2 (Center) */}
        <div className="flex flex-col items-center z-10">
          <div 
            className="rounded-2xl w-[120px] h-[100px] md:w-[160px] md:h-[130px] flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
            }}
          >
            <span
              className="leading-none"
              style={{
                fontFamily: "'Titan One', cursive",
                fontSize: "clamp(50px, 8vw, 70px)",
                color: "#FFC845",
                WebkitTextStroke: "5px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 2px 0px rgba(0,0,0,0.08))",
              }}
            >
              2
            </span>
          </div>
          <h3
            className="font-bold text-sm md:text-base mt-1 hebrew-font text-center"
            style={{ color: "#4F86F9" }}
          >
            מוסיפים ברכה
          </h3>
          <p 
            className="text-xs md:text-sm hebrew-font text-center"
            style={{ color: "#4F86F9", opacity: 0.7 }}
          >
            (נעזור לך!)
          </p>
        </div>

        {/* ARROW 2 (Curved pointing left, flipped) */}
        <div className="hidden md:flex items-center justify-center w-10 h-10 mt-20 mx-[-4px]">
          <svg width="40" height="35" viewBox="0 0 40 35" fill="none">
            <path
              d="M 38 28 C 30 20, 20 10, 5 12"
              stroke="#4F86F9"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 10 8 L 5 12 L 10 16"
              stroke="#4F86F9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* STEP 3 (Leftmost due to row-reverse) */}
        <div className="flex flex-col items-center z-10">
          <div 
            className="rounded-2xl w-[120px] h-[100px] md:w-[160px] md:h-[130px] flex flex-col items-center justify-center"
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
            }}
          >
            <span
              className="leading-none"
              style={{
                fontFamily: "'Titan One', cursive",
                fontSize: "clamp(50px, 8vw, 70px)",
                color: "#FFC845",
                WebkitTextStroke: "5px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 2px 0px rgba(0,0,0,0.08))",
              }}
            >
              3
            </span>
          </div>
          <h3
            className="font-bold text-sm md:text-base mt-1 hebrew-font text-center"
            style={{ color: "#4F86F9" }}
          >
            מעניקים מניות
          </h3>
          <p 
            className="text-xs md:text-sm hebrew-font text-center"
            style={{ color: "#4F86F9", opacity: 0.7 }}
          >
            במתנה!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSteps;
