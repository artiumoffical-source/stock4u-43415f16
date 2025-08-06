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

  const [selectedDeliveryMethods, setSelectedDeliveryMethods] = useState<string[]>(["mobile"]);
  const [senderName, setSenderName] = useState(giftData?.senderName || "");
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: "1",
      name: giftData?.recipientDetails?.name || "",
      phone: "",
      email: giftData?.recipientDetails?.email || "",
    },
  ]);
  const [sendingMethod, setSendingMethod] = useState(giftData?.sendingMethod || "immediately");
  const [selectedDate, setSelectedDate] = useState({
    day: giftData?.selectedDate?.day || "",
    month: giftData?.selectedDate?.month || "",
    year: giftData?.selectedDate?.year || "",
  });
  const [selectedTime, setSelectedTime] = useState({
    hour: giftData?.selectedTime?.hour || "",
    minute: giftData?.selectedTime?.minute || "",
  });
  const [greetingText, setGreetingText] = useState(giftData?.greetingMessage || "");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Phone validation
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^0\d{2}-\d{7}$|^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  // Recipient management
  const updateRecipient = (id: string, field: keyof Omit<Recipient, "id">, value: string) => {
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
    setRecipients((prev) => [...prev, { id: newId, name: "", phone: "", email: "" }]);
  };

  const removeRecipient = (id: string) => {
    if (recipients.length > 1) {
      setRecipients((prev) => prev.filter((recipient) => recipient.id !== id));
    }
  };

  const toggleDeliveryMethod = (method: string) => {
    setSelectedDeliveryMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method],
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

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#FFF", direction: "rtl" }}>
      <Header />

      {/* Hero Section */}
      <StepHero currentStep={1} />

      {/* Form Content */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "80px", maxWidth: "1400px", margin: "0 auto", padding: "80px 40px", background: "#fff" }}>
        {/* קטע 1: שם השולח, אמצעי העברה, העלאת תמונה */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", gap: "24px", alignSelf: "stretch", position: "relative" }}>
          {/* Image Upload - Rightmost */}
          <div style={{ display: "flex", width: "366px", flexDirection: "column", alignItems: "flex-end", gap: "23px", position: "relative" }}>
            <div style={{ alignSelf: "stretch", color: "#1B1919", textAlign: "right", fontFamily: "Poppins", fontSize: "20px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", position: "relative" }}>
              העלאת תמונה/לוגו
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "18px", position: "relative" }}>
              <div onClick={() => fileInputRef.current?.click()} style={{ display: "flex", width: "150px", height: "50px", padding: "10px 15px", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px", borderRadius: "10px", background: "rgba(245, 247, 252, 1)", position: "relative", cursor: "pointer" }}>
                <div style={{ display: "flex", width: "98px", justifyContent: "center", alignItems: "center", gap: "4px", position: "relative" }}>
                  <div style={{ width: "66.906px", flexShrink: 0, color: "#4C7EFB", textAlign: "center", fontFamily: "Poppins", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", position: "relative" }}>
                    העלאה
                  </div>
                  <svg style={{ width: "24px", height: "24px", flexShrink: 0, aspectRatio: "1/1", position: "relative" }} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.3203 9.07031C19.4953 9.08231 20.6733 9.17931 21.4413 9.94731C22.3203 10.8263 22.3203 12.2403 22.3203 15.0683V16.0683C22.3203 18.8973 22.3203 20.3113 21.4413 21.1903C20.5633 22.0683 19.1483 22.0683 16.3203 22.0683H8.32031C5.49231 22.0683 4.07731 22.0683 3.19931 21.1903C2.32031 20.3103 2.32031 18.8973 2.32031 16.0683V15.0683C2.32031 12.2403 2.32031 10.8263 3.19931 9.94731C3.96731 9.17931 5.14531 9.08231 7.32031 9.07031" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12.3203 15.0684V2.06836M12.3203 2.06836L15.3203 5.56836M12.3203 2.06836L9.32031 5.56836" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
              {uploadedImage && (
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", overflow: "hidden", border: "3px solid #4C7EFB", boxShadow: "0 4px 16px rgba(76, 126, 251, 0.2)" }}>
                  <img src={uploadedImage} alt="Uploaded" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>
          </div>

          {/* Vertical Divider */}
          <svg style={{ width: "0", height: "113px", strokeWidth: "1px", stroke: "#486284", opacity: "0.2", position: "relative" }} width="2" height="114" viewBox="0 0 2 114" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2" d="M0.867188 0.0683594V113.068" stroke="#486284" />
          </svg>

          {/* Delivery Methods - Center */}
          <div style={{ display: "flex", width: "366px", flexDirection: "column", alignItems: "flex-end", gap: "23px", position: "relative" }}>
            <div style={{ alignSelf: "stretch", color: "#486284", textAlign: "right", fontFamily: "Poppins", fontSize: "20px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", position: "relative" }}>
              <span style={{ color: "#1B1919" }}>אמצעי העברה</span>
              <span style={{ color: "#486284" }}> (אפשר לבחור יותר מאחד)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", position: "relative" }}>
              <div onClick={() => toggleDeliveryMethod("mobile")} style={{ display: "flex", width: "150px", height: "50px", padding: "10px 15px", flexDirection: "column", alignItems: "flex-start", gap: "10px", borderRadius: "10px", border: selectedDeliveryMethods.includes("mobile") ? "2px solid #4C7EFB" : "1px solid #e0e7ff", background: "rgba(245, 247, 252, 1)", position: "relative", cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", alignSelf: "stretch", position: "relative" }}>
                  <div style={{ width: "92.078px", color: "#4C7EFB", textAlign: "right", fontFamily: "Poppins", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", position: "relative" }}>
                    הודעה לנייד
                  </div>
                  <svg style={{ width: "34px", height: "34px", aspectRatio: "1/1", position: "relative" }} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0918 5.03026C10.0909 4.46692 10.3136 3.92626 10.7112 3.52712C11.1087 3.12798 11.6485 2.90303 12.2118 2.90172L23.5261 2.8833C23.8051 2.88284 24.0815 2.93734 24.3395 3.0437C24.5975 3.15007 24.832 3.3062 25.0297 3.5032C25.2273 3.70019 25.3843 3.93419 25.4915 4.19183C25.5987 4.44947 25.6541 4.7257 25.6546 5.00476L25.6936 29.0789C25.6943 29.6421 25.4714 30.1826 25.0739 30.5816C24.6764 30.9806 24.1367 31.2054 23.5735 31.2067L12.26 31.2251C11.9809 31.2256 11.7045 31.1711 11.4465 31.0647C11.1885 30.9584 10.954 30.8022 10.7564 30.6052C10.5587 30.4082 10.4018 30.1743 10.2946 29.9166C10.1874 29.659 10.1319 29.3827 10.1315 29.1037L10.0918 5.03026ZM11.5078 5.73647C11.5074 5.55043 11.5437 5.36614 11.6145 5.19412C11.6854 5.0221 11.7894 4.86572 11.9207 4.73391C12.052 4.60209 12.2079 4.49743 12.3797 4.42589C12.5514 4.35435 12.7356 4.31734 12.9216 4.31697L22.8227 4.30139C23.1983 4.30082 23.5587 4.44944 23.8248 4.71457C24.0908 4.97969 24.2407 5.33962 24.2415 5.71522L24.2726 24.8331C24.2729 25.0192 24.2365 25.2034 24.1656 25.3754C24.0947 25.5474 23.9906 25.7037 23.8592 25.8355C23.7279 25.9672 23.5718 26.0718 23.4001 26.1433C23.2283 26.2147 23.0441 26.2516 22.8581 26.2519L12.9577 26.2682C12.5821 26.2688 12.2217 26.1202 11.9556 25.855C11.6896 25.5899 11.5397 25.23 11.5389 24.8544L11.5078 5.73647ZM17.9139 29.8007C18.0998 29.8003 18.2838 29.7633 18.4554 29.6918C18.627 29.6204 18.7829 29.5158 18.9141 29.3841C19.0453 29.2523 19.1492 29.0961 19.22 28.9242C19.2908 28.7523 19.3271 28.5681 19.3267 28.3822C19.3263 28.1963 19.2893 28.0123 19.2179 27.8407C19.1464 27.6691 19.0418 27.5133 18.9101 27.3821C18.7784 27.2509 18.6221 27.1469 18.4502 27.0761C18.2783 27.0053 18.0942 26.9691 17.9083 26.9695C17.5329 26.9702 17.1732 27.12 16.9084 27.386C16.6435 27.6519 16.4951 28.0122 16.4958 28.3876C16.4966 28.7629 16.6464 29.1226 16.9124 29.3875C17.1783 29.6523 17.5386 29.8014 17.9139 29.8007Z" fill="#4C7EFB" />
                    <path d="M17.3353 19.5759C16.2098 18.6437 15.2847 17.8773 14.6394 17.1562C13.9948 16.4373 13.6406 15.775 13.6406 15.0546C13.6392 13.8816 14.645 12.9601 15.9271 12.9586C16.6525 12.9586 17.3509 13.2675 17.8063 13.7555L17.8892 13.8448L17.9721 13.7555C18.4268 13.2668 19.1245 12.9565 19.8506 12.9558C21.1327 12.9544 22.1392 13.8745 22.1406 15.0475C22.1406 15.7686 21.7886 16.4309 21.1454 17.1513C20.503 17.8716 19.5828 18.6374 18.4644 19.5688L18.453 19.5787L17.8949 20.0406L17.3353 19.5759Z" fill="#4C7EFB" />
                  </svg>
                </div>
              </div>
              <div onClick={() => toggleDeliveryMethod("email")} style={{ display: "flex", width: "173px", height: "50px", padding: "10px 15px", flexDirection: "column", alignItems: "flex-start", gap: "10px", borderRadius: "10px", background: "rgba(245, 247, 252, 1)", position: "relative", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", alignSelf: "stretch", position: "relative" }}>
                  <div style={{ width: "105.688px", color: "#4C7EFB", textAlign: "right", fontFamily: "Poppins", fontSize: "16px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", position: "relative" }}>
                    דואר אלקטרוני
                  </div>
                  <svg style={{ width: "30px", height: "31px", aspectRatio: "30/31", position: "relative" }} width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_314_28743)">
                      <path d="M13.0547 11.6934C11.6797 11.6934 10.5547 12.8817 10.5547 14.3413C10.5547 15.0775 10.8297 15.7234 11.2922 16.2142L15.5547 20.735L19.8297 16.2142C20.2797 15.7363 20.5547 15.0646 20.5547 14.3413C20.5547 12.8817 19.4297 11.6934 18.0547 11.6934C17.3797 11.6934 16.7422 11.9904 16.2922 12.4684L15.5547 13.2434L14.8297 12.4813C14.5992 12.2348 14.3236 12.0383 14.0188 11.903C13.7141 11.7677 13.3863 11.6965 13.0547 11.6934ZM15.5547 0.89502L26.8422 8.19294C27.5672 8.64502 28.0547 9.45877 28.0547 10.4017V23.3184C28.0547 24.7392 26.9297 25.9017 25.5547 25.9017H5.55469C4.17969 25.9017 3.05469 24.7392 3.05469 23.3184V10.4017C3.05469 9.45877 3.54219 8.64502 4.26719 8.19294L15.5547 0.89502ZM5.55469 12.985V23.3184H25.5547V12.985L23.0547 14.5996V14.3413C23.0547 13.6309 22.9047 12.9204 22.6422 12.2746L25.5547 10.4017L15.5547 3.94335L5.55469 10.4017L8.46719 12.2746C8.20469 12.9204 8.05469 13.6309 8.05469 14.3413V14.5996L5.55469 12.985Z" fill="#4C7EFB" />
                    </g>
                    <defs>
                      <clipPath id="clip0_314_28743">
                        <rect width="30" height="31" fill="white" transform="translate(0.554688 0.0683594)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <svg style={{ width: "0", height: "113px", strokeWidth: "1px", stroke: "#486284", opacity: "0.2", position: "relative" }} width="2" height="114" viewBox="0 0 2 114" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.2" d="M0.867188 0.0683594V113.068" stroke="#486284" />
          </svg>

          {/* Sender Name - Leftmost */}
          <div style={{ display: "flex", width: "372px", flexDirection: "column", alignItems: "flex-end", gap: "23px", position: "relative" }}>
            <div style={{ alignSelf: "stretch", color: "#486284", textAlign: "right", fontFamily: "Poppins", fontSize: "20px", fontStyle: "normal", fontWeight: "400", lineHeight: "normal", position: "relative" }}>
              <span style={{ color: "#1B1919" }}>ממי המתנה? </span>
              <span style={{ color: "#486284" }}>(רשמו את השם שלכם)</span>
            </div>
            <div style={{ display: "flex", height: "64px", padding: "21px 28px", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "10px", alignSelf: "stretch", borderRadius: "10px", border: "1px solid #4C7EFB", background: "rgba(245, 247, 252, 1)", position: "relative" }}>
              <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="שדה נבחר עם טקסט" style={{ width: "100%", color: "#1B1919", textAlign: "right", fontSize: "20px", fontFamily: "Poppins", background: "transparent", border: "none", outline: "none" }} />
            </div>
          </div>
        </div>

        {/* Section 2: Recipients */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "32px", alignSelf: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px" }}>
            <div style={{ color: "#1B1919", fontSize: "28px", fontFamily: "Poppins", fontWeight: "600", textAlign: "right" }}>
              פרטי המקבלים
            </div>
            <div style={{ color: "#486284", fontSize: "18px", fontFamily: "Poppins", textAlign: "right", opacity: "0.8" }}>
              הזינו את פרטי האנשים שיקבלו את המתנה
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", alignSelf: "stretch" }}>
            {recipients.map((recipient, index) => (
              <div key={recipient.id} style={{ display: "flex", gap: "20px", alignItems: "flex-end", justifyContent: "flex-end", padding: "24px", border: "2px solid #E5E7EB", borderRadius: "16px", background: "white", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}>
                <button onClick={() => removeRecipient(recipient.id)} disabled={recipients.length === 1} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #DC2626", background: recipients.length === 1 ? "#F3F4F6" : "#FEF2F2", color: recipients.length === 1 ? "#9CA3AF" : "#DC2626", cursor: recipients.length === 1 ? "not-allowed" : "pointer" }}>
                  מחק
                </button>

                <div style={{ display: "flex", gap: "16px", alignItems: "flex-end", flex: "1" }}>
                  <div style={{ flex: "1" }}>
                    <label style={{ display: "block", marginBottom: "8px", color: "#374151", fontSize: "16px", fontWeight: "500", textAlign: "right" }}>
                      אימייל
                    </label>
                    <input type="email" value={recipient.email} onChange={(e) => updateRecipient(recipient.id, "email", e.target.value)} placeholder="example@gmail.com" style={{ width: "100%", padding: "12px 16px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "16px", outline: "none", direction: "ltr", textAlign: "left" }} />
                  </div>

                  <div style={{ flex: "1" }}>
                    <label style={{ display: "block", marginBottom: "8px", color: "#374151", fontSize: "16px", fontWeight: "500", textAlign: "right" }}>
                      טלפון
                    </label>
                    <input type="tel" value={recipient.phone} onChange={(e) => updateRecipient(recipient.id, "phone", e.target.value)} placeholder="050-1234567" style={{ width: "100%", padding: "12px 16px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "16px", outline: "none", direction: "ltr", textAlign: "left" }} />
                  </div>

                  <div style={{ flex: "1" }}>
                    <label style={{ display: "block", marginBottom: "8px", color: "#374151", fontSize: "16px", fontWeight: "500", textAlign: "right" }}>
                      שם מלא
                    </label>
                    <input type="text" value={recipient.name} onChange={(e) => updateRecipient(recipient.id, "name", e.target.value)} placeholder="הזן שם מלא" style={{ width: "100%", padding: "12px 16px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "16px", outline: "none", textAlign: "right" }} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#374151", fontSize: "16px", fontWeight: "500" }}>מקבל {index + 1}</span>
                </div>
              </div>
            ))}

            <button onClick={addRecipient} style={{ alignSelf: "flex-end", padding: "12px 24px", border: "2px dashed #4C7EFB", borderRadius: "12px", background: "transparent", color: "#4C7EFB", fontSize: "16px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>+</span>
              הוסף מקבל נוסף
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <Link to="/gift-design" style={{ alignSelf: "center", textDecoration: "none" }}>
          <button style={{ padding: "16px 48px", background: "linear-gradient(135deg, #4C7EFB 0%, #6366F1 100%)", color: "white", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "600", cursor: "pointer", boxShadow: "0 8px 24px rgba(76, 126, 251, 0.3)", transition: "all 0.2s ease" }}>
            המשך לעיצוב המתנה
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}