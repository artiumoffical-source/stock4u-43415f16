import { z } from "zod";

// Utility function to sanitize input strings
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML/script tags
    .slice(0, 1000); // Limit length to prevent overflow attacks
};

// Phone number validation for Israeli format
export const phoneValidation = z.string()
  .min(1, 'טלפון נדרש')
  .regex(/^05\d{8}$|^0[2-4,8-9]\d{7,8}$/, 'מספר טלפון לא תקין - הכנס מספר ישראלי תקין')
  .transform(sanitizeInput);

// Email validation with enhanced security
export const emailValidation = z.string()
  .min(1, 'אימייל נדרש')
  .email('כתובת אימייל לא תקינה')
  .max(254, 'כתובת אימייל ארוכה מדי')
  .transform(sanitizeInput);

// Israeli ID validation
export const idValidation = z.string()
  .min(1, 'תעודת זהות נדרשת')
  .regex(/^\d{9}$/, 'תעודת זהות חייבת להכיל 9 ספרות')
  .refine((id) => {
    // Israeli ID checksum validation
    const digits = id.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let num = digits[i] * ((i % 2) + 1);
      if (num > 9) num = Math.floor(num / 10) + (num % 10);
      sum += num;
    }
    return sum % 10 === 0;
  }, 'תעודת זהות לא תקינה')
  .transform(sanitizeInput);

// Name validation with Hebrew support
export const nameValidation = z.string()
  .min(1, 'שם נדרש')
  .min(2, 'שם חייב להכיל לפחות 2 תווים')
  .max(100, 'שם ארוך מדי')
  .regex(/^[א-ת\s\-'״]+$/, 'שם יכול להכיל רק אותיות עבריות, רווחים, מקפים וגרשיים')
  .transform(sanitizeInput);

// Address validation
export const addressValidation = z.string()
  .min(1, 'כתובת נדרשת')
  .min(10, 'כתובת חייבת להכיל לפחות 10 תווים')
  .max(500, 'כתובת ארוכה מדי')
  .transform(sanitizeInput);

// Message validation for gift messages
export const messageValidation = z.string()
  .max(500, 'הודעה ארוכה מדי - מקסימום 500 תווים')
  .optional()
  .transform((val) => val ? sanitizeInput(val) : val);

// Admin credentials validation
export const adminCredentialsValidation = z.object({
  username: z.string()
    .min(1, 'שם משתמש נדרש')
    .min(3, 'שם משתמש חייב להכיל לפחות 3 תווים')
    .max(50, 'שם משתמש ארוך מדי')
    .regex(/^[a-zA-Z0-9_]+$/, 'שם משתמש יכול להכיל רק אותיות אנגליות, מספרים וקו תחתון')
    .transform(sanitizeInput),
  password: z.string()
    .min(1, 'סיסמה נדרשת')
    .min(8, 'סיסמה חייבת להכיל לפחות 8 תווים')
});

// City validation
export const cityValidation = z.string()
  .min(1, 'עיר נדרשת')
  .min(2, 'עיר חייבת להכיל לפחות 2 תווים')
  .max(100, 'שם עיר ארוך מדי')
  .transform(sanitizeInput);

// Street validation
export const streetValidation = z.string()
  .min(1, 'רחוב נדרש')
  .min(2, 'רחוב חייב להכיל לפחות 2 תווים')
  .max(150, 'שם רחוב ארוך מדי')
  .transform(sanitizeInput);

// House number validation
export const houseNumberValidation = z.string()
  .min(1, 'מספר בית נדרש')
  .max(20, 'מספר בית ארוך מדי')
  .transform(sanitizeInput);

// Date of birth validation
export const dateOfBirthValidation = z.string()
  .min(1, 'תאריך לידה נדרש')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'תאריך לידה לא תקין');

// Gift registration form validation (POC KYC)
export const giftRegistrationValidation = z.object({
  fullName: nameValidation,
  idNumber: idValidation,
  phone: phoneValidation,
  email: emailValidation,
  dateOfBirth: dateOfBirthValidation,
  city: cityValidation,
  street: streetValidation,
  houseNumber: houseNumberValidation,
  country: z.string().default('ישראל'),
  consentActingOwnBehalf: z.boolean().refine(val => val === true, 'יש לאשר שאתה פועל מטעם עצמך'),
  consentInfoTrue: z.boolean().refine(val => val === true, 'יש לאשר שהמידע נכון ומדויק'),
  consentTermsAccepted: z.boolean().refine(val => val === true, 'יש להסכים לתנאי השימוש')
});

// Rate limiting helper
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const key = identifier;
    
    if (!attempts.has(key)) {
      attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    const attempt = attempts.get(key)!;
    
    if (now > attempt.resetTime) {
      attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (attempt.count >= maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  };
};