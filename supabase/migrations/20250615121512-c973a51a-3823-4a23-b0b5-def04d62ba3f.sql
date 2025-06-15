
-- Phase 1: Implement proper admin authentication and RLS policies

-- First, let's secure the admin authentication by creating proper admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id)
);

-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create admin check function (security definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.is_admin_user(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid 
    AND is_active = true
  );
$$;

-- Enable RLS on all sensitive tables that currently don't have it
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies for sensitive data
CREATE POLICY "Admin can view all registrations" 
ON public.registrations 
FOR SELECT 
TO authenticated 
USING (public.is_admin_user());

CREATE POLICY "Admin can view all contact messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (public.is_admin_user());

CREATE POLICY "Admin can view all feedback" 
ON public.feedback 
FOR SELECT 
TO authenticated 
USING (public.is_admin_user());

CREATE POLICY "Admin can view all team submissions" 
ON public.team_submissions 
FOR SELECT 
TO authenticated 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage teams" 
ON public.teams 
FOR ALL 
TO authenticated 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage team members" 
ON public.team_members 
FOR ALL 
TO authenticated 
USING (public.is_admin_user());

-- Allow public insert for registrations, contact messages, feedback, and team submissions
CREATE POLICY "Public can create registrations" 
ON public.registrations 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Public can create contact messages" 
ON public.contact_messages 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Public can create feedback" 
ON public.feedback 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Public can create team submissions" 
ON public.team_submissions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Admin users table policies
CREATE POLICY "Admin can view admin users" 
ON public.admin_users 
FOR SELECT 
TO authenticated 
USING (public.is_admin_user());

CREATE POLICY "Admin can manage admin users" 
ON public.admin_users 
FOR ALL 
TO authenticated 
USING (public.is_admin_user());

-- Create audit log table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) NOT NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view audit log" 
ON public.admin_audit_log 
FOR SELECT 
TO authenticated 
USING (public.is_admin_user());

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  action_type TEXT,
  table_name TEXT DEFAULT NULL,
  record_id UUID DEFAULT NULL,
  changes JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO public.admin_audit_log (admin_user_id, action, table_name, record_id, changes)
  VALUES (auth.uid(), action_type, table_name, record_id, changes);
$$;
