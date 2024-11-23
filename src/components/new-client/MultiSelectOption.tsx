// src/components/new-client/MultiSelectOption.tsx
import { Check } from 'lucide-react';

interface MultiSelectOptionProps {
  label: string;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
}

export const MultiSelectOption = ({ label, value, selected, onChange }: MultiSelectOptionProps) => (
  <div 
    onClick={() => onChange(value)}
    className={`
      p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200
      flex items-center justify-between
      ${selected 
        ? 'bg-teal-500 text-white shadow-md' 
        : 'bg-white hover:bg-teal-50 border border-gray-200'
      }
    `}
  >
    <span className="text-sm">{label}</span>
    {selected && <Check className="w-4 h-4" />}
  </div>
);