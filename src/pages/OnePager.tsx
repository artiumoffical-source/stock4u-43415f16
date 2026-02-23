import { useEffect } from "react";
import { Shield, Scale, Cpu, Users, TrendingUp, DollarSign, Download, ArrowLeftRight, UserCheck, Zap } from "lucide-react";

import dollarMascot from "@/assets/investor/dollar-mascot.png";
import giftMascot from "@/assets/investor/gift-mascot.png";
import shekelMascot from "@/assets/investor/shekel-mascot.png";
import percentMascot from "@/assets/investor/percent-mascot.png";
import sparkIcon from "@/assets/investor/spark-icon.png";
import starIcon from "@/assets/investor/star-icon.png";

export default function OnePager() {
  useEffect(() => {
    document.title = "Stock4U | שותפות אסטרטגית (חסוי)";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
      document.title = "Stock4U";
    };
  }, []);

  return (
    <>
      <style>{`
        @media print {
          body { margin:0; padding:0; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
          .a4-page { box-shadow:none!important; margin:0!important; border-radius:0!important; width:210mm!important; min-height:297mm!important; max-height:297mm!important; overflow:hidden!important; }
          @page { size:A4 portrait; margin:0; }
        }
      `}</style>

      <div
        dir="rtl"
        className="min-h-screen flex items-start justify-center py-10 print:py-0 print:bg-white"
        style={{ fontFamily: "'Montserrat', sans-serif", background: "#CBD5E1" }}
      >
        <div
          className="a4-page overflow-hidden w-full"
          style={{
            maxWidth: "210mm",
            borderRadius: "12px",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.35)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ━━━━━━━━━━ HERO ━━━━━━━━━━ */}
          <div
            className="relative overflow-hidden px-4 sm:px-8"
            style={{ background: "#0B192E", paddingTop: "28px", paddingBottom: "24px" }}
          >
            <img
              src={dollarMascot}
              alt=""
              aria-hidden="true"
              className="absolute left-3 bottom-0 w-[90px] select-none hidden sm:block"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
            />
            <img src={sparkIcon} alt="" aria-hidden="true" className="absolute top-4 left-28 w-5 opacity-30 select-none" />
            <img src={starIcon} alt="" aria-hidden="true" className="absolute bottom-3 right-[38%] w-4 opacity-20 select-none" />

            <div className="relative z-[1] max-w-full sm:max-w-[75%]">
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D399" }} />
                <span style={{ color: "#34D399", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em" }}>
                  שותפות אסטרטגית · חסוי
                </span>
              </div>

              <h1 className="text-lg sm:text-[22px]" style={{ fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: "6px" }}>
                שותפות אסטרטגית:{" "}
                <span style={{ color: "#34D399" }}>Stock4U ומיטב טרייד</span>
              </h1>

              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", lineHeight: 1.6, fontWeight: 500, marginBottom: "12px" }}>
                הפיכת השקעות למתנות. מנוע הצמיחה החדש של מיטב לדור הבא של המשקיעים.
              </p>

              <button
                style={{
                  background: "linear-gradient(135deg, #10B981, #14B8A6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Download size={13} />
                הורד מפרט טכני
              </button>
            </div>
          </div>

          {/* ━━━━━━━━━━ BODY ━━━━━━━━━━ */}
          <div className="px-4 sm:px-8" style={{ background: "#FFFFFF", paddingTop: "18px", paddingBottom: "14px", flex: 1 }}>

            {/* Row 1: The Opportunity */}
            <SectionLabel>השוק משתנה</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 mb-4">
              <InfoCard
                icon={<TrendingUp size={14} color="#10B981" />}
                title="ולידציית שוק"
                text="המהלך של אקסלנס ו-BuyMe מוכיח את הביקוש. Stock4U מציעה נכס פיננסי אמיתי ולא צריכה חד פעמית."
              />
              <InfoCard
                icon={<Users size={14} color="#10B981" />}
                title="יתרון מבדל"
                text="מתנת מניות יוצרת חשבון השקעות פעיל. מיטב מקבלת לקוח חדש והמקבל מקבל חינוך פיננסי."
              />
            </div>

            {/* Row 2: חשבון מעבר Infrastructure */}
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                padding: "14px 18px",
                marginBottom: "14px",
                position: "relative",
              }}
            >
              <img
                src={percentMascot}
                alt=""
                aria-hidden="true"
                className="absolute select-none hidden sm:block"
                style={{ left: "8px", top: "-12px", width: "44px", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.2))" }}
              />

              <SectionLabel>תשתית: פתרון חשבון המעבר</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2.5">
                <StepCard
                  num={1}
                  icon={<DollarSign size={14} color="#10B981" />}
                  title="חשבון נאמנות"
                  text="הפקדת כספים לחשבון מעבר מנוהל על ידי מיטב עם שקיפות מלאה ובקרה רגולטורית."
                />
                <StepCard
                  num={2}
                  icon={<UserCheck size={14} color="#10B981" />}
                  title="הצטרפות חלקה"
                  text="המקבל פותח חשבון מיטב דרך תהליך זיהוי דיגיטלי מלא ללא ניירת."
                />
                <StepCard
                  num={3}
                  icon={<Zap size={14} color="#10B981" />}
                  title="ביצוע"
                  text="העברה אוטומטית מחשבון הנאמנות לחשבון האישי עם הפעלת המתנה."
                />
              </div>
            </div>

            {/* Row 3: Compliance & Tech */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <SectionLabel>מסגרת רגולטורית</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                  <MoatRow
                    icon={<Shield size={14} color="#10B981" />}
                    title="מודל שובר"
                    text="המתנה מוגדרת כשובר ולא כייעוץ השקעות או ניהול תיקים."
                  />
                  <MoatRow
                    icon={<Scale size={14} color="#10B981" />}
                    title="הפעלה עצמאית"
                    text="המקבל מפעיל את המתנה באופן עצמאי. פעולה יזומה שמבדילה מהגדרת שיווק השקעות."
                  />
                </div>
              </div>
              <div>
                <SectionLabel>אינטגרציה דיגיטלית</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                  <MoatRow
                    icon={<Cpu size={14} color="#10B981" />}
                    title="הצטרפות דיגיטלית"
                    text="פתיחת חשבון בממשק ישירות למערכות מיטב עם חוויית משתמש חלקה."
                  />
                  <MoatRow
                    icon={<ArrowLeftRight size={14} color="#10B981" />}
                    title="ביצוע אוטומטי"
                    text="ביצוע אוטומטי של רכישות ניירות ערך עם אישור המקבל."
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Business Model */}
            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "12px", position: "relative" }}>
              <img
                src={shekelMascot}
                alt=""
                aria-hidden="true"
                className="absolute select-none"
                style={{ left: "0", bottom: "-4px", width: "40px", opacity: 0.15 }}
              />
              <SectionLabel>שותפות מבוססת הצלחה</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2.5">
                <ValueCard
                  icon={<Users size={16} color="#065F46" />}
                  title="עלות לחשבון פעיל"
                  subtitle="לכל חשבון שהופעל"
                  text="תשלום לפי ביצוע רק על חשבונות שהופעלו בפועל."
                />
                <ValueCard
                  icon={<TrendingUp size={16} color="#065F46" />}
                  title="שיתוף הכנסות"
                  subtitle="עמלות מסחר"
                  text="שיתוף הכנסות מעמלות מסחר של לקוחות שהגיעו דרך Stock4U."
                />
                <ValueCard
                  icon={<DollarSign size={16} color="#065F46" />}
                  title="נכסים מנוהלים איכותיים"
                  subtitle="ללא עלות גיוס"
                  text="מיטב מקבלת נכסים מנוהלים איכותיים ללא עלות גיוס לקוח."
                />
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━ FOOTER ━━━━━━━━━━ */}
          <div className="px-4 sm:px-8" style={{ background: "#0B192E", paddingTop: "8px", paddingBottom: "8px", textAlign: "center", position: "relative" }}>
            <p style={{ color: "#64748B", fontSize: "9px", fontWeight: 500 }}>
              חסוי. מיועד לנמען בלבד. © {new Date().getFullYear()} Stock4U Ltd.
            </p>
            <img
              src={giftMascot}
              alt=""
              aria-hidden="true"
              className="select-none"
              style={{
                position: "absolute",
                left: "8px",
                bottom: "0",
                width: "56px",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.25))",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Sub-components ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#10B981", fontWeight: 800, fontSize: "10px", letterSpacing: "0.12em" }}>
      {children}
    </p>
  );
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: "10px",
        padding: "10px 14px",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
        {icon}
        <p style={{ fontSize: "12px", fontWeight: 800, color: "#0F172A" }}>{title}</p>
      </div>
      <p style={{ fontSize: "10px", fontWeight: 500, color: "#475569", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

function StepCard({ num, icon, title, text }: { num: number; icon: React.ReactNode; title: string; text: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: "8px",
        padding: "10px 12px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-8px",
          right: "10px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10B981, #14B8A6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "10px",
          fontWeight: 800,
        }}
      >
        {num}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px", marginTop: "4px" }}>
        {icon}
        <p style={{ fontSize: "11px", fontWeight: 800, color: "#0F172A" }}>{title}</p>
      </div>
      <p style={{ fontSize: "9.5px", fontWeight: 500, color: "#475569", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

function MoatRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: "8px",
        padding: "8px 10px",
        display: "flex",
        gap: "8px",
        alignItems: "flex-start",
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ marginTop: "2px", flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ fontWeight: 800, color: "#0F172A", fontSize: "11px" }}>{title}</p>
        <p style={{ fontWeight: 500, color: "#475569", fontSize: "10px", lineHeight: 1.4 }}>{text}</p>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, subtitle, text }: { icon: React.ReactNode; title: string; subtitle: string; text: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: "10px",
        padding: "10px 14px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "4px" }}>{icon}</div>
      <p style={{ fontSize: "14px", fontWeight: 800, color: "#065F46" }}>{title}</p>
      <p style={{ fontSize: "9px", fontWeight: 700, color: "#10B981", marginBottom: "4px" }}>{subtitle}</p>
      <p style={{ fontSize: "9.5px", fontWeight: 500, color: "#475569", lineHeight: 1.4 }}>{text}</p>
    </div>
  );
}
