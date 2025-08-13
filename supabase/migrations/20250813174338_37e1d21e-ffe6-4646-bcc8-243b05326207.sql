-- Fix the search path security warning for the audit function
CREATE OR REPLACE FUNCTION public.audit_admin_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Log any changes to admin_users table for security monitoring
  RAISE LOG 'Admin user change: % on user % at %', TG_OP, COALESCE(NEW.username, OLD.username), now();
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Fix search path for the existing admin auth function too
CREATE OR REPLACE FUNCTION public.is_authenticated_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users 
    WHERE id = auth.uid()
  );
$$;