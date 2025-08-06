import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, TrendingUp, Gift, Shield, Users, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-stock4u-light-blue to-background overflow-hidden h-[566px]">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={heroImage}
            alt="Stock4U Hero Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Background Stock Chart */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full object-cover animate-chart-rise"
            viewBox="0 0 1921 614"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M0.433594 595.989L219.59 456.719L260.449 513.919L364.455 441.797L409.029 498.998L650.471 307.501L706.189 484.076L895.628 374.649L1070.21 309.719L1315.37 175.423L1460.23 406.711L2020.32 17.3564"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-stock4u-blue"
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-float">
              <span className="bg-gradient-to-l from-stock4u-blue to-stock4u-dark-blue bg-clip-text text-transparent">
                Stock4U
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              תנו מתנת מניות לאהובים שלכם ועזרו להם לבנות עתיד פיננסי חזק
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/stock-selection">
                <Button 
                  size="lg" 
                  className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white text-lg px-8 py-6 animate-glow shadow-lg"
                >
                  <Gift className="ml-2 h-5 w-5" />
                  התחל עכשיו
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-stock4u-blue text-stock4u-blue hover:bg-stock4u-blue hover:text-white text-lg px-8 py-6"
              >
                <Play className="ml-2 h-5 w-5" />
                צפה בסרטון
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="max-w-[1342px] mx-auto px-4 pt-16">
        <div className="bg-black rounded-[25px] border-[19px] border-stock4u-light-blue relative overflow-hidden w-full h-[400px] md:h-[684px]">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stock4u-blue/20 to-stock4u-dark-blue/20">
            <Button 
              size="lg" 
              className="bg-white/90 hover:bg-white text-stock4u-blue rounded-full w-20 h-20"
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">למה לבחור ב-Stock4U?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              אנחנו מספקים את הדרך הקלה והבטוחה ביותר לתת מתנות מניות ולהכנס לעולם הפיננסים
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center stock-card-hover glass-effect border-stock4u-light-blue">
              <div className="w-16 h-16 bg-stock4u-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">בטוח ומוסדר</h3>
              <p className="text-muted-foreground">
                פלטפורמה מוסדרת ומפוקחת שמבטיחה את אמינות ההשקעה שלכם
              </p>
            </Card>

            <Card className="p-8 text-center stock-card-hover glass-effect border-stock4u-light-blue">
              <div className="w-16 h-16 bg-stock4u-green rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">גידול פוטנציאלי</h3>
              <p className="text-muted-foreground">
                מניות מהחברות המובילות בעולם עם פוטנציאל גידול לטווח הארוך
              </p>
            </Card>

            <Card className="p-8 text-center stock-card-hover glass-effect border-stock4u-light-blue">
              <div className="w-16 h-16 bg-stock4u-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">מתנה משמעותית</h3>
              <p className="text-muted-foreground">
                תנו מתנה שתמשיך לגדול ולהביא ערך לטווח השנים הארוכות
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-stock4u-light-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-stock4u-blue mb-2">10,000+</div>
              <div className="text-muted-foreground">לקוחות מרוצים</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-stock4u-blue mb-2">₪50M+</div>
              <div className="text-muted-foreground">סכום מניות שנמכרו</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-stock4u-blue mb-2">500+</div>
              <div className="text-muted-foreground">מניות זמינות</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            הצטרפו לאלפי לקוחות שכבר נתנו מתנות מניות והתחילו לבנות עתיד פיננסי חזק
          </p>
          <Link to="/stock-selection">
            <Button 
              size="lg" 
              className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white text-xl px-12 py-6"
            >
              בחרו מניות עכשיו
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
