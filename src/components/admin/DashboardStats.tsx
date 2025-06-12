
import { Card, CardContent } from "@/components/ui/card";

interface DashboardStatsProps {
  registrationsCount: number;
  submissionsCount: number;
  messagesCount: number;
  feedbacksCount: number;
}

export const DashboardStats = ({ 
  registrationsCount, 
  submissionsCount, 
  messagesCount, 
  feedbacksCount 
}: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Inscriptions</div>
          <div className="text-3xl font-bold">{registrationsCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">Soumissions</div>
          <div className="text-3xl font-bold">{submissionsCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">Messages reçus</div>
          <div className="text-3xl font-bold">{messagesCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-sm font-medium text-gray-500 mb-1">Feedbacks</div>
          <div className="text-3xl font-bold">{feedbacksCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};
