import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Index() {
  return (
    <div className="min-h-screen bg-white hebrew-font" dir="rtl">
      <Header />

      {/* Hero Section - Responsive height */}
      <section className="relative h-[250px] md:h-[566px] bg-[hsl(var(--stock4u-light-blue))] overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c861279ab775a02162db7807d6d5056d3eb1252d?width=3840"
          alt="Stock4U Characters with Main Title"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Video and Blue Background Section - Mobile Responsive */}
      <div className="relative -mt-[100px] md:-mt-[200px] z-30">
        {/* Blue Extension Background - Responsive height */}
        <div className="w-full h-[150px] md:h-[395px] bg-[hsl(var(--stock4u-light-blue))] relative mt-[75px] md:mt-[200px]">

          {/* Video Section - Responsive size and position */}
          <div className="absolute -top-[10px] md:-top-[30px] left-1/2 transform -translate-x-1/2 w-full px-4 md:px-0">
            <div className="w-full max-w-[85vw] md:w-[1342px] h-[150px] md:h-[684px] bg-black rounded-[10px] md:rounded-[25px] border-[4px] md:border-[19px] border-[hsl(var(--stock4u-light-blue))] relative overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.3)] md:shadow-[0_20px_40px_rgba(0,0,0,0.3)] mx-auto">
              <div className="w-full h-full flex items-center justify-center">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      "_blank",
                    )
                  }
                  className="w-[60px] h-[60px] md:w-[178px] md:h-[178px] bg-[hsl(var(--stock4u-happy-blue))] rounded-full flex items-center justify-center shadow-[3px_3px_0_rgba(0,0,0,0.1)] md:shadow-[10px_10px_0_rgba(0,0,0,0.1)] hover:scale-105 transition-transform border-[4px] md:border-[15px] border-white mobile-button"
                >
                  <svg
                    className="w-6 h-6 md:w-16 md:h-16 text-white ml-1 md:ml-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Space below blue background - Responsive */}
        <div className="h-[100px] md:h-[351px] bg-white"></div>
      </div>

      {/* Gift Packages Carousel - Mobile Responsive */}
      <section className="w-full py-4 md:py-6 mb-4 md:mb-6 mobile-container">
        <div className="max-w-[1639px] mx-auto relative px-2 md:px-0">
          {/* Carousel Container with Real Figma Image */}
          <div className="flex justify-center items-center">
            <Link to="/stock-selection?continue=true" className="block w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fdd35d8126d3046409354f589f2bbc58e?format=webp&width=1600&quality=90"
                alt="Gift Package Cards"
                className="w-full max-w-full md:max-w-[1472px] h-auto object-contain hover:opacity-90 transition-opacity cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Mobile Responsive */}
      <section className="h-[200px] md:h-[566px] relative overflow-hidden">
        {/* Use the exact Figma design as background image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d2a8fbb0bc7d24e0fc8879295b276f6758c8be62?width=3840"
          alt="How It Works - זה כללו פשוט!"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Statistics Section - Mobile Responsive */}
      <section className="max-w-6xl mx-auto mobile-container py-4 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-xl md:rounded-3xl p-4 md:p-8 text-center">
            <div className="text-2xl md:text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-1 md:mb-4 english-font">
              24+
            </div>
            <p className="text-[hsl(var(--stock4u-grey))] text-sm md:text-xl">מדינות שבהם אנו עובדים</p>
          </div>
          <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-xl md:rounded-3xl p-4 md:p-8 text-center">
            <div className="text-2xl md:text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-1 md:mb-4 english-font">
              17M
            </div>
            <p className="text-[hsl(var(--stock4u-grey))] text-sm md:text-xl">אנשים שהאמינו בנו</p>
          </div>
          <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-xl md:rounded-3xl p-4 md:p-8 text-center">
            <div className="text-2xl md:text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-1 md:mb-4 english-font">
              +95%
            </div>
            <p className="text-[hsl(var(--stock4u-grey))] text-sm md:text-xl">לקוחות מרוצים</p>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
      <section className="text-center py-4 md:py-12 mobile-container">
        <h2 className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-4 md:mb-8 hebrew-font px-4">
          אוקיי אני רוצה לשלוח מתנה, מה עכשיו?
        </h2>
        <Link
          to="/stock-selection?continue=true"
          className="inline-block bg-[hsl(var(--stock4u-happy-blue))] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg mobile-button"
        >
          מתחילים בבחירת מתנה &gt;
        </Link>
      </section>

      {/* Company Logos Ticker - Mobile Responsive */}
      <section className="py-3 md:py-6 overflow-hidden">
        <p className="text-center text-[hsl(var(--stock4u-dark-grey))] mb-3 md:mb-6 text-sm md:text-lg">
          חברות פופולאריות להשקעה
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-4 md:gap-12 opacity-30 animate-marquee">
            <div className="flex items-center gap-4 md:gap-12 shrink-0">
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">GOOG</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AMZN</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NASDAQ</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAPL</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAN</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NVDA</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">MSFT</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">META</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">SONY</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">CRM</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">ORCL</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">JNJ</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">TSLA</span>
            </div>
            {/* Duplicate for seamless scroll */}
            <div className="flex items-center gap-4 md:gap-12 shrink-0">
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">GOOG</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AMZN</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NASDAQ</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAPL</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAN</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NVDA</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">MSFT</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">META</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">SONY</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">CRM</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">ORCL</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">JNJ</span>
              <span className="text-lg md:text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">TSLA</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}