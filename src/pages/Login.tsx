import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import loginBg from '@/assets/login-bg.png';

export default function Login() {
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ idNumber?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateIdNumber = (value: string): string | undefined => {
    if (!value) return 'נא להזין מספר תעודת זהות';
    if (!/^\d+$/.test(value)) return 'יש להזין ספרות בלבד';
    if (value.length < 8 || value.length > 9) return 'נא להזין ת.ז. תקינה (8-9 ספרות)';
    return undefined;
  };

  const validatePhone = (value: string): string | undefined => {
    if (!value) return 'נא להזין מספר טלפון';
    const cleanPhone = value.replace(/-/g, '');
    if (!/^05\d{8}$/.test(cleanPhone)) return 'נא להזין מספר טלפון ישראלי תקין';
    return undefined;
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    return `${digits.slice(0, 3)}-${digits.slice(3, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setSuccessMessage('');
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setIdNumber(value);
    setSuccessMessage('');
    if (errors.idNumber) setErrors((prev) => ({ ...prev, idNumber: undefined }));
  };

  const isFormValid = (): boolean => {
    const cleanPhone = phone.replace(/-/g, '');
    return /^\d{8,9}$/.test(idNumber) && /^05\d{8}$/.test(cleanPhone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const idError = validateIdNumber(idNumber);
    const phoneError = validatePhone(phone);
    if (idError || phoneError) {
      setErrors({ idNumber: idError, phone: phoneError });
      return;
    }
    setIsSubmitting(true);
    setSuccessMessage('');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccessMessage('קוד נשלח (דמו)');
    setIsSubmitting(false);
  };

  return (
    <div 
      dir="rtl"
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ========== OVERSIZED WHITE SHIELD - Layer 1 ========== */}
      {/* This card is LARGER than the PNG's baked-in card to completely hide it */}
      <div 
        className="absolute rounded-[28px]"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(94vw, 620px)',
          minHeight: '600px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          zIndex: 999,
          padding: '56px 56px 48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Title */}
        <h1 
          className="text-center font-bold"
          style={{
            fontSize: 'clamp(30px, 6vw, 40px)',
            color: '#2D7DD2',
            marginBottom: '14px',
            lineHeight: 1.2,
          }}
        >
          איזה כיף שחזרת!
        </h1>

        {/* Subtitle */}
        <p 
          className="text-center"
          style={{
            fontSize: 'clamp(14px, 2.8vw, 17px)',
            color: '#6B7C93',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          הכנס פרטים ונשלח לך קוד גישה מהיר לנייד. המתנות שלך מחכות.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* ID Number Input */}
          <div className="mb-4">
            <div 
              className="flex items-center rounded-2xl"
              style={{
                height: '72px',
                border: errors.idNumber ? '2px solid #E53E3E' : '2px solid rgba(76,126,251,0.4)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                padding: '0 22px',
                direction: 'rtl',
              }}
            >
              <div className="flex items-center gap-3 flex-shrink-0">
                <div 
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'rgba(76,126,251,0.12)',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4C7EFB" strokeWidth="2"/>
                    <circle cx="8" cy="10" r="2" stroke="#4C7EFB" strokeWidth="1.5"/>
                    <path d="M5 16c0-1.5 1.5-3 3-3s3 1.5 3 3" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="14" y1="9" x2="19" y2="9" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="14" y1="13" x2="17" y2="13" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[15px] font-medium text-gray-600 whitespace-nowrap">
                  מספר תעודת זהות
                </span>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={idNumber}
                onChange={handleIdChange}
                placeholder="הזן 9 ספרות..."
                className="flex-1 h-full bg-transparent border-none outline-none text-[15px] text-gray-500 text-left"
                style={{ direction: 'ltr', paddingLeft: '8px' }}
              />
            </div>
            {errors.idNumber && (
              <p className="text-red-500 text-[13px] mt-1.5 text-right">{errors.idNumber}</p>
            )}
          </div>

          {/* Phone Input */}
          <div className="mb-6">
            <div 
              className="flex items-center rounded-2xl"
              style={{
                height: '72px',
                border: errors.phone ? '2px solid #E53E3E' : '2px solid rgba(76,126,251,0.4)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
                padding: '0 22px',
                direction: 'rtl',
              }}
            >
              <div className="flex items-center gap-3 flex-shrink-0">
                <div 
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: '42px',
                    height: '42px',
                    backgroundColor: 'rgba(76,126,251,0.12)',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#4C7EFB" strokeWidth="2"/>
                    <line x1="9" y1="18" x2="15" y2="18" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[15px] font-medium text-gray-600 whitespace-nowrap">
                  מספר טלפון נייד
                </span>
              </div>

              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="050-00000000"
                maxLength={11}
                className="flex-1 h-full bg-transparent border-none outline-none text-[15px] text-gray-500 text-left"
                style={{ direction: 'ltr', paddingLeft: '8px' }}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-[13px] mt-1.5 text-right">{errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-2xl text-white font-medium transition-all"
            style={{
              height: '68px',
              fontSize: '19px',
              backgroundColor: isFormValid() && !isSubmitting ? '#4C7EFB' : '#A0B4D9',
              boxShadow: isFormValid() && !isSubmitting ? '0 14px 28px rgba(76,126,251,0.3)' : 'none',
              cursor: isFormValid() && !isSubmitting ? 'pointer' : 'not-allowed',
              border: 'none',
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>שולח...</span>
              </>
            ) : (
              <>
                <ChevronLeft className="w-6 h-6" />
                <span>שלח לי קוד ב-SMS</span>
              </>
            )}
          </button>

          {successMessage && (
            <p className="text-center font-medium text-green-600 text-[15px] mt-4">
              ✓ {successMessage}
            </p>
          )}
        </form>

        {/* Support Link */}
        <p className="text-center mt-6 text-[14px] text-gray-500">
          נתקלת בבעיה?{' '}
          <a 
            href="mailto:support@stock4u.co.il"
            className="text-[#4C7EFB] font-medium underline"
          >
            צור קשר עם התמיכה
          </a>
        </p>
      </div>
    </div>
  );
}
