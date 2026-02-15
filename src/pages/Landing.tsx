import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import stock4uLogo from "@/assets/stock4u-logo-full.png";

/* ─── Data ─── */
const BRANDS = [
  { name: "Apple", symbol: "AAPL", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", ticker: "$AAPL" },
  { name: "Disney", symbol: "DIS", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg", ticker: "$DIS" },
  { name: "Tesla", symbol: "TSLA", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", ticker: "$TSLA" },
];

const STEPS = ["בחירה", "וואטסאפ", "השקעה"];

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
    <div className={`bg-white rounded-2xl border-[3.5px] border-white shadow-[0_6px_24px_rgba(0,27,121,0.12)] ${className}`}>
      {children}
    </div>
  );
}

/* ─── Phone frame ─── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[220px] h-[380px] md:w-[260px] md:h-[440px]">
      {/* Phone body */}
      <div className="absolute inset-0 bg-[#1a1a2e] rounded-[32px] border-[4px] border-[#2a2a4a] shadow-2xl shadow-black/40 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-xl z-10" />
        {/* Screen */}
        <div className="absolute inset-[3px] top-6 rounded-b-[28px] bg-gradient-to-b from-[#075E54] to-[#128C7E] overflow-hidden flex flex-col">
          {/* WhatsApp header */}
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20" />
            <span className="text-white text-xs font-bold">Stock4U</span>
          </div>
          {/* Messages area */}
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
  const [step, setStep] = useState<0 | 1 | 2>(0); // 0=choose, 1=preview, 2=signup
  const [selectedBrand, setSelectedBrand] = useState<(typeof BRANDS)[0] | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSelect = useCallback((brand: (typeof BRANDS)[0]) => {
    setSelectedBrand(brand);
    setStep(1);
    // After 2.5s auto-advance to signup
    setTimeout(() => setStep(2), 2500);
  }, []);

  const handleBack = useCallback(() => {
    setStep(0);
    setSelectedBrand(null);
  }, []);

  const fireConfetti = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: ["#FF6B35", "#26C1C9", "#FFC845", "#001B79"] });
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
      const { error } = await supabase.from("waitlist" as any).insert([{ email: email.trim().toLowerCase() }] as any);
      if (error) {
        if (error.code === "23505") toast({ title: "כבר נרשמת! נעדכן אותך בקרוב 💙" });
        else throw error;
      } else {
        setSubmitted(true);
        fireConfetti();
        toast({ title: "נרשמת בהצלחה! 🎉" });
      }
      setEmail("");
    } catch {
      toast({ title: "שגיאה, נסו שוב", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const currentStepIdx = step;

  return (
    <div
      className="h-[100dvh] bg-[#001B79] relative overflow-hidden flex flex-col"
      dir="rtl"
      style={{ fontFamily: "'Heebo', 'Assistant', sans-serif" }}
    >
      {/* ── Floating decorations ── */}
      <FloatingEl className="top-[12%] left-4 opacity-50" delay={0} duration={5}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFC845"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" /></svg>
      </FloatingEl>
      <FloatingEl className="top-[8%] right-6 opacity-40" delay={1} duration={6}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#26C1C9"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6z" /></svg>
      </FloatingEl>
      <FloatingEl className="bottom-[18%] left-8 opacity-30" delay={2} duration={4.5}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF6B35"><path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6z" /></svg>
      </FloatingEl>
      <FloatingEl className="bottom-[25%] right-4 opacity-40" delay={0.5} duration={5.5}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFC845"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" /></svg>
      </FloatingEl>
      <FloatingEl className="top-[45%] right-2 opacity-20" delay={3} duration={7}>
        <div className="w-5 h-5 rounded-full bg-[#26C1C9]" />
      </FloatingEl>
      <FloatingEl className="top-[55%] left-3 opacity-25" delay={1.5} duration={6}>
        <div className="w-4 h-4 rounded-full border-2 border-[#FFC845]" />
      </FloatingEl>

      {/* ── Logo ── */}
      <header className="relative z-20 pt-5 pb-2 flex justify-center">
        <motion.img
          src={stock4uLogo}
          alt="Stock4U"
          className="h-10 md:h-12 brightness-0 invert"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </header>

      {/* ── Progress bar ── */}
      <div className="relative z-20 flex justify-center gap-2 mb-3 px-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors duration-300 ${
                i <= currentStepIdx ? "bg-[#FF6B35] text-white" : "bg-white/10 text-white/40"
              }`}
              animate={i === currentStepIdx ? { scale: [1, 1.08, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {s}
            </motion.div>
            {i < STEPS.length - 1 && (
              <div className={`w-6 h-0.5 rounded ${i < currentStepIdx ? "bg-[#FF6B35]" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Title ── */}
      <motion.div
        className="relative z-20 text-center px-5 mb-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-[1.6rem] md:text-3xl font-extrabold text-white leading-tight">
          המתנה הכי טובה <span className="text-[#26C1C9]">שיש לתת!</span>
        </h1>
        <p className="text-white/50 text-sm mt-2 max-w-xs mx-auto">
          תנו נכס אמיתי שגדל עם הזמן. פשוט, חכם, ובוואטסאפ.
        </p>
      </motion.div>

      {/* ── Main Stage ── */}
      <div className="relative z-20 flex-1 flex items-start justify-center px-4 pt-6 md:pt-10">
        <AnimatePresence mode="wait">
          {/* STEP 0: Choose stock */}
          {step === 0 && (
            <motion.div
              key="choose"
              className="flex gap-3 md:gap-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35 }}
            >
              {BRANDS.map((brand, i) => (
                <motion.button
                  key={brand.symbol}
                  onClick={() => handleSelect(brand)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(38,193,201,0.35)" }}
                  whileTap={{ scale: 0.95 }}
                  className="focus:outline-none"
                >
                  <Sticker className="w-24 h-28 md:w-28 md:h-32 flex flex-col items-center justify-center gap-2 cursor-pointer">
                    <img src={brand.logo} alt={brand.name} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                    <span className="text-xs font-extrabold text-[#001B79]">{brand.name}</span>
                    <span className="text-[10px] font-mono text-[#26C1C9]">{brand.ticker}</span>
                  </Sticker>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* STEP 1: Phone preview */}
          {step === 1 && selectedBrand && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
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
              className="w-full max-w-sm"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <Sticker className="p-7 text-center !bg-white/95 backdrop-blur-sm">
                {submitted ? (
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className="text-lg font-extrabold text-[#001B79] mb-1">!תודה שנרשמת</h3>
                    <p className="text-[#001B79]/40 text-sm">נעדכן אותך ברגע שנפתח</p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-lg font-extrabold text-[#001B79] mb-1">
                      {selectedBrand
                        ? `רוצים לשלוח ${selectedBrand.name} כמתנה?`
                        : "רוצים לשלוח מניה כמתנה?"}
                    </h3>
                    <p className="text-[#001B79]/40 text-xs mb-5">השאירו מייל ונעדכן אתכם ראשונים</p>
                    <form onSubmit={handleWaitlist} className="flex flex-col gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@email.com"
                        required
                        maxLength={255}
                        className="h-12 rounded-xl border-2 border-[#001B79]/10 bg-white px-4 text-base text-[#001B79] text-left placeholder:text-[#001B79]/20 focus:outline-none focus:ring-2 focus:ring-[#26C1C9] focus:border-transparent"
                        dir="ltr"
                      />
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="h-13 py-3.5 rounded-xl bg-[#FF6B35] text-white font-extrabold text-base shadow-xl shadow-[#FF6B35]/30 hover:bg-[#E85A28] transition-colors disabled:opacity-50"
                      >
                        {submitting ? "שולח..." : "אני רוצה לשלוח מניה 🎁"}
                      </motion.button>
                    </form>
                    <button
                      onClick={handleBack}
                      className="mt-3 text-[#26C1C9] text-xs font-semibold hover:underline"
                    >
                      ← חזרה לבחירה
                    </button>
                  </>
                )}
              </Sticker>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-20 py-3 text-center">
        <p className="text-white/20 text-[10px]">
          Secure Infrastructure · © {new Date().getFullYear()} Stock4U
        </p>
      </footer>
    </div>
  );
}
