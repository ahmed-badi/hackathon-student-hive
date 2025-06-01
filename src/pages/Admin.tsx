import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, MessageSquare, Trophy, Eye, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalSubmissions: 0,
    totalFeedback: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erreur lors de la déconnexion",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/login");
      toast({
        description: "Déconnexion réussie!",
      });
    }
  };

  const fetchStats = async () => {
    try {
      const { data: registrations, error: registrationsError } = await supabase
        .from('registrations')
        .select('*', { count: 'exact' });

      const { data: submissions, error: submissionsError } = await supabase
        .from('submissions')
        .select('*', { count: 'exact' });

      const { data: feedback, error: feedbackError } = await supabase
        .from('feedback')
        .select('*', { count: 'exact' });

        const { data: contacts, error: contactsError } = await supabase
        .from('contact')
        .select('*', { count: 'exact' });

      if (registrationsError || submissionsError || feedbackError || contactsError) {
        console.error("Erreur lors de la récupération des statistiques:", registrationsError, submissionsError, feedbackError, contactsError);
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération des statistiques.",
          variant: "destructive",
        });
        return;
      }

      setStats({
        totalRegistrations: registrations ? registrations.length : 0,
        totalSubmissions: submissions ? submissions.length : 0,
        totalFeedback: feedback ? feedback.length : 0,
        totalContacts: contacts ? contacts.length : 0,
      });

    } catch (error) {
      console.error("Erreur inattendue lors de la récupération des statistiques:", error);
      toast({
        title: "Erreur",
        description: "Erreur inattendue lors de la récupération des statistiques.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">HackaZZon 2025 - Panel d'administration</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inscriptions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">participants inscrits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soumissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">projets soumis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFeedback}</div>
              <p className="text-xs text-muted-foreground">retours reçus</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Contact</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">messages reçus</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Inscriptions par jour</CardTitle>
              <CardDescription>Évolution des inscriptions au fil du temps</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catégories populaires</CardTitle>
              <CardDescription>Répartition des participants par track</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Inscriptions
              </CardTitle>
              <CardDescription>Gérer les participants inscrits</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/admin/registrations')}>
                Voir les inscriptions
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Soumissions
              </CardTitle>
              <CardDescription>Examiner les projets soumis</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/admin/submissions')}>
                Voir les soumissions
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Feedback
              </CardTitle>
              <CardDescription>Consulter les retours des participants</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/admin/feedback')}>
                Voir le feedback
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Présentations
              </CardTitle>
              <CardDescription>Mode présentation pour le jury</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/organizer-presentation')}>
                Mode présentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="/logos/hackaZZon-logo.png"
                  alt="Logo Hackazzon"
                  className="h-10 w-auto rounded-md bg-primary p-1.5"
                />
                <div className="text-lg font-bold text-white">HackaZZon</div>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Hackathon organisé dans le cadre d'un projet de management de l'ISIMA. Une occasion unique d'innovation et de collaboration entre étudiants.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Événement</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:text-white">À propos</a></li>
                  <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                  <li><a href="/schedule" className="hover:text-white">Programme</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Ressources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/sponsors" className="hover:text-white">Sponsors</a></li>
                  <li><a href="/mentors" className="hover:text-white">Mentors</a></li>
                  <li><a href="/prizes" className="hover:text-white">Prix</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} HackaZZon. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
