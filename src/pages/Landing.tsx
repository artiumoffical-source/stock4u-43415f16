import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

import stock4uLogo from "@/assets/stock4u-logo-full.png";
import starVector from "@/assets/decorations/star-vector.png";
import lightningVector from "@/assets/decorations/lightning-vector.png";
import dollarSign from "@/assets/decorations/dollar-sign.png";
import shekelSign from "@/assets/decorations/shekel-sign.png";
import dollarMascot from "@/assets/decorations/dollar-mascot.png";
import giftBoxMascot from "@/assets/decorations/gift-box-mascot.png";
import dreamBig from "@/assets/decorations/dream-big.png";
import giftBoxAvatar from "@/assets/decorations/gift-box-avatar.png";

/* ─── Data ─── */
const BRANDS = [
  { name: "Apple", symbol: "AAPL", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", ticker: "$AAPL", bg: "#f5f5f7" },
  { name: "Tesla", symbol: "TSLA", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", ticker: "$TSLA", bg: "#e8e8e8" },
  { name: "Disney", symbol: "DIS", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg", ticker: "$DIS", bg: "#e8f0fe" },
  { name: "NVIDIA", symbol: "NVDA", logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg", ticker: "$NVDA", bg: "#e8f5e9" },
  { name: "Amazon", symbol: "AMZN", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", ticker: "$AMZN", bg: "#fff3e0" },
  { name: "Google", symbol: "GOOGL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", ticker: "$GOOGL", bg: "#e3f2fd" },
  { name: "Meta", symbol: "META", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", ticker: "$META", bg: "#e8eaf6" },
  { name: "Microsoft", symbol: "MSFT", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", ticker: "$MSFT", bg: "#e0f7fa" },
  { name: "Bitcoin", symbol: "BTC", logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg", ticker: "$BTC", bg: "#fff8e1" },
  { name: "Ethereum", symbol: "ETH", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg", ticker: "$ETH", bg: "#ede7f6" },
];

const STEPS = ["בחר מתנה", "שלח בוואטסאפ", "הם משקיעים"];

/* ─── Floating decoration ─── */
function FloatingEl({ children, className, delay = 0, duration = 4 }: { children: React.ReactNode; className?: string; delay?: number; duration?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      animate={{ y: [0, -14, 0], rotate: [0, 6, -6, 0] }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
      aria-hidden
    >
      {children}
    </motion.div>
  );
}

/* ─── Sticker wrapper ─── */
function Sticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border-[4px] border-white shadow-[0_8px_28px_rgba(0,27,121,0.15)] ${className}`}>
      {children}
    </div>
  );
}

/* ─── Phone frame ─── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[220px] h-[370px] md:w-[250px] md:h-[420px]">
      <div className="absolute inset-0 bg-[#1a1a2e] rounded-[32px] border-[4px] border-[#2a2a4a] shadow-2xl shadow-black/40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-xl z-10" />
        <div className="absolute inset-[3px] top-6 rounded-b-[28px] bg-gradient-to-b from-[#075E54] to-[#128C7E] overflow-hidden flex flex-col">
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
            <img src={giftBoxAvatar} alt="" className="w-7 h-7 rounded-full object-contain bg-white shrink-0" style={{ imageRendering: "auto" }} />
            <span className="text-white text-xs font-bold">Stock4U</span>
          </div>
          <div className="flex-1 bg-[#ECE5DD] p-3 flex flex-col justify-end">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function Landing() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [selectedBrand, setSelectedBrand] = useState<(typeof BRANDS)[0] | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDreamBig, setShowDreamBig] = useState(false);
  const { toast } = useToast();

  const handleSelect = useCallback((brand: (typeof BRANDS)[0]) => {
    setSelectedBrand(brand);
    setStep(1);
    setShowDreamBig(true);
    setTimeout(() => setShowDreamBig(false), 1800);
    setTimeout(() => setStep(2), 2500);
  }, []);

  const handleBack = useCallback(() => {
    setStep(0);
    setSelectedBrand(null);
  }, []);

  const fireConfetti = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.8 }, colors: ["#FF6B35", "#26C1C9", "#FFC845", "#001B79"] });
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({ title: "כתובת אימייל לא תקינה", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("waitlist").insert([{ email: email.trim().toLowerCase() }]);
      if (error) {
        if (error.code === "23505") {
          setSubmitted(true);
          fireConfetti();
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead');
          }
        }
        else throw error;
      } else {
        setSubmitted(true);
        fireConfetti();
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead');
        }
      }
      setEmail("");
    } catch {
      toast({ title: "שגיאה, נסו שוב", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="h-[100dvh] relative overflow-hidden flex flex-col"
      dir="rtl"
      style={{
        fontFamily: "'Heebo', 'Assistant', sans-serif",
        background: "radial-gradient(ellipse at center, #001B79 0%, #000D3A 100%)",
      }}
    >
      {/* ── Floating background assets ── */}
      <FloatingEl className="top-[8%] left-[6%] opacity-25" delay={0} duration={6}>
        <img src={starVector} alt="" className="w-12 md:w-20" />
      </FloatingEl>
      <FloatingEl className="top-[5%] right-[8%] opacity-30" delay={1.2} duration={5}>
        <img src={lightningVector} alt="" className="w-10 md:w-16" />
      </FloatingEl>
      <FloatingEl className="bottom-[18%] left-[3%] opacity-25" delay={0.5} duration={7}>
        <img src={dollarSign} alt="" className="w-12 md:w-20" />
      </FloatingEl>
      <FloatingEl className="bottom-[25%] right-[4%] opacity-25" delay={2} duration={5.5}>
        <img src={shekelSign} alt="" className="w-11 md:w-16" />
      </FloatingEl>
      <FloatingEl className="top-[38%] right-[2%] opacity-20" delay={3} duration={8}>
        <img src={starVector} alt="" className="w-8 md:w-12" />
      </FloatingEl>
      <FloatingEl className="top-[48%] left-[3%] opacity-20" delay={1.8} duration={6.5}>
        <img src={lightningVector} alt="" className="w-9 md:w-14" />
      </FloatingEl>

      {/* ── Corner mascots ── */}
      <motion.img
        src={dollarMascot}
        alt=""
        className="absolute bottom-[2%] left-0 w-28 md:w-44 opacity-60 pointer-events-none select-none z-10"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        aria-hidden
      />
      <motion.img
        src={giftBoxMascot}
        alt=""
        className="absolute bottom-[2%] right-0 w-24 md:w-40 opacity-60 pointer-events-none select-none z-10"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-hidden
      />

      {/* Dream Big is rendered inside the phone preview step instead */}

      {/* ── Logo with glow ── */}
      <header className="relative z-20 pt-3 pb-0 flex justify-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 blur-2xl bg-[#26C1C9]/20 rounded-full scale-150" />
          <img src={stock4uLogo} alt="Stock4U" className="relative h-10 md:h-12" />
        </motion.div>
      </header>

      {/* ── Progress bar ── */}
      <div className="relative z-20 flex justify-center items-center gap-1.5 mb-1 px-6">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors duration-300 ${
                i <= step ? "bg-[#FF6B35] text-white" : "bg-white/10 text-white/40"
              }`}
              animate={i === step ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {s}
            </motion.div>
            {i < STEPS.length - 1 && (
              <div className={`w-5 h-0.5 rounded ${i < step ? "bg-[#FF6B35]" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Title ── */}
      <motion.div
        className="relative z-20 text-center px-5 mb-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-[2rem] md:text-5xl font-extrabold text-white leading-tight">
          המתנה הכי טובה <span className="text-[#26C1C9]">שיש לתת!</span>
        </h1>
        <p className="text-white/50 text-sm md:text-base mt-1 max-w-sm mx-auto leading-relaxed">
          תנו נכס אמיתי שגדל עם הזמן. פשוט, חכם, ובוואטסאפ.
        </p>
      </motion.div>

      {/* ── Main Stage ── */}
      <div className="relative z-20 flex-1 flex items-start justify-center px-2 md:px-4 pt-2">
        <AnimatePresence mode="wait">
          {/* STEP 0: Choose stock */}
          {step === 0 && (
            <motion.div
              key="choose"
              className="flex flex-col items-center w-full max-w-[90vw] md:max-w-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-white/70 text-sm md:text-base font-semibold mb-3 text-center">
                בחרו את המניה שתרצו להעניק כדי להתחיל:
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full">
              {BRANDS.map((brand, i) => (
                <motion.button
                  key={brand.symbol}
                  onClick={() => handleSelect(brand)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full flex items-center justify-center p-3.5 md:p-4 border-[4px] border-white shadow-[0_6px_20px_rgba(0,27,121,0.18)] transition-shadow hover:shadow-[0_8px_30px_rgba(38,193,201,0.35)]"
                    style={{ backgroundColor: brand.bg }}
                  >
                    <motion.img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                      style={{ imageRendering: "auto" }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.2, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="text-[11px] md:text-xs font-bold text-white/80">{brand.name}</span>
                </motion.button>
              ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1: Phone preview */}
          {step === 1 && selectedBrand && (
            <motion.div
              key="preview"
              className="relative flex items-center justify-center gap-0"
              initial={{ opacity: 0, scale: 0.5, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -40 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
              {/* Dream Big - overlay on top of phone */}
              <AnimatePresence>
                {showDreamBig && (
                  <motion.img
                    src={dreamBig}
                    alt="Dream Big"
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 md:w-52 z-50 pointer-events-none"
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 5 }}
                    exit={{ scale: 0.4, opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  />
                )}
              </AnimatePresence>
              <PhoneFrame>
                <motion.div
                  className="bg-[#DCF8C6] rounded-xl rounded-br-sm p-3 shadow-sm max-w-[85%] self-start"
                  initial={{ opacity: 0, x: -40, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 18 }}
                >
                  <p className="text-[11px] text-gray-800 leading-relaxed" dir="rtl">
                    קיבלת מתנה ששווה{" "}
                    <span className="font-bold">200 ש״ח</span> במניית{" "}
                    <span className="font-extrabold text-[#001B79]">{selectedBrand.name}</span> 🎁
                  </p>
                  <span className="text-[9px] text-gray-400 block text-left mt-1">12:34 ✓✓</span>
                </motion.div>
              </PhoneFrame>
            </motion.div>
          )}

          {/* STEP 2: Signup */}
          {step === 2 && (
            <motion.div
              key="signup"
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              {submitted ? (
                <motion.div
                  className="text-center py-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                >
                  <div className="text-7xl mb-5">🎉</div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                    תודה שנרשמת<span className="text-[#26C1C9]">!</span>
                  </h3>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed">
                    נעדכן אותך ברגע שנפתח 💙
                  </p>
                  <motion.div
                    className="mt-6 inline-block px-6 py-2.5 rounded-full border-2 border-[#26C1C9]/30 text-[#26C1C9] text-sm font-bold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    Stock4U — בקרוב אצלכם
                  </motion.div>
                </motion.div>
              ) : (
                <div className="text-center px-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                    {selectedBrand ? (
                      <>רוצים לשלוח <span className="text-[#26C1C9]">{selectedBrand.name}</span> כמתנה?</>
                    ) : (
                      <>רוצים לשלוח <span className="text-[#26C1C9]">מניה</span> כמתנה?</>
                    )}
                  </h3>
                  <p className="text-white/40 text-sm mb-6">השאירו מייל ונעדכן אתכם ראשונים</p>
                  <form onSubmit={handleWaitlist} className="flex flex-col gap-3 max-w-sm mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@email.com"
                      required
                      maxLength={255}
                      className="w-full h-14 rounded-2xl border-[3px] border-white/90 bg-white/10 backdrop-blur-sm px-4 text-base text-white text-left placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#26C1C9] focus:border-transparent"
                      dir="ltr"
                    />
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full h-14 rounded-2xl border-[3px] border-white bg-[#FF6B35] text-white font-extrabold text-lg shadow-[0_8px_28px_rgba(255,107,53,0.35)] hover:bg-[#E85A28] transition-colors disabled:opacity-50"
                    >
                      {submitting ? "..." : "אני רוצה לשלוח מניה 🎁"}
                    </motion.button>
                  </form>
                  <button onClick={handleBack} className="mt-5 text-[#26C1C9] text-sm font-semibold hover:underline">
                    ← חזרה לבחירה
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-20 py-1 text-center">
        <p className="text-white/15 text-[9px]">
          Secure Infrastructure · © {new Date().getFullYear()} Stock4U
        </p>
      </footer>
    </div>
  );
}
