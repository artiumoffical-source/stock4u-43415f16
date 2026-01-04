import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-[hsl(var(--stock4u-light-blue))] sticky top-0 z-50 max-w-full">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
          Stock4U
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Profile Button */}
          <Link
            to="/login"
            className="w-10 h-10 rounded-full bg-[hsl(var(--stock4u-happy-blue))] flex items-center justify-center shadow-md"
          >
            <User className="w-5 h-5 text-white" />
          </Link>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full bg-[hsl(var(--stock4u-yellow))] flex items-center justify-center shadow-md"
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
          <div className="flex items-center justify-between px-4 py-3 bg-[hsl(var(--stock4u-light-blue))]">
            <Link to="/" className="text-2xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
              Stock4U
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-[hsl(var(--stock4u-yellow))] flex items-center justify-center shadow-md"
            >
              <X className="w-5 h-5 text-[hsl(var(--stock4u-dark-grey))]" />
            </button>
          </div>

          <nav className="flex flex-col p-6 gap-4">
            <Link
              to="/stock-selection?continue=true"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200"
            >
              בחירת מתנה
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200"
            >
              אודות
            </Link>
            <Link
              to="/careers"
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] py-3 border-b border-gray-200"
            >
              קריירה
            </Link>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 bg-[hsl(var(--stock4u-happy-blue))] text-white text-center py-4 rounded-full font-bold text-lg"
            >
              התחברות
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
