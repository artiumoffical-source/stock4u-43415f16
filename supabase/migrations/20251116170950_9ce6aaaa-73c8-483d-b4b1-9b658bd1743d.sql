-- Create enum for user roles
create type public.app_role as enum ('admin', 'moderator', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamp with time zone default now() not null,
    unique (user_id, role)
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Only service role can manage user roles
create policy "Service role full access to user_roles"
on public.user_roles
for all
to service_role
using (true)
with check (true);

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Add RLS policies to orders table for admin access
create policy "Admins can view all orders"
on public.orders
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all orders"
on public.orders
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add RLS policies to gift_registrations for admin access
create policy "Admins can view all gift registrations"
on public.gift_registrations
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all gift registrations"
on public.gift_registrations
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Add RLS policies to audit_logs for admin access
create policy "Admins can view all audit logs"
on public.audit_logs
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- Update is_authenticated_admin to use user_roles table
create or replace function public.is_authenticated_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 
    from public.user_roles 
    where user_id = auth.uid() 
      and role = 'admin'
  )
$$;