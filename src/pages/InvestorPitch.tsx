import { useEffect } from "react";
import { Mail, Phone, Globe, Shield, Scale, Cpu } from "lucide-react";

import dollarMascot from "@/assets/investor/dollar-mascot.png";
import giftMascot from "@/assets/investor/gift-mascot.png";
import cakeMascot from "@/assets/investor/cake-mascot.png";
import shekelMascot from "@/assets/investor/shekel-mascot.png";
import percentMascot from "@/assets/investor/percent-mascot.png";
import sparkIcon from "@/assets/investor/spark-icon.png";
import starIcon from "@/assets/investor/star-icon.png";

const fundingItems = [
  { label: "Legal & Regulation", pct: 20, amount: "₪170K" },
  { label: "R&D & Security Audit", pct: 30, amount: "₪255K" },
  { label: "Viral Marketing & GTM", pct: 30, amount: "₪255K" },
  { label: "Operations & Salary", pct: 20, amount: "₪170K" },
];

export default function InvestorPitch() {
  useEffect(() => {
    document.title = "Stock4U — Investor One-Pager (Confidential)";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
      document.title = "Stock4U - מתנות שעושות כסף";
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .mascot-float { animation: mascot-float 3s ease-in-out infinite; }
        .mascot-float-slow { animation: mascot-float 4.5s ease-in-out infinite; }
        .glass-card {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset;
        }
        .mascot-3d {
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.25));
        }
        @media print {
          body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .mascot-float, .mascot-float-slow { animation: none !important; }
          .a4-page { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; width: 210mm !important; min-height: 297mm !important; max-height: 297mm !important; overflow: hidden !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-start justify-center py-10 print:py-0 print:bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>

        {/* ═══════════ A4 PAGE ═══════════ */}
        <div className="a4-page bg-[#F1F5F9] rounded-2xl overflow-hidden" style={{ width: "210mm", minHeight: "297mm", maxWidth: "100vw", boxShadow: "0 25px 60px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)" }}>

          {/* ── HERO ── */}
          <div className="relative overflow-hidden px-8 pt-7 pb-8" style={{ background: "radial-gradient(ellipse at 60% 40%, #1E3A5F 0%, #0F172A 70%)" }}>
            {/* Dollar mascot — 3D pop over edge */}
            <img src={dollarMascot} alt="" className="mascot-float mascot-3d absolute -right-2 -bottom-6 w-32 z-20" aria-hidden="true" />
            <img src={sparkIcon} alt="" className="mascot-float-slow absolute top-4 right-28 w-8 opacity-50" aria-hidden="true" />
            <img src={starIcon} alt="" className="mascot-float absolute top-3 left-[42%] w-6 opacity-40" aria-hidden="true" />
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-400/10 border border-emerald-400/20 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-bold tracking-[0.15em]">PRE-SEED · CONFIDENTIAL</span>
              </div>
              <h1 className="text-[22px] font-extrabold leading-tight text-white mb-1.5 tracking-tight">
                Stock4U: Wealth Gifting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">Reimagined</span>
              </h1>
              <p className="text-slate-300 text-[11px] leading-relaxed max-w-[500px] font-medium">
                Bridging the ₪4B Israeli gift market with the capital markets — transforming temporary gifts into long-term financial assets.
              </p>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="px-8 py-5 space-y-4">

            {/* ▸ MARKET + MOAT */}
            <div className="grid grid-cols-2 gap-4">

              {/* Market */}
              <div className="relative">
                <img src={cakeMascot} alt="" className="mascot-float mascot-3d absolute -right-4 -top-5 w-20 z-10" aria-hidden="true" />
                <SectionLabel>Market Opportunity</SectionLabel>
                <div className="space-y-2 mt-2">
                  <GlassStatBox value="₪4 Billion" sub="Total Addressable Market — Israeli gift card industry" accent="emerald" />
                  <GlassStatBox value="₪600M (15%)" sub="Annual unredeemed 'breakage' — dead money we capture" accent="blue" />
                </div>
              </div>

              {/* Moat */}
              <div>
                <SectionLabel>Strategic Moat</SectionLabel>
                <div className="space-y-1.5 mt-2">
                  <MoatItem icon={<Scale className="w-3.5 h-3.5 text-emerald-500" />} title="Legal Advisory" text="Barnea Law Firm (Dr. Zvi Gabbay) — Israel's leading fintech regulatory practice." />
                  <MoatItem icon={<Shield className="w-3.5 h-3.5 text-emerald-500" />} title="Regulatory Path" text="Payment Services Act exemption — up to ₪5M/month turnover." />
                  <MoatItem icon={<Cpu className="w-3.5 h-3.5 text-emerald-500" />} title="Financial Backend" text="Advanced integration with Meitav Trade API — institutional-grade execution." />
                </div>
              </div>
            </div>

            {/* ▸ THE ASK */}
            <div className="relative glass-card rounded-xl px-5 py-4">
              <img src={giftMascot} alt="" className="mascot-float mascot-3d absolute -right-3 -top-6 w-20 z-10" aria-hidden="true" />
              <img src={percentMascot} alt="" className="mascot-float-slow mascot-3d absolute right-16 -bottom-3 w-14 z-10" aria-hidden="true" />

              <SectionLabel>The Ask — ₪850,000 Pre-Seed</SectionLabel>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2.5 mt-2.5">
                {fundingItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-bold text-slate-700">{item.label}</span>
                      <span className="text-slate-400 font-semibold">{item.pct}% · {item.amount}</span>
                    </div>
                    <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ▸ FOUNDER */}
            <div className="relative border-t border-slate-200/60 pt-3">
              <img src={shekelMascot} alt="" className="mascot-float mascot-3d absolute right-0 -top-2 w-14 z-10" aria-hidden="true" />

              <SectionLabel>Founder</SectionLabel>
              <div className="flex items-start gap-3 mt-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
                  <span className="text-white font-extrabold text-base">AM</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-[13px]">Artium Mandebura</h3>
                  <p className="text-emerald-600 text-[10px] font-bold">Founder & CEO</p>
                  <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5 font-medium">
                    5+ years brokerage operations at Interactive Israel — capital markets infrastructure, compliance & fintech operations expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2.5 text-[10px] text-slate-400 font-medium">
                <a href="mailto:artiumoffical@gmail.com" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                  <Mail className="w-3 h-3" /> artiumoffical@gmail.com
                </a>
                <a href="tel:+972545344138" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                  <Phone className="w-3 h-3" /> 054-5344138
                </a>
                <a href="https://www.stock4u.co.il" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                  <Globe className="w-3 h-3" /> stock4u.co.il
                </a>
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="px-8 py-2 text-center" style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)" }}>
            <p className="text-slate-500 text-[9px] font-medium">
              Confidential — intended solely for the recipient. © {new Date().getFullYear()} Stock4U Ltd.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Sub-components ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-emerald-600 font-extrabold text-[10px] tracking-[0.15em] uppercase">{children}</p>
  );
}

function GlassStatBox({ value, sub, accent }: { value: string; sub: string; accent: "emerald" | "blue" }) {
  const text = accent === "emerald" ? "text-emerald-700" : "text-blue-700";
  return (
    <div className="glass-card rounded-xl px-4 py-2.5">
      <p className={`text-lg font-extrabold ${text}`}>{value}</p>
      <p className="text-slate-500 text-[10px] leading-snug mt-0.5 font-medium">{sub}</p>
    </div>
  );
}

function MoatItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="glass-card rounded-lg px-3 py-2 flex gap-2 items-start">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="font-extrabold text-slate-800 text-[11px]">{title}</p>
        <p className="text-slate-500 text-[10px] leading-snug font-medium">{text}</p>
      </div>
    </div>
  );
}
