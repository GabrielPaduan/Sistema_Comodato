export interface ClientDTO {
    id: number;
    cli_razaoSocial: string;
    cli_nomeFantasia: string;
    cli_responsavel: string;
    cli_email: string;
    cli_doc: string;
    cli_typeDoc: number;
    cli_end: string;
    cli_cep: string;
    cli_telCelular: string | null; 
    cli_telFixo?: string;        
}

export interface ProductDTO {
    ID_Prod: number;
    Prod_Nome: string;
    Prod_Valor: number;
    Prod_Qtde: number;
    Prod_ValorTotal: number;
}

export interface ContractDTO {
    ID_Contrato: number;
    Cont_ID_Cli: number;
    Cont_ID_Prod: number;
    Cont_Comodato: number;
}