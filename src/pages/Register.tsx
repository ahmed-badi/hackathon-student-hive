import { useState, useEffect } from "react";
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
import { registrationStore } from "@/lib/registration-store";

const STEPS = [
  { label: "Personal" },
  { label: "Education" },
  { label: "Skills" },
  { label: "Team" },
  { label: "Review" }
];

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(registrationStore.init());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (field: string, value: any) => {
    const updatedData = registrationStore.update({ [field]: value });
    setFormData({ ...updatedData });
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    } 
    else if (currentStep === 2) {
      if (!formData.university) newErrors.university = "University is required";
      if (!formData.major) newErrors.major = "Major is required";
      if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required";
    } 
    else if (currentStep === 3) {
      if (!formData.experience) newErrors.experience = "Please provide some information about your experience";
    } 
    else if (currentStep === 4) {
      if (formData.teamPreference === "have-team" && !formData.teamName) {
        newErrors.teamName = "Team name is required";
      }
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
        await registrationStore.submit();
        navigate("/success");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        toast.error("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateForm("resumeFile", e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Register for Hackathon</h1>
            <p className="text-gray-600">Complete the form below to secure your spot</p>
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <StepIndicator currentStep={currentStep} steps={STEPS} />
              
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                <FormStep 
                  title="Personal Information" 
                  description="Tell us about yourself"
                  currentStep={currentStep}
                  stepNumber={1}
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => updateForm("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => updateForm("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateForm("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 2: Education */}
                <FormStep 
                  title="Educational Background" 
                  description="Tell us about your education"
                  currentStep={currentStep}
                  stepNumber={2}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">University/College</label>
                      <Input
                        value={formData.university}
                        onChange={(e) => updateForm("university", e.target.value)}
                        className={errors.university ? "border-red-500" : ""}
                      />
                      {errors.university && <p className="text-sm text-red-500 mt-1">{errors.university}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Major/Field of Study</label>
                      <Input
                        value={formData.major}
                        onChange={(e) => updateForm("major", e.target.value)}
                        className={errors.major ? "border-red-500" : ""}
                      />
                      {errors.major && <p className="text-sm text-red-500 mt-1">{errors.major}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Expected Graduation Year</label>
                      <Select
                        value={formData.graduationYear}
                        onValueChange={(value) => updateForm("graduationYear", value)}
                      >
                        <SelectTrigger className={`w-full ${errors.graduationYear ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(6)].map((_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      {errors.graduationYear && <p className="text-sm text-red-500 mt-1">{errors.graduationYear}</p>}
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 3: Skills & Experience */}
                <FormStep 
                  title="Skills & Experience" 
                  description="Tell us about your technical background"
                  currentStep={currentStep}
                  stepNumber={3}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Hackathon Track</label>
                      <Select
                        value={formData.track}
                        onValueChange={(value: any) => updateForm("track", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select track" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                          <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                          <SelectItem value="healthtech">HealthTech</SelectItem>
                          <SelectItem value="sustainability">Sustainability</SelectItem>
                          <SelectItem value="edtech">EdTech</SelectItem>
                          <SelectItem value="open">Open Innovation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Skills & Technologies</label>
                      <Input
                        placeholder="e.g., React, Python, Data Science, etc."
                        value={formData.skills.join(", ")}
                        onChange={(e) => updateForm("skills", e.target.value.split(", "))}
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Experience Level</label>
                      <Textarea
                        placeholder="Briefly describe your previous experience with hackathons, projects, or relevant skills..."
                        value={formData.experience}
                        onChange={(e) => updateForm("experience", e.target.value)}
                        className={`min-h-[120px] ${errors.experience ? "border-red-500" : ""}`}
                      />
                      {errors.experience && <p className="text-sm text-red-500 mt-1">{errors.experience}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Resume/CV (Optional)</label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC or DOCX format, max 5MB</p>
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 4: Team Information */}
                <FormStep 
                  title="Team Information" 
                  description="Tell us about your team preferences"
                  currentStep={currentStep}
                  stepNumber={4}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Team Preference</label>
                      <Select
                        value={formData.teamPreference}
                        onValueChange={(value: any) => updateForm("teamPreference", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">I want to work solo</SelectItem>
                          <SelectItem value="join-team">I want to join a team</SelectItem>
                          <SelectItem value="have-team">I already have a team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {formData.teamPreference === "have-team" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Team Name</label>
                          <Input
                            value={formData.teamName || ""}
                            onChange={(e) => updateForm("teamName", e.target.value)}
                            className={errors.teamName ? "border-red-500" : ""}
                          />
                          {errors.teamName && <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Team Members (Optional)</label>
                          <Textarea
                            placeholder="List the names and emails of your team members"
                            value={formData.teamMembers || ""}
                            onChange={(e) => updateForm("teamMembers", e.target.value)}
                            className="min-h-[120px]"
                          />
                        </div>
                      </>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Project Idea (Optional)</label>
                      <Textarea
                        placeholder="Briefly describe your project idea if you have one..."
                        value={formData.projectIdea || ""}
                        onChange={(e) => updateForm("projectIdea", e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                </FormStep>
                
                {/* Step 5: Review Information */}
                <FormStep 
                  title="Review Your Information" 
                  description="Please review your information before submitting"
                  currentStep={currentStep}
                  stepNumber={5}
                >
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Name:</span>
                          <p>{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Email:</span>
                          <p>{formData.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Phone:</span>
                          <p>{formData.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Education</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Institution:</span>
                          <p>{formData.university}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Major:</span>
                          <p>{formData.major}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Graduation Year:</span>
                          <p>{formData.graduationYear}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Skills & Experience</h3>
                      <div className="grid grid-cols-1 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Hackathon Track:</span>
                          <p>{formData.track}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Skills:</span>
                          <p>{formData.skills.join(", ") || "None specified"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Experience:</span>
                          <p className="whitespace-pre-wrap">{formData.experience}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Resume:</span>
                          <p>{formData.resumeFile ? formData.resumeFile.name : "Not uploaded"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Team Information</h3>
                      <div className="grid grid-cols-1 gap-y-2">
                        <div>
                          <span className="text-sm text-gray-500">Team Preference:</span>
                          <p>
                            {formData.teamPreference === "solo" && "Working solo"}
                            {formData.teamPreference === "join-team" && "Wants to join a team"}
                            {formData.teamPreference === "have-team" && "Already has a team"}
                          </p>
                        </div>
                        {formData.teamPreference === "have-team" && (
                          <>
                            <div>
                              <span className="text-sm text-gray-500">Team Name:</span>
                              <p>{formData.teamName}</p>
                            </div>
                            {formData.teamMembers && (
                              <div>
                                <span className="text-sm text-gray-500">Team Members:</span>
                                <p className="whitespace-pre-wrap">{formData.teamMembers}</p>
                              </div>
                            )}
                          </>
                        )}
                        {formData.projectIdea && (
                          <div>
                            <span className="text-sm text-gray-500">Project Idea:</span>
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
                      Back
                    </Button>
                  )}
                  
                  {currentStep < STEPS.length ? (
                    <Button type="button" onClick={nextStep} className="ml-auto">
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-accent hover:bg-accent/90 ml-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
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
