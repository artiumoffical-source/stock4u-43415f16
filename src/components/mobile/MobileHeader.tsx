import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="flex items-center justify-between px-5 h-[70px] bg-white border-b border-gray-100 sticky top-0 z-50">
        {/* Logo (Left) */}
        <Link to="/" className="flex-shrink-0">
          <span 
            className="text-[28px] font-black tracking-tight"
            style={{ 
              color: '#4880FF',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 900
            }}
          >
            STOCK4U
          </span>
        </Link>

        {/* Actions (Right) */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <Link
            to="/order-summary"
            className="relative w-11 h-11 bg-[#4880FF] rounded-full flex items-center justify-center shadow-[2px_3px_0px_#E2E8F0] active:translate-y-1 active:shadow-none transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 11 4-7"></path>
              <path d="m19 11-4-7"></path>
              <path d="M2 11h20"></path>
              <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"></path>
              <path d="m9 11 1 9"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-11 h-11 bg-[#FFC845] rounded-full flex items-center justify-center shadow-[2px_3px_0px_#E2E8F0] active:translate-y-1 active:shadow-none transition-all"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" style={{ color: '#EF5A3D' }} />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20" stroke="#EF5A3D" strokeWidth="3" strokeLinecap="round"/>
                <path d="M4 12H20" stroke="#EF5A3D" strokeWidth="3" strokeLinecap="round"/>
                <path d="M4 18H20" stroke="#EF5A3D" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-5 h-[70px] bg-white border-b border-gray-100">
            <Link to="/" className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              <span 
                className="text-[28px] font-black tracking-tight"
                style={{ color: '#4880FF', fontWeight: 900 }}
              >
                STOCK4U
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-11 h-11 bg-[#FFC845] rounded-full flex items-center justify-center shadow-[2px_3px_0px_#E2E8F0] active:translate-y-1 active:shadow-none transition-all"
            >
              <X className="w-5 h-5" style={{ color: '#EF5A3D' }} />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-gray-800 py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              בית
            </Link>
            <Link
              to="/stock-selection?continue=true"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-gray-800 py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              בחירת מתנה
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-gray-800 py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              אודות
            </Link>
            <Link
              to="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-gray-800 py-3 border-b border-gray-200 min-h-[48px] flex items-center"
            >
              קריירה
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 text-white text-center py-4 rounded-full font-bold text-lg min-h-[52px] flex items-center justify-center bg-[#4880FF] active:translate-y-1 transition-all"
            >
              התחברות
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
