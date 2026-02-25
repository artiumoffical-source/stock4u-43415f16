
ALTER TABLE public.gifts
  ADD COLUMN IF NOT EXISTS recipient_full_name text,
  ADD COLUMN IF NOT EXISTS recipient_id text,
  ADD COLUMN IF NOT EXISTS target_broker_name text,
  ADD COLUMN IF NOT EXISTS target_broker_account text,
  ADD COLUMN IF NOT EXISTS kyc_id_url text,
  ADD COLUMN IF NOT EXISTS kyc_broker_conf_url text,
  ADD COLUMN IF NOT EXISTS operational_status text NOT NULL DEFAULT 'Pending';
