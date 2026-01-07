import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

// Package card data
const packages = [
  {
    id: "israeli",
    color: "from-orange-400 to-orange-500",
    borderColor: "border-orange-400",
    title: "חבילה ישראלית",
    subtitle: "מניות של חברות ישראליות מובילות",
    price: "₪199",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F8a8c6b7e1d3f4a5b9c2e1f3d4a5b6c7d"
  },
  {
    id: "brave",
    color: "from-yellow-400 to-yellow-500",
    borderColor: "border-yellow-400",
    title: "חבילת האמיצים",
    subtitle: "מניות טכנולוגיה עם פוטנציאל גבוה",
    price: "₪299",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F9b9d7c8e2e4f5a6c0d3e2f4e5b6c7d8e"
  },
  {
    id: "gift",
    color: "from-green-400 to-green-500",
    borderColor: "border-green-400",
    title: "חבילת מתנה",
    subtitle: "המתנה המושלמת לכל אירוע",
    price: "₪149",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F0c0e8d9f3f5g6b7d1e4f3g5f6c7d8e9f"
  },
];

export default function MobilePackagesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, packages.length - 1));
    }
  };

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", handleScroll);
      return () => ref.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="py-6 bg-white">
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {packages.map((pkg, index) => (
          <Link
            key={pkg.id}
            to={`/stock-selection?package=${pkg.id}&continue=true`}
            className="flex-shrink-0 w-full snap-center px-4"
          >
            <div
              className={`relative bg-gradient-to-br ${pkg.color} rounded-3xl p-6 min-h-[200px] shadow-lg flex flex-col items-center justify-center text-center`}
            >
              {/* Package Content */}
              <h3 className="text-2xl font-bold text-white mb-2 hebrew-font">
                {pkg.title}
              </h3>
              <p className="text-white/90 text-sm mb-4 hebrew-font">
                {pkg.subtitle}
              </p>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-bold text-lg">
                  החל מ-{pkg.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {packages.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-[hsl(var(--stock4u-happy-blue))] w-6"
                : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
