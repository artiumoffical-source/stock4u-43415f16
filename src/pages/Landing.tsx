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
} from "lucide-react";

const BRANDS = [
  {
    name: "Apple",
    symbol: "AAPL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Disney",
    symbol: "DIS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
];

const OCCASIONS = [
  { icon: Cake, label: "ימי הולדת", emoji: "🎂" },
  { icon: GraduationCap, label: "סיום לימודים", emoji: "🎓" },
  { icon: Baby, label: "לידה", emoji: "👶" },
  { icon: Heart, label: "סתם כדי להגיד תודה", emoji: "💛" },
];

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
      className="min-h-screen bg-white"
      dir="rtl"
      style={{ fontFamily: "'Heebo', 'Assistant', sans-serif" }}
    >
      {/* ===== Header ===== */}
      <header className="bg-[#001B79] px-5 py-4 flex items-center justify-between">
        <img
          src="/images/stock4u-preloader.png"
          alt="Stock4U"
          className="h-9 brightness-0 invert"
        />
        <span className="text-[#26C1C9] text-xs font-medium tracking-wide">
          מתנות שעושות כסף
        </span>
      </header>

      {/* ===== Hero ===== */}
      <section className="px-5 pt-12 pb-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#26C1C9]/10 text-[#26C1C9] rounded-full px-4 py-1.5 text-sm font-semibold mb-7">
          <TrendingUp size={15} />
          <span>נכס אמיתי. לא שובר.</span>
        </div>

        <h1 className="text-[1.85rem] md:text-4xl leading-[1.3] font-extrabold text-[#001B79] mb-5">
          המתנה הכי חכמה
          <br />
          <span className="text-[#26C1C9]">למי שחשוב לכם</span>
        </h1>

        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto">
          תפסיקו לשלוח שוברים שנשכחים.
          <br className="hidden md:block" />{" "}
          תנו נכס אמיתי שגדל עם הזמן – בוואטסאפ, ב-3 קליקים.
        </p>
      </section>

      {/* ===== Interactive Gift Widget ===== */}
      <section className="px-5 pb-12 max-w-2xl mx-auto">
        <div className="bg-[#F8FAFF] rounded-3xl p-6 md:p-8 border border-[#001B79]/5 shadow-[0_4px_24px_rgba(0,27,121,0.06)]">
          <p className="text-xs font-bold text-[#001B79]/40 uppercase tracking-[0.15em] mb-6 text-center">
            בחרו מתנה לדוגמה
          </p>

          <div className="flex justify-center gap-3 md:gap-5 mb-6">
            {BRANDS.map((brand) => (
              <button
                key={brand.symbol}
                onClick={() => setSelectedBrand(brand.symbol)}
                className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 border-2 ${
                  selectedBrand === brand.symbol
                    ? "border-[#26C1C9] bg-white shadow-lg shadow-[#26C1C9]/10 scale-[1.04]"
                    : "border-transparent bg-white hover:border-[#001B79]/10 shadow-sm"
                }`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-9 h-9 md:w-10 md:h-10 object-contain"
                />
                <span className="text-xs font-semibold text-[#001B79]/70">
                  {brand.name}
                </span>
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
              <div className="bg-[#DCF8C6] rounded-2xl rounded-br-md p-4 mx-1 md:mx-8 relative shadow-sm">
                <p className="text-sm text-gray-800 leading-relaxed">
                  קיבלת מתנה ששווה{" "}
                  <span className="font-bold">200 ש״ח</span> במניית{" "}
                  <span className="font-bold text-[#001B79]">
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
        </div>
      </section>

      {/* ===== Gift for Every Occasion ===== */}
      <section className="px-5 pb-14 max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-[#001B79] text-center mb-8">
          מתנה לכל אירוע
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OCCASIONS.map((occ, i) => (
            <div
              key={i}
              className="bg-[#F8FAFF] rounded-2xl p-5 text-center border border-[#001B79]/5 hover:border-[#26C1C9]/30 transition-colors"
            >
              <div className="text-2xl mb-2">{occ.emoji}</div>
              <p className="text-sm font-semibold text-[#001B79]/80">
                {occ.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="bg-[#F8FAFF] px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#001B79] text-center mb-10">
            איך זה עובד?
          </h2>

          <div className="flex flex-col gap-6">
            {[
              {
                icon: <Gift size={22} className="text-[#26C1C9]" />,
                num: "1",
                title: "בוחרים מניה",
                desc: "אפל, דיסני, טסלה או כל מניה מובילה",
              },
              {
                icon: <Send size={22} className="text-[#26C1C9]" />,
                num: "2",
                title: "שולחים בוואטסאפ",
                desc: "המתנה מגיעה ישירות בהודעה אישית",
              },
              {
                icon: <TrendingUp size={22} className="text-[#26C1C9]" />,
                num: "3",
                title: "הם הופכים למשקיעים",
                desc: "המתנה צומחת עם הזמן – בדיוק כמוהם",
              },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#001B79] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#001B79] text-base mb-0.5">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Stock4U – Flipped Funnel ===== */}
      <section className="px-5 py-14 max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-[#001B79] text-center mb-3">
          למה Stock4U?
        </h2>
        <p className="text-gray-400 text-sm text-center mb-10 max-w-sm mx-auto">
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
              icon: <Zap size={24} className="text-[#26C1C9]" />,
              title: "3 קליקים",
              desc: "בחירה, ברכה, שליחה. בלי טפסים ארוכים, בלי בירוקרטיה.",
            },
            {
              icon: <Clock size={24} className="text-[#26C1C9]" />,
              title: "נכס שגדל",
              desc: "לא שובר שנשכח. מניה אמיתית שצוברת ערך לאורך זמן.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#F8FAFF] rounded-2xl p-6 border border-[#001B79]/5 text-center"
            >
              <div className="w-12 h-12 bg-[#001B79]/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                {card.icon}
              </div>
              <h3 className="font-bold text-[#001B79] mb-2 text-sm">
                {card.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Waitlist ===== */}
      <section className="px-5 pb-14 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-[#001B79] to-[#001050] rounded-3xl p-8 md:p-10 text-center">
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
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                רוצים לשלוח מניה כמתנה?
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
                  className="flex-1 h-12 rounded-xl border border-white/10 bg-white/10 px-4 text-base text-white text-left placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#26C1C9] focus:border-transparent backdrop-blur"
                  dir="ltr"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-6 rounded-xl bg-[#26C1C9] text-[#001B79] font-bold text-sm hover:bg-[#26C1C9]/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {submitting ? "שולח..." : "אני רוצה לשלוח מניה כמתנה"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#001B79] px-5 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <img
            src="/images/stock4u-preloader.png"
            alt="Stock4U"
            className="h-7 brightness-0 invert mx-auto mb-4"
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-white/40 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} />
              <span>Powered by institutional-grade trading infrastructure</span>
            </div>
            <span className="hidden md:inline text-white/20">|</span>
            <span>Legal Advisory by Barnea Law</span>
          </div>
          <p className="text-white/20 text-[10px] mt-4">
            © {new Date().getFullYear()} Stock4U. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
