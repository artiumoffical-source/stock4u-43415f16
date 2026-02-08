-- Create a simplified gifts table
CREATE TABLE public.gifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Gift items (multiple stocks with amounts)
  gift_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount NUMERIC NOT NULL,
  
  -- Sender info
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  
  -- Recipient info
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT,
  recipient_email TEXT NOT NULL,
  
  -- Delivery settings
  delivery_method TEXT NOT NULL DEFAULT 'email' CHECK (delivery_method IN ('email', 'whatsapp')),
  delivery_timing TEXT NOT NULL DEFAULT 'now' CHECK (delivery_timing IN ('now', 'scheduled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  
  -- Payment info (secure - only last 4 digits)
  card_last_four TEXT,
  cardholder_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_payment', 'paid', 'delivered', 'cancelled')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role full access to gifts"
  ON public.gifts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Admins can view all gifts
CREATE POLICY "Admins can view all gifts"
  ON public.gifts
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update all gifts
CREATE POLICY "Admins can update all gifts"
  ON public.gifts
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger
CREATE TRIGGER update_gifts_updated_at
  BEFORE UPDATE ON public.gifts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add audit trigger for gifts
CREATE OR REPLACE FUNCTION public.audit_gift_changes()
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
    details,
    created_at
  ) VALUES (
    TG_OP,
    'gifts',
    COALESCE(NEW.id::TEXT, OLD.id::TEXT),
    jsonb_build_object(
      'recipient_email', COALESCE(NEW.recipient_email, OLD.recipient_email),
      'old_status', OLD.status,
      'new_status', NEW.status,
      'total_amount', COALESCE(NEW.total_amount, OLD.total_amount)
    ),
    now()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE TRIGGER audit_gifts_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.gifts
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_gift_changes();

-- Add index for common queries
CREATE INDEX idx_gifts_status ON public.gifts(status);
CREATE INDEX idx_gifts_sender_email ON public.gifts(sender_email);
CREATE INDEX idx_gifts_recipient_email ON public.gifts(recipient_email);
CREATE INDEX idx_gifts_created_at ON public.gifts(created_at DESC);