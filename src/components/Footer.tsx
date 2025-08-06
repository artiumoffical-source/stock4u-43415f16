import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        height: "308px",
        background: "#DBE3F3",
        position: "relative",
        direction: "rtl",
      }}
    >
      {/* Logo Section - positioned on left as per Figma design */}
      <div
        style={{
          position: "absolute",
          left: "78px",
          top: "-92px",
          width: "207px",
          height: "338px",
        }}
      >
        {/* Stock4U Text */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "282px",
            width: "207px",
            height: "56px",
            color: "#4C7EFB",
            fontFamily:
              "Holtwood One SC, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "33px",
            fontWeight: "400",
            lineHeight: "normal",
            textTransform: "uppercase",
          }}
        >
          Stock4U
        </div>

        {/* Logo Complex 3D Element */}
        <div
          style={{
            position: "absolute",
            left: "24px",
            top: "0px",
            width: "160px",
            height: "253px",
          }}
        >
          {/* Background white shape */}
          <svg
            style={{
              position: "absolute",
              left: "2px",
              top: "29px",
              width: "139px",
              height: "152px",
              fill: "white",
            }}
            viewBox="0 0 140 153"
          >
            <path
              d="M0.377141 116.586L0.377148 50.984L84.1864 0.309326L139.409 47.0859L129.093 126.049L70.6894 152.26L0.377141 116.586Z"
              fill="white"
            />
          </svg>

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
                src="https://api.builder.io/api/v1/image/assets/TEMP/ce260fd9ede1e926cc1f66f1ad0c990ef4064702?width=315"
                style={{
                  position: "absolute",
                  left: "2px",
                  top: "129px",
                  width: "158px",
                  height: "123px",
                  fill: "#FFF",
                  strokeWidth: "7.263px",
                  stroke: "#FFF",
                }}
                alt="Vector"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/78aebfd0d90189bdc28ee3d9c1322717866a52a3?width=255"
                style={{
                  position: "absolute",
                  left: "8px",
                  top: "0px",
                  width: "127px",
                  height: "178px",
                  fill: "#FFF",
                  strokeWidth: "18.289px",
                  stroke: "#FFF",
                }}
                alt="Union"
              />

              {/* White accent elements */}
              <div
                style={{
                  position: "absolute",
                  left: "62px",
                  top: "173px",
                  width: "24px",
                  height: "10px",
                  background: "#FFF",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  left: "113px",
                  top: "77px",
                  width: "24px",
                  height: "22px",
                  background: "#FFF",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  top: "73px",
                  width: "24px",
                  height: "18px",
                  background: "#FFF",
                }}
              ></div>

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

      {/* Content Sections - positioned to match Figma design */}
      <div
        style={{
          position: "absolute",
          left: "550px",
          top: "76px",
          width: "1228px",
          height: "152px",
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {/* אנחנו ברשתות */}
          <div
            style={{
              display: "flex",
              width: "281px",
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
              אנחנו ברשתות
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
              width: "281px",
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
                    d="M25.8701 9.16016C25.8701 8.71693 25.6941 8.29225 25.3827 7.98081C25.0713 7.66937 24.6466 7.49341 24.2034 7.49341H11.7967C11.3535 7.49341 10.9288 7.66937 10.6173 7.98081C10.3059 8.29225 10.1299 8.71693 10.1299 9.16016L18.0001 14.8268L25.8701 9.16016Z"
                    fill="#4C7EFB"
                  />
                  <path
                    d="M25.8701 11.8281L18.0001 17.4948L10.1299 11.8281V22.4948C10.1299 22.9381 10.3059 23.3627 10.6173 23.6742C10.9288 23.9856 11.3535 24.1616 11.7967 24.1616H24.2034C24.6466 24.1616 25.0713 23.9856 25.3827 23.6742C25.6941 23.3627 25.8701 22.9381 25.8701 22.4948V11.8281Z"
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
                  (972) 058-1234567
                </div>
                <svg
                  style={{
                    display: "flex",
                    padding: "8px 5px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                  width="31"
                  height="33"
                  viewBox="0 0 31 33"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.93424 5.0459C8.30174 4.84256 8.71341 4.73584 9.13174 4.73584C9.55008 4.73584 9.96174 4.84256 10.3292 5.0459L20.8667 10.6859C21.4042 10.9642 21.8442 11.3842 22.1375 11.8959C22.4309 12.4076 22.5659 12.9884 22.5267 13.5717L21.9434 24.4009C21.8884 25.2576 21.4942 26.0576 20.8467 26.6334C20.1992 27.2092 19.3509 27.5151 18.4934 27.4851H14.7634C14.6242 27.4851 14.4909 27.4301 14.3917 27.3309C14.2925 27.2317 14.2375 27.0984 14.2375 26.9592C14.2375 26.82 14.2925 26.6867 14.3917 26.5875C14.4909 26.4883 14.6242 26.4334 14.7634 26.4334H18.4934C18.9659 26.4476 19.4284 26.2617 19.7742 25.9184C20.12 25.575 20.3209 25.1051 20.3334 24.6334L20.9167 13.8042C20.9342 13.4751 20.8567 13.1484 20.6942 12.8634C20.5317 12.5784 20.2917 12.3476 20.0042 12.1959L9.46674 6.5559C9.30924 6.47173 9.12757 6.4434 8.95174 6.4759C8.77591 6.5084 8.61507 6.59923 8.49341 6.73423C8.37174 6.86923 8.29524 7.0409 8.27524 7.22423C8.25524 7.40756 8.29257 7.59173 8.38174 7.7509L12.1659 14.2592L8.64424 16.6834C8.51174 16.7709 8.41257 16.8976 8.35924 17.0442C8.30591 17.1909 8.30174 17.3509 8.34757 17.5001L9.92924 23.0409C9.97757 23.1917 10.0842 23.3184 10.2267 23.3959C10.3692 23.4734 10.5367 23.4967 10.6942 23.4617C10.8517 23.4267 10.9917 23.3359 11.0909 23.2059C11.19 23.0759 11.2417 22.9142 11.2375 22.7484V16.0234L15.2634 13.2567L11.5625 7.0109L20.9617 12.3851C20.8784 11.1851 20.3509 10.0642 19.4917 9.23423C18.6325 8.40423 17.5034 7.92173 16.3034 7.87757L9.13174 6.96924C9.05758 6.95923 8.98341 6.9659 8.91341 6.9884C8.84341 7.0109 8.77924 7.04923 8.72508 7.10006C8.67091 7.15089 8.62841 7.21256 8.60091 7.28173C8.57341 7.35089 8.56174 7.42589 8.56674 7.50006C8.57174 7.57423 8.59257 7.64673 8.62758 7.71256C8.66258 7.77839 8.71091 7.83589 8.76924 7.88173L7.93424 5.0459Z"
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
                  ראשון-חמישי 9:00-18:00
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <svg width="2" height="153" viewBox="0 0 2 153" fill="none">
            <path d="M0.691406 0.985107V152.844" stroke="#4C7EFB" />
          </svg>

          {/* תנאים ומדיניות */}
          <div
            style={{
              display: "flex",
              width: "281px",
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
              תנאים ומדיניות
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
                to="/privacy"
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
                to="/terms"
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
                to="/returns"
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
    </footer>
  );
}