

## Step 2: Recipient Onboarding & Auth Infrastructure

### Summary

Enhance the `/claim` flow with email magic link authentication, create a profile record linking `auth.uid()` to the Alpaca account, update the Edge Function for profile upsert, add a `/dashboard` placeholder, and update GiftCelebration with a dashboard button.

### Changes

**1. `src/pages/ClaimStockGift.tsx` — Magic link auth flow**

- Add `useEffect` that listens for `onAuthStateChange` events
- On form submit: validate → store form data + giftId in `sessionStorage` as `pending_kyc_data` → call `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/claim?giftId=' + giftId } })` → show "check your email" UI state
- On auth callback (user returns with session): read `pending_kyc_data` from sessionStorage → call `create-and-fund-gift` with `userId: session.user.id` added to payload → clear sessionStorage → navigate to `/gift-celebration`
- New UI states: `waitingForEmail` (shows "check your inbox" screen) and `processingAuth` (shows "opening your account..." loader)

**2. `supabase/functions/create-and-fund-gift/index.ts` — Profile upsert**

- Add optional `userId` field to the request schema
- After successful journal funding (line ~299), if `userId` is provided:
  ```typescript
  await supabase.from('profiles').upsert({
    user_id: userId,
    full_name: `${validated.firstName} ${validated.lastName}`,
    phone: validated.phone,
    government_id: null,  // never store — sent directly to Alpaca
    government_id_synced: true,
    alpaca_account_id: newAccountId,
  }, { onConflict: 'user_id' });
  ```
- Also handle the `needsApproval` path (account not ACTIVE): still create the profile but with `government_id_synced: false` and the `alpaca_account_id`

**3. `src/pages/Dashboard.tsx` — Protected placeholder**

- Check auth state on mount; redirect to `/login` if not authenticated
- Show user's email, a "coming soon" message for portfolio data
- Styled consistently with the sticker aesthetic (RTL, Rubik font, blue/white cards)

**4. `src/pages/Login.tsx` — Rewrite as email magic link**

- Replace the current ID+phone form with a single email input
- On submit: `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin + '/dashboard' } })`
- Show "check your inbox" confirmation after sending
- On mount: if already authenticated, redirect to `/dashboard`

**5. `src/pages/GiftCelebration.tsx` — Dashboard button**

- Add a primary "Go to Dashboard" button (`📊 לתיק ההשקעות שלי`) above the existing home button
- Make the home button secondary (outline variant)

**6. `src/App.tsx` — Routes**

- Add `import Dashboard from "./pages/Dashboard"`
- Add `<Route path="/dashboard" element={<Dashboard />} />`
- Uncomment the `/login` route

### Auth Flow Diagram

```text
User fills /claim form
  → Submit
  → Store form data in sessionStorage
  → signInWithOtp({ email })
  → Show "check your email" screen

User clicks magic link in email
  → Redirected to /claim?giftId=xxx (with session)
  → onAuthStateChange fires with SIGNED_IN
  → Read sessionStorage → call create-and-fund-gift({ userId })
  → Profile created + Alpaca account opened
  → Navigate to /gift-celebration
  → User clicks "Go to Dashboard" → /dashboard
```

### Files Changed

| Action | File |
|--------|------|
| Edit | `src/pages/ClaimStockGift.tsx` |
| Edit | `supabase/functions/create-and-fund-gift/index.ts` |
| Edit | `src/pages/GiftCelebration.tsx` |
| Rewrite | `src/pages/Login.tsx` |
| Create | `src/pages/Dashboard.tsx` |
| Edit | `src/App.tsx` |

