
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface SubmissionFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTrack: string;
  onTrackChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export const SubmissionFilters = ({
  searchTerm,
  onSearchChange,
  selectedTrack,
  onTrackChange,
  sortBy,
  onSortChange,
  onReset
}: SubmissionFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher par nom d'équipe ou projet..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Select value={selectedTrack} onValueChange={onTrackChange}>
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

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Plus récent</SelectItem>
            <SelectItem value="date-asc">Plus ancien</SelectItem>
            <SelectItem value="team-name">Nom d'équipe</SelectItem>
            <SelectItem value="project-title">Titre du projet</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={onReset}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
