import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileHeader from "../components/mobile/MobileHeader";
import MobileHowItWorks from "../components/mobile/MobileHowItWorks";
import MobileStats from "../components/mobile/MobileStats";
import MobileFooter from "../components/mobile/MobileFooter";

export default function Index() {
  return (
    <div className="min-h-screen bg-white hebrew-font overflow-x-hidden max-w-full" dir="rtl">
      {/* ========== MOBILE VERSION ========== */}
      <div className="block md:hidden">
        <MobileHeader />

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
      <div className="hidden md:block overflow-x-hidden">
        <Header />

        {/* Hero Section with Characters */}
        <section className="relative bg-[hsl(var(--stock4u-light-blue))] overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c861279ab775a02162db7807d6d5056d3eb1252d?width=3840"
            alt="Stock4U Characters with Main Title"
            className="w-full h-auto object-cover object-center"
          />
        </section>

        {/* Video Section - Centered & Premium */}
        <section className="bg-[hsl(var(--stock4u-light-blue))] pb-12">
          <div className="max-w-[900px] mx-auto px-6">
            <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                      "_blank",
                    )
                  }
                  className="w-20 h-20 bg-[hsl(var(--stock4u-happy-blue))] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-8 h-8 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Selection Cards (3 Colored Boxes with Carousel) */}
        <section className="bg-white py-8 px-4">
          <div className="max-w-6xl mx-auto relative">
            {/* Left Arrow */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
              <svg className="w-6 h-6 text-[hsl(var(--stock4u-grey))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Row */}
            <div className="flex justify-center gap-6 px-12">
              {/* Card 1 - Israeli Stocks (Blue) */}
              <Link 
                to="/stock-selection?package=israeli" 
                className="flex-1 max-w-[280px] bg-gradient-to-br from-[#4A90D9] to-[#3B7DC4] rounded-3xl p-6 text-center text-white hover:scale-105 transition-transform shadow-lg"
              >
                <div className="h-24 flex items-center justify-center mb-4">
                  <img src="https://api.builder.io/api/v1/image/assets/TEMP/f969c07e858b8f0f5fa3c353bca4357f94d553ca?width=100" alt="Israeli Package" className="h-20 object-contain" />
                </div>
                <h3 className="text-xl font-bold mb-2 hebrew-font">חבילת מניות ישראלית</h3>
                <p className="text-sm opacity-90 hebrew-font">עיזרו לכלכלה שלנו לפרוח!</p>
              </Link>

              {/* Card 2 - Brave Stocks (Yellow) */}
              <Link 
                to="/stock-selection?package=brave" 
                className="flex-1 max-w-[280px] bg-gradient-to-br from-[#F5C754] to-[#E5B544] rounded-3xl p-6 text-center text-[hsl(var(--stock4u-dark-grey))] hover:scale-105 transition-transform shadow-lg"
              >
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🔍</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 hebrew-font">חבילת מניות לאמיצים!</h3>
                <p className="text-sm hebrew-font">מקסימום סיכון ומקסימום רווח!</p>
              </Link>

              {/* Card 3 - Pick Yourself (Orange) */}
              <Link 
                to="/stock-selection?continue=true" 
                className="flex-1 max-w-[280px] bg-gradient-to-br from-[#F5A054] to-[#E59044] rounded-3xl p-6 text-center text-white hover:scale-105 transition-transform shadow-lg"
              >
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🎁</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 hebrew-font">בחר את המתנה בעצמך!</h3>
                <p className="text-sm opacity-90 hebrew-font">בחרו מניות לבד</p>
              </Link>
            </div>

            {/* Right Arrow */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
              <svg className="w-6 h-6 text-[hsl(var(--stock4u-grey))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[hsl(var(--stock4u-light-blue))]/30 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-12 hebrew-font">
              רגע! איך זה עובד?
            </h2>

            {/* 3 Steps with Arrows */}
            <div className="flex justify-center items-start gap-4 relative">
              {/* Step 3 */}
              <div className="flex-1 max-w-[280px] text-center relative">
                <div className="text-7xl font-bold text-[#F5C754] mb-4 english-font" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>3</div>
                <div className="bg-white rounded-3xl p-6 shadow-md border border-[hsl(var(--stock4u-light-blue))]">
                  <h3 className="text-xl font-bold text-[hsl(var(--stock4u-happy-blue))] mb-2 hebrew-font">שולחים למי שאוהבים</h3>
                  <p className="text-[hsl(var(--stock4u-grey))] text-sm hebrew-font">המתנה תגיע ישירות למייל או לנייד</p>
                </div>
                {/* Arrow pointing to step 2 */}
                <svg className="absolute -left-8 top-20 w-16 h-16 text-[hsl(var(--stock4u-happy-blue))] rotate-180" viewBox="0 0 60 40" fill="none">
                  <path d="M5 20 Q30 5 55 20" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 2"/>
                  <path d="M50 15 L55 20 L50 25" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex-1 max-w-[280px] text-center relative">
                <div className="text-7xl font-bold text-[#F5C754] mb-4 english-font" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>2</div>
                <div className="bg-white rounded-3xl p-6 shadow-md border border-[hsl(var(--stock4u-light-blue))]">
                  <h3 className="text-xl font-bold text-[hsl(var(--stock4u-happy-blue))] mb-2 hebrew-font">כותבים ברכה משקעת</h3>
                  <p className="text-[hsl(var(--stock4u-grey))] text-sm hebrew-font">אל תדאגו, נעזור לכם אם צריך</p>
                </div>
                {/* Arrow pointing to step 1 */}
                <svg className="absolute -left-8 top-20 w-16 h-16 text-[hsl(var(--stock4u-happy-blue))] rotate-180" viewBox="0 0 60 40" fill="none">
                  <path d="M5 20 Q30 35 55 20" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 2"/>
                  <path d="M50 15 L55 20 L50 25" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Step 1 */}
              <div className="flex-1 max-w-[280px] text-center">
                <div className="text-7xl font-bold text-[#F5C754] mb-4 english-font" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}>1</div>
                <div className="bg-white rounded-3xl p-6 shadow-md border border-[hsl(var(--stock4u-light-blue))]">
                  <h3 className="text-xl font-bold text-[hsl(var(--stock4u-happy-blue))] mb-2 hebrew-font">מוסיפים מניות לעגלת הקניות</h3>
                  <p className="text-[hsl(var(--stock4u-grey))] text-sm hebrew-font">ניתן גם לבחור חבילות מוכנות או ליצור משלכם</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-center gap-6">
              {/* Stat 1 - 24+ */}
              <div className="flex-1 max-w-[240px] bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
                <div className="text-5xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 english-font">24+</div>
                <p className="text-[hsl(var(--stock4u-grey))] text-sm hebrew-font">מדינות שבהם אנו עובדים</p>
              </div>

              {/* Stat 2 - 17M */}
              <div className="flex-1 max-w-[240px] bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
                <div className="text-5xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 english-font">17M</div>
                <p className="text-[hsl(var(--stock4u-grey))] text-sm hebrew-font">אנשים שהאמינו בנו</p>
              </div>

              {/* Stat 3 - +95% */}
              <div className="flex-1 max-w-[240px] bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
                <div className="text-5xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 english-font">+95%</div>
                <p className="text-[hsl(var(--stock4u-grey))] text-sm hebrew-font">לקוחות מרוצים</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white text-center py-12">
          <h2 className="text-3xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-6 hebrew-font px-4">
            אוקיי אני רוצה לשלוח מתנה, מה עכשיו?
          </h2>
          <Link
            to="/stock-selection?continue=true"
            className="inline-block bg-[hsl(var(--stock4u-happy-blue))] text-white px-8 py-4 rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-lg hebrew-font"
          >
            מתחילים בבחירת מתנה &gt;
          </Link>
          <p className="text-[hsl(var(--stock4u-grey))] text-sm mt-4 hebrew-font">
            הברות פופולאריות להשקעה
          </p>
        </section>

        {/* Company Logos Ticker */}
        <section className="py-6 overflow-hidden bg-white">
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-16 opacity-30 animate-marquee">
              <div className="flex items-center gap-16 shrink-0">
                {["NASDAQ", "AAPL", "AAN", "NVDA", "MSFT", "META", "SONY", "CRM", "ORCL"].map((ticker) => (
                  <span key={ticker} className="text-3xl font-bold text-[hsl(var(--stock4u-grey))] english-font whitespace-nowrap">
                    {ticker}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-16 shrink-0">
                {["NASDAQ", "AAPL", "AAN", "NVDA", "MSFT", "META", "SONY", "CRM", "ORCL"].map((ticker) => (
                  <span key={`${ticker}-2`} className="text-3xl font-bold text-[hsl(var(--stock4u-grey))] english-font whitespace-nowrap">
                    {ticker}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
