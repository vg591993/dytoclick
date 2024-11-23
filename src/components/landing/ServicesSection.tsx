// src/components/landing/ServicesSection.tsx
'use client';

import { useState } from 'react';
import { User, Calendar, BarChart, ArrowRight } from 'lucide-react';
import { Service } from '@/types/landing';

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services: Service[] = [
    {
      icon: <User className="w-12 h-12" />,
      title: "Personal Consultation",
      description: "One-on-one sessions with certified dieticians"
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Meal Planning",
      description: "Customized meal plans based on your health conditions"
    },
    {
      icon: <BarChart className="w-12 h-12" />,
      title: "Progress Tracking",
      description: "Monitor your health journey with detailed analytics"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl bg-white/50 backdrop-blur-lg hover:bg-white transition-all duration-300 cursor-pointer group"
            onMouseEnter={() => setHoveredService(index)}
            onMouseLeave={() => setHoveredService(null)}
            style={{
              transform: hoveredService === index ? 'scale(1.05)' : 'scale(1)',
              boxShadow: hoveredService === index ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
            }}
          >
            <div className="text-emerald-500 mb-4 transform transition-transform group-hover:scale-110">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}