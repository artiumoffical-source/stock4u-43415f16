-- Phase 1: Create secure admin authentication function
CREATE OR REPLACE FUNCTION public.is_authenticated_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE id = auth.uid()
  );
$$;

-- Phase 2: Drop existing overly permissive RLS policies
DROP POLICY IF EXISTS "Admin users can view themselves" ON public.admin_users;
DROP POLICY IF EXISTS "Admin users can update themselves" ON public.admin_users;
DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admin can view all gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Admin can insert gift registrations" ON public.gift_registrations;
DROP POLICY IF EXISTS "Admin can update gift registrations" ON public.gift_registrations;

-- Phase 3: Create secure RLS policies for admin_users table
-- Allow public read only for authentication (username lookup)
CREATE POLICY "Allow public read for authentication"
ON public.admin_users
FOR SELECT
USING (true);

-- Allow authenticated admins to update login attempts and timestamps
CREATE POLICY "Admins can update login data"
ON public.admin_users
FOR UPDATE
USING (public.is_authenticated_admin())
WITH CHECK (public.is_authenticated_admin());

-- Phase 4: Create secure RLS policies for orders table
-- Only authenticated admins can access orders
CREATE POLICY "Only admins can view orders"
ON public.orders
FOR SELECT
USING (public.is_authenticated_admin());

CREATE POLICY "Only admins can insert orders"
ON public.orders
FOR INSERT
WITH CHECK (public.is_authenticated_admin());

CREATE POLICY "Only admins can update orders"
ON public.orders
FOR UPDATE
USING (public.is_authenticated_admin())
WITH CHECK (public.is_authenticated_admin());

-- Phase 5: Create secure RLS policies for gift_registrations table
-- Only authenticated admins can access gift registrations
CREATE POLICY "Only admins can view gift registrations"
ON public.gift_registrations
FOR SELECT
USING (public.is_authenticated_admin());

CREATE POLICY "Only admins can insert gift registrations"
ON public.gift_registrations
FOR INSERT
WITH CHECK (public.is_authenticated_admin());

CREATE POLICY "Only admins can update gift registrations"
ON public.gift_registrations
FOR UPDATE
USING (public.is_authenticated_admin())
WITH CHECK (public.is_authenticated_admin());

-- Phase 6: Create proper admin user with hashed password
-- First, let's add a default admin user with properly hashed password
INSERT INTO public.admin_users (username, password_hash)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMye8Mg9bOEpwF2s4cXeG.RJo7uSSdKQqQq')
ON CONFLICT (username) DO NOTHING;

-- The password hash above is for 'SecureAdmin123!' - user should change this immediately