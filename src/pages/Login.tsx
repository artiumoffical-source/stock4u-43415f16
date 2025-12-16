import { useState } from 'react';
import { toast } from 'sonner';
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

  const validateIdNumber = (value: string): string | undefined => {
    if (!value) return 'נא להזין מספר תעודת זהות';
    if (!/^\d+$/.test(value)) return 'יש להזין ספרות בלבד';
    if (value.length !== 9) return 'נא להזין ת.ז. תקינה בעלת 9 ספרות';
    return undefined;
  };

  const validatePhone = (value: string): string | undefined => {
    if (!value) return 'נא להזין מספר טלפון';
    const cleanPhone = value.replace(/-/g, '');
    if (!/^05\d{8}$/.test(cleanPhone)) return 'נא להזין מספר טלפון ישראלי תקין (05X-XXXXXXX)';
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
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setIdNumber(value);
    if (errors.idNumber) {
      setErrors((prev) => ({ ...prev, idNumber: undefined }));
    }
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
    
    console.log('Login attempt:', { idNumber, phone });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('קוד נשלח בהצלחה! (סימולציה)');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(210 40% 96%) 0%, hsl(210 45% 93%) 100%)',
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
          stroke="hsl(210 50% 82%)"
          strokeWidth="2"
          opacity="0.6"
        />
        <path
          d="M0 580 L150 510 L300 550 L450 410 L600 450 L750 350 L900 390 L1050 310 L1200 350"
          fill="none"
          stroke="hsl(210 50% 85%)"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>

      {/* Gold coin - positioned exactly like mockup */}
      <img 
        src={goldCoin} 
        alt="" 
        className="absolute w-12 h-12 md:w-16 md:h-16 z-10"
        style={{ 
          top: '28%',
          right: 'calc(50% - 320px)',
        }}
      />
      
      {/* Green arrow - bottom right */}
      <img 
        src={greenArrow} 
        alt="" 
        className="absolute w-16 h-16 md:w-24 md:h-24 z-10"
        style={{ 
          bottom: '18%',
          right: 'calc(50% - 340px)',
          transform: 'rotate(-20deg)'
        }}
      />
      
      {/* Blue crescent shape - left side */}
      <div 
        className="absolute w-6 h-10 md:w-8 md:h-14 rounded-full z-10"
        style={{
          background: 'hsl(210 60% 65%)',
          left: 'calc(50% + 280px)',
          top: '38%',
          transform: 'rotate(30deg)',
          opacity: 0.7
        }}
      />
      
      {/* Small dots */}
      <div className="absolute w-2 h-2 rounded-full bg-blue-300/50" style={{ left: 'calc(50% + 200px)', top: '22%' }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/40" style={{ right: 'calc(50% + 180px)', top: '18%' }} />
      
      {/* Sparkle - bottom right corner */}
      <svg 
        className="absolute z-10" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24"
        style={{ bottom: '12%', right: 'calc(50% - 380px)' }}
      >
        <path fill="hsl(210 50% 75%)" d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
      </svg>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Login Card */}
          <div 
            className="bg-white rounded-[2.5rem] p-8 md:p-10 relative"
            style={{ 
              boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Mascot */}
            <div className="absolute -top-20 md:-top-24 left-1/2 transform -translate-x-1/2">
              <img 
                src={loginMascot} 
                alt="Stock4U Mascot" 
                className="w-28 h-28 md:w-36 md:h-36 object-contain"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
              />
            </div>

            {/* Content */}
            <div className="pt-10 md:pt-14">
              {/* Headline */}
              <h1 
                className="text-3xl md:text-4xl font-bold text-center mb-3"
                style={{ color: 'hsl(210 80% 35%)' }}
              >
                איזה כיף שחזרת!
              </h1>
              
              {/* Subtitle */}
              <p className="text-center text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
                הכנס פרטים ונשלח לך קוד גישה מהיר לנייד. המתנות שלך מחכות.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ID Number Field - Integrated label inside */}
                <div>
                  <div 
                    className={`relative flex items-center rounded-xl border-2 transition-colors ${
                      errors.idNumber 
                        ? 'border-red-400 bg-red-50/30' 
                        : 'border-blue-200 bg-blue-50/40'
                    }`}
                    style={{ height: '56px' }}
                  >
                    {/* Icon */}
                    <div className="absolute left-4 text-blue-400">
                      <IdCard className="w-5 h-5" />
                    </div>
                    
                    {/* Input */}
                    <input
                      type="text"
                      inputMode="numeric"
                      value={idNumber}
                      onChange={handleIdChange}
                      placeholder="הזן 9 ספרות..."
                      className="flex-1 h-full bg-transparent border-none outline-none text-center text-gray-700 placeholder:text-gray-400 px-12"
                      dir="ltr"
                    />
                    
                    {/* Label inside field */}
                    <div className="absolute right-4 text-sm font-medium text-gray-600">
                      מספר תעודת זהות
                    </div>
                  </div>
                  {errors.idNumber && (
                    <p className="text-red-500 text-xs mt-1.5 text-right">{errors.idNumber}</p>
                  )}
                </div>

                {/* Phone Field - Integrated label inside */}
                <div>
                  <div 
                    className={`relative flex items-center rounded-xl border-2 transition-colors ${
                      errors.phone 
                        ? 'border-red-400 bg-red-50/30' 
                        : 'border-blue-200 bg-blue-50/40'
                    }`}
                    style={{ height: '56px' }}
                  >
                    {/* Icon */}
                    <div className="absolute left-4 text-blue-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    
                    {/* Input */}
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="050-0000000"
                      maxLength={11}
                      className="flex-1 h-full bg-transparent border-none outline-none text-center text-gray-700 placeholder:text-gray-400 px-12"
                      dir="ltr"
                    />
                    
                    {/* Label inside field */}
                    <div className="absolute right-4 text-sm font-medium text-gray-600">
                      מספר טלפון נייד
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 text-right">{errors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 mt-2 text-white font-medium rounded-full text-base shadow-md transition-all hover:shadow-lg"
                  style={{ 
                    background: 'hsl(220 70% 50%)',
                  }}
                >
                  {isSubmitting ? (
                    'שולח...'
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      שלח לי קוד ב-SMS
                      <ChevronLeft className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>

              {/* Support Link */}
              <p className="text-center mt-6 text-sm text-gray-500">
                נתקלת בבעיה?{' '}
                <a 
                  href="mailto:support@stock4u.co.il" 
                  className="text-blue-500 hover:text-blue-600 hover:underline font-medium"
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
