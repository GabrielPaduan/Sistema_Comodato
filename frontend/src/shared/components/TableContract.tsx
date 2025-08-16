import { Box, Button, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TableContractProps } from "../utils/DTOS";
import React, { useState } from "react";

// Adicione as funções onAdd e onRemove nas props
interface CustomTableContractProps extends TableContractProps {
    onAddProduct: (productId: number, cmdt: number) => void;
    onRemoveProduct: (productId: number) => void;
    onRemoveContract: (contractId: number, productId: number) => void;
    onEditContract: (contractId: number, cmdt: number) => void;
}

export const TableContract: React.FC<CustomTableContractProps> = ({ contracts, products, onAddProduct, onRemoveProduct, onRemoveContract, onEditContract }) => {
    
    return (
        <TableContainer component={"table"} sx={{ width: "50%", margin: "auto", paddingTop: 10, cursor: "default" }}>
            <Table>
                <TableHead>
                    <TableCell  sx={{ fontSize: 20, textAlign: "center" }}>CMDT</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>PRODUTOS</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>VALOR</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>REPOSIÇÃO</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>ESTOQUE</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>VALOR TOTAL</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>REMOVER</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>EDITAR    </TableCell>
                </TableHead>
                <TableBody>
                    {
                    contracts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} sx={{ textAlign: "center", fontSize: 20 }}>Nenhum contrato cadastrado</TableCell>
                        </TableRow>
                    ) : (
                        contracts.map((contract) => {
                            const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
                            if (!product) return null;

                            return (
                                <TableRow key={contract.ID_Contrato} hover>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{contract.Cont_Comodato}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{product.Prod_Nome}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>R$ {product.Prod_Valor.toFixed(2)}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                            <Button onClick={() => onRemoveProduct(product.ID_Prod)}><Icon sx={{ fontSize: 30 }}>remove_circle</Icon></Button>
                                                <Typography sx={{ fontSize: 20, textAlign: "center" }}>{product.Prod_Qtde}</Typography>
                                            <Button onClick={() => onAddProduct(product.ID_Prod, contract.Cont_Comodato)}><Icon sx={{ fontSize: 30 }}>add_circle</Icon></Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{product.Prod_Estoque}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>R$ {product.Prod_ValorTotal.toFixed(2)}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>
                                        <Button onClick={() => onRemoveContract(contract.ID_Contrato, contract.Cont_ID_Prod)}><Icon sx={{ fontSize: 40 }}>delete_forever</Icon></Button>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>
                                        <Button onClick={() => onEditContract(contract.ID_Contrato, 15)}><Icon sx={{ fontSize: 40 }}>edit</Icon></Button>
                                    </TableCell>
                                    
                                </TableRow>
                            );
                        })
                    )
                    
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};