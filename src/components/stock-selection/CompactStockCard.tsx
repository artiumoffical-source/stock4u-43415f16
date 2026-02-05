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
  const { addToCart } = useCart();

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0) {
      setAmount(numValue);
    }
  };

  const handleAddToCart = () => {
    if (amount > 0) {
      // Add to cart context
      addToCart({
        symbol: stock.symbol,
        name: stock.company,
        amount: amount,
        logo: stock.logoUrl,
      });
      
      // Also update parent state
      onInvestmentAmountChange(stock.symbol, amount);
      
      // Show toast notification
      toast.success(`${stock.symbol} נוסף לעגלה!`, {
        description: `₪${amount.toLocaleString()}`,
        duration: 2000,
      });
      
      // Show "Added" state temporarily
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  const isInCart = investmentAmount > 0;

  const [logoError, setLogoError] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
          isInCart 
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
                  <button 
                    className="text-gray-400 hover:text-[#4F86F9] transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  align="start"
                  className="max-w-[220px] text-right bg-white shadow-xl border border-gray-200 p-3 z-50"
                >
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {stock.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Company Logo */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
              {stock.logoUrl && !logoError ? (
                <img
                  src={stock.logoUrl}
                  alt={stock.company}
                  className="w-8 h-8 object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-xs font-bold text-gray-400">
                  {stock.symbol.slice(0, 2)}
                </span>
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
              className={`h-8 px-3 rounded-lg text-xs font-medium flex items-center gap-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                justAdded 
                  ? "bg-emerald-500 text-white" 
                  : "bg-[#4F86F9] hover:bg-[#3d6fd9] text-white"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  נוסף!
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  הוסף
                </>
              )}
            </button>
          </div>
        </div>

        {/* Selected indicator */}
        {isInCart && (
          <div className="bg-emerald-50 border-t border-emerald-100 py-1.5 px-2 text-center">
            <span className="text-[10px] font-semibold text-emerald-700">
              ✓ בעגלה: ₪{investmentAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
