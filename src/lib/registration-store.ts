
import { supabase, checkSupabaseConnection } from "@/integrations/supabase/client";
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
        console.error('Failed to parse saved registration data');
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
        console.error('Failed to get registrations:', error);
        toast.error("Erreur lors de la récupération des données");
        return [];
      }
      
      return data || [];
    } catch (e) {
      console.error('Failed to get registrations:', e);
      toast.error("Exception lors de la récupération des données");
      return [];
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
        const result = await supabase
          .from('registrations')
          .insert([
            {
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
            }
          ])
          .select();
          
        data = result.data;
        error = result.error;
        
        if (!error) {
          console.log("Insertion réussie à Supabase:", data);
          break;
        }
        
        console.error(`Tentative ${attempts + 1} échouée:`, error);
        attempts++;
        // Attendre avant de réessayer
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      if (error) {
        console.error('Error submitting registration after retries:', error);
        toast.error("Erreur lors de l'envoi de l'inscription. Veuillez réessayer.");
        throw error;
      }
      
      toast.success("Inscription enregistrée avec succès!");
      
      // Clear the current form data
      this.reset();
      
      return data ? data[0] : null;
    } catch (e) {
      console.error('Failed to submit registration:', e);
      toast.error("Échec de l'enregistrement. Veuillez réessayer plus tard.");
      throw e;
    }
  }
};
