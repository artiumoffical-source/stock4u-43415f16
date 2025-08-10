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

          .kalinka-dancer svg {
            animation: kalinka-dance 2.5s ease-in-out infinite, kalinka-wiggle 1.2s ease-in-out infinite;
            transform-origin: center bottom;
          }

          .kalinka-dancer > div {
            animation: kalinka-dance 2.5s ease-in-out infinite, kalinka-wiggle 1.2s ease-in-out infinite;
            transform-origin: center bottom;
          }

          .kalinka-dancer * {
            animation-fill-mode: both;
          }
        `}
      </style>
      <footer className="relative w-full bg-[#DBE3F3] py-8 hebrew-font" dir="rtl">
        <div className="relative w-full">
          {/* Stock4U Logo and Mascot - Center Left */}
          <div className="flex items-center gap-4 absolute left-8 top-4">
            <div className="relative w-16 h-20 kalinka-dancer">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c6f4ef138fe2fcff4c861a628f2808355b08ca4e?width=247"
                className="w-full h-full object-contain"
                alt="Stock4U Mascot"
              />
            </div>
            <div className="text-[#4C7EFB] text-2xl font-bold">
              STOCK4U
            </div>
          </div>

          {/* Main Content Container */}
          <div className="max-w-6xl mx-auto px-8 pt-16">
            <div className="flex justify-between items-start gap-12">
              
              {/* Social Media Section */}
              <div className="flex flex-col items-end gap-2">
                <h3 className="text-[#4C7EFB] text-xl font-bold mb-4">אנחנו ברשתות</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4C7EFB]">פייסבוק</span>
                    <svg className="w-5 h-5 text-[#4C7EFB]" viewBox="0 0 18 18" fill="none">
                      <path d="M15.7918 1.5H3.18346C2.97682 1.5 2.77863 1.58209 2.63251 1.72821C2.48639 1.87433 2.4043 2.07252 2.4043 2.27917V14.8875C2.4043 15.0941 2.48639 15.2923 2.63251 15.4385C2.77863 15.5846 2.97682 15.6667 3.18346 15.6667H9.9693V10.1771H8.12763V8.05208H9.9693V6.45833C9.93115 6.08416 9.97532 5.70617 10.0987 5.35088C10.2221 4.99559 10.4218 4.67159 10.6836 4.40162C10.9455 4.13165 11.2633 3.92225 11.6146 3.78809C11.966 3.65392 12.3425 3.59826 12.7176 3.625C13.269 3.62119 13.82 3.64958 14.368 3.71V5.6225H13.2418C12.3493 5.6225 12.1793 6.0475 12.1793 6.66375V8.03083H14.3043L14.028 10.1558H12.1793V15.6667H15.7918C15.8941 15.6667 15.9954 15.6465 16.09 15.6074C16.1845 15.5682 16.2704 15.5108 16.3428 15.4385C16.4151 15.3661 16.4725 15.2802 16.5117 15.1857C16.5508 15.0911 16.571 14.9898 16.571 14.8875V2.27917C16.571 2.17685 16.5508 2.07553 16.5117 1.98099C16.4725 1.88646 16.4151 1.80057 16.3428 1.72821C16.2704 1.65586 16.1845 1.59847 16.09 1.55931C15.9954 1.52015 15.8941 1.5 15.7918 1.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4C7EFB]">אינסטגרם</span>
                    <svg className="w-5 h-5 text-[#4C7EFB]" viewBox="0 0 33 34" fill="none">
                      <path d="M17.5108 8.74902C18.4483 8.75152 18.9241 8.75652 19.335 8.76819L19.4966 8.77402C19.6833 8.78069 19.8675 8.78902 20.09 8.79902C20.9766 8.84069 21.5816 8.98069 22.1125 9.18652C22.6625 9.39819 23.1258 9.68486 23.5891 10.1474C24.013 10.5638 24.3409 11.0678 24.55 11.624C24.7558 12.1549 24.8958 12.7599 24.9375 13.6474C24.9475 13.869 24.9558 14.0532 24.9625 14.2407L24.9675 14.4024C24.98 14.8124 24.985 15.2882 24.9866 16.2257L24.9875 16.8474V17.939C24.9895 18.5469 24.9831 19.1547 24.9683 19.7624L24.9633 19.924C24.9566 20.1115 24.9483 20.2957 24.9383 20.5174C24.8966 21.4049 24.755 22.009 24.55 22.5407C24.3409 23.097 24.013 23.6009 23.5891 24.0174C23.1727 24.4413 22.6687 24.7692 22.1125 24.9782C21.5816 25.184 20.9766 25.324 20.09 25.3657L19.4966 25.3907L19.335 25.3957C18.9241 25.4074 18.4483 25.4132 17.5108 25.4149L16.8891 25.4157H15.7983C15.1902 25.4178 14.5821 25.4114 13.9741 25.3965L13.8125 25.3915C13.6146 25.384 13.4168 25.3754 13.2191 25.3657C12.3325 25.324 11.7275 25.184 11.1958 24.9782C10.6398 24.7691 10.1362 24.4412 9.71995 24.0174C9.29574 23.601 8.96754 23.097 8.75829 22.5407C8.55245 22.0099 8.41245 21.4049 8.37079 20.5174L8.34579 19.924L8.34162 19.7624C8.32626 19.1547 8.31931 18.5469 8.32079 17.939V16.2257C8.31848 15.6179 8.32459 15.01 8.33912 14.4024L8.34495 14.2407C8.35162 14.0532 8.35995 13.869 8.36995 13.6474C8.41162 12.7599 8.55162 12.1557 8.75745 11.624C8.9672 11.0675 9.29597 10.5636 9.72079 10.1474C10.1367 9.72365 10.6401 9.39575 11.1958 9.18652C11.7275 8.98069 12.3316 8.84069 13.2191 8.79902C13.4408 8.78902 13.6258 8.78069 13.8125 8.77402L13.9741 8.76902C14.5818 8.75422 15.1896 8.74783 15.7975 8.74986L17.5108 8.74902ZM16.6541 12.9157C15.5491 12.9157 14.4892 13.3547 13.7078 14.1361C12.9264 14.9175 12.4875 15.9773 12.4875 17.0824C12.4875 18.1874 12.9264 19.2472 13.7078 20.0286C14.4892 20.81 15.5491 21.249 16.6541 21.249C17.7592 21.249 18.819 20.81 19.6004 20.0286C20.3818 19.2472 20.8208 18.1874 20.8208 17.0824C20.8208 15.9773 20.3818 14.9175 19.6004 14.1361C18.819 13.3547 17.7592 12.9157 16.6541 12.9157ZM16.6541 14.5824C16.9824 14.5823 17.3075 14.6469 17.6109 14.7725C17.9142 14.8981 18.1898 15.0822 18.422 15.3143C18.6542 15.5464 18.8384 15.822 18.9641 16.1253C19.0898 16.4286 19.1545 16.7536 19.1545 17.0819C19.1546 17.4102 19.09 17.7353 18.9644 18.0387C18.8388 18.342 18.6547 18.6176 18.4226 18.8498C18.1905 19.082 17.9149 19.2662 17.6116 19.3919C17.3083 19.5176 16.9833 19.5823 16.655 19.5824C15.9919 19.5824 15.356 19.319 14.8872 18.8501C14.4183 18.3813 14.155 17.7454 14.155 17.0824C14.155 16.4193 14.4183 15.7834 14.8872 15.3146C15.356 14.8457 15.9919 14.5824 16.655 14.5824M21.03 11.6657C20.7537 11.6657 20.4887 11.7754 20.2934 11.9708C20.098 12.1661 19.9883 12.4311 19.9883 12.7074C19.9883 12.9836 20.098 13.2486 20.2934 13.4439C20.4887 13.6393 20.7537 13.749 21.03 13.749C21.3062 13.749 21.5712 13.6393 21.7665 13.4439C21.9619 13.2486 22.0716 12.9836 22.0716 12.7074C22.0716 12.4311 21.9619 12.1661 21.7665 11.9708C21.5712 11.7754 21.3062 11.6657 21.03 11.6657Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4C7EFB]">טיקטוק</span>
                    <svg className="w-5 h-5 text-[#4C7EFB]" viewBox="0 0 33 35" fill="none">
                      <path d="M21.2486 11.2348C20.5652 10.4543 20.1885 9.45219 20.1886 8.41479H17.0986V20.8148C17.0753 21.486 16.7921 22.1219 16.3089 22.5883C15.8257 23.0547 15.1802 23.3152 14.5086 23.3148C13.0886 23.3148 11.9086 22.1548 11.9086 20.7148C11.9086 18.9948 13.5686 17.7048 15.2786 18.2348V15.0748C11.8286 14.6148 8.80859 17.2948 8.80859 20.7148C8.80859 24.0448 11.5686 26.4148 14.4986 26.4148C17.6386 26.4148 20.1886 23.8648 20.1886 20.7148V14.4248C21.4416 15.3246 22.946 15.8074 24.4886 15.8048V12.7148C24.4886 12.7148 22.6086 12.8048 21.2486 11.2348Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="flex flex-col items-end gap-2">
                <h3 className="text-[#4C7EFB] text-xl font-bold mb-4">צרו קשר</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4C7EFB]">support@stock4u.co.il</span>
                    <svg className="w-5 h-5 text-[#4C7EFB]" viewBox="0 0 35 33" fill="none">
                      <path d="M27.9883 11.6182V21.0832C27.9883 21.8484 27.696 22.5847 27.171 23.1414C26.646 23.6982 25.9282 24.0333 25.1643 24.0782L24.9883 24.0832H10.9883C10.2231 24.0832 9.48677 23.7908 8.93002 23.2659C8.37327 22.7409 8.03817 22.0231 7.99328 21.2592L7.98828 21.0832V11.6182L17.4333 17.9152L17.5493 17.9812C17.686 18.048 17.8361 18.0827 17.9883 18.0827C18.1404 18.0827 18.2906 18.048 18.4273 17.9812L18.5433 17.9152L27.9883 11.6182Z" fill="currentColor"/>
                      <path d="M24.9886 8.08301C26.0686 8.08301 27.0156 8.65301 27.5436 9.51001L17.9886 15.88L8.43359 9.51001C8.68439 9.10283 9.02888 8.76151 9.43837 8.5145C9.84785 8.26749 10.3104 8.12195 10.7876 8.09001L10.9886 8.08301H24.9886Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4C7EFB]">03-12345678</span>
                    <svg className="w-5 h-5 text-[#4C7EFB]" viewBox="0 0 34 31" fill="none">
                      <path d="M10.2383 6.95801C10.2383 6.22866 10.528 5.52919 11.0437 5.01346C11.5595 4.49774 12.2589 4.20801 12.9883 4.20801H21.2383C21.9676 4.20801 22.6671 4.49774 23.1828 5.01346C23.6985 5.52919 23.9883 6.22866 23.9883 6.95801V23.458C23.9883 24.1874 23.6985 24.8868 23.1828 25.4026C22.6671 25.9183 21.9676 26.208 21.2383 26.208H12.9883C12.2589 26.208 11.5595 25.9183 11.0437 25.4026C10.528 24.8868 10.2383 24.1874 10.2383 23.458V6.95801ZM18.4883 22.083C18.4883 21.7183 18.3434 21.3686 18.0856 21.1107C17.8277 20.8529 17.478 20.708 17.1133 20.708C16.7486 20.708 16.3989 20.8529 16.141 21.1107C15.8831 21.3686 15.7383 21.7183 15.7383 22.083C15.7383 22.4477 15.8831 22.7974 16.141 23.0553C16.3989 23.3131 16.7486 23.458 17.1133 23.458C17.478 23.458 17.8277 23.3131 18.0856 23.0553C18.3434 22.7974 18.4883 22.4477 18.4883 22.083Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#4C7EFB]">רח' הרצל 123, תל אביב</span>
                    <svg className="w-5 h-5 text-[#4C7EFB]" viewBox="0 0 34 35" fill="none">
                      <path d="M17.1549 7.04175C14.9038 7.04175 12.7451 7.93509 11.1354 9.54477C9.52571 11.1545 8.63238 13.3131 8.63238 15.5642C8.63238 17.8153 9.52571 19.974 11.1354 21.5837L17.1549 27.6031L23.1744 21.5837C24.7841 19.974 25.6774 17.8153 25.6774 15.5642C25.6774 13.3131 24.7841 11.1545 23.1744 9.54477C21.5647 7.93509 19.406 7.04175 17.1549 7.04175Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.1548 18.8142C18.9438 18.8142 20.3923 17.3657 20.3923 15.5767C20.3923 13.7877 18.9438 12.3392 17.1548 12.3392C15.3658 12.3392 13.9173 13.7877 13.9173 15.5767C13.9173 17.3657 15.3658 18.8142 17.1548 18.8142Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Legal Section */}
              <div className="flex flex-col items-end gap-2">
                <h3 className="text-[#4C7EFB] text-xl font-bold mb-4">מידע משפטי</h3>
                <div className="flex flex-col gap-3">
                  <Link to="/privacy" className="text-[#4C7EFB] hover:underline">מדיניות פרטיות</Link>
                  <Link to="/terms" className="text-[#4C7EFB] hover:underline">תנאי שימוש</Link>
                  <Link to="/accessibility" className="text-[#4C7EFB] hover:underline">הצהרת נגישות</Link>
                </div>
              </div>

              {/* Pages Section */}
              <div className="flex flex-col items-end gap-2">
                <h3 className="text-[#4C7EFB] text-xl font-bold mb-4">עמודים נוספים</h3>
                <div className="flex flex-col gap-3">
                  <Link to="/about" className="text-[#4C7EFB] hover:underline">אודות</Link>
                  <Link to="/careers" className="text-[#4C7EFB] hover:underline">קריירה</Link>
                  <Link to="/" className="text-[#4C7EFB] hover:underline">מתנות מניות</Link>
                </div>
              </div>
            </div>
            
            {/* Bottom Copyright */}
            <div className="mt-8 pt-4 border-t border-[#4C7EFB]/20 text-center">
              <p className="text-[#4C7EFB]/70 text-sm">
                © 2024 Stock4U. כל הזכויות שמורות.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}