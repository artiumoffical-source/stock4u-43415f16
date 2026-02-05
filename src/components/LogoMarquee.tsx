const companyLogos = [
  {
    name: "Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  },
  {
    name: "Nvidia",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  },
  {
    name: "Tesla",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
  {
    name: "Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "Netflix",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Bitcoin",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
  },
  {
    name: "Ethereum",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
  },
];

interface LogoMarqueeProps {
  showTitle?: boolean;
  className?: string;
}

export default function LogoMarquee({ showTitle = true, className = "" }: LogoMarqueeProps) {
  // Quadruple the logos to ensure seamless loop on all screen sizes
  const allLogos = [...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos];

  return (
    <div className={`py-8 md:py-10 bg-blue-50/50 overflow-hidden ${className}`}>
      {/* Header */}
      {showTitle && (
        <h3 className="text-lg md:text-xl text-[#486284] text-center mb-6 font-medium">
          חברות פופולאריות להשקעה
        </h3>
      )}

      {/* Marquee Container */}
      <div className="w-full overflow-hidden relative">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-blue-50/80 to-transparent z-10 pointer-events-none" />
        
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-blue-50/80 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track - w-max allows infinite stretch */}
        <div className="flex w-max animate-[marquee-scroll_15s_linear_infinite] hover:[animation-play-state:paused]">
          {allLogos.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-6 md:mx-10 shrink-0"
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </div>
  );
}
