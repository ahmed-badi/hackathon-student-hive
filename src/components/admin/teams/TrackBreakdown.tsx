
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

interface TrackBreakdownProps {
  trackBreakdown: { [key: string]: number };
}

export const TrackBreakdown = ({ trackBreakdown }: TrackBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Répartition par Track
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {Object.entries(trackBreakdown).map(([track, count]) => (
            <Badge key={track} variant="outline" className="px-3 py-1">
              {track}: {count} équipe{count > 1 ? 's' : ''}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
