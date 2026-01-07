import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGift } from "@/contexts/GiftContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import stock4uLogo from "@/assets/stock4u-logo-pdf.png";

export default function PurchaseSuccess() {
  const { giftData } = useGift();
  const receiptRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Format delivery date and time
  const formatDeliveryDateTime = () => {
    if (giftData.sendingMethod === "immediately") {
      return "מיד";
    }

    if (giftData.selectedDate && giftData.selectedTime) {
      const { day, month, year } = giftData.selectedDate;
      const { hour, minute } = giftData.selectedTime;

      if (day && month && year && hour && minute) {
        return `${day} ${month} ${year}, ${hour}:${minute}`;
      }
    }

    return giftData.recipientDetails.deliveryDate || "תאריך לא צוין";
  };

  // Get sender name or fallback
  const senderName = giftData.senderName || "השולח";

  // Get recipient name or fallback
  const recipientName = giftData.recipientDetails.name || "הנמען";

  // Get recipient email or fallback
  const recipientEmail = giftData.recipientDetails.email || "לא צוין";

  // Current date formatted
  const currentDate = new Date().toLocaleDateString("he-IL");
  const currentTime = new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" });

  // Calculate totals
  const calculateSubtotal = () => {
    return giftData.selectedStocks.reduce((total, stock) => {
      const price = stock.price || 100;
      return total + (price * stock.amount);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const serviceFee = 15;
  const grandTotal = subtotal + serviceFee;

  // Generate PDF receipt using html2canvas
  const generateReceiptPDF = async () => {
    if (!receiptRef.current) return;

    try {
      // Make the hidden receipt visible temporarily
      receiptRef.current.style.display = "block";

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Hide the receipt again
      receiptRef.current.style.display = "none";

      const fileName = `Stock4U_Receipt_${new Date().getTime()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Hide the receipt in case of error
      if (receiptRef.current) {
        receiptRef.current.style.display = "none";
      }
    }
  };

  return (
    <div style={{ direction: "rtl", minHeight: "100vh", background: "#FFF" }}>
      <Header />

      {/* Hero Section - Original Figma Design */}
      <div style={{ position: "relative", width: "100%", height: "559px", overflow: "hidden" }}>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/5cafa848e255474fc771e474fc37970f0e1c731b?width=3840"
          alt="הרכישה בוצעה בהצלחה!"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
          }}
        />
      </div>

      {/* Gift Details Section */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "60px 20px",
        background: "#F5F7FC"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1275px",
          background: "#FFF",
          borderRadius: "30px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
        }}>
          {/* Main Gift Info */}
          <div style={{
            background: "linear-gradient(135deg, #F5F7FC 0%, #E8F1FF 100%)",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            textAlign: "center"
          }}>
            <p style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#486284",
              margin: "0",
              lineHeight: "1.4",
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              המתנה מ- <span style={{ color: "#E96036" }}>{senderName}</span> תישלח אל{" "}
              <span style={{ color: "#E96036" }}>{recipientName}</span> ב-{" "}
              <span style={{ color: "#E96036" }}>{formatDeliveryDateTime()}</span>
            </p>
          </div>

          {/* Receipt Download */}
          <div style={{
            background: "rgba(76, 126, 251, 0.1)",
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
            border: "2px solid rgba(76, 126, 251, 0.2)"
          }}>
            <h3 style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#4C7EFB",
              margin: "0 0 16px",
              fontFamily: "'Greycliff Hebrew CF', -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              הורד קבלה
            </h3>
            <Button
              onClick={generateReceiptPDF}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              style={{
                fontFamily: "'Greycliff Hebrew CF', -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "16px",
                padding: "12px 24px"
              }}
            >
              <Download className="h-4 w-4" />
              הורד קבלה PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: "60px 20px",
        background: "#FFF"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          width: "100%",
          maxWidth: "1200px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px",
            borderRadius: "24px",
            background: "rgba(239, 242, 246, 0.40)"
          }}>
            <div style={{
              fontSize: "60px",
              fontWeight: "700",
              color: "#486284",
              margin: "0 0 16px",
              fontFamily: "'DM Sans', -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              24+
            </div>
            <div style={{
              fontSize: "20px",
              color: "#8CA2C0",
              textAlign: "center",
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              מדינות שבהם אנו עובדים
            </div>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px",
            borderRadius: "24px",
            background: "rgba(239, 242, 246, 0.40)"
          }}>
            <div style={{
              fontSize: "60px",
              fontWeight: "700",
              color: "#486284",
              margin: "0 0 16px",
              fontFamily: "'DM Sans', -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              17M
            </div>
            <div style={{
              fontSize: "20px",
              color: "#8CA2C0",
              textAlign: "center",
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              אנשים שהאמינו בנו
            </div>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px",
            borderRadius: "24px",
            background: "rgba(239, 242, 246, 0.40)"
          }}>
            <div style={{
              fontSize: "60px",
              fontWeight: "700",
              color: "#486284",
              margin: "0 0 16px",
              fontFamily: "'DM Sans', -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              +95%
            </div>
            <div style={{
              fontSize: "20px",
              color: "#8CA2C0",
              textAlign: "center",
              fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              לקוחות מרוצים
            </div>
          </div>
        </div>
      </div>

      {/* Company Logos Ticker */}
      <div style={{
        padding: "40px 0",
        background: "#F9FAFC",
        overflow: "hidden"
      }}>
        <h3 style={{
          fontSize: "20px",
          color: "#486284",
          textAlign: "center",
          margin: "0 0 40px",
          fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif"
        }}>
          חברות פופולאריות להשקעה
        </h3>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "44px",
          opacity: "0.6",
          animation: "scroll 30s linear infinite",
          whiteSpace: "nowrap"
        }}>
          {["GOOG", "AMZN", "NASDAQ", "AAPL", "AAN", "NVDA", "MSFT", "META", "SONY", "CRM"].map((symbol) => (
            <div key={symbol} style={{
              fontSize: "52px",
              fontWeight: "700",
              color: "#486284",
              fontFamily: "'Hanken Grotesk', -apple-system, Roboto, Helvetica, sans-serif"
            }}>
              {symbol}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        padding: "60px 20px",
        background: "#FFF"
      }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            padding: "16px 32px",
            borderRadius: "50px",
            background: "#4C7EFB",
            color: "#FFF",
            fontSize: "18px",
            fontWeight: "700",
            textDecoration: "none",
            boxShadow: "10px 10px 0 0 rgba(0, 0, 0, 0.10)",
            fontFamily: "'Greycliff Hebrew CF', -apple-system, Roboto, Helvetica, sans-serif"
          }}
        >
          חזור לעמוד הבית
        </Link>

        <Link
          to="/stock-selection"
          style={{
            display: "inline-flex",
            padding: "16px 32px",
            borderRadius: "50px",
            background: "#DBE3F3",
            color: "#4C7EFB",
            fontSize: "18px",
            fontWeight: "700",
            textDecoration: "none",
            fontFamily: "'Greycliff Hebrew CF', -apple-system, Roboto, Helvetica, sans-serif"
          }}
        >
          שלח מתנה נוספת
        </Link>
      </div>

      <Footer />

      {/* Hidden Receipt Template for PDF Generation */}
      <div
        ref={receiptRef}
        style={{
          display: "none",
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "794px",
          padding: "40px",
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
          direction: "rtl",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px", borderBottom: "3px solid #4C7EFB", paddingBottom: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <h1 style={{ fontSize: "28px", color: "#486284", margin: "0 0 8px", fontWeight: "700" }}>קבלה / חשבונית מס</h1>
            <p style={{ fontSize: "14px", color: "#8CA2C0", margin: "4px 0" }}>מספר הזמנה: #{Date.now().toString().slice(-8)}</p>
            <p style={{ fontSize: "14px", color: "#8CA2C0", margin: "4px 0" }}>תאריך: {currentDate}</p>
            <p style={{ fontSize: "14px", color: "#8CA2C0", margin: "4px 0" }}>שעה: {currentTime}</p>
          </div>
          <div style={{ textAlign: "left" }}>
            <img src={stock4uLogo} alt="Stock4U" style={{ height: "50px", marginBottom: "10px" }} />
          </div>
        </div>

        {/* Company Details */}
        <div style={{ backgroundColor: "#F5F7FC", padding: "15px 20px", borderRadius: "10px", marginBottom: "25px" }}>
          <p style={{ fontSize: "14px", color: "#486284", margin: "4px 0", fontWeight: "600" }}>Stock4U Ltd.</p>
          <p style={{ fontSize: "12px", color: "#8CA2C0", margin: "4px 0" }}>support@stock4u.co.il | www.stock4u.co.il</p>
        </div>

        {/* Customer & Recipient Grid */}
        <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
          <div style={{ flex: 1, backgroundColor: "#FAFBFD", padding: "20px", borderRadius: "10px", border: "1px solid #E8EDF5" }}>
            <h3 style={{ fontSize: "16px", color: "#4C7EFB", margin: "0 0 12px", fontWeight: "700" }}>פרטי השולח</h3>
            <p style={{ fontSize: "14px", color: "#486284", margin: "6px 0" }}><strong>שם:</strong> {senderName}</p>
            <p style={{ fontSize: "14px", color: "#486284", margin: "6px 0" }}><strong>אימייל:</strong> {giftData.recipientDetails.email || "לא צוין"}</p>
          </div>
          <div style={{ flex: 1, backgroundColor: "#FAFBFD", padding: "20px", borderRadius: "10px", border: "1px solid #E8EDF5" }}>
            <h3 style={{ fontSize: "16px", color: "#4C7EFB", margin: "0 0 12px", fontWeight: "700" }}>פרטי מקבל המתנה</h3>
            <p style={{ fontSize: "14px", color: "#486284", margin: "6px 0" }}><strong>שם:</strong> {recipientName}</p>
            <p style={{ fontSize: "14px", color: "#486284", margin: "6px 0" }}><strong>תאריך משלוח:</strong> {formatDeliveryDateTime()}</p>
          </div>
        </div>

        {/* Items Table */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "18px", color: "#486284", margin: "0 0 15px", fontWeight: "700" }}>פירוט המוצרים</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#4C7EFB", color: "#ffffff" }}>
                <th style={{ padding: "12px 15px", textAlign: "right", borderRadius: "8px 0 0 0" }}>תיאור המוצר</th>
                <th style={{ padding: "12px 15px", textAlign: "center" }}>כמות</th>
                <th style={{ padding: "12px 15px", textAlign: "center" }}>מחיר יחידה</th>
                <th style={{ padding: "12px 15px", textAlign: "left", borderRadius: "0 8px 0 0" }}>סה"כ</th>
              </tr>
            </thead>
            <tbody>
              {giftData.selectedStocks.map((stock, index) => {
                const price = stock.price || 100;
                const lineTotal = price * stock.amount;
                return (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#FAFBFD" : "#ffffff", borderBottom: "1px solid #E8EDF5" }}>
                    <td style={{ padding: "12px 15px", textAlign: "right", color: "#486284" }}>מניית {stock.symbol} - חבילת מתנה</td>
                    <td style={{ padding: "12px 15px", textAlign: "center", color: "#486284" }}>{stock.amount}</td>
                    <td style={{ padding: "12px 15px", textAlign: "center", color: "#486284" }}>₪{price.toFixed(2)}</td>
                    <td style={{ padding: "12px 15px", textAlign: "left", color: "#486284", fontWeight: "600" }}>₪{lineTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "30px" }}>
          <div style={{ width: "300px", backgroundColor: "#F5F7FC", padding: "20px", borderRadius: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", color: "#8CA2C0" }}>סכום ביניים:</span>
              <span style={{ fontSize: "14px", color: "#486284" }}>₪{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "14px", color: "#8CA2C0" }}>דמי שירות:</span>
              <span style={{ fontSize: "14px", color: "#486284" }}>₪{serviceFee.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #4C7EFB", paddingTop: "10px", marginTop: "10px" }}>
              <span style={{ fontSize: "18px", color: "#486284", fontWeight: "700" }}>סה"כ לתשלום:</span>
              <span style={{ fontSize: "18px", color: "#4C7EFB", fontWeight: "700" }}>₪{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Personal Message (if exists) */}
        {giftData.greetingMessage && giftData.greetingMessage.trim() && (
          <div style={{ backgroundColor: "#FFF8F5", padding: "20px", borderRadius: "10px", marginBottom: "30px", border: "1px solid #FFE5DB" }}>
            <h4 style={{ fontSize: "14px", color: "#E96036", margin: "0 0 10px", fontWeight: "600" }}>הודעה אישית:</h4>
            <p style={{ fontSize: "14px", color: "#486284", margin: 0, lineHeight: "1.6" }}>{giftData.greetingMessage}</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: "2px solid #E8EDF5", paddingTop: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#8CA2C0", margin: "0 0 5px" }}>Stock4U - הופכים השקעות לנגישות לכולם</p>
          <p style={{ fontSize: "11px", color: "#B8C5D6", margin: 0 }}>מסמך זה הופק אוטומטית ואינו דורש חתימה</p>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
        `}
      </style>
    </div>
  );
}