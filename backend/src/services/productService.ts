import supabase from '../config/supabase.js'; // Ajuste o caminho conforme necessário
import type { ProductDTO } from '../types/dtos.js'; // Supondo que você tenha seus tipos definidos

export const findAllProduct = async (): Promise<ProductDTO[]> => {
    const { data, error } = await supabase.from('Produtos').select('*');
    if (error) throw error;
    return data;
};

export const createNewProduct = async (productData: Omit<ProductDTO, 'id'>): Promise<ProductDTO[]> => {
    const { data, error } = await supabase.from('Produtos').insert([productData]).select();
    if (error) throw error;
    return data;
};
