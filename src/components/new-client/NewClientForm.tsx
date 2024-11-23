// src/components/new-client/NewClientForm.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ClientFormData, MultiSelectField } from '@/types/client';
import { INITIAL_FORM_DATA } from '@/constants/form-options';
import { addNewClient } from '@/app/api/services/newClientApi';
import { StepIndicator } from './StepIndicator';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { DietaryOptionsStep } from './steps/DietaryOptionsStep';
import { LiquidDietaryStep } from './steps/LiquidDietaryStep';
import { DiseaseStep } from './steps/DiseaseStep';
import { SupplementStep } from './steps/SupplementStep';
import { Header } from './Header';

const NewClientForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ClientFormData>(INITIAL_FORM_DATA);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (field: MultiSelectField, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: prev[field].includes(value)
      ? prev[field].filter(item => item !== value)
      : [...prev[field], value]
  }));
};

  const handleNextStep = () => {
    setStep(currentStep => Math.min(currentStep + 1, 5));
    console.log(formData)
  };

  const handlePrevStep = () => {
    setStep(currentStep => Math.max(currentStep - 1, 1));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
  
    // Basic field validation
    if (!formData.name) errors.push('Name is required');
    if (!formData.age) errors.push('Age is required');
    if (!formData.height) errors.push('Height is required');
    if (!formData.weight) errors.push('Weight is required');
    if (!formData.gender) errors.push('Gender is required');
    if (!formData.activityLevel) errors.push('Activity level is required');
  
    // Multi-select validation
    if (formData.dietaryOptions.length === 0) {
      errors.push('Please select at least one dietary preference');
    }
    if (formData.liquidDietary.length === 0) {
      errors.push('Please select at least one liquid preference');
    }
    if (formData.healthIssues.length === 0) {
      errors.push('Please select at least one health condition');
    }
  
    return errors;
  };

  const handleFinalSubmit = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
  
    try {
      const result = await addNewClient(formData);
      
      if (result.success) {
        console.log('Form submitted successfully:', result.data);
        router.push(`/dashboard/health?clientID=${formData.id}`);
      } else {
        alert(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
      case 2:
        return <DietaryOptionsStep formData={formData} handleMultiSelect={handleMultiSelect} />;
      case 3:
        return <LiquidDietaryStep formData={formData} handleMultiSelect={handleMultiSelect} />;
      case 4:
        return <DiseaseStep formData={formData} handleMultiSelect={handleMultiSelect} />;
      case 5:
        return <SupplementStep formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <Header />
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-center">
          New Client Registration
        </CardTitle>
        <StepIndicator currentStep={step} />
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {renderStep()}
          <div className="flex justify-between mt-6">
            {/* Previous Button */}
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Previous</span>
              </button>
            )}
            {/* Spacer when Previous button is hidden */}
            {step === 1 && <div />}
            
            {/* Next/Submit Button */}
            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              >
                <span className="text-sm sm:text-base">Next</span>
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
              >
                <span className="text-sm sm:text-base">Submit</span>
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewClientForm;