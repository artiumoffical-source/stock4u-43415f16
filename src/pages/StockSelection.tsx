import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import LogoMarquee from "@/components/LogoMarquee";
import { useGift } from "@/contexts/GiftContext";
import { StockFilterBar, Region, StockType } from "@/components/stock-selection/StockFilterBar";
import { CompactStockCard, Stock } from "@/components/stock-selection/CompactStockCard";
import {
  usStocks,
  israelStocks,
  usETFs,
  israelETFs,
  usTechStocks,
  israelTechStocks,
  cryptoETFs,
} from "@/data/stockData";

export default function StockSelection() {
  const [selectedRegion, setSelectedRegion] = useState<Region>("us");
  const [selectedType, setSelectedType] = useState<StockType>("single_stocks");
  const [searchQuery, setSearchQuery] = useState("");
  const { giftData, addStock, removeStock, resetGiftData } = useGift();
  const navigate = useNavigate();

  // Clean up and scroll to top on mount
  useEffect(() => {
    resetGiftData();
    window.scrollTo(0, 0);
  }, []);

  // Get stock amount from gift data
  const getStockAmount = (symbol: string) => {
    const stock = giftData.selectedStocks.find((s) => s.symbol === symbol);
    return stock ? stock.amount : 0;
  };

  // Get current stocks based on filters
  const getCurrentStocks = (): Stock[] => {
    // Crypto is region-agnostic
    if (selectedType === "crypto") {
      let stocks = cryptoETFs;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        stocks = stocks.filter(
          (s) =>
            s.symbol.toLowerCase().includes(query) ||
            s.company.toLowerCase().includes(query)
        );
      }
      return stocks;
    }

    let stocks: Stock[];
    if (selectedRegion === "us") {
      switch (selectedType) {
        case "single_stocks":
          stocks = usStocks;
          break;
        case "etfs":
          stocks = usETFs;
          break;
        case "tech_sector":
          stocks = usTechStocks;
          break;
        default:
          stocks = usStocks;
      }
    } else {
      switch (selectedType) {
        case "single_stocks":
          stocks = israelStocks;
          break;
        case "etfs":
          stocks = israelETFs;
          break;
        case "tech_sector":
          stocks = israelTechStocks;
          break;
        default:
          stocks = israelStocks;
      }
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      stocks = stocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(query) ||
          s.company.toLowerCase().includes(query)
      );
    }

    return stocks;
  };

  const currentStocks = getCurrentStocks();

  // All stocks combined for logo lookup
  const allStocks = [...usStocks, ...israelStocks, ...usETFs, ...israelETFs, ...usTechStocks, ...israelTechStocks, ...cryptoETFs];

  // Get logo URL for a stock symbol
  const getStockLogo = (symbol: string) => {
    const stock = allStocks.find((s) => s.symbol === symbol);
    return stock?.logoUrl || "";
  };

  // Update stock amount
  const updateStockAmount = (symbol: string, amount: number) => {
    const stockInfo = allStocks.find((s) => s.symbol === symbol);

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
    window.scrollTo(0, 0);
    navigate("/order-details");
  };

  const getTotalSelectedStocks = () => giftData.selectedStocks.length;
  const getTotalGiftAmount = () =>
    giftData.selectedStocks.reduce((sum, stock) => sum + stock.amount, 0);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="w-full h-[200px] md:h-[400px] relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fcdbf23f1263346e6b8dd2417d75a13ce?format=webp&width=2400&quality=90"
          alt="כל המניות שתוכלו לרצות במקום אחד"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Filter Bar */}
      <StockFilterBar
        selectedRegion={selectedRegion}
        selectedType={selectedType}
        searchQuery={searchQuery}
        onRegionChange={setSelectedRegion}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content - Added pb-32 to prevent content hiding behind sticky bar */}
      <div className={`px-4 md:px-6 py-6 bg-gray-50 min-h-[600px] ${getTotalSelectedStocks() > 0 ? 'pb-32' : ''}`}>
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-gray-500">
              {currentStocks.length} תוצאות
            </p>
            <h2 className="text-sm font-semibold text-[#486284]">
              {selectedType === "single_stocks" && "מניות בודדות"}
              {selectedType === "etfs" && "תעודות סל"}
              {selectedType === "tech_sector" && "טכנולוגיה"}
              {selectedType === "crypto" && "קריפטו"}
              {selectedType !== "crypto" && (
                <>
                  {" • "}
                  {selectedRegion === "us" ? 'ארה"ב' : "ישראל"}
                </>
              )}
            </h2>
          </div>

          {/* Stock Grid - More compact */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-12">
            {currentStocks.map((stock) => (
              <CompactStockCard
                key={stock.symbol}
                stock={stock}
                investmentAmount={getStockAmount(stock.symbol)}
                onInvestmentAmountChange={updateStockAmount}
              />
            ))}
          </div>
        </div>
      </div>

      {/* THE STICKY BAR - Large & Luxurious Version */}
      {getTotalSelectedStocks() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-blue-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex items-center justify-between">
            
            {/* LEFT SIDE: The Action Button */}
            <button
              onClick={continueToGiftDesign}
              className="bg-[hsl(var(--stock4u-happy-blue))] hover:bg-blue-700 text-white h-12 md:h-14 px-6 md:px-10 rounded-2xl font-bold text-base md:text-xl shadow-lg shadow-blue-200/50 hover:-translate-y-1 transition-all flex items-center gap-2 md:gap-3 shrink-0"
            >
              <span>המשך לפרטים</span>
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* RIGHT SIDE: Info & Visuals */}
            <div className="flex items-center gap-4 md:gap-8">
              
              {/* 1. The Logo Stack (Larger & Spaced) */}
              <div className="hidden sm:flex flex-row-reverse items-center">
                {/* Overflow Badge */}
                {giftData.selectedStocks.length > 5 && (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-100 border-[3px] border-white flex items-center justify-center text-sm font-bold text-gray-500 shadow-sm z-0 -mr-4 md:-mr-5">
                    +{giftData.selectedStocks.length - 5}
                  </div>
                )}
                
                {/* The Logos - Max 5 */}
                {giftData.selectedStocks.slice(0, 5).map((item, index) => (
                  <div 
                    key={item.symbol} 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-[3px] border-white shadow-md flex items-center justify-center overflow-hidden -mr-4 md:-mr-5 first:mr-0 hover:z-20 hover:scale-110 transition-transform"
                    style={{ zIndex: 10 - index }}
                  >
                    <img 
                      src={getStockLogo(item.symbol)} 
                      alt={item.symbol} 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                ))}
              </div>

              {/* 2. Text Summary - Desktop */}
              <div className="hidden md:flex flex-col items-end text-right border-r-2 border-gray-100 pr-6 md:pr-8">
                <span className="text-sm text-gray-400 font-medium mb-1">סה״כ לתשלום</span>
                <span className="text-2xl md:text-3xl font-black text-slate-800 leading-none tracking-tight">
                  ₪{getTotalGiftAmount().toLocaleString()}
                </span>
              </div>

              {/* Mobile Only Summary (Simple) */}
              <div className="flex flex-col items-end text-right md:hidden">
                <span className="text-xl font-black text-slate-800">₪{getTotalGiftAmount().toLocaleString()}</span>
                <span className="text-xs text-gray-500">{getTotalSelectedStocks()} פריטים</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-[#486284] mb-2">
                24+
              </div>
              <div className="text-sm text-gray-500">מדינות שבהם אנו עובדים</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-[#486284] mb-2">
                17M
              </div>
              <div className="text-sm text-gray-500">אנשים שהאמינו בנו</div>
            </div>
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl md:text-5xl font-bold text-[#486284] mb-2">
                +95%
              </div>
              <div className="text-sm text-gray-500">לקוחות מרוצים</div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Ticker */}
      <LogoMarquee />

      <Footer />
    </Layout>
  );
}
