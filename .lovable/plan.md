
# הסרת כותרת כפולה מעמוד סיכום הזמנה

## הבעיה

כרגע בעמוד `/order-summary` יש שתי כותרות:
1. **OrderSummaryHero** - ההירו החדש עם המסקוט והכותרת "סיכום הזמנה שלכם!"
2. **Header בתוך הכרטיס** - כותרת כחולה נוספת עם עיגול V ו"סיכום ההזמנה"

זה מיותר ויוצר כפילות ויזואלית.

---

## הפתרון

מחיקת ה-Header הכחול מתוך הכרטיס הלבן בקובץ `OrderSummary.tsx`.

---

## שינוי בקובץ

**קובץ:** `src/pages/OrderSummary.tsx`

**למחוק (שורות 69-77):**
```tsx
{/* Header */}
<div className="bg-gradient-to-r from-[#4F86F9] to-[#6B9AFF] p-6 text-center">
  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
    <CheckCircle2 className="w-8 h-8 text-white" />
  </div>
  <h1 className="text-2xl font-black text-white">סיכום ההזמנה</h1>
  <p className="text-white/80 text-sm mt-1">בדקו את הפרטים לפני המשך לתשלום</p>
</div>
```

**להוסיף:** פינות מעוגלות לכרטיס הלבן גם למעלה (כי כבר אין את ה-Header הכחול שהיה מעגל את הפינות)

---

## תוצאה

```text
┌─────────────────────────────────────┐
│  🛒 מסקוט + "סיכום הזמנה שלכם!"    │  ← OrderSummaryHero
├─────────────────────────────────────┤
│                                     │
│  📦 מניות במתנה (1)                │  ← הכרטיס מתחיל ישר מהתוכן
│     AAPL - ₪500                     │
│                                     │
│  👤 שולח המתנה                      │
│  ...                                │
└─────────────────────────────────────┘
```

---

## ניקוי נוסף

גם ה-import של `CheckCircle2` יכול להימחק מכיוון שהוא לא ישמש יותר.
