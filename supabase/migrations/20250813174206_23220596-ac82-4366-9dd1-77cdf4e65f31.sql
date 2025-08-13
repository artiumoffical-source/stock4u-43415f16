-- EMERGENCY SECURITY FIX: Remove admin user with plaintext password
DELETE FROM public.admin_users WHERE username = 'artiu0004' AND password_hash = '1234qwer';

-- Add constraint to prevent plaintext passwords (they should be at least 60 chars for bcrypt)
ALTER TABLE public.admin_users 
ADD CONSTRAINT password_must_be_hashed 
CHECK (length(password_hash) >= 60);

-- Add audit logging function for admin_users changes
CREATE OR REPLACE FUNCTION public.audit_admin_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Log any changes to admin_users table for security monitoring
  RAISE LOG 'Admin user change: % on user % at %', TG_OP, COALESCE(NEW.username, OLD.username), now();
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for audit logging
DROP TRIGGER IF EXISTS audit_admin_changes_trigger ON public.admin_users;
CREATE TRIGGER audit_admin_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.audit_admin_changes();