
Goal: break the /claim magic-link loop by persisting KYC data across tab switches, auto-resuming after auth, and skipping the form for users who already have an account.

What I found
- The current loop root cause is real: `ClaimStockGift.tsx` stores pending KYC data in `sessionStorage` under `pending_kyc_data`.
- Magic-link auth persists in `localStorage` via the Supabase client, but the claim form payload does not. If the user opens the email in a new tab/window, the app session survives while `sessionStorage` is empty, so the page falls back to the blank form.
- Current resume logic only works if `sessionStorage` still exists:
  - `processGiftClaim()` reads `sessionStorage`
  - auth listener checks `sessionStorage`
  - mount check checks `sessionStorage`
- There is already partial duplicate-account protection:
  - frontend checks `profiles.alpaca_account_id` inside `processGiftClaim`
  - edge function also returns success with `alreadyExists` when it can detect an existing account
- The loading UI already exists, but the message currently says `פותחים את חשבון ההשקעות שלך...` instead of the new wording you requested.

Implementation plan

1. Replace claim-flow storage with persistent localStorage
- In `ClaimStockGift.tsx`, replace the `SESSION_KEY` usage with a local-storage backed key for pending KYC payload.
- Save the full KYC payload to `localStorage` before `signInWithOtp`.
- Clear that key only after:
  - successful redirect to dashboard for existing account
  - successful completion to celebration page
  - explicit abandonment/reset if needed
- Add safe JSON parsing so corrupted stored data does not break the page.

2. Add mount-time “smart redirect or resume” effect
- On page load, run a single initialization effect that:
  - checks current authenticated user
  - if user exists, queries `profiles` for `alpaca_account_id`
  - if found, immediately navigates to `/dashboard`
  - otherwise checks localStorage for pending KYC data
  - if pending data exists and matches the current claim context, automatically calls `processGiftClaim(user.id)`
- This effect should set `flowState` to `processingAuth` before resuming, so the user never sees the empty form again during a valid resume.

3. Update auth listener to use the same persistent storage
- Keep the `onAuthStateChange` listener, but switch it from `sessionStorage` to `localStorage`.
- Add a guard so the resume logic only runs once per page load/auth cycle, preventing duplicate invocations from:
  - the mount check
  - the auth state callback
- This is important because both are currently capable of calling `processGiftClaim()`.

4. Harden `processGiftClaim()` around persisted payloads
- Read pending KYC data from localStorage instead of sessionStorage.
- If no pending data exists:
  - do not silently return to the form if a signed-in user already has an account; redirect to `/dashboard`
  - otherwise leave the user in a clear, non-looping state
- Keep the existing profile lookup first, since it is the fastest way to skip duplicate account creation.
- Preserve existing error handling for:
  - generic function errors
  - timeout
  - `alreadyClaimed` → `מתנה זו כבר מומשה`
  - `alreadyExists` → redirect to dashboard

5. Improve the loading state copy
- Update the processing screen text to:
  - `מאמתים את הפרטים ומקימים את תיק ההשקעות שלך...`
- Keep the spinner and “may take up to 30 seconds” style guidance.

6. Keep existing backend behavior, only align frontend to it
- The edge function already has the key resilience pieces needed for this request:
  - checks `profiles` by `user_id`
  - checks funded gift status
  - returns success for some duplicate-account scenarios
- I would not plan database changes for this request.
- I also would not change `Login.tsx` unless we discover claim-specific storage assumptions there, because the loop is centered in `ClaimStockGift.tsx`.

Technical notes
- Primary bug:
```text
Supabase auth session -> localStorage
Pending claim payload -> sessionStorage
Magic link opened in another tab -> auth survives, claim payload lost
Result -> page shows empty form again
```
- Safer resume flow:
```text
mount
 ├─ get current user
 ├─ if profile has alpaca_account_id -> /dashboard
 └─ if localStorage has pending KYC -> processGiftClaim()
```
- Important implementation detail: the stored payload should still include `giftId`, and resume logic should verify it exists before invoking the edge function, so users do not resume stale data against the wrong claim link.

Files to update
- `src/pages/ClaimStockGift.tsx`
  - switch storage from sessionStorage to localStorage
  - add one-time init/resume effect
  - add one-time resume guard
  - update loading-state copy

Expected outcome
- User fills form, receives magic link, opens it from email, returns authenticated.
- `/claim` detects the signed-in user plus stored KYC payload and resumes automatically.
- Existing-account users are redirected straight to `/dashboard`.
- Users no longer land back on an empty form unless there is truly no pending claim data to resume.
