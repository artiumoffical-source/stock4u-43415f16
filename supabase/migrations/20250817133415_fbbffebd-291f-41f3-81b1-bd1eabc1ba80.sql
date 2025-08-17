-- Let's drop ALL policies that use the function and recreate them
-- First, let's check what policies exist on gift_registrations that use the function
DROP POLICY IF EXISTS "Allow viewing gift registrations by token" ON public.gift_registrations;
DROP POLICY IF EXISTS "Allow updating gift registrations by service role or admin" ON public.gift_registrations;

-- Create simpler policies for gift_registrations
CREATE POLICY "Allow service role full access to gift registrations" 
ON public.gift_registrations 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');