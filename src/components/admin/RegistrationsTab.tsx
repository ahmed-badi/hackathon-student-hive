
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { RegistrationStats } from "./registrations/RegistrationStats";
import { RegistrationFilters } from "./registrations/RegistrationFilters";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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

const getTeamPreferenceName = (preference: string): string => {
  switch (preference) {
    case "solo": return "Solo";
    case "join-team": return "Cherche équipe";
    case "have-team": return "A une équipe";
    default: return preference;
  }
};

export const RegistrationsTab = ({ registrations, dataLoading }: RegistrationsTabProps) => {
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");
  const [teamPreferenceFilter, setTeamPreferenceFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("all");

  // Get unique universities for filter
  const universities = Array.from(new Set(registrations.map(r => r.university))).sort();

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

    if (teamPreferenceFilter !== "all") {
      filtered = filtered.filter(reg => reg.team_preference === teamPreferenceFilter);
    }

    if (universityFilter !== "all") {
      filtered = filtered.filter(reg => reg.university === universityFilter);
    }
    
    setFilteredRegistrations(filtered);
  }, [searchQuery, trackFilter, teamPreferenceFilter, universityFilter, registrations]);

  const handleReset = () => {
    setSearchQuery("");
    setTrackFilter("all");
    setTeamPreferenceFilter("all");
    setUniversityFilter("all");
  };

  const handleExport = () => {
    const csvData = [
      ["Nom", "Prénom", "Email", "Université", "Track", "Préférence équipe", "Date inscription"],
      ...filteredRegistrations.map(reg => [
        reg.last_name,
        reg.first_name,
        reg.email,
        reg.university,
        getTrackName(reg.track),
        getTeamPreferenceName(reg.team_preference),
        new Date(reg.created_at).toLocaleDateString('fr-FR')
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "inscriptions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (dataLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Chargement des inscriptions...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <RegistrationStats registrations={registrations} />
      
      <RegistrationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        trackFilter={trackFilter}
        onTrackChange={setTrackFilter}
        teamPreferenceFilter={teamPreferenceFilter}
        onTeamPreferenceChange={setTeamPreferenceFilter}
        universityFilter={universityFilter}
        onUniversityChange={setUniversityFilter}
        universities={universities}
        filteredCount={filteredRegistrations.length}
        totalCount={registrations.length}
        onReset={handleReset}
        onExport={handleExport}
      />
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Université</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Équipe</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="font-medium">
                      {reg.first_name} {reg.last_name}
                    </TableCell>
                    <TableCell>{reg.email}</TableCell>
                    <TableCell>{reg.university}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getTrackName(reg.track)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTeamPreferenceName(reg.team_preference)}
                      </Badge>
                      {reg.team_name && (
                        <div className="text-xs text-gray-500 mt-1">{reg.team_name}</div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(reg.created_at).toLocaleDateString('fr-FR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            {registrations.length === 0 
              ? "Aucune inscription pour l'instant" 
              : "Aucune inscription correspondant aux critères"
            }
          </div>
        )}
      </div>
    </div>
  );
};
