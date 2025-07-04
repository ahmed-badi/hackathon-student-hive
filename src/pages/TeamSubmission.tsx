
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const TeamSubmission = () => {
  const [teamName, setTeamName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [track, setTrack] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [presentationFile, setPresentationFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPresentationFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let presentationUrl = null;
      
      // Si un fichier de présentation a été téléchargé, stockons-le dans Supabase Storage
      if (presentationFile) {
        const fileExt = presentationFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${teamName}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project_presentations')
          .upload(filePath, presentationFile);

        if (uploadError) {
          console.error('Erreur lors du téléchargement du fichier:', uploadError);
          toast.error("Erreur lors du téléchargement de la présentation");
          setIsSubmitting(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('project_presentations')
          .getPublicUrl(filePath);
          
        presentationUrl = publicUrl;
      }

      // Convertir la liste des membres en tableau
      const teamMembersArray = teamMembers.split(',').map(member => member.trim());

      // Enregistrer la soumission dans Supabase
      const { data, error } = await supabase
        .from('team_submissions')
        .insert({
          team_name: teamName,
          project_title: projectTitle,
          project_description: projectDescription,
          track: track,
          team_members: teamMembersArray,
          github_link: gitHubLink || null,
          demo_link: demoLink || null,
          presentation_url: presentationUrl,
          submitted_at: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error('Erreur lors de l\'enregistrement du projet:', error);
        toast.error("Erreur lors de l'enregistrement du projet : " + error.message);
        setIsSubmitting(false);
      }

      setIsSubmitting(false);
      setSubmissionStatus("success");
      
      toast.success("Projet soumis avec succès");

      // Réinitialiser le formulaire après une soumission réussie
      setTeamName("");
      setProjectTitle("");
      setProjectDescription("");
      setTrack("");
      setTeamMembers("");
      setGitHubLink("");
      setDemoLink("");
      setPresentationFile(null);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur inattendue s'est produite");
      setIsSubmitting(false);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3 text-center">Soumission de Projet</h1>
          <p className="text-center text-gray-600 mb-8">
            Soumettez votre projet final pour l'évaluation
          </p>

          {submissionStatus === "success" ? (
            <Card className="mb-8 border-green-500">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Soumission réussie!</h3>
                    <p className="text-gray-600">
                      Votre projet a été enregistré avec succès. L'équipe d'organisation examinera votre soumission prochainement.
                    </p>
                    <Button 
                      className="mt-4" 
                      variant="outline"
                      onClick={() => setSubmissionStatus("idle")}
                    >
                      Soumettre un autre projet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Informations de l'équipe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Nom de l'équipe *</Label>
                    <Input 
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="teamMembers">Membres de l'équipe (noms séparés par des virgules) *</Label>
                    <Textarea 
                      id="teamMembers" 
                      value={teamMembers}
                      onChange={(e) => setTeamMembers(e.target.value)}
                      placeholder="Ex: Jean Dupont, Marie Martin, Paul Bernard"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Détails du projet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectTitle">Titre du projet *</Label>
                    <Input 
                      id="projectTitle"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="track">Catégorie du projet *</Label>
                    <Select 
                      value={track} 
                      onValueChange={setTrack}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                        <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="sustainability">Sustainability</SelectItem>
                        <SelectItem value="edtech">EdTech</SelectItem>
                        <SelectItem value="open">Open Innovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Description du projet *</Label>
                    <Textarea 
                      id="projectDescription"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Décrivez votre projet, les problèmes qu'il résout et ses fonctionnalités principales..."
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Liens et documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubLink">Lien GitHub (optionnel)</Label>
                    <Input 
                      id="githubLink"
                      type="url"
                      value={gitHubLink}
                      onChange={(e) => setGitHubLink(e.target.value)}
                      placeholder="https://github.com/votre-username/votre-projet"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="demoLink">Lien de démo (optionnel)</Label>
                    <Input 
                      id="demoLink"
                      type="url"
                      value={demoLink}
                      onChange={(e) => setDemoLink(e.target.value)}
                      placeholder="https://votre-demo.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="presentation">Présentation du projet (PDF, PPT, PPTX) *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        id="presentation"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                        accept=".pdf,.ppt,.pptx"
                        required={!presentationFile}
                      />
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        {presentationFile ? (
                          <div>
                            <p className="text-sm font-medium">{presentationFile.name}</p>
                            <p className="text-xs text-gray-500">
                              {Math.round(presentationFile.size / 1024)} KB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium text-gray-600">Glissez-déposez votre fichier ici</p>
                            <p className="text-sm text-gray-500">ou cliquez pour parcourir</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {isSubmitting ? "Soumission en cours..." : "Soumettre le projet"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSubmission;
