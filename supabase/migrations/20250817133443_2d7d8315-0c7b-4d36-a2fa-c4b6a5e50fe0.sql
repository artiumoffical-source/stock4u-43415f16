-- Fix admin_users policies
DROP POLICY IF EXISTS "Admins can update login data" ON public.admin_users;
DROP POLICY IF EXISTS "Authenticated admins can read admin users" ON public.admin_users;

-- Create simpler admin policies that work
CREATE POLICY "Service role can manage admin users" 
ON public.admin_users 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Fix audit_logs policy
DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;

CREATE POLICY "Service role can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (auth.role() = 'service_role');