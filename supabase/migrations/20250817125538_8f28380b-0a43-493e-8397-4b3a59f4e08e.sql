-- Drop and recreate the function with proper permissions
DROP FUNCTION IF EXISTS public.is_authenticated_admin();

-- Create the function again with proper grants
CREATE OR REPLACE FUNCTION public.is_authenticated_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE id = auth.uid()
  );
$$;

-- Grant execute permissions to authenticated and anon roles
GRANT EXECUTE ON FUNCTION public.is_authenticated_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_authenticated_admin() TO anon;