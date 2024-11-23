// src/components/landing/HeroSection.tsx
'use client';

import { ChevronRight, Apple, Carrot } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Your AI-Powered Nutrition Partner
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
          Transform your dietitian practice with intelligent, personalized nutrition guidance that scales with your client base.
          </p>
          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all hover:scale-105 flex items-center space-x-2">
              <span>Start Now</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-emerald-500 text-emerald-500 px-8 py-3 rounded-full hover:bg-emerald-50 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className={`relative transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
            <Image 
              src="/api/placeholder/600/600"
              alt="Healthy Food"
              width={600}
              height={600}
              className="relative z-10 rounded-3xl transform hover:scale-105 transition-transform"
            />
          </div>
          
          <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
            <Apple className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-100">
            <Carrot className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
