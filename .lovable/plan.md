
# תכנית: הצגת אותה תמונה במובייל - ללא שימוש בקומפוננטה MobileHowItWorks

## הבעיה
הקומפוננטה `MobileHowItWorks` היא עיצוב שונה לגמרי מהתמונה המקורית של הדסקטופ. במקום להציג את התמונה של "זה כל כך פשוט" עם 3 השלבים בקו אופקי, היא מציגה כרטיסים אנכיים עם חיצים - עיצוב שונה לחלוטין.

## הפתרון
נסיר את הקומפוננטה `MobileHowItWorks` ונציג את **אותה תמונה** גם במובייל, רק עם התאמות גובה:
- **דסקטופ**: גובה קבוע של 566px עם `object-cover`
- **מובייל**: גובה אוטומטי (`h-auto`) עם `object-contain` כדי שהתמונה תוצג במלואה

## שינויים נדרשים

### קובץ: `src/pages/Index.tsx`

**שורות 5, 72-82 - הסרת MobileHowItWorks והצגת התמונה בכל המסכים:**

```text
לפני:
import MobileHowItWorks from "../components/mobile/MobileHowItWorks";
...
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

אחרי:
{/* How It Works Section - Same image for all screens */}
<section className="relative overflow-hidden">
  <img
    src="https://api.builder.io/api/v1/image/assets/TEMP/d2a8fbb0bc7d24e0fc8879295b276f6758c8be62?width=3840"
    alt="How It Works - זה כללו פשוט!"
    className="w-full h-auto md:h-[566px] object-contain md:object-cover object-center"
  />
</section>
```

**הסרת Import:**
- הסרת `import MobileHowItWorks from "../components/mobile/MobileHowItWorks";`

## תוצאה צפויה
- **דסקטופ**: נשאר אותו דבר - תמונה בגובה 566px
- **מובייל**: אותה תמונה מוצגת במלואה, מוקטנת לפי רוחב המסך
