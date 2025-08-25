export interface ClientDTO {
    id: number;
    cli_razaoSocial: string;
    cli_email: string;
    cli_doc: string;
    cli_typeDoc: number;
    cli_end: string;
    cli_cep: string;   
    cli_dddTel: string;
    cli_telefone: string;
    cli_dddCel: string;
    cli_cidade: string;
    cli_celular: string;
    cli_endNum: string;
    cli_bairro: string;
    cli_uf: string;
    cli_insEstadual: string;
}

export interface ClientDTOInsert {
    cli_razaoSocial: string;
    cli_email: string;
    cli_doc: string;
    cli_typeDoc: number;
    cli_end: string;
    cli_cep: string;   
    cli_dddTel: string;
    cli_telefone: string;
    cli_dddCel: string;
    cli_cidade: string;
    cli_celular: string;
    cli_endNum: string;
    cli_bairro: string;
    cli_uf: string;
    cli_insEstadual: string;
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

export interface PdfStructDTO {
    id: number;
    PDF_Client_Id: number;
    PDF_Status: number;
}

export interface PdfStructInsertDTO {
    PDF_Client_Id: number;
    PDF_Status: number;
}