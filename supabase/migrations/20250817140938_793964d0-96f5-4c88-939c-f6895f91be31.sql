-- SECURITY FIX: Block all public access to sensitive tables
-- This prevents unauthorized access to customer data, admin credentials, and audit logs

-- Fix orders table - Block ALL public access
DROP POLICY IF EXISTS "Allow anonymous users to insert orders" ON public.orders;
DROP POLICY IF EXISTS "Allow public read access to orders" ON public.orders;

-- Ensure only service role can access orders (for Edge Functions)
CREATE POLICY "Service role only access to orders" 
ON public.orders 
FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');

-- Fix gift_registrations table - Block ALL public access
DROP POLICY IF EXISTS "Allow public read access to gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Allow anonymous users to insert gift registrations" ON public.gift_registrations;

-- Ensure only service role can access gift registrations
CREATE POLICY "Service role only access to gift registrations" 
ON public.gift_registrations 
FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');

-- Fix admin_users table - Block ALL public access (already has service role policies)
DROP POLICY IF EXISTS "Allow public read access to admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow anonymous users to create admin users" ON public.admin_users;

-- Fix audit_logs table - Block ALL public access
DROP POLICY IF EXISTS "Allow public read access to audit logs" ON public.audit_logs;

-- Ensure only service role can read audit logs (logs are insert-only via triggers)
CREATE POLICY "Service role only read access to audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (auth.role() = 'service_role');

-- Verify RLS is enabled on all critical tables
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gift_registrations ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;