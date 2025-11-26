import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TrendingUp } from "lucide-react";
import { StockChartModal } from "./StockChartModal";

interface StockCardProps {
  stock: {
    symbol: string;
    company: string;
    logo?: React.ReactNode;
    logoUrl?: string;
    description: string;
  };
  investmentAmount: number;
  onInvestmentAmountChange: (symbol: string, amount: number) => void;
}

export function StockCard({ stock, investmentAmount, onInvestmentAmountChange }: StockCardProps) {
  const [amount, setAmount] = useState(investmentAmount);
  const [showChart, setShowChart] = useState(false);

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0) {
      setAmount(numValue);
    }
  };

  const handleAmountBlur = () => {
    onInvestmentAmountChange(stock.symbol, amount);
  };

  return (
    <>
      <div
        className="w-full bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
        style={{ boxShadow: "0 4px 81.4px 0 rgba(72, 98, 132, 0.15)" }}
        dir="rtl"
      >
        {/* Header with logo and company info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#486284] mb-1">
              {stock.symbol}
            </h3>
            <p className="text-sm text-[#486284] opacity-60">
              {stock.company}
            </p>
          </div>
          <div className="flex-shrink-0 mr-4">
            {stock.logoUrl ? (
              <img
                src={stock.logoUrl}
                alt={stock.company}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 text-[#486284] opacity-80">
                {stock.logo}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#486284] leading-relaxed mb-6 min-h-[80px]">
          {stock.description}
        </p>

        {/* Investment amount input */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 justify-end">
            <Input
              type="number"
              placeholder="הזן סכום"
              value={amount || ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              onBlur={handleAmountBlur}
              min="0"
              step="0.01"
              className="w-32 h-10 text-center rounded-full"
              dir="rtl"
            />
            <span className="text-sm font-medium text-[#486284]">₪</span>
            <span className="text-sm font-medium text-[#486284]">סכום להשקעה:</span>
          </div>

          {/* Chart button */}
          <Button
            variant="outline"
            onClick={() => setShowChart(true)}
            className="w-full rounded-full h-10"
          >
            <TrendingUp className="h-4 w-4 ml-2" />
            הצגת גרף
          </Button>

          {/* Amount indicator */}
          {amount > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-full py-2 px-4 text-center">
              <span className="text-sm font-bold text-green-700">
                נבחר ₪{amount.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Chart Modal */}
      <StockChartModal
        open={showChart}
        onClose={() => setShowChart(false)}
        symbol={stock.symbol}
        companyName={stock.company}
      />
    </>
  );
}
