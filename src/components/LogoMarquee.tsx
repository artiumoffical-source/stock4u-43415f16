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
    name: "AMD",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
  },
  {
    name: "Intel",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
  },
  {
    name: "PayPal",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  },
  {
    name: "Visa",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  },
  {
    name: "Mastercard",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
  },
  {
    name: "Spotify",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
  },
  {
    name: "Uber",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
  },
  {
    name: "Airbnb",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
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

        {/* Scrolling Track */}
        <div className="marquee-track">
          {/* First Set */}
          <div className="marquee-content">
            {companyLogos.map((company, index) => (
              <img
                key={`set1-${index}`}
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 mx-5 md:mx-7 flex-shrink-0"
              />
            ))}
          </div>
          
          {/* Second Set (Duplicate for seamless loop) */}
          <div className="marquee-content">
            {companyLogos.map((company, index) => (
              <img
                key={`set2-${index}`}
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-200 mx-5 md:mx-7 flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: fit-content;
          animation: marquee 12s linear infinite;
        }
        
        .marquee-track:hover {
          animation-play-state: paused;
        }
        
        .marquee-content {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        @keyframes marquee {
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
