import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Index() {
  return (
    <div className="min-h-screen bg-white hebrew-font" dir="rtl">
      <Header />

      {/* Hero Section - Exact Figma Match: 566px height */}
      <section className="relative h-[566px] bg-stock4u-light-blue overflow-hidden">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/c861279ab775a02162db7807d6d5056d3eb1252d?width=3840"
          alt="Stock4U Characters with Main Title"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Video and Blue Background Section - positioned to overlap hero as in Figma */}
      <div className="relative -mt-[200px] z-30">
        {/* Blue Extension Background - 395px height, positioned to overlap hero */}
        <div className="w-full h-[395px] bg-stock4u-light-blue relative mt-[200px]">

          {/* Video Section - positioned to overlap both hero and blue background */}
          <div className="absolute -top-[30px] left-1/2 transform -translate-x-1/2">
            <div className="w-[1342px] h-[684px] bg-black rounded-[25px] border-[19px] border-stock4u-light-blue relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <div className="w-full h-full flex items-center justify-center">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      "_blank",
                    )
                  }
                  className="w-[178px] h-[178px] bg-stock4u-happy-blue rounded-full flex items-center justify-center shadow-[10px_10px_0_rgba(0,0,0,0.1)] hover:scale-105 transition-transform border-[15px] border-white"
                >
                  <svg
                    className="w-16 h-16 text-white ml-3"
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

        {/* Space below blue background to accommodate the video overflow */}
        <div className="h-[351px] bg-white"></div>
      </div>

      {/* Gift Packages Carousel */}
      <section className="w-full py-6 mb-6">
        <div className="max-w-[1639px] mx-auto relative">
          {/* Carousel Container with Real Figma Image */}
          <div className="flex justify-center items-center">
            <Link to="/stock-selection?continue=true" className="block">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fdd35d8126d3046409354f589f2bbc58e?format=webp&width=1600&quality=90"
                alt="Gift Package Cards"
                className="w-full max-w-[1472px] h-auto object-contain hover:opacity-90 transition-opacity cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Exact Figma Match */}
      <section className="h-[566px] relative overflow-hidden">
        {/* Use the exact Figma design as background image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d2a8fbb0bc7d24e0fc8879295b276f6758c8be62?width=3840"
          alt="How It Works - זה כללו פשוט!"
          className="w-full h-full object-cover object-center"
        />
      </section>

      {/* Statistics Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-stock4u-light-blue/40 rounded-3xl p-8 text-center">
            <div className="text-6xl font-bold text-stock4u-dark-grey mb-4 english-font">
              24+
            </div>
            <p className="text-stock4u-grey text-xl">מדינות שבהם אנו עובדים</p>
          </div>
          <div className="bg-stock4u-light-blue/40 rounded-3xl p-8 text-center">
            <div className="text-6xl font-bold text-stock4u-dark-grey mb-4 english-font">
              17M
            </div>
            <p className="text-stock4u-grey text-xl">אנשים שהאמינו בנו</p>
          </div>
          <div className="bg-stock4u-light-blue/40 rounded-3xl p-8 text-center">
            <div className="text-6xl font-bold text-stock4u-dark-grey mb-4 english-font">
              +95%
            </div>
            <p className="text-stock4u-grey text-xl">לקוחות מרוצים</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-stock4u-dark-grey mb-8 hebrew-font">
          אוקיי אני רוצה לשלוח מתנה, מה עכשיו?
        </h2>
        <Link
          to="/stock-selection?continue=true"
          className="inline-block bg-stock4u-happy-blue text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
        >
          מתחילים בבחירת מתנה &gt;
        </Link>
      </section>

      {/* Company Logos Ticker */}
      <section className="py-6 overflow-hidden">
        <p className="text-center text-stock4u-dark-grey mb-6">
          חברות פופולאריות להשקעה
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-12 opacity-30 animate-marquee">
            <div className="flex items-center gap-12 shrink-0">
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">GOOG</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">AMZN</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">NASDAQ</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">AAPL</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">AAN</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">NVDA</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">MSFT</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">META</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">SONY</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">CRM</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">ORCL</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">JNJ</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">TSLA</span>
            </div>
            {/* Duplicate for seamless scroll */}
            <div className="flex items-center gap-12 shrink-0">
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">GOOG</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">AMZN</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">NASDAQ</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">AAPL</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">AAN</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">NVDA</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">MSFT</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">META</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">SONY</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">CRM</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">ORCL</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">JNJ</span>
              <span className="text-4xl font-bold text-stock4u-dark-grey english-font">TSLA</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}