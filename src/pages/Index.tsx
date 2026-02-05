import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Layout from "../components/Layout";
import LogoMarquee from "../components/LogoMarquee";
import heroCharacters from "@/assets/hero-characters.png";

export default function Index() {
  return (
    <Layout>
      {/* ========== DESKTOP VERSION - Always shown ========== */}
      <div>
        {/* Hero Section - Clean, no padding filler */}
        <section className="bg-[#E0E7F5]">
          <img
            src={heroCharacters}
            alt="Stock4U Characters with Main Title - מתנות שעושות כסף!"
            className="w-full h-auto object-contain block"
          />
        </section>

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

        {/* How It Works Section - Same image for all screens */}
        <section className="relative overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/d2a8fbb0bc7d24e0fc8879295b276f6758c8be62?width=3840"
            alt="How It Works - זה כללו פשוט!"
            className="w-full h-auto md:h-[566px] object-contain md:object-cover object-center"
          />
        </section>

        {/* Statistics Section */}
        <section className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center">
              <div className="text-4xl md:text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 md:mb-4 english-font">
                24+
              </div>
              <p className="text-[hsl(var(--stock4u-grey))] text-base md:text-xl">מדינות שבהם אנו עובדים</p>
            </div>
            <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center">
              <div className="text-4xl md:text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 md:mb-4 english-font">
                17M
              </div>
              <p className="text-[hsl(var(--stock4u-grey))] text-base md:text-xl">אנשים שהאמינו בנו</p>
            </div>
            <div className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center">
              <div className="text-4xl md:text-6xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 md:mb-4 english-font">
                +95%
              </div>
              <p className="text-[hsl(var(--stock4u-grey))] text-base md:text-xl">לקוחות מרוצים</p>
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
        <LogoMarquee />

        <Footer />
      </div>
    </Layout>
  );
}
