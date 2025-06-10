
import { useSecureAdminAuth } from "./useSecureAdminAuth";

// Wrapper pour maintenir la compatibilité avec l'ancienne interface
export const useAdminAuth = () => {
  const { isAuthenticated, isLoading, logout } = useSecureAdminAuth();
  
  return { 
    isAuthenticated, 
    isLoading, 
    logout 
  };
};
