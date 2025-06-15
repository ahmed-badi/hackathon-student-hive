
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Calendar, Target } from "lucide-react";

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

interface RegistrationStatsProps {
  registrations: Registration[];
}

export const RegistrationStats = ({ registrations }: RegistrationStatsProps) => {
  const totalRegistrations = registrations.length;
  const uniqueUniversities = new Set(registrations.map(r => r.university)).size;
  const soloParticipants = registrations.filter(r => r.team_preference === 'solo').length;
  const teamSeekers = registrations.filter(r => r.team_preference === 'join-team').length;
  
  // Registrations in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentRegistrations = registrations.filter(r => 
    new Date(r.created_at) > sevenDaysAgo
  ).length;

  const stats = [
    {
      title: "Total inscriptions",
      value: totalRegistrations,
      icon: Users,
      description: "Participants inscrits"
    },
    {
      title: "Universités",
      value: uniqueUniversities,
      icon: GraduationCap,
      description: "Établissements représentés"
    },
    {
      title: "Cette semaine",
      value: recentRegistrations,
      icon: Calendar,
      description: "Nouvelles inscriptions"
    },
    {
      title: "Cherchent équipe",
      value: teamSeekers,
      icon: Target,
      description: "Participants disponibles"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
