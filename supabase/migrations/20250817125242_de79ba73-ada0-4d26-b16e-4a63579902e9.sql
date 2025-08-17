-- Drop existing policies first
DROP POLICY IF EXISTS "Allow public to insert orders" ON public.orders;

-- Create fresh policy
CREATE POLICY "Enable public access for gift orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);