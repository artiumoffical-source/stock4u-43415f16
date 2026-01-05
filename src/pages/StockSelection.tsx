import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Footer from "../components/Footer";
import CompanyTicker from "@/components/CompanyTicker";
import { useGift } from "../contexts/GiftContext";
import { useCart } from "../contexts/CartContext";
import StockFilters, { FilterState } from "@/components/StockFilters";
import { StockCard } from "@/components/StockCard";
export default function StockSelection() {
  const [selectedTab, setSelectedTab] = useState("individual");
  const [filters, setFilters] = useState<FilterState>({
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
  });
  const { giftData, addStock, removeStock, resetGiftData } = useGift();
  const navigate = useNavigate();

  // Clean up any old localStorage data on first visit and scroll to top
  useEffect(() => {
    // Always reset to ensure 0 quantities by default
    resetGiftData();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Get selected stocks amounts for display
  const getStockAmount = (symbol: string) => {
    const stock = giftData.selectedStocks.find(s => s.symbol === symbol);
    return stock ? stock.amount : 0;
  };

  // Top 5 US stocks (מניות בודדות)
  const individualStocks = [
    {
      symbol: "AAPL",
      company: "Apple Inc.",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#1d1d1f">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      ),
      description:
        "אפל היא חברת הטכנולוגיה הגדולה והמוכרת בעולם. מייצרת iPhone, iPad, Mac, Apple Watch ושירותים דיגיטליים. החברה מפורסמת בחדשנות, איכות בנייה ומערכת אקולוגית אינטגרטיבית שמחברת בין כל המוצרים.",
    },
    {
      symbol: "NVDA",
      company: "NVIDIA Corporation",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect width="24" height="24" rx="4" fill="#76B900" />
          <path d="M12 4L20 12L12 20L4 12Z" fill="#FFF" />
          <path d="M12 8L16 12L12 16L8 12Z" fill="#76B900" />
        </svg>
      ),
      description:
        "NVIDIA מובילה עולמית בתחום עיבוד גרפי ובינה מלאכותית. החברה מייצרת כרטיסי גרפיקה מתקדמים, מעבדי AI וחומרה לרכב אוטונומי. גם פיתוח תחום הבינה המלאכותית, NVIDIA נחשבת להשקעה עתידנית.",
    },
    {
      symbol: "MSFT",
      company: "Microsoft Corporation",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      ),
      description:
        "מיקרוסופט היא ענקית תוכנה וטכנולוגיה עם התמחות במחשוב בענן, פרודוקטיביות עסקית ובינה מלאכותית. החברה מפעילה את Azure, Office 365, Windows ורכשה חברות מובילות כמו GitHub ו-LinkedIn.",
    },
    {
      symbol: "GOOGL",
      company: "Alphabet Inc. (Google)",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <circle cx="12" cy="12" r="11" fill="#4285F4" />
          <circle cx="12" cy="12" r="8" fill="#FFF" />
          <circle cx="12" cy="8" r="2" fill="#EA4335" />
          <circle cx="8" cy="16" r="2" fill="#FBBC05" />
          <circle cx="16" cy="16" r="2" fill="#34A853" />
          <text
            x="12"
            y="15"
            textAnchor="middle"
            fontSize="6"
            fill="#4285F4"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            G
          </text>
        </svg>
      ),
      description:
        "אלפבית היא החברה האם של גוגל, המובילה בתחום החיפוש, פרסום דיגיטלי וטכנולוגיות חדשניות. החברה מפתחת מוצרים כמו Android, YouTube, Google Cloud ומשקיעה בטכנולוגיות עתיד כמו רכב אוטונומי.",
    },
    {
      symbol: "AMZN",
      company: "Amazon.com Inc.",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#232F3E" />
          <path
            d="M5 16c4 2 10 2 14 0"
            stroke="#FF9900"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="18" cy="15" r="1" fill="#FF9900" />
          <text
            x="12"
            y="10"
            textAnchor="middle"
            fontSize="4"
            fill="#FFF"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            amazon
          </text>
        </svg>
      ),
      description:
        "אמזון היא ענקית המסחר האלקטרוני והענן החישובי בעולם. החברה מפעילה את פלטפורמת הקניות הגדולה ביותר, שירותי AWS לענן החישובי, ושירותי סטרימינג ובידור דרך Amazon Prime.",
    },
  ];

  // Major ETFs (תעודות סל עיקריות)
  const etfs = [
    {
      symbol: "SPY",
      company: "SPDR S&P 500 ETF Trust",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#003E7E" />
          <rect x="5" y="5" width="14" height="14" rx="2" fill="#FFFFFF" />
          <path d="M8 9L12 6L16 9V17H8V9Z" fill="#003E7E" />
          <text
            x="12"
            y="15"
            textAnchor="middle"
            fontSize="3"
            fill="#FFFFFF"
            fontWeight="bold"
          >
            SPY
          </text>
        </svg>
      ),
      description:
        'תעודת הסל הפופולרית ביותר בעולם העוקבת אחרי מדד S&P 500. כוללת את 500 החברות הגדולות בארה"ב ומציעה חשיפה רחבה לכלכלה האמריקנית. אידיאלית למשקיעים המחפשים השקעה מגוונת ויציבה.',
    },
    {
      symbol: "QQQ",
      company: "Invesco QQQ Trust (NASDAQ-100)",
      logo: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#0066CC" />
          <rect x="5" y="5" width="14" height="14" rx="2" fill="#FFFFFF" />
          <circle cx="12" cy="12" r="5" fill="#0066CC" />
          <text
            x="12"
            y="14"
            textAnchor="middle"
            fontSize="3"
            fill="#FFFFFF"
            fontWeight="bold"
          >
            QQQ
          </text>
        </svg>
      ),
      description:
        'תעודת סל העוקבת אחרי מדד נאסד"ק 100, המתמקדת בחברות הטכנולוגיה הגדולות והחדשניות ביותר. כוללת את המובילות כמו אפל, מיקרוסופט, גוגל ואמזון. מתאימה למשקיעים המעוניינים בחשיפה לסקטור הטכנולוגיה.',
    },
  ];

  const updateStockAmount = (symbol: string, amount: number) => {
    const stockInfo =
      individualStocks.find((s) => s.symbol === symbol) ||
      etfs.find((s) => s.symbol === symbol);

    if (stockInfo && amount > 0) {
      addStock({
        symbol: stockInfo.symbol,
        name: stockInfo.company,
        amount: amount,
      });
    } else if (amount === 0) {
      removeStock(symbol);
    }
  };

  const continueToGiftDesign = () => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate("/order-details");
  };

  const goToCart = () => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate("/order-details");
  };

  const getTotalSelectedStocks = () => {
    return giftData.selectedStocks.length;
  };

  const getTotalGiftAmount = () => {
    return giftData.selectedStocks.reduce((sum, stock) => sum + stock.amount, 0);
  };

  // Handle investment amount change
  const handleInvestmentAmountChange = (symbol: string, amount: number) => {
    updateStockAmount(symbol, amount);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Update the selected tab based on category
    if (newFilters.category === "single_stocks") {
      setSelectedTab("individual");
    } else {
      setSelectedTab("etfs");
    }
    
    // Here you would typically trigger data reload with the new filters
    // For now, we're just updating the state which will filter the display
  };

  // Get current data based on selected tab and apply filters
  const getCurrentData = () => {
    const baseData = selectedTab === "individual" ? individualStocks : etfs;
    
    // Apply search filter
    if (filters.search) {
      return baseData.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(filters.search.toLowerCase()) ||
          stock.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return baseData;
  };
  
  const currentData = getCurrentData();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="w-full h-[400px] relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fcdbf23f1263346e6b8dd2417d75a13ce?format=webp&width=2400&quality=90"
          alt="כל המניות שתוכלו לרצות במקום אחד"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Filters Section */}
      <StockFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2
              className="text-[26px] font-bold text-[#486284] mb-3"
              style={{
                fontFamily:
                  "Hanken Grotesk, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              {selectedTab === "individual"
                ? 'המניות הגדולות בארה"ב'
                : "תעודות הסל המובילות"}
            </h2>
            <p
              className="text-[16px] text-[#486284] opacity-70"
              style={{
                fontFamily:
                  "Hanken Grotesk, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              {selectedTab === "individual"
                ? "השקעה במניות של חברות מובילות "
                : "השקעה בסלי מניות מגוונים לניהול סיכונים אופטימלי"}
            </p>
          </div>

          {/* Stock Cards Grid - Only show current data, no repetition */}
          <div
            className={`grid gap-6 mb-12 ${
              selectedTab === "individual"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2 max-w-[900px] mx-auto"
            }`}
          >
            {currentData.map((stock, index) => (
              <StockCard
                key={`${selectedTab}-${index}`}
                stock={stock}
                investmentAmount={getStockAmount(stock.symbol)}
                onInvestmentAmountChange={handleInvestmentAmountChange}
              />
            ))}
          </div>

          {/* Continue to Gift Design Button - Always visible */}
          <div className="text-center mb-12">
            {getTotalSelectedStocks() > 0 && (
              <div className="mb-4">
                <p
                  className="text-[18px] font-bold text-[#486284] mb-2"
                  style={{
                    fontFamily:
                      "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  סך הכל: ₪{getTotalGiftAmount().toLocaleString()}
                </p>
                <p
                  className="text-[14px] text-[#486284] opacity-70"
                  style={{
                    fontFamily:
                      "Hanken Grotesk, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  {getTotalSelectedStocks()} מניות נבחרו
                </p>
              </div>
            )}
            <button
              onClick={continueToGiftDesign}
              disabled={getTotalSelectedStocks() === 0}
              className={`w-[250px] h-[50px] rounded-[40px] font-bold text-[16px] transition-all duration-200 ${
                getTotalSelectedStocks() > 0
                  ? "bg-[#4C7EFB] hover:bg-blue-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
              }`}
              style={{
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                boxShadow: getTotalSelectedStocks() > 0 ? "10px 10px 0 0 rgba(0, 0, 0, 0.10)" : "none",
              }}
            >
              המשך לפרטים וברכה
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[rgba(239,242,246,0.40)] rounded-[20px] p-6 text-center hover:bg-white transition-colors">
              <div
                className="text-[48px] font-bold text-[#486284] mb-3 leading-[60px]"
                style={{
                  fontFamily:
                    "DM Sans, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                24+
              </div>
              <div
                className="text-[16px] text-[#8CA2C0] leading-[24px]"
                style={{
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                מדינות שבהם אנו עובדים
              </div>
            </div>
            <div className="bg-[rgba(239,242,246,0.40)] rounded-[20px] p-6 text-center hover:bg-white transition-colors">
              <div
                className="text-[48px] font-bold text-[#486284] mb-3 leading-[60px]"
                style={{
                  fontFamily:
                    "DM Sans, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                17M
              </div>
              <div
                className="text-[16px] text-[#8CA2C0] leading-[24px]"
                style={{
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                אנשים שהאמינו בנו
              </div>
            </div>
            <div className="bg-[rgba(239,242,246,0.40)] rounded-[20px] p-6 text-center hover:bg-white transition-colors">
              <div
                className="text-[48px] font-bold text-[#486284] mb-3 leading-[60px]"
                style={{
                  fontFamily:
                    "DM Sans, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                +95%
              </div>
              <div
                className="text-[16px] text-[#8CA2C0] leading-[24px]"
                style={{
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                לקוחות מרוצים
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Ticker Section */}
      <CompanyTicker />

      <Footer />
    </Layout>
  );
}
