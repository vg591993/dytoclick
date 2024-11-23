// src/components/health/DashboardHeader.tsx
import { Heart } from 'lucide-react';
import Image from 'next/image';

export const DashboardHeader = () => (
  <div className="text-center space-y-6 mb-12">
    <div className="w-24 h-24 mx-auto bg-gradient-to-br rounded-lg 
                    flex items-center justify-center mb-6 hover:shadow-xl 
                    transition-all duration-300 hover:scale-[1.02]">
      <div className="flex-shrink-0">
            <Image
              src="/logo.png" // Make sure to add your logo to the public folder
              alt="Logo"
              width={120}
              height={120}
              className="h-20 w-auto"
            />
          </div>
    </div>
    <h1 className="text-4xl font-bold gradient-text">
      Client Dashboard
    </h1>
    <p className="text-lg text-[#2a5b52]/80">Comprehensive Health Profile</p>
  </div>
);