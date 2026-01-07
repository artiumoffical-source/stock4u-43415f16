import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="flex items-center justify-between px-4 h-16 bg-white sticky top-0 z-50">
        {/* Left Side: STOCK4U Text Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-2xl font-black tracking-tight english-font" style={{ color: '#4F86F9' }}>
            STOCK4U
          </span>
        </Link>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Button - Blue Circle */}
          <Link
            to="/order-summary"
            className="relative w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ backgroundColor: '#4F86F9' }}
          >
            {/* Shopping Basket Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h17.234l-2.546-4.243a.5.5 0 1 1 .858-.514L21.929 6H22a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-.382l-1.56 7.803A3 3 0 0 1 17.117 19H6.883a3 3 0 0 1-2.94-2.397L2.382 9H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h.071L5.071.757a.5.5 0 0 1 .686-.172z"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Menu Button - Yellow Circle with Orange Lines */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{ backgroundColor: '#FFCA42' }}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" style={{ color: '#E67E22' }} />
            ) : (
              /* Hamburger Menu with Orange Lines */
              <div className="flex flex-col gap-1.5">
                <span className="w-5 h-0.5 rounded-full" style={{ backgroundColor: '#E67E22' }}></span>
                <span className="w-5 h-0.5 rounded-full" style={{ backgroundColor: '#E67E22' }}></span>
                <span className="w-5 h-0.5 rounded-full" style={{ backgroundColor: '#E67E22' }}></span>
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 h-16 bg-white border-b border-gray-100">
            <Link to="/" className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              <span className="text-2xl font-black tracking-tight english-font" style={{ color: '#4F86F9' }}>
                STOCK4U
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{ backgroundColor: '#FFCA42' }}
            >
              <X className="w-5 h-5" style={{ color: '#E67E22' }} />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              בית
            </Link>
            <Link
              to="/stock-selection?continue=true"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              בחירת מתנה
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              אודות
            </Link>
            <Link
              to="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              קריירה
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 text-white text-center py-4 rounded-full font-bold text-lg min-h-[52px] flex items-center justify-center active:scale-95 transition-transform"
              style={{ backgroundColor: '#4F86F9' }}
            >
              התחברות
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
