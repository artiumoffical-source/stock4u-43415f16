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
        {/* Left Side: STOCK4U Text Logo - Bold chunky style */}
        <Link to="/" className="flex-shrink-0">
          <span 
            className="text-[26px] font-black tracking-tight english-font"
            style={{ 
              color: '#4F80FF',
              fontWeight: 900,
              letterSpacing: '-0.02em'
            }}
          >
            STOCK4U
          </span>
        </Link>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Button - Blue Circle with shadow */}
          <Link
            to="/order-summary"
            className="relative w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ 
              backgroundColor: '#4F80FF',
              boxShadow: '0 4px 8px rgba(79, 128, 255, 0.35)'
            }}
          >
            {/* Shopping Basket Icon - White */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
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
            className="w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-95"
            style={{ 
              backgroundColor: '#FFC845',
              boxShadow: '0 4px 8px rgba(255, 200, 69, 0.4)'
            }}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" style={{ color: '#E85C3F' }} />
            ) : (
              /* Custom Hamburger with Orange/Red lines */
              <svg 
                width="20" 
                height="16" 
                viewBox="0 0 20 16" 
                fill="none"
              >
                <line x1="2" y1="2" x2="18" y2="2" stroke="#E85C3F" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="2" y1="8" x2="18" y2="8" stroke="#E85C3F" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="2" y1="14" x2="18" y2="14" stroke="#E85C3F" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 h-16 bg-white border-b border-gray-100">
            <Link to="/" className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              <span 
                className="text-[26px] font-black tracking-tight english-font"
                style={{ color: '#4F80FF', fontWeight: 900 }}
              >
                STOCK4U
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{ 
                backgroundColor: '#FFC845',
                boxShadow: '0 4px 8px rgba(255, 200, 69, 0.4)'
              }}
            >
              <X className="w-5 h-5" style={{ color: '#E85C3F' }} />
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
              style={{ backgroundColor: '#4F80FF' }}
            >
              התחברות
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
