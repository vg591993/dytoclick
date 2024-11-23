// src/components/new-client/steps/SupplementStep.tsx
import { ClientFormData } from '@/types/client';

interface SupplementStepProps {
  formData: ClientFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const SupplementStep: React.FC<SupplementStepProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Supplement Information</h3>
      
      <div>
        <label htmlFor="supplementPercentage" className="block text-sm font-medium text-gray-700 mb-1">
          Supplement Percentage
        </label>
        <input
          type="number"
          id="supplementPercentage"
          name="supplementPercentage"
          value={formData.supplementPercentage}
          onChange={handleChange}
          min="0"
          max="100"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="supplementKcal" className="block text-sm font-medium text-gray-700 mb-1">
          Supplement Calories (kcal)
        </label>
        <input
          type="number"
          id="supplementKcal"
          name="supplementKcal"
          value={formData.supplementKcal}
          onChange={handleChange}
          min="0"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );
};