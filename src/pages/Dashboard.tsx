import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, LogOut, RefreshCw, TrendingUp, TrendingDown, Wallet, DollarSign, BarChart3, ArrowDownToLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";
import { usStocks, israelStocks, usETFs, israelETFs, cryptoETFs } from "@/data/stockData";

// Build symbol lookup map
const allStocks = [...usStocks, ...israelStocks, ...usETFs, ...israelETFs, ...cryptoETFs];
const stockLookup: Record<string, { company: string; logoUrl?: string }> = {};
allStocks.forEach((s) => {
  stockLookup[s.symbol] = { company: s.company, logoUrl: s.logoUrl };
});

interface Position {
  symbol: string;
  qty: string;
  market_value: string;
  unrealized_pl: string;
  unrealized_plpc: string;
  current_price: string;
  cost_basis: string;
  avg_entry_price: string;
}

interface PortfolioData {
  status: "active" | "pending";
  account?: {
    total_equity: number;
    cash: number;
    equity_ils: number;
    cash_ils: number;
  };
  positions?: Position[];
  exchange_rate?: number;
}

const BLUE = "hsl(220, 91%, 53%)";
const BLUE_LIGHT = "hsl(220, 91%, 63%)";
const BG = "hsl(220, 63%, 92%)";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Sell modal state
  const [sellTarget, setSellTarget] = useState<Position | null>(null);
  const [sellConfirmed, setSellConfirmed] = useState(false);
  const [selling, setSelling] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/login", { replace: true });
        } else {
          setUser(session.user);
          setAuthLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/login", { replace: true });
      } else {
        setUser(session.user);
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPortfolio = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setDataLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke("get-user-portfolio", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (fnError) throw fnError;
      setPortfolio(data as PortfolioData);
    } catch (err: any) {
      console.error("Portfolio fetch error:", err);
      setError("שגיאה בטעינת תיק ההשקעות. נסה שוב.");
    } finally {
      setDataLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (user) fetchPortfolio();
  }, [user, fetchPortfolio]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  const openSellModal = (position: Position) => {
    setSellTarget(position);
    setSellConfirmed(false);
  };

  const closeSellModal = () => {
    setSellTarget(null);
    setSellConfirmed(false);
  };

  const executeSell = async () => {
    if (!sellTarget || !sellConfirmed) return;
    setSelling(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const { data, error: fnError } = await supabase.functions.invoke("sell-stock", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { symbol: sellTarget.symbol, qty: sellTarget.qty },
      });

      if (fnError) throw fnError;

      if (data?.error) {
        toast({
          title: "⚠️ שגיאה במכירה",
          description: data.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "✅ המכירה בוצעה!",
          description: `פקודת מכירה ל-${sellTarget.symbol} נשלחה בהצלחה. הכסף יתעדכן בתיק בקרוב.`,
        });
        // Refresh portfolio after short delay
        setTimeout(() => fetchPortfolio(true), 2000);
      }
    } catch (err: any) {
      console.error("Sell error:", err);
      toast({
        title: "⚠️ שגיאה",
        description: "לא הצלחנו לבצע את המכירה. נסה שוב.",
        variant: "destructive",
      });
    } finally {
      setSelling(false);
      closeSellModal();
    }
  };

  // Loading state
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: BG }}>
        <Loader2 className="h-10 w-10 animate-spin" style={{ color: BLUE }} />
        <p className="text-sm font-bold" style={{ color: BLUE, fontFamily: "'Rubik', sans-serif" }}>
          טוען את תיק ההשקעות...
        </p>
      </div>
    );
  }

  // Error state
  if (error && !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4" dir="rtl" style={{ background: BG }}>
        <div className="text-5xl">⚠️</div>
        <p className="text-base font-bold text-center" style={{ color: BLUE }}>{error}</p>
        <Button onClick={() => fetchPortfolio()} className="rounded-2xl font-bold" style={{ background: BLUE_LIGHT, color: "white" }}>
          נסה שוב
        </Button>
      </div>
    );
  }

  // Pending state
  if (portfolio?.status === "pending") {
    return (
      <div className="min-h-screen py-8 px-4" dir="rtl" style={{ background: BG }}>
        <div className="max-w-lg mx-auto space-y-6">
          <Header email={user?.email} />

          <Card className="border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="text-5xl">⏳</div>
              <h2 className="text-xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: BLUE }}>
                חשבון ההשקעות שלך בהכנה
              </h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                המתנה שלך תופיע כאן בקרוב!
                <br />
                אנחנו פותחים לך חשבון מסחר – זה לוקח כמה דקות.
              </p>
              <div className="rounded-2xl border-2 border-blue-200 p-4" style={{ background: "hsl(220, 90%, 96%)" }}>
                <p className="text-sm text-blue-900 font-medium">
                  🔄 נעדכן אותך ברגע שהתיק יהיה מוכן. בינתיים, אפשר לרענן.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => fetchPortfolio(true)}
            disabled={refreshing}
            className="w-full h-12 text-base font-bold rounded-2xl gap-2"
            style={{ background: BLUE_LIGHT, color: "white", boxShadow: `0 4px 0 hsl(220, 91%, 48%), 0 6px 15px rgba(76, 126, 251, 0.3)` }}
          >
            {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            רענון
          </Button>

          <FooterActions onHome={() => navigate("/")} onSignOut={handleSignOut} />
        </div>
      </div>
    );
  }

  // Active portfolio
  const acct = portfolio!.account!;
  const positions = portfolio!.positions || [];
  const rate = portfolio!.exchange_rate || 3.10;
  const totalPl = positions.reduce((sum, p) => sum + parseFloat(p.unrealized_pl || "0"), 0);
  const isProfit = totalPl >= 0;

  // Sell modal meta
  const sellMeta = sellTarget ? stockLookup[sellTarget.symbol] : null;
  const sellCompanyName = sellMeta?.company || sellTarget?.symbol || "";

  return (
    <div className="min-h-screen py-6 px-4 pb-24" dir="rtl" style={{ background: BG }}>
      <div className="max-w-lg mx-auto space-y-5">
        {/* Header with refresh */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: BLUE }}>
              📊 תיק ההשקעות שלי
            </h1>
            <p className="text-xs text-muted-foreground font-medium mt-1">{user?.email}</p>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => fetchPortfolio(true)}
            disabled={refreshing}
            className="rounded-xl border-2 border-white shadow-md h-10 w-10"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} style={{ color: BLUE }} />
          </Button>
        </div>

        {error && (
          <div className="rounded-2xl border-2 border-red-200 p-3 text-center" style={{ background: "hsl(0, 80%, 96%)" }}>
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <SummaryCard
            icon={<Wallet className="h-5 w-5" />}
            label="שווי כולל"
            valueUsd={`$${acct.total_equity.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            valueIls={`₪${acct.equity_ils.toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            className="col-span-2"
            highlight
          />
          <SummaryCard
            icon={<DollarSign className="h-5 w-5" />}
            label="מזומן"
            valueUsd={`$${acct.cash.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            valueIls={`₪${acct.cash_ils.toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <SummaryCard
            icon={isProfit ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            label="רווח/הפסד"
            valueUsd={`${isProfit ? "+" : ""}$${totalPl.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            valueIls={`${isProfit ? "+" : ""}₪${(totalPl * rate).toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            isProfit={isProfit}
          />
        </div>

        {/* Holdings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" style={{ color: BLUE }} />
            <h2 className="text-lg font-black" style={{ fontFamily: "'Rubik', sans-serif", color: BLUE }}>
              ההחזקות שלי
            </h2>
          </div>

          {positions.length === 0 ? (
            <Card className="border-[3px] border-white shadow-md rounded-3xl">
              <CardContent className="py-8 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-muted-foreground font-medium">
                  אין החזקות עדיין. המניות שלך יופיעו כאן בקרוב!
                </p>
              </CardContent>
            </Card>
          ) : (
            positions.map((pos) => (
              <HoldingCard
                key={pos.symbol}
                position={pos}
                exchangeRate={rate}
                onSell={() => openSellModal(pos)}
              />
            ))
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center font-medium">
          💱 שער המרה: $1 = ₪{rate.toFixed(2)}
        </p>

        <FooterActions onHome={() => navigate("/")} onSignOut={handleSignOut} />

        <p className="text-xs text-muted-foreground text-center font-medium">
          🔒 כל הפעולות מבוצעות בצורה מאובטחת דרך Stock4U
        </p>
      </div>

      {/* Sell Confirmation Modal */}
      <Dialog open={!!sellTarget} onOpenChange={(open) => { if (!open) closeSellModal(); }}>
        <DialogContent className="rounded-3xl border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] max-w-sm mx-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-center" style={{ fontFamily: "'Rubik', sans-serif", color: BLUE }}>
              מכירת מניה
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground font-medium">
              אתה עומד למכור את כל האחזקה שלך ב-{sellCompanyName}
            </DialogDescription>
          </DialogHeader>

          {sellTarget && (
            <div className="space-y-4 py-2">
              {/* Order summary */}
              <div className="rounded-2xl border-2 border-blue-100 p-4 space-y-2" style={{ background: "hsl(220, 90%, 97%)" }}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">מניה</span>
                  <span className="font-black" style={{ color: BLUE }}>{sellTarget.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">כמות</span>
                  <span className="font-bold">{parseFloat(sellTarget.qty).toLocaleString("en-US", { maximumFractionDigits: 6 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">שווי נוכחי</span>
                  <span className="font-bold">${parseFloat(sellTarget.market_value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">סוג פקודה</span>
                  <span className="font-bold">מכירה בשוק (Market)</span>
                </div>
              </div>

              {/* Compliance checkbox */}
              <div className="flex items-start gap-3 rounded-2xl border-2 border-amber-200 p-4" style={{ background: "hsl(45, 90%, 96%)" }}>
                <Checkbox
                  id="sell-compliance"
                  checked={sellConfirmed}
                  onCheckedChange={(checked) => setSellConfirmed(checked === true)}
                  className="mt-0.5 border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <label htmlFor="sell-compliance" className="text-xs font-medium leading-relaxed cursor-pointer" style={{ color: "hsl(30, 50%, 30%)" }}>
                  אני מאשר/ת שעסקה זו מתבצעת על דעתי בלבד, ולא קיבלתי ייעוץ השקעות כלשהו. אני מבין/ה שפקודת מכירה בשוק תתבצע במחיר השוק הנוכחי.
                </label>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              onClick={executeSell}
              disabled={!sellConfirmed || selling}
              className="w-full h-12 text-base font-bold rounded-2xl gap-2"
              style={{
                background: sellConfirmed ? "hsl(0, 72%, 50%)" : "hsl(0, 10%, 80%)",
                color: "white",
                boxShadow: sellConfirmed ? "0 4px 0 hsl(0, 72%, 38%), 0 6px 15px rgba(200, 50, 50, 0.3)" : "none",
              }}
            >
              {selling ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowDownToLine className="h-4 w-4" />}
              {selling ? "מבצע מכירה..." : "אישור מכירה"}
            </Button>
            <Button
              variant="outline"
              onClick={closeSellModal}
              disabled={selling}
              className="w-full h-10 font-bold rounded-2xl"
            >
              ביטול
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ── Sub-components ── */

function Header({ email }: { email?: string }) {
  return (
    <div className="text-center space-y-3">
      <div
        className="mx-auto w-20 h-20 rounded-full border-[3px] border-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-4xl"
        style={{ background: `linear-gradient(135deg, hsl(220, 91%, 85%), hsl(220, 91%, 70%))` }}
      >
        📊
      </div>
      <h1 className="text-3xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: BLUE }}>
        תיק ההשקעות שלי
      </h1>
      {email && <p className="text-sm text-muted-foreground font-medium">{email}</p>}
    </div>
  );
}

function SummaryCard({
  icon, label, valueUsd, valueIls, className = "", highlight = false, isProfit,
}: {
  icon: React.ReactNode; label: string; valueUsd: string; valueIls: string;
  className?: string; highlight?: boolean; isProfit?: boolean;
}) {
  const plColor = isProfit !== undefined
    ? isProfit ? "hsl(142, 71%, 35%)" : "hsl(0, 72%, 50%)"
    : BLUE;
  const plBg = isProfit !== undefined
    ? isProfit ? "hsl(142, 60%, 94%)" : "hsl(0, 70%, 95%)"
    : undefined;

  return (
    <Card className={`border-[3px] border-white shadow-[0_6px_20px_rgba(0,0,0,0.1)] rounded-2xl ${className}`} style={plBg ? { background: plBg } : undefined}>
      <CardContent className={`${highlight ? "py-5 px-5" : "py-4 px-4"}`}>
        <div className="flex items-center gap-2 mb-2" style={{ color: plColor }}>
          {icon}
          <span className="text-xs font-bold">{label}</span>
        </div>
        <p className={`${highlight ? "text-2xl" : "text-xl"} font-black`} style={{ fontFamily: "'Rubik', sans-serif", color: plColor }}>
          {valueUsd}
        </p>
        <p className="text-sm font-bold text-muted-foreground mt-0.5">{valueIls}</p>
      </CardContent>
    </Card>
  );
}

function HoldingCard({ position, exchangeRate, onSell }: { position: Position; exchangeRate: number; onSell: () => void }) {
  const pl = parseFloat(position.unrealized_pl || "0");
  const plPc = parseFloat(position.unrealized_plpc || "0") * 100;
  const isProfit = pl >= 0;
  const marketValue = parseFloat(position.market_value || "0");
  const marketValueIls = marketValue * exchangeRate;

  const meta = stockLookup[position.symbol];
  const companyName = meta?.company || position.symbol;
  const logoUrl = meta?.logoUrl;

  return (
    <Card className="border-[3px] border-white shadow-md rounded-2xl">
      <CardContent className="py-4 px-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden"
            style={{ background: "hsl(220, 90%, 96%)" }}>
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={companyName}
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    `<span style="font-size:16px;font-weight:900;color:${BLUE}">${position.symbol.charAt(0)}</span>`;
                }}
              />
            ) : (
              <span className="text-base font-black" style={{ color: BLUE }}>{position.symbol.charAt(0)}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black truncate" style={{ color: "hsl(220, 40%, 25%)" }}>
                {companyName}
              </h3>
              <span className="text-xs font-bold text-muted-foreground mr-2 flex-shrink-0">
                {position.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <div>
                <p className="text-base font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(220, 40%, 25%)" }}>
                  ${marketValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  ₪{marketValueIls.toLocaleString("he-IL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-left flex-shrink-0">
                <p className={`text-sm font-black ${isProfit ? "text-emerald-600" : "text-red-500"}`}>
                  {isProfit ? "+" : ""}${pl.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className={`text-xs font-bold ${isProfit ? "text-emerald-500" : "text-red-400"}`}>
                  {isProfit ? "+" : ""}{plPc.toFixed(2)}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                כמות: {parseFloat(position.qty).toLocaleString("en-US", { maximumFractionDigits: 6 })} · מחיר: ${parseFloat(position.current_price || "0").toFixed(2)}
              </p>
              <Button
                size="sm"
                onClick={onSell}
                className="h-7 px-3 text-xs font-bold rounded-xl gap-1"
                style={{
                  background: "hsl(0, 72%, 95%)",
                  color: "hsl(0, 72%, 45%)",
                  border: "2px solid hsl(0, 60%, 85%)",
                }}
              >
                <ArrowDownToLine className="h-3 w-3" />
                מכירה
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FooterActions({ onHome, onSignOut }: { onHome: () => void; onSignOut: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={onHome}
        className="w-full h-12 text-base font-bold rounded-2xl"
        style={{
          background: BLUE_LIGHT,
          color: "white",
          boxShadow: `0 4px 0 hsl(220, 91%, 48%), 0 6px 15px rgba(76, 126, 251, 0.3)`,
        }}
      >
        🏠 חזרה לדף הראשי
      </Button>
      <Button
        variant="outline"
        onClick={onSignOut}
        className="w-full h-12 text-base font-bold rounded-2xl gap-2"
      >
        <LogOut className="h-4 w-4" />
        התנתקות
      </Button>
    </div>
  );
}
