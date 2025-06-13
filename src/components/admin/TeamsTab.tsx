
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users2, Clock, Trophy } from "lucide-react";

interface PresentationOrder {
  id: string;
  team_name: string;
  representative_name: string;
  preferred_order: number;
  created_at: string;
}

interface TeamsTabProps {
  presentationOrders: PresentationOrder[];
  dataLoading: boolean;
}

export const TeamsTab = ({ presentationOrders, dataLoading }: TeamsTabProps) => {
  const sortedOrders = [...presentationOrders].sort((a, b) => a.preferred_order - b.preferred_order);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users2 className="w-5 h-5" />
            Ordres de passage des équipes ({presentationOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="p-8 text-center text-gray-500">
              Chargement des ordres de passage...
            </div>
          ) : presentationOrders.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-700">{presentationOrders.length}</div>
                    <div className="text-sm text-blue-600">Équipes inscrites</div>
                  </CardContent>
                </Card>
                
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-700">7</div>
                    <div className="text-sm text-green-600">Positions disponibles</div>
                  </CardContent>
                </Card>
                
                <Card className="border border-purple-200 bg-purple-50">
                  <CardContent className="p-4 text-center">
                    <Users2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-700">{7 - presentationOrders.length}</div>
                    <div className="text-sm text-purple-600">Places restantes</div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ordre préféré</TableHead>
                      <TableHead>Nom de l'équipe</TableHead>
                      <TableHead>Représentant</TableHead>
                      <TableHead>Date de soumission</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedOrders.map((order) => {
                      const date = new Date(order.created_at);
                      const formattedDate = `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
                      
                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className="font-bold text-lg px-3 py-1"
                            >
                              #{order.preferred_order}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{order.team_name}</TableCell>
                          <TableCell>{order.representative_name}</TableCell>
                          <TableCell className="text-gray-500 text-sm">{formattedDate}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Instructions pour l'organisation</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Les équipes ont choisi leur ordre de passage préféré</li>
                  <li>• En cas de conflit, l'ordre de soumission peut être utilisé comme critère</li>
                  <li>• Maximum 7 équipes peuvent présenter</li>
                  <li>• L'ordre final doit être communiqué aux participants</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun ordre de passage soumis pour l'instant</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
