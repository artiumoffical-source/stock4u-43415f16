import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Gift,
  TrendingUp,
  Send,
  ShieldCheck,
  Cake,
  GraduationCap,
  Baby,
  Heart,
  ArrowDownUp,
  Zap,
  Clock,
  Star,
} from "lucide-react";
import stock4uLogo from "@/assets/stock4u-logo-full.png";

const BRANDS = [
  {
    name: "Apple",
    symbol: "AAPL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    color: "#555",
  },
  {
    name: "Disney",
    symbol: "DIS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    color: "#113CCF",
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    color: "#E82127",
  },
];

const OCCASIONS = [
  { icon: Cake, label: "ימי הולדת", emoji: "🎂" },
  { icon: GraduationCap, label: "סיום לימודים", emoji: "🎓" },
  { icon: Baby, label: "לידה", emoji: "👶" },
  { icon: Heart, label: "סתם להגיד תודה", emoji: "💛" },
];

/* ── Decorative background shapes ── */
function BgDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Lightning bolt top-left */}
      <svg className="absolute -top-4 left-6 w-12 h-12 text-[#FFC845] opacity-60 rotate-[-15deg]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>
      {/* Star top-right */}
      <svg className="absolute top-16 right-4 w-8 h-8 text-[#26C1C9] opacity-40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6z" />
      </svg>
      {/* Star mid-left */}
      <svg className="absolute top-[55%] -left-2 w-10 h-10 text-[#FF6B35] opacity-20 rotate-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.4 5.6 21.2 8 14 2 9.2h7.6z" />
      </svg>
      {/* Lightning bolt bottom-right */}
      <svg className="absolute bottom-32 right-2 w-9 h-9 text-[#FFC845] opacity-30 rotate-[20deg]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>
      {/* Circle */}
      <div className="absolute top-[35%] right-8 w-16 h-16 rounded-full border-[3px] border-[#26C1C9] opacity-10" />
      <div className="absolute bottom-[20%] left-4 w-10 h-10 rounded-full bg-[#FFC845] opacity-10" />
    </div>
  );
}

/* ── Sticker wrapper component ── */
function Sticker({ children, className = "", selected = false }: { children: React.ReactNode; className?: string; selected?: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl border-[3px] ${
        selected ? "border-[#26C1C9] shadow-[0_6px_20px_rgba(38,193,201,0.25)] scale-[1.06]" : "border-white shadow-[0_4px_16px_rgba(0,27,121,0.08)]"
      } transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Landing() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

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
      const { error } = await supabase
        .from("waitlist" as any)
        .insert([{ email: email.trim().toLowerCase() }] as any);

      if (error) {
        if (error.code === "23505") {
          toast({ title: "כבר נרשמת! נעדכן אותך בקרוב 💙" });
        } else {
          throw error;
        }
      } else {
        setSubmitted(true);
        toast({ title: "נרשמת בהצלחה! נעדכן אותך בקרוב 🎉" });
      }
      setEmail("");
    } catch {
      toast({ title: "שגיאה, נסו שוב מאוחר יותר", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const selected = BRANDS.find((b) => b.symbol === selectedBrand);

  return (
    <div
      className="min-h-screen bg-[#E8EDF8] relative"
      dir="rtl"
      style={{ fontFamily: "'Heebo', 'Assistant', sans-serif" }}
    >
      <BgDecorations />

      {/* ===== Header ===== */}
      <header className="relative z-10 px-5 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <img src={stock4uLogo} alt="Stock4U" className="h-10 md:h-12" />
        <a
          href="#waitlist"
          className="bg-[#FF6B35] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shadow-[#FF6B35]/25 hover:bg-[#E85A28] transition-colors"
        >
          הרשמה מוקדמת
        </a>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative z-10 px-5 pt-8 pb-10 max-w-2xl mx-auto text-center">
        <h1 className="text-[2rem] md:text-[2.8rem] leading-[1.2] font-extrabold text-[#001B79] mb-5">
          המתנה הכי טובה
          <br />
          <span className="text-[#26C1C9]">שיש לתת!</span>
        </h1>

        <p className="text-[#001B79]/60 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8">
          תנו נכס אמיתי שגדל עם הזמן.
          <br />
          פשוט, חכם, ובוואטסאפ.
        </p>

        <a
          href="#waitlist"
          className="inline-block bg-[#FF6B35] text-white text-lg font-extrabold px-10 py-4 rounded-full shadow-xl shadow-[#FF6B35]/30 hover:bg-[#E85A28] hover:scale-[1.03] transition-all duration-200"
        >
          אני רוצה לשלוח מניה 🎁
        </a>
      </section>

      {/* ===== Interactive Gift Widget ===== */}
      <section className="relative z-10 px-5 pb-12 max-w-2xl mx-auto">
        <Sticker className="p-6 md:p-8 border-[#001B79]/5 !border-[3px]">
          <p className="text-xs font-bold text-[#001B79]/30 uppercase tracking-[0.15em] mb-6 text-center">
            ✨ בחרו מתנה לדוגמה
          </p>

          <div className="flex justify-center gap-3 md:gap-5 mb-6">
            {BRANDS.map((brand) => (
              <button
                key={brand.symbol}
                onClick={() => setSelectedBrand(brand.symbol)}
              >
                <Sticker
                  selected={selectedBrand === brand.symbol}
                  className="w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center gap-2 cursor-pointer hover:scale-[1.03]"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-9 h-9 md:w-10 md:h-10 object-contain"
                  />
                  <span className="text-xs font-bold text-[#001B79]/70">
                    {brand.name}
                  </span>
                </Sticker>
              </button>
            ))}
          </div>

          {/* WhatsApp Preview */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              selected ? "max-h-44 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {selected && (
              <div className="bg-[#DCF8C6] rounded-2xl rounded-br-md p-4 mx-1 md:mx-8 relative shadow-md border-2 border-white">
                <p className="text-sm text-gray-800 leading-relaxed">
                  קיבלת מתנה ששווה{" "}
                  <span className="font-bold">200 ש״ח</span> במניית{" "}
                  <span className="font-extrabold text-[#001B79]">
                    {selected.name}
                  </span>{" "}
                  🎁
                </p>
                <span className="text-[10px] text-gray-400 mt-1 block text-left">
                  WhatsApp · 12:34
                </span>
              </div>
            )}
          </div>
        </Sticker>
      </section>

      {/* ===== Gift for Every Occasion ===== */}
      <section className="relative z-10 px-5 pb-14 max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#001B79] text-center mb-8">
          מתנה לכל אירוע 🎉
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OCCASIONS.map((occ, i) => (
            <Sticker key={i} className="p-5 text-center hover:scale-[1.03] cursor-default">
              <div className="text-2xl mb-2">{occ.emoji}</div>
              <p className="text-sm font-bold text-[#001B79]/80">
                {occ.label}
              </p>
            </Sticker>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="relative z-10 px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#001B79] text-center mb-10">
            איך זה עובד? 🤔
          </h2>

          <div className="flex flex-col gap-4">
            {[
              {
                icon: <Gift size={22} className="text-white" />,
                num: "1",
                title: "בוחרים מניה",
                desc: "אפל, דיסני, טסלה או כל מניה מובילה",
                bg: "bg-[#26C1C9]",
              },
              {
                icon: <Send size={22} className="text-white" />,
                num: "2",
                title: "שולחים בוואטסאפ",
                desc: "המתנה מגיעה ישירות בהודעה אישית",
                bg: "bg-[#FF6B35]",
              },
              {
                icon: <TrendingUp size={22} className="text-white" />,
                num: "3",
                title: "הם הופכים למשקיעים",
                desc: "המתנה צומחת עם הזמן – בדיוק כמוהם",
                bg: "bg-[#001B79]",
              },
            ].map((step, i) => (
              <Sticker key={i} className="flex items-center gap-4 p-5">
                <div
                  className={`flex-shrink-0 w-12 h-12 ${step.bg} rounded-xl flex items-center justify-center shadow-sm`}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#001B79] text-base mb-0.5">
                    {step.title}
                  </h3>
                  <p className="text-[#001B79]/40 text-sm">{step.desc}</p>
                </div>
              </Sticker>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Stock4U – Flipped Funnel ===== */}
      <section className="relative z-10 px-5 py-14 max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#001B79] text-center mb-3">
          למה Stock4U? ⚡
        </h2>
        <p className="text-[#001B79]/40 text-sm text-center mb-10 max-w-sm mx-auto">
          הפכנו את התהליך: קודם המתנה, אחר כך ההרשמה
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <ArrowDownUp size={24} className="text-[#26C1C9]" />,
              title: "Flipped Funnel",
              desc: "המתנה מגיעה מיד. מקבל המתנה נרשם רק כשהוא מוכן.",
            },
            {
              icon: <Zap size={24} className="text-[#FF6B35]" />,
              title: "3 קליקים",
              desc: "בחירה, ברכה, שליחה. בלי טפסים ארוכים.",
            },
            {
              icon: <Clock size={24} className="text-[#001B79]" />,
              title: "נכס שגדל",
              desc: "מניה אמיתית שצוברת ערך לאורך זמן.",
            },
          ].map((card, i) => (
            <Sticker key={i} className="p-6 text-center hover:scale-[1.02]">
              <div className="w-12 h-12 bg-[#E8EDF8] rounded-xl flex items-center justify-center mx-auto mb-4">
                {card.icon}
              </div>
              <h3 className="font-extrabold text-[#001B79] mb-2 text-sm">
                {card.title}
              </h3>
              <p className="text-[#001B79]/40 text-xs leading-relaxed">
                {card.desc}
              </p>
            </Sticker>
          ))}
        </div>
      </section>

      {/* ===== Waitlist ===== */}
      <section id="waitlist" className="relative z-10 px-5 pb-14 max-w-2xl mx-auto">
        <Sticker className="!bg-[#001B79] !border-[#001B79] p-8 md:p-10 text-center">
          {submitted ? (
            <>
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-lg font-bold text-white mb-1">
                תודה שנרשמת!
              </h3>
              <p className="text-white/50 text-sm">
                נעדכן אותך ברגע שנפתח לכולם
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg md:text-xl font-extrabold text-white mb-2">
                רוצים לשלוח מניה כמתנה? 🚀
              </h3>
              <p className="text-white/50 text-sm mb-7">
                השאירו מייל ונעדכן אתכם ראשונים
              </p>
              <form
                onSubmit={handleWaitlist}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@email.com"
                  required
                  maxLength={255}
                  className="flex-1 h-12 rounded-xl border-2 border-white/10 bg-white/10 px-4 text-base text-white text-left placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#26C1C9] focus:border-transparent backdrop-blur"
                  dir="ltr"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-6 rounded-xl bg-[#FF6B35] text-white font-extrabold text-sm hover:bg-[#E85A28] transition-colors disabled:opacity-50 whitespace-nowrap shadow-lg shadow-[#FF6B35]/30"
                >
                  {submitting ? "שולח..." : "אני רוצה לשלוח מניה כמתנה"}
                </button>
              </form>
            </>
          )}
        </Sticker>
      </section>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 bg-[#001B79] px-5 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <img
            src={stock4uLogo}
            alt="Stock4U"
            className="h-8 mx-auto mb-4 brightness-0 invert"
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-white/40 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} />
              <span>Powered by institutional-grade trading infrastructure</span>
            </div>
          </div>
          <p className="text-white/20 text-[10px] mt-4">
            © {new Date().getFullYear()} Stock4U. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
