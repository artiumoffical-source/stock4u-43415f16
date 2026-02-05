import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type Region = "us" | "israel";
export type StockType = "single_stocks" | "etfs" | "tech_sector" | "crypto";

interface StockFilterBarProps {
  selectedRegion: Region;
  selectedType: StockType;
  searchQuery: string;
  onRegionChange: (region: Region) => void;
  onTypeChange: (type: StockType) => void;
  onSearchChange: (query: string) => void;
}

export function StockFilterBar({
  selectedRegion,
  selectedType,
  searchQuery,
  onRegionChange,
  onTypeChange,
  onSearchChange,
}: StockFilterBarProps) {
  const regions: { id: Region; label: string; flag: string }[] = [
    { id: "us", label: 'ארה"ב', flag: "🇺🇸" },
    { id: "israel", label: "ישראל", flag: "🇮🇱" },
  ];

  const stockTypes: { id: StockType; label: string }[] = [
    { id: "single_stocks", label: "מניות בודדות" },
    { id: "etfs", label: "תעודות סל" },
    { id: "tech_sector", label: "מגזר הטכנולוגיה" },
    { id: "crypto", label: "קריפטו 🪙" },
  ];

  return (
    <div className="w-full bg-white py-4 border-b border-gray-100" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 space-y-4">
        {/* Search Bar */}
        <div className="flex justify-center">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="חפש מניה או תעודת סל..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pr-10 pl-4 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F86F9] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          {/* Region Filter */}
          <div className="inline-flex bg-gray-100 rounded-full p-0.5 gap-0.5">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => onRegionChange(region.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5",
                  selectedRegion === region.id
                    ? "bg-[#4F86F9] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <span>{region.flag}</span>
                <span>{region.label}</span>
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="inline-flex bg-gray-50 rounded-full p-0.5 gap-0.5">
            {stockTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                  selectedType === type.id
                    ? "bg-[#4F86F9] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
