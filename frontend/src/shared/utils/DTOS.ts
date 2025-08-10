export interface ClientDTO {
    id: number;
    cli_razaoSocial: string;
    cli_email: string;
    cli_doc: string;
    cli_typeDoc: number;
    cli_end: string;
    cli_cep: string;      
}

export interface ClientDTOInsert {
    cli_razaoSocial: string;
    cli_email: string;
    cli_doc: string;
    cli_typeDoc: number;
    cli_end: string;
    cli_cep: string;      
}

export interface ProductDTO {
    ID_Prod: number;
    Prod_Valor: number;
    Prod_CustoCompra: number;
    Prod_CFOP: string;
    Prod_NCM: number;
    Prod_UnMedida: string;
    Prod_CodProduto: string;
    Prod_CodBarras: string;
    Prod_ValorTotal: number;
    Prod_Nome: string;
    Prod_Estoque: number;
    Prod_Qtde: number;
}

export interface ContractDTO {
    ID_Contrato: number;
    Cont_ID_Cli: number;
    Cont_ID_Prod: number;
    Cont_Comodato: number;
}

export interface ContractDTOInsert {
    Cont_ID_Cli: number;
    Cont_ID_Prod: number;
    Cont_Comodato: number;
}

export interface TableContractProps {
    client: ClientDTO | null;
    contracts: ContractDTO[];
    products: ProductDTO[];
}

export interface LayoutBaseContratoProps {
    id: number;
}