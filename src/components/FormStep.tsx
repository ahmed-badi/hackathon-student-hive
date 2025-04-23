
import React from "react";

interface FormStepProps {
  title: string;
  description?: string;
  currentStep: number;
  stepNumber: number;
  children: React.ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({
  title,
  description,
  currentStep,
  stepNumber,
  children,
}) => {
  const isActive = currentStep === stepNumber;
  
  if (!isActive) return null;
  
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
      {children}
    </div>
  );
};

export default FormStep;
