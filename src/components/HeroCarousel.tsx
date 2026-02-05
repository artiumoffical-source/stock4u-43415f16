import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import heroCharacters from "@/assets/hero-characters.png";
import HowItWorksSteps from "@/components/HowItWorksSteps";

export const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: "rtl" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "#E0E7F5" }}
    >
      {/* Zigzag Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='30' viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 15 L15 0 L30 15 L45 0 L60 15 L45 30 L30 15 L15 30 Z' fill='none' stroke='%234880FF' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 30px",
        }}
      />

      {/* Carousel Container */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {/* SLIDE 1: Money Making Gifts (Current Hero) */}
          <div className="flex-[0_0_100%] min-w-0">
            <div className="relative w-full pt-8 pb-12 md:pb-16">
              <img
                src={heroCharacters}
                alt="Stock4U Characters - מתנות שעושות כסף!"
                className="w-full h-auto object-contain max-h-[300px] md:max-h-[400px]"
              />
            </div>
          </div>

          {/* SLIDE 2: All Stocks in One Place */}
          <div className="flex-[0_0_100%] min-w-0">
            <div className="relative w-full min-h-[300px] md:min-h-[400px] flex items-center justify-center px-4 py-8">
              {/* Floating Currency Decorations */}
              <div className="absolute top-6 left-8 text-4xl md:text-5xl font-bold text-[#22A652]/30 rotate-12">₪</div>
              <div className="absolute top-12 right-12 text-3xl md:text-4xl font-bold text-[#4880FF]/30 -rotate-6">€</div>
              <div className="absolute bottom-20 left-16 text-3xl md:text-4xl font-bold text-[#22A652]/30 rotate-6">$</div>
              <div className="absolute bottom-16 right-8 text-2xl md:text-3xl font-bold text-[#4880FF]/30 -rotate-12">¥</div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 max-w-5xl mx-auto">
                {/* Left Side - Graph and Money Bag */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center order-2 md:order-1">
                  {/* Money Bag Character */}
                  <div className="relative">
                    {/* Green Money Bag */}
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-[#22A652] rounded-full relative flex items-center justify-center"
                      style={{
                        filter: "drop-shadow(4px 4px 0 white)",
                        border: "3px solid white"
                      }}
                    >
                      {/* Dollar Sign */}
                      <span className="text-white text-4xl md:text-5xl font-bold">$</span>
                      {/* Eyes */}
                      <div className="absolute top-6 md:top-8 left-6 md:left-8 w-3 h-4 md:w-4 md:h-5 bg-white rounded-full">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                      <div className="absolute top-6 md:top-8 right-6 md:right-8 w-3 h-4 md:w-4 md:h-5 bg-white rounded-full">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full absolute bottom-1 left-1/2 -translate-x-1/2" />
                      </div>
                      {/* Hands */}
                      <div className="absolute -left-4 top-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#22A652] rounded-full border-2 border-white" />
                      <div className="absolute -right-4 top-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#22A652] rounded-full border-2 border-white" />
                    </div>
                    {/* Rising Arrow */}
                    <svg
                      className="absolute -top-8 -right-8 md:-top-10 md:-right-10 w-16 h-16 md:w-24 md:h-24"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <path
                        d="M10 80 L50 40 L90 10"
                        stroke="#4880FF"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ filter: "drop-shadow(2px 2px 0 white)" }}
                      />
                      <polygon
                        points="75,5 95,15 85,35"
                        fill="#4880FF"
                        style={{ filter: "drop-shadow(2px 2px 0 white)" }}
                      />
                    </svg>
                  </div>
                  {/* Floating Bills */}
                  <div className="absolute -top-4 left-0 w-12 h-8 md:w-16 md:h-10 bg-[#22A652] rounded-md border-2 border-white rotate-12 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <div className="absolute bottom-4 -right-4 w-10 h-6 md:w-14 md:h-8 bg-[#22A652] rounded-md border-2 border-white -rotate-6 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                </div>

                {/* Right Side - Text */}
                <div className="order-1 md:order-2 text-center md:text-right">
                  <div
                    className="inline-block bg-white px-6 py-4 md:px-8 md:py-6 rounded-2xl"
                    style={{
                      boxShadow: "4px 4px 0 rgba(0,0,0,0.1)",
                      border: "3px solid white",
                    }}
                  >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#486284] leading-tight hebrew-font">
                      כל המניות שתוכלו
                      <br />
                      לרצות במקום אחד!
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 3: It's So Simple (3 Steps) */}
          <div className="flex-[0_0_100%] min-w-0">
            <HowItWorksSteps />
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              selectedIndex === index
                ? "bg-[#4880FF] w-6"
                : "bg-[#486284]/30 hover:bg-[#486284]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
