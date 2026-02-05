import { useState } from "react";
import { Info, ShoppingCart, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StockChartModal } from "@/components/StockChartModal";

export interface Stock {
  symbol: string;
  company: string;
  description: string;
  logoUrl?: string;
  logo?: React.ReactNode;
}

interface CompactStockCardProps {
  stock: Stock;
  investmentAmount: number;
  onInvestmentAmountChange: (symbol: string, amount: number) => void;
}

export function CompactStockCard({
  stock,
  investmentAmount,
  onInvestmentAmountChange,
}: CompactStockCardProps) {
  const [amount, setAmount] = useState(investmentAmount);
  const [showChart, setShowChart] = useState(false);

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0) {
      setAmount(numValue);
    }
  };

  const handleAddToCart = () => {
    if (amount > 0) {
      onInvestmentAmountChange(stock.symbol, amount);
    }
  };

  const handleAmountBlur = () => {
    onInvestmentAmountChange(stock.symbol, amount);
  };

  return (
    <TooltipProvider>
      <div
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
        dir="rtl"
      >
        <div className="p-4">
          {/* Header: Logo + Ticker */}
          <div className="flex items-center justify-between mb-3">
            {/* Right: Ticker Symbol */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#486284]">
                {stock.symbol}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-[#4F86F9] transition-colors">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-[280px] text-right bg-white shadow-lg border border-gray-100 p-3"
                >
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stock.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Left: Logo */}
            <div className="flex-shrink-0">
              {stock.logoUrl ? (
                <img
                  src={stock.logoUrl}
                  alt={stock.company}
                  className="w-10 h-10 rounded-lg object-contain"
                />
              ) : stock.logo ? (
                <div className="w-10 h-10">{stock.logo}</div>
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-400">
                    {stock.symbol.slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Company Name */}
          <h3 className="text-sm font-semibold text-gray-700 text-center mb-4 line-clamp-1">
            {stock.company}
          </h3>

          {/* Action Area */}
          <div className="space-y-3">
            {/* Investment Input */}
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                ₪
              </span>
              <Input
                type="number"
                placeholder="סכום להשקעה"
                value={amount || ""}
                onChange={(e) => handleAmountChange(e.target.value)}
                onBlur={handleAmountBlur}
                min="0"
                step="1"
                className="h-10 pr-8 pl-3 rounded-lg border-gray-200 bg-gray-50 text-sm w-full"
                dir="rtl"
              />
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={amount <= 0}
              className="w-full h-10 bg-[#4F86F9] hover:bg-[#3d6fd9] text-white rounded-lg font-medium text-sm gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4" />
              הוסף לעגלה
            </Button>

            {/* Chart Link */}
            <button
              onClick={() => setShowChart(true)}
              className="w-full text-center text-sm text-[#4F86F9] hover:text-[#3d6fd9] font-medium flex items-center justify-center gap-1"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              הצג גרף
            </button>
          </div>
        </div>

        {/* Amount indicator when selected */}
        {investmentAmount > 0 && (
          <div className="bg-emerald-50 border-t border-emerald-100 py-2 px-3 text-center">
            <span className="text-xs font-semibold text-emerald-700">
              ✓ נבחר: ₪{investmentAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Chart Modal */}
      <StockChartModal
        open={showChart}
        onClose={() => setShowChart(false)}
        symbol={stock.symbol}
        companyName={stock.company}
      />
    </TooltipProvider>
  );
}
