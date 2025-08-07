import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { StepHero } from "@/components/StepHero";
import { useGift } from "../contexts/GiftContext";

interface Recipient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export default function OrderDetails() {
  const { giftData, updateGiftData } = useGift();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<
    string[]
  >(["mobile"]);
  const [senderName, setSenderName] = useState(giftData?.senderName || "");
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: "1",
      name: giftData?.recipientDetails?.name || "",
      phone: "",
      email: giftData?.recipientDetails?.email || "",
    },
  ]);
  const [sendingMethod, setSendingMethod] = useState(
    giftData?.sendingMethod || "immediately",
  );
  const [selectedDate, setSelectedDate] = useState({
    day: giftData?.selectedDate?.day || "",
    month: giftData?.selectedDate?.month || "",
    year: giftData?.selectedDate?.year || "",
  });
  const [selectedTime, setSelectedTime] = useState({
    hour: giftData?.selectedTime?.hour || "",
    minute: giftData?.selectedTime?.minute || "",
  });
  const [greetingText, setGreetingText] = useState(
    giftData?.greetingMessage || "",
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Phone validation
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^0\d{2}-\d{7}$|^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Recipient management
  const updateRecipient = (
    id: string,
    field: keyof Omit<Recipient, "id">,
    value: string,
  ) => {
    const updatedRecipients = recipients.map((recipient) =>
      recipient.id === id ? { ...recipient, [field]: value } : recipient,
    );
    setRecipients(updatedRecipients);

    // Auto-save first recipient to context
    if (updatedRecipients[0]) {
      updateGiftData({
        recipientDetails: {
          name: updatedRecipients[0].name,
          email: updatedRecipients[0].email,
          deliveryDate: `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`,
        },
      });
    }
  };

  const addRecipient = () => {
    const newId = Date.now().toString();
    setRecipients((prev) => [
      ...prev,
      { id: newId, name: "", phone: "", email: "" },
    ]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients((prev) => prev.filter((recipient) => recipient.id !== id));
    }
  };

  const toggleDeliveryMethod = (method: string) => {
    setSelectedDeliveryMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method],
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() + i).toString(),
  );

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#FFF",
        direction: "rtl",
      }}
    >
      <Header />

      <StepHero currentStep={1} />

      {/* Main Form Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 40px",
          background: "#fff",
        }}
      >
        {/* Top Row: Upload | Transfer Methods | Gift From */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "60px",
            width: "100%",
          }}
        >
          {/* Upload Image - Left */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              flex: "1",
              maxWidth: "320px",
            }}
          >
            <h3
              style={{
                color: "#1B1919",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "400",
                margin: "0",
              }}
            >
              העלאת תמונה/לוגו
            </h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: "flex",
                width: "100%",
                height: "120px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "10px",
                border: "2px dashed #4C7EFB",
                background: "rgba(245, 247, 252, 1)",
                cursor: "pointer",
              }}
            >
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  style={{ 
                    width: "80px", 
                    height: "80px", 
                    objectFit: "cover", 
                    borderRadius: "8px" 
                  }} 
                />
              ) : (
                <>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4C7EFB" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,5 17,10" />
                    <line x1="12" y1="5" x2="12" y2="15" />
                  </svg>
                  <div style={{ color: "#4C7EFB", fontSize: "16px" }}>העלאה</div>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Transfer Methods - Center */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              flex: "1",
              maxWidth: "320px",
            }}
          >
            <h3
              style={{
                color: "#1B1919",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "400",
                margin: "0",
              }}
            >
              אמצעי העברה{" "}
              <span style={{ color: "#486284", fontSize: "16px" }}>
                (אפשר לבחור יותר מאחד)
              </span>
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
              }}
            >
              <div
                onClick={() => toggleDeliveryMethod("email")}
                style={{
                  display: "flex",
                  width: "140px",
                  height: "50px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  borderRadius: "10px",
                  border: selectedDeliveryMethods.includes("email") ? "2px solid #4C7EFB" : "1px solid #e0e7ff",
                  background: selectedDeliveryMethods.includes("email") ? "#4C7EFB" : "rgba(245, 247, 252, 1)",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedDeliveryMethods.includes("email") ? "#FFF" : "#4C7EFB"} strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div style={{ color: selectedDeliveryMethods.includes("email") ? "#FFF" : "#4C7EFB", fontSize: "12px" }}>
                  דואר אלקטרוני
                </div>
              </div>
              
              <div
                onClick={() => toggleDeliveryMethod("mobile")}
                style={{
                  display: "flex",
                  width: "140px",
                  height: "50px",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  borderRadius: "10px",
                  border: selectedDeliveryMethods.includes("mobile") ? "2px solid #4C7EFB" : "1px solid #e0e7ff",
                  background: selectedDeliveryMethods.includes("mobile") ? "#4C7EFB" : "rgba(245, 247, 252, 1)",
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={selectedDeliveryMethods.includes("mobile") ? "#FFF" : "#4C7EFB"} strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <div style={{ color: selectedDeliveryMethods.includes("mobile") ? "#FFF" : "#4C7EFB", fontSize: "12px" }}>
                  הודעה לנייד
                </div>
              </div>
            </div>
          </div>

          {/* Gift From - Right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              flex: "1",
              maxWidth: "320px",
            }}
          >
            <h3
              style={{
                color: "#1B1919",
                textAlign: "center",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "400",
                margin: "0",
              }}
            >
              ממי המתנה?{" "}
              <span style={{ color: "#486284", fontSize: "16px" }}>
                (רשמו את השם שלכם)
              </span>
            </h3>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="שדה נבחר עם טקסט"
              style={{
                width: "100%",
                height: "50px",
                padding: "15px 20px",
                color: "#1B1919",
                textAlign: "center",
                fontSize: "16px",
                fontFamily: "Poppins",
                background: "rgba(245, 247, 252, 1)",
                border: "1px solid #4C7EFB",
                borderRadius: "10px",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* When to Send Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            width: "100%",
          }}
        >
          <h3
            style={{
              color: "#1B1919",
              fontSize: "20px",
              textAlign: "center",
              fontFamily: "Poppins",
              margin: "0",
            }}
          >
            מתי לשלוח את המתנה?
          </h3>
          <div
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              onClick={() => setSendingMethod("later")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "2px solid #4C7EFB",
                  background: sendingMethod === "later" ? "#4C7EFB" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sendingMethod === "later" && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#FFF",
                    }}
                  />
                )}
              </div>
              <span style={{ color: "#1B1919", fontSize: "16px" }}>
                שליחה במועד אחר
              </span>
            </div>
            
            <div
              onClick={() => setSendingMethod("immediately")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "2px solid #4C7EFB",
                  background: sendingMethod === "immediately" ? "#4C7EFB" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sendingMethod === "immediately" && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#FFF",
                    }}
                  />
                )}
              </div>
              <span style={{ color: "#1B1919", fontSize: "16px" }}>
                בדיוק שיימקום כאן
              </span>
            </div>
          </div>
        </div>

        {/* Recipient Details Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            width: "100%",
          }}
        >
          {recipients.map((recipient, index) => (
            <div
              key={recipient.id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "30px",
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              {/* Phone Number */}
              <div style={{ flex: "1", maxWidth: "300px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  מספר נייד של מקבל המתנה
                </label>
                <input
                  type="text"
                  value={recipient.phone}
                  onChange={(e) => updateRecipient(recipient.id, "phone", e.target.value)}
                  placeholder="052-1234567"
                  style={{
                    width: "100%",
                    height: "50px",
                    padding: "15px 20px",
                    color: "#1B1919",
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ flex: "1", maxWidth: "300px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  דואר אלקטרוני של מקבל המתנה
                </label>
                <input
                  type="email"
                  value={recipient.email}
                  onChange={(e) => updateRecipient(recipient.id, "email", e.target.value)}
                  placeholder="example@mail.com"
                  style={{
                    width: "100%",
                    height: "50px",
                    padding: "15px 20px",
                    color: "#1B1919",
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
              </div>

              {/* Name */}
              <div style={{ flex: "1", maxWidth: "300px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  שם המקבל
                </label>
                <input
                  type="text"
                  value={recipient.name}
                  onChange={(e) => updateRecipient(recipient.id, "name", e.target.value)}
                  placeholder="שם המקבל"
                  style={{
                    width: "100%",
                    height: "50px",
                    padding: "15px 20px",
                    color: "#1B1919",
                    textAlign: "center",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Add Recipient Button */}
          <button
            onClick={addRecipient}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "300px",
              height: "50px",
              background: "#4C7EFB",
              color: "#FFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontFamily: "Poppins",
              cursor: "pointer",
            }}
          >
            + הוסף עוד נמען (שמקבל המתנה)
          </button>
        </div>

        {/* Date and Time Selection */}
        {sendingMethod === "later" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
              width: "100%",
            }}
          >
            <h3
              style={{
                color: "#1B1919",
                fontSize: "20px",
                textAlign: "center",
                fontFamily: "Poppins",
                margin: "0",
              }}
            >
              בחירת תאריך ושעה
            </h3>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Day */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  יום
                </label>
                <select
                  value={selectedDate.day}
                  onChange={(e) =>
                    setSelectedDate({ ...selectedDate, day: e.target.value })
                  }
                  style={{
                    width: "80px",
                    height: "40px",
                    padding: "5px",
                    color: "#1B1919",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                >
                  <option value="">יום</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  חודש
                </label>
                <select
                  value={selectedDate.month}
                  onChange={(e) =>
                    setSelectedDate({ ...selectedDate, month: e.target.value })
                  }
                  style={{
                    width: "100px",
                    height: "40px",
                    padding: "5px",
                    color: "#1B1919",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                >
                  <option value="">חודש</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  שנה
                </label>
                <select
                  value={selectedDate.year}
                  onChange={(e) =>
                    setSelectedDate({ ...selectedDate, year: e.target.value })
                  }
                  style={{
                    width: "80px",
                    height: "40px",
                    padding: "5px",
                    color: "#1B1919",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                >
                  <option value="">שנה</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hour */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  שעה
                </label>
                <select
                  value={selectedTime.hour}
                  onChange={(e) =>
                    setSelectedTime({ ...selectedTime, hour: e.target.value })
                  }
                  style={{
                    width: "80px",
                    height: "40px",
                    padding: "5px",
                    color: "#1B1919",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                >
                  <option value="">שעה</option>
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minute */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#1B1919",
                    fontSize: "16px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  דקה
                </label>
                <select
                  value={selectedTime.minute}
                  onChange={(e) =>
                    setSelectedTime({ ...selectedTime, minute: e.target.value })
                  }
                  style={{
                    width: "80px",
                    height: "40px",
                    padding: "5px",
                    color: "#1B1919",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    background: "rgba(245, 247, 252, 1)",
                    border: "1px solid #E0E7FF",
                    borderRadius: "10px",
                    outline: "none",
                  }}
                >
                  <option value="">דקה</option>
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Greeting Text Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            width: "100%",
          }}
        >
          <h3
            style={{
              color: "#1B1919",
              fontSize: "20px",
              textAlign: "center",
              fontFamily: "Poppins",
              margin: "0",
            }}
          >
            הוספת ברכה אישית
          </h3>
          <textarea
            value={greetingText}
            onChange={(e) => setGreetingText(e.target.value)}
            placeholder="הודעה אישית (עד 200 תווים)"
            maxLength={200}
            style={{
              width: "100%",
              height: "120px",
              padding: "15px 20px",
              color: "#1B1919",
              fontSize: "16px",
              fontFamily: "Poppins",
              background: "rgba(245, 247, 252, 1)",
              border: "1px solid #E0E7FF",
              borderRadius: "10px",
              outline: "none",
              textAlign: "right",
              resize: "none",
            }}
          />
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "200px",
              height: "50px",
              background: "#E0E7FF",
              color: "#4C7EFB",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontFamily: "Poppins",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            חזרה לעמוד הראשי
          </Link>

          <button
            onClick={() => {
              updateGiftData({
                senderName,
                recipientDetails: {
                  name: recipients[0].name,
                  email: recipients[0].email,
                  deliveryDate: `${selectedDate.day}/${selectedDate.month}/${selectedDate.year}`,
                },
                deliveryMethods: selectedDeliveryMethods,
                sendingMethod,
                selectedDate,
                selectedTime,
                greetingMessage: greetingText,
                uploadedImage,
              });
              navigate("/payment");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "200px",
              height: "50px",
              background: "#4C7EFB",
              color: "#FFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontFamily: "Poppins",
              cursor: "pointer",
            }}
          >
            לתשלום
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
