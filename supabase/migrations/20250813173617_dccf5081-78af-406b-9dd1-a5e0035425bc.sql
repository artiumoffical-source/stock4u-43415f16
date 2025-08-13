-- Remove the dangerous public read policy for admin_users
DROP POLICY IF EXISTS "Allow public read for authentication" ON public.admin_users;

-- Create a secure policy that only allows service role access for authentication
-- The edge function will use service role key to authenticate, not public access
CREATE POLICY "Service role can read for authentication"
ON public.admin_users
FOR SELECT
USING (auth.role() = 'service_role');

-- Also allow authenticated admins to read admin user data (for admin management features)
CREATE POLICY "Authenticated admins can read admin users"
ON public.admin_users
FOR SELECT
USING (public.is_authenticated_admin());