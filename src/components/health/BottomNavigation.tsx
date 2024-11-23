"use client";
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BottomNavigationProps {
  isExpertMode: boolean;
  onExpertModeToggle: () => void;
  clientID: string; // Added clientID prop
}

export const BottomNavigation = ({ 
  isExpertMode, 
  onExpertModeToggle, 
  clientID 
}: BottomNavigationProps) => {
  const router = useRouter();

  const handleFoodMenuClick = () => {
    router.push(`/foodmenu?clientID=${clientID}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 will-change-transform">
      {/* Floating Expert Mode Button */}
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4 z-10 will-change-transform">
        <button 
          onClick={onExpertModeToggle}
          className={`w-20 h-20 rounded-full flex items-center justify-center
                     shadow-[0_8px_24px_-4px_rgba(42,91,82,0.3)] 
                     hover:shadow-[0_12px_28px_-6px_rgba(42,91,82,0.35)]
                     transition-all duration-300 ease-in-out
                     hover:transform hover:scale-105 hover:-translate-y-[2px]
                     ${isExpertMode 
                       ? 'bg-gradient-to-r from-[#2a5b52] to-[#1e453e] text-white' 
                       : 'bg-gradient-to-r from-[#f8f8f6] to-[#f4f7f6] text-[#2a5b52]'}`}
          title={isExpertMode ? 'Switch to Basic Mode' : 'Switch to Expert Mode'}
        >
          <span className="text-3xl font-bold">
            {isExpertMode ? 'B' : 'X'}
          </span>
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gradient-to-r from-[#fbf7f4] via-[#f4f7f6] to-[#ebf5f2] backdrop-blur-xl border-t border-[#d4ebe4] shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-[#2a5b52] hover:text-[#1e453e] 
                       transition-colors duration-200 group"
            >
              <div className="p-2 rounded-xl bg-gradient-to-r from-[#f8e6d3] to-[#e9f0e6] 
                            group-hover:shadow-md transition-all duration-200">
                <Home className="w-8 h-8" />
              </div>
              <span className="font-medium"></span>
            </Link>
            <div className="flex items-center gap-3">
            </div>
          </div>
          <div>
            <button 
              onClick={handleFoodMenuClick}
              className="px-6 py-3 bg-gradient-to-r from-[#2a5b52] via-[#1e453e] to-[#2a5b52] 
                             text-[#f8e6d3] rounded-xl hover-float content-zoom-hover">
              Food Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;