
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";

interface ChartsSectionProps {
  dailyRegistrations: { date: string; count: number }[];
  trackDistribution: { track: string; count: number }[];
  teamStats: {
    solo: number;
    joinTeam: number;
    haveTeam: number;
  };
  totalRegistrations: number;
}

export const ChartsSection = ({ 
  dailyRegistrations, 
  trackDistribution, 
  teamStats, 
  totalRegistrations 
}: ChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Inscriptions quotidiennes</CardTitle>
        </CardHeader>
        <CardContent>
          {dailyRegistrations.length > 0 && (
            <LineChart
              data={dailyRegistrations}
              index="date"
              categories={["count"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value} inscriptions`}
              className="h-72"
            />
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribution par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          {trackDistribution.length > 0 && (
            <BarChart
              data={trackDistribution}
              index="track"
              categories={["count"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}`}
              className="h-72"
            />
          )}
        </CardContent>
      </Card>
      
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Statistiques des équipes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm font-medium text-gray-500 mb-1">Participants solo</div>
              <div className="text-2xl font-bold">{teamStats.solo}</div>
              <div className="text-sm text-gray-500 mt-1">
                {totalRegistrations > 0 ? Math.round((teamStats.solo / totalRegistrations) * 100) : 0}% du total
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm font-medium text-gray-500 mb-1">Cherchent une équipe</div>
              <div className="text-2xl font-bold">{teamStats.joinTeam}</div>
              <div className="text-sm text-gray-500 mt-1">
                {totalRegistrations > 0 ? Math.round((teamStats.joinTeam / totalRegistrations) * 100) : 0}% du total
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-md border">
              <div className="text-sm font-medium text-gray-500 mb-1">Ont déjà une équipe</div>
              <div className="text-2xl font-bold">{teamStats.haveTeam}</div>
              <div className="text-sm text-gray-500 mt-1">
                {totalRegistrations > 0 ? Math.round((teamStats.haveTeam / totalRegistrations) * 100) : 0}% du total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
