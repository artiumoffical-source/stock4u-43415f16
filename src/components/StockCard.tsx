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
    brandColor?: string;
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
        className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        dir="rtl"
      >
        {/* Card Content */}
        <div className="p-5">
          {/* Header: Logo on Left, Ticker & Name on Right */}
          <div className="flex items-center justify-between mb-4">
            {/* Right Side: Ticker & Company Name */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#1e3a5f]">
                {stock.symbol}
              </h3>
              <p className="text-sm text-gray-500">
                {stock.company}
              </p>
            </div>
            
            {/* Left Side: Logo */}
            <div className="flex-shrink-0 ml-3">
              {stock.logoUrl ? (
                <img
                  src={stock.logoUrl}
                  alt={stock.company}
                  className="w-10 h-10 rounded-lg object-contain"
                />
              ) : (
                <div className="w-10 h-10">
                  {stock.logo}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
            {stock.description}
          </p>

          {/* Investment Input */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">סכום להשקעה:</span>
              <div className="relative flex-1">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">₪</span>
                <Input
                  type="number"
                  placeholder="הזן סכום"
                  value={amount || ""}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  onBlur={handleAmountBlur}
                  min="0"
                  step="1"
                  className="h-10 pr-8 pl-3 rounded-lg border-gray-200 bg-gray-50 text-sm w-full"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Amount indicator - Show when amount selected */}
          {amount > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg py-2 px-3 text-center mb-4">
              <span className="text-sm font-semibold text-emerald-700">
                נבחר: ₪{amount.toLocaleString()}
              </span>
            </div>
          )}

          {/* Chart Button */}
          <Button
            variant="outline"
            onClick={() => setShowChart(true)}
            className="w-full h-10 rounded-lg border-gray-200 hover:bg-gray-50 text-gray-700 gap-2"
          >
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            הצגת גרף
          </Button>
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
