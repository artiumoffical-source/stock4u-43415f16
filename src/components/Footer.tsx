import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>
        {`
          @keyframes kalinka-dance {
            0%, 20% {
              transform: translateY(0px) scaleY(1);
            }
            5% {
              transform: translateY(-8px) scaleY(1.02);
            }
            10% {
              transform: translateY(-12px) scaleY(1.04);
            }
            15% {
              transform: translateY(-6px) scaleY(1.01);
            }
            25%, 45% {
              transform: translateY(-2px) scaleY(1.005);
            }
            30% {
              transform: translateY(-10px) scaleY(1.03);
            }
            35% {
              transform: translateY(-15px) scaleY(1.05);
            }
            40% {
              transform: translateY(-8px) scaleY(1.02);
            }
            50%, 70% {
              transform: translateY(-1px) scaleY(1.002);
            }
            55% {
              transform: translateY(-12px) scaleY(1.04);
            }
            60% {
              transform: translateY(-18px) scaleY(1.06);
            }
            65% {
              transform: translateY(-10px) scaleY(1.03);
            }
            75%, 100% {
              transform: translateY(0px) scaleY(1);
            }
            80% {
              transform: translateY(-6px) scaleY(1.01);
            }
            85% {
              transform: translateY(-3px) scaleY(1.005);
            }
            90% {
              transform: translateY(-1px) scaleY(1.002);
            }
          }

          @keyframes kalinka-wiggle {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(-2deg);
            }
            75% {
              transform: rotate(2deg);
            }
          }

          .kalinka-dancer {
            animation: kalinka-dance 2.5s ease-in-out infinite, kalinka-wiggle 1.2s ease-in-out infinite;
            transform-origin: center bottom;
          }

          .kalinka-dancer:hover {
            animation-duration: 1.2s, 0.8s;
            animation-timing-function: ease-out, ease-in-out;
          }

          .kalinka-dancer img:last-child {
            animation: kalinka-dance 2.5s ease-in-out infinite;
            animation-delay: 0.1s;
            transform-origin: center bottom;
          }

          /* Sync the white background with the dance */
          .kalinka-dancer svg {
            animation: kalinka-dance 2.5s ease-in-out infinite, kalinka-wiggle 1.2s ease-in-out infinite;
            transform-origin: center bottom;
          }

          .kalinka-dancer > div {
            animation: kalinka-dance 2.5s ease-in-out infinite, kalinka-wiggle 1.2s ease-in-out infinite;
            transform-origin: center bottom;
          }

          /* Make sure all nested elements dance together */
          .kalinka-dancer * {
            animation-fill-mode: both;
          }
        `}
      </style>
    <footer
      className="w-full bg-[#DBE3F3] relative overflow-visible z-[1] border-none outline-none"
      style={{
        height: "auto",
        minHeight: "250px",
        direction: "rtl",
        marginTop: "40px",
        paddingBottom: "40px",
      }}
    >
      {/* Logo Section - Responsive positioning */}
      <div
        className="absolute z-10"
        style={{
          left: "max(10px, 2vw)",
          top: "-40px",
          width: "min(207px, 35vw)",
          height: "auto",
          minHeight: "200px",
        }}
      >
        {/* Stock4U Logo - Responsive centered below dancing mascot */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "min(280px, 70vw)",
            transform: "translateX(-50%)",
            width: "auto",
            height: "auto",
            color: "#4C7EFB",
            fontFamily:
              "Holtwood One SC, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "clamp(20px, 5vw, 33px)",
            fontWeight: "900",
            lineHeight: "normal",
            textTransform: "uppercase",
            textAlign: "center",
            whiteSpace: "nowrap",
            textShadow: "2px 2px 4px rgba(76, 126, 251, 0.3)",
            letterSpacing: "1px",
          }}
        >
          Stock4U
        </div>

        {/* Logo Complex 3D Element with Kalinka Dance Animation - Responsive */}
        <div
          className="kalinka-dancer"
          style={{
            position: "absolute",
            left: "min(24px, 3vw)",
            top: "0px",
            width: "min(160px, 25vw)",
            height: "auto",
            aspectRatio: "160/253",
          }}
        >

          {/* Main logo structure with drop shadows */}
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              width: "160px",
              height: "253px",
              filter: "drop-shadow(3.658px 3.658px 0 rgba(0, 0, 0, 0.10))",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "0px",
                width: "160px",
                height: "253px",
                filter: "drop-shadow(7.945px 6.179px 0 rgba(0, 0, 0, 0.15))",
              }}
            >


              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/f969c07e858b8f0f5fa3c353bca4357f94d553ca?width=315"
                style={{
                  position: "absolute",
                  left: "2px",
                  top: "129px",
                  width: "158px",
                  height: "123px",
                }}
                alt="Group 108277"
              />
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/85f6ee2d3f5933c63581e107b8a0cad1791e8911?width=247"
              style={{
                position: "absolute",
                left: "9px",
                top: "0px",
                width: "124px",
                height: "173px",
              }}
              alt="Group 108355"
            />
          </div>
        </div>
      </div>

      {/* Content Sections - Mobile responsive layout */}
      <div
        className="mobile-container"
        style={{
          position: "relative",
          left: "auto",
          top: "auto",
          transform: "none",
          width: "100%",
          maxWidth: "1200px",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "200px",
          padding: "0 20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", justifyContent: "center", width: "100%" }}>
          
          {/* Mobile responsive wrapper */}
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "20px", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
          {/* אנחנו ברשתות - Mobile responsive */}
          <div
            style={{
              display: "flex",
              width: "min(250px, 100%)",
              maxWidth: "300px",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
              textAlign: "center",
              margin: "0 10px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#4C7EFB",
                textAlign: "center",
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              אנחנו ברשתות
            </div>
            <div
              style={{
                display: "flex",
                height: "105px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    color: "#4C7EFB",
                    textAlign: "center",
                    fontFamily:
                      "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  טיקטוק
                </div>
                <svg
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  width="33"
                  height="35"
                  viewBox="0 0 33 35"
                  fill="none"
                >
                  <path
                    d="M21.2486 11.2348C20.5652 10.4543 20.1885 9.45219 20.1886 8.41479H17.0986V20.8148C17.0753 21.486 16.7921 22.1219 16.3089 22.5883C15.8257 23.0547 15.1802 23.3152 14.5086 23.3148C13.0886 23.3148 11.9086 22.1548 11.9086 20.7148C11.9086 18.9948 13.5686 17.7048 15.2786 18.2348V15.0748C11.8286 14.6148 8.80859 17.2948 8.80859 20.7148C8.80859 24.0448 11.5686 26.4148 14.4986 26.4148C17.6386 26.4148 20.1886 23.8648 20.1886 20.7148V14.4248C21.4416 15.3246 22.946 15.8074 24.4886 15.8048V12.7148C24.4886 12.7148 22.6086 12.8048 21.2486 11.2348Z"
                    fill="#4C7EFB"
                  />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    color: "#4C7EFB",
                    textAlign: "center",
                    fontFamily:
                      "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  אינסטגרם
                </div>
                <svg
                  style={{
                    display: "flex",
                    padding: "8px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                  width="34"
                  height="33"
                  viewBox="0 0 34 33"
                  fill="none"
                >
                  <path
                    d="M18.0108 8.08124C18.9483 8.08374 19.4241 8.08874 19.835 8.1004L19.9966 8.10624C20.1833 8.1129 20.3675 8.12124 20.59 8.13124C21.4766 8.1729 22.0816 8.3129 22.6125 8.51874C23.1625 8.7304 23.6258 9.01707 24.0891 9.47957C24.513 9.89601 24.8409 10.4 25.05 10.9562C25.2558 11.4871 25.3958 12.0921 25.4375 12.9796C25.4475 13.2012 25.4558 13.3854 25.4625 13.5729L25.4675 13.7346C25.48 14.1446 25.485 14.6204 25.4866 15.5579L25.4875 16.1796V17.2712C25.4895 17.8791 25.4831 18.4869 25.4683 19.0946L25.4633 19.2562C25.4566 19.4437 25.4483 19.6279 25.4383 19.8496C25.3966 20.7371 25.255 21.3412 25.05 21.8729C24.8409 22.4292 24.513 22.9331 24.0891 23.3496C23.6727 23.7735 23.1687 24.1014 22.6125 24.3104C22.0816 24.5162 21.4766 24.6562 20.59 24.6979L19.9966 24.7229L19.835 24.7279C19.4241 24.7396 18.9483 24.7454 18.0108 24.7471L17.3891 24.7479H16.2983C15.6902 24.75 15.0821 24.7437 14.4741 24.7287L14.3125 24.7237C14.1146 24.7162 13.9168 24.7076 13.7191 24.6979C12.8325 24.6562 12.2275 24.5162 11.6958 24.3104C11.1398 24.1013 10.6362 23.7734 10.22 23.3496C9.79574 22.9332 9.46754 22.4293 9.25829 21.8729C9.05245 21.3421 8.91245 20.7371 8.87079 19.8496L8.84579 19.2562L8.84162 19.0946C8.82626 18.4869 8.81931 17.8791 8.82079 17.2712V15.5579C8.81848 14.9501 8.82459 14.3422 8.83912 13.7346L8.84495 13.5729C8.85162 13.3854 8.85995 13.2012 8.86995 12.9796C8.91162 12.0921 9.05162 11.4879 9.25745 10.9562C9.4672 10.3997 9.79597 9.89577 10.2208 9.47957C10.6367 9.05586 11.1401 8.72797 11.6958 8.51874C12.2275 8.3129 12.8316 8.1729 13.7191 8.13124C13.9408 8.12124 14.1258 8.1129 14.3125 8.10624L14.4741 8.10124C15.0818 8.08643 15.6896 8.08004 16.2975 8.08207L18.0108 8.08124ZM17.1541 12.2479C16.0491 12.2479 14.9892 12.6869 14.2078 13.4683C13.4264 14.2497 12.9875 15.3095 12.9875 16.4146C12.9875 17.5196 13.4264 18.5794 14.2078 19.3608C14.9892 20.1423 16.0491 20.5812 17.1541 20.5812C18.2592 20.5812 19.319 20.1423 20.1004 19.3608C20.8818 18.5794 21.3208 17.5196 21.3208 16.4146C21.3208 15.3095 20.8818 14.2497 20.1004 13.4683C19.319 12.6869 18.2592 12.2479 17.1541 12.2479ZM17.1541 13.9146C17.4824 13.9145 17.8075 13.9791 18.1109 14.1047C18.4142 14.2303 18.6898 14.4144 18.922 14.6465C19.1542 14.8786 19.3384 15.1542 19.4641 15.4575C19.5898 15.7608 19.6545 16.0858 19.6545 16.4142C19.6546 16.7425 19.59 17.0676 19.4644 17.3709C19.3388 17.6742 19.1547 17.9499 18.9226 18.182C18.6905 18.4142 18.4149 18.5984 18.1116 18.7241C17.8083 18.8498 17.4833 18.9145 17.155 18.9146C16.4919 18.9146 15.856 18.6512 15.3872 18.1823C14.9183 17.7135 14.655 17.0776 14.655 16.4146C14.655 15.7515 14.9183 15.1156 15.3872 14.6468C15.856 14.178 16.4919 13.9146 17.155 13.9146M21.53 10.9979C21.2537 10.9979 20.9887 11.1077 20.7934 11.303C20.598 11.4984 20.4883 11.7633 20.4883 12.0396C20.4883 12.3158 20.598 12.5808 20.7934 12.7761C20.9887 12.9715 21.2537 13.0812 21.53 13.0812C21.8062 13.0812 22.0712 12.9715 22.2665 12.7761C22.4619 12.5808 22.5716 12.3158 22.5716 12.0396C22.5716 11.7633 22.4619 11.4984 22.2665 11.303C22.0712 11.1077 21.8062 10.9979 21.53 10.9979Z"
                    fill="#4C7EFB"
                  />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "stretch",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    color: "#4C7EFB",
                    textAlign: "center",
                    fontFamily:
                      "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  פייסבוק
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "8px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M15.2918 1.83148H2.68346C2.47682 1.83148 2.27863 1.91357 2.13251 2.05969C1.98639 2.20582 1.9043 2.404 1.9043 2.61065V15.219C1.9043 15.4256 1.98639 15.6238 2.13251 15.7699C2.27863 15.9161 2.47682 15.9981 2.68346 15.9981H9.4693V10.5086H7.62763V8.38357H9.4693V6.78982C9.43115 6.41564 9.47532 6.03766 9.59872 5.68236C9.72212 5.32707 9.92176 5.00308 10.1836 4.73311C10.4455 4.46314 10.7633 4.25373 11.1146 4.11957C11.466 3.98541 11.8425 3.92974 12.2176 3.95648C12.769 3.95268 13.32 3.98106 13.868 4.04148V5.95398H12.7418C11.8493 5.95398 11.6793 6.37898 11.6793 6.99523V8.36232H13.8043L13.528 10.4873H11.6793V15.9981H15.2918C15.3941 15.9981 15.4954 15.978 15.59 15.9388C15.6845 15.8997 15.7704 15.8423 15.8428 15.7699C15.9151 15.6976 15.9725 15.6117 16.0117 15.5172C16.0508 15.4226 16.071 15.3213 16.071 15.219V2.61065C16.071 2.50833 16.0508 2.40701 16.0117 2.31247C15.9725 2.21794 15.9151 2.13205 15.8428 2.05969C15.7704 1.98734 15.6845 1.92995 15.59 1.89079C15.4954 1.85164 15.3941 1.83148 15.2918 1.83148Z"
                      fill="#4C7EFB"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <svg width="2" height="153" viewBox="0 0 2 153" fill="none">
            <path d="M1.48828 0.985107V152.844" stroke="#4C7EFB" />
          </svg>

          {/* צרו קשר */}
          <div
            style={{
              display: "flex",
              width: "250px",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#4C7EFB",
                textAlign: "center",
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              צרו קשר
            </div>
            <div
              style={{
                display: "flex",
                height: "105px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                alignSelf: "stretch",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    color: "#4C7EFB",
                    textAlign: "right",
                    fontFamily:
                      "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  support@stock4u.co.il
                </div>
                <svg
                  style={{
                    display: "flex",
                    padding: "8px 7px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                  width="35"
                  height="33"
                  viewBox="0 0 35 33"
                  fill="none"
                >
                  <path
                    d="M27.4883 11.9498V21.4148C27.4883 22.18 27.196 22.9163 26.671 23.473C26.146 24.0298 25.4282 24.3649 24.6643 24.4098L24.4883 24.4148H10.4883C9.72307 24.4148 8.98677 24.1224 8.43002 23.5975C7.87327 23.0725 7.53817 22.3547 7.49328 21.5908L7.48828 21.4148V11.9498L16.9333 18.2468L17.0493 18.3128C17.186 18.3796 17.3361 18.4143 17.4883 18.4143C17.6404 18.4143 17.7906 18.3796 17.9273 18.3128L18.0433 18.2468L27.4883 11.9498Z"
                    fill="#4C7EFB"
                  />
                  <path
                    d="M24.4886 8.41479C25.5686 8.41479 26.5156 8.98479 27.0436 9.84179L17.4886 16.2118L7.93359 9.84179C8.18439 9.43462 8.52888 9.0933 8.93837 8.84628C9.34785 8.59927 9.81045 8.45373 10.2876 8.42179L10.4886 8.41479H24.4886Z"
                    fill="#4C7EFB"
                  />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "3px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    color: "#4C7EFB",
                    textAlign: "right",
                    fontFamily:
                      "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  03-12345678
                </div>
                <svg
                  style={{
                    display: "flex",
                    padding: "4px 10px",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  width="35"
                  height="31"
                  viewBox="0 0 35 31"
                  fill="none"
                >
                  <path
                    d="M10.7383 7.28979C10.7383 6.56045 11.028 5.86098 11.5437 5.34525C12.0595 4.82953 12.7589 4.53979 13.4883 4.53979H21.7383C22.4676 4.53979 23.1671 4.82953 23.6828 5.34525C24.1985 5.86098 24.4883 6.56045 24.4883 7.28979V23.7898C24.4883 24.5191 24.1985 25.2186 23.6828 25.7343C23.1671 26.2501 22.4676 26.5398 21.7383 26.5398H13.4883C12.7589 26.5398 12.0595 26.2501 11.5437 25.7343C11.028 25.2186 10.7383 24.5191 10.7383 23.7898V7.28979ZM18.9883 22.4148C18.9883 22.0501 18.8434 21.7004 18.5856 21.4425C18.3277 21.1847 17.978 21.0398 17.6133 21.0398C17.2486 21.0398 16.8989 21.1847 16.641 21.4425C16.3831 21.7004 16.2383 22.0501 16.2383 22.4148C16.2383 22.7795 16.3831 23.1292 16.641 23.3871C16.8989 23.6449 17.2486 23.7898 17.6133 23.7898C17.978 23.7898 18.3277 23.6449 18.5856 23.3871C18.8434 23.1292 18.9883 22.7795 18.9883 22.4148Z"
                    fill="#4C7EFB"
                  />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  alignSelf: "stretch",
                }}
              >
                <div
                  style={{
                    color: "#4C7EFB",
                    textAlign: "right",
                    fontFamily:
                      "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  כניסת בתי עסק - שותפים
                </div>
                <svg
                  style={{
                    display: "flex",
                    padding: "8px",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  width="37"
                  height="38"
                  viewBox="0 0 37 38"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.5403 8.66479H18.4363C17.5373 8.66479 16.7883 8.66479 16.1943 8.74479C15.5663 8.82879 14.9993 9.01479 14.5443 9.46979C14.0883 9.92579 13.9023 10.4928 13.8183 11.1198C13.7383 11.7148 13.7383 12.4648 13.7383 13.3628V13.4408C11.7173 13.5068 10.5033 13.7428 9.66028 14.5868C8.48828 15.7578 8.48828 17.6438 8.48828 21.4148C8.48828 25.1858 8.48828 27.0718 9.66028 28.2428C10.8323 29.4138 12.7173 29.4148 16.4883 29.4148H20.4883C24.2593 29.4148 26.1453 29.4148 27.3163 28.2428C28.4873 27.0708 28.4883 25.1858 28.4883 21.4148C28.4883 17.6438 28.4883 15.7578 27.3163 14.5868C26.4733 13.7428 25.2593 13.5068 23.2383 13.4408V13.3628C23.2383 12.4648 23.2383 11.7148 23.1583 11.1208C23.0743 10.4928 22.8883 9.92579 22.4323 9.47079C21.9773 9.01479 21.4103 8.82879 20.7823 8.74479C20.1883 8.66479 19.4383 8.66479 18.5403 8.66479Z"
                    fill="#4C7EFB"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Separator */}
          <svg width="2" height="153" viewBox="0 0 2 153" fill="none">
            <path d="M1.48828 0.985107V152.844" stroke="#4C7EFB" />
          </svg>

          {/* מידע משפטי */}
          <div
            style={{
              display: "flex",
              width: "280px",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#4C7EFB",
                textAlign: "right",
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              מידע משפטי
            </div>
            <div
              style={{
                display: "flex",
                height: "105px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                alignSelf: "stretch",
              }}
            >
              <Link
                to="/"
                style={{
                  alignSelf: "stretch",
                  color: "#4C7EFB",
                  textAlign: "right",
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  textDecoration: "none",
                }}
              >
                תנאי שימוש
              </Link>
              <Link
                to="/"
                style={{
                  alignSelf: "stretch",
                  color: "#4C7EFB",
                  textAlign: "right",
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  textDecoration: "none",
                }}
              >
                מדיניות פרטיות
              </Link>
              <Link
                to="/"
                style={{
                  alignSelf: "stretch",
                  color: "#4C7EFB",
                  textAlign: "right",
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  textDecoration: "none",
                }}
              >
                מדיניות החזרים
              </Link>
            </div>
          </div>

          {/* Separator */}
          <svg width="2" height="153" viewBox="0 0 2 153" fill="none">
            <path d="M1 0.985107V152.844" stroke="#4C7EFB" />
          </svg>

          {/* עמודים נוספים */}
          <div
            style={{
              display: "flex",
              width: "280px",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "20px",
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                color: "#4C7EFB",
                textAlign: "right",
                fontFamily:
                  "Greycliff Hebrew CF, -apple-system, Roboto, Helvetica, sans-serif",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "normal",
              }}
            >
              עמודים נוספים
            </div>
            <div
              style={{
                display: "flex",
                height: "105px",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                alignSelf: "stretch",
              }}
            >
              <Link
                to="/about"
                style={{
                  alignSelf: "stretch",
                  color: "#4C7EFB",
                  textAlign: "right",
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  textDecoration: "none",
                }}
              >
                אודות
              </Link>
              <Link
                to="/careers"
                style={{
                  alignSelf: "stretch",
                  color: "#4C7EFB",
                  textAlign: "right",
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  textDecoration: "none",
                }}
              >
                קריירה
              </Link>
              <Link
                to="/"
                style={{
                  alignSelf: "stretch",
                  color: "#4C7EFB",
                  textAlign: "right",
                  fontFamily:
                    "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "18px",
                  fontWeight: "400",
                  lineHeight: "normal",
                  textDecoration: "none",
                }}
              >
                שאלות תשובות
              </Link>
            </div>
          </div>

          {/* Final Separator */}
          <svg width="2" height="153" viewBox="0 0 2 153" fill="none">
            <path d="M0.511719 0.985107V152.844" stroke="#4C7EFB" />
          </svg>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}