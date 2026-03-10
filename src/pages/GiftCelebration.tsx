import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

export default function GiftCelebration() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    giftAmountNIS?: number;
    giftAmountUSD?: number;
    exchangeRate?: number;
    accountStatus?: string;
    needsApproval?: boolean;
  } | null;

  const giftAmountNIS = state?.giftAmountNIS ?? 0;
  const giftAmountUSD = state?.giftAmountUSD ?? 0;
  const needsApproval = state?.needsApproval ?? false;

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#4C7EFB", "#FFD700", "#FF6B6B", "#22C55E", "#A855F7"];

    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
      <div className="max-w-md w-full space-y-6">
        {/* Main Celebration Card */}
        <Card className="border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden">
          <CardContent className="pt-10 pb-10 space-y-6 text-center">
            <div className="mx-auto w-28 h-28 rounded-full flex items-center justify-center text-6xl border-[4px] border-white shadow-[0_6px_0_hsl(142,71%,35%),0_8px_20px_rgba(0,0,0,0.15)]"
              style={{ background: "linear-gradient(135deg, hsl(142, 71%, 85%), hsl(142, 71%, 70%))" }}>
              🎉
            </div>

            <h1 className="text-4xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(220, 91%, 53%)" }}>
              מזל טוב!
            </h1>

            {needsApproval ? (
              <>
                <div className="space-y-3 px-2">
                  <p className="text-lg font-bold text-foreground">
                    אנחנו מכינים את החשבון שלך 🚀
                  </p>
                  <div className="rounded-2xl border-2 border-amber-200 p-4" style={{ background: "hsl(42, 100%, 95%)" }}>
                    <p className="text-sm text-amber-800 font-medium leading-relaxed">
                      ⏳ המתנה שלך בדרך! החשבון נמצא בתהליך אישור.
                      <br />
                      המתנה תגיע תוך מספר דקות.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border-[3px] border-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.08)]" style={{ background: "hsl(220, 63%, 96%)" }}>
                  <p className="text-sm text-muted-foreground font-bold mb-2">ערך המתנה שלך</p>
                  <p className="text-3xl font-black" style={{ color: "hsl(220, 91%, 53%)", fontFamily: "'Rubik', sans-serif" }}>
                    ₪{giftAmountNIS}
                  </p>
                  <p className="text-xl font-bold mt-1" style={{ color: "hsl(142, 71%, 35%)" }}>
                    ≈ ${giftAmountUSD}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    יועבר לחשבון שלך ברגע שהאישור יושלם
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-bold" style={{ color: "hsl(142, 71%, 35%)" }}>
                  החשבון נפתח והמתנה הועברה! 🎁
                </p>

                <div className="rounded-2xl border-[3px] border-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.08)]" style={{ background: "hsl(220, 63%, 96%)" }}>
                  <p className="text-sm text-muted-foreground font-bold mb-2">היתרה בחשבון שלך</p>
                  <p className="text-3xl font-black" style={{ color: "hsl(220, 91%, 53%)", fontFamily: "'Rubik', sans-serif" }}>
                    ₪{giftAmountNIS}
                  </p>
                  <p className="text-xl font-bold mt-1" style={{ color: "hsl(142, 71%, 35%)" }}>
                    ≈ ${giftAmountUSD}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    💰 הכסף מוכן להשקעה!
                  </p>
                </div>
              </>
            )}

            {/* Gross amount disclaimer */}
            <div className="rounded-2xl border-2 border-amber-100 p-3" style={{ background: "hsl(42, 100%, 97%)" }}>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                סכום זה מוצג בערכי ברוטו. המרת המט״ח וביצוע הרכישה כפופים לעמלות מסחר ושער חליפין רציף.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-blue-200 p-4 text-right" style={{ background: "hsl(220, 90%, 96%)" }}>
              <p className="text-sm font-medium text-blue-900 leading-relaxed">
                📧 נשלח אליך אימייל עם כל הפרטים.
                <br />
                בקרוב תוכל/י לצפות בתיק ההשקעות שלך!
              </p>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="w-full h-14 text-lg font-black rounded-2xl transition-all hover:translate-y-[-2px]"
              style={{
                background: "hsl(220, 91%, 63%)",
                color: "white",
                boxShadow: "0 6px 0 hsl(220, 91%, 48%), 0 8px 20px rgba(76, 126, 251, 0.35)",
              }}
            >
              🏠 חזרה לדף הראשי
            </Button>
          </CardContent>
        </Card>

        {/* Legal footer */}
        <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed px-4">
          השירות ניתן כפלטפורמה טכנולוגית בלבד ואינו מהווה ייעוץ השקעות או ניהול תיקים לפי חוק הייעוץ הישראלי.
        </p>

        <p className="text-xs text-muted-foreground text-center font-medium">
          🔒 כל הפעולות מבוצעות בצורה מאובטחת דרך Stock4U
        </p>
      </div>
    </div>
  );
}
