// src/types/client.ts

export interface ClientFormData {
  id: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  activityLevel: string;
  dietaryOptions: string[];
  liquidDietary: string[];
  healthIssues: string[];
  supplementPercentage: string;
  supplementKcal: string;
}

export interface ClientApiData {
  id: string;
  name: string;
  height_in_cm: number;
  weight_in_kg: number;
  age_in_years: number;
  gender: string;
  activity_level: string;
  diseases: string[];
  consumable_food_items_by_person: string[];
  supplementPercentage: number;
  supplementEnergyInKcal: number;
}

export type MultiSelectField = 'dietaryOptions' | 'liquidDietary' | 'healthIssues';

export type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};