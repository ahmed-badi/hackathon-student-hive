
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, Github, Users2 } from "lucide-react";

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

export const SubmissionsTab = ({ teamSubmissions, dataLoading }: SubmissionsTabProps) => {
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
              Chargement des soumissions...
            </div>
          ) : teamSubmissions.length > 0 ? (
            <div className="grid gap-6">
              {teamSubmissions.map((submission) => {
                const date = new Date(submission.submitted_at);
                const formattedDate = `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
                
                return (
                  <Card key={submission.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{submission.project_title}</h3>
                          <p className="text-gray-600">Équipe: {submission.team_name}</p>
                          <Badge variant="secondary" className="mt-1">
                            {getTrackName(submission.track)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Soumis le {formattedDate}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Description du projet</h4>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded">
                            {submission.project_description}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Membres de l'équipe</h4>
                          <div className="flex flex-wrap gap-2">
                            {submission.team_members.map((member, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                <Users2 className="w-3 h-3" />
                                {member}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {submission.github_link && (
                            <a 
                              href={submission.github_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                              <Github className="w-4 h-4" />
                              Code source
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          
                          {submission.demo_link && (
                            <a 
                              href={submission.demo_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-green-600 hover:text-green-800"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Démo live
                            </a>
                          )}
                          
                          {submission.presentation_url && (
                            <a 
                              href={submission.presentation_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                            >
                              <FileText className="w-4 h-4" />
                              Présentation
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
