-- Enable RLS on orders table if not already enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to recreate them properly
DROP POLICY IF EXISTS "Service role can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Service role can read orders" ON public.orders;
DROP POLICY IF EXISTS "Service role can update orders" ON public.orders;
DROP POLICY IF EXISTS "Service role only access to orders" ON public.orders;

-- Create comprehensive RLS policies for orders table
-- Allow service role full access (needed for edge functions)
CREATE POLICY "Service role full access to orders" 
ON public.orders 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Block all public access - no policies for anon or authenticated users
-- This ensures only service role can access orders data

-- Enable RLS on gift_registrations table
ALTER TABLE public.gift_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on gift_registrations
DROP POLICY IF EXISTS "Allow service role to insert gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Allow service role full access to gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Service role only access to gift registrations" ON public.gift_registrations;

-- Create proper RLS policy for gift_registrations
CREATE POLICY "Service role full access to gift_registrations" 
ON public.gift_registrations 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on admin_users
DROP POLICY IF EXISTS "Service role can read for authentication" ON public.admin_users;
DROP POLICY IF EXISTS "Service role can manage admin users" ON public.admin_users;

-- Create proper RLS policy for admin_users
CREATE POLICY "Service role full access to admin_users" 
ON public.admin_users 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Enable RLS on audit_logs table
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies on audit_logs
DROP POLICY IF EXISTS "Service role can view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Service role only read access to audit logs" ON public.audit_logs;

-- Create proper RLS policy for audit_logs
CREATE POLICY "Service role full access to audit_logs" 
ON public.audit_logs 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);