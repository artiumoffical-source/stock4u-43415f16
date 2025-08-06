import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "75px",
        padding: "0 35px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #DDD",
        background: "#FFF",
        position: "relative",
      }}
    >
      {/* Left side - Cart and Login */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Shopping Cart */}
        <Link to="/order-summary" style={{ textDecoration: "none" }}>
          <div
            style={{
              width: "48px",
              height: "47px",
              borderRadius: "56px",
              background: "#4C7EFB",
              boxShadow: "10px 10px 0 0 rgba(0, 0, 0, 0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
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
            style={{
              display: "flex",
              width: "119px",
              height: "47px",
              padding: "14px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "50px",
              background: "#DBE3F3",
              cursor: "pointer",
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

      {/* Center - Logo */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fbd35a0518e78474da4e3ec381caabfa5%2F1980a1c23e6842f3ad4ec2fcdce81e95?format=webp&width=800"
        style={{
          height: "66px",
          width: "auto",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        alt="Stock4U Logo"
      />

      {/* Right side - Navigation - Fixed order to match Figma */}
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6147 18.2617L15.1993 14.047C16.4584 12.6648 17.1061 10.8699 17.0059 9.04073C16.9057 7.21155 16.0654 5.49097 14.6621 4.24167C13.2588 2.99237 11.4022 2.31195 9.48358 2.34385C7.56497 2.37574 5.73429 3.11746 4.37743 4.41265C3.02056 5.70784 2.24352 7.45531 2.21011 9.2867C2.17669 11.1181 2.88951 12.8903 4.1983 14.2298C5.50709 15.5693 7.30961 16.3715 9.22589 16.4671C11.1422 16.5628 13.0225 15.9445 14.4705 14.7426L18.886 18.9573C18.9837 19.0443 19.113 19.0916 19.2466 19.0894C19.3802 19.0871 19.5076 19.0355 19.6021 18.9453C19.6966 18.8551 19.7507 18.7334 19.753 18.6059C19.7554 18.4784 19.7058 18.355 19.6147 18.2617ZM3.26598 9.42203C3.26598 8.22144 3.63895 7.0478 4.33772 6.04955C5.0365 5.05129 6.0297 4.27324 7.19172 3.81379C8.35375 3.35435 9.6324 3.23413 10.866 3.46836C12.0996 3.70258 13.2327 4.28072 14.1221 5.12967C15.0115 5.97862 15.6172 7.06025 15.8625 8.23777C16.1079 9.4153 15.982 10.6358 15.5006 11.745C15.0193 12.8542 14.2042 13.8023 13.1584 14.4693C12.1126 15.1363 10.8831 15.4923 9.62535 15.4923C7.93937 15.4904 6.32302 14.8502 5.13085 13.7122C3.93868 12.5743 3.26802 11.0314 3.26598 9.42203Z"
              fill="#4C7EFB"
            />
          </svg>
          <span
            style={{
              color: "#4C7EFB",
              opacity: 0.3,
              fontSize: "18px",
              letterSpacing: "-2.34px",
            }}
          >
            ________________
          </span>
          <span
            style={{
              color: "#4C7EFB",
              fontFamily:
                "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            חיפוש
          </span>
        </div>

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
      </div>
    </header>
  );
}