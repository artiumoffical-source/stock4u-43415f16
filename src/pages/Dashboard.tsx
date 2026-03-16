import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/login", { replace: true });
        } else {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/login", { replace: true });
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-20 h-20 rounded-full border-[3px] border-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-4xl"
            style={{ background: "linear-gradient(135deg, hsl(220, 91%, 85%), hsl(220, 91%, 70%))" }}>
            📊
          </div>
          <h1 className="text-3xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(220, 91%, 53%)" }}>
            תיק ההשקעות שלי
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            {user?.email}
          </p>
        </div>

        {/* Coming soon card */}
        <Card className="border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl">
          <CardContent className="pt-8 pb-8 text-center space-y-4">
            <div className="text-5xl">🚧</div>
            <h2 className="text-xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(220, 91%, 53%)" }}>
              בקרוב כאן!
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              תיק ההשקעות שלך בהכנה.
              <br />
              בקרוב תוכל/י לצפות במניות, בביצועים ובהיסטוריית העסקאות.
            </p>
            <div className="rounded-2xl border-2 border-blue-200 p-4" style={{ background: "hsl(220, 90%, 96%)" }}>
              <p className="text-sm text-blue-900 font-medium">
                📧 נעדכן אותך במייל ברגע שהדשבורד יהיה מוכן!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate("/")}
            className="w-full h-12 text-base font-bold rounded-2xl"
            style={{
              background: "hsl(220, 91%, 63%)",
              color: "white",
              boxShadow: "0 4px 0 hsl(220, 91%, 48%), 0 6px 15px rgba(76, 126, 251, 0.3)",
            }}
          >
            🏠 חזרה לדף הראשי
          </Button>
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="w-full h-12 text-base font-bold rounded-2xl gap-2"
          >
            <LogOut className="h-4 w-4" />
            התנתקות
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center font-medium">
          🔒 כל הפעולות מבוצעות בצורה מאובטחת דרך Stock4U
        </p>
      </div>
    </div>
  );
}
