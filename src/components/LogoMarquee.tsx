import React from 'react';

const logos = [
  // US & Global
  { name: "Apple", src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "בנק לאומי", src: "/images/logos/leumi.png" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" },
  { name: "Nvidia", src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
  { name: "טבע", src: "/images/logos/teva.png" },
  { name: "Tesla", src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
  { name: "נייס", src: "/images/logos/nice.png" },
  { name: "Meta", src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "אלביט", src: "/images/logos/elbit.png" },
  { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Bitcoin", src: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" },
  { name: "בנק הפועלים", src: "/images/logos/hapoalim.png" },
  { name: "Netflix", src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "ICL", src: "/images/logos/icl.png" },
  { name: "Ethereum", src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg" },
  { name: "עזריאלי", src: "/images/logos/azrieli.png" },
  { name: "Visa", src: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" },
  { name: "דלק", src: "/images/logos/delek.png" },
  { name: "PayPal", src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "שופרסל", src: "/images/logos/shufersal.png" },
  { name: "בזק", src: "/images/logos/bezeq.png" },
];

interface LogoMarqueeProps {
  showTitle?: boolean;
  className?: string;
}

export default function LogoMarquee({ showTitle = true, className = "" }: LogoMarqueeProps) {
  return (
    <div className={`py-6 md:py-8 overflow-hidden ${className}`}>
      {showTitle && (
        <h3 className="text-lg md:text-xl text-[#486284] text-center mb-5 font-medium">
          חברות פופולאריות להשקעה
        </h3>
      )}

      {/* Force LTR to prevent RTL animation bugs */}
      <div className="relative w-full overflow-hidden" dir="ltr">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#E0E7F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#E0E7F5] to-transparent z-10 pointer-events-none" />

        {/* Double track container */}
        <div className="marquee-container flex">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-12 md:gap-16 pr-12 md:pr-16 animate-infinite-scroll">
            {logos.map((logo, i) => (
              <img
                key={`a-${i}`}
                src={logo.src}
                alt={logo.name}
                className="h-8 md:h-10 w-auto max-w-[100px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 shrink-0"
              />
            ))}
          </div>
          {/* Track 2 (clone) */}
          <div className="flex shrink-0 items-center gap-12 md:gap-16 pr-12 md:pr-16 animate-infinite-scroll" aria-hidden="true">
            {logos.map((logo, i) => (
              <img
                key={`b-${i}`}
                src={logo.src}
                alt={logo.name}
                className="h-8 md:h-10 w-auto max-w-[100px] object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 35s linear infinite;
        }
        .marquee-container:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
