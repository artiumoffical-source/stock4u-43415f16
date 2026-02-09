import { useEffect } from "react";
import { Download, Mail, Phone, Globe } from "lucide-react";

import dollarMascot from "@/assets/investor/dollar-mascot.png";
import giftMascot from "@/assets/investor/gift-mascot.png";
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

  const handleDownload = () => window.print();

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .a4-page { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; width: 210mm !important; min-height: 297mm !important; max-height: 297mm !important; overflow: hidden !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>

      {/* Screen wrapper — centres the A4 card */}
      <div className="min-h-screen bg-slate-100 flex items-start justify-center py-8 print:py-0 print:bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>

        {/* ── Floating download button ── */}
        <button
          onClick={handleDownload}
          className="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>

        {/* ═══════════════ A4 PAGE ═══════════════ */}
        <div className="a4-page bg-white shadow-2xl rounded-lg overflow-hidden" style={{ width: "210mm", minHeight: "297mm", maxWidth: "100vw" }}>

          {/* ── HERO BANNER ── */}
          <div className="relative bg-[#0F172A] text-white px-8 pt-7 pb-6 overflow-hidden">
            {/* Decorative mascots */}
            <img src={dollarMascot} alt="" className="absolute -right-2 -bottom-2 w-24 opacity-25" aria-hidden="true" />
            <img src={sparkIcon} alt="" className="absolute top-3 right-20 w-8 opacity-30" aria-hidden="true" />
            <img src={starIcon} alt="" className="absolute top-2 left-[40%] w-6 opacity-25" aria-hidden="true" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="text-emerald-400 text-[10px] font-semibold tracking-widest">PRE-SEED · CONFIDENTIAL</span>
              </div>
              <h1 className="text-2xl font-extrabold leading-tight mb-1.5">
                Stock4U: Wealth Gifting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Reimagined</span>
              </h1>
              <p className="text-slate-300 text-xs leading-relaxed max-w-[520px]">
                Bridging the ₪4B Israeli gift market with the capital markets — transforming temporary gifts into long-term financial assets.
              </p>
            </div>
          </div>

          {/* ── BODY CONTENT ── */}
          <div className="px-8 py-5 space-y-5">

            {/* ▸ MARKET + MOAT — 2 columns */}
            <div className="grid grid-cols-2 gap-5">

              {/* Market Opportunity */}
              <div>
                <SectionLabel>Market Opportunity</SectionLabel>
                <div className="space-y-2.5 mt-2">
                  <StatBox value="₪4 Billion" sub="Annual gift market in Israel" color="emerald" />
                  <StatBox value="₪600M (15%)" sub="Unredeemed 'dead money' we capture" color="blue" />
                </div>
              </div>

              {/* Strategic Moat */}
              <div>
                <SectionLabel>Strategic Moat</SectionLabel>
                <div className="space-y-2 mt-2">
                  <MoatItem title="Legal Advisory" text="Barnea Law Firm (Dr. Zvi Gabbay) — Israel's leading fintech regulatory practice." />
                  <MoatItem title="Regulatory Path" text="Payment Services Act exemption — up to ₪5M/month turnover." />
                  <MoatItem title="Financial Backend" text="Advanced integration with Meitav Trade API — institutional-grade execution." />
                </div>
              </div>
            </div>

            {/* ▸ THE ASK — progress bars */}
            <div className="relative">
              <img src={giftMascot} alt="" className="absolute -right-1 -top-2 w-16 opacity-15" aria-hidden="true" />
              <img src={percentMascot} alt="" className="absolute right-16 bottom-0 w-10 opacity-10" aria-hidden="true" />

              <SectionLabel>The Ask — ₪850,000 Pre-Seed</SectionLabel>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-2.5">
                {fundingItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="text-slate-400 font-medium">{item.pct}% · {item.amount}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ▸ TEAM + CONTACT — compact */}
            <div className="relative border-t border-slate-100 pt-4">
              <img src={shekelMascot} alt="" className="absolute right-0 top-2 w-12 opacity-10" aria-hidden="true" />

              <SectionLabel>Founder</SectionLabel>
              <div className="flex items-start gap-4 mt-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg">AM</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-sm">Artium Mandebura</h3>
                  <p className="text-emerald-600 text-[11px] font-semibold">Founder & CEO</p>
                  <p className="text-slate-400 text-[10px] leading-relaxed mt-0.5">
                    5+ years brokerage operations at Interactive Israel — capital markets infrastructure, compliance & fintech operations expertise.
                  </p>
                </div>
              </div>

              {/* Contact row */}
              <div className="flex items-center gap-4 mt-3 text-[10px] text-slate-400">
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

          {/* ── FOOTER BAR ── */}
          <div className="bg-[#0F172A] px-8 py-2.5 text-center">
            <p className="text-slate-500 text-[9px]">
              Confidential — intended solely for the recipient. © {new Date().getFullYear()} Stock4U Ltd.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Tiny sub-components ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-emerald-600 font-bold text-[10px] tracking-widest uppercase">{children}</p>
  );
}

function StatBox({ value, sub, color }: { value: string; sub: string; color: "emerald" | "blue" }) {
  const bg = color === "emerald" ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100";
  const text = color === "emerald" ? "text-emerald-700" : "text-blue-700";
  return (
    <div className={`${bg} border rounded-xl px-4 py-3`}>
      <p className={`text-xl font-extrabold ${text}`}>{value}</p>
      <p className="text-slate-400 text-[10px] leading-snug mt-0.5">{sub}</p>
    </div>
  );
}

function MoatItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-2">
      <p className="font-bold text-slate-800 text-[11px]">{title}</p>
      <p className="text-slate-400 text-[10px] leading-snug">{text}</p>
    </div>
  );
}
