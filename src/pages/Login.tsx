import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import loginMascot from '@/assets/login-mascot.png';
import goldCoin from '@/assets/gold-coin-emoji.png';
import greenArrow from '@/assets/green-arrow-growth.png';

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
      className="min-h-screen w-full relative overflow-hidden"
      dir="rtl"
      style={{ background: 'linear-gradient(180deg, #E8EEF7 0%, #D9E3F1 100%)' }}
    >
      {/* LAYER 1: Decorative background only */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Chart zigzag lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1920 900">
          <path
            d="M0 650 L200 580 L400 620 L600 480 L800 520 L1000 400 L1200 450 L1400 350 L1600 400 L1920 350"
            fill="none"
            stroke="rgba(180,200,230,0.5)"
            strokeWidth="3"
          />
          <path
            d="M0 700 L200 630 L400 670 L600 530 L800 570 L1000 450 L1200 500 L1400 400 L1600 450 L1920 400"
            fill="none"
            stroke="rgba(180,200,230,0.3)"
            strokeWidth="2"
          />
        </svg>

        {/* Blue crescent */}
        <div 
          className="absolute"
          style={{
            width: '28px',
            height: '56px',
            background: '#7BA3D8',
            borderRadius: '50%',
            left: '18%',
            top: '38%',
            transform: 'rotate(25deg)',
            opacity: 0.7
          }}
        />

        {/* Gold coin */}
        <img 
          src={goldCoin} 
          alt="" 
          className="absolute"
          style={{
            width: '72px',
            height: '72px',
            right: 'calc(50% - 320px)',
            top: '220px',
          }}
        />

        {/* Green arrow */}
        <img 
          src={greenArrow} 
          alt="" 
          className="absolute"
          style={{
            width: '100px',
            height: '100px',
            right: 'calc(50% - 340px)',
            bottom: '140px',
            transform: 'rotate(-10deg)'
          }}
        />

        {/* Sparkle star */}
        <svg 
          className="absolute" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24"
          style={{ right: '12%', bottom: '8%' }}
        >
          <path fill="rgba(180,200,230,0.6)" d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>

        {/* Small dots */}
        <div className="absolute w-3 h-3 rounded-full" style={{ background: 'rgba(120,160,210,0.4)', right: '22%', top: '15%' }} />
        <div className="absolute w-2 h-2 rounded-full" style={{ background: 'rgba(120,160,210,0.3)', left: '25%', top: '20%' }} />
      </div>

      {/* LAYER 2: Single real UI card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div 
          className="relative bg-white"
          style={{
            width: 'min(92vw, 480px)',
            maxWidth: '480px',
            borderRadius: '28px',
            boxShadow: '0 18px 55px rgba(0,0,0,0.12)',
            padding: '44px 42px',
          }}
        >
          {/* Mascot */}
          <div 
            className="absolute left-1/2"
            style={{
              transform: 'translateX(-50%)',
              top: '-100px',
            }}
          >
            <img 
              src={loginMascot} 
              alt="Stock4U Mascot" 
              style={{
                width: '160px',
                height: '160px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
              }}
            />
          </div>

          {/* Card content */}
          <div style={{ paddingTop: '70px' }}>
            {/* Title */}
            <h1 
              className="text-center font-bold"
              style={{
                fontSize: '36px',
                color: '#1E4A8D',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              איזה כיף שחזרת!
            </h1>

            {/* Subtitle */}
            <p 
              className="text-center"
              style={{
                fontSize: '16px',
                color: '#6B7C93',
                marginBottom: '32px',
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
                  className="flex items-center"
                  style={{
                    height: '68px',
                    borderRadius: '16px',
                    border: errors.idNumber ? '2px solid #E53E3E' : '2px solid rgba(76,126,251,0.35)',
                    background: errors.idNumber ? 'rgba(229,62,62,0.05)' : 'rgba(76,126,251,0.06)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                    padding: '0 20px',
                    direction: 'rtl',
                  }}
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(76,126,251,0.12)',
                        borderRadius: '8px',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                    className="flex-1 h-full bg-transparent border-none outline-none"
                    style={{
                      fontSize: '15px',
                      color: '#2D3748',
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
                  className="flex items-center"
                  style={{
                    height: '68px',
                    borderRadius: '16px',
                    border: errors.phone ? '2px solid #E53E3E' : '2px solid rgba(76,126,251,0.35)',
                    background: errors.phone ? 'rgba(229,62,62,0.05)' : 'rgba(76,126,251,0.06)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                    padding: '0 20px',
                    direction: 'rtl',
                  }}
                >
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '36px',
                        height: '36px',
                        background: 'rgba(76,126,251,0.12)',
                        borderRadius: '8px',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                    className="flex-1 h-full bg-transparent border-none outline-none"
                    style={{
                      fontSize: '15px',
                      color: '#2D3748',
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
                className="w-full flex items-center justify-center gap-2 text-white font-medium transition-all"
                style={{
                  height: '64px',
                  borderRadius: '16px',
                  fontSize: '18px',
                  background: isFormValid() && !isSubmitting ? '#4C7EFB' : '#A0B4D9',
                  boxShadow: isFormValid() && !isSubmitting ? '0 12px 24px rgba(76,126,251,0.25)' : 'none',
                  cursor: isFormValid() && !isSubmitting ? 'pointer' : 'not-allowed',
                  border: 'none',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin" style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
                  className="text-center font-medium"
                  style={{ color: '#38A169', fontSize: '15px', marginTop: '16px' }}
                >
                  ✓ {successMessage}
                </p>
              )}
            </form>

            {/* Support Link */}
            <p 
              className="text-center"
              style={{ marginTop: '24px', fontSize: '14px', color: '#6B7C93' }}
            >
              נתקלת בבעיה?{' '}
              <a 
                href="mailto:support@stock4u.co.il"
                style={{ color: '#4C7EFB', fontWeight: 500, textDecoration: 'underline' }}
              >
                צור קשר עם התמיכה
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
