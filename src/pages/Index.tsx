import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Layout from "../components/Layout";
import LogoMarquee from "../components/LogoMarquee";
import PackagesCarousel from "../components/PackagesCarousel";
import heroCharacters from "@/assets/hero-characters.png";

export default function Index() {
  return (
    <Layout>
      {/* ========== Main wrapper with brand background to hide gaps ========== */}
      <div className="bg-[#E0E7F5]">
        {/* Hero Section - Zoomed in for mobile to fill space */}
        <section className="relative w-full overflow-hidden">
          <div className="relative flex justify-center">
            <img
              src={heroCharacters}
              alt="Stock4U Characters with Main Title - מתנות שעושות כסף!"
              className="w-[130%] max-w-none -ml-[15%] md:w-full md:max-w-full md:ml-0 h-auto object-contain block"
            />
          </div>
        </section>

        {/* Stock Packages Carousel - Scaled up and pulled up on mobile */}
        <div className="-mt-8 md:mt-0 transform scale-110 md:scale-100 origin-top">
          <PackagesCarousel />
        </div>

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
