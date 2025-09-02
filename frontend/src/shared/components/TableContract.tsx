import { Box, Button, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TableContractProps } from "../utils/DTOS";
import React, { useState } from "react";

// Adicione as funções onAdd e onRemove nas props
interface CustomTableContractProps extends TableContractProps {
    onAddProduct: (productId: number, cmdt: number) => void;
    onRemoveProduct: (productId: number) => void;
    onRemoveContract: (contractId: number, productId: number) => void;
}

export const TableContract: React.FC<CustomTableContractProps> = ({ contracts, products, onAddProduct, onRemoveProduct, onRemoveContract }) => {
    return (
        <TableContainer component={Paper} sx={{ margin: "auto", cursor: "default", width: "100%" }}>
            <Table width="100%">
                <TableHead>
                    <TableCell  sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>CMDT</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>PRODUTOS</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px", display: "none" } }}>VALOR</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>REPOSIÇÃO</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>ESTOQUE</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>VALOR TOTAL</TableCell>
                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>REMOVER</TableCell>
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
                                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>{contract.Cont_Comodato}</TableCell>
                                        <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>{product.Prod_Nome}</TableCell>
                                        <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", display: "none" } }}>R$ {product.Prod_Valor.toFixed(2)}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                            <Button onClick={() => onRemoveProduct(contract.ID_Contrato)} sx={{ '@media (max-width: 600px)': { padding: "0px", minWidth: "40px" } }}><Icon sx={{ fontSize: 30, '@media (max-width: 600px)': { fontSize: "20px", padding: "0px" } }}>remove_circle</Icon></Button>
                                                <Typography sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "0px" } }}>{contract.Cont_Qtde}</Typography>
                                            <Button onClick={() => onAddProduct(contract.ID_Contrato, contract.Cont_Comodato)} sx={{ '@media (max-width: 600px)': { padding: "0px", minWidth: "40px" } }}><Icon sx={{ fontSize: 30, '@media (max-width: 600px)': { fontSize: "20px", padding: "0px" } }}>add_circle</Icon></Button>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>{product.Prod_Estoque}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { fontSize: "15px", padding: "10px" } }}>R$ {contract.Cont_ValorTotal.toFixed(2)}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center", '@media (max-width: 600px)': { padding: "0px" } }}>
                                        <Button onClick={() => onRemoveContract(contract.ID_Contrato, contract.Cont_ID_Prod)} sx={{ '@media (max-width: 600px)': { padding: "0px" } }}><Icon sx={{ fontSize: 20, '@media (max-width: 600px)': { padding: "0px" } }}>delete_forever</Icon></Button>
                                    </TableCell>
                                    {/* <TableCell sx={{ fontSize: 20, textAlign: "center" }}>
                                        <Button onClick={() => onEditContract(contract.ID_Contrato, 15)}><Icon sx={{ fontSize: 40 }}>edit</Icon></Button>
                                    </TableCell> */}
                                    
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