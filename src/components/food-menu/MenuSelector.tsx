'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DishList } from './DishList';
import { MenuSelectionModal } from './MenuSelectionModal';
import { NutritionOverview } from './NutritionOverview';
import { Home, ChevronLeft, Menu as MenuIcon } from 'lucide-react';
import { menuApi, Menu, ApiDish } from '@/app/api/services/menu-api';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const formatMealName = (meal: string) => {
  return meal.split(/(?=[A-Z])/).join(' ');
};

export const MenuSelector = () => {
  const [selectedMenu, setSelectedMenu] = useState<{name: string} | null>(null);
  const [showMenuSelection, setShowMenuSelection] = useState(true);
  const [menuData, setMenuData] = useState<Menu | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientID = searchParams.get('clientID') || '';

  const handleMenuSelect = async ( menuName: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const menuDetails = await menuApi.getMenuDetails(clientID, menuName);
      setSelectedMenu({ name: menuName });
      setMenuData(menuDetails);
      setShowMenuSelection(false);
    } catch (err) {
      console.error('Error fetching menu details:', err);
      setError('Failed to load menu details. Please try again.');
      setSelectedMenu(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedMenu || showMenuSelection) {
    return <MenuSelectionModal onSelect={handleMenuSelect} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f6f0c4] via-[#c2e1bf] to-[#5ab6b4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C4F45] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu details...</p>
        </div>
      </div>
    );
  }

  if (error || !menuData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f6f0c4] via-[#c2e1bf] to-[#5ab6b4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Failed to load menu data'}</p>
          <Button 
            onClick={() => setShowMenuSelection(true)}
            className="bg-[#2C4F45] text-white hover:bg-[#1A2F29]"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f0c4] via-[#c2e1bf] to-[#5ab6b4]">
      <div className="bg-[#f5f3dd] shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                src="/logo.png" // Make sure to add your logo to the public folder
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push('/dashboard')}
                className="hover:bg-white-100"
              >
                <Home className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.history.back()}
                className="hover:bg-white-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <span className="text-lg font-medium text-gray-900">{selectedMenu.name}</span>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowMenuSelection(true)}
              className="flex items-center space-x-2 bg-[#c3e2d3] hover:bg-[#8ccab9]"
            >
              <MenuIcon className="h-4 w-4" />
              <span>Change Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 ">
        <NutritionOverview
          type="menu"
          calories={menuData.calories}
          macronutrients={menuData.macronutrientValues}
          micronutrients={menuData.micronutrientValues}
          mealDistribution={menuData.mealDistribution}
          className="mb-6"
        />

        <Tabs defaultValue="breakfast" className="w-full">
          <TabsList className="grid grid-cols-5 gap-1 mb-8 bg-gray-100/50 p-1 rounded-lg max-w-3xl mx-auto">
            {Object.keys(menuData.dishes).map((meal) => (
              <TabsTrigger
                key={meal}
                value={meal}
                className="text-gray-600 data-[state=active]:bg-[#61b9b5] data-[state=active]:text-white transition-all duration-300"
              >
                {formatMealName(meal)}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuData.dishes).map(([meal, dishes]) => (
            <TabsContent key={meal} value={meal}>
              <DishList dishes={dishes} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MenuSelector;