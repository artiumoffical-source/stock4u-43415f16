

# תכנית: התאמת סקשן "זה כל כך פשוט" למובייל

## הבעיה
הסקשן השלישי בעמוד הבית "זה כל כך פשוט" (How It Works) משתמש בתמונה עם גובה קבוע של 566px. במובייל התמונה נחתכת ומציגה רק חלק מהתוכן - רואים רק שלב 2 במקום את כל 3 השלבים.

## הפתרון
נשתמש בקומפוננטה `MobileHowItWorks` שכבר קיימת בפרויקט - היא מציגה את 3 השלבים בפריסה אנכית המותאמת למובייל עם כרטיסים וחיצים ביניהם.

## שינויים נדרשים

### קובץ: `src/pages/Index.tsx`

**שורות 71-78 - הסקשן הנוכחי:**

לפני:
```jsx
{/* How It Works Section */}
<section className="h-[566px] relative overflow-hidden">
  <img
    src="https://api.builder.io/api/v1/image/assets/TEMP/..."
    alt="How It Works - זה כללו פשוט!"
    className="w-full h-full object-cover object-center"
  />
</section>
```

אחרי:
```jsx
{/* How It Works Section - Desktop: image, Mobile: component */}
<section className="hidden md:block h-[566px] relative overflow-hidden">
  <img
    src="https://api.builder.io/api/v1/image/assets/TEMP/..."
    alt="How It Works - זה כללו פשוט!"
    className="w-full h-full object-cover object-center"
  />
</section>
<div className="block md:hidden">
  <MobileHowItWorks />
</div>
```

### Import נוסף בראש הקובץ:
```jsx
import MobileHowItWorks from "../components/mobile/MobileHowItWorks";
```

---

## תוצאה צפויה
- **דסקטופ (768px+)**: מציג את התמונה המקורית כמו היום
- **מובייל (עד 768px)**: מציג את הקומפוננטה MobileHowItWorks עם 3 שלבים אנכיים עם כרטיסים וחיצים

