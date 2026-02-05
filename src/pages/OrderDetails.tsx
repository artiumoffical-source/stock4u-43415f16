import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { StepHero } from "@/components/StepHero";
import { useGift } from "../contexts/GiftContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Users, 
  Mail, 
  Smartphone, 
  Clock, 
  Send, 
  Upload, 
  Plus, 
  Trash2, 
  Info,
  Building2,
  ChevronLeft
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mode toggle
  const [mode, setMode] = useState<GiftMode>("personal");

  // Sender details
  const [senderName, setSenderName] = useState(giftData?.senderName || "");
  const [senderEmail, setSenderEmail] = useState(giftData?.senderEmail || "");
  const [companyName, setCompanyName] = useState("");

  // Delivery methods
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<string[]>(["email"]);

  // Scheduling
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

  // Recipients
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

  // Greeting & branding
  const [greetingText, setGreetingText] = useState(giftData?.greetingMessage || "");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate totals
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
    // Validate scheduling
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

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <StepHero currentStep={1} />

      {/* Page Title */}
      <div className="flex justify-center items-center py-6 md:py-8">
        <h2 className="text-lg font-bold text-[#486284] tracking-wide">פרטי ההזמנה</h2>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-32 space-y-6">
        
        {/* Mode Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-muted p-1.5 rounded-xl">
            <button
              onClick={() => setMode("personal")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "personal"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              מתנה אישית
            </button>
            <button
              onClick={() => setMode("business")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "business"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              מתנה לקבוצה / חברה
            </button>
          </div>
        </div>

        {/* Section A: Sender Details */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            ממי המתנה?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">השם שלכם</label>
              <Input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="הזינו את שמכם"
                className="h-12 bg-muted/50 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">כתובת מייל</label>
              <Input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="example@mail.com"
                className="h-12 bg-muted/50 border-border"
              />
            </div>
            {mode === "business" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  שם החברה
                </label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="שם החברה או הארגון"
                  className="h-12 bg-muted/50 border-border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section B: Branding & Greeting */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">מיתוג והודעה</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Greeting Text */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">ברכה אישית</label>
              <Textarea
                value={greetingText}
                onChange={(e) => setGreetingText(e.target.value)}
                placeholder="כתבו הודעה אישית למקבל המתנה... (עד 200 תווים)"
                maxLength={200}
                className="h-32 bg-muted/50 border-border resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1 text-left">{greetingText.length}/200</p>
            </div>
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">העלאת לוגו / תמונה</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                  uploadedImage
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30 hover:border-primary hover:bg-primary/5"
                }`}
              >
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Logo"
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                      <Upload className="w-3 h-3" />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">לחצו להעלאה</span>
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

        {/* Section C: Delivery Method */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">אמצעי משלוח</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleDeliveryMethod("email")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                selectedDeliveryMethods.includes("email")
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">דואר אלקטרוני</span>
            </button>
            <button
              onClick={() => toggleDeliveryMethod("mobile")}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                selectedDeliveryMethods.includes("mobile")
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span className="font-medium">הודעה לנייד</span>
            </button>
          </div>
        </div>

        {/* Section D: Recipients */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            פרטי מקבלי המתנה
          </h3>

          {mode === "business" && (
            <div className="mb-4 bg-primary/10 text-primary p-3 rounded-xl text-sm flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>המתנה שבחרת (סל המניות) תישלח לכל אחד מהנמענים ברשימה.</span>
            </div>
          )}

          {/* Input Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">שם מלא</label>
              <Input
                value={mode === "business" ? currentRecipient.name : recipients[0]?.name || ""}
                onChange={(e) =>
                  mode === "business"
                    ? setCurrentRecipient({ ...currentRecipient, name: e.target.value })
                    : updateRecipient("1", "name", e.target.value)
                }
                placeholder="שם המקבל"
                className="h-11 bg-muted/50 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">נייד</label>
              <Input
                value={mode === "business" ? currentRecipient.phone : recipients[0]?.phone || ""}
                onChange={(e) =>
                  mode === "business"
                    ? setCurrentRecipient({ ...currentRecipient, phone: e.target.value })
                    : updateRecipient("1", "phone", e.target.value)
                }
                placeholder="052-1234567"
                className="h-11 bg-muted/50 border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">מייל</label>
              <Input
                type="email"
                value={mode === "business" ? currentRecipient.email : recipients[0]?.email || ""}
                onChange={(e) =>
                  mode === "business"
                    ? setCurrentRecipient({ ...currentRecipient, email: e.target.value })
                    : updateRecipient("1", "email", e.target.value)
                }
                placeholder="email@example.com"
                className="h-11 bg-muted/50 border-border"
              />
            </div>
            {mode === "business" && (
              <Button
                onClick={addRecipientToList}
                disabled={!currentRecipient.name.trim()}
                className="h-11 bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 ml-1" />
                הוסף
              </Button>
            )}
          </div>

          {/* Recipients List (Business Mode) */}
          {mode === "business" && recipients.length > 0 && (
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-muted-foreground">רשימת נמענים ({recipients.length})</h4>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  סה״כ: ₪{grandTotal.toLocaleString()}
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {recipients.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between bg-muted/30 rounded-xl p-3 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {r.name.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{r.name || "ללא שם"}</p>
                        <p className="text-xs text-muted-foreground">{r.email || r.phone || "אין פרטי קשר"}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeRecipient(r.id)}
                      className="text-destructive/60 hover:text-destructive hover:bg-destructive/10 p-2 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section E: Scheduling */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">מתי לשלוח?</h3>
          <div className="flex flex-wrap gap-3">
            {/* Send Now */}
            <button
              onClick={() => {
                setSendingMethod("immediately");
                setDateTimeError("");
              }}
              className={`flex-1 min-w-[140px] flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                sendingMethod === "immediately"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/30 hover:border-primary/50"
              }`}
            >
              <Send className={`w-6 h-6 ${sendingMethod === "immediately" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-medium ${sendingMethod === "immediately" ? "text-primary" : "text-muted-foreground"}`}>
                עכשיו
              </span>
            </button>
            {/* Send Later */}
            <button
              onClick={() => {
                setSendingMethod("later");
                setDateTimeError("");
              }}
              className={`flex-1 min-w-[140px] flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                sendingMethod === "later"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/30 hover:border-primary/50"
              }`}
            >
              <Clock className={`w-6 h-6 ${sendingMethod === "later" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-medium ${sendingMethod === "later" ? "text-primary" : "text-muted-foreground"}`}>
                שליחה במועד אחר
              </span>
            </button>
          </div>

          {/* Date/Time Picker */}
          {sendingMethod === "later" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-xl border border-border">
              <div className="flex flex-wrap gap-3 justify-center items-end">
                {/* Day */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 text-center">יום</label>
                  <select
                    value={selectedDate.day}
                    onChange={(e) => setSelectedDate({ ...selectedDate, day: e.target.value })}
                    className="w-16 h-10 px-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="">--</option>
                    {days.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                {/* Month */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 text-center">חודש</label>
                  <select
                    value={selectedDate.month}
                    onChange={(e) => setSelectedDate({ ...selectedDate, month: e.target.value })}
                    className="w-24 h-10 px-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="">--</option>
                    {months.map((month, index) => (
                      <option key={month} value={index + 1}>{month}</option>
                    ))}
                  </select>
                </div>
                {/* Year */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 text-center">שנה</label>
                  <select
                    value={selectedDate.year}
                    onChange={(e) => setSelectedDate({ ...selectedDate, year: e.target.value })}
                    className="w-20 h-10 px-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="">--</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="w-px h-8 bg-border mx-1" />
                {/* Hour */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 text-center">שעה</label>
                  <select
                    value={selectedTime.hour}
                    onChange={(e) => setSelectedTime({ ...selectedTime, hour: e.target.value })}
                    className="w-16 h-10 px-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="">--</option>
                    {hours.map((hour) => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
                {/* Minute */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1 text-center">דקה</label>
                  <select
                    value={selectedTime.minute}
                    onChange={(e) => setSelectedTime({ ...selectedTime, minute: e.target.value })}
                    className="w-16 h-10 px-2 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="">--</option>
                    {minutes.map((minute) => (
                      <option key={minute} value={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
              {dateTimeError && (
                <p className="text-destructive text-sm text-center mt-3">{dateTimeError}</p>
              )}
            </div>
          )}
        </div>

        {/* Summary Bar */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">סה״כ לתשלום</p>
              <p className="text-3xl font-black text-foreground">₪{grandTotal.toLocaleString()}</p>
              {mode === "business" && recipients.length > 1 && (
                <p className="text-xs text-muted-foreground mt-1">
                  ₪{cartTotal.toLocaleString()} × {recipients.length} נמענים
                </p>
              )}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Link
                to="/stock-selection"
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-muted-foreground hover:bg-muted transition-colors"
              >
                חזרה
              </Link>
              <Button
                onClick={handleSubmit}
                className="flex-1 md:flex-initial h-auto px-8 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg"
              >
                המשך לתשלום
                <ChevronLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
