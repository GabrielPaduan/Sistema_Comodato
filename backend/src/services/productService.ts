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

export const findProductById = async (id: number): Promise<ProductDTO | null> => {
  const { data, error } = await supabase.from('Produtos').select('*').eq('ID_Prod', id).single();
  if (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return null;
  }
  return data;
};

export const findProductByContractId = async (contractId: number): Promise<ProductDTO | null> => {
  const { data, error } = await supabase
    .from('Contratos')
    .select(`
      Produtos ( * )
    `)
    .eq('ID_Contrato', contractId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Erro ao buscar produto do contrato:', error);
    throw error;
  }

  const product: ProductDTO | undefined = Array.isArray(data.Produtos) ? data.Produtos[0] : data.Produtos;
  // Retorna o produto diretamente, garantindo que não seja undefined.
  return product ?? null;
};

export const searchProductsByName = async (nameQuery: string): Promise<any[]> => {
    if (!nameQuery) {
        return []; // Retorna vazio se a busca for vazia
    }

    try {
        const { data, error } = await supabase
            .from('Produtos')
            .select('*')
            .ilike('Prod_CodProduto', `%${nameQuery}%`)
            .limit(50); 

        if (error) {
            console.error("Erro ao buscar produtos:", error);
            throw new Error(`Erro ao buscar produtos: ${error.message}`);
        }

        return data || [];
    } catch (error) {
        console.error("Exceção na busca de produtos:", error);
        throw error;
    }
};