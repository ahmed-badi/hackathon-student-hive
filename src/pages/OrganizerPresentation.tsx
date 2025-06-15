
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FileIcon, Trash2, FileUp, File, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useSecureAdminAuth } from "@/hooks/useSecureAdminAuth";

interface Presentation {
  id: string;
  name: string;
  file_path: string;
  file_type: string;
  uploaded_by: string;
  created_at: string;
}

const OrganizerPresentation = () => {
  const { isAuthenticated, isLoading, logout } = useSecureAdminAuth();
  
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // For demo, we'll consider everyone admin

  useEffect(() => {
    // For demo purposes, everyone is admin
    setIsAdmin(true);
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
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
          uploaded_by: "Organisateur",
          created_at: file.created_at || new Date().toISOString()
        }));

      setPresentations(presentationsList);
    } catch (error) {
      console.error("Error in fetching presentations:", error);
    }
  };

  const getFileTypeFromName = (name: string): string => {
    const extension = name.split('.').pop()?.toLowerCase() || '';
    
    if (extension === 'pdf') return 'application/pdf';
    if (extension === 'ppt' || extension === 'pptx') return 'application/vnd.ms-powerpoint';
    
    return 'application/octet-stream';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const fileType = selectedFile.type;
      const validTypes = [
        'application/pdf', 
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (!validTypes.includes(fileType)) {
        toast("Type de fichier non supporté", {
          description: "Veuillez choisir un fichier PDF, PPT ou PPTX."
        });
        e.target.value = '';
        return;
      }
      
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const uploadPresentation = async () => {
    if (!file || !fileName) {
      toast("Erreur", {
        description: "Veuillez sélectionner un fichier et donner un nom à la présentation."
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("presentations")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (error) {
        throw error;
      }

      toast("Présentation téléchargée", {
        description: "Votre présentation a été téléchargée avec succès."
      });
      
      // Refresh presentations list
      fetchPresentations();
      
      // Reset state
      setFile(null);
      setFileName("");
      
      // Reset the input field
      const fileInput = document.getElementById("presentation-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (error: any) {
      console.error("Error uploading presentation:", error);
      
      if (error.message.includes('duplicate')) {
        toast("Erreur", {
          description: "Un fichier avec ce nom existe déjà. Veuillez renommer votre fichier."
        });
      } else {
        toast("Erreur", {
          description: "Une erreur est survenue lors du téléchargement. Veuillez réessayer."
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const deletePresentation = async (filePath: string) => {
    try {
      const { error } = await supabase.storage
        .from("presentations")
        .remove([filePath]);

      if (error) {
        throw error;
      }

      toast("Présentation supprimée", {
        description: "La présentation a été supprimée avec succès."
      });
      
      // Refresh presentations list
      fetchPresentations();
      
    } catch (error) {
      console.error("Error deleting presentation:", error);
      toast("Erreur", {
        description: "Une erreur est survenue lors de la suppression. Veuillez réessayer."
      });
    }
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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return "Date inconnue";
    }
  };

  // Si l'utilisateur n'est pas authentifié ou en cours de chargement, ne rien afficher
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des Présentations</h1>
            <p className="text-gray-600">
              Téléchargez et gérez les présentations pour le hackathon.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/presentations" className="text-blue-600 hover:underline flex items-center">
              <Button variant="outline">Voir la page publique</Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section Upload */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Ajouter une présentation</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="presentation-file">Fichier de présentation</Label>
                    <Input
                      id="presentation-file"
                      type="file"
                      accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Formats acceptés: PDF, PPT, PPTX
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="presentation-name">Nom du fichier</Label>
                    <Input
                      id="presentation-name"
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      placeholder="Nom du fichier"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Assurez-vous que le nom inclut l'extension du fichier (ex: presentation.pdf)
                    </p>
                  </div>
                  
                  <Button
                    onClick={uploadPresentation}
                    disabled={isUploading || !file || !fileName}
                    className="w-full"
                  >
                    {isUploading ? (
                      "Téléchargement en cours..."
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" /> Télécharger la présentation
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg mt-6 border border-yellow-200">
                  <p className="text-sm text-amber-800">
                    Les présentations téléchargées seront visibles par tous les participants du hackathon.
                    Veillez à ne pas partager d'informations confidentielles.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Liste des présentations */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Présentations actuelles</h2>
            
            {presentations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presentations.map((presentation) => (
                  <Card key={presentation.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          {renderFileIcon(presentation.file_type)}
                          <div>
                            <h3 className="font-medium">{presentation.name}</h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(presentation.created_at)}
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deletePresentation(presentation.file_path)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <a 
                          href={getFileUrl(presentation.file_path)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-primary hover:underline text-sm flex items-center"
                        >
                          <Button variant="outline" className="w-full">
                            Voir la présentation
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 text-center rounded-lg border">
                <FileIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Aucune présentation disponible</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Les présentations que vous téléchargerez apparaîtront ici.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerPresentation;
