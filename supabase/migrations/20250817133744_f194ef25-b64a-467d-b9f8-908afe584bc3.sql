-- CRITICAL SECURITY FIX: Remove public access to orders table
-- Drop the overly permissive policies that expose customer data
DROP POLICY IF EXISTS "Allow all inserts to orders" ON public.orders;
DROP POLICY IF EXISTS "Allow viewing all orders" ON public.orders; 
DROP POLICY IF EXISTS "Allow all updates to orders" ON public.orders;

-- Create secure policies that protect customer data
-- Only service role (Edge Functions) can insert orders
CREATE POLICY "Service role can insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- Only service role can read orders (for email functions and admin operations)
CREATE POLICY "Service role can read orders" 
ON public.orders 
FOR SELECT 
USING (auth.role() = 'service_role');

-- Only service role can update orders (for status changes)
CREATE POLICY "Service role can update orders" 
ON public.orders 
FOR UPDATE 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');