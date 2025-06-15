
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

interface UseTeamActionsProps {
  teams: Team[];
  unassignedMembers: Registration[];
  onDataChange: () => void;
}

export const useTeamActions = ({ teams, unassignedMembers, onDataChange }: UseTeamActionsProps) => {
  const { toast } = useToast();

  const createRandomTeams = async () => {
    try {
      const shuffled = [...unassignedMembers].sort(() => 0.5 - Math.random());
      const newTeams = [];

      for (let i = 0; i < shuffled.length; i += 4) {
        const teamMembers = shuffled.slice(i, i + 4);
        if (teamMembers.length >= 2) {
          const teamName = `Équipe ${teams.length + newTeams.length + 1}`;
          
          const { data: teamData, error: teamError } = await supabase
            .from('teams')
            .insert({ name: teamName, track: teamMembers[0].track })
            .select()
            .single();

          if (teamError) throw teamError;

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

      onDataChange();
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

      onDataChange();
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
      const { error: membersError } = await supabase
        .from('team_members')
        .delete()
        .eq('team_id', teamId);

      if (membersError) throw membersError;

      const { error: teamError } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);

      if (teamError) throw teamError;

      toast({
        title: "Succès",
        description: "Équipe supprimée",
      });

      onDataChange();
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

      onDataChange();
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

      onDataChange();
    } catch (error) {
      console.error('Error removing member from team:', error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le membre de l'équipe",
        variant: "destructive"
      });
    }
  };

  return {
    createRandomTeams,
    createManualTeam,
    deleteTeam,
    addMemberToTeam,
    removeMemberFromTeam
  };
};
