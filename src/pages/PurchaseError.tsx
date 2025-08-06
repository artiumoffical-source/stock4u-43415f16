import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PurchaseError = () => {
  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">שגיאה ברכישה</h1>
      </div>
      <Footer />
    </div>
  );
};

export default PurchaseError;