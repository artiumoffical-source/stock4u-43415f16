import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Download, Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PurchaseSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stock4u-light-blue to-background hebrew-font" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Icon and Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-stock4u-dark-blue mb-4">
              הרכישה בוצעה בהצלחה!
            </h1>
            <p className="text-xl text-muted-foreground">
              תודה שבחרת ב-Stock4U. פרטי ההזמנה נשלחו אליך במייל.
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="mb-8 border-2 border-stock4u-blue/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-stock4u-blue to-stock4u-dark-blue text-white">
              <CardTitle className="text-2xl text-center">פרטי ההזמנה</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-stock4u-dark-blue mb-2">מספר הזמנה:</h3>
                    <p className="text-lg font-mono bg-gray-100 p-2 rounded">
                      #SO{Date.now().toString().slice(-6)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stock4u-dark-blue mb-2">תאריך הזמנה:</h3>
                    <p className="text-lg">{new Date().toLocaleDateString('he-IL')}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-stock4u-dark-blue mb-2">סטטוס:</h3>
                    <p className="text-lg text-green-600 font-semibold">שולם בהצלחה</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stock4u-dark-blue mb-2">אופן משלוח:</h3>
                    <p className="text-lg">משלוח דיגיטלי מיידי</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-stock4u-dark-blue">מה הלאה?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mail className="w-8 h-8 text-stock4u-blue mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">בדוק את המייל שלך</h4>
                  <p className="text-sm text-muted-foreground">
                    קיבלת אישור הזמנה ופרטי גישה למוצרים שרכשת
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Download className="w-8 h-8 text-stock4u-blue mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">הורד את המוצרים</h4>
                  <p className="text-sm text-muted-foreground">
                    לחץ על קישורי ההורדה שנשלחו אליך במייל
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-8 h-8 text-stock4u-blue mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">זקוק לעזרה?</h4>
                  <p className="text-sm text-muted-foreground">
                    צור קשר עם צוות התמיכה שלנו לכל שאלה
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white px-8 py-3 text-lg"
            >
              חזור לעמוד הבית
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = 'mailto:support@stock4u.co.il'}
              className="border-stock4u-blue text-stock4u-blue hover:bg-stock4u-blue hover:text-white px-8 py-3 text-lg"
            >
              צור קשר לתמיכה
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              יש לך שאלות? אנחנו כאן לעזור! צור קשר בטלפון: 03-1234567 או במייל: support@stock4u.co.il
            </p>
            <p>
              הזמנתך מאובטחת ב-SSL והתשלום עובר דרך מערכות תשלום מוכרות ובטוחות
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PurchaseSuccess;