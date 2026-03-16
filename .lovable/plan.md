

## Step 1 Finalization: Validation, Safety Net & Error Logging

### 1. Database Migration — `profiles` table

Create the `profiles` table with RLS and the `update_updated_at` trigger (which already exists as a function):

```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name text,
  phone text,
  government_id text,
  government_id_synced boolean NOT NULL DEFAULT false,
  alpaca_account_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Service role full access" ON public.profiles
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

### 2. Enhanced Validation in Edge Function

Update `create-and-fund-gift/index.ts` server-side schema:
- **taxId**: Add Israeli ID checksum validation (Luhn-like algorithm) — same logic already in `src/lib/validation.ts`
- **phone**: Validate international format (`+972...` or `05...` pattern)

### 3. Stuck Entries Cleanup — Scheduled Cron

Create a cron job (via SQL insert, not migration) that NULLs any `government_id` older than 24 hours where `government_id_synced = false`. This uses `pg_cron` + `pg_net` extensions:

- Enable `pg_cron` and `pg_net` extensions via migration
- Schedule a direct SQL cron that runs hourly:
  ```sql
  UPDATE public.profiles
  SET government_id = NULL
  WHERE government_id IS NOT NULL
    AND government_id_synced = false
    AND created_at < now() - interval '24 hours';
  ```

### 4. Post-Sync Cleanup in Edge Function

After successful Alpaca account creation in `create-and-fund-gift/index.ts`, upsert the profile row and NULL the `government_id`:

```typescript
// After account created + funded:
await supabase.from('profiles').upsert({
  user_id: authUserId, // will be wired in Step 2
  alpaca_account_id: newAccountId,
  government_id: null,
  government_id_synced: true,
});
```

For now (before auth is wired), store the cleanup logic keyed by `alpaca_account_id` in `alpaca_onboarding` — the profile link will be connected in Step 2.

### 5. Error Logging (without sensitive data)

Add structured error logging in the Edge Function that:
- Logs the `giftId`, `alpaca_account_id`, and error message
- Never logs `taxId` or `government_id`
- Inserts a row into `audit_logs` on failure with `entity_type: 'alpaca_sync'`

### Files to Change

| Action | File |
|--------|------|
| Migration | Create `profiles` table + RLS + trigger |
| Migration | Enable `pg_cron` and `pg_net` extensions |
| SQL Insert | Schedule hourly cleanup cron job |
| Edit | `supabase/functions/create-and-fund-gift/index.ts` — add ID checksum validation, audit logging, profile upsert stub |
| Edit | `supabase/config.toml` — no changes needed (function already registered) |

