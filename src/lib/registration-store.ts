
import { supabase } from "@/integrations/supabase/client";

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
        return [];
      }
      
      return data || [];
    } catch (e) {
      console.error('Failed to get registrations:', e);
      return [];
    }
  },
  
  // Submit the registration to Supabase
  async submit() {
    try {
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
      
      // Insert registration data into Supabase
      const { data, error } = await supabase
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
      
      if (error) {
        console.error('Error submitting registration:', error);
        throw error;
      }
      
      // Clear the current form data
      this.reset();
      
      return data[0];
    } catch (e) {
      console.error('Failed to submit registration:', e);
      throw e;
    }
  }
};
