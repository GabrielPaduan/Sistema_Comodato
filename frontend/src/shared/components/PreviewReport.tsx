// src/components/RelatorioPreview.tsx
import {
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { ClientDTO, ContractDTO, ProductDTO } from "../utils/DTOS";
import logo from '../assets/logo_empresa.jpg';

import { useTheme } from '@mui/material/styles';
import { createPDFContracts } from '../services/pdfContract';
import { updateContract } from '../services/contractService';

interface RelatorioPreviewProps {
    client: ClientDTO;
    contracts: ContractDTO[];
    products: ProductDTO[];
    // handleGeneratePdf: () => void;
}

// 3. O COMPONENTE
export const PreviewReport: React.FC<RelatorioPreviewProps> = ({ client, contracts, products }) => {
    const theme = useTheme();

    const valorTotalGeral = contracts.reduce((sum, contract) => {
        const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
        return sum + ((contract.Cont_Qtde ?? 0) * (product?.Prod_Valor ?? 0));
    }, 0);

    return (
        <Container maxWidth="lg" sx={{ my: 4, p: { xs: 0 } }}>
            <Paper elevation={3} sx={{ p: { xs: 1, md: 4 } }}>
                <Grid container justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2, p: {xs: 0} }}>
                    <Grid sx={{ xs: 12, md: 6 }}>
                        <Typography variant="subtitle2" color="text.secondary">CLIENTE</Typography>
                        <Typography variant="h6" component="h1" gutterBottom>
                            {client.cli_razaoSocial || "Não informado"}
                        </Typography>
                        <Typography variant="body2">{client.cli_end || "Endereço não informado"}</Typography>
                        <Typography variant="body2">{client.cli_cidade ? `${client.cli_cidade} ${client.cli_uf}` : "Cidade não informada"}</Typography>
                        <Typography variant="body2">{client.cli_email || "Email não informado"}</Typography>
                    </Grid>
                    <Grid sx={{ xs: 12, md: 6, textAlign: { xs: 'left', md: 'right' }, mt: { xs: 2, md: 0 } }}>
                        <Box component="img" src={logo} alt="Logo O Rei do Óleo" sx={{ width: 100, mb: 1 }} />
                        <Typography variant="h6">O REI DO ÓLEO</Typography>
                        <Typography variant="body2">reidooleodistribuidora@gmail.com</Typography>
                        <Typography variant="body2">(43) 98488-0539</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* TÍTULO */}
                <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    INFORMAÇÕES DO CONTRATO
                </Typography>

                {/* TABELA DE PRODUTOS */}
                <TableContainer component={Paper} variant="outlined" sx={{ my: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>CMDT</TableCell>
                                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>PRODUTOS</TableCell>
                                <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'bold' }}>VALOR UNIT.</TableCell>
                                <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'bold' }}>QTD</TableCell>
                                <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'bold' }}>VALOR TOTAL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contracts.map(contract => {
                                const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
                                const valorTotal = (contract.Cont_Qtde ?? 0) * (product?.Prod_Valor ?? 0);
                                return (
                                    <TableRow key={contract.ID_Contrato} sx={{ '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                                        <TableCell align="center">{contract.Cont_Comodato}</TableCell>
                                        <TableCell>{product?.Prod_Nome || 'Produto não encontrado'}</TableCell>
                                        <TableCell align="right">R$ {product?.Prod_Valor?.toFixed(2) || '0.00'}</TableCell>
                                        <TableCell align="center">{contract.Cont_Qtde || 0}</TableCell>
                                        <TableCell align="right">R$ {valorTotal.toFixed(2)}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* RODAPÉ E TOTAL */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 4 }}>
                    <Box>
                        <Typography variant="body2"><strong>Responsável:</strong> Tiago Cernev Neves</Typography>
                        <Typography variant="body2"><strong>Data de Emissão:</strong> {new Date().toLocaleDateString('pt-BR')}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle1" color="text.secondary">Valor Total do Contrato:</Typography>
                        <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
                            R$ {valorTotalGeral.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            {/* BOTÃO DE AÇÃO */}
            {/* <Box sx={{ textAlign: 'center', my: 4 }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleGeneratePdf}
                >
                    Gerar Relatório em PDF
                </Button>
            </Box> */}
        </Container>
    );
};