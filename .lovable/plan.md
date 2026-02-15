

# Pilot Mode Overlay on Checkout Page

## Overview
Add a "closed pilot" overlay to the `/checkout` page that disables all payment functionality while keeping the UI visible. The overlay captures emails for the waitlist and shows confetti on successful signup -- all within a single file edit to `src/pages/Checkout.tsx`.

## What Changes

### 1. Visual Overlay on Payment Section
- Wrap the existing payment form + alternative payments + submit button in a `relative` container
- Add a blurred overlay (`backdrop-blur-sm`, pointer-events-none on underlying content) that makes the fields visible but non-interactive
- All existing payment components remain in the DOM, untouched -- just visually disabled

### 2. Pilot Notice Banner
- Centered card on top of the blurred payment area with:
  - Headline: "אנחנו כרגע בשלב פיילוט סגור! (rocket emoji)"
  - Body text explaining the exclusive invite process
  - Styled with the brand blue (`#486284` / `#4C7EFB`) and white, matching existing checkout design

### 3. Email Input + Join Waitlist Button
- Clean email input field (same style as existing checkout inputs)
- "הצטרפו לרשימת ההמתנה" button in brand blue
- Client-side email validation before submission

### 4. Supabase Waitlist Insert
- On submit, insert email into the existing `waitlist` table using the Supabase client
- Handle duplicate emails gracefully (unique constraint on email column -- error code `23505`)
- Show success state for both new and duplicate signups

### 5. Confetti + Success State
- On successful waitlist join, fire `canvas-confetti` (already installed)
- Replace the email form with a success message inside the same overlay card
- User stays on the checkout page and can still see the gift they wanted to send

## Technical Details

### File Modified
- `src/pages/Checkout.tsx` -- the only file being changed

### New State Variables
- `waitlistEmail: string` -- email input value
- `waitlistSubmitting: boolean` -- loading state
- `waitlistSuccess: boolean` -- controls success view

### New Import
- `import confetti from 'canvas-confetti'`

### Structure (Pseudo-JSX)
```text
<div className="relative">
  {/* Existing payment form + alt payments + submit -- now with blur + pointer-events-none */}
  <div className="filter blur-[2px] pointer-events-none select-none opacity-60">
    ... existing form JSX unchanged ...
  </div>

  {/* Overlay card -- absolutely positioned on top */}
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg text-center">
      {waitlistSuccess ? (
        <SuccessMessage />
      ) : (
        <PilotNotice + EmailForm />
      )}
    </div>
  </div>
</div>
```

### Waitlist Handler Logic
```text
1. Validate email format
2. Insert into supabase 'waitlist' table
3. If duplicate (23505), still show success
4. Fire confetti burst
5. Set waitlistSuccess = true
```

### No Database Changes Needed
The `waitlist` table already exists with `email (TEXT, UNIQUE)` and has an RLS policy allowing anonymous INSERT.
