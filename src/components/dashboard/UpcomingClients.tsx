// src/components/dashboard/UpcomingClients.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Timer } from 'lucide-react';
import { Consultation } from '@/types/dashboard';

interface UpcomingClientsProps {
  consultations: Consultation[];
}

const UpcomingClients: React.FC<UpcomingClientsProps> = ({ consultations }) => (
  <Card className="bg-gradient-to-br from-white to-teal-50 rounded-2xl border-none shadow-sm hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between p-6">
      <CardTitle className="text-lg font-medium bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
        Upcoming Clients
      </CardTitle>
      <button className="p-2 rounded-full hover:bg-teal-100 text-teal-500 transition-colors duration-300 transform hover:rotate-90">
        <Plus className="w-5 h-5" />
      </button>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="space-y-4">
        {consultations.map((consultation, index) => (
          <div key={index} 
            className="group p-4 bg-white rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer transform hover:-translate-x-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">{consultation.name}</p>
                {/* <p className="text-sm text-gray-500">{consultation.type}</p> */}
              </div>
              <div className="flex items-center text-teal-500 text-sm">
                <Timer className="w-4 h-4 mr-1 group-hover:animate-pulse" />
                <span>{consultation.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default UpcomingClients;