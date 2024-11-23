import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MicroNutrient, MacroNutrient } from '@/types/foodmenu';

interface NutritionOverviewProps {
  type: 'menu' | 'dish';
  calories: number;
  macronutrients: MacroNutrient[];
  micronutrients: MicroNutrient[];
  mealDistribution?: {
    breakfast: number;
    lunch: number;
    dinner: number;
    daySnacks: number;
    eveningSnacks: number;
  };
  className?: string;
}

// Helper to calculate macronutrient percentages
const calculateMacroPercentage = (macro: MacroNutrient, totalCalories: number): number => {
  const caloriesPerGram = macro.name === 'FAT' ? 9 : 4;
  const macroCalories = macro.consumedValue * caloriesPerGram;
  return (macroCalories / totalCalories) * 100;
};

const MacroCard = ({ label, value, unit, calories, totalCalories }: { 
  label: string; 
  value: number; 
  unit: string; 
  calories?: number;
  totalCalories?: number;
}) => {
  const percentage = calories && totalCalories 
    ? (calories / totalCalories) * 100 
    : undefined;

  return (
    <div className="bg-[#fcf5cc] rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-700 mb-1">{label}</div>
      <div className="text-xl font-semibold text-gray-900">{value.toFixed(1)}{unit}</div>
      {/* {percentage !== undefined && (
        <div className="text-sm text-gray-500">{percentage.toFixed(1)}% of total</div>
      )} */}
    </div>
  );
};

const MicroCard = ({ label, value, unit }: { label: string; value?: number; unit: string }) => (
  <div className="bg-[#f7ffd4] rounded-lg p-3">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-lg font-medium text-gray-700">
      {value ? `${value.toFixed(3)}${unit}` : 'N/A'}
    </div>
  </div>
);

const MealDistributionBar = ({ distribution, totalCalories }: { 
  distribution: NutritionOverviewProps['mealDistribution'];
  totalCalories: number;
}) => {
  if (!distribution) return null;
  
  const meals: Array<{ key: keyof typeof distribution; color: string; label: string }> = [
    { key: 'breakfast', color: '#2C4F45', label: 'Breakfast' },
    { key: 'lunch', color: '#3D6A5B', label: 'Lunch' },
    { key: 'dinner', color: '#4E8571', label: 'Dinner' },
    { key: 'daySnacks', color: '#5FA087', label: 'Day Snacks' },
    { key: 'eveningSnacks', color: '#70BB9D', label: 'Evening Snacks' }
  ];

  // Calculate percentages based on actual calorie values
  const percentages = Object.entries(distribution).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: (value / totalCalories) * 100
  }), {} as Record<string, number>);

  let currentPosition = 0;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700">Calorie Distribution</div>
      <div className="flex justify-between text-xs text-gray-500 pt-1"> Coming Soon...</div>
      {/* <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        {meals.map(({ key, color }) => {
          const width = percentages[key];
          const left = currentPosition;
          currentPosition += width;
          
          return (
            <div
              key={key}
              className="absolute h-full"
              style={{
                backgroundColor: color,
                left: `${left}%`,
                width: `${width}%`
              }}
            />
          );
        })}
      </div> */}
      {/* <div className="flex justify-between text-xs text-gray-500 pt-1">
        {meals.map(({ key, label }) => (
          <span key={key} className="whitespace-nowrap">
            {label} ({percentages[key].toFixed(1)}%)
          </span>
        ))}
      </div> */}
    </div>
  );
};

// Rest of the helper functions remain the same
function groupMicronutrients(micronutrients: MicroNutrient[]) {
  const groups = new Map<string, MicroNutrient[]>();

  micronutrients.forEach(micro => {
    const name = micro.micronutrient.toLowerCase();
    let group = 'other';

    if (name.includes('vitamin')) group = 'vitamins';
    else if (name.includes('mineral') || 
             name.includes('calcium') || 
             name.includes('iron') || 
             name.includes('zinc') || 
             name.includes('magnesium') ||
             name.includes('selenium') ||
             name.includes('potassium') ||
             name.includes('sodium') ||
             name.includes('copper')) {
      group = 'minerals';
    }
    else if (name.includes('acid')) group = 'acids';

    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)?.push(micro);
  });

  return groups;
}

function extractUnit(name: string): string {
  const match = name.match(/in\s+(\w+)$/);
  return match ? match[1] : '';
}

function formatMicroName(name: string): string {
  return name.split('in')[0].trim();
}

export const NutritionOverview: React.FC<NutritionOverviewProps> = ({ 
  type,
  calories,
  macronutrients,
  micronutrients,
  mealDistribution,
  className
}) => {
  const [showMicros, setShowMicros] = useState(false);
  const groupedMicros = groupMicronutrients(micronutrients);

  return (
    <Card className={cn("bg-[#fffaed] p-6", className)}>
      <div className=" flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {type === 'menu' ? 'Daily Nutrition Overview' : 'Nutrition Information'}
        </h2>
        <Button 
          variant="outline"
          onClick={() => setShowMicros(!showMicros)}
          className="text-sm border-[#2C4F45] text-[#2C4F45] hover:bg-[#2C4F45] hover:text-white"
        >
          {showMicros ? 'Show Macros' : 'Show Micros'}
        </Button>
      </div>

      {!showMicros ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MacroCard 
              label="Calories" 
              value={calories} 
              unit="kcal"
              calories={calories}
              totalCalories={calories}
            />
            {macronutrients.map(macro => {
              const caloriesPerGram = macro.name === 'FAT' ? 9 : 4;
              const macroCalories = macro.consumedValue * caloriesPerGram;
              
              return (
                <MacroCard 
                  key={macro.name}
                  label={macro.name.toLowerCase()}
                  value={macro.consumedValue}
                  unit="g"
                  calories={macroCalories}
                  totalCalories={type === 'menu' ? calories : undefined}
                />
              );
            })}
          </div>

          {type === 'menu' && mealDistribution && (
            <MealDistributionBar 
              distribution={mealDistribution}
              totalCalories={calories}
            />
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(groupedMicros.entries()).map(([groupName, nutrients]) => (
            <div key={groupName}>
              <h4 className="text-lg font-medium text-gray-800 mb-3 capitalize">{groupName}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nutrients.map((nutrient) => (
                  <MicroCard
                    key={nutrient.micronutrient}
                    label={formatMicroName(nutrient.micronutrient)}
                    value={nutrient.value}
                    unit={extractUnit(nutrient.micronutrient)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default NutritionOverview;