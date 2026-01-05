import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import CompanyTicker from "@/components/CompanyTicker";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Users, Award } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">אודות Stock4U</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            אנחנו פלטפורמת המניות הפיננסית המובילה בישראל, המתמחים במתנות מניות ובחינוך פיננסי
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">המשימה שלנו</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                אנחנו מאמינים שכל אחד ראוי לעתיד פיננסי בטוח. המטרה שלנו היא להפוך את השקעות המניות לנגישות, פשוטות ומשמעותיות עבור כולם.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                דרך מתנות מניות, אנחנו עוזרים לאנשים להתחיל את המסע הפיננסי שלהם ולבנות הרגלי השקעה חכמים לטווח הארוך.
              </p>
            </div>
            <div className="bg-gradient-to-br from-stock4u-blue to-stock4u-dark-blue rounded-2xl p-8 text-white">
              <div className="text-4xl font-bold mb-4">10,000+</div>
              <div className="text-xl mb-2">לקוחות מרוצים</div>
              <div className="text-stock4u-light-blue">החלו את המסע הפיננסי שלהם איתנו</div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">הערכים שלנו</h2>
            <p className="text-xl text-muted-foreground">
              מה שמניע אותנו כל יום
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 stock-card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-stock4u-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">אמינות</h3>
                <p className="text-muted-foreground">
                  פלטפורמה מוסדרת ובטוחה שמבטיחה את הגנת ההשקעות שלכם
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 stock-card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-stock4u-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">צמיחה</h3>
                <p className="text-muted-foreground">
                  עוזרים לכם לבנות עתיד פיננסי חזק עם השקעות חכמות
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 stock-card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-stock4u-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">קהילה</h3>
                <p className="text-muted-foreground">
                  בונים קהילה של משקיעים חכמים ומתחילים
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 stock-card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-stock4u-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">מצויינות</h3>
                <p className="text-muted-foreground">
                  שאיפה מתמדת למצויינות בשירות ובחוויית המשתמש
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">הצוות שלנו</h2>
            <p className="text-xl text-muted-foreground">
              מומחים פיננסיים ואנשי טכנולוגיה מנוסים
            </p>
          </div>
          
          <div className="bg-stock4u-light-blue rounded-2xl p-8 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              הצוות שלנו מורכב ממומחי פיננסים, יועצי השקעות ומפתחי טכנולוגיה מובילים שמביאים ניסיון של שנים רבות בתחום הפיננסים והטכנולוגיה הפיננסית.
            </p>
            <p className="text-lg text-muted-foreground">
              כולנו מאמינים באותה מטרה: להפוך את עולם ההשקעות לנגיש ופשוט עבור כולם.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">צרו קשר</h2>
            <p className="text-lg text-muted-foreground mb-8">
              יש לכם שאלות? אנחנו כאן לעזור!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="font-bold mb-2">אימייל</h3>
                <p className="text-muted-foreground">info@stock4u.co.il</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2">טלפון</h3>
                <p className="text-muted-foreground">03-1234567</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2">כתובת</h3>
                <p className="text-muted-foreground">תל אביב, ישראל</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Company Logos Ticker */}
      <CompanyTicker />
      
      <Footer />
    </Layout>
  );
};

export default About;
