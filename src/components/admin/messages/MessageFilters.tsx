
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Download } from "lucide-react";

interface MessageFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filteredCount: number;
  totalCount: number;
  onReset: () => void;
  onExport: () => void;
}

export const MessageFilters = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filteredCount,
  totalCount,
  onReset,
  onExport
}: MessageFiltersProps) => {
  const hasFilters = searchQuery || sortBy !== "date-desc";

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, email ou sujet..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Plus récent</SelectItem>
              <SelectItem value="date-asc">Plus ancien</SelectItem>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="subject">Sujet</SelectItem>
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
            {filteredCount} sur {totalCount} messages
          </Badge>
          {hasFilters && (
            <Badge variant="outline">Filtres actifs</Badge>
          )}
        </div>
      </div>
    </div>
  );
};
