// src/components/new-client/steps/DietaryOptionsStep.tsx
import { DIETARY_OPTIONS } from '@/constants/form-options';
import { ClientFormData, MultiSelectField } from '@/types/client';
import { MultiSelectOption } from '../MultiSelectOption';

interface DietaryOptionsStepProps {
  formData: ClientFormData;
  handleMultiSelect: (field: MultiSelectField, value: string) => void;
}

export const DietaryOptionsStep: React.FC<DietaryOptionsStepProps> = ({ formData, handleMultiSelect }) => {
  const handleSelectAll = () => {
    const isAllSelected = DIETARY_OPTIONS.every(option => 
      formData.dietaryOptions.includes(option.value)
    );

    if (isAllSelected) {
      // Deselect all
      DIETARY_OPTIONS.forEach(option => {
        if (formData.dietaryOptions.includes(option.value)) {
          handleMultiSelect('dietaryOptions', option.value);
        }
      });
    } else {
      // Select all
      DIETARY_OPTIONS.forEach(option => {
        if (!formData.dietaryOptions.includes(option.value)) {
          handleMultiSelect('dietaryOptions', option.value);
        }
      });
    }
  };

  const isAllSelected = DIETARY_OPTIONS.every(option => 
    formData.dietaryOptions.includes(option.value)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Dietary Preferences</h3>
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
        {DIETARY_OPTIONS.map((option) => (
          <MultiSelectOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={formData.dietaryOptions?.includes(option.value)}
            onChange={() => handleMultiSelect('dietaryOptions', option.value)}
          />
        ))}
      </div>
    </div>
  );
};