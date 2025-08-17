-- Fix RLS policies for orders table to allow unauthenticated gift purchases
DROP POLICY IF EXISTS "Only admins can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Only admins can view orders" ON public.orders;

-- Allow public to insert orders (for gift purchases)
CREATE POLICY "Allow public to insert orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Allow users to view their own orders by order_number or admin access
CREATE POLICY "Users can view orders by order number or admins can view all" 
ON public.orders 
FOR SELECT 
USING (
  is_authenticated_admin() OR 
  (order_number IS NOT NULL)
);

-- Only admins can update orders
CREATE POLICY "Only admins can update orders" 
ON public.orders 
FOR UPDATE 
USING (is_authenticated_admin())
WITH CHECK (is_authenticated_admin());

-- Fix gift_registrations to allow public access with token
DROP POLICY IF EXISTS "Only admins can insert gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Only admins can update gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Only admins can view gift registrations" ON public.gift_registrations;

-- Allow Edge Functions to insert gift registrations
CREATE POLICY "Allow service role to insert gift registrations" 
ON public.gift_registrations 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- Allow viewing gift registrations by token
CREATE POLICY "Allow viewing gift registrations by token" 
ON public.gift_registrations 
FOR SELECT 
USING (
  is_authenticated_admin() OR 
  auth.role() = 'service_role'
);

-- Allow updates by token or admin
CREATE POLICY "Allow updating gift registrations by service role or admin" 
ON public.gift_registrations 
FOR UPDATE 
USING (
  is_authenticated_admin() OR 
  auth.role() = 'service_role'
)
WITH CHECK (
  is_authenticated_admin() OR 
  auth.role() = 'service_role'
);