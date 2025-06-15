
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
  track: string;
  team_preference: string;
  team_name?: string;
}

interface Team {
  id: string;
  name: string;
  track: string;
  members: Registration[];
}

interface TeamStats {
  totalTeams: number;
  totalMembers: number;
  averageTeamSize: number;
  unassignedCount: number;
  trackBreakdown: { [key: string]: number };
}

export const useTeamsData = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [unassignedMembers, setUnassignedMembers] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TeamStats>({
    totalTeams: 0,
    totalMembers: 0,
    averageTeamSize: 0,
    unassignedCount: 0,
    trackBreakdown: {}
  });
  const { toast } = useToast();

  const calculateStats = () => {
    const totalMembers = teams.reduce((sum, team) => sum + team.members.length, 0);
    const averageTeamSize = teams.length > 0 ? totalMembers / teams.length : 0;
    
    const trackBreakdown: { [key: string]: number } = {};
    teams.forEach(team => {
      trackBreakdown[team.track] = (trackBreakdown[team.track] || 0) + 1;
    });

    setStats({
      totalTeams: teams.length,
      totalMembers,
      averageTeamSize: Math.round(averageTeamSize * 10) / 10,
      unassignedCount: unassignedMembers.length,
      trackBreakdown
    });
  };

  const fetchData = async () => {
    try {
      // Fetch registrations
      const { data: regData, error: regError } = await supabase
        .from('registrations')
        .select('*');

      if (regError) throw regError;

      setRegistrations(regData || []);

      // Fetch teams with members
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select(`
          *,
          team_members (
            registration_id,
            registrations (*)
          )
        `);

      if (teamsError) throw teamsError;

      // Process teams data
      const processedTeams = (teamsData || []).map(team => ({
        id: team.id,
        name: team.name,
        track: team.track,
        members: team.team_members?.map((tm: any) => tm.registrations).filter(Boolean) || []
      }));

      setTeams(processedTeams);

      // Find unassigned members
      const assignedMemberIds = new Set();
      processedTeams.forEach(team => {
        team.members.forEach(member => {
          assignedMemberIds.add(member.id);
        });
      });

      const unassigned = (regData || []).filter(reg => !assignedMemberIds.has(reg.id));
      setUnassignedMembers(unassigned);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [teams, unassignedMembers]);

  return {
    registrations,
    teams,
    unassignedMembers,
    loading,
    stats,
    fetchData
  };
};
