
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Calendar, TrendingUp } from "lucide-react";

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

interface SubmissionStatsProps {
  submissions: TeamSubmission[];
}

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

export const SubmissionStats = ({ submissions }: SubmissionStatsProps) => {
  const totalSubmissions = submissions.length;
  const totalTeamMembers = submissions.reduce((acc, sub) => acc + sub.team_members.length, 0);
  const averageTeamSize = totalSubmissions > 0 ? Math.round(totalTeamMembers / totalSubmissions * 10) / 10 : 0;
  
  const submissionsWithDemo = submissions.filter(sub => sub.demo_link).length;
  const submissionsWithGithub = submissions.filter(sub => sub.github_link).length;
  
  const trackStats = submissions.reduce((acc, sub) => {
    const trackName = getTrackName(sub.track);
    acc[trackName] = (acc[trackName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularTrack = Object.entries(trackStats).sort((a, b) => b[1] - a[1])[0];

  const today = new Date();
  const todaySubmissions = submissions.filter(sub => {
    const subDate = new Date(sub.submitted_at);
    return subDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Soumissions</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSubmissions}</div>
          <p className="text-xs text-muted-foreground">
            Projets soumis au total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Participants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTeamMembers}</div>
          <p className="text-xs text-muted-foreground">
            Taille moyenne: {averageTeamSize} membres
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todaySubmissions}</div>
          <p className="text-xs text-muted-foreground">
            Nouvelles soumissions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Track Populaire</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostPopularTrack?.[1] || 0}</div>
          <p className="text-xs text-muted-foreground">
            {mostPopularTrack?.[0] || "Aucun"}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Répartition par Track</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(trackStats).map(([track, count]) => (
              <Badge key={track} variant="outline" className="flex items-center gap-1">
                {track}: {count}
              </Badge>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Avec démo live:</span>
              <span className="ml-2 font-medium">{submissionsWithDemo}/{totalSubmissions}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Avec GitHub:</span>
              <span className="ml-2 font-medium">{submissionsWithGithub}/{totalSubmissions}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
