
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LogOut } from "lucide-react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ChartsSection } from "@/components/admin/ChartsSection";
import { RegistrationsTab } from "@/components/admin/RegistrationsTab";
import { SubmissionsTab } from "@/components/admin/SubmissionsTab";
import { MessagesTab } from "@/components/admin/MessagesTab";
import { FeedbackTab } from "@/components/admin/FeedbackTab";
import { PresentationsTab } from "@/components/admin/PresentationsTab";

interface Feedback {
  id: string;
  name: string;
  email: string;
  organization_rating: number;
  content_rating: number;
  mentorship_rating: number;
  logistics_rating: number;
  overall_rating: number;
  comments: string;
  improvement_suggestions: string;
  created_at: string;
}

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
  track: string;
  team_preference: string;
  team_name?: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface TeamSubmission {
  id: string;
  team_name: string;
  project_title: string;
  project_description: string;
  track: string;
  team_members: string[];
  github_link?: string;
  demo_link?: string;
  presentation_url?: string;
  submitted_at: string;
}

const Admin = () => {
  const { isAuthenticated, isLoading: authLoading, logout } = useAdminAuth();
  const navigate = useNavigate();
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [teamSubmissions, setTeamSubmissions] = useState<TeamSubmission[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  const [dailyRegistrations, setDailyRegistrations] = useState<{date: string; count: number}[]>([]);
  const [trackDistribution, setTrackDistribution] = useState<{track: string; count: number}[]>([]);
  const [teamStats, setTeamStats] = useState({
    solo: 0,
    joinTeam: 0,
    haveTeam: 0
  });

  useEffect(() => {
    if (!isAuthenticated || authLoading) {
      return;
    }

    const fetchData = async () => {
      setDataLoading(true);
      try {
        // Fetch registrations
        const { data: regData, error: regError } = await supabase
          .from('registrations')
          .select('*');
        
        if (regError) {
          console.error('Error fetching registrations:', regError);
        } else {
          setRegistrations(regData || []);
          processChartData(regData || []);
        }

        // Fetch feedback
        const { data: feedbackData, error: feedbackError } = await supabase
          .from('feedback')
          .select('*')
          .order('created_at', { ascending: false });

        if (feedbackError) {
          console.error('Error fetching feedback:', feedbackError);
        } else {
          setFeedbacks(feedbackData || []);
        }

        // Fetch contact messages
        const { data: msgData, error: msgError } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (msgError) {
          console.error('Error fetching contact messages:', msgError);
        } else {
          setContactMessages(msgData || []);
        }

        // Fetch team submissions
        const { data: submissionData, error: submissionError } = await supabase
          .from('team_submissions')
          .select('*')
          .order('submitted_at', { ascending: false });
        
        if (submissionError) {
          console.error('Error fetching team submissions:', submissionError);
        } else {
          setTeamSubmissions(submissionData || []);
        }
      } catch (e) {
        console.error('Failed to fetch data:', e);
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated, authLoading]);

  const processChartData = (data: Registration[]) => {
    // Track distribution
    const trackCounts: Record<string, number> = data.reduce((acc: Record<string, number>, reg) => {
      if (reg.track) {
        acc[reg.track] = (acc[reg.track] || 0) + 1;
      }
      return acc;
    }, {});
    
    const trackData = Object.entries(trackCounts).map(([track, count]) => ({
      track: getTrackName(track),
      count
    }));
    
    setTrackDistribution(trackData);
    
    // Daily registration counts
    const dateCount: Record<string, number> = data.reduce((acc: Record<string, number>, reg) => {
      const date = new Date(reg.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    
    // Get the last 7 dates with registrations
    const sortedDates = Object.keys(dateCount).sort();
    const last7Dates = sortedDates.slice(-7);
    
    const dailyData = last7Dates.map(date => ({
      date: formatDate(date),
      count: dateCount[date]
    }));
    
    setDailyRegistrations(dailyData);
    
    // Team preference stats
    const teamPrefs = {
      solo: data.filter(r => r.team_preference === 'solo').length,
      joinTeam: data.filter(r => r.team_preference === 'join-team').length,
      haveTeam: data.filter(r => r.team_preference === 'have-team').length
    };
    
    setTeamStats(teamPrefs);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const getTrackName = (trackId: string): string => {
    const tracks: Record<string, string> = {
      "ai-ml": "AI & ML",
      "web3": "Web3",
      "healthtech": "HealthTech",
      "sustainability": "Sustainability",
      "edtech": "EdTech",
      "open": "Open Innovation"
    };
    return tracks[trackId] || trackId;
  };

  // Si l'utilisateur n'est pas authentifié, afficher un message d'accès refusé
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès refusé</h1>
            <p className="text-gray-600">
              Cette section est réservée aux administrateurs autorisés.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-primary hover:underline"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Gérez les inscriptions et consultez les statistiques du hackathon</p>
          </div>
          <Button 
            variant="outline" 
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="registrations">Inscriptions</TabsTrigger>
            <TabsTrigger value="submissions">Soumissions</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="presentations">Présentations</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <DashboardStats
              registrationsCount={registrations.length}
              submissionsCount={teamSubmissions.length}
              messagesCount={contactMessages.length}
              feedbacksCount={feedbacks.length}
            />
            
            <ChartsSection
              dailyRegistrations={dailyRegistrations}
              trackDistribution={trackDistribution}
              teamStats={teamStats}
              totalRegistrations={registrations.length}
            />
          </TabsContent>
          
          <TabsContent value="registrations">
            <RegistrationsTab 
              registrations={registrations} 
              dataLoading={dataLoading} 
            />
          </TabsContent>

          <TabsContent value="submissions">
            <SubmissionsTab 
              teamSubmissions={teamSubmissions} 
              dataLoading={dataLoading} 
            />
          </TabsContent>
          
          <TabsContent value="messages">
            <MessagesTab 
              contactMessages={contactMessages} 
              dataLoading={dataLoading} 
            />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackTab 
              feedbacks={feedbacks} 
              dataLoading={dataLoading} 
            />
          </TabsContent>

          <TabsContent value="presentations">
            <PresentationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
