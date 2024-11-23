// src/types/client.ts
import { ACTIVITY_LEVELS, DIETARY_OPTIONS, LIQUID_DIETARY_OPTIONS, DERMATOLOGICAL_ISSUES } from '@/constants/form-options';

export type ActivityLevel = typeof ACTIVITY_LEVELS[number];
export type DietaryOption = typeof DIETARY_OPTIONS[number];
export type LiquidDietaryOption = typeof LIQUID_DIETARY_OPTIONS[number];
export type DermatologicalIssue = typeof DERMATOLOGICAL_ISSUES[number];

export type MultiSelectField = 'dietaryOptions' | 'liquidDietary' | 'healthIssues';

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
  [key: string]: string | string[]; // Add index signature
}