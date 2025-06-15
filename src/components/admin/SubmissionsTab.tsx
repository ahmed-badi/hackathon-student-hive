
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { SubmissionStats } from "./submissions/SubmissionStats";
import { SubmissionFilters } from "./submissions/SubmissionFilters";
import { SubmissionCard } from "./submissions/SubmissionCard";
import { SubmissionPagination } from "./submissions/SubmissionPagination";

interface TeamSubmission {
  id: string;
  team_name: string;
  project_title: string;
  project_description: string;
  track: string;
  team_members: string[];
  github_link?: string;
  demo_link?: string;
  presentation_url?: string;
  submitted_at: string;
}

interface SubmissionsTabProps {
  teamSubmissions: TeamSubmission[];
  dataLoading: boolean;
}

const ITEMS_PER_PAGE = 6;

export const SubmissionsTab = ({ teamSubmissions, dataLoading }: SubmissionsTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedSubmissions = useMemo(() => {
    let filtered = teamSubmissions.filter((submission) => {
      const matchesSearch = 
        submission.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.project_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.project_description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTrack = selectedTrack === "all" || submission.track === selectedTrack;
      
      return matchesSearch && matchesTrack;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime();
        case "date-asc":
          return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
        case "team-name":
          return a.team_name.localeCompare(b.team_name);
        case "project-title":
          return a.project_title.localeCompare(b.project_title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [teamSubmissions, searchTerm, selectedTrack, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedSubmissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSubmissions = filteredAndSortedSubmissions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTrack("all");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTrack, sortBy]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Soumissions d'équipes ({teamSubmissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              Chargement des soumissions...
            </div>
          ) : teamSubmissions.length > 0 ? (
            <>
              <SubmissionStats submissions={teamSubmissions} />
              
              <SubmissionFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedTrack={selectedTrack}
                onTrackChange={setSelectedTrack}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onReset={resetFilters}
              />

              {filteredAndSortedSubmissions.length > 0 ? (
                <>
                  <div className="text-sm text-gray-600 mb-4">
                    Affichage de {startIndex + 1} à {Math.min(startIndex + ITEMS_PER_PAGE, filteredAndSortedSubmissions.length)} sur {filteredAndSortedSubmissions.length} soumissions
                  </div>
                  
                  <div className="grid gap-6">
                    {paginatedSubmissions.map((submission) => (
                      <SubmissionCard key={submission.id} submission={submission} />
                    ))}
                  </div>

                  <SubmissionPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucune soumission ne correspond aux critères de recherche</p>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune soumission pour l'instant</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
