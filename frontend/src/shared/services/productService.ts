import api from '../services/api'; // Importa nossa instância centralizada do axios
import { ProductDTO } from '../utils/DTOS'; // Supondo que você também tenha um arquivo de tipos no frontend

// Função para buscar TODOS os produtos
export const getAllProdutos = async (): Promise<ProductDTO[]> => {
  const response = await api.get('/produtos');
  return response.data; // O axios já converte a resposta para JSON
};

// Função para buscar UM produto pelo ID
export const getProductById = async (id: number): Promise<ProductDTO> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

// Função para CRIAR um novo produto
// Omit<ProductDTO, 'id'> significa que pegamos todos os campos do ProductDTO, exceto o 'id'
export const createProduct = async (productData: Omit<ProductDTO, 'id'>): Promise<ProductDTO> => {
  const response = await api.post('/produtos', productData);
  return response.data;
};
