-- Fix the audit_order_changes function to handle the search_path issue
CREATE OR REPLACE FUNCTION public.audit_order_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
      WHEN auth.uid() IS NULL THEN 'service'
      WHEN public.is_authenticated_admin() THEN 'admin'
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
$function$;