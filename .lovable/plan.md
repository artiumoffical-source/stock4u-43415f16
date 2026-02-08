

# תוכנית: איפוס וארגון מחדש של הסכמה בסופאבייס

## סטטוס: הושלם ✅

### מה בוצע:

1. **עדכון ממשק הניהול (Admin UI)**
   - `DashboardOverview.tsx` - קורא מטבלת `gifts` החדשה
   - `GiftsPage.tsx` - מציג שולח, מקבל, מניות (gift_items), סכום, סטטוס
   - הוסרה כל הלוגיקה של KYC

2. **הסרת Edge Functions ישנות**
   - ✅ `create-order` - נמחק
   - ✅ `register-gift-recipient` - נמחק
   - ✅ `upload-kyc-document` - נמחק
   - ✅ `get-kyc-document-url` - נמחק

3. **עדכון Edge Functions פעילות**
   - `get-gift-details` - עודכן לעבוד עם טבלת `gifts`
   - `create-gift` - נשאר כמו שהוא (הפונקציה הראשית)

4. **עדכון ניווט**
   - הוסר קישור "הזמנות" מה-Sidebar
   - `OrdersPage.tsx` נמחק

5. **עדכון config.toml**
   - הוסרו הפונקציות הישנות מהקונפיגורציה

---

## פעולה נדרשת מהמשתמש:

יש להריץ את הפקודות הבאות ב-SQL Editor של Supabase:

```sql
-- מחיקת כל ההזמנות הישנות
DELETE FROM orders;

-- מחיקת כל רישומי המתנות הישנים (KYC)
DELETE FROM gift_registrations;

-- מחיקת הלוגים הישנים
DELETE FROM audit_logs;
```

---

## מה לא נפגע:
- האתר הציבורי (Index, StockSelection, Checkout)
- תהליך הרכישה (משתמש ב-`create-gift`)
- עיצוב ה-Hero והקרוסלה
- טבלאות מערכת (admin_users, user_roles)
