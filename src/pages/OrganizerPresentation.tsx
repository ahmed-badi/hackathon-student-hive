
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileUp, Presentation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const OrganizerPresentation = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      // Vérifier si c'est un PDF ou PPT/PPTX
      const fileType = selectedFile.type;
      if (
        fileType === "application/pdf" ||
        fileType === "application/vnd.ms-powerpoint" ||
        fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        setFile(selectedFile);
      } else {
        toast({
          variant: "destructive",
          title: "Format non supporté",
          description: "Veuillez télécharger un fichier PDF, PPT ou PPTX."
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !presentationTitle.trim()) {
      toast({
        variant: "destructive",
        title: "Informations manquantes",
        description: "Veuillez fournir un titre et sélectionner un fichier."
      });
      return;
    }

    setIsLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${presentationTitle.replace(/\s+/g, '_')}.${fileExt}`;
      
      // Uploadez le fichier au bucket "presentations"
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('presentations')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obtenez l'URL publique
      const { data: urlData } = await supabase.storage
        .from('presentations')
        .getPublicUrl(fileName);

      if (urlData) {
        setUploadedFile(urlData.publicUrl);
        toast({
          title: "Présentation téléchargée",
          description: "Votre présentation a été téléchargée avec succès.",
        });
        
        // Réinitialisez le formulaire
        setPresentationTitle("");
        setFile(null);
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        variant: "destructive",
        title: "Erreur de téléchargement",
        description: "Un problème est survenu lors du téléchargement de votre fichier."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Gestion des Présentations</h1>
          <p className="text-gray-600 mb-8 text-center">
            Téléchargez les présentations qui seront projetées pendant le hackathon.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Télécharger une présentation</CardTitle>
              <CardDescription>
                Les formats acceptés sont PDF, PPT et PPTX.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="presentationTitle">Titre de la présentation</Label>
                <Input 
                  id="presentationTitle" 
                  placeholder="Ex: Introduction au Hackathon" 
                  value={presentationTitle}
                  onChange={(e) => setPresentationTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Fichier de présentation</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2">
                  <FileUp className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : "Cliquez pour choisir un fichier ou glissez-déposez"}
                  </p>
                  <Input 
                    id="fileUpload" 
                    type="file" 
                    className="hidden"
                    accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handleFileChange}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('fileUpload')?.click()}
                    type="button"
                  >
                    Parcourir
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleUpload} 
                disabled={isLoading || !file || !presentationTitle.trim()}
              >
                {isLoading ? (
                  <>Téléchargement en cours...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger la présentation
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {uploadedFile && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Présentation téléchargée</h2>
              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center">
                  <Presentation className="h-8 w-8 text-primary mr-3" />
                  <div>
                    <p className="font-medium">{presentationTitle}</p>
                    <p className="text-sm text-gray-500 truncate max-w-md">{uploadedFile}</p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <a href={uploadedFile} target="_blank" rel="noopener noreferrer">
                    Voir
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerPresentation;
