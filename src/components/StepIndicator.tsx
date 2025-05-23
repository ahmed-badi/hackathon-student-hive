
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps: { label: string }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;
          
          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${isCompleted ? "bg-primary border-primary text-white" : 
                      isCurrent ? "border-primary text-primary" : 
                      "border-gray-300 text-gray-400"}
                  `}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className={`mt-2 text-xs sm:text-sm ${isCurrent ? "text-primary font-medium" : "text-gray-500"}`}>
                  {step.label}
                </div>
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-300 sm:mx-2 relative top-[-13px]">
                  <div
                    className={`h-full ${
                      index < currentStep - 1 ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
