import React, { useState } from 'react';
import { ChevronLeft, Phone, CreditCard, TrendingUp } from 'lucide-react';
import loginMascot from '@/assets/login-mascot.png';

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
    <div className="min-h-screen w-full relative overflow-hidden" dir="rtl">
      {/* LAYER 1: CSS GRADIENT BACKGROUND (No PNG!) */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #E8EEF7 0%, #D4DFEF 30%, #C8D7EC 60%, #BED0EA 100%)',
        }}
      />

      {/* Decorative Chart Lines (SVG) */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-20"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
      >
        <path 
          d="M0 350 Q200 300 400 320 T800 250 T1200 180" 
          stroke="#4C7EFB" 
          strokeWidth="3" 
          fill="none"
        />
        <path 
          d="M0 380 Q300 350 500 340 T900 280 T1200 220" 
          stroke="#4C7EFB" 
          strokeWidth="2" 
          fill="none"
          opacity="0.5"
        />
      </svg>

      {/* Floating Coin (Top Right) */}
      <div 
        className="absolute z-10 animate-bounce"
        style={{ top: '20%', right: '15%', animationDuration: '3s' }}
      >
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ 
            background: 'linear-gradient(145deg, #FFD700, #FFA500)',
            border: '3px solid #FFE55C'
          }}
        >
          <span className="text-2xl">🤑</span>
        </div>
      </div>

      {/* Floating Arrow (Bottom Right) */}
      <div 
        className="absolute z-10"
        style={{ bottom: '15%', right: '10%' }}
      >
        <div 
          className="w-16 h-16 flex items-center justify-center"
          style={{ transform: 'rotate(-30deg)' }}
        >
          <TrendingUp className="w-14 h-14 text-green-400 drop-shadow-lg" strokeWidth={3} />
        </div>
      </div>

      {/* Small Moon Shape (Left Side) */}
      <div 
        className="absolute z-10"
        style={{ top: '35%', left: '8%' }}
      >
        <div 
          className="w-8 h-8 rounded-full"
          style={{ 
            background: 'linear-gradient(145deg, #6B8DD6, #4C7EFB)',
            boxShadow: '3px 3px 0 #4C7EFB'
          }}
        />
      </div>

      {/* Sparkle (Bottom Right) */}
      <div 
        className="absolute z-10"
        style={{ bottom: '10%', right: '5%' }}
      >
        <span className="text-3xl opacity-40">✦</span>
      </div>

      {/* LAYER 2: THE MAIN CARD */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4 pt-24">
        <div className="relative w-full max-w-[520px]">
          
          {/* Mascot - Positioned Above Card */}
          <div 
            className="absolute left-1/2 z-30"
            style={{ 
              transform: 'translateX(-50%)',
              top: '-100px'
            }}
          >
            <img 
              src={loginMascot} 
              alt="Stock4U Mascot" 
              className="w-36 h-auto drop-shadow-xl"
            />
          </div>

          {/* White Card */}
          <div 
            className="bg-white rounded-[32px] pt-16 pb-10 px-8 sm:px-12"
            style={{ 
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{ color: '#2D7DD2' }}
              >
                איזה כיף שחזרת!
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                הכנס פרטים ונשלח לך קוד גישה מהיר לנייד.
                <br />
                המתנות שלך מחכות.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ID Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 text-right">
                  מספר תעודת זהות
                </label>
                <div 
                  className="flex items-center h-14 px-4 rounded-xl border-2 bg-white"
                  style={{ 
                    borderColor: errors.idNumber ? '#E53E3E' : 'rgba(76,126,251,0.35)',
                  }}
                >
                  <div 
                    className="w-9 h-9 flex items-center justify-center rounded-lg ml-3"
                    style={{ backgroundColor: 'rgba(76,126,251,0.1)' }}
                  >
                    <CreditCard className="w-5 h-5" style={{ color: '#4C7EFB' }} />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={idNumber}
                    onChange={handleIdChange}
                    placeholder="הזן 9 ספרות..."
                    className="flex-1 h-full bg-transparent border-none outline-none text-sm text-gray-600 text-left"
                    style={{ direction: 'ltr' }}
                  />
                </div>
                {errors.idNumber && (
                  <p className="text-red-500 text-xs mt-1.5 text-right">{errors.idNumber}</p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 text-right">
                  מספר טלפון נייד
                </label>
                <div 
                  className="flex items-center h-14 px-4 rounded-xl border-2 bg-white"
                  style={{ 
                    borderColor: errors.phone ? '#E53E3E' : 'rgba(76,126,251,0.35)',
                  }}
                >
                  <div 
                    className="w-9 h-9 flex items-center justify-center rounded-lg ml-3"
                    style={{ backgroundColor: 'rgba(76,126,251,0.1)' }}
                  >
                    <Phone className="w-5 h-5" style={{ color: '#4C7EFB' }} />
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="050-0000000"
                    maxLength={11}
                    className="flex-1 h-full bg-transparent border-none outline-none text-sm text-gray-600 text-left"
                    style={{ direction: 'ltr' }}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1.5 text-right">{errors.phone}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="w-full h-14 flex items-center justify-center gap-2 rounded-xl text-white font-semibold text-lg transition-all mt-6"
                style={{
                  backgroundColor: isFormValid() && !isSubmitting ? '#4C7EFB' : '#A0B4D9',
                  boxShadow: isFormValid() && !isSubmitting ? '0 10px 25px rgba(76,126,251,0.35)' : 'none',
                  cursor: isFormValid() && !isSubmitting ? 'pointer' : 'not-allowed',
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>שולח...</span>
                  </>
                ) : (
                  <>
                    <ChevronLeft className="w-5 h-5" />
                    <span>שלח לי קוד ב-SMS</span>
                  </>
                )}
              </button>

              {successMessage && (
                <p className="text-center font-medium text-green-600 text-sm mt-4">
                  ✓ {successMessage}
                </p>
              )}
            </form>

            {/* Footer Link */}
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">
                נתקלת בבעיה?{' '}
                <a 
                  href="mailto:support@stock4u.co.il"
                  className="font-medium underline transition-colors"
                  style={{ color: '#4C7EFB' }}
                >
                  צור קשר עם התמיכה
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
