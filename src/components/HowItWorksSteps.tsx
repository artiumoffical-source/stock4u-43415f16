import React from "react";
import shekelImg from "@/assets/how-it-works/shekel.png";
import poundImg from "@/assets/how-it-works/pound.png";
import euroImg from "@/assets/how-it-works/euro.png";
import yenImg from "@/assets/how-it-works/yen.png";
import dollarImg from "@/assets/how-it-works/dollar.png";
import coinImg from "@/assets/how-it-works/coin.png";

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

      {/* Steps Container - LOCKED RTL with flex-row-reverse */}
      <div className="flex flex-row-reverse items-center justify-center gap-0 w-full max-w-3xl">
        {/* STEP 1 (Rightmost due to row-reverse) */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-white rounded-2xl shadow-lg w-[140px] h-[130px] md:w-[160px] md:h-[150px] flex flex-col items-center justify-center p-4">
            <span
              className="leading-none"
              style={{
                fontFamily: "'Titan One', cursive",
                fontSize: "70px",
                color: "#FFC845",
                WebkitTextStroke: "7px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 4px 0px rgba(0,0,0,0.1))",
              }}
            >
              1
            </span>
          </div>
          <h3
            className="font-semibold text-base md:text-lg mt-2 hebrew-font text-center"
            style={{ color: "#4F86F9" }}
          >
            בוחרים חבילה
          </h3>
          <p className="text-sm text-gray-400 hebrew-font text-center">
            או חברה
          </p>
        </div>

        {/* ARROW 1 (Curved Down-Left) */}
        <div className="hidden md:flex items-center justify-center w-16 h-12 mx-[-8px] mt-10">
          <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            className="transform rotate-[-10deg]"
          >
            <path
              d="M 0 5 C 20 15, 40 25, 55 30"
              stroke="#4F86F9"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 50 25 L 55 30 L 48 32"
              stroke="#4F86F9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* STEP 2 (Center) */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-white rounded-2xl shadow-lg w-[140px] h-[130px] md:w-[160px] md:h-[150px] flex flex-col items-center justify-center p-4">
            <span
              className="leading-none"
              style={{
                fontFamily: "'Titan One', cursive",
                fontSize: "70px",
                color: "#FFC845",
                WebkitTextStroke: "7px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 4px 0px rgba(0,0,0,0.1))",
              }}
            >
              2
            </span>
          </div>
          <h3
            className="font-semibold text-base md:text-lg mt-2 hebrew-font text-center"
            style={{ color: "#4F86F9" }}
          >
            מוסיפים ברכה
          </h3>
          <p className="text-sm text-gray-400 hebrew-font text-center">
            (נעזור לך!)
          </p>
        </div>

        {/* ARROW 2 (Curved Up-Left) */}
        <div className="hidden md:flex items-center justify-center w-16 h-12 mx-[-8px] mt-12">
          <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            className="transform rotate-[10deg]"
          >
            <path
              d="M 0 35 C 20 25, 40 15, 55 10"
              stroke="#4F86F9"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 50 15 L 55 10 L 52 5"
              stroke="#4F86F9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* STEP 3 (Leftmost due to row-reverse) */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-white rounded-2xl shadow-lg w-[140px] h-[130px] md:w-[160px] md:h-[150px] flex flex-col items-center justify-center p-4">
            <span
              className="leading-none"
              style={{
                fontFamily: "'Titan One', cursive",
                fontSize: "70px",
                color: "#FFC845",
                WebkitTextStroke: "7px white",
                paintOrder: "stroke fill",
                filter: "drop-shadow(0px 4px 0px rgba(0,0,0,0.1))",
              }}
            >
              3
            </span>
          </div>
          <h3
            className="font-semibold text-base md:text-lg mt-2 hebrew-font text-center"
            style={{ color: "#4F86F9" }}
          >
            מעניקים מניות
          </h3>
          <p className="text-sm text-gray-400 hebrew-font text-center">
            במתנה!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSteps;
