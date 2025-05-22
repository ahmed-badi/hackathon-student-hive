
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { FileIcon, Download, File, Presentation } from "lucide-react";
import { Link } from "react-router-dom";

interface Presentation {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  created_at: string;
}

const PresentationView = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    setIsLoading(true);
    try {
      const { data: files, error } = await supabase.storage
        .from("presentations")
        .list();

      if (error) {
        console.error("Error fetching presentations:", error);
        return;
      }

      // Convert to presentation format
      const presentationsList = files
        .filter(file => !file.id.includes('.emptyFolderPlaceholder'))
        .map((file): Presentation => ({
          id: file.id,
          name: file.name,
          file_path: file.name,
          file_type: file.metadata?.mimetype || getFileTypeFromName(file.name),
          created_at: file.created_at || new Date().toISOString()
        }));

      setPresentations(presentationsList);
    } catch (error) {
      console.error("Error in fetching presentations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFileTypeFromName = (name: string): string => {
    const extension = name.split('.').pop()?.toLowerCase() || '';
    
    if (extension === 'pdf') return 'application/pdf';
    if (extension === 'ppt' || extension === 'pptx') return 'application/vnd.ms-powerpoint';
    
    return 'application/octet-stream';
  };

  const getFileUrl = (filePath: string) => {
    return supabase.storage.from("presentations").getPublicUrl(filePath).data.publicUrl;
  };

  const renderFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileIcon className="w-8 h-8 text-red-500" />;
    }
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return <FileIcon className="w-8 h-8 text-orange-500" />;
    }
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return "Date inconnue";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Présentations du Hackathon</h1>
            <p className="text-gray-600">
              Consultez les présentations officielles du hackathon.
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <p className="text-gray-500">Chargement des présentations...</p>
            </div>
          </div>
        ) : presentations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentations.map((presentation) => (
              <Card key={presentation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {renderFileIcon(presentation.file_type)}
                    <div>
                      <h3 className="font-medium">{presentation.name}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(presentation.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a 
                      href={getFileUrl(presentation.file_path)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button variant="default" className="w-full">
                        Voir
                      </Button>
                    </a>
                    <a 
                      href={getFileUrl(presentation.file_path)} 
                      download={presentation.name}
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full flex items-center justify-center">
                        <Download className="h-4 w-4 mr-2" /> Télécharger
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-12 text-center rounded-lg border">
            <Presentation className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune présentation disponible</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Les présentations du hackathon seront disponibles ici dès que les organisateurs les auront publiées.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresentationView;
