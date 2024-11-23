// src/components/dashboard/ClientProgress.tsx (continued)
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Edit } from 'lucide-react';

const ClientProgress: React.FC = () => (
  <Card className="md:col-span-2 bg-gradient-to-br from-white to-teal-50 rounded-2xl border-none shadow-sm hover:shadow-lg transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between p-6">
      <CardTitle className="text-lg font-medium bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
        Client Progress Overview
      </CardTitle>
      <button className="p-2 rounded-full hover:bg-teal-100 text-teal-500 transition-colors duration-300">
        <Edit className="w-5 h-5" />
      </button>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="h-64 bg-gradient-to-br from-white to-teal-50 rounded-xl p-4 group hover:shadow-inner transition-all duration-300">
        <BarChart3 className="w-full h-full text-teal-500 transition-all duration-300 group-hover:text-emerald-500" />
      </div>
    </CardContent>
  </Card>
);

export default ClientProgress;