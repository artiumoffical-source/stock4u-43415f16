import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyTicker from "@/components/CompanyTicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";

const jobOpenings = [
  {
    id: 1,
    title: "Full Stack Developer",
    department: "טכנולוגיה",
    location: "תל אביב",
    type: "משרה מלאה",
    description: "אנחנו מחפשים מפתח Full Stack מנוסה להצטרף לצוות הטכנולוגיה שלנו ולעזור לבנות את הפלטפורמה הפיננסית הבאה.",
    requirements: ["ניסיון של 3+ שנים בפיתוח", "React, Node.js, TypeScript", "ניסיון עם בסיסי נתונים", "עבודה בצוות"],
    tags: ["React", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    title: "יועץ השקעות",
    department: "פיננסים",
    location: "תל אביב",
    type: "משרה מלאה",
    description: "הצטרפו אלינו כיועץ השקעות ועזרו ללקוחות שלנו לקבל החלטות השקעה חכמות ומושכלות.",
    requirements: ["רישיון יועץ השקעות", "ניסיון של 5+ שנים בתחום", "יכולת הסבר מעולה", "אנגלית ברמה גבוהה"],
    tags: ["השקעות", "יעוץ", "מניות"]
  },
  {
    id: 3,
    title: "מנהל מוצר",
    department: "מוצר",
    location: "תל אביב",
    type: "משרה מלאה",
    description: "אנחנו מחפשים מנהל מוצר מנוסה שיוביל את פיתוח התכונות החדשות של הפלטפורמה שלנו.",
    requirements: ["ניסיון של 4+ שנים בניהול מוצר", "רקע טכנולוגי", "הבנה בתחום הפינטק", "יכולת ניתוח נתונים"],
    tags: ["מוצר", "אסטרטגיה", "UX"]
  },
  {
    id: 4,
    title: "מנהל שיווק דיגיטלי",
    department: "שיווק",
    location: "תל אביב",
    type: "משרה מלאה",
    description: "הובלת אסטרטגיית השיווק הדיגיטלי והגדלת בסיס הלקוחות דרך ערוצים דיגיטליים מגוונים.",
    requirements: ["ניסיון של 3+ שנים בשיווק דיגיטלי", "ניסיון עם Google Ads, Facebook", "ידע ב-Analytics", "יצירתיות ואנליטיקה"],
    tags: ["שיווק", "דיגיטל", "PPC"]
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">הצטרפו אלינו</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            בואו להיות חלק מהמהפכה הפיננסית הבאה. אנחנו מחפשים אנשים מוכשרים שרוצים לעשות שינוי אמיתי בעולם הפיננסים הישראלי.
          </p>
        </div>

        {/* Company Culture */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">התרבות שלנו</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                אנחנו מאמינים בעבודה בצוות, בחדשנות מתמדת ובהשפעה חיובית על הקהילה הפיננסית בישראל.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stock4u-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span>סביבת עבודה תומכת ומעצימה</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stock4u-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span>הזדמנויות פיתוח וקידום</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stock4u-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span>טכנולוגיות מתקדמות ועבודה מעניינת</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stock4u-blue rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <span>איזון בין עבודה לחיים אישיים</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-stock4u-light-blue to-background rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-stock4u-blue mb-2">50+</div>
                  <div className="text-muted-foreground">עובדים</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stock4u-blue mb-2">95%</div>
                  <div className="text-muted-foreground">שביעות רצון</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stock4u-blue mb-2">4.8</div>
                  <div className="text-muted-foreground">דירוג משרדי</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-stock4u-blue mb-2">∞</div>
                  <div className="text-muted-foreground">קפה וחטיפים</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">משרות פתוחות</h2>
            <p className="text-xl text-muted-foreground">
              הצטרפו לצוות שמגדיר מחדש את עולם הפיננסים הישראלי
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="stock-card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 leading-relaxed">
                    {job.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">דרישות:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-stock4u-blue rounded-full"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white">
                    הגש מועמדות
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact for Applications */}
          <div className="mt-16 text-center bg-stock4u-light-blue rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">לא מצאתם את המשרה המתאימה?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              אנחנו תמיד מחפשים כישרונות מיוחדים. שלחו לנו את הקורות החיים שלכם ונחזור אליכם!
            </p>
            <Button className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white">
              שלח קורות חיים
            </Button>
          </div>
        </section>
      </div>
      
      {/* Company Logos Ticker */}
      <CompanyTicker />
      
      <Footer />
    </div>
  );
};

export default Careers;