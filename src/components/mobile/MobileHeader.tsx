import { Link } from "react-router-dom";
import { User, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-50">
        {/* Left Side (RTL): Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=400"
            className="h-8 w-auto"
            alt="Stock4U Logo"
          />
        </Link>

        {/* Right Side (RTL): Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Button with Badge */}
          <Link
            to="/order-summary"
            className="relative min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[hsl(var(--stock4u-happy-blue))] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Profile Button - Blue Circle */}
          <Link
            to="/login"
            className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[hsl(var(--stock4u-happy-blue))] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <User className="w-5 h-5 text-white" />
          </Link>

          {/* Menu Button - Yellow Circle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[hsl(var(--stock4u-yellow))] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-[hsl(var(--stock4u-dark-grey))]" />
            ) : (
              <Menu className="w-5 h-5 text-[hsl(var(--stock4u-dark-grey))]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
            <Link to="/" className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=400"
                className="h-8 w-auto"
                alt="Stock4U Logo"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[hsl(var(--stock4u-yellow))] flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <X className="w-5 h-5 text-[hsl(var(--stock4u-dark-grey))]" />
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
              className="mt-4 bg-[hsl(var(--stock4u-happy-blue))] text-white text-center py-4 rounded-full font-bold text-lg min-h-[52px] flex items-center justify-center active:scale-95 transition-transform"
            >
              התחברות
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
