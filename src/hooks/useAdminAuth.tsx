
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
        //navigate("/75411000208d793a9b755d7148198e7e718275377700e3adb9eeacf0feb7b17ec802bceb9d3baa893d7c1689229edf83a11ee77485879f1fad7008e5a6ecb51e");
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    navigate("/");
  };

  return { isAuthenticated, isLoading, logout };
};
