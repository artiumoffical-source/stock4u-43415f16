import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Layout from "../components/Layout";
import MobileHowItWorks from "../components/mobile/MobileHowItWorks";
import MobileStats from "../components/mobile/MobileStats";
import MobileFooter from "../components/mobile/MobileFooter";
import heroCharacters from "@/assets/hero-characters.png";

export default function Index() {
  return (
    <Layout>
      {/* ========== MOBILE VERSION ========== */}
      <div className="block md:hidden overflow-x-hidden">
        {/* Mobile Hero Section */}
        <section 
          className="px-4 py-6 relative overflow-hidden"
          style={{ backgroundColor: '#E0E7F5' }}
        >
          {/* Main Title - Scaled for mobile */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-5 hebrew-font leading-tight">
            מתנות ששוות כסף!
          </h1>

          {/* Video Placeholder - Full width with padding */}
          <div className="w-full aspect-video bg-gray-900 rounded-2xl mb-5 flex items-center justify-center shadow-xl">
            <button
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank",
                )
              }
              className="w-14 h-14 bg-[hsl(var(--stock4u-happy-blue))] rounded-full flex items-center justify-center shadow-lg border-4 border-white active:scale-95 transition-transform"
            >
              <svg
                className="w-5 h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* CTA Banner */}
          <Link
            to="/stock-selection?continue=true"
            className="block w-full bg-[hsl(var(--stock4u-green))] text-white text-center py-4 rounded-2xl font-bold text-base shadow-md active:scale-[0.98] transition-transform"
          >
            חבילת מניות מקצועית &gt;
          </Link>
        </section>

        {/* Mobile Gift Packages - Stacked Vertically */}
        <section className="py-6 px-4 bg-white">
          <h2 className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-5 hebrew-font">
            חבילות מתנה פופולאריות
          </h2>
          <Link to="/stock-selection?continue=true" className="block">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fdd35d8126d3046409354f589f2bbc58e?format=webp&width=800&quality=85"
              alt="Gift Package Cards"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </Link>
        </section>

        {/* Mobile How It Works */}
        <MobileHowItWorks />

        {/* Mobile Stats */}
        <MobileStats />

        {/* Mobile CTA */}
        <section className="text-center py-8 px-4 bg-white">
          <h2 className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-4 hebrew-font">
            אוקיי אני רוצה לשלוח מתנה, מה עכשיו?
          </h2>
          <Link
            to="/stock-selection?continue=true"
            className="inline-block bg-[hsl(var(--stock4u-happy-blue))] text-white px-6 py-4 rounded-full font-bold text-base shadow-lg active:scale-95 transition-transform"
          >
            מתחילים בבחירת מתנה &gt;
          </Link>
        </section>

        {/* Mobile Ticker */}
        <section className="py-4 overflow-hidden bg-[hsl(var(--stock4u-light-blue))]/30">
          <p className="text-center text-[hsl(var(--stock4u-dark-grey))] mb-3 text-sm px-4">
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
