
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Users, Shuffle, Plus } from "lucide-react";
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

export const TeamsManagementTab = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [unassignedMembers, setUnassignedMembers] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

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

  const createRandomTeams = async () => {
    try {
      const shuffled = [...unassignedMembers].sort(() => 0.5 - Math.random());
      const newTeams = [];

      for (let i = 0; i < shuffled.length; i += 4) {
        const teamMembers = shuffled.slice(i, i + 4);
        if (teamMembers.length >= 2) { // At least 2 members for a team
          const teamName = `Équipe ${teams.length + newTeams.length + 1}`;
          
          // Create team
          const { data: teamData, error: teamError } = await supabase
            .from('teams')
            .insert({ name: teamName, track: teamMembers[0].track })
            .select()
            .single();

          if (teamError) throw teamError;

          // Add members to team
          const memberInserts = teamMembers.map(member => ({
            team_id: teamData.id,
            registration_id: member.id,
            role: 'member'
          }));

          const { error: membersError } = await supabase
            .from('team_members')
            .insert(memberInserts);

          if (membersError) throw membersError;

          newTeams.push({
            id: teamData.id,
            name: teamName,
            track: teamMembers[0].track,
            members: teamMembers
          });
        }
      }

      toast({
        title: "Succès",
        description: `${newTeams.length} équipes créées automatiquement`,
      });

      fetchData();
    } catch (error) {
      console.error('Error creating random teams:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer les équipes automatiquement",
        variant: "destructive"
      });
    }
  };

  const createManualTeam = async () => {
    try {
      const teamName = `Équipe ${teams.length + 1}`;
      
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .insert({ name: teamName, track: 'open' })
        .select()
        .single();

      if (teamError) throw teamError;

      toast({
        title: "Succès",
        description: "Équipe créée manuellement",
      });

      fetchData();
    } catch (error) {
      console.error('Error creating manual team:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'équipe manuellement",
        variant: "destructive"
      });
    }
  };

  const deleteTeam = async (teamId: string) => {
    try {
      // Delete team members first
      const { error: membersError } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId);

      if (membersError) throw membersError;

      // Delete team
      const { error: teamError } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);

      if (teamError) throw teamError;

      toast({
        title: "Succès",
        description: "Équipe supprimée",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting team:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'équipe",
        variant: "destructive"
      });
    }
  };

  const addMemberToTeam = async (memberId: string, teamId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .insert({
          team_id: teamId,
          registration_id: memberId,
          role: 'member'
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Membre ajouté à l'équipe",
      });

      fetchData();
    } catch (error) {
      console.error('Error adding member to team:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le membre à l'équipe",
        variant: "destructive"
      });
    }
  };

  const removeMemberFromTeam = async (memberId: string, teamId: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId)
        .eq('registration_id', memberId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Membre retiré de l'équipe",
      });

      fetchData();
    } catch (error) {
      console.error('Error removing member from team:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le membre de l'équipe",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestion des Équipes</h2>
          <p className="text-gray-600">
            {teams.length} équipes créées • {unassignedMembers.length} participants non assignés
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={createManualTeam} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Créer une équipe
          </Button>
          <Button onClick={createRandomTeams} disabled={unassignedMembers.length < 2}>
            <Shuffle className="w-4 h-4 mr-2" />
            Créer aléatoirement
          </Button>
        </div>
      </div>

      {/* Unassigned Members */}
      {unassignedMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Participants non assignés ({unassignedMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {unassignedMembers.map((member) => (
                <div key={member.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{member.first_name} {member.last_name}</p>
                  <p className="text-sm text-gray-600">{member.university}</p>
                  <Badge variant="outline" className="mt-1">
                    {member.track}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{team.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTeam(team.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{team.track}</Badge>
                  <span className="text-sm text-gray-500">
                    {team.members.length}/4 membres
                  </span>
                </div>
                
                <div className="space-y-2">
                  {team.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{member.first_name} {member.last_name}</p>
                        <p className="text-xs text-gray-600">{member.university}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMemberFromTeam(member.id, team.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                {team.members.length < 4 && unassignedMembers.length > 0 && (
                  <select
                    className="w-full p-2 border rounded text-sm"
                    onChange={(e) => {
                      if (e.target.value) {
                        addMemberToTeam(e.target.value, team.id);
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">Ajouter un membre...</option>
                    {unassignedMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.first_name} {member.last_name} - {member.university}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
