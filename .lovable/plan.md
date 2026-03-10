

## Problem

The Alpaca account takes ~60 seconds to become `ACTIVE`, but the Edge Function only polls for 6 seconds (3 × 2s). After that, it returns `giftSent: false` and **never retries the journal transfer**. When the account activates a minute later, nothing triggers the funding.

## Solution: Two-Phase Approach

### Phase 1: Increase polling in the Edge Function
- Increase to **15 polls × 4 seconds = 60 seconds** total wait time. This covers the typical activation delay.
- Edge Functions have a ~150s timeout on Supabase, so 60s polling is safe.

### Phase 2: Create a separate retry Edge Function
- New function `retry-gift-funding` that can be called manually or via a cron/webhook.
- It queries `alpaca_onboarding` for records with status `SUBMITTED` (not yet `FUNDED`), checks their Alpaca account status, and attempts the journal transfer for any that are now `ACTIVE`.
- This handles edge cases where even 60s isn't enough.

### Changes

**File: `supabase/functions/create-and-fund-gift/index.ts`**
- Change `MAX_POLLS` from `3` to `15`
- Change `POLL_INTERVAL_MS` from `2000` to `4000`
- Save the `giftId` in the `alpaca_onboarding` insert so the retry function knows which gift to fund

**File: `supabase/functions/retry-gift-funding/index.ts`** (new)
- Query `alpaca_onboarding` where `status = 'SUBMITTED'`
- For each, check Alpaca account status
- If `ACTIVE`, execute the journal transfer using the gift amount from the `gifts` table
- Update `alpaca_onboarding` status to `FUNDED` on success

**Database migration:**
- Add `gift_id` column (uuid, nullable) to `alpaca_onboarding` table to link onboarding records to gifts

This ensures the money gets deposited even if activation takes longer than expected.

