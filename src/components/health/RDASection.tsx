// src/components/health/RDASection.tsx
import { Leaf, Droplets, Activity } from 'lucide-react';
import { DataCard } from './DataCard';
import { RDAData } from '@/types/health';

interface RDASectionProps {
  rdaData: RDAData;
}

export const RDASection = ({ rdaData }: RDASectionProps) => (
  <div className="grid md:grid-cols-3 gap-8">
    {[
      { title: "Macronutrients", icon: Leaf, data: rdaData.macros },
      { title: "Vitamins", icon: Droplets, data: rdaData.vitamins },
      { title: "Minerals", icon: Activity, data: rdaData.minerals }
    ].map(({ title, icon, data }) => (
      <DataCard key={title} title={title} icon={icon}>
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} 
                 className="flex justify-between items-center py-3 px-4 inner-card hover-float">
              <span className="text-sm font-medium text-[#2a5b52]/80 text-zoom-hover">{key}</span>
              <span className="text-sm font-semibold text-[#1e453e] text-zoom-hover">{value}</span>
            </div>
          ))}
        </div>
      </DataCard>
    ))}
  </div>
);