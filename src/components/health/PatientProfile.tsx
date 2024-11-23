// src/components/health/PatientProfile.tsx
import { User } from 'lucide-react';
import { DataCard } from './DataCard';
import { StatItem } from './StatItem';
import { ClientData } from '@/types/health';

interface PatientProfileProps {
  clientData: ClientData;
}

export const PatientProfile = ({ clientData }: PatientProfileProps) => (
  <DataCard title="Cliet Profile" icon={User} className="md:col-span-2">
    <div className="grid md:grid-cols-4 gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a5b52] to-[#1e453e] 
                          flex items-center justify-center shadow-lg hover:shadow-xl 
                          transition-all duration-300 hover:scale-[1.02]">
            <span className="text-2xl font-bold text-[#f8e6d3]">{clientData.name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="text-xl font-semibold gradient-text text-zoom-hover">{clientData.name}</h4>
            <p className="text-sm text-[#2a5b52]/70 text-zoom-hover">ID: {clientData.id}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <StatItem label="Age" value={`${clientData.age} years`} />
        <StatItem label="Gender" value={clientData.gender} />
        <StatItem label="Height" value={clientData.height} unit="cm" />
        <StatItem label="Weight" value={clientData.weight} unit="kg" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatItem label="BMI" value={clientData.bmi} />
        <StatItem label="IBW" value={clientData.ibw} unit="kg" />
        <StatItem label="Activity" value={clientData.activityLevel} />
      </div>

      <div>
        <span className="text-sm font-medium text-gray-500">Diseases</span>
        <div className="flex flex-wrap gap-2 mt-3">
          {clientData.diseases.map((disease) => (
            <span key={disease} className="px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-xl text-sm font-medium">
              {disease}
            </span>
          ))}
        </div>
      </div>
    </div>
  </DataCard>
);
