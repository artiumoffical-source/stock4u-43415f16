
# תכנית: התאמת ה-StepHero לעיצוב המקורי

## הבעיה הנוכחית
ב-`/order-details` (שלב 1), הקומפוננטה `StepHero` משתמשת ב-`variant="all-numbers"` שמציג את **כל** השלבים כעיגולים כחולים. אבל לפי העיצוב:
- **שלב נוכחי**: עיגול **לבן** עם מספר **כחול** וצל אפור מאחוריו (drop shadow)
- **שלבים עתידיים**: עיגולים **כחולים** עם מספרים **לבנים**

## השינויים הנדרשים

### 1. עדכון הלוגיקה של `getStepStyle` בקומפוננטה `StepHero`

**מצב נוכחי** (variant="all-numbers"):
```javascript
if (variant === "all-numbers") {
  return {
    circle: "bg-[#4880FF] text-white",  // הכל כחול
    showCheck: false,
  };
}
```

**מצב חדש** - הסרת variant="all-numbers" ושימוש בלוגיקה ברירת מחדל עם תיקון הסגנון:

| שלב | מצב | עיצוב |
|-----|-----|-------|
| שלב < currentStep | הושלם | עיגול כחול + ✓ לבן |
| שלב = currentStep | נוכחי | עיגול לבן + מספר כחול + **צל אפור** (לא ring) |
| שלב > currentStep | עתידי | עיגול כחול + מספר לבן |

### 2. קובץ `src/components/StepHero.tsx`

**שינוי בלוגיקת הסגנון:**
- שלב נוכחי: `bg-white text-[#4880FF]` עם `shadow-[0_4px_20px_rgba(0,0,0,0.15)]` (צל אפור)
- שלבים עתידיים: `bg-[#4880FF] text-white` (כחול עם מספר לבן)
- הסרת ה-ring הכחול מהשלב הנוכחי

### 3. קובץ `src/pages/OrderDetails.tsx`

**שינוי:**
```jsx
// לפני:
<StepHero currentStep={1} variant="all-numbers" />

// אחרי:
<StepHero currentStep={1} />
```

הסרת ה-variant כדי להשתמש בברירת המחדל המתוקנת.

## פירוט טכני

### עדכון `getStepStyle`:

```typescript
const getStepStyle = (stepNumber: number) => {
  if (stepNumber < currentStep) {
    // Completed step - blue circle with checkmark
    return {
      circle: "bg-[#4880FF] text-white",
      showCheck: true,
      shadow: "",
    };
  } else if (stepNumber === currentStep) {
    // Current step - white circle with blue number and gray shadow
    return {
      circle: "bg-white text-[#4880FF]",
      showCheck: false,
      shadow: "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
    };
  } else {
    // Future step - blue circle with white number
    return {
      circle: "bg-[#4880FF] text-white",
      showCheck: false,
      shadow: "",
    };
  }
};
```

## תוצאה צפויה
- **שלב 1 (נוכחי)**: עיגול לבן עם "1" כחול וצל אפור - בדיוק כמו בעיצוב
- **שלבים 2 ו-3**: עיגולים כחולים עם מספרים לבנים
- הלייבלים יישארו עם ה-stroke הלבן כמו שיש עכשיו
