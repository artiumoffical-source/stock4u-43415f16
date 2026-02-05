import React from 'react';

// Full Dataset with Crypto & Finance
const logos = [
  { name: "Bitcoin", src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
  { name: "Ethereum", src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" },
  { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
  { name: "Nvidia", src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
  { name: "Tesla", src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "Meta", src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Netflix", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
];

interface LogoMarqueeProps {
  showTitle?: boolean;
  className?: string;
}

export default function LogoMarquee({ showTitle = true, className = "" }: LogoMarqueeProps) {
  return (
    <div className={`py-6 md:py-8 bg-blue-50/50 overflow-hidden ${className}`}>
      {/* Header */}
      {showTitle && (
        <h3 className="text-lg md:text-xl text-[#486284] text-center mb-5 font-medium">
          חברות פופולאריות להשקעה
        </h3>
      )}

      {/* Marquee Container */}
      <div className="w-full overflow-hidden relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
        
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-blue-50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track - Two sets for seamless loop */}
        <div className="logo-scroll-track">
          {/* Set 1 */}
          <div className="logo-scroll-content">
            {logos.map((logo, index) => (
              <img
                key={`set1-${index}`}
                src={logo.src}
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 mx-6 md:mx-8 flex-shrink-0"
              />
            ))}
          </div>

          {/* Set 2 (Duplicate for Seamless Loop) */}
          <div className="logo-scroll-content">
            {logos.map((logo, index) => (
              <img
                key={`set2-${index}`}
                src={logo.src}
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 mx-6 md:mx-8 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .logo-scroll-track {
          display: flex;
          width: fit-content;
          animation: scroll 20s linear infinite;
        }
        
        .logo-scroll-track:hover {
          animation-play-state: paused;
        }
        
        .logo-scroll-content {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
