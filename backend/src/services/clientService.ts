import supabase from '../config/supabase.js'; // Ajuste o caminho conforme necessário
import type { ClientDTO, ClientDTOInsert } from '../types/dtos.js'; // Supondo que você tenha seus tipos definidos

export const findAllClients = async (): Promise<ClientDTO[]> => {
    const { data, error } = await supabase.from('Clientes').select('*');
    if (error) throw error;
    return data;
};

export const createNewClient = async (clientData: ClientDTOInsert): Promise<ClientDTOInsert[]> => {
    // Não inclua o campo 'id' no objeto inserido, pois ele será gerado automaticamente pelo banco
    console.log(clientData)
    const { data, error } = await supabase
        .from('Clientes')
        .insert([clientData])
        .select();

    if (error) throw error;
    return data;
};

export const findClientById = async (id: number): Promise<ClientDTO | null> => {
    const { data, error } = await supabase.from('Clientes').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};


