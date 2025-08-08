import supabase from '../config/supabase.js'; // Ajuste o caminho conforme necessário
import type { ClientDTO } from '../types/dtos.js'; // Supondo que você tenha seus tipos definidos

export const findAllClients = async (): Promise<ClientDTO[]> => {
    const { data, error } = await supabase.from('Clientes').select('*');
    if (error) throw error;
    return data;
};

export const createNewClient = async (clientData: Omit<ClientDTO, 'id'>): Promise<ClientDTO[]> => {
    const { data, error } = await supabase.from('Clientes').insert([clientData]).select();
    if (error) throw error;
    return data;
};
