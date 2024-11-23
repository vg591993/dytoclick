// src/types/health.ts
export interface ClientData {
    id: string;
    name: string;
    age: number;
    height: number;
    weight: number;
    gender: string;
    ibw: number;
    bmi: number;
    activityLevel: string;
    diseases: string[];
    foodPreferences: string[];
  }
  
  export interface Requirements {
    carbs: number;
    protein: number;
    fats: number;
    energy: number;
    supplementPercent: number;
    supplementEnergy: number;
  }
  
  export interface RDAData {
    macros: Record<string, number>;
    vitamins: Record<string, string>;
    minerals: Record<string, string>;
  }

  // export interface ExchangeListItem {
  //   category: string;
  //   food: string;
  //   portion: string;
  //   carbs: number;
  //   protein: number;
  //   fats: number;
  //   calories: number;
  //   notes?: string;
  // }