-- EMERGENCY SECURITY FIX: Remove admin user with plaintext password
DELETE FROM public.admin_users WHERE username = 'artiu0004' AND password_hash = '1234qwer';

-- Add constraint to prevent plaintext passwords (they should be at least 60 chars for bcrypt)
ALTER TABLE public.admin_users 
ADD CONSTRAINT password_must_be_hashed 
CHECK (length(password_hash) >= 60);

-- Configure shorter OTP expiry (5 minutes instead of default)
-- Update auth configuration for better security
UPDATE auth.config 
SET 
  security_otp_expiry = 300,  -- 5 minutes in seconds
  security_max_password_length = 72,
  security_min_password_length = 8
WHERE true;

-- Add audit logging trigger for admin_users changes
CREATE OR REPLACE FUNCTION public.audit_admin_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Log any changes to admin_users table
  INSERT INTO public.admin_audit_log (
    admin_id, 
    action, 
    changed_at,
    old_data,
    new_data
  ) VALUES (
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    now(),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN row_to_json(NEW) ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID,
  action TEXT NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  old_data JSONB,
  new_data JSONB
);

-- Add RLS to audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.admin_audit_log
FOR SELECT
USING (public.is_authenticated_admin());

-- Create trigger for audit logging
DROP TRIGGER IF EXISTS audit_admin_changes_trigger ON public.admin_users;
CREATE TRIGGER audit_admin_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.audit_admin_changes();