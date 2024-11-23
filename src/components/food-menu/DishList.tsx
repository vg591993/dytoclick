// src/components/food-menu/DishList.tsx

'use client';

import React, { useState } from 'react';
import { DishCard } from './DishCard';
import { DishModal } from './DishModal';
import { ApiDish } from '@/app/api/services/menu-api';

interface DishListProps {
  dishes: ApiDish[];
}

export const DishList: React.FC<DishListProps> = ({ dishes }) => {
  const [selectedDish, setSelectedDish] = useState<ApiDish | null>(null);

  if (dishes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No dishes available for this time.</p>
        <p className="text-gray-400 mt-2">Check back later for updates!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map(dish => (
          <DishCard
            key={dish.name} 
            dish={dish} 
            onClick={() => setSelectedDish(dish)}
          />
        ))}
      </div>

      {selectedDish && (
        <DishModal 
          dish={selectedDish} 
          onClose={() => setSelectedDish(null)} 
        />
      )}
    </>
  );
};

export default DishList;