
import { Button } from "@/components/ui/button";
import { Shuffle, Plus } from "lucide-react";
import { TeamStats } from "./teams/TeamStats";
import { TrackBreakdown } from "./teams/TrackBreakdown";
import { UnassignedMembers } from "./teams/UnassignedMembers";
import { TeamCard } from "./teams/TeamCard";
import { useTeamsData } from "./teams/useTeamsData";
import { useTeamActions } from "./teams/useTeamActions";

export const TeamsManagementTab = () => {
  const {
    teams,
    unassignedMembers,
    loading,
    stats,
    fetchData
  } = useTeamsData();

  const {
    createRandomTeams,
    createManualTeam,
    deleteTeam,
    addMemberToTeam,
    removeMemberFromTeam
  } = useTeamActions({
    teams,
    unassignedMembers,
    onDataChange: fetchData
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard/Stats Section */}
      <TeamStats
        totalTeams={stats.totalTeams}
        totalMembers={stats.totalMembers}
        averageTeamSize={stats.averageTeamSize}
        unassignedCount={stats.unassignedCount}
      />

      {/* Track Breakdown */}
      <TrackBreakdown trackBreakdown={stats.trackBreakdown} />

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
      <UnassignedMembers unassignedMembers={unassignedMembers} />

      {/* Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            unassignedMembers={unassignedMembers}
            onDeleteTeam={deleteTeam}
            onRemoveMember={removeMemberFromTeam}
            onAddMember={addMemberToTeam}
          />
        ))}
      </div>
    </div>
  );
};
