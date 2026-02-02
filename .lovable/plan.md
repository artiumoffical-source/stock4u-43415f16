

# תכנית: התאמת רזולוציה למובייל תוך שמירה על עיצוב Desktop

## סיכום
זיהיתי מהצילומי מסך שהעמוד `/order-details` אינו מותאם כראוי למובייל. הבעיות העיקריות:
- ה-Header נחתך ולא מתאים לרוחב המסך
- ה-Stepper (StepHero) דחוס מדי והמילים חתוכות
- הטופס מציג 3 עמודות זו לצד זו במקום stack אנכי

## שינויים נדרשים

### 1. Header.tsx - התאמה רספונסיבית

**בעיה:** Header קבוע ב-80px שאינו מותאם למובייל - הניווט והכפתורים גולשים

**פתרון:**
- במובייל: הסתרת תפריט הניווט המלא והצגת הלוגו בלבד עם כפתורי עגלה וכניסה
- שימוש ב-`hidden md:flex` לתפריט הניווט המלא
- הקטנת הלוגו במובייל

### 2. StepHero.tsx - התאמת הסטפר למובייל

**בעיה:** 
- הסטפר נחתך במסכים קטנים
- הקווים והטקסט חופפים

**פתרון:**
- הקטנת גודל העיגולים במובייל (מ-12 ל-10)
- הקטנת הקווים המחברים (מ-28 ל-12)
- הקטנת גודל הטקסט של התוויות
- הקטנת סימני המטבע והכוכבים

### 3. OrderDetails.tsx - Stack אנכי במובייל

**בעיה:** 
- 3 עמודות ("העלאת לוגו", "אמצעי העברה", "ממי המתנה") מוצגות אופקית
- גולש מהמסך במובייל

**פתרון:**
- שינוי `flex-direction` ל-`column` במסכים קטנים
- הסרת `maxWidth: 320px` והחלפה ב-`width: 100%` במובייל
- הוספת media queries או שימוש ב-breakpoints
- התאמת ה-padding מ-`60px 40px` ל-`20px 16px` במובייל

---

## פרטים טכניים

### Header.tsx - שינויים ספציפיים

```text
לפני:
<header className="w-full bg-white px-6 py-3 h-[80px] flex items-center...">
  ...
  {/* Right side - Navigation */}
  <div className="flex items-center gap-4">
    ...navigation links...
  </div>
</header>

אחרי:
<header className="w-full bg-white px-3 md:px-6 py-2 md:py-3 h-[60px] md:h-[80px] flex items-center...">
  ...
  {/* Right side - Navigation - Hidden on mobile */}
  <div className="hidden md:flex items-center gap-4">
    ...navigation links...
  </div>
</header>
```

### StepHero.tsx - שינויים ספציפיים

```text
לפני:
- עיגולים: w-12 h-12 md:w-14 md:h-14
- קווים: w-16 md:w-28 lg:w-36
- טקסט: text-base md:text-lg

אחרי:
- עיגולים: w-10 h-10 md:w-14 md:h-14
- קווים: w-8 md:w-28 lg:w-36
- טקסט: text-xs md:text-lg
- הקטנת גודל סימני המטבע במובייל
```

### OrderDetails.tsx - שינויים ספציפיים

```text
הסקשן העליון (שורה 181-411):

לפני:
style={{
  display: "flex",
  justifyContent: "center",
  gap: "60px",
  ...
}}

אחרי - שימוש בקלאסים של Tailwind או CSS:
className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-[60px] w-full"

כל טופס בנפרד:
- הסרת maxWidth: 320px במובייל
- שימוש ב-w-full במקום
- padding: 20px 16px במובייל
```

---

## סדר ביצוע

1. **תחילה** - Header.tsx - התאמה רספונסיבית
2. **לאחר מכן** - StepHero.tsx - הקטנת הסטפר למובייל  
3. **לבסוף** - OrderDetails.tsx - stack אנכי לטופס

## תוצאה צפויה
- האתר יוצג נכון במסכי מובייל (390px רוחב)
- ללא גלילה אופקית
- כל האלמנטים נראים ונגישים
- עיצוב Desktop יישאר זהה

