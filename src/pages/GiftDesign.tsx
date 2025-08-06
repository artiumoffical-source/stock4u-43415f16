import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GiftDesign = () => {
  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>עיצוב המתנה</CardTitle>
          </CardHeader>
          <CardContent>
            <p>עמוד עיצוב המתנה - בפיתוח</p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default GiftDesign;