-- Add token column to gifts table for redemption links
ALTER TABLE public.gifts
ADD COLUMN IF NOT EXISTS token text UNIQUE;

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_gifts_token ON public.gifts(token);