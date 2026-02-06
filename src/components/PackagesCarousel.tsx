import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Package card data - all cards use consistent gradient design
const packages = [
  { 
    id: 'pro', 
    title: 'חבילת מניות\nמקצועית', 
    bgClass: 'bg-gradient-to-br from-green-400 to-green-600',
    patternClass: 'bg-green-300',
    emoji: '💵'
  },
  { 
    id: 'israel', 
    title: 'מניות\nכחול לבן', 
    bgClass: 'bg-gradient-to-br from-blue-400 to-blue-600',
    patternClass: 'bg-blue-300',
    emoji: '🇮🇱'
  },
  { 
    id: 'brave', 
    title: 'לאמיצים\nבלבד', 
    bgClass: 'bg-gradient-to-br from-orange-400 to-red-500',
    patternClass: 'bg-orange-300',
    emoji: '🚀'
  },
  { 
    id: 'tech', 
    title: 'ענקיות\nהטכנולוגיה', 
    bgClass: 'bg-gradient-to-br from-purple-400 to-purple-600',
    patternClass: 'bg-purple-300',
    emoji: '🤖'
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
          <div 
            key={pkg.id}
            onClick={() => handleSelect(pkg.id)}
            className={`relative shrink-0 w-72 h-44 ${pkg.bgClass} rounded-[2rem] cursor-pointer transition-transform hover:scale-105 hover:rotate-1 shadow-xl shadow-gray-300/50 snap-center group overflow-hidden border-2 border-white/20`}
          >
            {/* Background Pattern (Subtle Circles) */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${pkg.patternClass} rounded-full blur-2xl opacity-50 -mr-10 -mt-10`} />
            <div className={`absolute bottom-0 left-0 w-24 h-24 ${pkg.patternClass} rounded-full blur-xl opacity-30 -ml-6 -mb-6`} />
            
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
        ))}
        </div>
      </div>
    </section>
  );
}
