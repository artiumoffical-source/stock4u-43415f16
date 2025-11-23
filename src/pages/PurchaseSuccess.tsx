import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGift } from "@/contexts/GiftContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import jsPDF from "jspdf";

export default function PurchaseSuccess() {
  const { giftData } = useGift();

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

  // Get selected stocks for display
  const stocksList = giftData.selectedStocks.length > 0
    ? giftData.selectedStocks.map(stock => stock.symbol).join(", ")
    : "מניות נבחרות";

  // Generate PDF receipt
  const generateReceiptPDF = () => {
    const doc = new jsPDF();
    
    // Set font for Hebrew support (using built-in font)
    doc.setFont("helvetica");
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(76, 126, 251);
    doc.text("Stock4U - Receipt", 105, 30, { align: "center" });
    
    // Line separator
    doc.setDrawColor(76, 126, 251);
    doc.setLineWidth(1);
    doc.line(20, 40, 190, 40);
    
    // Receipt details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    let yPosition = 60;
    
    // Sender details
    doc.setFontSize(14);
    doc.setTextColor(72, 98, 132);
    doc.text("Sender Details:", 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${senderName}`, 25, yPosition);
    yPosition += 10;
    
    // Recipient details
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(72, 98, 132);
    doc.text("Recipient Details:", 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${recipientName}`, 25, yPosition);
    yPosition += 10;
    doc.text(`Email: ${recipientEmail}`, 25, yPosition);
    yPosition += 10;
    
    // Delivery details
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(72, 98, 132);
    doc.text("Delivery Information:", 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Delivery Date: ${formatDeliveryDateTime()}`, 25, yPosition);
    yPosition += 10;
    
    // Selected stocks
    yPosition += 10;
    doc.setFontSize(14);
    doc.setTextColor(72, 98, 132);
    doc.text("Selected Stocks:", 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    giftData.selectedStocks.forEach((stock, index) => {
      doc.text(`${index + 1}. ${stock.symbol} - Quantity: ${stock.amount}`, 25, yPosition);
      yPosition += 10;
    });
    
    // Greeting message (if exists)
    if (giftData.greetingMessage && giftData.greetingMessage.trim()) {
      yPosition += 10;
      doc.setFontSize(14);
      doc.setTextColor(72, 98, 132);
      doc.text("Personal Message:", 20, yPosition);
      yPosition += 15;
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      // Split long messages into multiple lines
      const messageLines = doc.splitTextToSize(giftData.greetingMessage, 170);
      messageLines.forEach((line: string) => {
        doc.text(line, 25, yPosition);
        yPosition += 10;
      });
    }
    
    // Footer
    yPosition += 20;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
    doc.text("Stock4U - Making investing accessible for everyone", 105, yPosition + 10, { align: "center" });
    
    // Save the PDF
    const fileName = `Stock4U_Receipt_${new Date().getTime()}.pdf`;
    doc.save(fileName);
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