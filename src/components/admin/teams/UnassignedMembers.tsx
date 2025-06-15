
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

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

interface UnassignedMembersProps {
  unassignedMembers: Registration[];
}

export const UnassignedMembers = ({ unassignedMembers }: UnassignedMembersProps) => {
  if (unassignedMembers.length === 0) return null;

  return (
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
  );
};
