import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { SlidersHorizontal, Sparkles, Search } from "lucide-react";

export interface FilterState {
  category: "packages" | "technology" | "single_stocks";
  search: string;
  priceMin: number;
  priceMax: number;
  marketCapMin: number;
  marketCapMax: number;
  marketCapMinUnit: "million" | "billion";
  marketCapMaxUnit: "million" | "billion";
  growthMin: number;
  growthMax: number;
  country: string;
}

interface StockFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

const defaultFilters: FilterState = {
  category: "single_stocks",
  search: "",
  priceMin: 2,
  priceMax: 50,
  marketCapMin: 500,
  marketCapMax: 1,
  marketCapMinUnit: "million",
  marketCapMaxUnit: "billion",
  growthMin: 1,
  growthMax: 5,
  country: "israel",
};

export default function StockFilters({ onFiltersChange, initialFilters }: StockFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        updateFilter("search", searchInput);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchInput("");
    onFiltersChange(defaultFilters);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFilter("search", searchInput);
    }
  };

  // Validation helpers
  const isPriceValid = filters.priceMin <= filters.priceMax;
  const isMarketCapValid = () => {
    const minValue = filters.marketCapMin * (filters.marketCapMinUnit === "billion" ? 1e9 : 1e6);
    const maxValue = filters.marketCapMax * (filters.marketCapMaxUnit === "billion" ? 1e9 : 1e6);
    return minValue <= maxValue;
  };
  const isGrowthValid = filters.growthMin <= filters.growthMax;

  return (
    <div className="bg-white py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Filter Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          {/* Category Tabs (Right side in RTL) */}
          <div className="flex items-center gap-2 order-1">
            <Button
              variant={filters.category === "single_stocks" ? "default" : "outline"}
              onClick={() => updateFilter("category", "single_stocks")}
              className="h-12 px-6 rounded-full text-base font-medium"
            >
              מניות בודדות
            </Button>
            <Button
              variant={filters.category === "technology" ? "default" : "outline"}
              onClick={() => updateFilter("category", "technology")}
              className="h-12 px-6 rounded-full text-base font-medium"
            >
              טכנולוגיה
            </Button>
            <Button
              variant={filters.category === "packages" ? "default" : "outline"}
              onClick={() => updateFilter("category", "packages")}
              className="h-12 px-6 rounded-full text-base font-medium"
            >
              תעודות סל
            </Button>
          </div>

          {/* Search Input (Center) */}
          <div className="relative flex-1 min-w-[300px] max-w-md order-2">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="חיפוש"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="h-12 pr-12 rounded-full text-base"
            />
          </div>

          {/* Icon Buttons (Left side in RTL) */}
          <div className="flex items-center gap-2 order-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="h-12 w-12 rounded-full"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>סינון מתקדם</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={resetFilters}
                    className="h-12 w-12 rounded-full"
                  >
                    <Sparkles className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>איפוס פילטרים</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Advanced Filters Row */}
        {showAdvancedFilters && (
          <div className="bg-muted/30 rounded-2xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Share Price (שווי מניה) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">שווי מניה</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={filters.priceMin}
                      onChange={(e) => updateFilter("priceMin", parseFloat(e.target.value) || 0)}
                      className={`h-10 pr-8 rounded-full text-center ${
                        !isPriceValid ? "border-destructive" : ""
                      }`}
                      min="0"
                    />
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="relative flex-1">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="number"
                      value={filters.priceMax}
                      onChange={(e) => updateFilter("priceMax", parseFloat(e.target.value) || 0)}
                      className={`h-10 pr-8 rounded-full text-center ${
                        !isPriceValid ? "border-destructive" : ""
                      }`}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Market Cap (שווי שוק) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">שווי שוק</label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 flex-1">
                    <Select
                      value={filters.marketCapMinUnit}
                      onValueChange={(value: "million" | "billion") =>
                        updateFilter("marketCapMinUnit", value)
                      }
                    >
                      <SelectTrigger className="h-10 rounded-full w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="million">Million</SelectItem>
                        <SelectItem value="billion">Billion</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        value={filters.marketCapMin}
                        onChange={(e) =>
                          updateFilter("marketCapMin", parseFloat(e.target.value) || 0)
                        }
                        className={`h-10 pr-8 rounded-full text-center ${
                          !isMarketCapValid() ? "border-destructive" : ""
                        }`}
                        min="0"
                      />
                    </div>
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="flex items-center gap-1 flex-1">
                    <Select
                      value={filters.marketCapMaxUnit}
                      onValueChange={(value: "million" | "billion") =>
                        updateFilter("marketCapMaxUnit", value)
                      }
                    >
                      <SelectTrigger className="h-10 rounded-full w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="million">Million</SelectItem>
                        <SelectItem value="billion">Billion</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        $
                      </span>
                      <Input
                        type="number"
                        value={filters.marketCapMax}
                        onChange={(e) =>
                          updateFilter("marketCapMax", parseFloat(e.target.value) || 0)
                        }
                        className={`h-10 pr-8 rounded-full text-center ${
                          !isMarketCapValid() ? "border-destructive" : ""
                        }`}
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Annual Growth (צמיחה שנתית) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">צמיחה שנתית</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={filters.growthMin}
                      onChange={(e) => updateFilter("growthMin", parseFloat(e.target.value) || 0)}
                      className={`h-10 rounded-full text-center ${
                        !isGrowthValid ? "border-destructive" : ""
                      }`}
                      min="0"
                      max="100"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={filters.growthMax}
                      onChange={(e) => updateFilter("growthMax", parseFloat(e.target.value) || 0)}
                      className={`h-10 rounded-full text-center ${
                        !isGrowthValid ? "border-destructive" : ""
                      }`}
                      min="0"
                      max="100"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Country (מדינה) */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">מדינה</label>
                <Select value={filters.country} onValueChange={(value) => updateFilter("country", value)}>
                  <SelectTrigger className="h-10 rounded-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="israel">ישראל</SelectItem>
                    <SelectItem value="usa">ארצות הברית</SelectItem>
                    <SelectItem value="other">אחר</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
