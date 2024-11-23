// src/components/food-menu/DishModal.tsx

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createPortal } from 'react-dom';
import { NutritionOverview } from './NutritionOverview';
import { ApiDish } from '@/app/api/services/menu-api';

interface DishModalProps {
  dish: ApiDish;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose }) => {
  return createPortal(
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto pt-10 pb-10"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl mx-4 animate-modalSlideIn"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-white shadow-xl overflow-hidden">
          <CardHeader className="relative h-24 bg-gradient-to-br from-[#61b9b4] to-[#abd8bd] flex items-center justify-center">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              <span className="text-2xl">×</span>
            </button>
            <CardTitle className="text-2xl font-bold text-[#072024]">{dish.name}</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Ingredients Section */}
            <section>
              <h3 className="text-xl font-semibold py-2	text-gray-800 mb-4">Ingredients</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {dish.dishComponentDaoSet.map((component, index) => (
                  <div 
                    key={component.dishComponentName}
                    className="bg-[#e8fff9] rounded-lg p-3 opacity-0 animate-slideInRight"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-gray-800 font-medium">
                      {component.dishComponentName.split('@')[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {component.amount.toFixed(1)}ml
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Nutrition Section */}
            <NutritionOverview
              type="dish"
              calories={dish.energyInKcal}
              macronutrients={dish.macronutrientValues}
              micronutrients={dish.micronutrientValues}
            />
          </CardContent>
        </Card>
      </div>
    </div>,
    document.body
  );
};

export default DishModal;