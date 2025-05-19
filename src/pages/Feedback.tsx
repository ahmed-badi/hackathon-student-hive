
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Feedback = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: 5,
    content: 5,
    mentorship: 5,
    logistics: 5,
    overall: 5,
    comments: "",
    suggestions: ""
  });

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            organization_rating: formData.organization,
            content_rating: formData.content,
            mentorship_rating: formData.mentorship,
            logistics_rating: formData.logistics,
            overall_rating: formData.overall,
            comments: formData.comments,
            improvement_suggestions: formData.suggestions
          }
        ]);

      if (error) {
        console.error("Erreur lors de la soumission du feedback:", error);
        toast.error("Erreur lors de la soumission. Veuillez réessayer.");
      } else {
        toast.success("Merci pour votre feedback!");
        navigate("/");
      }
    } catch (error) {
      console.error("Exception lors de la soumission du feedback:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Donnez-nous votre Feedback</h1>
            <p className="text-gray-600">Aidez-nous à améliorer notre hackathon pour les prochaines éditions</p>
          </div>
          
          <Card className="border-0 shadow-lg mb-10">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">À propos de vous</h2>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Nom (Optionnel)</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email (Optionnel)</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Votre email"
                      />
                    </div>
                  </div>
                  
                  {/* Ratings */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Évaluation de l'événement</h2>
                    <p className="text-sm text-gray-500">Évaluez chaque aspect de l'événement sur une échelle de 1 à 10 (10 étant excellent)</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Organisation générale</label>
                        <Select
                          value={formData.organization.toString()}
                          onValueChange={(value) => handleChange("organization", parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une note" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Qualité du contenu</label>
                        <Select
                          value={formData.content.toString()}
                          onValueChange={(value) => handleChange("content", parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une note" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Qualité du mentorat</label>
                        <Select
                          value={formData.mentorship.toString()}
                          onValueChange={(value) => handleChange("mentorship", parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une note" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Logistique (lieu, nourriture, etc.)</label>
                        <Select
                          value={formData.logistics.toString()}
                          onValueChange={(value) => handleChange("logistics", parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une note" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Évaluation globale de l'événement</label>
                      <Select
                        value={formData.overall.toString()}
                        onValueChange={(value) => handleChange("overall", parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une note" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Commentaires */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Commentaires détaillés</h2>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Ce que vous avez apprécié</label>
                      <Textarea
                        placeholder="Dites-nous ce que vous avez aimé dans cet événement..."
                        value={formData.comments}
                        onChange={(e) => handleChange("comments", e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Comment pouvons-nous améliorer?</label>
                      <Textarea
                        placeholder="Vos suggestions pour rendre le prochain hackathon encore meilleur..."
                        value={formData.suggestions}
                        onChange={(e) => handleChange("suggestions", e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer mon feedback"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
