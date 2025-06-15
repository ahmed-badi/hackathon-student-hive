
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Download } from "lucide-react";

interface RegistrationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  trackFilter: string;
  onTrackChange: (value: string) => void;
  teamPreferenceFilter: string;
  onTeamPreferenceChange: (value: string) => void;
  universityFilter: string;
  onUniversityChange: (value: string) => void;
  universities: string[];
  filteredCount: number;
  totalCount: number;
  onReset: () => void;
  onExport: () => void;
}

export const RegistrationFilters = ({
  searchQuery,
  onSearchChange,
  trackFilter,
  onTrackChange,
  teamPreferenceFilter,
  onTeamPreferenceChange,
  universityFilter,
  onUniversityChange,
  universities,
  filteredCount,
  totalCount,
  onReset,
  onExport
}: RegistrationFiltersProps) => {
  const hasFilters = searchQuery || trackFilter !== "all" || teamPreferenceFilter !== "all" || universityFilter !== "all";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, email, université..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={trackFilter} onValueChange={onTrackChange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrer par track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les tracks</SelectItem>
              <SelectItem value="ai-ml">AI & ML</SelectItem>
              <SelectItem value="web3">Web3</SelectItem>
              <SelectItem value="healthtech">HealthTech</SelectItem>
              <SelectItem value="sustainability">Sustainability</SelectItem>
              <SelectItem value="edtech">EdTech</SelectItem>
              <SelectItem value="open">Open Innovation</SelectItem>
            </SelectContent>
          </Select>

          <Select value={teamPreferenceFilter} onValueChange={onTeamPreferenceChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Préférence équipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes préférences</SelectItem>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="join-team">Cherche équipe</SelectItem>
              <SelectItem value="have-team">A une équipe</SelectItem>
            </SelectContent>
          </Select>

          <Select value={universityFilter} onValueChange={onUniversityChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Université" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes universités</SelectItem>
              {universities.map((university) => (
                <SelectItem key={university} value={university}>
                  {university}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={onExport}>
            <Download className="h-4 w-4" />
          </Button>

          {hasFilters && (
            <Button variant="outline" size="icon" onClick={onReset}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {filteredCount} sur {totalCount} inscriptions
          </Badge>
          {hasFilters && (
            <Badge variant="outline">Filtres actifs</Badge>
          )}
        </div>
      </div>
    </div>
  );
};
