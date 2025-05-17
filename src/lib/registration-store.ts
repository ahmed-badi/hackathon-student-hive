
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

// Simple registration store using localStorage for persistence
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
  
  // Get all registrations (from localStorage)
  getAllRegistrations() {
    try {
      const registrations = localStorage.getItem('hackathon_all_registrations');
      return registrations ? JSON.parse(registrations) : [];
    } catch (e) {
      console.error('Failed to get registrations');
      return [];
    }
  },
  
  // Submit the registration (in a real app, this would be an API call)
  submit() {
    const allRegistrations = this.getAllRegistrations();
    
    // Create a copy without the file object
    const registrationToSave = { ...this.data };
    delete (registrationToSave as any).resumeFile;
    
    // Add an ID and registration date
    const newRegistration = {
      ...registrationToSave,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString(),
    };
    
    // Add to "database"
    allRegistrations.push(newRegistration);
    localStorage.setItem('hackathon_all_registrations', JSON.stringify(allRegistrations));
    
    // Clear the current form data
    this.reset();
    
    return newRegistration;
  }
};
