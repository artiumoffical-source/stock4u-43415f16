-- Grant execute permissions to all roles that need it
GRANT EXECUTE ON FUNCTION public.is_authenticated_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_authenticated_admin() TO anon;
GRANT EXECUTE ON FUNCTION public.is_authenticated_admin() TO service_role;