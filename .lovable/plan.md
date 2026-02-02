

# תכנית: ביטול גרסת המובייל - הצגת Desktop בלבד

## סיכום
הסרת כל הקוד הספציפי למובייל כך שהאתר יציג תמיד את גרסת הדסקטופ, ללא תלות בגודל המסך. זהו שינוי זמני עד שתתוקן גרסת המובייל.

## שינויים נדרשים

### 1. Layout.tsx - הסרת MobileHeader
**מה ישתנה:** הHeader יציג תמיד את גרסת הדסקטופ
- הסרת התנאי `block md:hidden` שמציג את MobileHeader
- הסרת התנאי `hidden md:block` מה-Desktop Header
- תמיד יוצג ה-Header הרגיל

### 2. Index.tsx - הסרת כל הסקשן של המובייל
**מה ישתנה:** דף הבית יציג תמיד את גרסת הדסקטופ
- הסרת כל הבלוק `<div className="block md:hidden">` (שורות 15-119)
- הסרת התנאי `hidden md:block` מגרסת הדסקטופ
- הסרת הimports של קומפוננטות המובייל שלא בשימוש

---

## פרטים טכניים

### קובץ: `src/components/Layout.tsx`
```text
לפני:
  {/* Desktop Header */}
  <div className="hidden md:block">
    <Header />
  </div>
  {/* Mobile Header */}
  <div className="block md:hidden">
    <MobileHeader />
  </div>

אחרי:
  <Header />
```

### קובץ: `src/pages/Index.tsx`
```text
לפני:
  <Layout>
    {/* MOBILE VERSION */}
    <div className="block md:hidden">...</div>
    
    {/* DESKTOP VERSION */}
    <div className="hidden md:block">...</div>
  </Layout>

אחרי:
  <Layout>
    {/* DESKTOP VERSION - Always shown */}
    <div>...</div>
  </Layout>
```

### Imports שיוסרו מ-Index.tsx:
- `MobileHowItWorks`
- `MobileStats`
- `MobileFooter`
- `MobilePackagesCarousel`

---

## תוצאה צפויה
- האתר יציג תמיד את גרסת הדסקטופ
- במובייל יוצג אותו עיצוב (עם גלילה אופקית במידת הצורך)
- הקומפוננטות של המובייל יישארו בקוד לשימוש עתידי

