import React, { useState } from 'react';
import { ChevronLeft, Phone, CreditCard } from 'lucide-react';
import loginBg from '@/assets/login-bg.png';
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
      {/* LAYER 1: BACKGROUND IMAGE (Zoomed 110% to push elements outward) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={loginBg}
          alt=""
          className="absolute w-full h-full object-cover"
          style={{ 
            transform: 'scale(1.15)',
            transformOrigin: 'center center'
          }}
        />
        {/* Semi-transparent overlay to soften background distractions */}
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* LAYER 2: THE REAL UI CARD (Solid White Shield) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-[560px]">
          
          {/* Mascot floating above */}
          <div 
            className="absolute left-1/2 z-30"
            style={{ transform: 'translateX(-50%)', top: '-90px' }}
          >
            <img 
              src={loginMascot} 
              alt="Stock4U Mascot" 
              className="w-32 h-auto drop-shadow-xl"
            />
          </div>

          {/* The White Card - Extra large to cover background card */}
          <div 
            className="bg-white rounded-[32px] pt-14 pb-10 px-8 sm:px-14"
            style={{ 
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.12)',
              minHeight: '480px'
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
                  className="flex items-center h-14 px-4 rounded-2xl border-2 bg-white"
                  style={{ 
                    borderColor: errors.idNumber ? '#E53E3E' : 'rgba(76,126,251,0.35)',
                  }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center rounded-xl ml-3"
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
                  className="flex items-center h-14 px-4 rounded-2xl border-2 bg-white"
                  style={{ 
                    borderColor: errors.phone ? '#E53E3E' : 'rgba(76,126,251,0.35)',
                  }}
                >
                  <div 
                    className="w-10 h-10 flex items-center justify-center rounded-xl ml-3"
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
                className="w-full h-14 flex items-center justify-center gap-2 rounded-2xl text-white font-semibold text-lg transition-all mt-6"
                style={{
                  backgroundColor: isFormValid() && !isSubmitting ? '#4C7EFB' : '#A0B4D9',
                  boxShadow: isFormValid() && !isSubmitting ? '0 12px 28px rgba(76,126,251,0.35)' : 'none',
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
