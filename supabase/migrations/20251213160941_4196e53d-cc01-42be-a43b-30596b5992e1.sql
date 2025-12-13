-- Add selected_card column to orders table
ALTER TABLE public.orders 
ADD COLUMN selected_card text DEFAULT 'lightblue';