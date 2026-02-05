import { cn } from "@/lib/utils";

export type Region = "us" | "israel";
export type StockType = "single_stocks" | "etfs" | "tech_sector";

interface StockFilterBarProps {
  selectedRegion: Region;
  selectedType: StockType;
  onRegionChange: (region: Region) => void;
  onTypeChange: (type: StockType) => void;
}

export function StockFilterBar({
  selectedRegion,
  selectedType,
  onRegionChange,
  onTypeChange,
}: StockFilterBarProps) {
  const regions: { id: Region; label: string; flag: string }[] = [
    { id: "us", label: 'ארה"ב', flag: "🇺🇸" },
    { id: "israel", label: "ישראל", flag: "🇮🇱" },
  ];

  const stockTypes: { id: StockType; label: string }[] = [
    { id: "single_stocks", label: "מניות בודדות" },
    { id: "etfs", label: "תעודות סל" },
    { id: "tech_sector", label: "מגזר הטכנולוגיה" },
  ];

  return (
    <div className="w-full bg-white py-6 border-b border-gray-100" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        {/* Level 1: Region Filter */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-100 rounded-full p-1 gap-1">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => onRegionChange(region.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  selectedRegion === region.id
                    ? "bg-[#4F86F9] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <span className="text-base">{region.flag}</span>
                <span>{region.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: Type Filter */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-50 rounded-full p-1 gap-1">
            {stockTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onTypeChange(type.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
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
