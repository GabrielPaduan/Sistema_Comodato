import { Box, Button, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ClientDTO, ContractDTO, ProductDTO } from "../utils/DTOS";
import React, { useEffect } from "react";

interface TableContractProps {
    client: ClientDTO | null;
    contracts: ContractDTO[];
    products: ProductDTO[];
}

export const TableContract: React.FC<TableContractProps> = ({ client, contracts, products }) => {
    const [clientData, setClientData] = React.useState<ClientDTO | null>(client);
    const [contractsData, setContractsData] = React.useState<ContractDTO[]>(contracts);
    const [productsData, setProductsData] = React.useState<ProductDTO[]>(products);

     React.useEffect(() => {
        setClientData(client);
        setContractsData(contracts);
        setProductsData(products);
    }, [client, contracts, products]); 
    
    console.log("Client Data:", clientData);
    console.log("Contracts Data:", contractsData); 
    console.log("Products Data:", productsData);

    const addProduct = (productID: number, cmdt: number) => {
        const quantityElement = productsData.find(product => product.ID_Prod === productID)?.Prod_Qtde;
        if (quantityElement === undefined) return;
        if (quantityElement < cmdt) {

            productsData.find(product => product.ID_Prod === productID)!.Prod_Qtde += 1;
            setProductsData([...productsData]);
            calculateTotalProduct(productID, productsData.find(product => product.ID_Prod === productID)?.Prod_Qtde || 0, productsData.find(product => product.ID_Prod === productID)?.Prod_Valor || 0);
        }
    }

    const removeProduct = (productID: number) => {
        const quantityElement = productsData.find(product => product.ID_Prod === productID)?.Prod_Qtde;
        if (quantityElement === undefined) return;
        if (quantityElement > 0) {
            productsData.find(product => product.ID_Prod === productID)!.Prod_Qtde -= 1;
            setProductsData([...productsData]);
            calculateTotalProduct(productID, productsData.find(product => product.ID_Prod === productID)?.Prod_Qtde || 0, productsData.find(product => product.ID_Prod === productID)?.Prod_Valor || 0);
        }
    }

    const calculateTotalProduct = (productID: number, quantity: number, prodValue: number) => {
        const product = products.find(product => product.ID_Prod === productID);
        if (product) {
            product.Prod_ValorTotal = prodValue * quantity;
            setProductsData([...products]);
        }

    }

    useEffect(() => {
        
    }, [products]);
    
    return (
        <TableContainer component={"table"} sx={{ width: "50%", margin: "auto", paddingTop: 10, cursor: "default" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell  sx={{ fontSize: 20, textAlign: "center" }}>CMDT</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>PRODUTOS</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>VALOR</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>QTDE</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>VALOR TOTAL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        contractsData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ textAlign: "center", fontSize: 20 }}>
                                    Nenhum contrato cadastrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            contractsData.map((contract) => (
                                <TableRow
                                    id={String(contract.ID_Contrato)}
                                    key={contract.ID_Contrato}
                                    hover
                                    style={{ textDecoration: "none", color: "inherit"}}
                                >
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{contract.Cont_Comodato}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{products.find(product => product.ID_Prod === contract.Cont_ID_Prod)?.Prod_Nome}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>R$ {products.find(product => product.ID_Prod === contract.Cont_ID_Prod)?.Prod_Valor.toFixed(2)}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                            <Button onClick={() => removeProduct(contract.ID_Contrato)} variant="outlined" size="small" color="secondary" sx={{ minWidth: "auto" }}>
                                                <Icon sx={{ fontSize: 20 }}>remove_circle</Icon>
                                            </Button>
                                            <Typography sx={{ fontSize: 20 }} color="text.primary" id={`productQuantity${contract.ID_Contrato}`}>{products.find(product => product.ID_Prod === contract.Cont_ID_Prod)?.Prod_Qtde || 0}</Typography>
                                            <Button onClick={() => addProduct(contract.ID_Contrato, contract.Cont_Comodato)} variant="outlined" size="small" color="secondary" sx={{ minWidth: "auto" }}>
                                                <Icon sx={{ fontSize: 20 }}>add_circle</Icon>
                                            </Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>
                                        R$ {products.find(product => product.ID_Prod === contract.Cont_ID_Prod)?.Prod_ValorTotal.toFixed(2) || 0}
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}