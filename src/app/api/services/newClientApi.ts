// src/services/newclientApi.ts

import { ClientFormData, ClientApiData, ApiResponse } from '@/types/newclient';

const API_BASE_URL = 'https://cytoclick.ai/backend';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const getAuthToken = (): string => {
    const token = localStorage.getItem('authToken') || 
    document.cookie.split('; ')
    .find(row => row.startsWith('auth-token='))
    ?.split('=')[1];
    if (!token) {
    throw new AuthError('No authentication token found');
    }
    return token;
};

export const transformFormDataToApi = (formData: ClientFormData): ClientApiData => {
  // Combine health issues and liquid dietary preferences into a single array
  const combinedDiseases = [
    ...formData.healthIssues,
    ...formData.liquidDietary
  ];

  return {
    id: formData.id,
    name: formData.name,
    height_in_cm: parseFloat(formData.height),
    weight_in_kg: parseFloat(formData.weight),
    age_in_years: parseFloat(formData.age),
    gender: formData.gender,
    activity_level: formData.activityLevel,
    diseases: combinedDiseases,          // Send as array
    consumable_food_items_by_person: formData.dietaryOptions, // Send as array
    supplementPercentage: parseFloat(formData.supplementPercentage),
    supplementEnergyInKcal: parseFloat(formData.supplementKcal)
  };
};

export const addNewClient = async (formData: ClientFormData): Promise<ApiResponse> => {
  try {
    const token = getAuthToken();
    const apiData = transformFormDataToApi(formData);
    console.log(JSON.stringify(apiData))

    const response = await fetch(`${API_BASE_URL}/AddPerson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(apiData)
    });
    console.log(response.status)
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        error: 'Authentication failed. Please log in again.'
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};