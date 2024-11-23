// src/components/health/RequirementsGrid.tsx
import { Zap, Apple } from 'lucide-react';
import { DataCard } from './DataCard';
import { Requirements } from '@/types/health';

interface RequirementsGridProps {
  requirements: Requirements;
  foodPreferences: string[];
}

export const RequirementsGrid = ({ requirements, foodPreferences }: RequirementsGridProps) => (
  <div className="grid md:grid-cols-2 gap-8">
    <DataCard title="Daily Requirements" icon={Zap}>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(requirements).map(([key, value]) => (
          <div key={key} className="inner-card p-6 hover-float">
            <p className="text-sm font-medium text-[#2a5b52]/70 capitalize text-zoom-hover">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </p>
            <p className="text-2xl font-semibold gradient-text mt-2 content-zoom-hover">
              {value}
              <span className="text-sm text-[#2a5b52]/70 ml-1">
                {key === 'supplementPercent' ? '%' : key === 'energy' ? 'kCal' : 'g'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </DataCard>

    <DataCard title="Food Preferences" icon={Apple}>
      <div className="flex flex-wrap gap-3">
        {foodPreferences.map((food) => (
          <span key={food} 
                className="action-card px-5 py-3 text-[#2a5b52] text-sm font-medium 
                         hover-float text-zoom-hover">
            {food}
          </span>
        ))}
      </div>
    </DataCard>
  </div>
);