
SELECT cron.schedule(
  'cleanup-stale-government-ids',
  '0 * * * *',
  $$
  UPDATE public.profiles
  SET government_id = NULL, updated_at = now()
  WHERE government_id IS NOT NULL
    AND government_id_synced = false
    AND created_at < now() - interval '24 hours';
  $$
);
