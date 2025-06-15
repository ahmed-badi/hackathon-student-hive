
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Lock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        toast.error("Erreur d'authentification", {
          description: authError.message
        });
        return;
      }

      if (!authData.user) {
        toast.error("Erreur d'authentification", {
          description: "Aucun utilisateur trouvé"
        });
        return;
      }

      // Check if user is an admin
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin_user');
      
      if (adminError) {
        console.error('Error checking admin status:', adminError);
        toast.error("Erreur de vérification", {
          description: "Impossible de vérifier les permissions administrateur"
        });
        return;
      }

      if (!isAdmin) {
        toast.error("Accès refusé", {
          description: "Vous n'avez pas les permissions administrateur"
        });
        // Sign out the user since they're not an admin
        await supabase.auth.signOut();
        return;
      }

      toast.success("Connexion réussie", {
        description: "Vous êtes maintenant connecté en tant qu'administrateur."
      });
      
      navigate("/admin");
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Erreur de connexion", {
        description: "Une erreur inattendue s'est produite"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Accès Administrateur</CardTitle>
          <p className="text-gray-600">
            Cette section est réservée aux organisateurs du hackathon
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hackathon.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
