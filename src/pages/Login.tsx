import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { IdCard, Smartphone, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import loginMascot from '@/assets/login-mascot.png';
import goldCoin from '@/assets/gold-coin-emoji.png';
import greenArrow from '@/assets/green-arrow-growth.png';

export default function Login() {
  const navigate = useNavigate();
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
    
    // Simulation - log data and show success
    console.log('Login attempt:', { idNumber, phone });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('קוד נשלח בהצלחה! (סימולציה)');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Background with gradient and pattern */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(210 40% 94%) 0%, hsl(210 50% 90%) 50%, hsl(210 40% 92%) 100%)',
        }}
      />
      
      {/* Zigzag chart pattern */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <path
          d="M0 600 L200 500 L400 550 L600 400 L800 450 L1000 300 L1200 350"
          fill="none"
          stroke="hsl(210 50% 70%)"
          strokeWidth="3"
        />
        <path
          d="M0 650 L200 550 L400 600 L600 450 L800 500 L1000 350 L1200 400"
          fill="none"
          stroke="hsl(210 50% 75%)"
          strokeWidth="2"
        />
      </svg>

      {/* Floating decorative elements */}
      <img 
        src={goldCoin} 
        alt="" 
        className="absolute w-16 h-16 md:w-20 md:h-20 top-1/3 right-4 md:right-[8%] animate-bounce z-10"
        style={{ animationDuration: '3s' }}
      />
      <img 
        src={greenArrow} 
        alt="" 
        className="absolute w-20 h-20 md:w-28 md:h-28 bottom-[15%] right-[5%] md:right-[10%] z-10"
        style={{ transform: 'rotate(-15deg)' }}
      />
      
      {/* Blue geometric shapes */}
      <div className="absolute left-[5%] md:left-[10%] top-[40%] w-6 h-10 md:w-8 md:h-12 rounded-full bg-blue-400/40 rotate-45" />
      <div className="absolute left-[8%] md:left-[15%] top-[25%] w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-300/60" />
      <div className="absolute right-[15%] md:right-[25%] top-[15%] w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400/50" />
      
      {/* Sparkle decorations */}
      <div className="absolute bottom-[10%] right-[3%] md:right-[5%]">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-blue-300/60">
          <path fill="currentColor" d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10Z" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div 
            className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 relative"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
          >
            {/* Mascot */}
            <div className="absolute -top-24 md:-top-28 left-1/2 transform -translate-x-1/2">
              <img 
                src={loginMascot} 
                alt="Stock4U Mascot" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg"
              />
            </div>

            {/* Content with top padding for mascot */}
            <div className="pt-12 md:pt-16">
              {/* Headline */}
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-2">
                איזה כיף שחזרת!
              </h1>
              
              {/* Subtitle */}
              <p className="text-center text-gray-600 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
                הכנס פרטים ונשלח לך קוד גישה מהיר לנייד.
                <br />
                המתנות שלך מחכות.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* ID Number Field */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="idNumber" 
                    className="text-sm font-medium text-gray-700"
                  >
                    מספר תעודת זהות
                  </Label>
                  <div className="relative">
                    <Input
                      id="idNumber"
                      type="text"
                      inputMode="numeric"
                      value={idNumber}
                      onChange={handleIdChange}
                      placeholder="הזן 9 ספרות..."
                      className={`h-12 pr-4 pl-12 text-right bg-blue-50/50 border-2 rounded-xl transition-colors ${
                        errors.idNumber 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-blue-200 focus:border-blue-400'
                      }`}
                      dir="ltr"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                      <IdCard className="w-5 h-5" />
                    </div>
                  </div>
                  {errors.idNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label 
                    htmlFor="phone" 
                    className="text-sm font-medium text-gray-700"
                  >
                    מספר טלפון נייד
                  </Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="050-0000000"
                      maxLength={11}
                      className={`h-12 pr-4 pl-12 text-right bg-blue-50/50 border-2 rounded-xl transition-colors ${
                        errors.phone 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-blue-200 focus:border-blue-400'
                      }`}
                      dir="ltr"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full text-base shadow-lg transition-all hover:shadow-xl"
                >
                  {isSubmitting ? (
                    'שולח...'
                  ) : (
                    <>
                      שלח לי קוד ב-SMS
                      <ChevronLeft className="w-5 h-5 mr-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Support Link */}
              <p className="text-center mt-6 text-sm text-gray-600">
                נתקלת בבעיה?{' '}
                <a 
                  href="mailto:support@stock4u.co.il" 
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
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
