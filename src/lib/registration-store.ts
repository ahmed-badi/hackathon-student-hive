import { supabase, checkSupabaseConnection } from "@/integrations/supabase/client";
import { toast } from "sonner";

type HackathonTrack = "ai-ml" | "cybersecurity" | "data-analysis" | "web-dev" | "blockchain" | "sustainability" | "open";

interface RegistrationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  
  // Education
  university: string;
  major: string;
  graduationYear?: string;
  specialization?: string;
  
  // Skills & Experience
  skills: string[];
  track: HackathonTrack;
  experience: string;
  
  // Team & Project
  teamPreference: "join-team" | "have-team";
  teamName?: string;
  teamMembers?: string;
  projectIdea?: string;
  
  // Resume
  resumeFile?: File | null;
}

const initialData: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  university: "",
  major: "",
  skills: [],
  track: "open",
  experience: "",
  teamPreference: "join-team",
};

// Registration store using localStorage for persistence with Supabase integration
export const registrationStore = {
  data: { ...initialData },
  
  // Load data from localStorage if available
  init() {
    const savedData = localStorage.getItem('hackathon_registration');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.data = { ...initialData, ...parsedData };
      } catch (e) {
        console.error('Échec de l\'analyse des données d\'inscription sauvegardées');
      }
    }
    
    // Vérifier la connexion à Supabase au chargement
    checkSupabaseConnection()
      .then(isConnected => {
        if (isConnected) {
          console.log("Supabase prêt à recevoir les données");
        } else {
          console.warn("Problème de connexion à Supabase");
        }
      });
      
    return this.data;
  },
  
  // Update data and save to localStorage
  update(newData: Partial<RegistrationData>) {
    this.data = { ...this.data, ...newData };
    
    // Create a copy without the file object for localStorage
    const dataForStorage = { ...this.data };
    delete (dataForStorage as any).resumeFile;
    
    localStorage.setItem('hackathon_registration', JSON.stringify(dataForStorage));
    return this.data;
  },
  
  // Reset the form data
  reset() {
    this.data = { ...initialData };
    localStorage.removeItem('hackathon_registration');
  },
  
  // Get all registrations from Supabase
  async getAllRegistrations() {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*');
      
      if (error) {
        console.error('Échec de récupération des inscriptions:', error);
        toast.error("Erreur lors de la récupération des données");
        return [];
      }
      
      return data || [];
    } catch (e) {
      console.error('Échec de récupération des inscriptions:', e);
      toast.error("Exception lors de la récupération des données");
      return [];
    }
  },
  
  // Send confirmation email
  async sendConfirmationEmail(registrationData: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    try {
      const registrationDate = new Date().toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Corriger l'accès au token d'authentification en attendant la promesse
      const sessionResponse = await supabase.auth.getSession();
      const accessToken = sessionResponse?.data?.session?.access_token || '';
      
      console.log(`Tentative d'envoi d'email de confirmation à: ${registrationData.email}`);
      
      const response = await fetch('https://gibsyygowtzieicrnqyv.supabase.co/functions/v1/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email, // S'assurer que l'email de l'utilisateur est bien passé
          registrationDate
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de l\'envoi de l\'email de confirmation:', errorData);
        return false;
      }

      const responseData = await response.json();
      console.log('Réponse de la fonction send-confirmation:', responseData);

      return true;
    } catch (e) {
      console.error('Exception lors de l\'envoi de l\'email de confirmation:', e);
      return false;
    }
  },
  
  // Submit the registration to Supabase
  async submit() {
    try {
      // Afficher un message de debug pour tracer le problème
      console.log("Tentative d'envoi des données à Supabase:", this.data);
      
      // Create a copy without the file object
      const registrationToSave = { ...this.data };
      delete (registrationToSave as any).resumeFile;
      
      // Vérifier la connexion avant d'envoyer
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.error("Impossible de se connecter à Supabase");
        toast.error("Impossible de se connecter à la base de données");
        throw new Error("Connexion à Supabase impossible");
      }
      
      // Insert registration data into Supabase avec retry
      let attempts = 0;
      let data;
      let error;
      
      while (attempts < 3) {
        console.log("Tentative d'inscription:", attempts + 1);
        const result = await supabase
          .from('registrations')
          .insert([
            {
              first_name: registrationToSave.firstName,
              last_name: registrationToSave.lastName,
              email: registrationToSave.email,
              phone: registrationToSave.phone || '', // Assurez-vous qu'une valeur vide est envoyée si null
              university: registrationToSave.university,
              major: registrationToSave.major,
              graduation_year: registrationToSave.graduationYear || '', // Assurez-vous qu'une valeur vide est envoyée si null
              skills: registrationToSave.skills || [],
              track: registrationToSave.track,
              experience: registrationToSave.experience,
              team_preference: registrationToSave.teamPreference,
              team_name: registrationToSave.teamName || null,
              team_members: registrationToSave.teamMembers || null,
              project_idea: registrationToSave.projectIdea || null,
              specialization: registrationToSave.specialization || null // Ajout du champ de spécialisation
            }
          ])
          .select();
          
        data = result.data;
        error = result.error;
        
        if (!error) {
          console.log("Inscription réussie à Supabase:", data);
          break;
        }
        
        console.error(`Tentative ${attempts + 1} échouée:`, error);
        attempts++;
        // Attendre avant de réessayer
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      if (error) {
        console.error('Erreur lors de l\'inscription après plusieurs tentatives:', error);
        toast.error("Erreur lors de l'envoi de l'inscription. Veuillez réessayer.");
        throw error;
      }
      
      // Envoyer l'email de confirmation
      console.log("Préparation à l'envoi de l'email de confirmation à:", registrationToSave.email);
      const emailSent = await this.sendConfirmationEmail({
        firstName: registrationToSave.firstName,
        lastName: registrationToSave.lastName,
        email: registrationToSave.email // S'assurer que l'email est correctement passé
      });
      
      if (emailSent) {
        toast.success("Inscription enregistrée !");
      } else {
        toast.success("Inscription enregistrée avec succès!");
        toast.warning("L'email de confirmation n'a pas pu être envoyé.");
      }
      
      // Clear the current form data
      this.reset();
      
      return data ? data[0] : null;
    } catch (e) {
      console.error('Échec de l\'inscription:', e);
      toast.error("Échec de l'enregistrement. Veuillez réessayer plus tard.");
      throw e;
    }
  }
};
