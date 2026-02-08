
# תיקון שגיאת שליחת מיילים

## הבעיה שאותרה

פונקציית `send-smtp-email` עדיין מנסה לכתוב לטבלת `gift_registrations` הישנה (שורות 379-392):

```typescript
const { error: regError } = await supabase
  .from('gift_registrations')  // ← הטבלה הזו כבר לא בשימוש!
  .insert({
    order_id: emailData.orderId,
    token: token,
    ...
  });

if (regError) {
  throw new Error('Failed to create gift registration');  // ← כאן נכשל!
}
```

לאחר השינויים שביצענו, הטבלה הראשית היא `gifts` - אך היא **חסרה עמודת `token`** למימוש המתנה.

---

## פתרון מוצע

### שלב 1: הוספת עמודת token לטבלת gifts (מיגרציה)

```sql
ALTER TABLE public.gifts
ADD COLUMN IF NOT EXISTS token text UNIQUE;

-- אינדקס לחיפוש מהיר לפי טוקן
CREATE INDEX IF NOT EXISTS idx_gifts_token ON public.gifts(token);
```

### שלב 2: עדכון send-smtp-email Edge Function

במקום ליצור רשומה חדשה ב-`gift_registrations`, הפונקציה תעדכן את טבלת `gifts` הקיימת:

```typescript
// לפני (נכשל):
const { error: regError } = await supabase
  .from('gift_registrations')
  .insert({ order_id: emailData.orderId, token: token, ... });

// אחרי (עובד):
const { error: updateError } = await supabase
  .from('gifts')
  .update({ token: token })
  .eq('id', emailData.orderId);  // orderId = giftId מהסכמה החדשה
```

הפונקציה תמשיך לייצר את אותו המייל המדויק - רק מקור הנתונים ישתנה.

---

## מה לא ישתנה

| רכיב | סטטוס |
|------|-------|
| תבנית המייל HTML | ללא שינוי - אותו עיצוב בדיוק |
| מבנה הנתונים שנשלח | ללא שינוי |
| כפתור "קבל את המתנה" | עובד - מקשר ל-/redeem?token=... |
| לוגו Stock4U | ללא שינוי |
| תוכן המייל לשולח/מקבל | ללא שינוי |

---

## פרטים טכניים

### קבצים לעדכון:

1. **מיגרציית מסד נתונים** - הוספת עמודת `token` לטבלת `gifts`

2. **`supabase/functions/send-smtp-email/index.ts`**
   - שורות 369-392: החלפת הכתיבה ל-`gift_registrations` בעדכון ל-`gifts`
   - הפונקציה תחפש את המתנה לפי `orderId` (שהוא למעשה `giftId`) ותוסיף לה token

3. **`supabase/functions/get-gift-details/index.ts`** (אופציונלי)
   - הוספת תמיכה בחיפוש לפי token בנוסף ל-giftId
   - שימושי לדף `/redeem` שמקבל token מה-URL

### זרימת הנתונים החדשה:

```
Checkout.tsx
    ↓ create-gift
gifts (נוצרת רשומה עם token=null)
    ↓ sendGiftNotificationEmails
send-smtp-email
    ↓ מעדכן token בטבלת gifts
    ↓ שולח מייל עם לינק /redeem?token=xxx
מקבל המתנה לוחץ על הלינק
    ↓ get-gift-details (לפי token)
RedeemGift.tsx
```

---

## סיכום

התיקון פשוט ומהיר:
- מיגרציה קטנה להוספת עמודה
- שינוי של ~15 שורות בפונקציית המייל
- **המייל עצמו נשאר זהה לחלוטין**
