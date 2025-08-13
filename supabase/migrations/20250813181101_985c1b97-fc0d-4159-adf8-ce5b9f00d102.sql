-- Enhanced audit logging for admin actions and gift registrations

-- Create audit log table for comprehensive tracking
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(255),
  user_id UUID,
  user_type VARCHAR(20) DEFAULT 'user',
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access to audit logs
CREATE POLICY "Admins can view all audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (is_authenticated_admin());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

-- Enhanced audit function for admin activities
CREATE OR REPLACE FUNCTION public.audit_admin_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Log admin user changes with more details
  INSERT INTO public.audit_logs (
    action,
    entity_type,
    entity_id,
    user_id,
    user_type,
    details,
    created_at
  ) VALUES (
    TG_OP,
    'admin_users',
    COALESCE(NEW.id::TEXT, OLD.id::TEXT),
    auth.uid(),
    'admin',
    jsonb_build_object(
      'username', COALESCE(NEW.username, OLD.username),
      'old_failed_attempts', OLD.failed_attempts,
      'new_failed_attempts', NEW.failed_attempts,
      'locked_until', COALESCE(NEW.locked_until, OLD.locked_until)
    ),
    now()
  );
  
  RAISE LOG 'Admin activity logged: % on user % at %', TG_OP, COALESCE(NEW.username, OLD.username), now();
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update the existing audit trigger
DROP TRIGGER IF EXISTS audit_admin_changes_trigger ON public.admin_users;
CREATE TRIGGER audit_admin_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.audit_admin_activity();

-- Create trigger for gift registration audit logging
CREATE OR REPLACE FUNCTION public.audit_gift_registration()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (
    action,
    entity_type,
    entity_id,
    details,
    created_at
  ) VALUES (
    TG_OP,
    'gift_registrations',
    COALESCE(NEW.id::TEXT, OLD.id::TEXT),
    jsonb_build_object(
      'token', COALESCE(NEW.token, OLD.token),
      'recipient_email', COALESCE(NEW.recipient_email, OLD.recipient_email),
      'old_status', OLD.registration_status,
      'new_status', NEW.registration_status,
      'order_id', COALESCE(NEW.order_id, OLD.order_id)
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for gift registration changes
CREATE TRIGGER audit_gift_registration_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.gift_registrations
  FOR EACH ROW EXECUTE FUNCTION public.audit_gift_registration();

-- Create trigger for order changes audit logging
CREATE OR REPLACE FUNCTION public.audit_order_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (
    action,
    entity_type,
    entity_id,
    user_id,
    user_type,
    details,
    created_at
  ) VALUES (
    TG_OP,
    'orders',
    COALESCE(NEW.id::TEXT, OLD.id::TEXT),
    auth.uid(),
    CASE 
      WHEN is_authenticated_admin() THEN 'admin'
      ELSE 'user'
    END,
    jsonb_build_object(
      'order_number', COALESCE(NEW.order_number, OLD.order_number),
      'old_status', OLD.status,
      'new_status', NEW.status,
      'old_payment_status', OLD.payment_status,
      'new_payment_status', NEW.payment_status,
      'total_amount', COALESCE(NEW.total_amount, OLD.total_amount)
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for order changes
CREATE TRIGGER audit_order_changes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.audit_order_changes();