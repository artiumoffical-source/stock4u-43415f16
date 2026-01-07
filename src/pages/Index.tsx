import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Layout from "../components/Layout";
import MobileHowItWorks from "../components/mobile/MobileHowItWorks";
import MobileStats from "../components/mobile/MobileStats";
import MobileFooter from "../components/mobile/MobileFooter";
import MobilePackagesCarousel from "../components/mobile/MobilePackagesCarousel";
import heroCharacters from "@/assets/hero-characters.png";

export default function Index() {
  return (
    <Layout>
      {/* ========== MOBILE VERSION ========== */}
      <div className="block md:hidden overflow-x-hidden">
        {/* Mobile Hero Section - Tight Clustered Layout */}
        <section 
          className="relative w-full h-[560px] overflow-hidden"
          style={{ backgroundColor: '#E0E7F5' }}
        >
          {/* Zigzag Background Pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
              <path d="M-50 200 L50 150 L150 230 L250 130 L350 250 L450 160" stroke="#4880FF" strokeWidth="12" fill="none" opacity="0.12" />
              <path d="M-50 350 L50 300 L150 380 L250 280 L350 400 L450 310" stroke="#4880FF" strokeWidth="12" fill="none" opacity="0.08" />
              <path d="M-50 500 L50 450 L150 530 L250 430 L350 550 L450 460" stroke="#4880FF" strokeWidth="12" fill="none" opacity="0.05" />
            </svg>
          </div>

          {/* Hero Characters - SCALED UP and CENTERED */}
          <div className="absolute inset-x-0 top-0 h-[340px] flex items-center justify-center">
            <img
              src={heroCharacters}
              alt="Stock4U Characters - מתנות שעושות כסף!"
              className="w-[130%] max-w-none h-auto object-contain transform-gpu"
            />
          </div>

          {/* Decorative Stars - Scattered around */}
          <div className="absolute top-4 left-[8%] w-6 h-6 z-30">
            <svg viewBox="0 0 24 24" fill="#FF6B4A"><polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" /></svg>
          </div>
          <div className="absolute top-8 right-[15%] w-4 h-4 z-30">
            <svg viewBox="0 0 24 24" fill="#4880FF"><polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" /></svg>
          </div>
          <div className="absolute top-24 left-[3%] w-5 h-5 z-30">
            <svg viewBox="0 0 24 24" fill="#FFC845"><polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" /></svg>
          </div>
          <div className="absolute top-16 right-[5%] w-5 h-5 z-30">
            <svg viewBox="0 0 24 24" fill="#00C9A7"><polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" /></svg>
          </div>
          <div className="absolute top-36 left-[6%] w-4 h-4 z-30">
            <svg viewBox="0 0 24 24" fill="#FF6B4A"><polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" /></svg>
          </div>
          <div className="absolute top-32 right-[8%] w-3 h-3 z-30">
            <svg viewBox="0 0 24 24" fill="#FFC845"><polygon points="12,2 15,9 22,9 17,14 19,22 12,17 5,22 7,14 2,9 9,9" /></svg>
          </div>

          {/* Pagination Dots - Positioned in the middle */}
          <div className="absolute top-[340px] left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4880FF]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#4880FF]/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#4880FF]/30"></div>
          </div>

          {/* Video Player - Anchored near bottom */}
          <div className="absolute top-[365px] left-1/2 -translate-x-1/2 w-[90%] z-20">
            <div className="w-full aspect-video bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl">
              <button
                onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
                className="w-16 h-16 bg-[#4880FF] rounded-full flex items-center justify-center shadow-lg border-4 border-white active:scale-95 transition-transform"
              >
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* CTA Banner - At the very bottom */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <Link
              to="/stock-selection?continue=true"
              className="block w-full bg-[#00C9A7] text-white text-center py-4 rounded-2xl font-bold text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              חבילת מניות מקצועית &gt;
            </Link>
          </div>
        </section>

        {/* Mobile Packages Carousel with Swipe & Dots */}
        <MobilePackagesCarousel />

        {/* Mobile How It Works */}
        <MobileHowItWorks />

        {/* Mobile Stats */}
        <MobileStats />

        {/* Mobile Ticker */}
        <section className="py-4 overflow-hidden bg-[hsl(var(--stock4u-light-blue))]/30">
          <p className="text-center text-[hsl(var(--stock4u-grey))] mb-3 text-sm px-4">
            חברות פופולאריות להשקעה
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-6 opacity-40 animate-marquee">
              <div className="flex items-center gap-6 shrink-0">
                {["GOOG", "AMZN", "AAPL", "NVDA", "MSFT", "META", "TSLA"].map((ticker) => (
                  <span key={ticker} className="text-lg font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
                    {ticker}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 shrink-0">
                {["GOOG", "AMZN", "AAPL", "NVDA", "MSFT", "META", "TSLA"].map((ticker) => (
                  <span key={`${ticker}-2`} className="text-lg font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
                    {ticker}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <MobileFooter />
      </div>

      {/* ========== DESKTOP VERSION ========== */}
      <div className="hidden md:block">
        {/* Hero Section with floating characters */}
        <section 
          className="relative overflow-visible flex flex-col"
          style={{ backgroundColor: '#E0E7F5' }}
        >
          {/* Hero Background with Characters - fully visible */}
          <div className="relative w-full z-10 pt-8">
            <img
              src={heroCharacters}
              alt="Stock4U Characters with Main Title - מתנות שעושות כסף!"
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Video Container - sits BELOW title, overlaps white section */}
          <div 
            className="relative z-20 mx-auto w-full max-w-5xl px-4 mt-12 -mb-32"
            style={{ background: 'transparent' }}
          >
            <div className="w-full aspect-video bg-gray-900 rounded-3xl shadow-2xl flex items-center justify-center">
              <button
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    "_blank",
                  )
                }
                className="w-24 h-24 bg-[hsl(var(--stock4u-happy-blue))] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform border-4 border-white"
              >
                <svg
                  className="w-10 h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* White section that video overlaps onto */}
        <div className="pt-40 bg-white"></div>

        {/* Gift Packages Carousel */}
        <section className="w-full py-6 mb-6">
          <div className="max-w-[1639px] mx-auto relative">
            <div className="flex justify-center items-center">
              <Link to="/stock-selection?continue=true" className="block w-full">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fdd35d8126d3046409354f589f2bbc58e?format=webp&width=1600&quality=90"
                  alt="Gift Package Cards"
                  className="w-full max-w-[1472px] h-auto object-contain hover:opacity-90 transition-opacity cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="h-[566px] relative overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d2a8fbb0bc7d24e0fc8879295b276f6758c8be62?width=3840"
            alt="How It Works - זה כללו פשוט!"
            className="w-full h-full object-cover object-center"
          />
        </section>

        {/* Statistics Section */}
        <section className="max-w-6xl mx-auto py-12">
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-4 english-font">
                24+
              </div>
              <p className="text-[hsl(var(--stock4u-grey))] text-xl">מדינות שבהם אנו עובדים</p>
            </div>
            <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-4 english-font">
                17M
              </div>
              <p className="text-[hsl(var(--stock4u-grey))] text-xl">אנשים שהאמינו בנו</p>
            </div>
            <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-4 english-font">
                +95%
              </div>
              <p className="text-[hsl(var(--stock4u-grey))] text-xl">לקוחות מרוצים</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-8 hebrew-font px-4">
            אוקיי אני רוצה לשלוח מתנה, מה עכשיו?
          </h2>
          <Link
            to="/stock-selection?continue=true"
            className="inline-block bg-[hsl(var(--stock4u-happy-blue))] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
          >
            מתחילים בבחירת מתנה &gt;
          </Link>
        </section>

        {/* Company Logos Ticker */}
        <section className="py-6 overflow-hidden">
          <p className="text-center text-[hsl(var(--stock4u-dark-grey))] mb-6 text-lg">
            חברות פופולאריות להשקעה
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-12 opacity-30 animate-marquee">
              <div className="flex items-center gap-12 shrink-0">
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">GOOG</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AMZN</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NASDAQ</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAPL</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAN</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NVDA</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">MSFT</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">META</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">SONY</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">CRM</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">ORCL</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">JNJ</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">TSLA</span>
              </div>
              <div className="flex items-center gap-12 shrink-0">
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">GOOG</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AMZN</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NASDAQ</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAPL</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">AAN</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">NVDA</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">MSFT</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">META</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">SONY</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">CRM</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">ORCL</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">JNJ</span>
                <span className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">TSLA</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
}
