
import { supabase, checkSupabaseConnection, testSupabaseInsert } from "@/integrations/supabase/client";
import { toast } from "sonner";

type HackathonTrack = "ai-ml" | "web3" | "healthtech" | "sustainability" | "edtech" | "open";

interface RegistrationData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Education
  university: string;
  major: string;
  graduationYear: string;
  
  // Skills & Experience
  skills: string[];
  track: HackathonTrack;
  experience: string;
  
  // Team & Project
  teamPreference: "solo" | "join-team" | "have-team";
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
  graduationYear: "",
  skills: [],
  track: "open",
  experience: "",
  teamPreference: "solo",
};

// Vérifie la connexion au démarrage et indique si c'est en développement ou production
const isProductionEnvironment = () => {
  return window.location.hostname !== 'localhost' && 
         !window.location.hostname.includes('127.0.0.1') && 
         !window.location.hostname.includes('192.168');
};

// Registration store using localStorage for persistence with Supabase integration
export const registrationStore = {
  data: { ...initialData },
  connectionStatus: 'unknown', // 'unknown', 'connected', 'disconnected'
  
  // Load data from localStorage if available and initialize Supabase connection
  async init() {
    const savedData = localStorage.getItem('hackathon_registration');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        this.data = { ...initialData, ...parsedData };
      } catch (e) {
        console.error('Failed to parse saved registration data');
      }
    }
    
    console.log(`Initialisation du store dans un environnement ${isProductionEnvironment() ? 'de production' : 'de développement'}`);
    
    // Vérifier la connexion à Supabase au chargement avec une tentative de test d'insertion
    try {
      const isConnected = await checkSupabaseConnection();
      if (isConnected) {
        console.log("Supabase est prêt à recevoir les données");
        this.connectionStatus = 'connected';
        
        // En production, effectuer également un test d'insertion
        if (isProductionEnvironment()) {
          const insertWorks = await testSupabaseInsert();
          if (insertWorks) {
            console.log("Test d'insertion réussi - La connexion est pleinement fonctionnelle");
            toast.success("Connexion à la base de données établie avec succès");
          } else {
            console.warn("Échec du test d'insertion - Problème potentiel avec les permissions");
            toast.warning("Connexion à la base de données limitée - Les inscriptions pourraient ne pas être enregistrées");
            this.connectionStatus = 'limited';
          }
        }
      } else {
        console.warn("Problème de connexion à Supabase");
        this.connectionStatus = 'disconnected';
        toast.error("Impossible de se connecter à la base de données");
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la connexion Supabase:", error);
      this.connectionStatus = 'disconnected';
      toast.error("Erreur lors de l'initialisation de la connexion à la base de données");
    }
      
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
      console.log("Tentative de récupération des inscriptions depuis Supabase...");
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Failed to get registrations:', error);
        toast.error(`Erreur lors de la récupération des données: ${error.message}`);
        return [];
      }
      
      console.log(`Récupération réussie de ${data?.length || 0} inscriptions:`, data);
      return data || [];
    } catch (e) {
      console.error('Failed to get registrations:', e);
      toast.error("Exception lors de la récupération des données");
      return [];
    }
  },
  
  // Submit the registration to Supabase with retry mechanism
  async submit() {
    try {
      // Afficher un message de debug pour tracer le problème
      console.log("Tentative d'envoi des données à Supabase:", this.data);
      
      // Vérifier la connexion avant d'envoyer
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.error("Impossible de se connecter à Supabase");
        toast.error("Impossible de se connecter à la base de données");
        throw new Error("Connexion à Supabase impossible");
      }
      
      // Create a copy without the file object
      const registrationToSave = { ...this.data };
      delete (registrationToSave as any).resumeFile;
      
      // Handle file upload if there is one
      let resumeUrl = null;
      if (this.data.resumeFile) {
        const fileExt = this.data.resumeFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `resumes/${fileName}`;
        
        // Upload file to Supabase Storage (Note: You need to create the bucket first)
        // This is commented out as we need to create a storage bucket first
        /*
        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, this.data.resumeFile);
        
        if (uploadError) {
          console.error('Error uploading file:', uploadError);
        } else {
          const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
          resumeUrl = data.publicUrl;
        }
        */
      }
      
      // Insert registration data into Supabase avec retry
      let attempts = 0;
      let data;
      let error;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        console.log(`Tentative ${attempts + 1}/${maxAttempts} d'insertion dans Supabase...`);
        
        // Préparation des données à envoyer
        const dataToInsert = {
          first_name: registrationToSave.firstName,
          last_name: registrationToSave.lastName,
          email: registrationToSave.email,
          phone: registrationToSave.phone,
          university: registrationToSave.university,
          major: registrationToSave.major,
          graduation_year: registrationToSave.graduationYear,
          skills: registrationToSave.skills,
          track: registrationToSave.track,
          experience: registrationToSave.experience,
          team_preference: registrationToSave.teamPreference,
          team_name: registrationToSave.teamName,
          team_members: registrationToSave.teamMembers,
          project_idea: registrationToSave.projectIdea,
          resume_url: resumeUrl
        };
        
        console.log("Données à insérer:", dataToInsert);
        
        const result = await supabase
          .from('registrations')
          .insert([dataToInsert])
          .select();
          
        data = result.data;
        error = result.error;
        
        if (!error) {
          console.log("Insertion réussie à Supabase:", data);
          break;
        }
        
        console.error(`Tentative ${attempts + 1} échouée:`, error);
        console.error("Code d'erreur:", error.code);
        console.error("Message d'erreur:", error.message);
        console.error("Détails:", error.details);
        
        attempts++;
        if (attempts < maxAttempts) {
          // Attendre avant de réessayer avec un délai exponentiel
          const delay = Math.pow(2, attempts) * 1000;
          console.log(`Nouvelle tentative dans ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
      
      if (error) {
        console.error('Error submitting registration after retries:', error);
        toast.error(`Erreur lors de l'envoi de l'inscription: ${error.message}`);
        throw error;
      }
      
      toast.success("Inscription enregistrée avec succès!");
      
      // Clear the current form data
      this.reset();
      
      return data ? data[0] : null;
    } catch (e) {
      console.error('Failed to submit registration:', e);
      if (e instanceof Error) {
        console.error("Message d'erreur:", e.message);
        console.error("Stack trace:", e.stack);
        toast.error(`Échec de l'enregistrement: ${e.message}`);
      } else {
        toast.error("Échec de l'enregistrement. Veuillez réessayer plus tard.");
      }
      throw e;
    }
  }
};

