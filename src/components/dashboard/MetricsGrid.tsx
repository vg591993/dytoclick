// src/components/dashboard/MetricsGrid.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Metric } from '@/types/dashboard';

interface MetricsGridProps {
  metrics: Metric[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {metrics.map((metric, index) => (
      <Card key={index} className="group bg-gradient-to-br from-white to-teal-50 rounded-2xl border-none shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{metric.title}</p>
              <h3 className="text-2xl font-medium bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                {metric.value}
              </h3>
            </div>
            <div className="p-3 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-xl text-teal-500 group-hover:scale-110 transition-transform duration-300">
              {metric.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-emerald-500">{metric.trend}</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default MetricsGrid;