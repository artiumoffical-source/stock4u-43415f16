import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Package card data - using the actual asset for "Professional" package
import packagePro from '@/assets/packages/package-pro.png';

const packages = [
  { 
    id: 'pro', 
    title: 'חבילת מניות\nמקצועית', 
    img: packagePro,
    isAsset: true // Use actual PNG asset
  },
  { 
    id: 'israel', 
    title: 'מניות\nכחול לבן', 
    color: 'bg-[#3B82F6]',
    pattern: 'bg-[#2563EB]',
    emoji: '🇮🇱',
    isAsset: false
  },
  { 
    id: 'brave', 
    title: 'לאמיצים\nבלבד', 
    color: 'bg-[#F97316]',
    pattern: 'bg-[#EA580C]',
    emoji: '🚀',
    isAsset: false
  },
  { 
    id: 'tech', 
    title: 'ענקיות\nהטכנולוגיה', 
    color: 'bg-[#8B5CF6]',
    pattern: 'bg-[#7C3AED]',
    emoji: '🤖',
    isAsset: false
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
    navigate(`/stock-selection?filter=${pkgId}`);
  };

  return (
    <section className="relative bg-[#E0E7F5] py-8">
      <div className="max-w-7xl mx-auto px-4 relative">
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg text-[hsl(var(--stock4u-happy-blue))] hover:scale-110 transition hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow-lg text-[hsl(var(--stock4u-happy-blue))] hover:scale-110 transition hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* The Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 px-2 snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {packages.map((pkg) => (
            pkg.isAsset ? (
              // Render as full image card
              <div 
                key={pkg.id}
                onClick={() => handleSelect(pkg.id)}
                className="relative shrink-0 cursor-pointer transition-transform hover:scale-105 hover:rotate-1 snap-center"
              >
                <img 
                  src={pkg.img} 
                  alt={pkg.title.replace('\n', ' ')}
                  className="h-44 w-auto rounded-3xl shadow-xl"
                />
              </div>
            ) : (
              // Render as CSS-styled card (fallback for missing assets)
              <div 
                key={pkg.id}
                onClick={() => handleSelect(pkg.id)}
                className={`relative shrink-0 w-72 h-44 ${pkg.color} rounded-3xl cursor-pointer transition-transform hover:scale-105 hover:rotate-1 shadow-xl snap-center group overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${pkg.pattern} rounded-full blur-2xl opacity-50 -mr-10 -mt-10`} />
                <div className={`absolute bottom-0 left-0 w-24 h-24 ${pkg.pattern} rounded-full blur-xl opacity-30 -ml-6 -mb-6`} />
                
                {/* Dollar pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="text-6xl text-white font-bold absolute top-2 right-4">$</div>
                  <div className="text-4xl text-white font-bold absolute top-12 right-16">$</div>
                  <div className="text-5xl text-white font-bold absolute bottom-8 right-8">$</div>
                  <div className="text-3xl text-white font-bold absolute top-6 left-12">$</div>
                  <div className="text-4xl text-white font-bold absolute bottom-4 left-4">$</div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                  <h3 className="text-2xl md:text-3xl font-black text-white text-center leading-tight whitespace-pre-line drop-shadow-md">
                    {pkg.title}
                  </h3>
                </div>

                {/* Emoji Character */}
                <div className="absolute bottom-2 left-2 text-5xl transition-transform group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-lg">
                  {pkg.emoji}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
