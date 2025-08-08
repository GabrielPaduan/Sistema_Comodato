import supabase from '../config/supabase.js'; // Ajuste o caminho conforme necessário
import type { ContractDTO } from '../types/dtos.js'; // Supondo que você tenha seus tipos definidos

export const findAllContracts = async (): Promise<ContractDTO[]> => {
    const { data, error } = await supabase.from('Contratos').select('*');
    if (error) throw error;
    return data;
};

export const createNewContract = async (contractData: Omit<ContractDTO, 'id'>): Promise<ContractDTO[]> => {
    const { data, error } = await supabase.from('Contratos').insert([contractData]).select();
    if (error) throw error;
    return data;
};
