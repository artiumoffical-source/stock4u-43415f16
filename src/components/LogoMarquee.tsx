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
];

interface LogoMarqueeProps {
  showTitle?: boolean;
  className?: string;
}

export default function LogoMarquee({ showTitle = true, className = "" }: LogoMarqueeProps) {
  return (
    <div className={`py-8 md:py-12 bg-[#F9FAFC] overflow-hidden ${className}`}>
      {/* Header */}
      {showTitle && (
        <h3 className="text-lg md:text-xl text-[#486284] text-center mb-6 md:mb-8 font-medium">
          חברות פופולאריות להשקעה
        </h3>
      )}

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#F9FAFC] to-transparent z-10 pointer-events-none" />
        
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#F9FAFC] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex logo-marquee-track">
          {/* First Set */}
          <div className="flex items-center gap-10 md:gap-16 shrink-0 px-5 md:px-8">
            {companyLogos.map((company, index) => (
              <img
                key={`logo-1-${index}`}
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-11 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
          
          {/* Second Set (Duplicate for seamless loop) */}
          <div className="flex items-center gap-10 md:gap-16 shrink-0 px-5 md:px-8">
            {companyLogos.map((company, index) => (
              <img
                key={`logo-2-${index}`}
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-11 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .logo-marquee-track {
          animation: logo-scroll 22s linear infinite;
        }
        
        .logo-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
