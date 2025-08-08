import { Box, Button, Typography } from "@mui/material";
import { ClientDTO, ContractDTO, LayoutBaseContratoProps, ProductDTO } from "../utils/DTOS";
import React, { useEffect, useState } from "react";
import { TableContract } from "./TableContract";
import { generateReport } from "../utils/Report";
import { getClientById } from "../services/clientService"; // Supondo que você tenha este serviço
import { GenericButton } from "./GenericButton";

export const LayoutBaseContrato: React.FC<LayoutBaseContratoProps> = ({ id }) => {
    const [client, setClient] = useState<ClientDTO | null>(null);
    const [contracts, setContracts] = useState<ContractDTO[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            
            if (id >= 0) {
                try {
                    // Busca dados reais do cliente
                    const clientData = await getClientById(id);
                    setClient(clientData);
                    console.log(clientData)
                    // AQUI VOCÊ DEVERIA BUSCAR OS CONTRATOS E PRODUTOS REAIS DO CLIENTE
                    // Por enquanto, usaremos os dados mockados
                    setContracts([
                        { ID_Contrato: 1, Cont_ID_Cli: id, Cont_ID_Prod: 1, Cont_Comodato: 5 },
                        { ID_Contrato: 2, Cont_ID_Cli: id, Cont_ID_Prod: 2, Cont_Comodato: 3 }
                    ]);
                    setProducts([
                        { ID_Prod: 1, Prod_Nome: "Produto A", Prod_Valor: 10, Prod_Qtde: 0, Prod_ValorTotal: 0 },
                        { ID_Prod: 2, Prod_Nome: "Produto B", Prod_Valor: 20, Prod_Qtde: 0, Prod_ValorTotal: 0 }
                    ]);
                } catch (err) {
                    console.error("Erro ao buscar dados:", err);
                }
            }
        };
        fetchData();
    }, [id]); // Executa sempre que o ID mudar

    // FUNÇÕES DE LÓGICA AGORA VIVEM NO PAI
    const handleAddProduct = (productId: number, cmdt: number) => {
        setProducts(currentProducts =>
            currentProducts.map(p => {
                if (p.ID_Prod === productId && p.Prod_Qtde < cmdt) {
                    const newQuantity = p.Prod_Qtde + 1;
                    // Retorna um NOVO objeto (imutabilidade)
                    return { ...p, Prod_Qtde: newQuantity, Prod_ValorTotal: newQuantity * p.Prod_Valor };
                }
                return p;
            })
        );
    };

    const handleRemoveProduct = (productId: number) => {
        setProducts(currentProducts =>
            currentProducts.map(p => {
                if (p.ID_Prod === productId && p.Prod_Qtde > 0) {
                    const newQuantity = p.Prod_Qtde - 1;
                    return { ...p, Prod_Qtde: newQuantity, Prod_ValorTotal: newQuantity * p.Prod_Valor };
                }
                return p;
            })
        );
    };

    return (
        <Box padding={10}>
            <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
                {client?.cli_razaoSocial ? `Contrato de ${client.cli_razaoSocial}` : "Carregando Contrato..."}
            </Typography>
            <TableContract
                client={client}
                contracts={contracts}
                products={products}
                onAddProduct={handleAddProduct}    // Passa a função para o filho
                onRemoveProduct={handleRemoveProduct} // Passa a função para o filho
            />
            <Box display={"flex"} alignItems="center" justifyContent="center" gap={2} mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: "15px" }}
                    onClick={() => client && generateReport(client, contracts, products)}
                    disabled={!client}
                >
                    <Typography variant="h6">Gerar Relatório</Typography>
                </Button>
                <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
            </Box>
        </Box>
    );
};