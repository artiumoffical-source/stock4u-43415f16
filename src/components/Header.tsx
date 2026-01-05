import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "בית", to: "/" },
    { label: "אודות", to: "/about" },
    { label: "רשימת מתנות", to: "/stock-selection?continue=true" },
    { label: "קריירה", to: "/careers" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            
            {/* Left Side - Cart & Login (appears on left in RTL) */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <Link to="/order-summary">
                <button 
                  className="w-11 h-11 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                  aria-label="עגלת קניות"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                </button>
              </Link>

              {/* Login Button - Desktop */}
              <Link to="/login" className="hidden md:block">
                <button className="px-6 py-2.5 rounded-full bg-blue-100 text-primary font-medium text-base hover:bg-blue-200 transition-colors hebrew-font">
                  כניסה
                </button>
              </Link>
            </div>

            {/* Center - Logo (Mobile only) */}
            <Link to="/" className="md:hidden absolute left-1/2 -translate-x-1/2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=800"
                alt="Stock4U Logo"
                className="h-10"
              />
            </Link>

            {/* Right Side - Navigation & Search (Desktop) */}
            <nav className="hidden md:flex items-center gap-8">
              {/* Search */}
              <div className="flex items-center gap-2 text-gray-400">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="חיפוש"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-base placeholder:text-gray-400 w-20 hebrew-font"
                  dir="rtl"
                />
                <div className="w-px h-5 bg-gray-200 mr-2" />
              </div>

              {/* Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-primary font-normal text-base hover:text-primary/80 transition-colors hebrew-font"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center"
              aria-label="תפריט"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/25"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="fixed top-16 right-0 left-0 bg-white shadow-lg border-t border-gray-100 animate-in slide-in-from-top-2">
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 text-primary text-lg font-medium rounded-xl hover:bg-blue-50 transition-colors hebrew-font text-right"
                >
                  {link.label}
                </Link>
              ))}

              {/* Search in Mobile */}
              <div className="flex items-center gap-2 py-3 px-4 text-gray-400">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="חיפוש"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-base placeholder:text-gray-400 flex-1 hebrew-font"
                  dir="rtl"
                />
              </div>

              {/* Login Button */}
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4"
              >
                <button className="w-full py-3 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors hebrew-font">
                  כניסה
                </button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
