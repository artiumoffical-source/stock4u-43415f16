import { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Mail, Phone, Globe, TrendingUp, Shield, Users, DollarSign, Briefcase } from "lucide-react";

import dollarMascot from "@/assets/step-hero/dollar.png";
import giftMascot from "@/assets/decorations/gift-mascot.png";
import shekelMascot from "@/assets/step-hero/shekel.png";
import euroMascot from "@/assets/step-hero/euro-1.png";
import yenMascot from "@/assets/step-hero/yen.png";
import poundMascot from "@/assets/step-hero/pound.png";

const fundingData = [
  { name: "Legal & Regulation", value: 20, color: "#10B981" },
  { name: "R&D & Security Audit", value: 30, color: "#3B82F6" },
  { name: "Viral Marketing & GTM", value: 30, color: "#8B5CF6" },
  { name: "Operations & Salary", value: 20, color: "#F59E0B" },
];

export default function InvestorPitch() {
  useEffect(() => {
    document.title = "Stock4U - Investor Deck (Confidential)";
    // Add noindex meta tag
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
    <div className="min-h-screen bg-white english-font" dir="ltr">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white min-h-[90vh] flex items-center">
        {/* Floating mascots */}
        <img src={dollarMascot} alt="" className="absolute top-[10%] left-[5%] w-20 md:w-28 opacity-40 animate-[float_6s_ease-in-out_infinite]" aria-hidden="true" />
        <img src={giftMascot} alt="" className="absolute bottom-[15%] right-[8%] w-24 md:w-36 opacity-30 animate-[float_8s_ease-in-out_infinite_1s]" aria-hidden="true" />
        <img src={shekelMascot} alt="" className="absolute top-[60%] left-[80%] w-16 md:w-24 opacity-25 animate-[float_7s_ease-in-out_infinite_0.5s]" aria-hidden="true" />
        <img src={euroMascot} alt="" className="absolute top-[20%] right-[15%] w-14 md:w-20 opacity-20 animate-[float_9s_ease-in-out_infinite_2s]" aria-hidden="true" />
        <img src={yenMascot} alt="" className="absolute bottom-[30%] left-[15%] w-14 md:w-20 opacity-20 animate-[float_7.5s_ease-in-out_infinite_1.5s]" aria-hidden="true" />
        <img src={poundMascot} alt="" className="absolute top-[40%] left-[45%] w-12 md:w-16 opacity-15 animate-[float_8.5s_ease-in-out_infinite_3s]" aria-hidden="true" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium tracking-wide">PRE-SEED · CONFIDENTIAL</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Stock4U: Wealth Gifting
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Reimagined
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Bridging the ₪4 Billion Israeli gift market with the capital markets.
            <br className="hidden md:block" />
            Transforming temporary gifts into long-term financial assets.
          </p>

          <a
            href="#the-ask"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
          >
            <TrendingUp className="w-5 h-5" />
            View Investment Opportunity
          </a>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-3">Market Opportunity</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-14">
            A Massive, Untapped Market
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <MarketCard
              icon={<DollarSign className="w-7 h-7" />}
              value="₪4 Billion"
              label="Annual Market"
              description="Total Israeli gift card & digital gift turnover per year — a market growing steadily with digital adoption."
              accent="emerald"
            />
            <MarketCard
              icon={<TrendingUp className="w-7 h-7" />}
              value="₪600M (15%)"
              label="Dead Money"
              description="Annual unredeemed digital gifts — money that expires unused. Stock4U captures this value and puts it to work."
              accent="blue"
            />
          </div>
        </div>
      </section>

      {/* Strategic Moat */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-3">Competitive Advantage</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-14">
            Strategic Moat: Trust & Regulation
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <MoatCard
              icon={<Shield className="w-6 h-6" />}
              title="Legal Advisory"
              description="Fully advised by Barnea Law Firm (Dr. Zvi Gabbay) — Israel's leading fintech regulatory practice."
            />
            <MoatCard
              icon={<Briefcase className="w-6 h-6" />}
              title="Regulatory Path"
              description="Operating under the Payment Services Act exemption (up to ₪5M/month turnover) — clear path to scale."
            />
            <MoatCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Financial Backend"
              description="Advanced integration stages with Meitav Trade API — institutional-grade execution infrastructure."
            />
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section id="the-ask" className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <p className="text-emerald-600 font-semibold text-sm tracking-widest uppercase mb-3">The Ask</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            ₪850,000 Pre-Seed Round
          </h2>
          <p className="text-slate-500 text-lg mb-14 max-w-2xl">
            Strategic allocation designed to achieve regulatory approval, product launch, and initial market traction.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Chart */}
            <div className="w-full max-w-sm mx-auto">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, ""]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: "14px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="space-y-5">
              {fundingData.map((item) => (
                <div key={item.name} className="flex items-center gap-4">
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-slate-500 font-medium">{item.value}%</span>
                    </div>
                    <span className="text-sm text-slate-400">
                      ₪{((item.value / 100) * 850000).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team & Contact */}
      <section className="py-20 md:py-28 bg-[#0F172A] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-emerald-400 font-semibold text-sm tracking-widest uppercase mb-3">Team</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Leadership
          </h2>

          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 backdrop-blur-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <Users className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Artium Mandebura</h3>
            <p className="text-emerald-400 font-medium mb-4">Founder & CEO</p>
            <p className="text-slate-400 leading-relaxed">
              5+ years of brokerage operations expertise at Interactive Israel — deep domain knowledge in capital markets infrastructure, compliance, and fintech operations.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-300">
            <a href="mailto:artiumoffical@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Mail className="w-5 h-5" />
              artiumoffical@gmail.com
            </a>
            <span className="hidden md:block text-slate-600">|</span>
            <a href="tel:+972545344138" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Phone className="w-5 h-5" />
              054-5344138
            </a>
            <span className="hidden md:block text-slate-600">|</span>
            <a href="https://www.stock4u.co.il" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
              <Globe className="w-5 h-5" />
              www.stock4u.co.il
            </a>
          </div>

          <p className="text-slate-600 text-xs mt-16">
            This document is confidential and intended solely for the recipient. © {new Date().getFullYear()} Stock4U
          </p>
        </div>
      </section>
    </div>
  );
}

/* ─── Sub-components ─── */

function MarketCard({
  icon,
  value,
  label,
  description,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  accent: "emerald" | "blue";
}) {
  const colors = accent === "emerald"
    ? { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" }
    : { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" };

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-2xl p-8 hover:shadow-lg transition-shadow`}>
      <div className={`w-14 h-14 ${colors.bg} ${colors.icon} rounded-xl flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <p className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-1">{value}</p>
      <p className={`font-semibold ${colors.icon} mb-3`}>{label}</p>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

function MoatCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-emerald-200 transition-all group">
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
