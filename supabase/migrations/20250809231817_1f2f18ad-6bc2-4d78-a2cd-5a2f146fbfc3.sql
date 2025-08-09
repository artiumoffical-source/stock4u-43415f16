-- Update admin user with correct credentials
UPDATE public.admin_users 
SET password_hash = '1234qwer'  -- Simple password storage for demo
WHERE username = 'artiu0004';

-- If user doesn't exist, insert it
INSERT INTO public.admin_users (username, password_hash) 
SELECT 'artiu0004', '1234qwer'
WHERE NOT EXISTS (SELECT 1 FROM public.admin_users WHERE username = 'artiu0004');