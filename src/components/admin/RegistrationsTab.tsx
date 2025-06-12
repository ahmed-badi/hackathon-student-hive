
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university: string;
  track: string;
  team_preference: string;
  team_name?: string;
  created_at: string;
}

interface RegistrationsTabProps {
  registrations: Registration[];
  dataLoading: boolean;
}

const getTrackName = (trackId: string): string => {
  const tracks: Record<string, string> = {
    "ai-ml": "AI & ML",
    "web3": "Web3",
    "healthtech": "HealthTech",
    "sustainability": "Sustainability",
    "edtech": "EdTech",
    "open": "Open Innovation"
  };
  return tracks[trackId] || trackId;
};

export const RegistrationsTab = ({ registrations, dataLoading }: RegistrationsTabProps) => {
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");

  useEffect(() => {
    let filtered = [...registrations];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.first_name?.toLowerCase().includes(query) || 
        reg.last_name?.toLowerCase().includes(query) || 
        reg.email?.toLowerCase().includes(query) ||
        reg.university?.toLowerCase().includes(query)
      );
    }
    
    if (trackFilter !== "all") {
      filtered = filtered.filter(reg => reg.track === trackFilter);
    }
    
    setFilteredRegistrations(filtered);
  }, [searchQuery, trackFilter, registrations]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <Input
              placeholder="Rechercher par nom, email, université..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrer par catégorie</label>
            <Select value={trackFilter} onValueChange={setTrackFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                <SelectItem value="healthtech">HealthTech</SelectItem>
                <SelectItem value="sustainability">Sustainability</SelectItem>
                <SelectItem value="edtech">EdTech</SelectItem>
                <SelectItem value="open">Open Innovation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Registrations List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {dataLoading ? (
          <div className="p-8 text-center text-gray-500">
            Chargement des inscriptions...
          </div>
        ) : filteredRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Université</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Catégorie</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Équipe</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{reg.first_name} {reg.last_name}</td>
                    <td className="py-3 px-4">{reg.email}</td>
                    <td className="py-3 px-4">{reg.university}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{getTrackName(reg.track)}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {reg.team_preference === "solo" && "Solo"}
                      {reg.team_preference === "join-team" && "Cherche"}
                      {reg.team_preference === "have-team" && (reg.team_name || "Équipe")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {registrations.length === 0 ? "Aucune inscription pour l'instant" : "Aucune inscription correspondant aux critères"}
          </div>
        )}
      </div>
    </div>
  );
};
