import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Layout from "../components/Layout";
import MobileHowItWorks from "../components/mobile/MobileHowItWorks";
import MobileStats from "../components/mobile/MobileStats";
import MobileFooter from "../components/mobile/MobileFooter";

export default function Index() {
  return (
    <Layout>
      {/* ========== MOBILE VERSION ========== */}
      <div className="block md:hidden">
        {/* Mobile Hero Section */}
        <section className="bg-[hsl(var(--stock4u-light-blue))] px-4 py-8">
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-6 hebrew-font leading-tight">
            מתנות ששוות כסף!
          </h1>

          {/* Video Placeholder */}
          <div className="w-full aspect-video bg-black rounded-2xl mb-6 flex items-center justify-center shadow-lg">
            <button
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank",
                )
              }
              className="w-16 h-16 bg-[hsl(var(--stock4u-happy-blue))] rounded-full flex items-center justify-center shadow-lg border-4 border-white"
            >
              <svg
                className="w-6 h-6 text-white ml-1"
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
            className="block w-full bg-[hsl(var(--stock4u-green))] text-white text-center py-4 rounded-2xl font-bold text-lg shadow-md"
          >
            חבילת מניות מקצועית &gt;
          </Link>
        </section>

        {/* Mobile Gift Packages */}
        <section className="py-6 px-4">
          <Link to="/stock-selection?continue=true" className="block">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fdd35d8126d3046409354f589f2bbc58e?format=webp&width=800&quality=85"
              alt="Gift Package Cards"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </Link>
        </section>

        {/* Mobile How It Works */}
        <MobileHowItWorks />

        {/* Mobile Stats */}
        <MobileStats />

        {/* Mobile CTA */}
        <section className="text-center py-8 px-4">
          <h2 className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-4 hebrew-font">
            אוקיי אני רוצה לשלוח מתנה, מה עכשיו?
          </h2>
          <Link
            to="/stock-selection?continue=true"
            className="inline-block bg-[hsl(var(--stock4u-happy-blue))] text-white px-6 py-3 rounded-full font-bold text-base shadow-lg"
          >
            מתחילים בבחירת מתנה &gt;
          </Link>
        </section>

        {/* Mobile Ticker */}
        <section className="py-4 overflow-hidden">
          <p className="text-center text-[hsl(var(--stock4u-dark-grey))] mb-4 text-sm">
            חברות פופולאריות להשקעה
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-6 opacity-30 animate-marquee">
              <div className="flex items-center gap-6 shrink-0">
                {["GOOG", "AMZN", "AAPL", "NVDA", "MSFT", "META", "TSLA"].map((ticker) => (
                  <span key={ticker} className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
                    {ticker}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 shrink-0">
                {["GOOG", "AMZN", "AAPL", "NVDA", "MSFT", "META", "TSLA"].map((ticker) => (
                  <span key={`${ticker}-2`} className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
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
        {/* Hero Section with Video Overlap */}
        <section className="relative bg-[#E6F0FF] pb-0 overflow-visible">
          {/* Hero Background Image */}
          <div className="relative h-[500px] overflow-visible">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/c861279ab775a02162db7807d6d5056d3eb1252d?width=3840"
              alt="Stock4U Characters with Main Title"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Video Container - Overlaps onto white section below */}
          <div className="relative z-20 mx-auto max-w-4xl px-4 -mb-32">
            <div className="bg-black rounded-3xl shadow-2xl aspect-video flex items-center justify-center">
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
        <div className="pt-48 bg-white"></div>

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
