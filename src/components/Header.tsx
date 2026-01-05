import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header
      className="w-full bg-white border-b border-gray-200 relative"
      style={{
        height: "75px",
        padding: "0 max(16px, min(35px, 5vw))",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left side - Cart and Login */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Shopping Cart */}
        <Link to="/order-summary" style={{ textDecoration: "none" }}>
          <div
            className="mobile-button"
            style={{
              width: "48px",
              height: "47px",
              borderRadius: "56px",
              background: "#4C7EFB",
              boxShadow: "6px 6px 0 0 rgba(0, 0, 0, 0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              minWidth: "44px",
              minHeight: "44px",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.9491 10.3121H5.35309C5.0577 10.3124 4.76621 10.3795 4.50041 10.5083C4.2346 10.6372 4.00135 10.8244 3.81809 11.0561C3.63559 11.2871 3.50807 11.5566 3.44517 11.8442C3.38228 12.1318 3.38567 12.43 3.45509 12.7161L5.02009 19.1241C5.24668 19.9497 5.73865 20.6778 6.42009 21.1961C7.10209 21.7151 7.93709 21.9961 8.79609 21.9961H16.5041C17.3631 21.9961 18.1981 21.7151 18.8801 21.1961C19.5615 20.6778 20.0535 19.9497 20.2801 19.1241L21.8451 12.7171C21.9504 12.2851 21.9042 11.8301 21.7142 11.4282C21.5241 11.0262 21.2018 10.7018 20.8011 10.5091C20.5345 10.3811 20.2428 10.3138 19.9471 10.3121M8.73809 14.2061V18.1011M12.6511 14.2061V18.1011M16.5641 14.2061V18.1011M19.4991 10.3121C19.4987 9.41614 19.3213 8.52909 18.9771 7.70191C18.6328 6.87473 18.1285 6.12374 17.4931 5.4921C16.2066 4.21259 14.4655 3.4949 12.6511 3.4961C10.8366 3.4949 9.09561 4.21259 7.80909 5.4921C7.17385 6.12383 6.66971 6.87485 6.32562 7.70203C5.98154 8.5292 5.8043 9.41621 5.80409 10.3121"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>

        {/* Login Button */}
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div
            className="mobile-button"
            style={{
              display: "flex",
              width: "auto",
              minWidth: "100px",
              height: "47px",
              padding: "12px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "50px",
              background: "#DBE3F3",
              cursor: "pointer",
              minHeight: "44px",
            }}
          >
            <span
              style={{
                color: "#4C7EFB",
                textAlign: "center",
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              כניסה
            </span>
          </div>
        </Link>
      </div>

      {/* Center - Logo (Clickable link to homepage) */}
      <Link 
        to="/"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=800"
          className="max-w-none hover:opacity-80 transition-opacity cursor-pointer"
          style={{
            height: "min(66px, 12vw)",
            width: "auto",
            maxHeight: "60px",
          }}
          alt="Stock4U Logo"
        />
      </Link>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* Right side - Navigation - Desktop Only */}
      <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#4C7EFB",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            בית
          </span>
        </Link>

        <Link to="/about" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#4C7EFB",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            אודות
          </span>
        </Link>

        <Link
          to="/stock-selection?continue=true"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              color: "#4C7EFB",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            רשימת מתנות
          </span>
        </Link>

        <Link to="/careers" style={{ textDecoration: "none" }}>
          <span
            style={{
              color: "#4C7EFB",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            קריירה
          </span>
        </Link>
      </div>
    </header>
  );
}