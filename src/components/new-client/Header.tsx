// src/components/new-client/Header.tsx

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Option 1: Using onError fallback
export const Header = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/dashboard" 
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex-shrink-0">
            {!imageError ? (
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={300}
                className="h-12 w-auto"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <span className="text-lg font-semibold text-gray-900">DytoClick</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};