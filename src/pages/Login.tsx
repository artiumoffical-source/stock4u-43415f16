import { useState } from 'react';
import { IdCard, Smartphone, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setIdNumber(value);
    setSuccessMessage('');
    if (errors.idNumber) {
      setErrors((prev) => ({ ...prev, idNumber: undefined }));
    }
  };

  const isFormValid = (): boolean => {
    const cleanPhone = phone.replace(/-/g, '');
    const idValid = /^\d{8,9}$/.test(idNumber);
    const phoneValid = /^05\d{8}$/.test(cleanPhone);
    return idValid && phoneValid;
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
    
    // Simulate 1.5s loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuccessMessage('קוד נשלח (דמו)');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(210 50% 97%) 0%, hsl(210 55% 94%) 100%)',
        }}
      />
      
      {/* Zigzag chart pattern */}
      <svg 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <path
          d="M0 550 L150 480 L300 520 L450 380 L600 420 L750 320 L900 360 L1050 280 L1200 320"
          fill="none"
          stroke="hsl(210 50% 85%)"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M0 580 L150 510 L300 550 L450 410 L600 450 L750 350 L900 390 L1050 310 L1200 350"
          fill="none"
          stroke="hsl(210 50% 88%)"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>

      {/* Gold coin - right side of card */}
      <img 
        src={goldCoin} 
        alt="" 
        className="absolute w-14 h-14 md:w-18 md:h-18 z-10 hidden md:block"
        style={{ 
          top: '26%',
          right: 'calc(50% - 300px)',
        }}
      />
      
      {/* Green arrow - bottom right */}
      <img 
        src={greenArrow} 
        alt="" 
        className="absolute w-20 h-20 md:w-28 md:h-28 z-10 hidden md:block"
        style={{ 
          bottom: '16%',
          right: 'calc(50% - 320px)',
          transform: 'rotate(-15deg)'
        }}
      />
      
      {/* Blue crescent shape - left side */}
      <div 
        className="absolute w-7 h-12 md:w-9 md:h-16 rounded-full z-10 hidden md:block"
        style={{
          background: 'hsl(210 55% 70%)',
          left: 'calc(50% + 260px)',
          top: '36%',
          transform: 'rotate(25deg)',
          opacity: 0.6
        }}
      />
      
      {/* Small decorative dots */}
      <div className="absolute w-2 h-2 rounded-full hidden md:block" style={{ background: 'hsl(210 50% 80%)', left: 'calc(50% + 200px)', top: '20%' }} />
      <div className="absolute w-1.5 h-1.5 rounded-full hidden md:block" style={{ background: 'hsl(210 50% 75%)', right: 'calc(50% + 200px)', top: '16%' }} />
      <div className="absolute w-2.5 h-2.5 rounded-full hidden md:block" style={{ background: 'hsl(210 50% 78%)', left: 'calc(50% + 280px)', bottom: '28%' }} />
      
      {/* Sparkle star - bottom right */}
      <svg 
        className="absolute z-10 hidden md:block" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
        style={{ bottom: '10%', right: 'calc(50% - 360px)' }}
      >
        <path fill="hsl(210 45% 78%)" d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
      </svg>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div 
            className="bg-white rounded-[2rem] p-7 md:p-9 relative"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02)',
            }}
          >
            {/* Mascot */}
            <div className="absolute -top-16 md:-top-20 left-1/2 transform -translate-x-1/2">
              <img 
                src={loginMascot} 
                alt="Stock4U Mascot" 
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
              />
            </div>

            {/* Content */}
            <div className="pt-10 md:pt-14">
              {/* Headline */}
              <h1 
                className="text-2xl md:text-3xl font-bold text-center mb-2"
                style={{ color: 'hsl(210 70% 35%)' }}
              >
                איזה כיף שחזרת!
              </h1>
              
              {/* Subtitle */}
              <p className="text-center text-gray-500 text-sm mb-6 leading-relaxed px-2">
                הכנס פרטים ונשלח לך קוד גישה מהיר לנייד. המתנות שלך מחכות.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ID Number Field */}
                <div>
                  <div 
                    className={`rounded-xl overflow-hidden transition-all ${
                      errors.idNumber 
                        ? 'ring-2 ring-red-300' 
                        : 'ring-1 ring-blue-200'
                    }`}
                    style={{ 
                      background: errors.idNumber ? 'hsl(0 80% 97%)' : 'hsl(210 60% 97%)',
                    }}
                  >
                    {/* Top row - icon + label */}
                    <div 
                      className="flex items-center gap-2 px-4 pt-3 pb-1"
                      style={{ borderBottom: '1px solid hsl(210 50% 92%)' }}
                    >
                      <IdCard className="w-4 h-4" style={{ color: 'hsl(210 50% 60%)' }} />
                      <span className="text-sm font-medium" style={{ color: 'hsl(210 30% 40%)' }}>
                        מספר תעודת זהות
                      </span>
                    </div>
                    
                    {/* Bottom row - input */}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={idNumber}
                      onChange={handleIdChange}
                      placeholder="הזן 9 ספרות..."
                      className="w-full px-4 py-3 bg-transparent border-none outline-none text-right text-gray-700 placeholder:text-gray-400"
                      dir="rtl"
                    />
                  </div>
                  {errors.idNumber && (
                    <p className="text-red-500 text-xs mt-1.5 text-right">{errors.idNumber}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <div 
                    className={`rounded-xl overflow-hidden transition-all ${
                      errors.phone 
                        ? 'ring-2 ring-red-300' 
                        : 'ring-1 ring-blue-200'
                    }`}
                    style={{ 
                      background: errors.phone ? 'hsl(0 80% 97%)' : 'hsl(210 60% 97%)',
                    }}
                  >
                    {/* Top row - icon + label */}
                    <div 
                      className="flex items-center gap-2 px-4 pt-3 pb-1"
                      style={{ borderBottom: '1px solid hsl(210 50% 92%)' }}
                    >
                      <Smartphone className="w-4 h-4" style={{ color: 'hsl(210 50% 60%)' }} />
                      <span className="text-sm font-medium" style={{ color: 'hsl(210 30% 40%)' }}>
                        מספר טלפון נייד
                      </span>
                    </div>
                    
                    {/* Bottom row - input */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="050-0000000"
                      maxLength={11}
                      className="w-full px-4 py-3 bg-transparent border-none outline-none text-right text-gray-700 placeholder:text-gray-400"
                      dir="rtl"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 text-right">{errors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full h-12 mt-3 text-white font-medium rounded-full text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    background: isFormValid() && !isSubmitting ? 'hsl(220 75% 55%)' : 'hsl(220 30% 70%)',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      שלח לי קוד ב-SMS
                      <ChevronLeft className="w-5 h-5" />
                    </span>
                  )}
                </Button>

                {/* Success Message - Inline */}
                {successMessage && (
                  <p className="text-center text-green-600 text-sm font-medium mt-2">
                    ✓ {successMessage}
                  </p>
                )}
              </form>

              {/* Support Link */}
              <p className="text-center mt-5 text-sm text-gray-500">
                נתקלת בבעיה?{' '}
                <a 
                  href="mailto:support@stock4u.co.il" 
                  className="hover:underline font-medium"
                  style={{ color: 'hsl(220 70% 50%)' }}
                >
                  צור קשר עם התמיכה
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
