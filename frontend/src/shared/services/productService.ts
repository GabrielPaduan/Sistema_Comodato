import api from '../services/api'; // Importa nossa instância centralizada do axios
import { ProductDTO } from '../utils/DTOS'; // Supondo que você também tenha um arquivo de tipos no frontend

// Função para buscar TODOS os produtos
export const getAllProducts = async (): Promise<ProductDTO[]> => {
  const response = await api.get('/produtos');
  return response.data; // O axios já converte a resposta para JSON
};

export const getProductById = async (id: number): Promise<ProductDTO> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const getProductByContractId = async (id: number): Promise<ProductDTO> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const createProduct = async (productData: Omit<ProductDTO, 'id'>): Promise<ProductDTO> => {
  const response = await api.post('/produtos', productData);
  return response.data;
};
