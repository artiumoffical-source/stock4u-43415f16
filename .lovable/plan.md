

# תכנית: תיקון סדר השלבים והוספת Assets לשלב 1

## הבעיות שזוהו

### 1. סדר השלבים הפוך
- **הנוכחי**: המערך מוגדר `[3, 2, 1]` מה שגורם לשלב 3 להופיע ראשון משמאל
- **הנדרש**: בממשק RTL, שלב 1 צריך להיות **בימין**, שלב 3 **בשמאל**
- **הפתרון**: שינוי הסדר ל-`[1, 2, 3]` כי ה-flex כבר ב-RTL

### 2. חסרים Assets לשלב 1
- צריך להוסיף את `פרטים_וברכה_1.png` (לייבל)
- צריך להוסיף את `Frame_108286_1.png` (עיגול שלב 1)

## שינויים נדרשים

### 1. העתקת Assets חדשים
העתקת 2 קבצים ל-`src/assets/step-hero/`:
- `label-step-1.png` (מ-פרטים_וברכה_1.png)
- `step-circle-1.png` (מ-Frame_108286_1.png)

### 2. עדכון StepHero.tsx

**שורות 4-13: הוספת imports חדשים**
```typescript
import labelStep1 from "@/assets/step-hero/label-step-1.png";
import stepCircle1 from "@/assets/step-hero/step-circle-1.png";
```

**שורות 21-25: תיקון סדר המערך**
```typescript
// RTL: Step 1 appears on the RIGHT, Step 3 on the LEFT
const steps = [
  { number: 1, label: "פרטים וברכה", labelImage: labelStep1, circleImage: stepCircle1 },
  { number: 2, label: "עיצוב המתנה", labelImage: labelStep2, circleImage: stepCircle2 },
  { number: 3, label: "סיום ותשלום", labelImage: labelStep3, circleImage: stepCircle3 },
];
```

## לוגיקת התצוגה (ללא שינוי)

| שלב נוכחי | שלב 1 | שלב 2 | שלב 3 |
|-----------|-------|-------|-------|
| 1 | לבן+צל (נוכחי) | כחול (PNG) | כחול (PNG) |
| 2 | וי (הושלם) | לבן+צל (נוכחי) | כחול (PNG) |
| 3 | וי (הושלם) | וי (הושלם) | לבן+צל (נוכחי) |

## תוצאה צפויה

- שלב 1 "פרטים וברכה" יופיע **בימין** של המסך
- שלב 2 "עיצוב המתנה" יופיע **באמצע**
- שלב 3 "סיום ותשלום" יופיע **בשמאל**
- כל השלבים ישתמשו ב-Assets אמיתיים (PNG)
- הלוגיקה של נוכחי/הושלם/עתידי תמשיך לעבוד כמו שצריך

