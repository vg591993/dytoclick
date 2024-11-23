// src/components/landing/TimelineSection.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TimelineSectionProps {
  scrollY: number;
}

export default function TimelineSection({ scrollY }: TimelineSectionProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="container mx-auto px-6 py-24 bg-white/50 backdrop-blur-lg rounded-3xl">
      <div className="flex justify-center space-x-4 mb-12">
        {(['daily', 'weekly', 'monthly'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === tab 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-emerald-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Plan
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-all cursor-pointer"
              style={{
                opacity: 1 - (item * 0.1),
                transform: `translateX(${activeTab === 'daily' ? '0' : activeTab === 'weekly' ? '20px' : '40px'})`
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div>
                  <h4 className="font-bold">Milestone {item}</h4>
                  <p className="text-gray-600">Description for {activeTab} milestone {item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${Math.sin(scrollY * 0.01) * 10}px, ${Math.cos(scrollY * 0.01) * 10}px)`
            }}
          ></div>
          <Image
            src="/api/placeholder/400/400"
            alt="Timeline illustration"
            width={400}
            height={400}
            className="relative z-10 rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}