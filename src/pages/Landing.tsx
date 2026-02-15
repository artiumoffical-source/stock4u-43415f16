import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Gift, TrendingUp, Send, ShieldCheck, ArrowLeft } from "lucide-react";

const BRANDS = [
  { name: "Apple", symbol: "AAPL", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Disney", symbol: "DIS", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
  { name: "Tesla", symbol: "TSLA", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
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
      {/* ===== Hero ===== */}
      <section className="px-5 pt-14 pb-10 max-w-lg mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
          <Gift size={16} />
          <span>מתנות שעושות כסף</span>
        </div>

        <h1 className="text-[2rem] leading-[1.25] font-extrabold text-gray-900 mb-5 tracking-tight">
          המתנה היחידה
          <br />
          <span className="text-cyan-600">שצומחת</span> יחד איתם
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed max-w-sm mx-auto">
          שלחו מניות של אפל, דיסני או טסלה ישירות לוואטסאפ של הנכדים
        </p>
      </section>

      {/* ===== Interactive Widget ===== */}
      <section className="px-5 pb-12 max-w-lg mx-auto">
        <div className="bg-gray-50 rounded-3xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5 text-center">
            בחרו מתנה
          </p>

          <div className="flex justify-center gap-4 mb-6">
            {BRANDS.map((brand) => (
              <button
                key={brand.symbol}
                onClick={() => setSelectedBrand(brand.symbol)}
                className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 border-2 ${
                  selectedBrand === brand.symbol
                    ? "border-cyan-500 bg-white shadow-md scale-105"
                    : "border-transparent bg-white hover:border-gray-200"
                }`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-[11px] font-medium text-gray-600">
                  {brand.name}
                </span>
              </button>
            ))}
          </div>

          {/* WhatsApp Preview */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              selected ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {selected && (
              <div className="bg-[#DCF8C6] rounded-2xl rounded-br-md p-4 mx-2 relative shadow-sm">
                <ArrowLeft
                  size={14}
                  className="absolute top-3 left-3 text-green-600 opacity-50"
                />
                <p className="text-sm text-gray-800 leading-relaxed">
                  סבתא שלחה לך מתנה ששווה{" "}
                  <span className="font-bold">200 ש״ח</span> במניית{" "}
                  <span className="font-bold text-cyan-700">
                    {selected.name}
                  </span>{" "}
                  🎁
                </p>
                <span className="text-[10px] text-gray-400 mt-1 block text-left">
                  12:34
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="px-5 pb-14 max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
          איך זה עובד?
        </h2>

        <div className="flex flex-col gap-6">
          {[
            {
              icon: <Gift size={22} className="text-cyan-600" />,
              title: "בוחרים מניה",
              desc: "אפל, דיסני, טסלה או כל מניה אחרת",
            },
            {
              icon: <Send size={22} className="text-cyan-600" />,
              title: "שולחים בוואטסאפ",
              desc: "המתנה מגיעה ישירות בהודעה אישית",
            },
            {
              icon: <TrendingUp size={22} className="text-cyan-600" />,
              title: "הם הופכים למשקיעים",
              desc: "המתנה צומחת עם הזמן – בדיוק כמוהם",
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-11 h-11 bg-cyan-50 rounded-xl flex items-center justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-0.5">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Waitlist ===== */}
      <section className="px-5 pb-14 max-w-lg mx-auto">
        <div className="bg-gradient-to-b from-cyan-50 to-white rounded-3xl p-8 text-center border border-cyan-100">
          {submitted ? (
            <>
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                תודה שנרשמת!
              </h3>
              <p className="text-gray-400 text-sm">
                נעדכן אותך ברגע שנפתח לכולם
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                רוצים לשלוח מניה כמתנה?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                השאירו מייל ונעדכן אתכם ראשונים
              </p>
              <form
                onSubmit={handleWaitlist}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@email.com"
                  required
                  maxLength={255}
                  className="flex-1 h-12 rounded-xl border border-gray-200 px-4 text-base bg-white text-left placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  dir="ltr"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-6 rounded-xl bg-cyan-600 text-white font-bold text-sm hover:bg-cyan-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {submitting
                    ? "שולח..."
                    : "אני רוצה לשלוח מניה כמתנה"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ===== Trust Bar ===== */}
      <footer className="px-5 pb-10 max-w-lg mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-gray-300 text-xs mb-1">
          <ShieldCheck size={14} />
          <span>תשתית מוסדית מאובטחת</span>
        </div>
        <p className="text-gray-300 text-xs">
          ליווי משפטי: משרד ברנע ושות׳
        </p>
      </footer>
    </div>
  );
}
