

## Fix: Claim Process Timeout & Error Handling

### Analysis

The `create-and-fund-gift` edge function polls Alpaca up to 15 times at 4-second intervals (60 seconds max). The client (`ClaimStockGift.tsx` line 111) has no timeout wrapper, so users see an infinite spinner if the function hangs or takes too long.

CORS is already set to `'*'` in the edge function, so `https://stock4u.co.il` is already allowed. No CORS changes needed.

The edge function logs confirm it's still failing on phone validation (`ZodError: Phone must be a valid Israeli format`), which was supposed to be fixed. The `.transform()` strip is there but may not be handling all edge cases from the client.

### Changes

#### 1. Add 30-second timeout to `processGiftClaim` in `ClaimStockGift.tsx`

Wrap `supabase.functions.invoke` with `Promise.race` against a 30-second timeout. On timeout, show a friendly error with a "Try Again" button. Also improve error catching to handle all failure modes (network error, non-success response, timeout).

```typescript
const processGiftClaim = useCallback(async (userId: string) => {
  // ... existing setup ...
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('הפעולה לקחה יותר מדי זמן. נסה שוב.')), 30000)
    );
    
    const invokePromise = supabase.functions.invoke("create-and-fund-gift", {
      body: { userData: { ...pendingData, userId } },
    });

    const { data: result, error } = await Promise.race([invokePromise, timeoutPromise]);
    // ... rest of handling ...
  }
```

#### 2. Update the `processingAuth` UI to show error state with retry

When `flowState === "processingAuth"` and `errorMessage` is set, show the error message with a "Try Again" button instead of the spinner. Currently errors reset to `"form"` state which loses context.

#### 3. Reduce edge function polling to avoid timeouts

In `create-and-fund-gift/index.ts`, reduce polling from 15 attempts to 5 (20 seconds max). The `retry-gift-funding` cron already handles the safety net for accounts that aren't active yet. This keeps the function well under the 30-second client timeout.

### Files to Change

| Action | File |
|--------|------|
| Edit | `src/pages/ClaimStockGift.tsx` — add timeout, better error UI |
| Edit | `supabase/functions/create-and-fund-gift/index.ts` — reduce polling to 5 attempts |

