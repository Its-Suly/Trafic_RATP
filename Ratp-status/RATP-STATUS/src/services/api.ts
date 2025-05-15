// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://prim.iledefrance-mobilites.fr/marketplace/disruptions_bulk/',
  headers: {
    apikey: 'boU8cwMx6vVM9kjdiG38Phi4SnFbZCCg'
  }
});

export default {
  async getDisruptions() {
    try {
      const response = await apiClient.get('disruptions/v2');
      return response.data;
    } catch (error) {
      console.error('Erreur récupération disruptions:', error);
      return { disruptions: [] };
    }
  }
}
