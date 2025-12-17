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
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        /* Background layer - login-bg.png */
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        /* Center-Anchor using grid */
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
      }}
    >
      {/* ========== SINGLE SOLID WHITE CARD ========== */}
      {/* This card is large enough to physically block the PNG's baked-in UI */}
      <div 
        style={{
          position: 'relative',
          zIndex: 50,
          width: 'min(92vw, 580px)',
          minHeight: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          boxShadow: '0 18px 55px rgba(0,0,0,0.12)',
          padding: '48px 52px',
        }}
      >
        {/* Title */}
        <h1 
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '38px',
            color: '#2D7DD2',
            marginBottom: '12px',
            lineHeight: 1.2,
            marginTop: '20px',
          }}
        >
          איזה כיף שחזרת!
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            textAlign: 'center',
            fontSize: '16px',
            color: '#6B7C93',
            marginBottom: '36px',
            lineHeight: 1.5,
          }}
        >
          הכנס פרטים ונשלח לך קוד גישה מהיר לנייד. המתנות שלך מחכות.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* ID Number Input */}
          <div style={{ marginBottom: '16px' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '68px',
                borderRadius: '16px',
                border: errors.idNumber ? '2px solid #E53E3E' : '2px solid rgba(76,126,251,0.35)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                padding: '0 20px',
                direction: 'rtl',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    backgroundColor: 'rgba(76,126,251,0.10)',
                    borderRadius: '10px',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4C7EFB" strokeWidth="2"/>
                    <circle cx="8" cy="10" r="2" stroke="#4C7EFB" strokeWidth="1.5"/>
                    <path d="M5 16c0-1.5 1.5-3 3-3s3 1.5 3 3" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="14" y1="9" x2="19" y2="9" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="14" y1="13" x2="17" y2="13" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#4A5568', whiteSpace: 'nowrap' }}>
                  מספר תעודת זהות
                </span>
              </div>

              <input
                type="text"
                inputMode="numeric"
                value={idNumber}
                onChange={handleIdChange}
                placeholder="הזן 9 ספרות..."
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: '#718096',
                  textAlign: 'left',
                  direction: 'ltr',
                  paddingLeft: '8px',
                }}
              />
            </div>
            {errors.idNumber && (
              <p style={{ color: '#E53E3E', fontSize: '13px', marginTop: '6px', textAlign: 'right' }}>
                {errors.idNumber}
              </p>
            )}
          </div>

          {/* Phone Input */}
          <div style={{ marginBottom: '24px' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '68px',
                borderRadius: '16px',
                border: errors.phone ? '2px solid #E53E3E' : '2px solid rgba(76,126,251,0.35)',
                backgroundColor: '#FFFFFF',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                padding: '0 20px',
                direction: 'rtl',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    backgroundColor: 'rgba(76,126,251,0.10)',
                    borderRadius: '10px',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#4C7EFB" strokeWidth="2"/>
                    <line x1="9" y1="18" x2="15" y2="18" stroke="#4C7EFB" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '15px', fontWeight: 500, color: '#4A5568', whiteSpace: 'nowrap' }}>
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
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '15px',
                  color: '#718096',
                  textAlign: 'left',
                  direction: 'ltr',
                  paddingLeft: '8px',
                }}
              />
            </div>
            {errors.phone && (
              <p style={{ color: '#E53E3E', fontSize: '13px', marginTop: '6px', textAlign: 'right' }}>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '64px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 500,
              color: '#FFFFFF',
              backgroundColor: isFormValid() && !isSubmitting ? '#4C7EFB' : '#A0B4D9',
              boxShadow: isFormValid() && !isSubmitting ? '0 12px 24px rgba(76,126,251,0.25)' : 'none',
              cursor: isFormValid() && !isSubmitting ? 'pointer' : 'not-allowed',
              border: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {isSubmitting ? (
              <>
                <svg 
                  style={{ width: '22px', height: '22px', animation: 'spin 1s linear infinite' }} 
                  viewBox="0 0 24 24"
                >
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>שולח...</span>
              </>
            ) : (
              <>
                <ChevronLeft style={{ width: '22px', height: '22px' }} />
                <span>שלח לי קוד ב-SMS</span>
              </>
            )}
          </button>

          {successMessage && (
            <p 
              style={{ 
                textAlign: 'center', 
                fontWeight: 500, 
                color: '#38A169', 
                fontSize: '15px', 
                marginTop: '16px' 
              }}
            >
              ✓ {successMessage}
            </p>
          )}
        </form>

        {/* Support Link */}
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6B7C93' }}>
          נתקלת בבעיה?{' '}
          <a 
            href="mailto:support@stock4u.co.il"
            style={{ color: '#4C7EFB', fontWeight: 500, textDecoration: 'underline' }}
          >
            צור קשר עם התמיכה
          </a>
        </p>
      </div>

      {/* Keyframes for spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
