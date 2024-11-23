// src/components/new-client/steps/LiquidDietaryStep.tsx
import { LIQUID_OPTIONS } from '@/constants/form-options';
import { ClientFormData, MultiSelectField } from '@/types/client';
import { MultiSelectOption } from '../MultiSelectOption';

interface LiquidDietaryStepProps {
  formData: ClientFormData;
  handleMultiSelect: (field: MultiSelectField, value: string) => void;
}

export const LiquidDietaryStep: React.FC<LiquidDietaryStepProps> = ({ formData, handleMultiSelect }) => {
  const handleSelectAll = () => {
    const isAllSelected = LIQUID_OPTIONS.every(option => 
      formData.liquidDietary.includes(option.value)
    );

    if (isAllSelected) {
      // Deselect all
      LIQUID_OPTIONS.forEach(option => {
        if (formData.liquidDietary.includes(option.value)) {
          handleMultiSelect('liquidDietary', option.value);
        }
      });
    } else {
      // Select all
      LIQUID_OPTIONS.forEach(option => {
        if (!formData.liquidDietary.includes(option.value)) {
          handleMultiSelect('liquidDietary', option.value);
        }
      });
    }
  };

  const isAllSelected = LIQUID_OPTIONS.every(option => 
    formData.liquidDietary.includes(option.value)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Liquid Dietary Preferences</h3>
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
        {LIQUID_OPTIONS.map((option) => (
          <MultiSelectOption
            key={option.value}
            label={option.label}
            value={option.value}
            selected={formData.liquidDietary?.includes(option.value)}
            onChange={() => handleMultiSelect('liquidDietary', option.value)}
          />
        ))}
      </div>
    </div>
  );
};