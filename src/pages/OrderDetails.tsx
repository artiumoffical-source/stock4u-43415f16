import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { StepHero } from "@/components/StepHero";
import sparkleVector from "@/assets/decorations/sparkle-vector.png";
import giftMascot from "@/assets/decorations/gift-mascot.png";
import { useGift } from "../contexts/GiftContext";
import { 
  User, 
  Users, 
  Mail, 
  Clock, 
  Send, 
  Upload, 
  Plus, 
  X, 
  Info,
  Building2,
  ChevronLeft,
  Gift,
  MessageSquare,
  Image,
  Trash2,
  Pencil
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  usStocks,
  israelStocks,
  usETFs,
  israelETFs,
  usTechStocks,
  israelTechStocks,
  cryptoETFs,
} from "@/data/stockData";

type GiftMode = "personal" | "business";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export default function OrderDetails() {
  const { giftData, updateGiftData, removeStock } = useGift();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State
  const [mode, setMode] = useState<GiftMode>("personal");
  const [senderName, setSenderName] = useState(giftData?.senderName || "");
  const [senderEmail, setSenderEmail] = useState(giftData?.senderEmail || "");
  const [companyName, setCompanyName] = useState("");
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<string[]>(["email"]);
  const [sendingMethod, setSendingMethod] = useState(giftData?.sendingMethod || "immediately");
  const [dateTimeError, setDateTimeError] = useState("");
  const [selectedDate, setSelectedDate] = useState({
    day: giftData?.selectedDate?.day || "",
    month: giftData?.selectedDate?.month || "",
    year: giftData?.selectedDate?.year || "",
  });
  const [selectedTime, setSelectedTime] = useState({
    hour: giftData?.selectedTime?.hour || "",
    minute: giftData?.selectedTime?.minute || "",
  });
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", name: giftData?.recipientDetails?.name || "", phone: "", email: giftData?.recipientDetails?.email || "" },
  ]);
  const [currentRecipient, setCurrentRecipient] = useState<Omit<Recipient, "id">>({ name: "", phone: "", email: "" });
  const [greetingText, setGreetingText] = useState(giftData?.greetingMessage || "");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // All stocks combined for logo lookup
  const allStocks = [...usStocks, ...israelStocks, ...usETFs, ...israelETFs, ...usTechStocks, ...israelTechStocks, ...cryptoETFs];
  
  // Get logo URL for a stock symbol
  const getStockLogo = (symbol: string) => {
    const stock = allStocks.find((s) => s.symbol === symbol);
    return stock?.logoUrl || "";
  };

  // Derived calculations (reactive to cart changes)
  const selectedStocks = giftData.selectedStocks;
  const cartTotal = selectedStocks.reduce((sum, stock) => sum + (Number(stock.amount) || 0), 0);
  const recipientCount = mode === "personal" ? 1 : Math.max(1, recipients.length);
  const grandTotal = cartTotal * recipientCount;

  // Date/time options
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString());

  const toggleDeliveryMethod = (method: string) => {
    setSelectedDeliveryMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        updateGiftData({ uploadedImage: imageData, companyLogo: imageData, hasLogo: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const addRecipientToList = () => {
    if (!currentRecipient.name.trim()) return;
    setRecipients((prev) => [...prev, { id: Date.now().toString(), ...currentRecipient }]);
    setCurrentRecipient({ name: "", phone: "", email: "" });
  };

  const removeRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRecipient = (id: string, field: keyof Omit<Recipient, "id">, value: string) => {
    setRecipients((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = () => {
    if (sendingMethod === "later") {
      if (!selectedDate.day || !selectedDate.month || !selectedDate.year || !selectedTime.hour || !selectedTime.minute) {
        setDateTimeError("יש לבחור תאריך ושעה");
        return;
      }
      const scheduledDate = new Date(parseInt(selectedDate.year), parseInt(selectedDate.month) - 1, parseInt(selectedDate.day), parseInt(selectedTime.hour), parseInt(selectedTime.minute));
      if (scheduledDate <= new Date()) {
        setDateTimeError("יש לבחור תאריך ושעה עתידיים");
        return;
      }
    }
    updateGiftData({
      senderName, senderEmail,
      recipientDetails: { name: recipients[0]?.name || "", email: recipients[0]?.email || "", deliveryDate: selectedDate.day && selectedDate.month && selectedDate.year ? `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}` : "" },
      deliveryMethods: selectedDeliveryMethods, sendingMethod, selectedDate, selectedTime,
      greetingMessage: greetingText, uploadedImage, selectedCard: "lightblue",
      recipients: mode === "business" ? recipients : [recipients[0]],
    });
    navigate("/checkout");
  };

  // Compact input style
  const inputClass = "w-full h-12 px-4 rounded-xl bg-[#F0F5FF] border-2 border-transparent focus:border-[#4F86F9] focus:bg-white focus:outline-none transition-all text-[#3B5B96] placeholder:text-[#9CB0D4] text-sm font-medium";
  const selectClass = "h-10 px-2 rounded-lg bg-[#F0F5FF] border-2 border-transparent focus:border-[#4F86F9] focus:bg-white text-[#3B5B96] text-sm font-medium cursor-pointer";

  return (
    <div className="min-h-screen bg-[#E0E7F5]" dir="rtl">
      <Header />
      <StepHero currentStep={1} />

      {/* Main Container - Form Section with Decorations */}
      <div className="relative overflow-x-hidden px-4 md:px-6 pb-36 -mt-4">
        
        {/* ===== DECORATIVE VECTORS (Only visible on XL screens, positioned beside the form) ===== */}
        
        {/* Right Decoration: Growth Gift Mascot */}
        <img 
          src={giftMascot} 
          alt="" 
          className="hidden xl:block absolute top-16 -right-4 2xl:right-8 w-40 2xl:w-52 opacity-90 pointer-events-none select-none rotate-6 z-0 drop-shadow-lg"
          aria-hidden="true"
        />
        
        {/* Left Decoration: Primary Sparkle */}
        <img 
          src={sparkleVector} 
          alt="" 
          className="hidden xl:block absolute top-8 -left-2 2xl:left-12 w-28 2xl:w-36 opacity-80 pointer-events-none select-none -rotate-12 z-0"
          aria-hidden="true"
        />
        
        {/* Left Decoration: Secondary Sparkle (lower) */}
        <img 
          src={sparkleVector} 
          alt="" 
          className="hidden xl:block absolute top-[50%] -left-4 2xl:left-4 w-20 2xl:w-28 opacity-60 pointer-events-none select-none rotate-[30deg] z-0"
          aria-hidden="true"
        />
        
        {/* Right Decoration: Small Sparkle (lower) */}
        <img 
          src={sparkleVector} 
          alt="" 
          className="hidden xl:block absolute bottom-40 -right-2 2xl:right-16 w-16 2xl:w-24 opacity-50 pointer-events-none select-none -rotate-45 z-0"
          aria-hidden="true"
        />

        {/* Form Card Container */}
        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Floating White Form Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_10px_50px_rgba(79,134,249,0.12)] overflow-hidden">
            
            {/* Sticky Mode Toggle Header */}
            <div className="bg-white border-b border-gray-100 p-3 flex justify-center sticky top-0 z-20">
              <div className="inline-flex bg-[#F0F5FF] p-1 rounded-full">
                <button
                  onClick={() => setMode("personal")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    mode === "personal"
                      ? "bg-[#4F86F9] text-white shadow-md"
                      : "text-[#4F86F9] hover:bg-white/50"
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  מתנה אישית
                </button>
                <button
                  onClick={() => setMode("business")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    mode === "business"
                      ? "bg-[#4F86F9] text-white shadow-md"
                      : "text-[#4F86F9] hover:bg-white/50"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  לקבוצה / חברה
                </button>
              </div>
            </div>

            {/* Form Content - Compact Spacing */}
            <div className="p-6 md:p-8 space-y-5">

              {/* ROW 1: Sender Details (2 cols) */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#4F86F9] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-black text-[#3B5B96]">ממי המתנה?</h3>
                </div>
                <div className={`grid gap-3 ${mode === "business" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
                  <div>
                    <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5">שם מלא</label>
                    <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="השם שלכם" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5">מייל</label>
                    <input type="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="your@email.com" className={inputClass} />
                  </div>
                  {mode === "business" && (
                    <div>
                      <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5 flex items-center gap-1"><Building2 className="w-3 h-3" />חברה</label>
                      <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="שם החברה" className={inputClass} />
                    </div>
                  )}
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* ROW 2: Greeting + Logo (Side by Side) */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-[#FFC845]" />
                    <h3 className="text-base font-black text-[#3B5B96]">ברכה אישית</h3>
                  </div>
                  <textarea
                    value={greetingText}
                    onChange={(e) => setGreetingText(e.target.value)}
                    placeholder="כתבו הודעה חמה למקבל המתנה... ✨"
                    maxLength={200}
                    className="w-full h-28 p-4 rounded-xl bg-[#FFFBF0] border-2 border-transparent focus:border-[#FFC845] focus:bg-white focus:outline-none transition-all text-[#3B5B96] placeholder:text-[#C4B896] text-sm font-medium resize-none"
                  />
                  <p className="text-[10px] text-[#9CB0D4] mt-1 text-left">{greetingText.length}/200</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Image className="w-4 h-4 text-[#4F86F9]" />
                    <h3 className="text-base font-black text-[#3B5B96]">לוגו</h3>
                  </div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-28 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center gap-2 border-2 ${
                      uploadedImage
                        ? "bg-[#F0F5FF] border-[#4F86F9] border-solid"
                        : "bg-[#F8FAFF] border-dashed border-[#C8D6F0] hover:border-[#4F86F9]"
                    }`}
                  >
                    {uploadedImage ? (
                      <div className="w-14 h-14 rounded-xl bg-white shadow p-1.5">
                        <img src={uploadedImage} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-[#9CB0D4]" />
                        <span className="text-xs font-bold text-[#9CB0D4]">העלאת לוגו</span>
                      </>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              </section>

              <hr className="border-gray-100" />

              {/* ROW 3: Delivery + Scheduling (Side by Side) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Delivery Method */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Send className="w-4 h-4 text-[#4F86F9]" />
                    <h3 className="text-base font-black text-[#3B5B96]">אמצעי משלוח</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleDeliveryMethod("email")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 transition-all text-sm font-bold ${
                        selectedDeliveryMethods.includes("email")
                          ? "bg-[#4F86F9] text-white border-[#4F86F9]"
                          : "bg-white text-[#6B8ABF] border-[#E0E8F5] hover:border-[#4F86F9]"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      מייל
                    </button>
                    <button
                      onClick={() => toggleDeliveryMethod("whatsapp")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 transition-all text-sm font-bold ${
                        selectedDeliveryMethods.includes("whatsapp")
                          ? "bg-[#25D366] text-white border-[#25D366]"
                          : "bg-white text-[#6B8ABF] border-[#E0E8F5] hover:border-[#25D366]"
                      }`}
                    >
                      {/* WhatsApp Icon */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      וואטסאפ
                    </button>
                  </div>
                </div>
                {/* Scheduling */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[#FF6B9D]" />
                    <h3 className="text-base font-black text-[#3B5B96]">מתי לשלוח?</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSendingMethod("immediately"); setDateTimeError(""); }}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 transition-all text-sm font-bold ${
                        sendingMethod === "immediately"
                          ? "bg-[#FF6B9D] text-white border-[#FF6B9D]"
                          : "bg-white text-[#6B8ABF] border-[#F5E0E8] hover:border-[#FF6B9D]"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      עכשיו
                    </button>
                    <button
                      onClick={() => { setSendingMethod("later"); setDateTimeError(""); }}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 transition-all text-sm font-bold ${
                        sendingMethod === "later"
                          ? "bg-[#FF6B9D] text-white border-[#FF6B9D]"
                          : "bg-white text-[#6B8ABF] border-[#F5E0E8] hover:border-[#FF6B9D]"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      מאוחר יותר
                    </button>
                  </div>
                </div>
              </section>

              {/* Date/Time Picker (Inline) */}
              {sendingMethod === "later" && (
                <div className="bg-[#FFF5F8] rounded-xl p-4 border border-pink-100">
                  <div className="flex flex-wrap gap-2 justify-center items-end">
                    <div>
                      <label className="block text-[10px] font-bold text-[#9CB0D4] mb-1 text-center">יום</label>
                      <select value={selectedDate.day} onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })} className={selectClass} style={{ width: '60px' }}>
                        <option value="">--</option>
                        {days.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#9CB0D4] mb-1 text-center">חודש</label>
                      <select value={selectedDate.month} onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })} className={selectClass} style={{ width: '90px' }}>
                        <option value="">--</option>
                        {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#9CB0D4] mb-1 text-center">שנה</label>
                      <select value={selectedDate.year} onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })} className={selectClass} style={{ width: '75px' }}>
                        <option value="">--</option>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <span className="text-pink-300 font-bold px-1">|</span>
                    <div>
                      <label className="block text-[10px] font-bold text-[#9CB0D4] mb-1 text-center">שעה</label>
                      <select value={selectedTime.hour} onChange={(e) => setSelectedTime({ ...selectedTime, hour: e.target.value })} className={selectClass} style={{ width: '60px' }}>
                        <option value="">--</option>
                        {hours.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#9CB0D4] mb-1 text-center">דקה</label>
                      <select value={selectedTime.minute} onChange={(e) => setSelectedTime({ ...selectedTime, minute: e.target.value })} className={selectClass} style={{ width: '60px' }}>
                        <option value="">--</option>
                        {minutes.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  {dateTimeError && <p className="text-red-500 text-xs text-center mt-2 font-bold">{dateTimeError}</p>}
                </div>
              )}

              <hr className="border-gray-100" />

              {/* ROW 4: Recipients */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[#34C759] flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-base font-black text-[#3B5B96]">למי המתנה?</h3>
                </div>

                {mode === "business" && (
                  <div className="mb-3 bg-[#E8F4FF] text-[#4F86F9] p-3 rounded-xl text-xs flex items-center gap-2 font-medium">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>סל המניות יישלח לכל הנמענים ברשימה 🎁</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
                  <div>
                    <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5">שם</label>
                    <input
                      type="text"
                      value={mode === "business" ? currentRecipient.name : recipients[0]?.name || ""}
                      onChange={(e) => mode === "business" ? setCurrentRecipient({ ...currentRecipient, name: e.target.value }) : updateRecipient("1", "name", e.target.value)}
                      placeholder="שם המקבל"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5 flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      נייד (לווצאפ)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={mode === "business" ? currentRecipient.phone : recipients[0]?.phone || ""}
                        onChange={(e) => mode === "business" ? setCurrentRecipient({ ...currentRecipient, phone: e.target.value }) : updateRecipient("1", "phone", e.target.value)}
                        placeholder="052-1234567"
                        className={`${inputClass} pl-10 focus:border-[#25D366]`}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5">מייל</label>
                    <input
                      type="email"
                      value={mode === "business" ? currentRecipient.email : recipients[0]?.email || ""}
                      onChange={(e) => mode === "business" ? setCurrentRecipient({ ...currentRecipient, email: e.target.value }) : updateRecipient("1", "email", e.target.value)}
                      placeholder="email@example.com"
                      className={inputClass}
                    />
                  </div>
                  {mode === "business" && (
                    <button
                      onClick={addRecipientToList}
                      disabled={!currentRecipient.name.trim()}
                      className="h-12 rounded-xl bg-[#34C759] hover:bg-[#2DB84E] disabled:bg-[#C8E6CF] text-white flex items-center justify-center shadow-md transition-all disabled:shadow-none"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Recipients Chips */}
                {mode === "business" && recipients.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#6B8ABF]">נמענים ({recipients.length})</span>
                      <span className="text-xs font-black text-[#34C759] bg-green-50 px-3 py-1 rounded-full">
                        סה״כ: ₪{grandTotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipients.map((r) => (
                        <div key={r.id} className="inline-flex items-center gap-1.5 bg-[#F0F5FF] rounded-full pl-1.5 pr-3 py-1.5 text-sm">
                          <button onClick={() => removeRecipient(r.id)} className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[#3B5B96] text-xs">{r.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar with Avatar Stack */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-blue-100 shadow-[0_-8px_30px_rgba(79,134,249,0.1)] z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Action Buttons */}
          <div className="flex gap-2">
            <Link to="/stock-selection" className="px-4 py-3 rounded-xl border-2 border-[#E0E8F5] bg-white text-[#6B8ABF] font-bold text-sm hover:bg-[#F8FAFF] transition-colors hidden sm:flex items-center">
              חזרה
            </Link>
            <button onClick={handleSubmit} className="px-6 md:px-8 py-3 rounded-xl bg-[#4F86F9] hover:bg-[#3D74E8] text-white font-black text-sm md:text-base shadow-lg shadow-blue-200/40 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              המשך לתשלום
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Info & Editable Avatar Stack */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Clickable Logo Stack */}
            {selectedStocks.length > 0 && (
              <div 
                className="hidden sm:flex flex-row-reverse items-center cursor-pointer group"
                onClick={() => setIsCartModalOpen(true)}
                title="לחץ לעריכת המניות"
              >
                {/* Overflow Badge */}
                {selectedStocks.length > 5 && (
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 border-[3px] border-white flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm z-0 -mr-3 group-hover:ring-2 group-hover:ring-blue-300 transition-all">
                    +{selectedStocks.length - 5}
                  </div>
                )}
                
                {/* The Logos - Max 5 */}
                {selectedStocks.slice(0, 5).map((item, index) => (
                  <div 
                    key={item.id} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-[3px] border-white shadow-md flex items-center justify-center overflow-hidden -mr-3 first:mr-0 hover:z-20 hover:scale-110 transition-transform group-hover:ring-2 group-hover:ring-blue-300"
                    style={{ zIndex: 10 - index }}
                  >
                    <img 
                      src={getStockLogo(item.symbol)} 
                      alt={item.symbol} 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>
                ))}
                
                {/* Edit Badge */}
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#4F86F9] flex items-center justify-center border-2 border-white shadow-md -mr-2 z-20 group-hover:bg-[#3D74E8] transition-colors">
                  <Pencil className="w-3 h-3 text-white" />
                </div>
              </div>
            )}

            {/* Price Calculation */}
            <div className="text-right border-r-0 sm:border-r-2 border-gray-100 pr-0 sm:pr-6">
              <div className="text-[10px] md:text-xs text-[#6B8ABF]">
                {recipientCount > 1 ? `₪${cartTotal.toLocaleString()} × ${recipientCount} נמענים` : 'סה״כ לתשלום'}
              </div>
              <div className="text-xl md:text-2xl font-black text-[#3B5B96]">
                ₪{grandTotal.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Edit Modal */}
      <Dialog open={isCartModalOpen} onOpenChange={setIsCartModalOpen}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-muted/50">
            <DialogTitle className="text-right">עריכת סל המניות ({selectedStocks.length})</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="p-4 flex flex-col gap-3">
              {selectedStocks.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between bg-background border rounded-xl p-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center overflow-hidden">
                      <img 
                        src={getStockLogo(item.symbol)} 
                        alt={item.symbol} 
                        className="w-full h-full object-contain p-1" 
                      />
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{item.symbol}</div>
                      <div className="text-xs text-muted-foreground">{item.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">₪{item.amount.toLocaleString()}</span>
                    <button 
                      onClick={() => {
                        removeStock(item.id);
                        // Close modal if cart becomes empty
                        if (selectedStocks.length <= 1) {
                          setIsCartModalOpen(false);
                        }
                      }}
                      className="text-destructive/60 hover:text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/50 flex justify-between items-center">
            <button 
              onClick={() => setIsCartModalOpen(false)}
              className="text-primary font-bold text-sm"
            >
              סגור חלון
            </button>
            <div className="text-right">
              <span className="text-sm text-muted-foreground">סה״כ סל: </span>
              <span className="font-bold text-foreground">₪{cartTotal.toLocaleString()}</span>
              {recipientCount > 1 && (
                <span className="text-xs text-muted-foreground block">
                  × {recipientCount} = ₪{grandTotal.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
