import { ClientData, RDAData, Requirements } from "@/types/health";

// api/health.ts
export const fetchClientData = async (clientID: string, token: string): Promise<ClientData> => {
    const response = await fetch('https://cytoclick.ai/backend/getClientData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: clientID
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch client data: ${response.status}`);
    }
  
    return response.json();
  };
  
  export const fetchRequirements = async (clientID: string, token: string): Promise<Requirements> => {
    const response = await fetch('https://cytoclick.ai/backend/getRequirements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: clientID
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch requirements: ${response.status}`);
    }
  
    return response.json();
  };
  
  export const fetchRDAData = async (clientID: string, token: string): Promise<RDAData> => {
    const response = await fetch('https://cytoclick.ai/backend/getRDA', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: clientID
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch RDA data: ${response.status}`);
    }
  
    return response.json();
  };