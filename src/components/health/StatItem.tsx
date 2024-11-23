// src/components/health/StatItem.tsx
interface StatItemProps {
    label: string;
    value: string | number;
    unit?: string;
  }
  
  export const StatItem = ({ label, value, unit }: StatItemProps) => (
    <div className="inner-card p-4 hover-float">
      <span className="text-[#2a5b52]/80 font-medium block text-zoom-hover">{label}</span>
      <p className="text-lg font-semibold text-[#1e453e] mt-1 text-zoom-hover">
        {value} {unit && <span className="text-sm text-[#2a5b52]/70">{unit}</span>}
      </p>
    </div>
  );