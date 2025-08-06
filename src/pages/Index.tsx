import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Index() {
  return (
    <div className="min-h-screen bg-white hebrew-font" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-stock4u-light-blue overflow-hidden h-[566px]">
        {/* Background Stock Chart */}
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1921 614"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M0.433594 595.989L219.59 456.719L260.449 513.919L364.455 441.797L409.029 498.998L650.471 307.501L706.189 484.076L895.628 374.649L1070.21 309.719L1315.37 175.423L1460.23 406.711L2020.32 17.3564"
              stroke="#689EDA"
              strokeWidth="42"
              fill="none"
            />
          </svg>
        </div>

        {/* Character Images Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1c4a1455277d46fd898e404fd012d0c2?format=webp&width=1920&quality=90"
            alt="Stock4U Characters with Main Title"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Hero Content - Empty to let background image handle all visual elements */}
        <div className="relative z-20 text-center py-20">
          {/* Content is handled by background image */}
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-[1342px] mx-auto px-4 pt-8">
        <div className="bg-black rounded-[25px] border-[19px] border-stock4u-light-blue relative overflow-hidden w-full h-[684px]">
          <div className="w-full h-full flex items-center justify-center">
            <button
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  "_blank",
                )
              }
              className="w-[178px] h-[178px] bg-stock4u-happy-blue rounded-full flex items-center justify-center shadow-[10px_10px_0_rgba(0,0,0,0.1)] hover:scale-105 transition-transform"
            >
              <svg
                className="w-12 h-12 text-white ml-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

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
        <div className="flex items-center gap-12 opacity-30 animate-pulse">
          {/* Placeholder for company logos */}
        </div>
      </section>

      <Footer />
    </div>
  );
}