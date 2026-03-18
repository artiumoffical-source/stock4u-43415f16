

## Audit Results & Plan

### Findings

**1. Hardcoded emails/filters:** No hardcoded email restrictions found in `ClaimStockGift.tsx`, `Login.tsx`, or edge functions. The `from` address is `Stock4U <onboarding@resend.dev>` (Resend sandbox domain) in `send-smtp-email` and `Stock4U <noreply@stock4u.co.il>` in `create-gift`. No recipient filtering exists.

**2. Email transformations:** In `ClaimStockGift.tsx` line 492, phone is transformed with `+972` prefix, but email (`data.email`) is passed as-is to `signInWithOtp` — no hidden transformation. In `send-smtp-email`, the `to` email is `.trim()`-ed and `Name <email>` format is extracted — this is safe normalization.

**3. Resend sandbox mode:** The Resend SDK (`npm:resend@2.0.0`) does not have a test/sandbox mode flag in the code. However, the `from` address `onboarding@resend.dev` is the Resend test domain which **can only send to the account owner's email**. This is likely the root cause of email delivery failures for non-owner recipients. The `create-gift` function already uses `noreply@stock4u.co.il` but `send-smtp-email` still uses `onboarding@resend.dev`.

**4. Missing detailed error logging:** The `signInWithOtp` error is caught but only `error.message` is logged — no error code or full object. The `resend.emails.send` catch logs the error but doesn't capture `statusCode`, `name`, or response details.

### Changes

#### 1. Enhanced error logging in `ClaimStockGift.tsx`
Add full error object logging to `signInWithOtp` call (line 518-523):
```typescript
const { error } = await supabase.auth.signInWithOtp({ ... });
if (error) {
  console.error("[ClaimStockGift] signInWithOtp FULL error:", {
    message: error.message, status: error.status, name: error.name, code: error.code, fullError: error
  });
  throw new Error(error.message);
}
```

#### 2. Enhanced error logging in `send-smtp-email/index.ts`
Expand the Resend send error catch (line 416-418) to log full error details:
```typescript
} catch (sendError: any) {
  console.error('[EMAIL_SEND_ERROR] Full details:', {
    message: sendError?.message, statusCode: sendError?.statusCode,
    name: sendError?.name, response: sendError?.response, fullError: JSON.stringify(sendError)
  });
  throw new Error(sendError?.message || 'Failed to send email via Resend');
}
```

Also log the full Resend response on success (the `id: undefined` in logs suggests the response shape may differ):
```typescript
console.log('[EMAIL_SEND_SUCCESS]', { to: emailRequest.to, fullResult: JSON.stringify(result) });
```

#### 3. Log email exactly as passed in `ClaimStockGift.tsx`
Add a verification log right before `signInWithOtp`:
```typescript
logClaimStep("Email value EXACT (pre-OTP)", { emailRaw: data.email, emailLength: data.email.length, emailCharCodes: [...data.email].map(c => c.charCodeAt(0)) });
```

#### 4. Enhanced error logging in `create-and-fund-gift/index.ts`
In the ZodError catch (line 400-404), log the full error:
```typescript
console.error('[create-and-fund-gift] FULL error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
```

### Files to change

| File | Change |
|------|--------|
| `src/pages/ClaimStockGift.tsx` | Add full error logging to signInWithOtp, add email verification log |
| `supabase/functions/send-smtp-email/index.ts` | Enhanced Resend error + success logging |
| `supabase/functions/create-and-fund-gift/index.ts` | Enhanced error logging in catch block |

### Important finding to flag

The `send-smtp-email` function uses `from: emailData.from` which the client sets to `Stock4U <onboarding@resend.dev>`. This is the **Resend sandbox domain** — it can only deliver to the Resend account owner's verified email. This is likely why some recipients never get emails. This is a separate fix (changing to `noreply@stock4u.co.il`) but worth noting.

