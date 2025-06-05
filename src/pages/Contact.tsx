
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Contactez-nous
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="group p-8 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-primary/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Envoyez-nous un message
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="group/input">
                      <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within/input:text-primary transition-colors duration-300">
                        Nom
                      </label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within/input:text-primary transition-colors duration-300">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within/input:text-primary transition-colors duration-300">
                        Sujet
                      </label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="Sujet de votre message"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="border-gray-200 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="group/input">
                      <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700 group-focus-within/input:text-primary transition-colors duration-300">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Votre message..."
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6} 
                        required
                        className="border-gray-200 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 resize-none"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl" 
                        disabled={isSubmitting}
                        size="lg"
                      >
                        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="group p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Adresse</h3>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-gray-700 leading-relaxed">
                    Campus des Cézeaux<br />
                    1 Rue de la Chebarde<br />
                    63178 Aubière
                  </p>
                </div>
              </Card>
              
              <Card className="group p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-green-300 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">L'équipe Hackathon</h3>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">BADI Ahmed</p>
                    <p className="font-medium">BAHEND Ayoub</p>
                    <p className="font-medium">AMALLAH Aymane</p>
                    <p className="font-medium">BARY Hiba</p>
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
