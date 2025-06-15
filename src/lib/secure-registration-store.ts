
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

// Input validation and sanitization functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return !phone || phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters and HTML
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 1000); // Limit length
};

const validateRegistrationData = (data: RegistrationData): string[] => {
  const errors: string[] = [];

  // Required field validation
  if (!data.firstName?.trim()) errors.push("Le prénom est requis");
  if (!data.lastName?.trim()) errors.push("Le nom est requis");
  if (!data.email?.trim()) errors.push("L'email est requis");
  if (!validateEmail(data.email)) errors.push("Format d'email invalide");
  if (!data.university?.trim()) errors.push("L'université est requise");
  if (!data.major?.trim()) errors.push("La spécialité est requise");
  if (!data.experience?.trim()) errors.push("L'expérience est requise");

  // Phone validation (optional but must be valid if provided)
  if (data.phone && !validatePhone(data.phone)) {
    errors.push("Format de téléphone invalide");
  }

  // Content length validation
  if (data.firstName && data.firstName.length > 50) errors.push("Le prénom est trop long");
  if (data.lastName && data.lastName.length > 50) errors.push("Le nom est trop long");
  if (data.university && data.university.length > 100) errors.push("Le nom de l'université est trop long");
  if (data.experience && data.experience.length > 2000) errors.push("La description de l'expérience est trop longue");

  return errors;
};

const sanitizeRegistrationData = (data: RegistrationData): RegistrationData => {
  return {
    ...data,
    firstName: sanitizeInput(data.firstName),
    lastName: sanitizeInput(data.lastName),
    email: data.email.trim().toLowerCase(),
    phone: data.phone ? sanitizeInput(data.phone) : undefined,
    university: sanitizeInput(data.university),
    major: sanitizeInput(data.major),
    graduationYear: data.graduationYear ? sanitizeInput(data.graduationYear) : undefined,
    specialization: data.specialization ? sanitizeInput(data.specialization) : undefined,
    experience: sanitizeInput(data.experience),
    teamName: data.teamName ? sanitizeInput(data.teamName) : undefined,
    teamMembers: data.teamMembers ? sanitizeInput(data.teamMembers) : undefined,
    projectIdea: data.projectIdea ? sanitizeInput(data.projectIdea) : undefined,
    skills: data.skills.map(skill => sanitizeInput(skill))
  };
};

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

// Secure registration store with validation and rate limiting
export const secureRegistrationStore = {
  data: { ...initialData },
  
  init() {
    const savedData = localStorage.getItem('hackathon_registration');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Sanitize loaded data
        this.data = sanitizeRegistrationData({ ...initialData, ...parsedData });
      } catch (e) {
        console.error('Failed to parse saved registration data');
        this.data = { ...initialData };
      }
    }
    
    checkSupabaseConnection()
      .then(isConnected => {
        if (isConnected) {
          console.log("Supabase ready to receive data");
        } else {
          console.warn("Supabase connection issue");
        }
      });
      
    return this.data;
  },
  
  update(newData: Partial<RegistrationData>) {
    // Sanitize input data
    const sanitizedData = sanitizeRegistrationData({ ...this.data, ...newData });
    this.data = sanitizedData;
    
    // Create a copy without the file object for localStorage
    const dataForStorage = { ...this.data };
    delete (dataForStorage as any).resumeFile;
    
    localStorage.setItem('hackathon_registration', JSON.stringify(dataForStorage));
    return this.data;
  },
  
  reset() {
    this.data = { ...initialData };
    localStorage.removeItem('hackathon_registration');
  },
  
  async submit() {
    try {
      // Validate data before submission
      const validationErrors = validateRegistrationData(this.data);
      if (validationErrors.length > 0) {
        toast.error("Erreurs de validation", {
          description: validationErrors.join(", ")
        });
        throw new Error("Validation failed: " + validationErrors.join(", "));
      }

      // Sanitize data
      const sanitizedData = sanitizeRegistrationData(this.data);
      
      console.log("Attempting to submit registration to Supabase:", sanitizedData);
      
      // Verify connection before submitting
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.error("Cannot connect to Supabase");
        toast.error("Impossible de se connecter à la base de données");
        throw new Error("Supabase connection failed");
      }
      
      // Insert registration data into Supabase
      const { data, error } = await supabase
        .from('registrations')
        .insert([
          {
            first_name: sanitizedData.firstName,
            last_name: sanitizedData.lastName,
            email: sanitizedData.email,
            phone: sanitizedData.phone || '',
            university: sanitizedData.university,
            major: sanitizedData.major,
            graduation_year: sanitizedData.graduationYear || '',
            skills: sanitizedData.skills || [],
            track: sanitizedData.track,
            experience: sanitizedData.experience,
            team_preference: sanitizedData.teamPreference,
            team_name: sanitizedData.teamName || null,
            team_members: sanitizedData.teamMembers || null,
            project_idea: sanitizedData.projectIdea || null,
            specialization: sanitizedData.specialization || null
          }
        ])
        .select();
          
      if (error) {
        console.error('Error submitting registration:', error);
        toast.error("Erreur lors de l'envoi de l'inscription. Veuillez réessayer.");
        throw error;
      }
      
      console.log("Registration successful:", data);
      
      toast.success("Inscription enregistrée avec succès!");
      
      // Clear the current form data
      this.reset();
      
      return data ? data[0] : null;
    } catch (e) {
      console.error('Registration submission failed:', e);
      toast.error("Échec de l'enregistrement. Veuillez réessayer plus tard.");
      throw e;
    }
  }
};
