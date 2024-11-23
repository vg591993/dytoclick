// src/constants/formConstants.ts

export const ACTIVITY_LEVELS = [
  { value: 'SEDENTARY', label: 'Sedentary' },
  { value: 'LIGHTLY_ACTIVE', label: 'Lightly Active' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'EXTREMELY_ACTIVE', label: 'Extremely Active' }
] as const;

export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
] as const;

export const DIETARY_OPTIONS = [
  { value: 'CEREALS', label: 'Cereals' },
  { value: 'VEG_C', label: 'Veg C' },
  { value: 'FATS_AND_OILS', label: 'Fats And Oils' },
  { value: 'SUGAR', label: 'Sugar' },
  { value: 'NUTS', label: 'Nuts' },
  { value: 'MEAT_FISH_EGG', label: 'Meat Fish Egg' },
  { value: 'MILK', label: 'Milk' },
  { value: 'PULSES', label: 'Pulses' },
  { value: 'VEG_A', label: 'Veg A' },
  { value: 'VEG_B', label: 'Veg B' },
  { value: 'FRUITS', label: 'Fruits' }
] as const;

export const LIQUID_OPTIONS = [
  { value: 'CLEAR_FLUID_DIET', label: 'Clear Fluid Diet' },
  { value: 'FULL_FLUID_DIET', label: 'Full Fluid Diet' },
  { value: 'PEG_TUBE_FEEDING_WITH_MILK', label: 'Peg Tube Feeding With Milk' },
  { value: 'PEG_TUBE_FEEDING_WITHOUT_MILK', label: 'Peg Tube Feeding Without Milk' },
  { value: 'PEG_TUBE_FEEDING_DIABETIC', label: 'Peg Tube Feeding Diabetic' },
  { value: 'PEG_TUBE_FEEDING_VEGETARIAN', label: 'Peg Tube Feeding Vegetarian' },
  { value: 'PEG_TUBE_FEEDING_NORMAL', label: 'Peg Tube Feeding Normal' },
  { value: 'NASOGASTRIC_TUBE_FEEDING_NORMAL', label: 'Nasogastric Tube Feeding Normal' },
  { value: 'NASOGASTRIC_TUBE_FEEDING_WITHOUT_MILK', label: 'Nasogastric Tube Feeding Without Milk' },
  { value: 'JEJUNOSTOMY_TUBE_FEEDING_NORMAL', label: 'Jejunostomy Tube Feeding Normal' },
  { value: 'JEJUNOSTOMY_TUBE_FEEDING_DIABETIC', label: 'Jejunostomy Tube Feeding Diabetic' },
  { value: 'JEJUNOSTOMY_TUBE_FEEDING_VEGETARIAN', label: 'Jejunostomy Tube Feeding Vegetarian' },
  { value: 'JEJUNOSTOMY_TUBE_FEEDING_WITHOUT_MILK', label: 'Jejunostomy Tube Feeding Without Milk' },
  { value: 'NASOJEJUNAL_TUBE_FEEDING_NORMAL', label: 'Nasojejunal Tube Feeding Normal' },
  { value: 'NASOJEJUNAL_TUBE_WITHOUT_MILK', label: 'Nasojejunal Tube Without Milk' }
] as const;

export const DISEASE_OPTIONS = [
  { value: 'Normal', label: 'Normal' },
  { value: 'KETO', label: 'Keto' },
  { value: 'Keto_Pediatric', label: 'Keto Pediatric' },
  { value: 'PREGNANCY_2rd_Trimester', label: 'Pregnancy 2rd Trimester' },
  { value: 'PREGNANCY_3rd_Trimester', label: 'Pregnancy 3rd Trimester' },
  { value: 'LACTATION_0_to_6_month', label: 'Lactation 0 To 6 Month' },
  { value: 'LACTATION_7_to_12_month', label: 'Lactation 7 To 12 Month' },
  { value: 'CHILDREN_EXCHANGE_LIST_1_to_3_years', label: 'Children Exchange List 1 To 3 Years' },
  { value: 'CHILDREN_EXCHANGE_LIST_4_to_6_years', label: 'Children Exchange List 4 To 6 Years' },
  { value: 'CHILDREN_EXCHANGE_LIST_7_to_9_years', label: 'Children Exchange List 7 To 9 Years' },
  { value: 'ADOLESCENTS', label: 'Adolescents' },
  { value: 'ADOLESCENTS_BOY', label: 'Adolescents Boy' },
  { value: 'ADOLESCENTS_GIRL', label: 'Adolescents Girl' },
  { value: 'ADOLESCENTS_BOY_10_12', label: 'Adolescents Boy 10 12' },
  { value: 'ADOLESCENTS_BOY_13_15', label: 'Adolescents Boy 13 15' },
  { value: 'ADOLESCENTS_BOY_16_17', label: 'Adolescents Boy 16 17' },
  { value: 'ADOLESCENTS_GIRL_10_12', label: 'Adolescents Girl 10 12' },
  { value: 'ADOLESCENTS_GIRL_13_15', label: 'Adolescents Girl 13 15' },
  { value: 'ADOLESCENTS_GIRL_16_17', label: 'Adolescents Girl 16 17' },
  { value: 'WEIGHT_GAIN', label: 'Weight Gain' },
  { value: 'WEIGHT_LOSE', label: 'Weight Lose' },
  { value: 'SPORTS_PERSON', label: 'Sports Person' },
  { value: 'CANCER', label: 'Cancer' },
  { value: 'Peptic_ulcer', label: 'Peptic Ulcer' },
  { value: 'Peptic_ulcer_Mild_to_Moderate', label: 'Peptic Ulcer Mild To Moderate' },
  { value: 'Liver_Disease', label: 'Liver Disease' },
  { value: 'Renal', label: 'Renal' },
  { value: 'IBS', label: 'Ibs' },
  { value: 'Gallbladder', label: 'Gallbladder' },
  { value: 'PCOD', label: 'Pcod' },
  { value: 'Gastritis', label: 'Gastritis' },
  { value: 'CVD', label: 'Cvd' },
  { value: 'T2dm', label: 'T2dm' },
  { value: 'Anemia', label: 'Anemia' },
  { value: 'RENAL_DIALYSIS', label: 'Renal Dialysis' },
  { value: 'Hypothyroidism', label: 'Hypothyroidism' },
  { value: 'Hyperthyroidism', label: 'Hyperthyroidism' },
  { value: 'Celiac', label: 'Celiac' },
  { value: 'Fever', label: 'Fever' }
] as const;


// Update initial form data to use empty arrays
export const INITIAL_FORM_DATA = {
  id: Math.random().toString(36).substr(2, 9),
  name: '',
  age: '',
  height: '',
  weight: '',
  gender: '',
  activityLevel: '',
  dietaryOptions: [],
  liquidDietary: [],
  healthIssues: [],
  supplementPercentage: '',
  supplementKcal: ''
};