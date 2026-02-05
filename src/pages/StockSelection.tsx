import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import CompanyTicker from "@/components/CompanyTicker";
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

  // Update stock amount
  const updateStockAmount = (symbol: string, amount: number) => {
    const stockInfo = [...usStocks, ...israelStocks, ...usETFs, ...israelETFs, ...cryptoETFs].find(
      (s) => s.symbol === symbol
    );

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

      {/* Main Content */}
      <div className="px-4 md:px-6 py-6 bg-gray-50 min-h-[600px]">
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

          {/* Continue Button - Desktop */}
          <div className="hidden md:block text-center mb-12">
            {getTotalSelectedStocks() > 0 && (
              <div className="mb-4">
                <p className="text-lg font-bold text-[#486284] mb-2">
                  סך הכל: ₪{getTotalGiftAmount().toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {getTotalSelectedStocks()} מניות נבחרו
                </p>
              </div>
            )}
            <button
              onClick={continueToGiftDesign}
              disabled={getTotalSelectedStocks() === 0}
              className={`w-[250px] h-[50px] rounded-full font-bold text-base transition-all duration-200 ${
                getTotalSelectedStocks() > 0
                  ? "bg-[#4F86F9] hover:bg-[#3d6fd9] text-white cursor-pointer shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              המשך לפרטים וברכה
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating CTA */}
      {getTotalSelectedStocks() > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between gap-3">
            <div className="text-right flex-1">
              <p className="text-sm font-bold text-[#486284]">
                סך הכל: ₪{getTotalGiftAmount().toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {getTotalSelectedStocks()} מניות נבחרו
              </p>
            </div>
            <button
              onClick={continueToGiftDesign}
              className="bg-[#4F86F9] hover:bg-[#3d6fd9] text-white px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 whitespace-nowrap"
            >
              המשך לפרטים וברכה
            </button>
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
      <CompanyTicker />

      <Footer />
    </Layout>
  );
}
