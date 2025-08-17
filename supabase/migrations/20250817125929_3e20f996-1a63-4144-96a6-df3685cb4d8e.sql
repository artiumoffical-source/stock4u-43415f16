-- Drop the problematic policies and create simpler ones for gift orders
DROP POLICY IF EXISTS "Enable public access for gift orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view orders by order number or admins can view all" ON public.orders;
DROP POLICY IF EXISTS "Only admins can update orders" ON public.orders;

-- Create simple policies that don't depend on admin functions
CREATE POLICY "Allow all inserts to orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow viewing all orders" 
ON public.orders 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all updates to orders" 
ON public.orders 
FOR UPDATE 
USING (true);