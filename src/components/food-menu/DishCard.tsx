// src/components/food-menu/DishCard.tsx

import React from 'react';
import { ApiDish } from '@/app/api/services/menu-api';

interface DishCardProps {
  dish: ApiDish;
  onClick: (dish: ApiDish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onClick }) => (
  <div 
    className="group bg-[#fff5e3] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden opacity-0 animate-fadeIn"
    onClick={() => onClick(dish)}
  >
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#2C4F45] transition-colors">
          {dish.name}
        </h3>
        <span className="text-lg font-medium text-[#2C4F45]">
          {dish.energyInKcal.toFixed(1)} cal
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        {dish.macronutrientValues.map(macro => (
          <div key={macro.name}>
            <div className="text-sm text-gray-500">{macro.name.toLowerCase()}</div>
            <div className="text-lg font-medium text-gray-700">
              {macro.consumedValue.toFixed(1)}g
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="px-6 py-4 bg-[#f9e8cb] text-sm text-gray-500 flex justify-between items-center">
      <span>{dish.amount} {dish.dishMeasuringUnit}</span>
      <span className="text-[#2C4F45] font-medium">View →</span>
    </div>
  </div>
);

export default DishCard;
