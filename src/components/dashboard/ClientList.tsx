// src/components/dashboard/ClientList.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Star, Edit } from 'lucide-react';
import { Consultation } from '@/types/dashboard';

interface ClientListProps {
  clients: Consultation[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => (
  <Card className="md:col-span-3 bg-gradient-to-br from-white to-teal-50 rounded-2xl border-none shadow-sm hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between p-6">
      <CardTitle className="text-lg font-medium bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
        Client List
      </CardTitle>
      <button className="text-teal-500 hover:text-emerald-500 flex items-center space-x-2 text-sm group transition-colors duration-300">
        <span>View All</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clients.map((client, index) => (
          <div key={index} className="group p-4 bg-white rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">{client.name}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="text-sm text-gray-500">{client.type}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-teal-500 group-hover:text-emerald-500 transition-colors">Active Plan</span>
              <button className="p-1 rounded-full hover:bg-teal-100 text-gray-400 hover:text-teal-500 transition-all duration-300">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ClientList;