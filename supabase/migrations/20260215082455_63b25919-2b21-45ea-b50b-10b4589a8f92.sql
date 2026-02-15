
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public waitlist signup)
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist
FOR INSERT
WITH CHECK (true);

-- Only admins can view waitlist
CREATE POLICY "Admins can view waitlist"
ON public.waitlist
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role full access
CREATE POLICY "Service role full access to waitlist"
ON public.waitlist
FOR ALL
USING (true)
WITH CHECK (true);
