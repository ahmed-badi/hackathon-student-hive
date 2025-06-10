
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AdminSession {
  token: string;
  expiresAt: string;
}

export const useSecureAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AdminSession | null>(null);
  const navigate = useNavigate();

  const validateSession = useCallback(async (token: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-session', {
        body: { action: 'validate', token }
      });

      if (error || !data.valid) {
        localStorage.removeItem('adminSession');
        setSession(null);
        setIsAuthenticated(false);
        return false;
      }

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error validating session:', error);
      localStorage.removeItem('adminSession');
      setSession(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    
    const storedSession = localStorage.getItem('adminSession');
    
    if (!storedSession) {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate("/admin-auth");
      return;
    }

    try {
      const sessionData: AdminSession = JSON.parse(storedSession);
      
      // Vérifier si la session n'est pas expirée côté client
      if (new Date(sessionData.expiresAt) <= new Date()) {
        localStorage.removeItem('adminSession');
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate("/admin-auth");
        return;
      }

      // Valider la session côté serveur
      const isValid = await validateSession(sessionData.token);
      
      if (isValid) {
        setSession(sessionData);
        setIsAuthenticated(true);
      } else {
        navigate("/admin-auth");
      }
    } catch (error) {
      console.error('Error parsing session data:', error);
      localStorage.removeItem('adminSession');
      setIsAuthenticated(false);
      navigate("/admin-auth");
    }
    
    setIsLoading(false);
  }, [navigate, validateSession]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-session', {
        body: { action: 'login', password }
      });

      if (error || !data.success) {
        throw new Error(data?.error || 'Erreur de connexion');
      }

      const sessionData: AdminSession = {
        token: data.token,
        expiresAt: data.expiresAt
      };

      localStorage.setItem('adminSession', JSON.stringify(sessionData));
      setSession(sessionData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur de connexion' 
      };
    }
  };

  const logout = async () => {
    if (session) {
      try {
        await supabase.functions.invoke('admin-session', {
          body: { action: 'logout', token: session.token }
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }

    localStorage.removeItem('adminSession');
    setSession(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const getAuthToken = () => session?.token || null;

  return { 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    getAuthToken,
    session 
  };
};
