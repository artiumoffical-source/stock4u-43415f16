import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "בית", to: "/" },
    { label: "אודות", to: "/about" },
    { label: "רשימת מתנות", to: "/stock-selection?continue=true" },
    { label: "קריירה", to: "/careers" },
  ];

  return (
    <>
      <header 
        dir="rtl"
        className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100"
      >
        <div className="flex justify-between items-center w-full px-6 py-4">
          
          {/* RIGHT SIDE - Navigation & Search (RTL: appears on right) */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors hebrew-font"
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200" />

            {/* Search Input */}
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm text-gray-400 hebrew-font">חיפוש</span>
              <div className="w-24 border-b border-gray-300" />
              <Search className="w-4 h-4" />
            </div>
          </div>

          {/* Mobile: Hamburger Menu (RTL: appears on right) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="תפריט"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* LEFT SIDE - Actions (RTL: appears on left) */}
          <div className="flex items-center gap-3">
            {/* Cart Icon - Circle with shadow */}
            <Link to="/order-summary">
              <button 
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
                aria-label="עגלת קניות"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
              </button>
            </Link>

            {/* Login Button - Pill shape, light blue bg */}
            <Link to="/login">
              <button className="px-6 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm hover:bg-blue-200 transition-colors hebrew-font">
                כניסה
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" dir="rtl">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/25"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel - slides from top */}
          <div className="fixed top-[72px] right-0 left-0 bg-white shadow-lg border-t border-gray-100">
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 text-lg font-medium rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors hebrew-font text-right"
                >
                  {link.label}
                </Link>
              ))}

              {/* Search in Mobile */}
              <div className="flex items-center gap-3 py-3 px-4 text-gray-400 border-t border-gray-100 mt-2 pt-4">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="חיפוש..."
                  className="bg-transparent border-none outline-none text-base placeholder:text-gray-400 flex-1 hebrew-font"
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
