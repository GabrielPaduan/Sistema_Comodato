import api from '../services/api'; // Importa nossa instância centralizada do axios
import { ContractDTO } from '../utils/DTOS'; // Supondo que você também tenha um arquivo de tipos no frontend

// Função para buscar TODOS os contratos
export const getAllContracts = async (): Promise<ContractDTO[]> => {
  const response = await api.get('/contratos');
  return response.data; // O axios já converte a resposta para JSON
};

// Função para buscar UM contrato pelo ID
export const getContractById = async (id: number): Promise<ContractDTO> => {
  const response = await api.get(`/contratos/${id}`);
  return response.data;
};

// Função para CRIAR um novo contrato
// Omit<ContractDTO, 'id'> significa que pegamos todos os campos do ContractDTO, exceto o 'id'
export const createContract = async (contractData: Omit<ContractDTO, 'id'>): Promise<ContractDTO> => {
  const response = await api.post('/contratos', contractData);
  return response.data;
};
