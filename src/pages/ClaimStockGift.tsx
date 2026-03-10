import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
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

const ENGLISH_ONLY_REGEX = /^[A-Za-z\s\-'".,:;()0-9/]+$/;
const HEBREW_REGEX = /[\u0590-\u05FF]/;

const formSchema = z.object({
  firstName: z.string().min(2, "שם פרטי חייב להכיל לפחות 2 תווים").max(100)
    .regex(ENGLISH_ONLY_REGEX, "Please use English letters only – אנא הקלד באנגלית בלבד"),
  lastName: z.string().min(2, "שם משפחה חייב להכיל לפחות 2 תווים").max(100)
    .regex(ENGLISH_ONLY_REGEX, "Please use English letters only – אנא הקלד באנגלית בלבד"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  phone: z.string().regex(/^\d{9,10}$/, "מספר טלפון חייב להכיל 9-10 ספרות (ללא קידומת מדינה)"),
  address: z.string().min(5, "כתובת חייבת להכיל לפחות 5 תווים")
    .regex(ENGLISH_ONLY_REGEX, "Please use English letters only – אנא הקלד באנגלית בלבד"),
  city: z.string().min(2, "עיר חייבת להכיל לפחות 2 תווים")
    .regex(ENGLISH_ONLY_REGEX, "Please use English letters only – אנא הקלד באנגלית בלבד"),
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

function loadOnfidoSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Onfido) return resolve();
    const script = document.createElement("script");
    script.src = "https://sdk.onfido.com/v14";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Onfido SDK"));
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://sdk.onfido.com/v14/style.css";
    document.head.appendChild(link);
  });
}

export default function ClaimStockGift() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [onfidoToken, setOnfidoToken] = useState<string | null>(null);
  const [onfidoLoaded, setOnfidoLoaded] = useState(false);

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

    const payload = {
      userData: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: phoneWithCode,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        dob,
        taxId: data.taxId,
      },
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const { data: result, error } = await supabase.functions.invoke("create-alpaca-account", {
        body: payload,
      });

      if (error) throw new Error(error.message);

      if (result && !result.success) {
        // DEBUG MODE: Show raw error from Edge Function
        const rawDebug = JSON.stringify(result, null, 2);
        setErrorMessage(`RAW RESPONSE:\n${rawDebug}`);
        console.error("Alpaca error details:", result);
        return;
      }

      if (result?.onfidoToken) {
        setOnfidoToken(result.onfidoToken);
        try {
          await loadOnfidoSdk();
          setOnfidoLoaded(true);
        } catch {
          setOnfidoLoaded(false);
        }
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "אירעה שגיאה, נסו שוב מאוחר יותר");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Onfido SDK mount effect
  const onfidoContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (onfidoToken && onfidoLoaded && onfidoContainerRef.current) {
      try {
        const Onfido = (window as any).Onfido;
        if (Onfido) {
          Onfido.init({
            token: onfidoToken,
            containerId: "onfido-mount",
            onComplete: () => {
              setIsSuccess(true);
              setOnfidoToken(null);
            },
            steps: ["document"],
            language: { locale: "he" },
          });
        }
      } catch (err) {
        console.error("Failed to init Onfido SDK:", err);
        setOnfidoLoaded(false);
      }
    }
  }, [onfidoToken, onfidoLoaded]);

  // Show Onfido SDK or token fallback
  if (onfidoToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Card className="w-full max-w-lg border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl">
          <CardContent className="pt-8 pb-8 space-y-6">
            {onfidoLoaded ? (
              <>
                <h2 className="text-2xl font-black text-center" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(var(--stock4u-happy-blue))" }}>
                  📄 אימות מסמכים
                </h2>
                <p className="text-sm text-muted-foreground text-center">העלה את תעודת הזהות שלך לצורך אימות</p>
                <div id="onfido-mount" ref={onfidoContainerRef} className="min-h-[400px]" />
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: "hsl(42, 100%, 65%)" }}>
                  ✅
                </div>
                <h2 className="text-2xl font-black" style={{ fontFamily: "'Rubik', sans-serif", color: "hsl(var(--stock4u-happy-blue))" }}>
                  הפרטים נשלחו בהצלחה!
                </h2>
                <p className="text-sm text-muted-foreground">טוקן האימות שלך:</p>
                <div className="bg-muted rounded-2xl p-4 break-all text-xs font-mono text-foreground border-2 border-muted">
                  {onfidoToken}
                </div>
                <p className="text-xs text-muted-foreground">שמור את הטוקן הזה – צוות Stock4U יצור איתך קשר להמשך התהליך.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" dir="rtl" style={{ background: "hsl(220, 63%, 92%)" }}>
        <Card className="w-full max-w-md text-center border-[3px] border-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] rounded-3xl">
          <CardContent className="pt-12 pb-10 space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center text-5xl" style={{ background: "hsl(142, 71%, 90%)" }}>
              🎉
            </div>
            <h1 className="text-3xl font-black text-foreground" style={{ fontFamily: "'Rubik', sans-serif" }}>
              מזל טוב!
            </h1>
            <p className="text-lg font-semibold" style={{ color: "hsl(142, 71%, 35%)" }}>
              מזל טוב! החשבון נשלח לאישור אלפאקה
            </p>
            <p className="text-sm text-muted-foreground">
              נעדכן אותך במייל ברגע שהחשבון יהיה מוכן לשימוש.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                    {/* Year */}
                    <FormField
                      control={form.control}
                      name="dobYear"
                      render={({ field }) => (
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
                      )}
                    />
                    {/* Month */}
                    <FormField
                      control={form.control}
                      name="dobMonth"
                      render={({ field }) => (
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
                      )}
                    />
                    {/* Day */}
                    <FormField
                      control={form.control}
                      name="dobDay"
                      render={({ field }) => (
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
                      )}
                    />
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
                      יוצרים את החשבון...
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
      </div>
    </div>
  );
}
