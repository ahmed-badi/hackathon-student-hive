
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, BarChart3 } from "lucide-react";

interface TeamStatsProps {
  totalTeams: number;
  totalMembers: number;
  averageTeamSize: number;
  unassignedCount: number;
}

export const TeamStats = ({ totalTeams, totalMembers, averageTeamSize, unassignedCount }: TeamStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Équipes</p>
              <p className="text-2xl font-bold">{totalTeams}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Membres Assignés</p>
              <p className="text-2xl font-bold">{totalMembers}</p>
            </div>
            <UserPlus className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Non Assignés</p>
              <p className="text-2xl font-bold text-orange-600">{unassignedCount}</p>
            </div>
            <Users className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taille Moyenne</p>
              <p className="text-2xl font-bold">{averageTeamSize}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
