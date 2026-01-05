import { Link } from "react-router-dom";
import { Search, ShoppingBag } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header
      dir="rtl"
      className="w-full bg-white sticky top-0 z-50 flex items-center justify-between px-8 py-4"
    >
      {/* RIGHT SIDE - Logo + Navigation Links (RTL: appears on right) */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=800"
            className="h-10 w-auto"
            alt="Stock4U Logo"
          />
        </Link>

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-[#4C7EFB] font-medium text-base hover:opacity-80 transition-opacity"
          >
            בית
          </Link>
          <Link
            to="/about"
            className="text-[#4C7EFB] font-medium text-base hover:opacity-80 transition-opacity"
          >
            אודות
          </Link>
          <Link
            to="/stock-selection?continue=true"
            className="text-[#4C7EFB] font-medium text-base hover:opacity-80 transition-opacity"
          >
            רשימת מתנות
          </Link>
          <Link
            to="/careers"
            className="text-[#4C7EFB] font-medium text-base hover:opacity-80 transition-opacity"
          >
            קריירה
          </Link>
        </nav>

        {/* Search - Desktop Only */}
        <div className="hidden md:flex items-center gap-2 text-[#4C7EFB] border-b border-[#4C7EFB]/30 pb-1 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-base">חיפוש</span>
          <div className="w-24 border-b border-[#4C7EFB]/30" />
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* LEFT SIDE - Login Button + Cart Icon (RTL: appears on left) */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu - Mobile Only */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Login Button - Desktop Only */}
        <Link to="/login" className="hidden md:block">
          <div className="bg-[#DBE3F3] text-[#4C7EFB] font-bold text-base px-8 py-2.5 rounded-full hover:bg-[#c9d5eb] transition-colors cursor-pointer">
            כניסה
          </div>
        </Link>

        {/* Cart Icon */}
        <Link to="/order-summary">
          <div className="w-12 h-12 rounded-full bg-[#4C7EFB] flex items-center justify-center hover:bg-[#3a6ae8] transition-colors cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
}