
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export const useSecureAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('is_admin_user');
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error('Exception checking admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check admin status when user is authenticated
          const adminStatus = await checkAdminStatus(session.user.id);
          setIsAdmin(adminStatus);
          
          if (!adminStatus) {
            console.log('User is not an admin, redirecting to login');
            await supabase.auth.signOut();
            navigate("/admin-login");
          }
        } else {
          setIsAdmin(false);
          if (window.location.pathname.startsWith('/admin')) {
            navigate("/admin-login");
          }
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const adminStatus = await checkAdminStatus(session.user.id);
        setIsAdmin(adminStatus);
        
        if (!adminStatus) {
          console.log('User is not an admin, signing out');
          await supabase.auth.signOut();
          navigate("/admin-login");
        }
      } else {
        setIsAdmin(false);
        if (window.location.pathname.startsWith('/admin')) {
          navigate("/admin-login");
        }
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      navigate("/");
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return { 
    user, 
    session, 
    isAdmin, 
    isAuthenticated: !!session && isAdmin, 
    isLoading, 
    logout 
  };
};
