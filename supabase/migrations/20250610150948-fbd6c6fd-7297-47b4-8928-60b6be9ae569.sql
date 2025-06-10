
-- Enable Row Level Security on all tables
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_submissions ENABLE ROW LEVEL SECURITY;

-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;

-- Create admin sessions table for secure token management
CREATE TABLE public.admin_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on admin_sessions
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for registrations (public read, admin write)
CREATE POLICY "Anyone can view registrations" 
ON public.registrations FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert registrations" 
ON public.registrations FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update registrations" 
ON public.registrations FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete registrations" 
ON public.registrations FOR DELETE 
USING (public.is_admin());

-- RLS Policies for feedback (anyone can insert, admins can read)
CREATE POLICY "Anyone can submit feedback" 
ON public.feedback FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all feedback" 
ON public.feedback FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update feedback" 
ON public.feedback FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete feedback" 
ON public.feedback FOR DELETE 
USING (public.is_admin());

-- RLS Policies for contact_messages (anyone can insert, admins can read)
CREATE POLICY "Anyone can send contact messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view contact messages" 
ON public.contact_messages FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update contact messages" 
ON public.contact_messages FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete contact messages" 
ON public.contact_messages FOR DELETE 
USING (public.is_admin());

-- RLS Policies for team_submissions (authenticated users can manage own, public read)
CREATE POLICY "Anyone can view team submissions" 
ON public.team_submissions FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create team submissions" 
ON public.team_submissions FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update team submissions" 
ON public.team_submissions FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete team submissions" 
ON public.team_submissions FOR DELETE 
USING (public.is_admin());

-- RLS Policies for user_roles (admins only)
CREATE POLICY "Admins can manage user roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- RLS Policies for admin_sessions (admins only)
CREATE POLICY "Admins can manage their sessions" 
ON public.admin_sessions FOR ALL 
USING (user_id = auth.uid() AND public.is_admin());

-- Function to clean up expired admin sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_admin_sessions()
RETURNS void
LANGUAGE SQL
SECURITY DEFINER
AS $$
  DELETE FROM public.admin_sessions 
  WHERE expires_at < now();
$$;

-- Create a trigger to automatically clean up expired sessions daily
CREATE OR REPLACE FUNCTION public.schedule_session_cleanup()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- This will be called on each session insert to periodically clean up
  IF random() < 0.01 THEN -- 1% chance to run cleanup
    PERFORM public.cleanup_expired_admin_sessions();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER cleanup_sessions_trigger
    AFTER INSERT ON public.admin_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.schedule_session_cleanup();
