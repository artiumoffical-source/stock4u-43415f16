import React from 'react';

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

const CompanyTicker = () => {
  return (
    <div className="py-10 md:py-14 bg-[#F9FAFC] overflow-hidden">
      {/* Header */}
      <h3 className="text-lg md:text-xl text-[#486284] text-center mb-8 md:mb-10 font-medium">
        חברות פופולאריות להשקעה
      </h3>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#F9FAFC] to-transparent z-10 pointer-events-none" />
        
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#F9FAFC] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Wrapper */}
        <div className="flex items-center animate-marquee">
          {/* First Set */}
          {companyLogos.map((company, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
          
          {/* Second Set (Duplicate for seamless loop) */}
          {companyLogos.map((company, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}

          {/* Third Set (Extra for wider screens) */}
          {companyLogos.map((company, index) => (
            <div
              key={`logo-3-${index}`}
              className="flex-shrink-0 mx-6 md:mx-10"
            >
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-8 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CompanyTicker;
