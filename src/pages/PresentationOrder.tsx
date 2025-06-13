
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Users, Clock } from "lucide-react";

const PresentationOrder = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    representativeName: "",
    preferredOrder: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('presentation_orders')
        .insert([
          {
            team_name: formData.teamName,
            representative_name: formData.representativeName,
            preferred_order: parseInt(formData.preferredOrder)
          }
        ]);

      if (error) {
        console.error("Erreur lors de la soumission:", error);
        toast.error("Erreur lors de la soumission. Veuillez réessayer.");
      } else {
        toast.success("Ordre de passage soumis avec succès!");
        navigate("/");
      }
    } catch (error) {
      console.error("Exception lors de la soumission:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Clock size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ordre de Passage
            </h1>
            <p className="text-gray-600 text-lg">
              Choisissez votre ordre de passage préféré pour les présentations
            </p>
          </div>
          
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-600" />
                Informations de l'équipe
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom de l'équipe *
                  </label>
                  <Input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                    placeholder="Entrez le nom de votre équipe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nom du représentant *
                  </label>
                  <Input
                    type="text"
                    value={formData.representativeName}
                    onChange={(e) => setFormData({...formData, representativeName: e.target.value})}
                    placeholder="Nom de la personne qui soumet"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ordre de passage préféré *
                  </label>
                  <Select
                    value={formData.preferredOrder}
                    onValueChange={(value) => setFormData({...formData, preferredOrder: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre ordre préféré" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7].map((order) => (
                        <SelectItem key={order} value={order.toString()}>
                          Position {order}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    Choisissez entre les positions 1 à 7 (7 équipes maximum)
                  </p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note :</strong> L'ordre final sera déterminé par les organisateurs en tenant compte des préférences de toutes les équipes.
                  </p>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Soumettre"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PresentationOrder;
