import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import package card images
import packagePro from '@/assets/packages/package-pro.png';
import packageIsrael from '@/assets/packages/package-israel.png';
import packageRich from '@/assets/packages/package-rich.png';
import packageCustom from '@/assets/packages/package-custom.png';

// Package card data with full card images
const packages = [
  { 
    id: 'pro', 
    img: packagePro,
    alt: 'חבילת מניות מקצועית'
  },
  { 
    id: 'israel', 
    img: packageIsrael,
    alt: 'חבילת מניות ישראלית'
  },
  { 
    id: 'brave', 
    img: packageRich,
    alt: 'חבילת מניות עשירה'
  },
  { 
    id: 'custom', 
    img: packageCustom,
    alt: 'בנה את המתנה שלך'
  },
];

export default function PackagesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const handleSelect = (pkgId: string) => {
    if (pkgId === 'custom') {
      navigate('/stock-selection?continue=true');
    } else {
      navigate(`/stock-selection?filter=${pkgId}`);
    }
  };

  return (
    <section className="relative bg-[#E0E7F5] py-8">
      <div className="max-w-7xl mx-auto px-4 relative">
        
        {/* Navigation Arrows - Ghost Style */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full text-[hsl(var(--stock4u-dark-grey))] transition-all duration-300 opacity-40 hover:opacity-100 hover:bg-white/40 hover:backdrop-blur-sm hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full text-[hsl(var(--stock4u-dark-grey))] transition-all duration-300 opacity-40 hover:opacity-100 hover:bg-white/40 hover:backdrop-blur-sm hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* The Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 px-2 snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {packages.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => handleSelect(pkg.id)}
              className="relative shrink-0 cursor-pointer transition-transform hover:scale-105 hover:rotate-1 snap-center group"
            >
              <img 
                src={pkg.img} 
                alt={pkg.alt}
                className="h-40 md:h-48 w-auto rounded-[1.5rem] shadow-xl shadow-gray-300/50"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
