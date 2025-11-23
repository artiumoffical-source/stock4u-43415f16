import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CompanyTicker from "@/components/CompanyTicker";
import { useGift } from "../contexts/GiftContext";

export default function StockSelection() {
  const [selectedTab, setSelectedTab] = useState("individual");
  const [searchTerm, setSearchTerm] = useState("");
  const { giftData, addStock, removeStock, resetGiftData } =
    useGift();
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

  const StockCard = ({ stock }: { stock: any }) => {
    const [amount, setAmount] = useState(getStockAmount(stock.symbol));
    
    const handleAmountChange = (value: string) => {
      const numValue = parseInt(value) || 0;
      setAmount(numValue);
    };

    const handleAmountBlur = () => {
      updateStockAmount(stock.symbol, amount);
    };

    return (
      <div
        className="w-[380px] h-[300px] bg-white rounded-[20px] relative p-5 hover:shadow-xl transition-all duration-300"
        style={{ boxShadow: "0 4px 81.4px 0 rgba(72, 98, 132, 0.15)" }}
      >
        {/* Expand Icon */}
        <div className="absolute top-4 left-4">
          <div className="w-[22px] h-[22px] bg-[#4C7EFB] rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors cursor-pointer">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 28 28">
              <path
                fillRule="evenodd"
                d="M14.3969 3.27417C14.3969 3.05039 14.308 2.83578 14.1498 2.67755C13.9916 2.51931 13.777 2.43042 13.5532 2.43042H7.98443C6.09443 2.43042 5.14943 2.43042 4.4238 2.7983C3.78879 3.12186 3.2725 3.63815 2.94893 4.27317C2.58105 4.99542 2.58105 5.94042 2.58105 7.8338V13.4025C2.58105 13.6263 2.66995 13.8409 2.82818 13.9992C2.98642 14.1574 3.20103 14.2463 3.4248 14.2463C3.64858 14.2463 3.86319 14.1574 4.02143 13.9992C4.17966 13.8409 4.26855 13.6263 4.26855 13.4025V7.8338C4.26855 6.86011 4.26855 6.23236 4.30905 5.75817C4.34618 5.29917 4.4103 5.13042 4.45249 5.04604C4.61449 4.72879 4.87268 4.47061 5.18993 4.30861C5.2743 4.26642 5.44305 4.2023 5.90205 4.16517C6.37962 4.12636 7.00905 4.12467 7.97768 4.12467H13.5464C13.7702 4.12467 13.9848 4.03577 14.1431 3.87754C14.3013 3.71931 14.3902 3.5047 14.3902 3.28092L14.3969 3.27417Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Company info with logo */}
        <div className="pt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-[#486284] opacity-80">{stock.logo}</div>
            <h3
              className="text-[28px] font-bold text-[#486284] leading-[32px]"
              style={{
                fontFamily:
                  "Hanken Grotesk, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              {stock.symbol}
            </h3>
          </div>
          <p
            className="text-[12px] text-[#486284] opacity-50 mb-4 leading-[18px]"
            style={{
              fontFamily:
                "Hanken Grotesk, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            {stock.company}
          </p>
        </div>

        {/* Description */}
        <div className="px-2">
          <p
            className="text-[14px] text-[#486284] leading-[134%] text-right mb-4 h-[80px] overflow-hidden"
            style={{
              fontFamily:
                "Hanken Grotesk, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            {stock.description}
          </p>
        </div>

        {/* Gift Amount Input */}
        <div className="absolute bottom-16 right-4 left-4">
          <div className="flex items-center gap-2 justify-center">
            <span
              className="text-[14px] text-[#486284] font-medium"
              style={{
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              ₪
            </span>
            <input
              type="number"
              placeholder="0"
              value={amount || ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              onBlur={handleAmountBlur}
              className="w-20 h-8 border border-[#DBE3F3] rounded-md text-center text-[14px] text-[#486284] focus:outline-none focus:ring-2 focus:ring-[#4C7EFB] focus:border-transparent"
              style={{
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            />
            <span
              className="text-[14px] text-[#486284] font-medium"
              style={{
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              סכום המתנה
            </span>
          </div>
        </div>

        {/* Selected indicator */}
        {amount > 0 && (
          <div className="absolute bottom-4 left-4">
            <div className="w-[100px] h-[30px] bg-green-100 border border-green-300 rounded-[15px] flex items-center justify-center">
              <span
                className="text-[12px] font-bold text-green-700"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                נבחר ₪{amount}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Get current data based on selected tab
  const currentData = selectedTab === "individual" ? individualStocks : etfs;

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header
        className="w-full bg-white px-6 py-3 h-[80px] flex items-center border-b border-[#DDD]"
        style={{ boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
      >
        <div className="w-full flex items-center justify-between">
          {/* Left side - Cart and Login */}
          <div className="flex items-center gap-5">
            {/* Shopping Cart with notification */}
            <div className="relative cursor-pointer" onClick={goToCart}>
              <div
                className="w-[40px] h-[38px] bg-[#4C7EFB] rounded-[40px] flex items-center justify-center hover:bg-blue-600 transition-colors"
                style={{ boxShadow: "10px 10px 0 0 rgba(0, 0, 0, 0.10)" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 25 25"
                >
                  <path
                    d="M19.9481 10.3121H5.35211C5.05673 10.3124 4.76524 10.3795 4.49943 10.5083C4.23362 10.6372 4.00037 10.8244 3.81711 11.0561C3.63462 11.2871 3.50709 11.5566 3.4442 11.8442C3.38131 12.1318 3.3847 12.43 3.45411 12.7161L5.01911 19.1241C5.2457 19.9497 5.73767 20.6778 6.41911 21.1961C7.10111 21.7151 7.93611 21.9961 8.79511 21.9961H16.5031C17.3621 21.9961 18.1971 21.7151 18.8791 21.1961C19.5606 20.6778 20.0525 19.9497 20.2791 19.1241L21.8441 12.7171C21.9495 12.2851 21.9032 11.8301 21.7132 11.4282C21.5231 11.0262 21.2008 10.7018 20.8001 10.5091C20.5335 10.3811 20.2418 10.3138 19.9461 10.3121M8.73711 14.2061V18.1011M12.6501 14.2061V18.1011M16.5631 14.2061V18.1011M19.4981 10.3121C19.4978 9.41614 19.3204 8.52909 18.9761 7.70191C18.6319 6.87473 18.1275 6.12374 17.4921 5.4921C16.2056 4.21259 14.4646 3.4949 12.6501 3.4961C10.8357 3.4949 9.09463 4.21259 7.80811 5.4921C7.17288 6.12383 6.66873 6.87485 6.32465 7.70203C5.98056 8.5292 5.80332 9.41621 5.80311 10.3121"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {getTotalSelectedStocks() > 0 && (
                <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#FFC547] border-2 border-white rounded-full flex items-center justify-center">
                  <span
                    className="text-xs font-bold text-[#1521B2]"
                    style={{
                      fontFamily:
                        "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    {getTotalSelectedStocks()}
                  </span>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="w-[100px] h-[38px] bg-[#DBE3F3] rounded-[40px] flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span
                className="text-[#4C7EFB] font-bold text-[15px]"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                כניסה
              </span>
            </Link>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=800"
              alt="Stock4U Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center p-[10px]">
              <button
                onClick={() => {
                  // Toggle search functionality - for now just focus on search input
                  const searchInput = document.querySelector(
                    'input[placeholder="חיפוש"]',
                  ) as HTMLInputElement;
                  if (searchInput) {
                    searchInput.focus();
                  }
                }}
                className="text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors cursor-pointer"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                חיפוש
              </button>
            </div>
            <div className="flex items-center justify-center p-[10px]">
              <Link
                to="/careers"
                className="text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                קריירה
              </Link>
            </div>
            <div className="flex items-center justify-center p-[10px]">
              <Link
                to="/stock-selection"
                className="text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors font-bold"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                רשימת מתנות
              </Link>
            </div>
            <div className="flex items-center justify-center p-[10px]">
              <Link
                to="/about"
                className="text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                אודות
              </Link>
            </div>
            <div className="flex items-center justify-center p-[10px]">
              <Link
                to="/"
                className="text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors"
                style={{
                  fontFamily:
                    "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                בית
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-full h-[400px] relative">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2Fcdbf23f1263346e6b8dd2417d75a13ce?format=webp&width=2400&quality=90"
          alt="כל המניות שתוכלו לרצות במקום אחד"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Controls Section */}
      <div className="bg-white py-12">
        <div className="flex items-center justify-center gap-6">
          {/* AI Icon */}
          <div
            className="w-[50px] h-[50px] bg-white rounded-[8px] p-2 flex items-center justify-center"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="w-[30px] h-[30px] bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 40 39"
              >
                <path
                  d="M15.1885 8.80151C16.0373 6.3812 19.4888 6.29977 20.498 8.57886L20.584 8.80249V8.80347L21.8955 12.5398C22.2154 13.4519 22.7323 14.2855 23.4102 14.9851C24.088 15.6847 24.9114 16.2341 25.8242 16.5964L25.835 16.6003L26.1875 16.7292L26.1982 16.7322L30.0332 18.0085C32.5212 18.8371 32.597 22.173 30.2676 23.156L30.0332 23.2429L26.1982 24.5203C25.2653 24.8306 24.4105 25.3326 23.6924 25.9929C22.9742 26.6532 22.4095 27.4568 22.0361 28.3494H22.0352L22.0312 28.3601L21.8994 28.7019L21.8955 28.7136L20.5859 32.4519C19.7632 34.7969 16.4977 34.9455 15.3789 32.8816L15.2773 32.6755L15.1826 32.4363L13.8789 28.7146C13.5593 27.8024 13.043 26.9682 12.3652 26.2683C11.6874 25.5684 10.8632 25.0185 9.9502 24.656L9.94043 24.6521L9.58887 24.5242L9.57812 24.5203L5.74316 23.2439C3.2521 22.4149 3.17697 19.0752 5.51074 18.0955L5.75781 18.0037L9.57812 16.7322C10.5107 16.4217 11.3652 15.9198 12.083 15.2595C12.8008 14.5993 13.3661 13.7964 13.7393 12.9041L13.7432 12.8933L13.875 12.5515L13.8789 12.5398L15.1885 8.80151Z"
                  fill="#4C7EFB"
                  stroke="white"
                  strokeWidth="0.8"
                />
              </svg>
            </div>
          </div>

          {/* Settings Icon */}
          <div
            className="w-[50px] h-[50px] bg-white rounded-[8px] p-2 flex items-center justify-center"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="w-[30px] h-[30px] bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="w-[220px] h-[50px] bg-white rounded-[8px] p-3 flex items-center gap-3"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <svg
              className="w-[18px] h-[17px] text-[#4C7EFB]"
              fill="currentColor"
              viewBox="0 0 23 22"
            >
              <path
                d="M20.2876 18.4153L15.8721 14.2005C17.1312 12.8183 17.779 11.0235 17.6788 9.19429C17.5786 7.36512 16.7382 5.64453 15.335 4.39523C13.9317 3.14593 12.075 2.46551 10.1564 2.49741C8.23782 2.52931 6.40714 3.27102 5.05028 4.56621C3.69341 5.8614 2.91638 7.60887 2.88296 9.44027C2.84954 11.2717 3.56236 13.0439 4.87115 14.3834C6.17995 15.7229 7.98246 16.525 9.89874 16.6207C11.815 16.7163 13.6953 16.098 15.1434 14.8961L19.5588 19.1109C19.6566 19.1978 19.7859 19.2452 19.9194 19.2429C20.053 19.2407 20.1805 19.189 20.2749 19.0988C20.3694 19.0087 20.4235 18.887 20.4259 18.7595C20.4282 18.632 20.3787 18.5086 20.2876 18.4153ZM3.93883 9.5756C3.93883 8.375 4.3118 7.20137 5.01057 6.20311C5.70935 5.20485 6.70255 4.42681 7.86457 3.96736C9.0266 3.50791 10.3053 3.3877 11.5389 3.62192C12.7725 3.85615 13.9056 4.43429 14.795 5.28324C15.6843 6.13219 16.29 7.21381 16.5354 8.39134C16.7808 9.56886 16.6548 10.7894 16.1735 11.8986C15.6922 13.0078 14.8771 13.9559 13.8313 14.6229C12.7855 15.2899 11.556 15.6459 10.2982 15.6459C8.61222 15.644 6.99588 15.0038 5.8037 13.8658C4.61153 12.7278 3.94087 11.1849 3.93883 9.5756Z"
                fill="#4C7EFB"
              />
            </svg>
            <input
              type="text"
              placeholder="חיפוש"
              className="flex-1 border-none outline-none text-[#4C7EFB] placeholder-[#4C7EFB] text-[16px] opacity-30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            />
          </div>

          {/* Category Dropdown */}
          <div
            className="w-[220px] h-[50px] bg-white rounded-[8px] border border-[#DBE3F3] px-5 py-3 flex items-center justify-between cursor-pointer"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <svg
              className="w-[16.27px] h-[8.135px] text-[#4C7EFB]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 19 11"
            >
              <path d="M1.32715 0.820557L9.46191 8.95569L17.597 0.820557" />
            </svg>
            <span
              className="text-[#4C7EFB] text-[16px] font-medium"
              style={{
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              טכנולוגיה
            </span>
          </div>

          {/* Toggle Tabs */}
          <div
            className="w-[320px] h-[50px] bg-white rounded-[8px] border border-[#DBE3F3] p-[5px] flex"
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            <button
              className={`w-[150px] h-[40px] rounded-[6px] flex items-center justify-center text-[16px] font-medium transition-all ${
                selectedTab === "individual"
                  ? "bg-[#4C7EFB] text-white"
                  : "text-[#4C7EFB]"
              }`}
              onClick={() => setSelectedTab("individual")}
              style={{
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              מניות בודדות
            </button>
            <button
              className={`w-[150px] h-[40px] rounded-[6px] flex items-center justify-center text-[16px] font-medium transition-all ${
                selectedTab === "etfs"
                  ? "bg-[#4C7EFB] text-white"
                  : "text-[#4C7EFB]"
              }`}
              onClick={() => setSelectedTab("etfs")}
              style={{
                fontFamily:
                  "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
              }}
            >
              תעודות סל
            </button>
          </div>
        </div>
      </div>

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
                ? "grid-cols-3"
                : "grid-cols-2 max-w-[900px] mx-auto"
            }`}
          >
            {currentData.map((stock, index) => (
              <StockCard key={`${selectedTab}-${index}`} stock={stock} />
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
    </div>
  );
}
