import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { StepHero } from "@/components/StepHero";
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
  Sparkles,
  Gift,
  Heart
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
    {
      id: "1",
      name: giftData?.recipientDetails?.name || "",
      phone: "",
      email: giftData?.recipientDetails?.email || "",
    },
  ]);
  const [currentRecipient, setCurrentRecipient] = useState<Omit<Recipient, "id">>({
    name: "",
    phone: "",
    email: "",
  });
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

  // Handlers
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
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      ...currentRecipient,
    };
    setRecipients((prev) => [...prev, newRecipient]);
    setCurrentRecipient({ name: "", phone: "", email: "" });
  };

  const removeRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRecipient = (id: string, field: keyof Omit<Recipient, "id">, value: string) => {
    setRecipients((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const handleSubmit = () => {
    if (sendingMethod === "later") {
      if (!selectedDate.day || !selectedDate.month || !selectedDate.year || !selectedTime.hour || !selectedTime.minute) {
        setDateTimeError("יש לבחור תאריך ושעה");
        return;
      }
      const scheduledDate = new Date(
        parseInt(selectedDate.year),
        parseInt(selectedDate.month) - 1,
        parseInt(selectedDate.day),
        parseInt(selectedTime.hour),
        parseInt(selectedTime.minute)
      );
      if (scheduledDate <= new Date()) {
        setDateTimeError("יש לבחור תאריך ושעה עתידיים");
        return;
      }
    }

    updateGiftData({
      senderName,
      senderEmail,
      recipientDetails: {
        name: recipients[0]?.name || "",
        email: recipients[0]?.email || "",
        deliveryDate: selectedDate.day && selectedDate.month && selectedDate.year
          ? `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`
          : "",
      },
      deliveryMethods: selectedDeliveryMethods,
      sendingMethod,
      selectedDate,
      selectedTime,
      greetingMessage: greetingText,
      uploadedImage,
      selectedCard: "lightblue",
      recipients: mode === "business" ? recipients : [recipients[0]],
    });
    navigate("/checkout");
  };

  // Styled input classes
  const inputClasses = "w-full h-14 px-5 rounded-2xl bg-[#F0F4FC] border-2 border-transparent focus:border-[#4F86F9] focus:bg-white focus:outline-none transition-all text-[#3B5B96] placeholder:text-[#9CB0D4] font-medium text-base";
  const selectClasses = "h-12 px-3 rounded-xl bg-[#F0F4FC] border-2 border-transparent focus:border-[#4F86F9] focus:bg-white focus:outline-none transition-all text-[#3B5B96] text-sm font-medium cursor-pointer";

  return (
    <div className="min-h-screen bg-[#E8EEF8]" dir="rtl">
      <Header />
      <StepHero currentStep={1} />

      {/* Page Title - Titan One Style */}
      <div className="flex flex-col items-center justify-center py-8 md:py-10">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-[#FFC845]" />
          <h1 
            className="text-3xl md:text-4xl font-black text-[#3B5B96] tracking-tight"
            style={{ fontFamily: "'Titan One', cursive, sans-serif" }}
          >
            פרטי ההזמנה
          </h1>
          <Sparkles className="w-6 h-6 text-[#FFC845]" />
        </div>
        <p className="text-[#6B8ABF] text-sm">מלאו את הפרטים ונשלח את המתנה המושלמת!</p>
      </div>

      {/* Main Container - Floating White Card */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-32">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(79,134,249,0.15)] p-6 md:p-10 space-y-8">

          {/* Mode Toggle - Hero Pill */}
          <div className="flex justify-center">
            <div className="inline-flex bg-[#E8EEF8] p-2 rounded-full shadow-inner">
              <button
                onClick={() => setMode("personal")}
                className={`flex items-center gap-2 px-6 md:px-8 py-3.5 rounded-full text-base font-bold transition-all duration-300 ${
                  mode === "personal"
                    ? "bg-[#4F86F9] text-white shadow-lg shadow-blue-300/50 scale-105"
                    : "bg-transparent text-[#4F86F9] hover:bg-blue-50"
                }`}
              >
                <Gift className="w-5 h-5" />
                מתנה אישית
              </button>
              <button
                onClick={() => setMode("business")}
                className={`flex items-center gap-2 px-6 md:px-8 py-3.5 rounded-full text-base font-bold transition-all duration-300 ${
                  mode === "business"
                    ? "bg-[#4F86F9] text-white shadow-lg shadow-blue-300/50 scale-105"
                    : "bg-transparent text-[#4F86F9] hover:bg-blue-50"
                }`}
              >
                <Users className="w-5 h-5" />
                לקבוצה / חברה
              </button>
            </div>
          </div>

          {/* Section: Sender Details */}
          <div className="bg-gradient-to-br from-[#F8FAFF] to-[#EEF3FC] rounded-3xl p-6 md:p-8 border border-blue-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#4F86F9] flex items-center justify-center shadow-lg shadow-blue-300/30">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#3B5B96]">ממי המתנה?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">השם שלכם</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="הזינו את שמכם ✨"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">כתובת מייל</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={inputClasses}
                />
              </div>
              {mode === "business" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#6B8ABF] mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    שם החברה
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="שם החברה או הארגון 🏢"
                    className={inputClasses}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section: Branding & Greeting */}
          <div className="bg-gradient-to-br from-[#FFFBF0] to-[#FFF8E8] rounded-3xl p-6 md:p-8 border border-yellow-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#FFC845] flex items-center justify-center shadow-lg shadow-yellow-300/30">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#3B5B96]">מיתוג והודעה אישית</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Greeting */}
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">ברכה אישית 💌</label>
                <textarea
                  value={greetingText}
                  onChange={(e) => setGreetingText(e.target.value)}
                  placeholder="כתבו הודעה חמה ואישית למקבל המתנה..."
                  maxLength={200}
                  className="w-full h-36 p-5 rounded-2xl bg-[#FFFDF5] border-2 border-transparent focus:border-[#FFC845] focus:bg-white focus:outline-none transition-all text-[#3B5B96] placeholder:text-[#C4B896] font-medium text-base resize-none"
                />
                <p className="text-xs text-[#9CB0D4] mt-2 text-left font-medium">{greetingText.length}/200</p>
              </div>
              {/* Logo Upload - Premium Badge */}
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">העלאת לוגו / תמונה</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`h-36 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center gap-3 border-3 ${
                    uploadedImage
                      ? "bg-gradient-to-br from-[#E8F4FF] to-[#D8ECFF] border-[#4F86F9] border-solid"
                      : "bg-[#FFFDF5] border-dashed border-[#E8D9A8] hover:border-[#FFC845] hover:bg-[#FFFEF8]"
                  }`}
                  style={{ borderWidth: '3px' }}
                >
                  {uploadedImage ? (
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-lg p-2 flex items-center justify-center">
                        <img
                          src={uploadedImage}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#4F86F9] rounded-full flex items-center justify-center shadow-md">
                        <Upload className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-[#FFF8E8] flex items-center justify-center">
                        <Upload className="w-7 h-7 text-[#FFC845]" />
                      </div>
                      <span className="text-sm font-bold text-[#C4B896]">לחצו להעלאת לוגו</span>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Section: Delivery Method */}
          <div className="bg-gradient-to-br from-[#F8FAFF] to-[#EEF3FC] rounded-3xl p-6 md:p-8 border border-blue-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#4F86F9] flex items-center justify-center shadow-lg shadow-blue-300/30">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#3B5B96]">איך לשלוח?</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => toggleDeliveryMethod("email")}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-3 transition-all font-bold ${
                  selectedDeliveryMethods.includes("email")
                    ? "bg-[#4F86F9] text-white border-[#4F86F9] shadow-lg shadow-blue-300/40"
                    : "bg-white text-[#6B8ABF] border-[#E0E8F5] hover:border-[#4F86F9]"
                }`}
                style={{ borderWidth: '3px' }}
              >
                <Mail className="w-5 h-5" />
                דואר אלקטרוני
              </button>
              <button
                onClick={() => toggleDeliveryMethod("mobile")}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-3 transition-all font-bold ${
                  selectedDeliveryMethods.includes("mobile")
                    ? "bg-[#4F86F9] text-white border-[#4F86F9] shadow-lg shadow-blue-300/40"
                    : "bg-white text-[#6B8ABF] border-[#E0E8F5] hover:border-[#4F86F9]"
                }`}
                style={{ borderWidth: '3px' }}
              >
                <Smartphone className="w-5 h-5" />
                הודעה לנייד
              </button>
            </div>
          </div>

          {/* Section: Recipients */}
          <div className="bg-gradient-to-br from-[#F0FFF4] to-[#E8FCF0] rounded-3xl p-6 md:p-8 border border-green-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#34C759] flex items-center justify-center shadow-lg shadow-green-300/30">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#3B5B96]">למי המתנה?</h3>
            </div>

            {mode === "business" && (
              <div className="mb-5 bg-[#E8F4FF] text-[#4F86F9] p-4 rounded-2xl text-sm flex items-center gap-3 font-medium">
                <Info className="w-5 h-5 shrink-0" />
                <span>סל המניות שבחרת יישלח לכל אחד מהנמענים ברשימה 🎁</span>
              </div>
            )}

            {/* Input Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">שם מלא</label>
                <input
                  type="text"
                  value={mode === "business" ? currentRecipient.name : recipients[0]?.name || ""}
                  onChange={(e) =>
                    mode === "business"
                      ? setCurrentRecipient({ ...currentRecipient, name: e.target.value })
                      : updateRecipient("1", "name", e.target.value)
                  }
                  placeholder="שם המקבל"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">נייד</label>
                <input
                  type="text"
                  value={mode === "business" ? currentRecipient.phone : recipients[0]?.phone || ""}
                  onChange={(e) =>
                    mode === "business"
                      ? setCurrentRecipient({ ...currentRecipient, phone: e.target.value })
                      : updateRecipient("1", "phone", e.target.value)
                  }
                  placeholder="052-1234567"
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#6B8ABF] mb-2">מייל</label>
                <input
                  type="email"
                  value={mode === "business" ? currentRecipient.email : recipients[0]?.email || ""}
                  onChange={(e) =>
                    mode === "business"
                      ? setCurrentRecipient({ ...currentRecipient, email: e.target.value })
                      : updateRecipient("1", "email", e.target.value)
                  }
                  placeholder="email@example.com"
                  className={inputClasses}
                />
              </div>
              {mode === "business" && (
                <button
                  onClick={addRecipientToList}
                  disabled={!currentRecipient.name.trim()}
                  className="h-14 w-14 md:w-full rounded-2xl bg-[#34C759] hover:bg-[#2DB84E] disabled:bg-[#C8E6CF] text-white flex items-center justify-center shadow-lg shadow-green-300/40 transition-all disabled:shadow-none"
                >
                  <Plus className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Recipients Chips (Business Mode) */}
            {mode === "business" && recipients.length > 0 && (
              <div className="mt-6 pt-5 border-t-2 border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black text-[#6B8ABF]">רשימת נמענים ({recipients.length})</h4>
                  <span className="text-sm font-black text-[#34C759] bg-green-50 px-4 py-1.5 rounded-full">
                    סה״כ: ₪{grandTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipients.map((r) => (
                    <div
                      key={r.id}
                      className="inline-flex items-center gap-2 bg-white rounded-full pl-2 pr-4 py-2 border-2 border-[#E0E8F5] shadow-sm hover:shadow-md transition-all"
                    >
                      <button
                        onClick={() => removeRecipient(r.id)}
                        className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-[#3B5B96] text-sm">{r.name || "ללא שם"}</span>
                      {r.email && (
                        <span className="text-xs text-[#9CB0D4]">({r.email})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Scheduling */}
          <div className="bg-gradient-to-br from-[#FFF5F8] to-[#FFEFF3] rounded-3xl p-6 md:p-8 border border-pink-100/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B9D] flex items-center justify-center shadow-lg shadow-pink-300/30">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#3B5B96]">מתי לשלוח?</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setSendingMethod("immediately");
                  setDateTimeError("");
                }}
                className={`flex-1 min-w-[160px] flex flex-col items-center gap-3 p-5 rounded-2xl border-3 transition-all ${
                  sendingMethod === "immediately"
                    ? "bg-[#FF6B9D] text-white border-[#FF6B9D] shadow-lg shadow-pink-300/40"
                    : "bg-white text-[#6B8ABF] border-[#F5E0E8] hover:border-[#FF6B9D]"
                }`}
                style={{ borderWidth: '3px' }}
              >
                <Send className={`w-8 h-8 ${sendingMethod === "immediately" ? "text-white" : "text-[#FF6B9D]"}`} />
                <span className="font-black text-lg">עכשיו! 🚀</span>
              </button>
              <button
                onClick={() => {
                  setSendingMethod("later");
                  setDateTimeError("");
                }}
                className={`flex-1 min-w-[160px] flex flex-col items-center gap-3 p-5 rounded-2xl border-3 transition-all ${
                  sendingMethod === "later"
                    ? "bg-[#FF6B9D] text-white border-[#FF6B9D] shadow-lg shadow-pink-300/40"
                    : "bg-white text-[#6B8ABF] border-[#F5E0E8] hover:border-[#FF6B9D]"
                }`}
                style={{ borderWidth: '3px' }}
              >
                <Clock className={`w-8 h-8 ${sendingMethod === "later" ? "text-white" : "text-[#FF6B9D]"}`} />
                <span className="font-black text-lg">במועד אחר 📅</span>
              </button>
            </div>

            {/* Date/Time Picker */}
            {sendingMethod === "later" && (
              <div className="mt-5 p-5 bg-white rounded-2xl border-2 border-pink-100">
                <div className="flex flex-wrap gap-3 justify-center items-end">
                  <div>
                    <label className="block text-xs font-bold text-[#9CB0D4] mb-1 text-center">יום</label>
                    <select
                      value={selectedDate.day}
                      onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })}
                      className={selectClasses}
                      style={{ width: '70px' }}
                    >
                      <option value="">--</option>
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9CB0D4] mb-1 text-center">חודש</label>
                    <select
                      value={selectedDate.month}
                      onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })}
                      className={selectClasses}
                      style={{ width: '100px' }}
                    >
                      <option value="">--</option>
                      {months.map((month, index) => (
                        <option key={month} value={index + 1}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9CB0D4] mb-1 text-center">שנה</label>
                    <select
                      value={selectedDate.year}
                      onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })}
                      className={selectClasses}
                      style={{ width: '85px' }}
                    >
                      <option value="">--</option>
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-px h-10 bg-pink-200 mx-2" />
                  <div>
                    <label className="block text-xs font-bold text-[#9CB0D4] mb-1 text-center">שעה</label>
                    <select
                      value={selectedTime.hour}
                      onChange={(e) => setSelectedTime({ ...selectedTime, hour: e.target.value })}
                      className={selectClasses}
                      style={{ width: '70px' }}
                    >
                      <option value="">--</option>
                      {hours.map((hour) => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9CB0D4] mb-1 text-center">דקה</label>
                    <select
                      value={selectedTime.minute}
                      onChange={(e) => setSelectedTime({ ...selectedTime, minute: e.target.value })}
                      className={selectClasses}
                      style={{ width: '70px' }}
                    >
                      <option value="">--</option>
                      {minutes.map((minute) => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {dateTimeError && (
                  <p className="text-red-500 text-sm text-center mt-4 font-bold">{dateTimeError}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary & CTA - Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-blue-100 shadow-[0_-10px_40px_rgba(79,134,249,0.15)] z-50">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <p className="text-sm text-[#6B8ABF] font-medium">סה״כ לתשלום</p>
              <p className="text-3xl font-black text-[#3B5B96]">₪{grandTotal.toLocaleString()}</p>
              {mode === "business" && recipients.length > 1 && (
                <p className="text-xs text-[#9CB0D4] font-medium">
                  ₪{cartTotal.toLocaleString()} × {recipients.length} נמענים
                </p>
              )}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Link
                to="/stock-selection"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-[#E0E8F5] bg-white text-[#6B8ABF] hover:bg-[#F8FAFF] font-bold transition-colors"
              >
                חזרה
              </Link>
              <button
                onClick={handleSubmit}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-[#4F86F9] hover:bg-[#3D74E8] text-white font-black text-lg shadow-lg shadow-blue-300/40 transition-all hover:scale-[1.02]"
              >
                המשך לתשלום
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
