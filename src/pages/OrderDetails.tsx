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
  Smartphone, 
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
  Image
} from "lucide-react";

type GiftMode = "personal" | "business";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export default function OrderDetails() {
  const { giftData, updateGiftData } = useGift();
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

  // Calculations
  const cartTotal = giftData.selectedStocks.reduce((sum, stock) => sum + (stock.amount || 0), 0);
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
    <div className="min-h-screen bg-[#E0E7F5] relative overflow-hidden" dir="rtl">
      <Header />
      <StepHero currentStep={1} />

      {/* ===== DECORATIVE BACKGROUND VECTORS ===== */}
      
      {/* Top Left: Sparkle Vector */}
      <img 
        src={sparkleVector} 
        alt="" 
        className="absolute top-32 -left-6 md:left-12 w-24 md:w-36 opacity-20 pointer-events-none select-none rotate-12 z-0"
        aria-hidden="true"
      />
      
      {/* Bottom Right: Gift Mascot */}
      <img 
        src={giftMascot} 
        alt="" 
        className="absolute bottom-48 -right-8 md:right-8 w-32 md:w-48 opacity-[0.12] pointer-events-none select-none -rotate-6 z-0"
        aria-hidden="true"
      />
      
      {/* Additional Sparkles for balance */}
      <img 
        src={sparkleVector} 
        alt="" 
        className="absolute bottom-80 left-4 md:left-24 w-16 md:w-24 opacity-15 pointer-events-none select-none -rotate-45 z-0"
        aria-hidden="true"
      />
      <img 
        src={sparkleVector} 
        alt="" 
        className="absolute top-[60%] right-2 md:right-16 w-12 md:w-20 opacity-10 pointer-events-none select-none rotate-[30deg] z-0 hidden md:block"
        aria-hidden="true"
      />

      {/* Main Container - Continuous Background */}
      <div className="px-4 md:px-6 pb-36 -mt-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          
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
                      onClick={() => toggleDeliveryMethod("mobile")}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl border-2 transition-all text-sm font-bold ${
                        selectedDeliveryMethods.includes("mobile")
                          ? "bg-[#4F86F9] text-white border-[#4F86F9]"
                          : "bg-white text-[#6B8ABF] border-[#E0E8F5] hover:border-[#4F86F9]"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      SMS
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
                    <label className="block text-xs font-bold text-[#6B8ABF] mb-1.5">טלפון</label>
                    <input
                      type="text"
                      value={mode === "business" ? currentRecipient.phone : recipients[0]?.phone || ""}
                      onChange={(e) => mode === "business" ? setCurrentRecipient({ ...currentRecipient, phone: e.target.value }) : updateRecipient("1", "phone", e.target.value)}
                      placeholder="052-1234567"
                      className={inputClass}
                    />
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

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-blue-100 shadow-[0_-8px_30px_rgba(79,134,249,0.1)] z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="text-right">
            <p className="text-xs text-[#6B8ABF]">סה״כ</p>
            <p className="text-2xl font-black text-[#3B5B96]">₪{grandTotal.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/stock-selection" className="px-5 py-3 rounded-xl border-2 border-[#E0E8F5] bg-white text-[#6B8ABF] font-bold text-sm hover:bg-[#F8FAFF] transition-colors">
              חזרה
            </Link>
            <button onClick={handleSubmit} className="px-8 py-3 rounded-xl bg-[#4F86F9] hover:bg-[#3D74E8] text-white font-black text-base shadow-lg shadow-blue-200/40 transition-all flex items-center gap-2">
              המשך לתשלום
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
