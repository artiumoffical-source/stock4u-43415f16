import { useState } from "react";
import { Info, Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export interface Stock {
  symbol: string;
  company: string;
  description: string;
  logoUrl?: string;
  logo?: React.ReactNode;
  category?: string;
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
  const [justAdded, setJustAdded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { addToCart } = useCart();

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0) {
      setAmount(numValue);
    }
  };

  const handleAddToCart = () => {
    if (amount > 0) {
      addToCart({
        symbol: stock.symbol,
        name: stock.company,
        amount: amount,
        logo: stock.logoUrl,
      });
      
      onInvestmentAmountChange(stock.symbol, amount);
      
      toast.success(`${stock.symbol} נוסף לעגלה!`, {
        description: `₪${amount.toLocaleString()}`,
        duration: 2000,
      });
      
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  const isInCart = investmentAmount > 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={`group relative bg-white border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden ${
          isInCart ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-200"
        }`}
        dir="rtl"
      >
        {/* 1. Decorative Header */}
        <div className="h-20 md:h-24 bg-gradient-to-b from-blue-50 to-white w-full relative" />

        {/* 2. Centered Overlapping Logo */}
        <div className="absolute top-10 md:top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center">
            {stock.logoUrl && !logoError ? (
              <img
                src={stock.logoUrl}
                alt={stock.company}
                className="w-full h-full object-contain p-1"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-blue-600 font-bold text-lg md:text-xl">
                {stock.symbol[0]}
              </span>
            )}
          </div>
        </div>

        {/* Info Tooltip - Top Right */}
        <div className="absolute top-3 right-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-all flex items-center justify-center">
                <Info className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="end"
              className="w-64 text-right bg-white shadow-2xl border border-gray-100 p-4 rounded-xl z-50"
            >
              <p className="text-xs font-bold text-gray-800 mb-2">אודות החברה</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {stock.description}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* 3. Main Content */}
        <div className="pt-10 md:pt-12 pb-4 px-4 flex flex-col items-center flex-grow">
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            {stock.symbol}
          </h3>
          <p className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider line-clamp-1 text-center mt-1">
            {stock.company}
          </p>
        </div>

        {/* 4. Footer Action */}
        <div className="p-4 pt-0 mt-auto w-full">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="number"
                placeholder="הזן סכום"
                value={amount || ""}
                onChange={(e) => handleAmountChange(e.target.value)}
                min="0"
                step="1"
                className="h-11 pr-3 pl-8 text-right bg-gray-50 focus:bg-white border-gray-200 focus:border-blue-500 rounded-xl text-sm font-bold text-gray-700"
                dir="rtl"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">₪</span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={amount <= 0}
              className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${
                justAdded
                  ? "bg-emerald-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              }`}
            >
              {justAdded ? (
                <Check className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Selected indicator */}
        {isInCart && (
          <div className="bg-emerald-50 border-t border-emerald-100 py-2 px-3 text-center">
            <span className="text-xs font-semibold text-emerald-700">
              ✓ בעגלה: ₪{investmentAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
