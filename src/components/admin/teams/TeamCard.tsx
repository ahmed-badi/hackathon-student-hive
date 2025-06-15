
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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

interface TeamCardProps {
  team: Team;
  unassignedMembers: Registration[];
  onDeleteTeam: (teamId: string) => void;
  onRemoveMember: (memberId: string, teamId: string) => void;
  onAddMember: (memberId: string, teamId: string) => void;
}

export const TeamCard = ({ 
  team, 
  unassignedMembers, 
  onDeleteTeam, 
  onRemoveMember, 
  onAddMember 
}: TeamCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">{team.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteTeam(team.id)}
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
              {team.members.length} membre{team.members.length > 1 ? 's' : ''}
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
                  onClick={() => onRemoveMember(member.id, team.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>

          {unassignedMembers.length > 0 && (
            <select
              className="w-full p-2 border rounded text-sm"
              onChange={(e) => {
                if (e.target.value) {
                  onAddMember(e.target.value, team.id);
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
  );
};
