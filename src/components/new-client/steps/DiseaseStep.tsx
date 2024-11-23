// src/components/new-client/steps/DiseaseStep.tsx
import { DISEASE_OPTIONS } from '@/constants/form-options';
import { ClientFormData, MultiSelectField } from '@/types/client';
import { MultiSelectOption } from '../MultiSelectOption';

interface DiseaseStepProps {
  formData: ClientFormData;
  handleMultiSelect: (field: MultiSelectField, value: string) => void;
}

export const DiseaseStep: React.FC<DiseaseStepProps> = ({ formData, handleMultiSelect }) => {
  const handleSelectAll = () => {
    const isAllSelected = DISEASE_OPTIONS.every(option => 
      formData.healthIssues.includes(option.value)
    );

    if (isAllSelected) {
      // Deselect all
      DISEASE_OPTIONS.forEach(option => {
        if (formData.healthIssues.includes(option.value)) {
          handleMultiSelect('healthIssues', option.value);
        }
      });
    } else {
      // Select all
      DISEASE_OPTIONS.forEach(option => {
        if (!formData.healthIssues.includes(option.value)) {
          handleMultiSelect('healthIssues', option.value);
        }
      });
    }
  };

  const isAllSelected = DISEASE_OPTIONS.every(option => 
    formData.healthIssues.includes(option.value)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Health Conditions</h3>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSelectAll}
          className={`
            px-4 py-2 rounded-lg text-sm transition-all duration-200
            ${isAllSelected 
              ? 'bg-teal-500 text-white hover:bg-teal-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      <div className="mt-4">
        {DISEASE_OPTIONS.map((option) => (
          <MultiSelectOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={formData.healthIssues?.includes(option.value)}
            onChange={() => handleMultiSelect('healthIssues', option.value)}
          />
        ))}
      </div>
    </div>
  );
};