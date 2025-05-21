
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Users } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        });
      
      if (error) throw error;
      
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu votre message et reviendrons vers vous rapidement.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error("Error submitting message:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 blue-gradient-text">Contactez-nous</h1>
          <p className="text-gray-600 mb-8">Une question ? Une suggestion ? N'hésitez pas à nous contacter.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-6 card-hover-effect">
                <form onSubmit={handleSubmit} className="animate-on-scroll">
                  <div className="space-y-4">
                    <div className="transition-all hover:translate-y-[-2px]">
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Nom</label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    
                    <div className="transition-all hover:translate-y-[-2px]">
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    
                    <div className="transition-all hover:translate-y-[-2px]">
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Sujet</label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="Sujet de votre message"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    
                    <div className="transition-all hover:translate-y-[-2px]">
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Votre message..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6} 
                        required
                        className="focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full hover:bg-blue-600 transition-colors pulse-blue" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            
            <div>
              <Card className="p-6 card-hover-effect">
                <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="text-blue-500 h-4 w-4" />
                  </div>
                  Informations
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-full shrink-0 mt-1">
                      <MapPin className="text-blue-500 h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Adresse</p>
                      <p className="text-gray-600">
                        Campus des Cézeaux<br />
                        1 Rue de la Chebarde<br />
                        63178 Aubière
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-full shrink-0 mt-1">
                      <Users className="text-blue-500 h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">L'équipe Hackathon</p>
                      <p className="text-gray-600">
                        BADI Ahmed<br />
                        BAHEND Ayoub<br />
                        AMALLAH Aymane<br />
                        BARY Hiba
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
