// src/components/health/DataCard.tsx
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface DataCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const DataCard = ({ title, icon: Icon, children, className }: DataCardProps) => (
  <Card className={`base-card group hover:shadow-xl ${className}`}>
    <CardContent className="p-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#f8e6d3]/10 to-[#d4ebe4]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[#d4ebe4]/10 to-[#f8e6d3]/10 rounded-full blur-3xl"></div>
      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl action-card transition-transform duration-300 group-hover:translate-y-[-4px]">
            <Icon className="w-6 h-6 text-[#2a5b52]" />
          </div>
          <h3 className="text-xl font-semibold gradient-text group-hover:scale-[1.02] transition-all duration-300">{title}</h3>
        </div>
        {children}
      </div>
    </CardContent>
  </Card>
);