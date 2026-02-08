import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrderSummaryHero } from "@/components/OrderSummaryHero";
import { useGift } from "@/contexts/GiftContext";
import { ChevronLeft, Package, User, Users, Mail, Phone, Clock, Send, Gift } from "lucide-react";
import {
  usStocks,
  israelStocks,
  usETFs,
  israelETFs,
  usTechStocks,
  israelTechStocks,
  cryptoETFs,
} from "@/data/stockData";

export default function OrderSummary() {
  const navigate = useNavigate();
  const { giftData } = useGift();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // All stocks combined for logo lookup
  const allStocks = [...usStocks, ...israelStocks, ...usETFs, ...israelETFs, ...usTechStocks, ...israelTechStocks, ...cryptoETFs];
  
  const getStockLogo = (symbol: string) => {
    const stock = allStocks.find((s) => s.symbol === symbol);
    return stock?.logoUrl || "";
  };

  const selectedStocks = giftData.selectedStocks;
  const total = selectedStocks.reduce((sum, stock) => sum + (Number(stock.amount) || 0), 0);

  // Calculate scheduled date/time display
  const getScheduledDisplay = () => {
    if (giftData.sendingMethod === "immediately") return "מיידי";
    const { day, month, year } = giftData.selectedDate || {};
    const { hour, minute } = giftData.selectedTime || {};
    if (day && month && year && hour && minute) {
      return `${day}/${month}/${year} בשעה ${hour}:${minute}`;
    }
    return "לא נקבע";
  };

  // Determine delivery method display
  const getDeliveryMethodDisplay = () => {
    const methods = giftData.deliveryMethods || ["email"];
    if (methods.includes("whatsapp") && methods.includes("email")) {
      return "אימייל + וואטסאפ";
    }
    if (methods.includes("whatsapp")) return "וואטסאפ";
    return "אימייל";
  };

  if (selectedStocks.length === 0) {
    return (
      <div className="min-h-screen bg-[#E0E7F5]" dir="rtl">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#3B5B96] mb-4">סל המניות ריק</h2>
          <p className="text-muted-foreground mb-6">יש לבחור מניות לפני המשך לתשלום</p>
          <Link 
            to="/stock-selection" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4F86F9] text-white font-bold"
          >
            בחירת מניות
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E0E7F5]" dir="rtl">
      <Header />
      <OrderSummaryHero />

      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-40 -mt-4">
        {/* Main Summary Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_10px_50px_rgba(79,134,249,0.12)]">
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Gift Items Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#4F86F9] flex items-center justify-center">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-black text-[#3B5B96]">מניות במתנה ({selectedStocks.length})</h2>
              </div>
              
              <div className="space-y-3">
                {selectedStocks.map((stock) => (
                  <div 
                    key={stock.id}
                    className="flex items-center justify-between bg-[#F8FAFF] rounded-xl p-4 border border-[#E8F0FF]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-[#E8F0FF] flex items-center justify-center overflow-hidden shadow-sm">
                        <img 
                          src={getStockLogo(stock.symbol)} 
                          alt={stock.symbol}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#3B5B96]">{stock.symbol}</div>
                        <div className="text-sm text-[#6B8ABF]">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-black text-[#4F86F9]">
                        ₪{stock.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 p-4 bg-gradient-to-r from-[#34C759] to-[#4ADE80] rounded-xl flex items-center justify-between">
                <span className="text-white font-bold text-lg">סה״כ לתשלום</span>
                <span className="text-white text-2xl font-black">₪{total.toLocaleString()}</span>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Sender Details */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#FF6B9D] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-black text-[#3B5B96]">שולח המתנה</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FFF5F8] rounded-xl p-4 border border-pink-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1">שם</div>
                  <div className="text-[#3B5B96] font-medium">{giftData.senderName || "לא צוין"}</div>
                </div>
                <div className="bg-[#FFF5F8] rounded-xl p-4 border border-pink-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1">אימייל</div>
                  <div className="text-[#3B5B96] font-medium">{giftData.senderEmail || "לא צוין"}</div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Recipient Details */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#34C759] flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-black text-[#3B5B96]">מקבל המתנה</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F0FFF4] rounded-xl p-4 border border-green-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1 flex items-center gap-1">
                    <User className="w-3 h-3" /> שם
                  </div>
                  <div className="text-[#3B5B96] font-medium">{giftData.recipientDetails?.name || "לא צוין"}</div>
                </div>
                <div className="bg-[#F0FFF4] rounded-xl p-4 border border-green-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" /> אימייל
                  </div>
                  <div className="text-[#3B5B96] font-medium">{giftData.recipientDetails?.email || "לא צוין"}</div>
                </div>
                <div className="bg-[#F0FFF4] rounded-xl p-4 border border-green-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> טלפון
                  </div>
                  <div className="text-[#3B5B96] font-medium">{giftData.recipients?.[0]?.phone || "לא צוין"}</div>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Delivery Details */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#FFC845] flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-black text-[#3B5B96]">פרטי משלוח</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FFFBF0] rounded-xl p-4 border border-yellow-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1 flex items-center gap-1">
                    <Send className="w-3 h-3" /> אמצעי משלוח
                  </div>
                  <div className="text-[#3B5B96] font-medium">{getDeliveryMethodDisplay()}</div>
                </div>
                <div className="bg-[#FFFBF0] rounded-xl p-4 border border-yellow-100">
                  <div className="text-xs font-bold text-[#9CB0D4] mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> זמן משלוח
                  </div>
                  <div className="text-[#3B5B96] font-medium">{getScheduledDisplay()}</div>
                </div>
              </div>
            </section>

            {/* Personal Message */}
            {giftData.greetingMessage && (
              <>
                <hr className="border-gray-100" />
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-[#9B87F5] flex items-center justify-center">
                      <Gift className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-lg font-black text-[#3B5B96]">הודעה אישית</h2>
                  </div>
                  <div className="bg-[#F5F3FF] rounded-xl p-4 border border-purple-100">
                    <p className="text-[#3B5B96] whitespace-pre-wrap">{giftData.greetingMessage}</p>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-blue-100 shadow-[0_-8px_30px_rgba(79,134,249,0.1)] z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          {/* Left: Navigation Buttons */}
          <div className="flex gap-3">
            <Link 
              to="/order-details" 
              className="px-5 py-3 rounded-xl border-2 border-[#E0E8F5] bg-white text-[#6B8ABF] font-bold text-sm hover:bg-[#F8FAFF] transition-colors flex items-center"
            >
              חזרה לעריכה
            </Link>
            <Link 
              to="/checkout" 
              className="px-8 py-3 rounded-xl bg-[#4F86F9] hover:bg-[#3D74E8] text-white font-black text-base shadow-lg shadow-blue-200/40 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              המשך לתשלום
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: Total */}
          <div className="text-right">
            <div className="text-xs text-[#6B8ABF]">סה״כ לתשלום</div>
            <div className="text-2xl font-black text-[#3B5B96]">₪{total.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
