
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
        // Ne plus rediriger automatiquement - l'utilisateur doit connaître l'URL
        setIsAuthenticated(false);
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
