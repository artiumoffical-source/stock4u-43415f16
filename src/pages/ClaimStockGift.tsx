import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const HEBREW_REGEX = /[\u0590-\u05FF]/;

const formSchema = z.object({
  firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים").max(100)
    .refine(val => !HEBREW_REGEX.test(val), "Please use English letters only – אנא הקלד באנגלית בלבד"),
  lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים").max(100)
    .refine(val => !HEBREW_REGEX.test(val), "Please use English letters only – אנא הקלד באנגלית בלבד"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().transform(val => val.replace(/[^\d]/g, '')).pipe(z.string().regex(/^\d{9,10}$/, "מספר טלפון חייב להכיל 9-10 ספרות (ללא קידומת מדינה)")),
  address: z.string().min(5, "כתובת חייבת להכיל לפחות 5 תווים")
    .refine(val => !HEBREW_REGEX.test(val), "Please use English letters only – אנא הקלד באנגלית בלבד"),
  city: z.string().min(2, "עיר חייבת להכיל לפחות 2 תווים")
    .refine(val => !HEBREW_REGEX.test(val), "Please use English letters only – אנא הקלד באנגלית בלבד"),
  postalCode: z.string().regex(/^\d{5,}$/, "מיקוד חייב להכיל לפחות 5 ספרות"),
  dobYear: z.string().min(1, "שנה נדרשת"),
  dobMonth: z.string().min(1, "חודש נדרש"),
  dobDay: z.string().min(1, "יום נדרש"),
  taxId: z.string().regex(/^\d{9}$/, "תעודת זהות חייבת להכיל בדיוק 9 ספרות").refine((val) => {
    const sequential = "123456789";
    const reverseSeq = "987654321";
    const allSame = /^(\d)\1{8}$/.test(val);
    return val !== sequential && val !== reverseSeq && !allSame;
  }, "מספר תעודת זהות אינו תקין, אנא הזן מספר אמיתי"),
}).refine((data) => {
  if (data.dobYear && data.dobMonth && data.dobDay) {
    const dob = new Date(parseInt(data.dobYear), parseInt(data.dobMonth) - 1, parseInt(data.dobDay));
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const isOldEnough = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && today.getDate() >= dob.getDate())));
    return isOldEnough;
  }
  return true;
}, { message: "חובה להיות מעל גיל 18", path: ["dobYear"] });

type FormValues = z.infer<typeof formSchema>;

const fields: { name: keyof FormValues; label: string; placeholder: string; type?: string; hint?: string }[] = [
  { name: "firstName", label: "שם פרטי", placeholder: "Israel", hint: "English letters only – באנגלית בלבד" },
  { name: "lastName", label: "שם משפחה", placeholder: "Israeli", hint: "English letters only – באנגלית בלבד" },
  { name: "email", label: "אימייל", placeholder: "email@example.com", type: "email" },
  { name: "phone", label: "מספר טלפון (ללא קידומת)", placeholder: "501234567", type: "tel" },
  { name: "address", label: "כתובת מגורים (רחוב ומספר)", placeholder: "Herzl 1", hint: "English letters only – באנגלית בלבד" },
  { name: "city", label: "עיר", placeholder: "Tel Aviv", hint: "English letters only – באנגלית בלבד" },
  { name: "postalCode", label: "מיקוד", placeholder: "6100000" },
  { name: "taxId", label: "מספר תעודת זהות", placeholder: "123456789" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - 18 - i);
const months = [
  { value: "01", label: "ינואר" }, { value: "02", label: "פברואר" },
  { value: "03", label: "מרץ" }, { value: "04", label: "אפריל" },
  { value: "05", label: "מאי" }, { value: "06", label: "יוני" },
  { value: "07", label: "יולי" }, { value: "08", label: "אוגוסט" },
  { value: "09", label: "ספטמבר" }, { value: "10", label: "אוקטובר" },
  { value: "11", label: "נובמבר" }, { value: "12", label: "דצמבר" },
];

function getDaysInMonth(year: string, month: string) {
  if (!year || !month) return Array.from({ length: 31 }, (_, i) => i + 1);
  const d = new Date(parseInt(year), parseInt(month), 0).getDate();
  return Array.from({ length: d }, (_, i) => i + 1);
}

const STORAGE_KEY = "pending_kyc_data";
const MISSING_KYC_ERROR = "Missing KYC data";

function logClaimStep(message: string, details?: unknown) {
  if (details !== undefined) {
    console.log(`[ClaimStockGift] ${message}`, details);
    return;
  }

  console.log(`[ClaimStockGift] ${message}`);
}

function savePendingKyc(data: Record<string, unknown>) {
  try {
    logClaimStep("Saving pending KYC data", {
      giftId: data.giftId,
      email: data.email,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("[ClaimStockGift] Failed to save pending KYC data", error);
  }
}
function loadPendingKyc(): Record<string, any> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    logClaimStep("LocalStorage found", { found: !!raw });

    if (!raw) return null;

    const parsed = JSON.parse(raw);
    logClaimStep("LocalStorage parsed", {
      giftId: parsed?.giftId ?? null,
      email: parsed?.email ?? null,
    });

    if (typeof parsed === "object" && parsed !== null && parsed.giftId) return parsed;

    console.error("[ClaimStockGift] LocalStorage data invalid");
    return null;
  } catch (error) {
    console.error("[ClaimStockGift] Failed to load pending KYC data", error);
    return null;
  }
}
function clearPendingKyc() {
  try {
    logClaimStep("Clearing pending KYC data");
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("[ClaimStockGift] Failed to clear pending KYC data", error);
  }
}

function buildClaimRedirectUrl(giftId: string) {
  const redirectUrl = new URL("/claim", window.location.origin);
  redirectUrl.searchParams.set("giftId", giftId);

  logClaimStep("emailRedirectTo prepared", {
    redirectUrl: redirectUrl.toString(),
    giftId,
  });

  return redirectUrl.toString();
}

type FlowState = "initializing" | "form" | "waitingForEmail" | "processingAuth";

export default function ClaimStockGift() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const giftId = searchParams.get("giftId");

  const [flowState, setFlowState] = useState<FlowState>("initializing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [giftAmount, setGiftAmount] = useState<number | null>(null);
  const [loadingGift, setLoadingGift] = useState(true);
  const [sentEmail, setSentEmail] = useState("");

  // Guard to prevent double-invocation of processGiftClaim
  const resumingRef = useRef(false);

  // Process the Alpaca flow after auth
  const processGiftClaim = useCallback(async (userId: string) => {
    logClaimStep("processGiftClaim called", { userId, giftId });

    if (resumingRef.current) {
      logClaimStep("Resume already in progress, skipping duplicate call", { userId });
      return;
    }

    resumingRef.current = true;

    const pendingData = loadPendingKyc();
    const giftIdMatches = !!pendingData?.giftId && pendingData.giftId === giftId;

    logClaimStep("Gift ID match", {
      matches: giftIdMatches,
      currentGiftId: giftId,
      storedGiftId: pendingData?.giftId ?? null,
      source: "processGiftClaim",
    });

    setFlowState("processingAuth");
    setErrorMessage("");

    try {
      logClaimStep("Auth detected", { userId, source: "processGiftClaim" });

      const { data: profile } = await supabase
        .from("profiles")
        .select("alpaca_account_id")
        .eq("user_id", userId)
        .maybeSingle();

      logClaimStep("Profile lookup complete", {
        userId,
        hasAlpacaAccount: !!profile?.alpaca_account_id,
      });

      if (profile?.alpaca_account_id) {
        logClaimStep("Existing Alpaca account found, redirecting to dashboard", {
          userId,
          alpacaAccountId: profile.alpaca_account_id,
        });
        clearPendingKyc();
        navigate("/dashboard");
        return;
      }

      if (!pendingData) {
        console.error("[ClaimStockGift] Authenticated user but pending KYC data is missing", {
          userId,
          currentGiftId: giftId,
        });
        setErrorMessage(MISSING_KYC_ERROR);
        setFlowState("processingAuth");
        resumingRef.current = false;
        return;
      }

      if (!giftIdMatches) {
        console.error("[ClaimStockGift] Gift ID mismatch", {
          currentGiftId: giftId,
          storedGiftId: pendingData.giftId,
        });
        setErrorMessage("Gift ID mismatch");
        setFlowState("processingAuth");
        resumingRef.current = false;
        return;
      }

      logClaimStep("Invoking create-and-fund-gift", {
        userId,
        giftId: pendingData.giftId,
        email: pendingData.email,
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("הפעולה לקחה יותר מדי זמן. נסה/י שוב.")), 30000)
      );

      const invokePromise = supabase.functions.invoke("create-and-fund-gift", {
        body: { userData: { ...pendingData, userId } },
      });

      const { data: result, error } = await Promise.race([invokePromise, timeoutPromise]);

      logClaimStep("create-and-fund-gift response received", { result, hasError: !!error });

      if (error) throw new Error(error.message);
      if (result && !result.success) {
        console.error("[ClaimStockGift] create-and-fund-gift returned failure", result);
        if (result.alreadyClaimed) {
          setErrorMessage("מתנה זו כבר מומשה");
        } else {
          setErrorMessage(result.error || "אירעה שגיאה, נסו שוב מאוחר יותר");
        }
        resumingRef.current = false;
        return;
      }

      if (result?.alreadyExists) {
        logClaimStep("Existing account returned from edge function, redirecting to dashboard", result);
        clearPendingKyc();
        navigate("/dashboard");
        return;
      }

      clearPendingKyc();
      logClaimStep("Claim completed successfully, navigating to celebration", result);

      navigate("/gift-celebration", {
        state: {
          giftAmountNIS: result.giftAmountNIS,
          giftAmountUSD: result.giftAmountUSD,
          exchangeRate: result.exchangeRate,
          accountStatus: result.accountStatus,
          needsApproval: result.needsApproval,
        },
      });
    } catch (err: any) {
      console.error("[ClaimStockGift] processGiftClaim failed", err);
      setErrorMessage(err.message || "אירעה שגיאה, נסו שוב מאוחר יותר");
      resumingRef.current = false;
    }
  }, [giftId, navigate]);

  // ─── Mount-time: smart redirect or auto-resume ───
  useEffect(() => {
    let cancelled = false;

    logClaimStep("Component mounted", {
      currentUrl: window.location.href,
      giftId,
    });

    (async () => {
      logClaimStep("Checking session on mount");
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      logClaimStep("Session check complete", {
        authenticated: !!session?.user,
        userId: session?.user?.id ?? null,
      });

      if (session?.user) {
        logClaimStep("Auth detected", { userId: session.user.id, source: "mount" });

        const { data: profile } = await supabase
          .from("profiles")
          .select("alpaca_account_id")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (cancelled) return;

        logClaimStep("Mount profile lookup complete", {
          userId: session.user.id,
          hasAlpacaAccount: !!profile?.alpaca_account_id,
        });

        if (profile?.alpaca_account_id) {
          clearPendingKyc();
          navigate("/dashboard");
          return;
        }

        const pending = loadPendingKyc();
        const giftIdMatches = !!pending?.giftId && pending.giftId === giftId;

        logClaimStep("Gift ID match", {
          matches: giftIdMatches,
          currentGiftId: giftId,
          storedGiftId: pending?.giftId ?? null,
          source: "mount",
        });

        if (pending && giftIdMatches) {
          logClaimStep("Resuming claim from mount effect", { userId: session.user.id });
          void processGiftClaim(session.user.id);
          return;
        }

        if (pending && !giftIdMatches) {
          console.error("[ClaimStockGift] Pending KYC data found but gift ID does not match on mount", {
            currentGiftId: giftId,
            storedGiftId: pending.giftId,
          });
          setErrorMessage("Gift ID mismatch");
          setFlowState("processingAuth");
          return;
        }

        console.error("[ClaimStockGift] Authenticated user without pending KYC data on mount", {
          userId: session.user.id,
          currentGiftId: giftId,
        });
        setErrorMessage(MISSING_KYC_ERROR);
        setFlowState("processingAuth");
        return;
      }

      logClaimStep("No authenticated user on mount, showing form");
      if (!cancelled) setFlowState("form");
    })();

    return () => { cancelled = true; };
  }, [giftId, navigate, processGiftClaim]);

  // Listen for auth state changes (magic link callback)
  useEffect(() => {
    logClaimStep("Subscribing to auth state changes");

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        logClaimStep("Auth state change", {
          event,
          authenticated: !!session?.user,
          userId: session?.user?.id ?? null,
          giftId,
        });

        if (event === "SIGNED_IN" && session?.user) {
          logClaimStep("Auth detected", { userId: session.user.id, source: "auth_listener" });

          const pending = loadPendingKyc();
          const giftIdMatches = !!pending?.giftId && pending.giftId === giftId;

          logClaimStep("Gift ID match", {
            matches: giftIdMatches,
            currentGiftId: giftId,
            storedGiftId: pending?.giftId ?? null,
            source: "auth_listener",
          });

          if (pending && giftIdMatches) {
            logClaimStep("Resuming claim from auth listener", { userId: session.user.id });
            void processGiftClaim(session.user.id);
            return;
          }

          if (pending && !giftIdMatches) {
            console.error("[ClaimStockGift] Pending KYC data found but gift ID does not match after auth", {
              currentGiftId: giftId,
              storedGiftId: pending.giftId,
            });
            setErrorMessage("Gift ID mismatch");
            setFlowState("processingAuth");
            return;
          }

          console.error("[ClaimStockGift] Authenticated user without pending KYC data after magic link", {
            userId: session.user.id,
            currentGiftId: giftId,
          });
          setErrorMessage(MISSING_KYC_ERROR);
          setFlowState("processingAuth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [giftId, processGiftClaim]);

  // Fetch gift amount from DB on mount
  useEffect(() => {
    if (!giftId) {
      setErrorMessage("קישור לא תקין – חסר מזהה מתנה");
      setLoadingGift(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("gifts")
        .select("total_amount")
        .eq("id", giftId)
        .single();
      if (error || !data) {
        setErrorMessage("מתנה לא נמצאה, אנא ודא שהקישור תקין");
      } else {
        setGiftAmount(Number(data.total_amount));
      }
      setLoadingGift(false);
    })();
  }, [giftId]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", phone: "",
      address: "", city: "", postalCode: "", taxId: "",
      dobYear: "", dobMonth: "", dobDay: "",
    },
  });

  const watchedYear = form.watch("dobYear");
  const watchedMonth = form.watch("dobMonth");
  const days = getDaysInMonth(watchedYear, watchedMonth);

  const filledCount = Object.keys(form.watch()).filter((key) => {
    const val = form.watch(key as keyof FormValues);
    return val && (typeof val === "string" ? val.length > 0 : true);
  }).length;
  const totalFields = 11;
  const progress = Math.round((filledCount / totalFields) * 100);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const dob = `${data.dobYear}-${data.dobMonth}-${data.dobDay.padStart(2, "0")}`;
    const phoneWithCode = `+972${data.phone.replace(/^0/, "")}`;

    const kycPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: phoneWithCode,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      dob,
      taxId: data.taxId,
      giftId,
    };

    // Persist to localStorage so it survives tab switches
    savePendingKyc(kycPayload);

    try {
      const redirectUrl = `${window.location.origin}/claim?giftId=${giftId}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: data.email,
        options: { emailRedirectTo: redirectUrl },
      });

      if (error) throw new Error(error.message);

      setSentEmail(data.email);
      setFlowState("waitingForEmail");
    } catch (err: any) {
      setErrorMessage(err.message || "שגיאה בשליחת קוד אימות");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading / initializing state ──
  if (loadingGift || flowState === "initializing") {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // ── Error: no gift ──
  if (!giftId || (!giftAmount && errorMessage)) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Card className="max-w-md border-[3px] border-white shadow-lg rounded-3xl">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-4xl">⚠️</div>
            <p className="text-lg font-bold text-destructive">{errorMessage}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Processing auth (after magic link) ──
  if (flowState === "processingAuth") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Card className="max-w-md w-full border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl">
          <CardContent className="pt-10 pb-10 text-center space-y-6">
            {errorMessage ? (
              <>
                <div className="text-5xl">⚠️</div>
                <h2 className="text-2xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(0, 72%, 51%)" }}>
                  משהו השתבש
                </h2>
                <pre className="text-xs text-destructive font-mono text-right bg-destructive/10 rounded-2xl p-4 border-2 border-destructive/30 whitespace-pre-wrap break-all overflow-auto max-h-40" dir="ltr">
                  {errorMessage}
                </pre>
                <Button
                  className="w-full h-14 text-lg font-black rounded-2xl"
                  style={{
                    background: "hsl(220, 91%, 63%)",
                    color: "white",
                    boxShadow: "0 6px 0 hsl(220, 91%, 48%), 0 8px 20px rgba(76, 126, 251, 0.35)",
                  }}
                  onClick={async () => {
                    setErrorMessage("");
                    resumingRef.current = false;
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session?.user) {
                      await processGiftClaim(session.user.id);
                    } else {
                      setErrorMessage("לא נמצא חיבור פעיל. נסה/י להתחבר שוב.");
                      setFlowState("form");
                    }
                  }}
                >
                  🔄 נסה/י שוב
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl"
                  onClick={() => {
                    setErrorMessage("");
                    resumingRef.current = false;
                    setFlowState("form");
                  }}
                >
                  חזרה לטופס
                </Button>
              </>
            ) : (
              <>
                <Loader2 className="h-16 w-16 animate-spin mx-auto" style={{ color: "hsl(220, 91%, 53%)" }} />
                <h2 className="text-2xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(220, 91%, 53%)" }}>
                  מאמתים את הפרטים ומקימים את תיק ההשקעות שלך...
                </h2>
                <p className="text-muted-foreground font-medium">
                  זה עשוי לקחת עד 30 שניות ⏳
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Waiting for email ──
  if (flowState === "waitingForEmail") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Card className="max-w-md w-full border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl">
          <CardContent className="pt-10 pb-10 text-center space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center border-[4px] border-white shadow-[0_6px_0_hsl(220,91%,48%),0_8px_20px_rgba(0,0,0,0.15)]"
              style={{ background: "linear-gradient(135deg, hsl(220, 91%, 85%), hsl(220, 91%, 70%))" }}>
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(220, 91%, 53%)" }}>
              בדוק/י את תיבת המייל 📬
            </h2>
            <p className="text-muted-foreground font-medium leading-relaxed">
              שלחנו קישור אימות לכתובת
            </p>
            <div className="rounded-2xl border-[3px] border-white p-4 shadow-[0_4px_15px_rgba(0,0,0,0.08)]" style={{ background: "hsl(220, 63%, 96%)" }}>
              <p className="text-lg font-bold" dir="ltr" style={{ color: "hsl(220, 91%, 53%)" }}>
                {sentEmail}
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              לחצ/י על הקישור במייל כדי לאמת ולהמשיך בתהליך.
              <br />
              אם לא קיבלת, בדוק/י גם בתיקיית הספאם.
            </p>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => setFlowState("form")}
            >
              חזרה לטופס
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Main form ──
  return (
    <div className="min-h-screen py-8 px-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-20 h-20 rounded-full border-[3px] border-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] flex items-center justify-center text-4xl" style={{ background: "hsl(42, 100%, 65%)" }}>
            🎁
          </div>
          <h1 className="text-3xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(var(--stock4u-happy-blue))" }}>
            מימוש מתנת מניות
          </h1>
          {giftAmount && (
            <p className="text-2xl font-black" style={{ color: "hsl(145, 63%, 42%)" }}>
              ₪{giftAmount.toLocaleString()}
            </p>
          )}
          <p className="text-muted-foreground text-sm font-medium">
            מלא/י את הפרטים הבאים כדי לפתוח חשבון השקעות 🚀
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-1.5 border-[3px] border-white rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.08)]" style={{ background: "hsl(0, 0%, 100%)" }}>
          <div className="flex justify-between text-xs font-bold text-muted-foreground">
            <span>התקדמות המשימה</span>
            <span style={{ color: "hsl(var(--stock4u-happy-blue))" }}>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 rounded-full" />
        </div>

        {/* Form */}
        <Card className="border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((f) => (
                  <FormField
                    key={f.name}
                    control={form.control}
                    name={f.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-foreground">{f.label}</FormLabel>
                        {f.hint && (
                          <p className="text-xs text-muted-foreground mt-0.5">🔤 {f.hint}</p>
                        )}
                        <FormControl>
                          <Input
                            placeholder={f.placeholder}
                            type={f.type || "text"}
                            className="rounded-2xl h-12 border-2 border-muted focus:border-[hsl(220,91%,63%)] transition-colors text-base"
                            dir="ltr"
                            {...field}
                            value={field.value as string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Date of Birth - Year/Month/Day Dropdowns */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">תאריך לידה</label>
                  <div className="grid grid-cols-3 gap-3">
                    <FormField control={form.control} name="dobYear" render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-2xl h-12 border-2 border-muted text-base">
                              <SelectValue placeholder="שנה" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {years.map((y) => (
                              <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="dobMonth" render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-2xl h-12 border-2 border-muted text-base">
                              <SelectValue placeholder="חודש" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((m) => (
                              <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="dobDay" render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-2xl h-12 border-2 border-muted text-base">
                              <SelectValue placeholder="יום" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {days.map((d) => (
                              <SelectItem key={d} value={d.toString()}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {errorMessage && (
                  <pre className="text-xs text-destructive font-mono text-right bg-destructive/10 rounded-2xl p-4 border-2 border-destructive/30 whitespace-pre-wrap break-all overflow-auto max-h-64" dir="ltr">{errorMessage}</pre>
                )}

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-black mt-4 rounded-2xl transition-all duration-200 hover:translate-y-[-2px] active:translate-y-[1px]"
                  style={{
                    background: "hsl(220, 91%, 63%)",
                    color: "white",
                    boxShadow: "0 6px 0 hsl(220, 91%, 48%), 0 8px 20px rgba(76, 126, 251, 0.35)",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      שולח קישור אימות...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="ml-2 h-6 w-6" />
                      אישור ופתיחת חשבון 🚀
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed font-medium">
                  🔒 הפרטים שלך מאובטחים ומוגנים בהתאם לתקנות הרגולציה הפיננסית
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Legal disclaimers */}
        <div className="space-y-3 px-2">
          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            סכום זה מוצג בערכי ברוטו. המרת המט״ח וביצוע הרכישה כפופים לעמלות מסחר ושער חליפין רציף.
          </p>
          <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed border-t border-muted pt-3">
            השירות ניתן כפלטפורמה טכנולוגית בלבד ואינו מהווה ייעוץ השקעות או ניהול תיקים לפי חוק הייעוץ הישראלי.
          </p>
        </div>
      </div>
    </div>
  );
}
