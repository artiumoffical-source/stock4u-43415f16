import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { SlidersHorizontal, Sparkles, Search, ChevronDown, ChevronUp, Filter } from "lucide-react";

export interface FilterState {
  category: "etfs" | "single_stocks";
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
  sectors: string[];
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
  sectors: [],
};

const sectorOptions = [
  { id: "ai", label: "בינה מלאכותית" },
  { id: "software", label: "פיתוח תוכנה" },
  { id: "cloud", label: "מחשוב ענן" },
  { id: "iot", label: "אינטרנט של הדברים" },
  { id: "cyber", label: "סייבר ואבטחת מידע" },
  { id: "bigdata", label: "נתונים גדולים" },
  { id: "vr", label: "מציאות מדומה" },
  { id: "robotics", label: "רובוטיקה" },
];

export default function StockFilters({ onFiltersChange, initialFilters }: StockFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [searchInput, setSearchInput] = useState(filters.search);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleSector = (sectorId: string) => {
    const newSectors = filters.sectors.includes(sectorId)
      ? filters.sectors.filter((s) => s !== sectorId)
      : [...filters.sectors, sectorId];
    updateFilter("sectors", newSectors);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFilter("search", searchInput);
    }
  };

  return (
    <div className="bg-white py-4 md:py-6" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* TOP BAR - Mobile: Horizontal scroll for filters, Desktop: Flex wrap */}
        
        {/* Mobile Filter Bar - Horizontal scroll */}
        <div className="md:hidden">
          {/* Category Toggle */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 mb-4">
            <button
              onClick={() => updateFilter("category", "single_stocks")}
              className={`flex-1 px-4 py-3 rounded-full text-sm font-medium transition-all ${
                filters.category === "single_stocks"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#2563EB]"
              }`}
            >
              מניות בודדות
            </button>
            <button
              onClick={() => updateFilter("category", "etfs")}
              className={`flex-1 px-4 py-3 rounded-full text-sm font-medium transition-all ${
                filters.category === "etfs"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#2563EB]"
              }`}
            >
              תעודות סל
            </button>
          </div>

          {/* Mobile Filter Pills - Horizontal Scroll */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4">
            <div className="flex items-center gap-2 min-w-max">
              <Select defaultValue="technology">
                <SelectTrigger className="h-10 px-4 rounded-full border-gray-200 bg-white min-w-[120px] text-sm">
                  <SelectValue placeholder="טכנולוגיה" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="technology">טכנולוגיה</SelectItem>
                  <SelectItem value="finance">פיננסים</SelectItem>
                  <SelectItem value="healthcare">בריאות</SelectItem>
                  <SelectItem value="energy">אנרגיה</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-10 px-4 rounded-full border-gray-200 gap-2 text-sm font-medium whitespace-nowrap"
              >
                <Filter className="h-4 w-4" />
                סינון
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="relative mb-2">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="חיפוש מניה..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="h-12 pr-10 pl-4 rounded-full border-gray-200 bg-white text-base w-full"
              dir="rtl"
            />
          </div>
        </div>

        {/* Desktop Filter Bar */}
        <div className="hidden md:flex items-center justify-between gap-4 flex-wrap">
          {/* Right Side: Segmented Tab Switcher */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 order-1">
            <button
              onClick={() => updateFilter("category", "single_stocks")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                filters.category === "single_stocks"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#2563EB] hover:bg-gray-200"
              }`}
            >
              מניות בודדות
            </button>
            <button
              onClick={() => updateFilter("category", "etfs")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                filters.category === "etfs"
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-[#2563EB] hover:bg-gray-200"
              }`}
            >
              תעודות סל
            </button>
          </div>

          {/* Center: Technology Dropdown */}
          <div className="order-2">
            <Select defaultValue="technology">
              <SelectTrigger className="h-11 px-5 rounded-full border-gray-200 bg-white min-w-[140px]">
                <SelectValue placeholder="טכנולוגיה" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                <SelectItem value="technology">טכנולוגיה</SelectItem>
                <SelectItem value="finance">פיננסים</SelectItem>
                <SelectItem value="healthcare">בריאות</SelectItem>
                <SelectItem value="energy">אנרגיה</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Center-Left: Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-sm order-3">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="חיפוש"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="h-11 pr-10 pl-4 rounded-full border-gray-200 bg-white text-sm"
            />
          </div>

          {/* Far Left: Filter Toggle & Icons */}
          <div className="flex items-center gap-3 order-4">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-11 px-4 rounded-full border-gray-200 gap-2 text-sm font-medium"
            >
              <Filter className="h-4 w-4" />
              סינון מתקדם
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <button className="p-2 text-red-400 hover:text-red-500 transition-colors">
              <SlidersHorizontal className="h-5 w-5" />
            </button>
            <button className="p-2 text-[#2563EB] hover:text-blue-600 transition-colors">
              <Sparkles className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* EXPANDABLE FILTER SECTION */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {/* FILTERS GRID */}
          <div className="space-y-5 mb-8">
            {/* Row 1: Share Price (שווי מניה) */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600 w-24 text-right">שווי מניה</span>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Input
                    type="text"
                    value={`$${filters.priceMax}`}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      updateFilter("priceMax", parseInt(val) || 0);
                    }}
                    className="h-10 w-20 rounded-lg border-gray-200 bg-gray-50 text-center text-sm"
                  />
                </div>
                <span className="text-gray-400">—</span>
                <div className="relative">
                  <Input
                    type="text"
                    value={`$${filters.priceMin}`}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      updateFilter("priceMin", parseInt(val) || 0);
                    }}
                    className="h-10 w-20 rounded-lg border-gray-200 bg-gray-50 text-center text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Market Cap (שווי שוק) */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600 w-24 text-right">שווי שוק</span>
              <div className="flex items-center gap-3">
                {/* Max Value */}
                <div className="flex items-center gap-1">
                  <Select
                    value={filters.marketCapMaxUnit}
                    onValueChange={(value: "million" | "billion") =>
                      updateFilter("marketCapMaxUnit", value)
                    }
                  >
                    <SelectTrigger className="h-10 w-24 rounded-lg border-gray-200 bg-gray-50 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="million">Million</SelectItem>
                      <SelectItem value="billion">Billion</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={`$${filters.marketCapMax}`}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      updateFilter("marketCapMax", parseInt(val) || 0);
                    }}
                    className="h-10 w-16 rounded-lg border-gray-200 bg-gray-50 text-center text-sm"
                  />
                </div>
                <span className="text-gray-400">—</span>
                {/* Min Value */}
                <div className="flex items-center gap-1">
                  <Select
                    value={filters.marketCapMinUnit}
                    onValueChange={(value: "million" | "billion") =>
                      updateFilter("marketCapMinUnit", value)
                    }
                  >
                    <SelectTrigger className="h-10 w-24 rounded-lg border-gray-200 bg-gray-50 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="million">Million</SelectItem>
                      <SelectItem value="billion">Billion</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    value={`$${filters.marketCapMin}`}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      updateFilter("marketCapMin", parseInt(val) || 0);
                    }}
                    className="h-10 w-16 rounded-lg border-gray-200 bg-gray-50 text-center text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Annual Growth (צמיחה שנתית) */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-[#2563EB] w-24 text-right">צמיחה שנתית</span>
              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  value={`${filters.growthMax}%`}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    updateFilter("growthMax", parseInt(val) || 0);
                  }}
                  className="h-10 w-16 rounded-lg border-gray-200 bg-gray-50 text-center text-sm"
                />
                <span className="text-gray-400">—</span>
                <Input
                  type="text"
                  value={`${filters.growthMin}%`}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    updateFilter("growthMin", parseInt(val) || 0);
                  }}
                  className="h-10 w-16 rounded-lg border-gray-200 bg-gray-50 text-center text-sm"
                />
              </div>
            </div>

            {/* Row 4: Country (מדינה) */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-gray-600 w-24 text-right">מדינה</span>
              <Select value={filters.country} onValueChange={(value) => updateFilter("country", value)}>
                <SelectTrigger className="h-10 w-40 rounded-lg border-gray-200 bg-gray-50 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="israel">ישראל</SelectItem>
                  <SelectItem value="usa">ארצות הברית</SelectItem>
                  <SelectItem value="europe">אירופה</SelectItem>
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* SECTORS AREA */}
          <div className="bg-[#EEF3FB] rounded-2xl p-6">
            <h3 className="text-center text-sm font-medium text-gray-700 mb-6">סקטורים</h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {sectorOptions.map((sector) => (
                <label
                  key={sector.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-sm text-gray-700">{sector.label}</span>
                  <Checkbox
                    checked={filters.sectors.includes(sector.id)}
                    onCheckedChange={() => toggleSector(sector.id)}
                    className="h-5 w-5 rounded border-gray-300 data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-[#2563EB]"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
