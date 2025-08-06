import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-stock4u-blue to-stock4u-dark-blue bg-clip-text text-transparent mb-4">
              Stock4U
            </div>
            <p className="text-muted-foreground max-w-md">
              פלטפורמת המניות הפיננסית המובילה בישראל. תנו מתנות מניות לאהובים שלכם ועזרו להם לבנות עתיד פיננסי חזק.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">ניווט</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-stock4u-blue transition-colors">
                בית
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-stock4u-blue transition-colors">
                אודות
              </Link>
              <Link to="/careers" className="block text-muted-foreground hover:text-stock4u-blue transition-colors">
                קריירה
              </Link>
              <Link to="/stock-selection" className="block text-muted-foreground hover:text-stock4u-blue transition-colors">
                מתנת מניות
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">צור קשר</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>אימייל: info@stock4u.co.il</p>
              <p>טלפון: 03-1234567</p>
              <p>כתובת: תל אביב, ישראל</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Stock4U. כל הזכויות שמורות.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-stock4u-blue transition-colors">
                מדיניות פרטיות
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-stock4u-blue transition-colors">
                תנאי שימוש
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;