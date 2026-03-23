import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ChevronLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import loginBg from "@/assets/login-bg.png";
import loginMascot from "@/assets/login-mascot.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/dashboard", { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) navigate("/dashboard", { replace: true });
      }
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const otpValue = otp.join("");
  const isOtpComplete = otpValue.length === 6;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({ email });
      if (otpError) throw new Error(otpError.message);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "שגיאה בשליחת קוד");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete || isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otpValue,
        type: "email",
      });
      if (verifyError) throw new Error(verifyError.message);
      // onAuthStateChange will handle redirect
    } catch (err: any) {
      setError(err.message === "Token has expired or is invalid" ? "הקוד שהוזן שגוי או שפג תוקפו" : err.message || "שגיאה באימות הקוד");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) newOtp[i] = pasted[i] || "";
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, 5);
    document.getElementById(`otp-${focusIdx}`)?.focus();
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={loginBg} alt="" className="absolute w-full h-full object-cover" style={{ transform: "scale(1.15)", transformOrigin: "center center" }} />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-[560px]">
          <div className="absolute left-1/2 z-30" style={{ transform: "translateX(-50%)", top: "-90px" }}>
            <img src={loginMascot} alt="Stock4U Mascot" className="w-32 h-auto drop-shadow-xl" />
          </div>

          <div className="bg-white rounded-[32px] pt-14 pb-10 px-8 sm:px-14" style={{ boxShadow: "0 30px 70px rgba(0, 0, 0, 0.12)", minHeight: "400px" }}>
            {step === "otp" ? (
              <div className="text-center space-y-5">
                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(76,126,251,0.1)" }}>
                  <Mail className="w-9 h-9" style={{ color: "#4C7EFB" }} />
                </div>
                <h1 className="text-3xl font-bold" style={{ color: "#2D7DD2" }}>
                  הזן את הקוד 🔐
                </h1>
                <p className="text-gray-500 leading-relaxed">
                  שלחנו קוד בן 6 ספרות לכתובת
                </p>
                <p className="text-lg font-bold" dir="ltr" style={{ color: "#4C7EFB" }}>
                  {email}
                </p>

                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="flex justify-center gap-2" dir="ltr" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-white outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: error ? "#E53E3E" : "rgba(76,126,251,0.35)",
                          color: "#2D7DD2",
                        }}
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={!isOtpComplete || isSubmitting}
                    className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-white font-semibold text-lg transition-all"
                    style={{
                      backgroundColor: isOtpComplete && !isSubmitting ? "#4C7EFB" : "#A0B4D9",
                      boxShadow: isOtpComplete && !isSubmitting ? "0 12px 28px rgba(76,126,251,0.35)" : "none",
                      cursor: isOtpComplete && !isSubmitting ? "pointer" : "not-allowed",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>מאמת...</span>
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="w-5 h-5" />
                        <span>אימות קוד</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <button
                    onClick={() => { setStep("email"); setOtp(["", "", "", "", "", ""]); setError(""); }}
                    className="font-medium underline transition-colors"
                    style={{ color: "#4C7EFB" }}
                  >
                    שנה כתובת
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleSendOtp as any}
                    disabled={isSubmitting}
                    className="font-medium underline transition-colors"
                    style={{ color: "#4C7EFB" }}
                  >
                    שלח קוד שוב
                  </button>
                </div>

                <p className="text-sm text-gray-400">
                  לא קיבלת? בדוק/י גם בתיקיית הספאם.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#2D7DD2" }}>
                    איזה כיף שחזרת!
                  </h1>
                  <p className="text-gray-500 text-base leading-relaxed">
                    הכנס את כתובת האימייל שלך ונשלח לך קוד כניסה.
                    <br />
                    המתנות שלך מחכות.
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2 text-right">
                      כתובת אימייל
                    </label>
                    <div
                      className="flex items-center h-14 px-4 rounded-2xl border-2 bg-white"
                      style={{ borderColor: error ? "#E53E3E" : "rgba(76,126,251,0.35)" }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl ml-3" style={{ backgroundColor: "rgba(76,126,251,0.1)" }}>
                        <Mail className="w-5 h-5" style={{ color: "#4C7EFB" }} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        placeholder="email@example.com"
                        className="flex-1 h-full bg-transparent border-none outline-none text-sm text-gray-600 text-left"
                        style={{ direction: "ltr" }}
                      />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1.5 text-right">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={!isValidEmail || isSubmitting}
                    className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-white font-semibold text-lg transition-all mt-6"
                    style={{
                      backgroundColor: isValidEmail && !isSubmitting ? "#4C7EFB" : "#A0B4D9",
                      boxShadow: isValidEmail && !isSubmitting ? "0 12px 28px rgba(76,126,251,0.35)" : "none",
                      cursor: isValidEmail && !isSubmitting ? "pointer" : "not-allowed",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>שולח...</span>
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="w-5 h-5" />
                        <span>שלח לי קוד כניסה</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <span className="text-gray-400 text-sm">
                    נתקלת בבעיה?{" "}
                    <a href="mailto:support@stock4u.co.il" className="font-medium underline transition-colors" style={{ color: "#4C7EFB" }}>
                      צור קשר עם התמיכה
                    </a>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
