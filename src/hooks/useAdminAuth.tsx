
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem("adminAuth");
      
      if (adminAuth === "true") {
        setIsAuthenticated(true);
      } else {
        // Rediriger automatiquement vers la page d'authentification admin
        setIsAuthenticated(false);
        navigate("/auth-admin");
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    navigate("/");
  };

  return { isAuthenticated, isLoading, logout };
};
