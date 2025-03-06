import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

interface Partner {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: {
    type: string;
    coordinates: number[][][][];
  };
  address: {
    type: string;
    coordinates: number[];
  };
}

export const createPartner = async (partnerData: Partner) => {
  try {
    const response = await api.post('/partners', partnerData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar parceiro:', error);
  }
};

export const getPartnerById = async (id: string) => {
  try {
    const response = await api.get(`/partner/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar parceiro:', error);
  }
};

// Definindo tipos para lat e lon (número de ponto flutuante)
export const getNearbyPartner = async (lat: number, lon: number) => {
  try {
    const response = await api.get('/partners/nearby', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar parceiro próximo:', error);
  }
};
