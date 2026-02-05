import { useState } from "react";
import { Info, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  return (
    <TooltipProvider>
      <div
        className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          investmentAmount > 0 
            ? "border-[#4F86F9] shadow-md" 
            : "border-gray-100 shadow-sm hover:shadow-md"
        }`}
        dir="rtl"
      >
        <div className="p-3">
          {/* Top Row: Ticker + Logo */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-[#486284]">
                {stock.symbol}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-300 hover:text-[#4F86F9] transition-colors">
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-[240px] text-right bg-white shadow-lg border border-gray-100 p-2"
                >
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stock.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex-shrink-0">
              {stock.logoUrl ? (
                <img
                  src={stock.logoUrl}
                  alt={stock.company}
                  className="w-8 h-8 rounded-full object-contain bg-gray-50"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-gray-400">
                    {stock.symbol.slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Company Name */}
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">
            {stock.company}
          </p>

          {/* Action Area */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ₪
              </span>
              <Input
                type="number"
                placeholder="סכום"
                value={amount || ""}
                onChange={(e) => handleAmountChange(e.target.value)}
                min="0"
                step="1"
                className="h-8 pr-6 pl-2 rounded-lg border-gray-200 bg-gray-50 text-xs w-full"
                dir="rtl"
              />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={amount <= 0}
              className="h-8 px-3 bg-[#4F86F9] hover:bg-[#3d6fd9] text-white rounded-lg text-xs font-medium flex items-center gap-1 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="h-3.5 w-3.5" />
              הוסף
            </button>
          </div>
        </div>

        {/* Selected indicator */}
        {investmentAmount > 0 && (
          <div className="bg-emerald-50 border-t border-emerald-100 py-1.5 px-2 text-center">
            <span className="text-[10px] font-semibold text-emerald-700">
              ✓ ₪{investmentAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
