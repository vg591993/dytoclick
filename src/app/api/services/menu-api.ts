// src/services/menu-api.ts

import { MacroNutrient, MicroNutrient } from "@/types/foodmenu";

// API Response Types
export interface MenuListResponse {
  id: string;
  name: string;
}

export interface ApiMicroNutrient {
  micronutrient: string;
  value: number;
}

export interface ApiMacroNutrient {
  name: string;
  consumedValue: number;
}

export interface ApiDishComponent {
  amount: number;
  dishComponentName: string;
  foodVolumeInMilliLiter: number;
}

export interface ApiDish {
  amount: number;
  name: string;
  dishMeasuringUnit: string;
  dishComponentDaoSet: ApiDishComponent[];
  energyInKcal: number;
  micronutrientValues: ApiMicroNutrient[];
  macronutrientValues: ApiMacroNutrient[];
}

export interface ApiMealData {
  mealName: string;
  dishDao: ApiDish[];
}

export interface ApiMenuDetailsResponse {
  menu: ApiMealData[];
  exchangeListOfRecommendedMenuPlan: {
    total_carbohydrate_in_gram: number;
    total_protein_in_gram: number;
    total_fat_in_gram: number;
    total_energy_in_kcal: number;
  };
  listOfMicronutrients: ApiMicroNutrient[];
}

// Interface for our application's menu type

export interface Menu {
  id: string;
  name: string;
  calories: number;
  mealDistribution: {
    breakfast: number;
    lunch: number;
    dinner: number;
    daySnacks: number;
    eveningSnacks: number;
  };
  dishes: {
    breakfast: ApiDish[];
    lunch: ApiDish[];
    dinner: ApiDish[];
    daySnacks: ApiDish[];
    eveningSnacks: ApiDish[];
  };
  macronutrientValues: MacroNutrient[];
  micronutrientValues: MicroNutrient[];
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// Helper function to map API response to our Menu interface
// Update the mapping function to match the new structure
function mapMenuDetailsToInterface(response: ApiMenuDetailsResponse): Menu {
  // Initialize dishes object with explicit type and all required properties
  const dishes: {
    breakfast: ApiDish[];
    lunch: ApiDish[];
    dinner: ApiDish[];
    daySnacks: ApiDish[];
    eveningSnacks: ApiDish[];
  } = {
    breakfast: [],
    lunch: [],
    dinner: [],
    daySnacks: [],
    eveningSnacks: []
  };

  // Map meal names from API to our interface
  response.menu.forEach(meal => {
    switch (meal.mealName) {
      case 'BREAKFAST':
        dishes.breakfast = meal.dishDao;
        break;
      case 'LUNCH':
        dishes.lunch = meal.dishDao;
        break;
      case 'DINNER':
        dishes.dinner = meal.dishDao;
        break;
      case 'DAY_SNACKS':
        dishes.daySnacks = meal.dishDao;
        break;
      case 'EVENING_SNACKS':
        dishes.eveningSnacks = meal.dishDao;
        break;
    }
  });

  return {
    id: 'menu-id',
    name: 'Menu Name',
    calories: response.exchangeListOfRecommendedMenuPlan.total_energy_in_kcal,
    mealDistribution: {
      breakfast: 25,
      lunch: 30,
      dinner: 30,
      daySnacks: 7.5,
      eveningSnacks: 7.5
    },
    dishes: dishes, // Now explicitly typed
    macronutrientValues: [
      { name: 'PROTEIN', consumedValue: response.exchangeListOfRecommendedMenuPlan.total_protein_in_gram },
      { name: 'CARBOHYDRATE', consumedValue: response.exchangeListOfRecommendedMenuPlan.total_carbohydrate_in_gram },
      { name: 'FAT', consumedValue: response.exchangeListOfRecommendedMenuPlan.total_fat_in_gram }
    ],
    micronutrientValues: response.listOfMicronutrients
  };
}

export const menuApi = {
  getAuthToken(): string {
    const token = localStorage.getItem('authToken') || 
                 document.cookie.split('; ')
                 .find(row => row.startsWith('auth-token='))
                 ?.split('=')[1];
    if (!token) {
      throw new AuthError('No authentication token found');
    }
    return token;
  },

  async getMenus(): Promise<MenuListResponse[]> {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch('https://cytoclick.ai/backend/menus/names', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        throw new AuthError('Authentication failed');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        console.error('Authentication error:', error);
      } else {
        console.error('Error fetching menus:', error);
      }
      throw error;
    }
  },

  async getMenuDetails(clientId: string, menuName: string): Promise<Menu> {
    try {
      const token = this.getAuthToken();
      
      const response = await fetch(`https://cytoclick.ai/backend/menu/v4/${clientId}/${menuName}`, {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        throw new AuthError('Authentication failed');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiMenuDetailsResponse = await response.json();
      return mapMenuDetailsToInterface(data);
    } catch (error) {
      if (error instanceof AuthError) {
        console.error('Authentication error:', error);
      } else {
        console.error('Error fetching menu details:', error);
      }
      throw error;
    }
  }
};