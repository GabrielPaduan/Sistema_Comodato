import { Box, Button, Table, Typography } from "@mui/material";
import { ClientDTO, ContractDTO, ProductDTO } from "../utils/DTOS";
import React, { useEffect } from "react";
import { TableContract } from "./TableContract";
import { GenericButton } from "./GenericButton";
import { generateReport } from "../utils/Report";

export const LayoutBaseContrato: React.FC = () => {
    const [client, setClient] = React.useState<ClientDTO | null>(null);
    const [contracts, setContracts] = React.useState<ContractDTO[]>([]);
    const [products, setProducts] = React.useState<ProductDTO[]>([]);

    useEffect(() => {
        setClient({
            id: 1,
            cli_razaoSocial: "Empresa A",
            cli_responsavel: "Responsável A",
            cli_telCelular: "123456789",
            cli_nomeFantasia: "Empresa Fantasia A",
            cli_doc: "1234567890",
            cli_typeDoc: 1,
            cli_end: "Av. São Paulo, 123",
            cli_cep: "12345-678",
            cli_telFixo: "987654321",
            cli_email: "empresa@exemplo.com"
        });
        setContracts([
            {
                ID_Contrato: 1,
                Cont_ID_Cli: 1,
                Cont_ID_Prod: 1,
                Cont_Comodato: 5
            },
            {
                ID_Contrato: 2,
                Cont_ID_Cli: 1,
                Cont_ID_Prod: 2,
                Cont_Comodato: 3
            }
        ]);
        setProducts([
            { ID_Prod: 1, Prod_Nome: "Produto A", Prod_Valor: 10, Prod_Qtde: 0, Prod_ValorTotal: 0 },
            { ID_Prod: 2, Prod_Nome: "Produto B", Prod_Valor: 20, Prod_Qtde: 0, Prod_ValorTotal: 0 }
        ]);
    }, []);

    console.log("Client Data:", client);
    console.log("Contracts Data:", contracts);
    console.log("Products Data:", products);

    return (
        <Box padding={10}>
            <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
                {client?.cli_razaoSocial ? `Contrato de ${client?.cli_razaoSocial}` : "Contrato"}
            </Typography>
            <TableContract client={client} contracts={contracts} products={products} />
            <Box display={"flex"} alignItems="center" justifyContent="center" gap={2}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: '10px', padding: "15px" }}
                    onClick={() => client && generateReport(client, contracts, products)}
                    disabled={!client}
                >
                    <Typography variant="h6" color="text.secondary">
                        Gerar Relatório
                    </Typography>
                </Button>
                <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
            </Box>
        </Box>
    );
};
