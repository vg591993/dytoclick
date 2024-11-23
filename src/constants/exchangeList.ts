// src/constants/exchangeList.ts

export const FOOD_GROUP_FACTORS = {
    CEREALS: {
      amount: 20,
      carb: 15,
      prot: 2,
      fat: 0,
      energy: 70
    },
    VEG_A: {
      amount: 100,
      carb: 7, //was 3.5 by AI
      prot: 2, // was 1 by AI
      fat: 0,
      energy: 40 // was 20 by AI
    },
    VEG_B: {
      amount: 100,
      carb: 7,
      prot: 2,
      fat: 0,
      energy: 40
    },
    VEG_C: {
      amount: 60,
      carb: 15,
      prot: 2,
      fat: 0,
      energy: 70
    },
    FRUITS: {
      amount: 80,
      carb: 10,
      prot: 0,
      fat: 0,
      energy: 40
    },
    PULSES: {
      amount: 30,
      carb: 17,
      prot: 7,
      fat: 0,
      energy: 100
    },
    MILK: {
      amount: 250,
      carb: 12,
      prot: 8,
      fat: 10,
      energy: 170
    },
    MEAT_FISH_EGG: {
      amount: 50,
      carb: 0,
      prot: 7,
      fat: 5,
      energy: 70
    },
    FATS_AND_OILS: {
      amount: 5,
      carb: 0,
      prot: 0,
      fat: 5,
      energy: 45
    },
    NUTS: {
      amount: 12,
      carb: 2.2,
      prot: 3,
      fat: 5,
      energy: 58
    },
    SUGAR: {
      amount: 5,
      carb: 5,
      prot: 0,
      fat: 0,
      energy: 20
    }
    

  } as const;
  
  export const FOOD_GROUP_ICONS = {
    'CEREALS': 'Circle',
    'VEG_C': 'Carrot',
    'SUGAR': 'Cookie',
    'FATS_AND_OILS': 'CircleDot',
    'NUTS': 'Cookie',
    'MILK': 'Circle',
    'MEAT_FISH_EGG': 'Egg',
    'PULSES': 'Circle',
    'VEG_B': 'Leaf',
    'VEG_A': 'Carrot',
    'FRUITS': 'Apple',
  } as const;
  
  export type FoodGroup = keyof typeof FOOD_GROUP_FACTORS;
  export type FoodGroupIcon = keyof typeof FOOD_GROUP_ICONS;