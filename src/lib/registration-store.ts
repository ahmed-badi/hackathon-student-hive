
import * as XLSX from 'xlsx';

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
    
    // Update Excel file
    this.updateExcelFile(allRegistrations);
    
    // Clear the current form data
    this.reset();
    
    return newRegistration;
  },
  
  // Export all registrations to Excel file
  exportToExcel() {
    const registrations = this.getAllRegistrations();
    this.generateExcelFile(registrations);
  },
  
  // Update Excel file with all registrations - called on submit
  updateExcelFile(registrations: any[]) {
    this.generateExcelFile(registrations);
  },
  
  // Generate Excel file from registrations data
  generateExcelFile(registrations: any[]) {
    try {
      // Format data for Excel (clean up and flatten data)
      const excelData = registrations.map(reg => {
        // Format skills array to string
        const skills = Array.isArray(reg.skills) ? reg.skills.join(", ") : reg.skills;
        
        // Format track name
        const trackNames: Record<string, string> = {
          "ai-ml": "AI & Machine Learning",
          "web3": "Web3 & Blockchain",
          "healthtech": "HealthTech",
          "sustainability": "Sustainability",
          "edtech": "EdTech",
          "open": "Open Innovation"
        };
        
        // Format team preference
        const teamPreferenceLabels: Record<string, string> = {
          "solo": "Working Solo",
          "join-team": "Looking to Join a Team",
          "have-team": "Already Has a Team"
        };
        
        // Return formatted object
        return {
          "ID": reg.id || "",
          "Registration Date": new Date(reg.registrationDate).toLocaleString(),
          "First Name": reg.firstName || "",
          "Last Name": reg.lastName || "",
          "Email": reg.email || "",
          "Phone": reg.phone || "",
          "University": reg.university || "",
          "Major": reg.major || "",
          "Graduation Year": reg.graduationYear || "",
          "Skills": skills || "",
          "Track": trackNames[reg.track] || reg.track,
          "Experience": reg.experience || "",
          "Team Preference": teamPreferenceLabels[reg.teamPreference] || reg.teamPreference,
          "Team Name": reg.teamName || "",
          "Team Members": reg.teamMembers || "",
          "Project Idea": reg.projectIdea || ""
        };
      });

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
      
      // Auto-fit columns
      const columnsWidths = this.getColumnsWidths(excelData);
      worksheet['!cols'] = columnsWidths;
      
      // Save to file
      XLSX.writeFile(workbook, "Hackathon_Registrations.xlsx");
    } catch (e) {
      console.error("Failed to generate Excel file:", e);
    }
  },
  
  // Helper to calculate optimal column widths for Excel
  getColumnsWidths(data: Record<string, any>[]) {
    if (!data || data.length === 0) return [];
    
    const columnWidths: { wch: number }[] = [];
    const sample = data[0];
    
    // Get all keys from first object
    const headers = Object.keys(sample);
    
    // Calculate width for each column based on content
    headers.forEach((header, i) => {
      // Start with header width
      let maxWidth = header.length;
      
      // Check each row's content width
      data.forEach(row => {
        const cellValue = String(row[header] || '');
        // If multi-line, use the longest line
        if (cellValue.includes('\n')) {
          const lines = cellValue.split('\n');
          const longestLine = Math.max(...lines.map(line => line.length));
          maxWidth = Math.max(maxWidth, longestLine);
        } else {
          maxWidth = Math.max(maxWidth, cellValue.length);
        }
      });
      
      // Cap width and add some padding
      const width = Math.min(maxWidth + 2, 50);
      columnWidths[i] = { wch: width };
    });
    
    return columnWidths;
  }
};
