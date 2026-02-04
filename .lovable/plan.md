

# תכנית: שימוש ב-PNG לכל מצבי העיגולים

## הבעיה שזוהתה

בצילום המסך הנוכחי, עיגול שלב 1 מוצג כ**עיגול לבן עם מספר כחול** (CSS), בעוד שבתמונה המקורית שלך הוא **עיגול כחול עם מספר 1 לבן** (PNG).

הסיבה: הלוגיקה בקוד מציגה עיגול CSS לבן לשלב הנוכחי במקום להשתמש בתמונת ה-PNG.

## הפתרון

שינוי הלוגיקה כך ש**כל השלבים ישתמשו בתמונות PNG**, למעט שלבים שהושלמו (שמציגים וי).

### שורות לעדכון: 160-167

**קוד נוכחי:**
```typescript
} : state === "current" ? (
  // Current - White circle with blue number and shadow (CSS)
  <div 
    className="w-9 h-9 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center font-bold text-base md:text-2xl text-[#4880FF]"
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
  >
    {step.number}
  </div>
```

**קוד חדש:**
```typescript
) : (
  // Current or Future - Use PNG image for circle
  <img 
    src={step.circleImage} 
    alt={`שלב ${step.number}`}
    className="w-9 h-9 md:w-14 md:h-14"
  />
```

### שינוי נוסף: פישוט הלוגיקה

במקום 3 מצבים (completed/current/future), נשאיר רק 2:
1. **completed** - וי לבן על רקע כחול (CSS)
2. **default** - תמונת PNG של העיגול הכחול

## קוד מעודכן מלא (שורות 154-182)

```typescript
{/* Circle */}
{state === "completed" ? (
  // Completed - Blue circle with checkmark (CSS)
  <div className="w-9 h-9 md:w-14 md:h-14 rounded-full bg-[#4880FF] flex items-center justify-center">
    <Check className="w-5 h-5 md:w-7 md:h-7 text-white" strokeWidth={3} />
  </div>
) : (
  // Current or Future - Use PNG image for circle
  <img 
    src={step.circleImage} 
    alt={`שלב ${step.number}`}
    className="w-9 h-9 md:w-14 md:h-14"
  />
)}
```

## תוצאה צפויה

- **שלב נוכחי (1)**: עיגול כחול עם מספר 1 לבן (PNG) - **כמו בעיצוב שלך!**
- **שלבים עתידיים (2,3)**: עיגולים כחולים עם מספרים לבנים (PNG)
- **שלבים שהושלמו**: עיגול כחול עם סימן וי לבן (CSS)

