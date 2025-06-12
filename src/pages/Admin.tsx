
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { registrationStore } from "@/lib/registration-store";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { LogOut, Star, MessageCircle, Users2, FileText, ExternalLink, Github } from "lucide-react";

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
  
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [teamSubmissions, setTeamSubmissions] = useState<TeamSubmission[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");
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
          setFilteredRegistrations(regData || []);
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

  useEffect(() => {
    // Filter registrations based on search query and track filter
    let filtered = [...registrations];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.first_name?.toLowerCase().includes(query) || 
        reg.last_name?.toLowerCase().includes(query) || 
        reg.email?.toLowerCase().includes(query) ||
        reg.university?.toLowerCase().includes(query)
      );
    }
    
    if (trackFilter !== "all") {
      filtered = filtered.filter(reg => reg.track === trackFilter);
    }
    
    setFilteredRegistrations(filtered);
  }, [searchQuery, trackFilter, registrations]);

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

  const calculateFeedbackStats = () => {
    if (feedbacks.length === 0) return null;

    const ratings = {
      organization: feedbacks.reduce((sum, f) => sum + f.organization_rating, 0) / feedbacks.length,
      content: feedbacks.reduce((sum, f) => sum + f.content_rating, 0) / feedbacks.length,
      mentorship: feedbacks.reduce((sum, f) => sum + f.mentorship_rating, 0) / feedbacks.length,
      logistics: feedbacks.reduce((sum, f) => sum + f.logistics_rating, 0) / feedbacks.length,
      overall: feedbacks.reduce((sum, f) => sum + f.overall_rating, 0) / feedbacks.length,
    };

    return ratings;
  };

  const feedbackStats = calculateFeedbackStats();

  const ratingData = feedbackStats ? [
    { category: 'Organisation', note: Math.round(feedbackStats.organization * 10) / 10 },
    { category: 'Contenu', note: Math.round(feedbackStats.content * 10) / 10 },
    { category: 'Mentorat', note: Math.round(feedbackStats.mentorship * 10) / 10 },
    { category: 'Logistique', note: Math.round(feedbackStats.logistics * 10) / 10 },
    { category: 'Global', note: Math.round(feedbackStats.overall * 10) / 10 },
  ] : [];

  // Si l'utilisateur n'est pas authentifié ou en cours de chargement, ne rien afficher
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Vérification des permissions...</p>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500 mb-1">Total Inscriptions</div>
                  <div className="text-3xl font-bold">{registrations.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500 mb-1">Soumissions</div>
                  <div className="text-3xl font-bold">{teamSubmissions.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500 mb-1">Messages reçus</div>
                  <div className="text-3xl font-bold">{contactMessages.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-gray-500 mb-1">Feedbacks</div>
                  <div className="text-3xl font-bold">{feedbacks.length}</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inscriptions quotidiennes</CardTitle>
                </CardHeader>
                <CardContent>
                  {dailyRegistrations.length > 0 && (
                    <LineChart
                      data={dailyRegistrations}
                      index="date"
                      categories={["count"]}
                      colors={["blue"]}
                      valueFormatter={(value) => `${value} inscriptions`}
                      className="h-72"
                    />
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distribution par catégorie</CardTitle>
                </CardHeader>
                <CardContent>
                  {trackDistribution.length > 0 && (
                    <BarChart
                      data={trackDistribution}
                      index="track"
                      categories={["count"]}
                      colors={["blue"]}
                      valueFormatter={(value) => `${value}`}
                      className="h-72"
                    />
                  )}
                </CardContent>
              </Card>
              
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Statistiques des équipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-md border">
                      <div className="text-sm font-medium text-gray-500 mb-1">Participants solo</div>
                      <div className="text-2xl font-bold">{teamStats.solo}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {registrations.length > 0 ? Math.round((teamStats.solo / registrations.length) * 100) : 0}% du total
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border">
                      <div className="text-sm font-medium text-gray-500 mb-1">Cherchent une équipe</div>
                      <div className="text-2xl font-bold">{teamStats.joinTeam}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {registrations.length > 0 ? Math.round((teamStats.joinTeam / registrations.length) * 100) : 0}% du total
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border">
                      <div className="text-sm font-medium text-gray-500 mb-1">Ont déjà une équipe</div>
                      <div className="text-2xl font-bold">{teamStats.haveTeam}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {registrations.length > 0 ? Math.round((teamStats.haveTeam / registrations.length) * 100) : 0}% du total
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Registrations Tab */}
          <TabsContent value="registrations">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                  <Input
                    placeholder="Rechercher par nom, email, université..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filtrer par catégorie</label>
                  <Select value={trackFilter} onValueChange={setTrackFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                      <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="sustainability">Sustainability</SelectItem>
                      <SelectItem value="edtech">EdTech</SelectItem>
                      <SelectItem value="open">Open Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Registrations List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {dataLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Chargement des inscriptions...
                </div>
              ) : filteredRegistrations.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Université</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Catégorie</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Équipe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{reg.first_name} {reg.last_name}</td>
                          <td className="py-3 px-4">{reg.email}</td>
                          <td className="py-3 px-4">{reg.university}</td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{getTrackName(reg.track)}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            {reg.team_preference === "solo" && "Solo"}
                            {reg.team_preference === "join-team" && "Cherche"}
                            {reg.team_preference === "have-team" && (reg.team_name || "Équipe")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  {registrations.length === 0 ? "Aucune inscription pour l'instant" : "Aucune inscription correspondant aux critères"}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Soumissions d'équipes ({teamSubmissions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dataLoading ? (
                    <div className="p-8 text-center text-gray-500">
                      Chargement des soumissions...
                    </div>
                  ) : teamSubmissions.length > 0 ? (
                    <div className="grid gap-6">
                      {teamSubmissions.map((submission) => {
                        const date = new Date(submission.submitted_at);
                        const formattedDate = `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
                        
                        return (
                          <Card key={submission.id} className="border">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold mb-1">{submission.project_title}</h3>
                                  <p className="text-gray-600">Équipe: {submission.team_name}</p>
                                  <Badge variant="secondary" className="mt-1">
                                    {getTrackName(submission.track)}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-500">
                                  Soumis le {formattedDate}
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Description du projet</h4>
                                  <p className="text-gray-700 bg-gray-50 p-3 rounded">
                                    {submission.project_description}
                                  </p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium mb-2">Membres de l'équipe</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {submission.team_members.map((member, index) => (
                                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                                        <Users2 className="w-3 h-3" />
                                        {member}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-3">
                                  {submission.github_link && (
                                    <a 
                                      href={submission.github_link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                    >
                                      <Github className="w-4 h-4" />
                                      Code source
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  
                                  {submission.demo_link && (
                                    <a 
                                      href={submission.demo_link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-green-600 hover:text-green-800"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Démo live
                                    </a>
                                  )}
                                  
                                  {submission.presentation_url && (
                                    <a 
                                      href={submission.presentation_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                                    >
                                      <FileText className="w-4 h-4" />
                                      Présentation
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucune soumission pour l'instant</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {dataLoading ? (
                <div className="p-8 text-center text-gray-500">
                  Chargement des messages...
                </div>
              ) : contactMessages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Sujet</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactMessages.map((msg) => {
                        const date = new Date(msg.created_at);
                        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                        
                        return (
                          <tr key={msg.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 whitespace-nowrap">{formattedDate}</td>
                            <td className="py-3 px-4">{msg.name}</td>
                            <td className="py-3 px-4">{msg.email}</td>
                            <td className="py-3 px-4">{msg.subject}</td>
                            <td className="py-3 px-4">
                              <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                                {msg.message}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  Aucun message pour l'instant
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-6">
              {/* Statistiques visuelles des feedbacks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Notes moyennes par catégorie
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {ratingData.length > 0 ? (
                      <BarChart
                        data={ratingData}
                        index="category"
                        categories={["note"]}
                        colors={["#f59e0b"]}
                        valueFormatter={(value) => `${value}/10`}
                        className="h-64"
                      />
                    ) : (
                      <p className="text-center text-gray-500 py-8">Aucune donnée de feedback disponible</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      Résumé des feedbacks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{feedbacks.length}</div>
                        <div className="text-sm text-gray-600">Feedbacks reçus</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-2xl font-bold text-yellow-600">
                          {feedbackStats ? Math.round(feedbackStats.overall * 10) / 10 : 'N/A'}
                        </div>
                        <div className="text-sm text-gray-600">Note globale moyenne</div>
                      </div>
                    </div>
                    
                    {feedbackStats && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Organisation</span>
                          <span className="font-medium">{Math.round(feedbackStats.organization * 10) / 10}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Contenu</span>
                          <span className="font-medium">{Math.round(feedbackStats.content * 10) / 10}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Mentorat</span>
                          <span className="font-medium">{Math.round(feedbackStats.mentorship * 10) / 10}/10</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Logistique</span>
                          <span className="font-medium">{Math.round(feedbackStats.logistics * 10) / 10}/10</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Cartes de feedbacks individuels */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedbacks détaillés</CardTitle>
                </CardHeader>
                <CardContent>
                  {dataLoading ? (
                    <div className="p-8 text-center text-gray-500">
                      Chargement des feedbacks...
                    </div>
                  ) : feedbacks.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {feedbacks.map((feedback) => {
                        const date = new Date(feedback.created_at);
                        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                        
                        return (
                          <Card key={feedback.id} className="border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium">
                                    {feedback.name || 'Anonyme'}
                                  </h4>
                                  {feedback.email && (
                                    <p className="text-sm text-gray-500">{feedback.email}</p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 mb-1">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-bold">{feedback.overall_rating}/10</span>
                                  </div>
                                  <p className="text-xs text-gray-500">{formattedDate}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-xs">
                                <div className="bg-gray-50 p-2 rounded text-center">
                                  <div className="font-medium">{feedback.organization_rating}/10</div>
                                  <div className="text-gray-600">Organisation</div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded text-center">
                                  <div className="font-medium">{feedback.content_rating}/10</div>
                                  <div className="text-gray-600">Contenu</div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded text-center">
                                  <div className="font-medium">{feedback.mentorship_rating}/10</div>
                                  <div className="text-gray-600">Mentorat</div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded text-center">
                                  <div className="font-medium">{feedback.logistics_rating}/10</div>
                                  <div className="text-gray-600">Logistique</div>
                                </div>
                              </div>
                              
                              {feedback.comments && (
                                <div className="mb-2">
                                  <h5 className="text-sm font-medium text-gray-700 mb-1">Commentaires:</h5>
                                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {feedback.comments}
                                  </p>
                                </div>
                              )}
                              
                              {feedback.improvement_suggestions && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-700 mb-1">Suggestions d'amélioration:</h5>
                                  <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                                    {feedback.improvement_suggestions}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucun feedback pour l'instant</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Presentations Tab */}
          <TabsContent value="presentations">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Gestion des présentations</h3>
              <p className="mb-4 text-gray-600">
                Cette section est réservée aux organisateurs. Ici, vous pouvez gérer les présentations qui seront projetées lors du hackathon.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h4 className="font-medium mb-2">Administration des présentations</h4>
                  <p className="text-gray-600 mb-4">
                    Téléchargez, modifiez ou supprimez les présentations pour le hackathon :
                  </p>
                  <div>
                    <Link to="/organizer-presentation" className="text-primary hover:underline">
                      <Button variant="default" className="w-full md:w-auto">Gérer les présentations</Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-medium mb-2">Vue publique des présentations</h4>
                  <p className="text-gray-600 mb-4">
                    Consultez la page de présentation telle que les participants la verront :
                  </p>
                  <div>
                    <Link to="/presentations" className="text-primary hover:underline">
                      <Button variant="outline" className="w-full md:w-auto">Voir la page publique</Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
                <p className="text-amber-800 text-sm">
                  Note : Les participants peuvent consulter les présentations, mais seuls les organisateurs peuvent les modifier.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
