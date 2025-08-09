import { useState } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden mobile-button flex items-center justify-center p-2"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "8px",
          background: "transparent",
          border: "2px solid #4C7EFB",
        }}
        aria-label="תפריט"
      >
        <svg
          className="w-6 h-6 text-[#4C7EFB]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l border-gray-200">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-[#4C7EFB] hebrew-font">תפריט</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="סגור תפריט"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-4">
                <div className="space-y-3">
                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="block py-3 px-4 text-[#4C7EFB] hebrew-font text-lg font-medium rounded-lg hover:bg-[#DBE3F3] transition-colors"
                  >
                    בית
                  </Link>
                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className="block py-3 px-4 text-[#4C7EFB] hebrew-font text-lg font-medium rounded-lg hover:bg-[#DBE3F3] transition-colors"
                  >
                    אודות
                  </Link>
                  <Link
                    to="/stock-selection?continue=true"
                    onClick={closeMenu}
                    className="block py-3 px-4 text-[#4C7EFB] hebrew-font text-lg font-medium rounded-lg hover:bg-[#DBE3F3] transition-colors"
                  >
                    רשימת מתנות
                  </Link>
                  <Link
                    to="/careers"
                    onClick={closeMenu}
                    className="block py-3 px-4 text-[#4C7EFB] hebrew-font text-lg font-medium rounded-lg hover:bg-[#DBE3F3] transition-colors"
                  >
                    קריירה
                  </Link>
                </div>
              </nav>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block w-full py-3 px-4 text-center text-white bg-[#4C7EFB] rounded-lg font-bold hebrew-font hover:bg-blue-600 transition-colors mobile-button"
                >
                  כניסה
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;