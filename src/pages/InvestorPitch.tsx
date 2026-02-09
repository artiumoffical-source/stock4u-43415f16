import { useEffect } from "react";
import { Mail, Phone, Globe, Shield, Scale, Cpu } from "lucide-react";

import dollarMascot from "@/assets/investor/dollar-mascot.png";
import giftMascot from "@/assets/investor/gift-mascot.png";
import shekelMascot from "@/assets/investor/shekel-mascot.png";
import percentMascot from "@/assets/investor/percent-mascot.png";
import sparkIcon from "@/assets/investor/spark-icon.png";
import starIcon from "@/assets/investor/star-icon.png";
import artiumHeadshot from "@/assets/investor/artium-headshot.png";

const fundingItems = [
  { label: "Legal & Regulation", pct: 20, amount: "₪170K" },
  { label: "R&D & Security Audit", pct: 30, amount: "₪255K" },
  { label: "Viral Marketing & GTM", pct: 30, amount: "₪255K" },
  { label: "Operations & Salary", pct: 20, amount: "₪170K" },
];

export default function InvestorPitch() {
  useEffect(() => {
    document.title = "Stock4U | Investor One-Pager (Confidential)";
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
        dir="ltr"
        className="min-h-screen flex items-start justify-center py-10 print:py-0 print:bg-white"
        style={{ fontFamily: "'Montserrat', sans-serif", background: "#CBD5E1" }}
      >
        <div
          className="a4-page overflow-hidden"
          style={{
            width: "210mm",
            minHeight: "297mm",
            maxHeight: "297mm",
            maxWidth: "100vw",
            borderRadius: "12px",
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.35)",
            position: "relative",
          }}
        >
          {/* ━━━━━━━━━━ HERO (Navy) ━━━━━━━━━━ */}
          <div
            className="relative overflow-hidden"
            style={{ background: "#0B192E", padding: "28px 32px 24px" }}
          >
            {/* Dollar mascot: top-right corner, 100% opaque, margin only */}
            <img
              src={dollarMascot}
              alt=""
              aria-hidden="true"
              className="absolute right-3 bottom-0 w-[90px] select-none"
              style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}
            />
            <img src={sparkIcon} alt="" aria-hidden="true" className="absolute top-4 right-28 w-5 opacity-30 select-none" />
            <img src={starIcon} alt="" aria-hidden="true" className="absolute bottom-3 left-[38%] w-4 opacity-20 select-none" />

            <div className="relative z-[1]" style={{ maxWidth: "75%" }}>
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D399" }} />
                <span style={{ color: "#34D399", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em" }}>
                  PRE-SEED · CONFIDENTIAL
                </span>
              </div>

              <h1 style={{ fontSize: "22px", fontWeight: 800, lineHeight: 1.2, color: "#fff", marginBottom: "6px" }}>
                Stock4U: Wealth Gifting{" "}
                <span style={{ color: "#34D399" }}>Reimagined</span>
              </h1>

              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", lineHeight: 1.6, fontWeight: 500 }}>
                Converting ₪600M in unredeemed "Dead Money" into long-term wealth.
              </p>
            </div>
          </div>

          {/* ━━━━━━━━━━ BODY (White) ━━━━━━━━━━ */}
          <div style={{ background: "#FFFFFF", padding: "20px 32px 16px" }}>

            {/* Row 1: Market + Moat */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>

              {/* Market Opportunity */}
              <div>
                <SectionLabel>Market Opportunity</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                  <DataCard value="₪4 Billion" label="Total addressable market (Israeli gift cards)" />
                  <DataCard value="₪600M (15%)" label="Annual unredeemed breakage we capture" />
                </div>
              </div>

              {/* Moat */}
              <div>
                <SectionLabel>Institutional Grade Infrastructure</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                  <MoatRow
                    icon={<Scale size={14} color="#10B981" />}
                    title="Legal Advisory"
                    text="Barnea Law Firm (Dr. Zvi Gabbay), Israel's top fintech regulatory practice."
                  />
                  <MoatRow
                    icon={<Shield size={14} color="#10B981" />}
                    title="Regulatory Path"
                    text="Payment Services Act exemption, up to ₪5M/month turnover."
                  />
                  <MoatRow
                    icon={<Cpu size={14} color="#10B981" />}
                    title="Financial Backend"
                    text="Advanced integration with institutional-grade brokerage APIs for seamless execution."
                  />
                </div>
              </div>
            </div>

            {/* Row 2: The Ask */}
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                padding: "14px 20px",
                marginBottom: "14px",
                position: "relative",
              }}
            >
              {/* Percent mascot in right margin */}
              <img
                src={percentMascot}
                alt=""
                aria-hidden="true"
                className="absolute select-none"
                style={{ right: "8px", top: "-12px", width: "44px", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.2))" }}
              />

              <SectionLabel>The Ask: ₪850,000 Pre-Seed</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px", marginTop: "10px" }}>
                {fundingItems.map((item) => (
                  <div key={item.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginBottom: "3px" }}>
                      <span style={{ fontWeight: 700, color: "#1E293B" }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: "#64748B" }}>{item.pct}% · {item.amount}</span>
                    </div>
                    <div style={{ height: "8px", background: "#E2E8F0", borderRadius: "999px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${item.pct}%`,
                          borderRadius: "999px",
                          background: "linear-gradient(90deg, #10B981, #14B8A6)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Founder */}
            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "12px", position: "relative" }}>
              {/* Shekel mascot bottom-right */}
              <img
                src={shekelMascot}
                alt=""
                aria-hidden="true"
                className="absolute select-none"
                style={{ right: "0", bottom: "-4px", width: "40px", opacity: 0.15 }}
              />

              <SectionLabel>Founder</SectionLabel>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginTop: "8px" }}>
                <img
                  src={artiumHeadshot}
                  alt="Artium Mandebura"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "2px solid #10B981",
                    boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
                  }}
                />
                <div>
                  <p style={{ fontWeight: 800, color: "#0F172A", fontSize: "12px" }}>Artium Mandebura</p>
                  <p style={{ fontWeight: 700, color: "#10B981", fontSize: "10px" }}>Founder & CEO</p>
                  <p style={{ fontWeight: 500, color: "#475569", fontSize: "10px", lineHeight: 1.5, marginTop: "2px" }}>
                    5+ years brokerage operations at Interactive Israel. Capital markets infrastructure, compliance and fintech operations.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", marginTop: "10px", fontSize: "10px", color: "#475569", fontWeight: 500 }}>
                <a href="mailto:artiumoffical@gmail.com" style={{ display: "flex", alignItems: "center", gap: "4px", color: "inherit", textDecoration: "none" }}>
                  <Mail size={12} /> artiumoffical@gmail.com
                </a>
                <a href="tel:+972545344138" style={{ display: "flex", alignItems: "center", gap: "4px", color: "inherit", textDecoration: "none" }}>
                  <Phone size={12} /> 054-5344138
                </a>
                <a href="https://www.stock4u.co.il" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "4px", color: "inherit", textDecoration: "none" }}>
                  <Globe size={12} /> stock4u.co.il
                </a>
              </div>
            </div>
          </div>

          {/* ━━━━━━━━━━ FOOTER ━━━━━━━━━━ */}
          <div style={{ background: "#0B192E", padding: "8px 32px", textAlign: "center" }}>
            <p style={{ color: "#64748B", fontSize: "9px", fontWeight: 500 }}>
              Confidential. Intended solely for the recipient. © {new Date().getFullYear()} Stock4U Ltd.
            </p>
          </div>

          <img
              src={giftMascot}
              alt=""
              aria-hidden="true"
              className="select-none"
              style={{
                position: "absolute",
                right: "8px",
                bottom: "8px",
                width: "56px",
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.25))",
              }}
            />
        </div>
      </div>
    </>
  );
}

/* ─── Sub-components (inline styles for print fidelity) ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#10B981", fontWeight: 800, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

function DataCard({ value, label }: { value: string; label: string }) {
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
      <p style={{ fontSize: "17px", fontWeight: 800, color: "#065F46" }}>{value}</p>
      <p style={{ fontSize: "10px", fontWeight: 500, color: "#475569", marginTop: "2px", lineHeight: 1.4 }}>{label}</p>
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
