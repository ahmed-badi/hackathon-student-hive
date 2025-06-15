
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink, Github, Users2, Calendar } from "lucide-react";

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

interface SubmissionCardProps {
  submission: TeamSubmission;
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

export const SubmissionCard = ({ submission }: SubmissionCardProps) => {
  const date = new Date(submission.submitted_at);
  const formattedDate = `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  
  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-blue-900">{submission.project_title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Users2 className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">{submission.team_name}</span>
              <Badge variant="secondary" className="ml-2">
                {getTrackName(submission.track)}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Soumis le {formattedDate}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2 text-gray-800">Description du projet</h4>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {submission.project_description}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-800">
              Membres de l'équipe ({submission.team_members.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {submission.team_members.map((member, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1 justify-center py-1">
                  <Users2 className="w-3 h-3" />
                  {member}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-gray-800">Liens et ressources</h4>
            <div className="flex flex-wrap gap-3">
              {submission.github_link && (
                <a 
                  href={submission.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
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
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                  className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Présentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            
            {!submission.github_link && !submission.demo_link && !submission.presentation_url && (
              <p className="text-gray-500 italic">Aucun lien fourni</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
