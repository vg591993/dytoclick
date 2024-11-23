import { FOOD_GROUP_FACTORS, type FoodGroup } from '@/constants/exchangeList';

interface APIResponse {
  components: {
    foodgroup: FoodGroup;
    value: number;
  }[];
  total_carbohydrate_in_gram: number;
  total_protein_in_gram: number;
  total_fat_in_gram: number;
  total_energy_in_kcal: number;
}

interface NutrientInfo {
    name: string;
    type: string;
    unit: string;
    value: number;
  }
  
  interface GeneratedByAlgo {
    foodItemNumberOfExchange: Record<FoodGroup, number>;
    total_carbohydrate_in_gram: NutrientInfo;
    total_protein_in_gram: NutrientInfo;
    total_fat_in_gram: NutrientInfo;
    calculationStrategy: Record<string, any>;
    total_energy_in_kcal: number;
  }
  
  interface SaveExchangeListResponse {
    id: string;
    dietitianId: string;
    personId: string;
    generatedByAlgo: GeneratedByAlgo;
    byDietitian: null | any;
  }

export interface ExchangeListResponse {
  id: FoodGroup;
  ne: number;
  amount: number;
  carb: number;
  prot: number;
  fat: number;
  energy: number;
}

export const fetchExchangeList = async (clientId: string, token: string): Promise<ExchangeListResponse[]> => {
  try {
    const response = await fetch(`https://cytoclick.ai/backend/get2ELUI/${clientId}`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange list data');
    }
    
    const data: APIResponse = await response.json();
    
    return data.components.map(item => {
      const factors = FOOD_GROUP_FACTORS[item.foodgroup];
      const ne = Number(item.value.toFixed(3));
      
      return {
        id: item.foodgroup,
        ne,
        amount: Number((factors.amount * ne).toFixed(1)),
        carb: Number((factors.carb * ne).toFixed(1)),
        prot: Number((factors.prot * ne).toFixed(1)),
        fat: Number((factors.fat * ne).toFixed(1)),
        energy: Number((factors.energy * ne).toFixed(1))
      };
    });
  } catch (error) {
    console.error('Error fetching exchange list:', error);
    throw error;
  }
};

export const saveExchangeList = async (
    clientId: string, 
    token: string, 
    data: ExchangeListResponse[]
  ): Promise<ExchangeListResponse[]> => {
    try {
      const payload = {
        foodItemNumberOfExchange: Object.fromEntries(
          data.map(item => [item.id, Number(item.ne.toFixed(2))])
        ),
        total_carbohydrate_in_gram: Number(data.reduce((sum, item) => sum + item.carb, 0).toFixed(2)),
        total_protein_in_gram: Number(data.reduce((sum, item) => sum + item.prot, 0).toFixed(2)),
        total_fat_in_gram: Number(data.reduce((sum, item) => sum + item.fat, 0).toFixed(2)),
        total_energy_in_kcal: Number(data.reduce((sum, item) => sum + item.energy, 0).toFixed(2))
      };
  
      const response = await fetch(`https://cytoclick.ai/backend/updateExchangeListByDietitian/${clientId}`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to save exchange list data: ${response.statusText}`);
      }
  
      const responseData: SaveExchangeListResponse = await response.json();
      
      // Validate and transform the response data
      if (!responseData?.generatedByAlgo?.foodItemNumberOfExchange) {
        throw new Error('Invalid response format from server');
      }
      
      // Convert the response format to match our ExchangeListResponse format
      return Object.entries(responseData.generatedByAlgo.foodItemNumberOfExchange).map(([id, ne]) => {
        if (!FOOD_GROUP_FACTORS[id as FoodGroup]) {
          throw new Error(`Invalid food group in response: ${id}`);
        }
  
        const factors = FOOD_GROUP_FACTORS[id as FoodGroup];
        const neValue = Number(ne.toFixed(3));
        
        return {
          id: id as FoodGroup,
          ne: neValue,
          amount: Number((factors.amount * neValue).toFixed(1)),
          carb: Number((factors.carb * neValue).toFixed(1)),
          prot: Number((factors.prot * neValue).toFixed(1)),
          fat: Number((factors.fat * neValue).toFixed(1)),
          energy: Number((factors.energy * neValue).toFixed(1))
        };
      });
    } catch (error) {
      console.error('Error saving exchange list:', error);
      throw error;
    }
  };