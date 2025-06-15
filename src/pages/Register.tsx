
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import FormStep from "@/components/FormStep";
import StepIndicator from "@/components/StepIndicator";
import { secureRegistrationStore } from "@/lib/secure-registration-store";

const STEPS = [
  { label: "Personnel" },
  { label: "Formation" },
  { label: "Compétences" },
  { label: "Équipe" },
  { label: "Révision" }
];

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(secureRegistrationStore.init());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specializationVisible, setSpecializationVisible] = useState(false);

  const updateForm = (field: string, value: any) => {
    const updatedData = secureRegistrationStore.update({ [field]: value });
    
    // Si l'utilisateur change son année d'études à ZZ2 ou ZZ3, montrer le champ spécialisation
    if (field === 'major' && (value === 'ZZ2' || value === 'ZZ3')) {
      setSpecializationVisible(true);
    } else if (field === 'major' && value === 'ZZ1') {
      setSpecializationVisible(false);
      // Réinitialiser la spécialisation si l'utilisateur revient à ZZ1
      secureRegistrationStore.update({ 'specialization': '' });
    }
    
    setFormData({ ...updatedData });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "Le prénom est requis";
      if (!formData.lastName) newErrors.lastName = "Le nom est requis";
      if (!formData.email) newErrors.email = "L'email est requis";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Format d'email invalide";
    } 
    else if (currentStep === 2) {
      if (!formData.university) newErrors.university = "L'établissement est requis";
      if (!formData.major) newErrors.major = "L'année d'études est requise";
      if (specializationVisible && !formData.specialization) newErrors.specialization = "La spécialisation est requise";
    } 
    // else if (currentStep === 3) {
    //   if (!formData.experience) newErrors.experience = "Veuillez fournir des informations sur votre expérience";
    // } 
    else if (currentStep === 4) {
      if (formData.teamPreference === "have-team") {
        if (!formData.teamName) {
          newErrors.teamName = "Le nom de l'équipe est requis";
        }
        if (!formData.teamMembers || formData.teamMembers.trim() === "") {
          newErrors.teamMembers = "La liste des membres de l'équipe est requise";
        }
      }
      // Pas de validation requise pour "join-team"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setIsSubmitting(true);
      
      try {
        // Submit the form data to Supabase
        await secureRegistrationStore.submit();
        navigate("/success");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        toast.error("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Inscription au Hackathon</h1>
            <p className="text-gray-600">Complétez le formulaire ci-dessous pour réserver votre place</p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <StepIndicator currentStep={currentStep} steps={STEPS} />
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                <FormStep 
                  title="Informations Personnelles" 
                  description="Parlez-nous de vous"
                  currentStep={currentStep}
                  stepNumber={1}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Prénom</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => updateForm("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Nom</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => updateForm("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Adresse Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 2: Education */}
                <FormStep 
                  title="Formation" 
                  description="Parlez-nous de votre formation"
                  currentStep={currentStep}
                  stepNumber={2}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Établissement</label>
                      <Input
                        value={formData.university}
                        onChange={(e) => updateForm("university", e.target.value)}
                        className={errors.university ? "border-red-500" : ""}
                      />
                      {errors.university && <p className="text-sm text-red-500 mt-1">{errors.university}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Année d'études</label>
                      <Select
                        value={formData.major}
                        onValueChange={(value) => updateForm("major", value)}
                      >
                        <SelectTrigger className={`w-full ${errors.major ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Sélectionner votre année" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ZZ1">ZZ1</SelectItem>
                          <SelectItem value="ZZ2">ZZ2</SelectItem>
                          <SelectItem value="ZZ3">ZZ3</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.major && <p className="text-sm text-red-500 mt-1">{errors.major}</p>}
                    </div>
                    
                    {specializationVisible && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Spécialisation</label>
                        <Select
                          value={formData.specialization || ''}
                          onValueChange={(value) => updateForm("specialization", value)}
                        >
                          <SelectTrigger className={`w-full ${errors.specialization ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Sélectionner votre spécialisation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="F1">F1</SelectItem>
                            <SelectItem value="F2">F2</SelectItem>
                            <SelectItem value="F3">F3</SelectItem>
                            <SelectItem value="F4">F4</SelectItem>
                            <SelectItem value="F5">F5</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.specialization && <p className="text-sm text-red-500 mt-1">{errors.specialization}</p>}
                      </div>
                    )}
                  </div>
                </FormStep>
                
                {/* Step 3: Skills & Experience */}
                <FormStep 
                  title="Compétences & Expérience" 
                  description="Parlez-nous de votre parcours technique"
                  currentStep={currentStep}
                  stepNumber={3}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Catégorie de Hackathon</label>
                      <Select
                        value={formData.track}
                        onValueChange={(value: any) => updateForm("track", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-ml">IA & Machine Learning</SelectItem>
                          <SelectItem value="cybersecurity">Cyber Sécurité</SelectItem>
                          <SelectItem value="data-analysis">Analyse de Données</SelectItem>
                          <SelectItem value="web-dev">Développement Web</SelectItem>
                          <SelectItem value="blockchain">Blockchain</SelectItem>
                          <SelectItem value="sustainability">Durabilité & RSE</SelectItem>
                          <SelectItem value="open">Innovation Ouverte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Compétences & Technologies</label>
                      <Input
                        placeholder="ex: React, Python, Data Science, etc."
                        value={Array.isArray(formData.skills) ? formData.skills.join(", ") : ""}
                        onChange={(e) => updateForm("skills", e.target.value.split(", "))}
                      />
                      <p className="text-xs text-gray-500 mt-1">Séparez les compétences par des virgules</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Niveau d'Expérience</label>
                      <Textarea
                        placeholder="Décrivez brièvement votre expérience précédente avec les hackathons, projets ou compétences pertinentes..."
                        value={formData.experience}
                        onChange={(e) => updateForm("experience", e.target.value)}
                        className={`min-h-[120px] ${errors.experience ? "border-red-500" : ""}`}
                      />
                      {errors.experience && <p className="text-sm text-red-500 mt-1">{errors.experience}</p>}
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 4: Team Information */}
                <FormStep 
                  title="Information sur l'Équipe" 
                  description="Parlez-nous de vos préférences d'équipe"
                  currentStep={currentStep}
                  stepNumber={4}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Préférence d'Équipe</label>
                      <Select
                        value={formData.teamPreference}
                        onValueChange={(value: any) => updateForm("teamPreference", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="join-team">Je veux rejoindre une équipe</SelectItem>
                          <SelectItem value="have-team">J'ai déjà une équipe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {formData.teamPreference === "have-team" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Nom de l'Équipe</label>
                          <Input
                            value={formData.teamName || ""}
                            onChange={(e) => updateForm("teamName", e.target.value)}
                            className={errors.teamName ? "border-red-500" : ""}
                          />
                          {errors.teamName && <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Membres de l'Équipe *</label>
                          <Textarea
                            placeholder="Listez les noms et emails des membres de votre équipe"
                            value={formData.teamMembers || ""}
                            onChange={(e) => updateForm("teamMembers", e.target.value)}
                            className={`min-h-[120px] ${errors.teamMembers ? "border-red-500" : ""}`}
                          />
                          {errors.teamMembers && (
                            <p className="text-sm text-red-500 mt-1">{errors.teamMembers}</p>
                          )}
                        </div>
                      </>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Idée de Projet (Optionnel)</label>
                      <Textarea
                        placeholder="Décrivez brièvement votre idée de projet si vous en avez une..."
                        value={formData.projectIdea || ""}
                        onChange={(e) => updateForm("projectIdea", e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 5: Review Information */}
                <FormStep 
                  title="Révision de vos Informations" 
                  description="Veuillez vérifier vos informations avant de soumettre"
                  currentStep={currentStep}
                  stepNumber={5}
                >
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Informations Personnelles</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Nom:</span>
                          <p>{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Email:</span>
                          <p>{formData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Formation</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Établissement:</span>
                          <p>{formData.university}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Année d'études:</span>
                          <p>{formData.major}</p>
                        </div>
                        {formData.specialization && (
                          <div>
                            <span className="text-sm text-gray-500">Spécialisation:</span>
                            <p>{formData.specialization}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Compétences & Expérience</h3>
                      <div className="grid grid-cols-1 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Catégorie de Hackathon:</span>
                          <p>{formData.track}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Compétences:</span>
                          <p>{Array.isArray(formData.skills) ? formData.skills.join(", ") : "Aucune spécifiée"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Expérience:</span>
                          <p className="whitespace-pre-wrap">{formData.experience}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Information sur l'Équipe</h3>
                      <div className="grid grid-cols-1 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Préférence d'Équipe:</span>
                          <p>
                            {formData.teamPreference === "join-team" && "Souhaite rejoindre une équipe"}
                            {formData.teamPreference === "have-team" && "A déjà une équipe"}
                          </p>
                        </div>
                        {formData.teamPreference === "have-team" && (
                          <>
                            <div>
                              <span className="text-sm text-gray-500">Nom de l'Équipe:</span>
                              <p>{formData.teamName}</p>
                            </div>
                            {formData.teamMembers && (
                              <div>
                                <span className="text-sm text-gray-500">Membres de l'Équipe:</span>
                                <p className="whitespace-pre-wrap">{formData.teamMembers}</p>
                              </div>
                            )}
                          </>
                        )}
                        {formData.projectIdea && (
                          <div>
                            <span className="text-sm text-gray-500">Idée de Projet:</span>
                            <p className="whitespace-pre-wrap">{formData.projectIdea}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FormStep>
                
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                      Retour
                    </Button>
                  )}
                  
                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                      Continuer
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-accent hover:bg-accent/90 ml-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Soumission en cours..." : "Soumettre l'Inscription"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
