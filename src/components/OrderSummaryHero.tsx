import React from "react";

// Import decorative assets from step-hero
import euro1 from "@/assets/step-hero/euro-1.png";
import euro2 from "@/assets/step-hero/euro-2.png";
import pound from "@/assets/step-hero/pound.png";
import redStar from "@/assets/step-hero/red-star.png";
import yellowSparkle from "@/assets/step-hero/yellow-sparkle.png";
import shekel from "@/assets/step-hero/shekel.png";
import dollar from "@/assets/step-hero/dollar.png";
import yen from "@/assets/step-hero/yen.png";

// Import order summary specific assets
import cartMascot from "@/assets/order-summary/cart-mascot.png";
import titleImage from "@/assets/order-summary/title.png";

export const OrderSummaryHero: React.FC = () => {
  return (
    <div 
      className="w-full h-[200px] md:h-[280px] lg:h-[320px] relative overflow-hidden"
      style={{ backgroundColor: '#E0E7F5' }}
    >
      {/* ===== DECORATIVE 3D STICKERS ===== */}
      
      {/* Euro 1 - Top Left */}
      <img 
        src={euro1} 
        alt="" 
        className="hidden md:block absolute top-4 md:top-8 left-[2%] md:left-[4%] w-12 md:w-16 lg:w-20 h-auto z-10"
      />
      
      {/* Euro 2 - Top Right */}
      <img 
        src={euro2} 
        alt="" 
        className="hidden md:block absolute top-6 md:top-10 right-[3%] md:right-[5%] w-10 md:w-14 lg:w-16 h-auto z-10 -rotate-12"
      />
      
      {/* Pound - Bottom Left */}
      <img 
        src={pound} 
        alt="" 
        className="hidden md:block absolute bottom-8 md:bottom-12 left-[4%] md:left-[6%] w-10 md:w-14 lg:w-16 h-auto z-10"
      />
      
      {/* Red Star - Top Left area */}
      <img 
        src={redStar} 
        alt="" 
        className="hidden md:block absolute top-14 md:top-20 left-[1%] md:left-[2%] w-6 md:w-8 lg:w-10 h-auto z-10"
      />
      
      {/* Red Star - Top Right area */}
      <img 
        src={redStar} 
        alt="" 
        className="hidden md:block absolute top-4 md:top-6 right-[22%] md:right-[24%] w-4 md:w-6 lg:w-7 h-auto z-10"
      />
      
      {/* Yellow Sparkle - Upper center-left */}
      <img 
        src={yellowSparkle} 
        alt="" 
        className="hidden md:block absolute top-12 md:top-16 left-[18%] md:left-[20%] w-5 md:w-6 lg:w-8 h-auto z-10"
      />
      
      {/* Yellow Sparkle - Bottom left area */}
      <img 
        src={yellowSparkle} 
        alt="" 
        className="hidden md:block absolute bottom-16 md:bottom-20 left-[12%] md:left-[14%] w-4 md:w-5 lg:w-6 h-auto z-10"
      />

      {/* Shekel - Top Center */}
      <img 
        src={shekel} 
        alt="" 
        className="hidden md:block absolute top-0 md:top-2 left-1/2 -translate-x-1/2 w-10 md:w-14 lg:w-16 h-auto z-10"
      />
      
      {/* Dollar - Upper area */}
      <img 
        src={dollar} 
        alt="" 
        className="hidden md:block absolute top-10 md:top-14 left-[30%] md:left-[32%] w-8 md:w-12 lg:w-14 h-auto z-10 rotate-6"
      />
      
      {/* Yen - Bottom Right */}
      <img 
        src={yen} 
        alt="" 
        className="hidden md:block absolute bottom-8 md:bottom-12 right-[3%] md:right-[4%] w-10 md:w-14 lg:w-16 h-auto z-10 -rotate-12"
      />

      {/* CSS Sparkles for variety */}
      <div className="hidden md:block absolute top-20 md:top-24 left-[36%] md:left-[38%] z-10">
        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#4880FF">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="hidden md:block absolute top-14 md:top-18 right-[2%] md:right-[3%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#22c55e">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>
      <div className="hidden md:block absolute bottom-20 md:bottom-24 right-[16%] md:right-[18%] z-10">
        <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="#4880FF">
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
        </svg>
      </div>

      {/* ===== MAIN CONTENT - CENTERED ===== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
        {/* Cart Mascot */}
        <img 
          src={cartMascot} 
          alt="עגלת קניות" 
          className="w-28 h-auto md:w-40 lg:w-48 mb-2 md:mb-4"
        />
        
        {/* Title PNG */}
        <img 
          src={titleImage} 
          alt="סיכום הזמנה שלכם!" 
          className="h-8 md:h-12 lg:h-14 w-auto"
        />
      </div>
    </div>
  );
};
