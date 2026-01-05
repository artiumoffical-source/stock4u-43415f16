import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation();

  const goToCart = () => {
    window.location.href = "/order-details";
  };

  return (
    <header
      className="w-full bg-white px-6 py-3 h-[80px] flex items-center border-b border-[#DDD] sticky top-0 z-50"
      style={{ boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}
    >
      <div className="w-full flex items-center justify-between">
        {/* Left side - Cart and Login */}
        <div className="flex items-center gap-5">
          {/* Shopping Cart with notification */}
          <div className="relative cursor-pointer" onClick={goToCart}>
            <div
              className="w-[40px] h-[38px] bg-[#4C7EFB] rounded-[40px] flex items-center justify-center hover:bg-blue-600 transition-colors"
              style={{ boxShadow: "10px 10px 0 0 rgba(0, 0, 0, 0.10)" }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 25 25"
              >
                <path
                  d="M19.9481 10.3121H5.35211C5.05673 10.3124 4.76524 10.3795 4.49943 10.5083C4.23362 10.6372 4.00037 10.8244 3.81711 11.0561C3.63462 11.2871 3.50709 11.5566 3.4442 11.8442C3.38131 12.1318 3.3847 12.43 3.45411 12.7161L5.01911 19.1241C5.2457 19.9497 5.73767 20.6778 6.41911 21.1961C7.10111 21.7151 7.93611 21.9961 8.79511 21.9961H16.5031C17.3621 21.9961 18.1971 21.7151 18.8791 21.1961C19.5606 20.6778 20.0525 19.9497 20.2791 19.1241L21.8441 12.7171C21.9495 12.2851 21.9032 11.8301 21.7132 11.4282C21.5231 11.0262 21.2008 10.7018 20.8001 10.5091C20.5335 10.3811 20.2418 10.3138 19.9461 10.3121M8.73711 14.2061V18.1011M12.6501 14.2061V18.1011M16.5631 14.2061V18.1011M19.4981 10.3121C19.4978 9.41614 19.3204 8.52909 18.9761 7.70191C18.6319 6.87473 18.1275 6.12374 17.4921 5.4921C16.2056 4.21259 14.4646 3.4949 12.6501 3.4961C10.8357 3.4949 9.09463 4.21259 7.80811 5.4921C7.17288 6.12383 6.66873 6.87485 6.32465 7.70203C5.98056 8.5292 5.80332 9.41621 5.80311 10.3121"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {cartCount > 0 && (
              <div className="absolute -top-1 -left-1 w-5 h-5 bg-[#FFC547] border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-[#1521B2]">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              </div>
            )}
          </div>

          {/* Login Button */}
          <Link
            to="/login"
            className="w-[100px] h-[38px] bg-[#DBE3F3] rounded-[40px] flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="text-[#4C7EFB] font-bold text-[15px]">
              כניסה
            </span>
          </Link>
        </div>

        {/* Center - Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=800"
            alt="Stock4U Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Right side - Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center p-[10px]">
            <button
              onClick={() => {
                const searchInput = document.querySelector(
                  'input[placeholder="חיפוש"]',
                ) as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus();
                }
              }}
              className="text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors cursor-pointer"
            >
              חיפוש
            </button>
          </div>
          <div className="flex items-center justify-center p-[10px]">
            <Link
              to="/careers"
              className={`text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors ${
                location.pathname === "/careers" ? "font-bold" : ""
              }`}
            >
              קריירה
            </Link>
          </div>
          <div className="flex items-center justify-center p-[10px]">
            <Link
              to="/stock-selection"
              className={`text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors ${
                location.pathname === "/stock-selection" ? "font-bold" : ""
              }`}
            >
              רשימת מתנות
            </Link>
          </div>
          <div className="flex items-center justify-center p-[10px]">
            <Link
              to="/about"
              className={`text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors ${
                location.pathname === "/about" ? "font-bold" : ""
              }`}
            >
              אודות
            </Link>
          </div>
          <div className="flex items-center justify-center p-[10px]">
            <Link
              to="/"
              className={`text-[#4C7EFB] text-[16px] hover:text-blue-600 transition-colors ${
                location.pathname === "/" ? "font-bold" : ""
              }`}
            >
              בית
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
