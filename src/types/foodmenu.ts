// src/types/foodmenu.ts

export interface Ingredient {
    name: string;
    amount: number;
    foodVolumeInMilliLiter: number;
  }
  
  export interface MacroNutrient {
  name: string;
  consumedValue: number;
}
  
  export interface MicroNutrient {
    micronutrient: string;
    value: number;
  }
  
  export interface MealDistribution {
    breakfast: number;
    lunch: number;
    dinner: number;
    daySnacks: number;
    eveningSnacks: number;
  }
  
  export interface Dish {
    name: string;
    amount: number;
    unit: string;
    foodVolumeInMilliLiter: number;
    calories: number;
    macros: MacroNutrient;
    microNutrients?: MicroNutrient;
    //tags: string[];
    ingredients: Ingredient[];  
  }
  
  export interface Menu {
    //id: string;
    name: string;
    calories: number;
    macros: MacroNutrient;
    microNutrients: MicroNutrient;
    mealDistribution: MealDistribution;
    dishes: {
      breakfast: Dish[];
      lunch: Dish[];
      dinner: Dish[];
      daySnacks: Dish[];
      eveningSnacks: Dish[];
    };
  }