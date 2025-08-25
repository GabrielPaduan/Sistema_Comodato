// src/components/RelatorioPreview.tsx

import React from 'react';
import { ClientDTO, ContractDTO, ProductDTO } from "../utils/DTOS";
import { generateReport } from '../utils/Report';
import logo from '../assets/logo_empresa.jpg';
import { GenericButton } from './GenericButton';
import { useNavigate } from 'react-router-dom';

// 1. ESTILOS PARA SIMULAR A PÁGINA
const styles: { [key: string]: React.CSSProperties } = {
    page: {
        background: 'white',
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        margin: '1cm auto',
        border: '1px #D3D3D3 solid',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
        fontFamily: "'Helvetica', 'Arial', sans-serif",
        color: '#333'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '2px solid #00008B', // Azul escuro
        paddingBottom: '10px',
    },
    clientInfo: {
        fontSize: '11pt',
    },
    companyInfo: {
        textAlign: 'right',
    },
    logo: {
        width: '100px',
    },
    title: {
        textAlign: 'center',
        margin: '40px 0',
        fontSize: '18pt',
        fontWeight: 'bold',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        fontSize: '10pt',
    },
    th: {
        background: '#00008B', // Azul escuro
        color: 'white',
        padding: '8px',
        border: '1px solid #ddd',
    },
    td: {
        padding: '8px',
        border: '1px solid #ddd',
        textAlign: 'center',
    },
    footer: {
        marginTop: '40px',
        borderTop: '1px solid #ccc',
        paddingTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontSize: '10pt',
    },
    total: {
        textAlign: 'right',
    },
    totalValue: {
        fontSize: '14pt',
        fontWeight: 'bold',
    },
    button: {
        display: 'block',
        width: '200px',
        padding: '10px',
        margin: '20px auto',
        background: '#00008B',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12pt',
    }
};

// 2. PROPS DO COMPONENTE
interface RelatorioPreviewProps {
    client: ClientDTO;
    contracts: ContractDTO[];
    products: ProductDTO[];
}

// 3. O COMPONENTE
export const PreviewReport: React.FC<RelatorioPreviewProps> = ({ client, contracts, products }) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const valorTotalGeral = contracts.reduce((sum, contract) => {
        const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
        return sum + ((product?.Prod_Qtde ?? 0) * (product?.Prod_Valor ?? 0));
    }, 0);

    const handleGeneratePdf = () => {
        generateReport(client, contracts, products);
    };

    return (
        <div>
            <div style={styles.page}>
                {/* CABEÇALHO */}
                <header style={styles.header}>
                    <div style={styles.clientInfo}>
                        <strong>CLIENTE:</strong>
                        <p>{client.cli_razaoSocial || "Não informado"}</p>
                        <p>{client.cli_end || "Não informado"}</p>
                        <p>{client.cli_cidade ? `${client.cli_cidade} ${client.cli_uf}` : "Não informado"}</p>
                        <p>{client.cli_email || "Email não informado"}</p>
                    </div>
                    <div style={styles.companyInfo}>
                        <img src={logo} alt="Logo O Rei do Óleo" style={styles.logo} />
                        <p><strong>O REI DO ÓLEO</strong></p>
                        <p>reidooleodistribuidora@gmail.com</p>
                        <p>(43) 98488-0539</p>
                    </div>
                </header>

                {/* TÍTULO */}
                <h2 style={styles.title}>INFORMAÇÕES DO CONTRATO</h2>

                {/* TABELA DE PRODUTOS */}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>CMDT</th>
                            <th style={styles.th}>PRODUTOS</th>
                            <th style={styles.th}>VALOR UNIT.</th>
                            <th style={styles.th}>QTD</th>
                            <th style={styles.th}>VALOR TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(contract => {
                            const product = products.find(p => p.ID_Prod === contract.Cont_ID_Prod);
                            const valorTotal = (product?.Prod_Qtde ?? 0) * (product?.Prod_Valor ?? 0);
                            return (
                                <tr key={contract.ID_Contrato}>
                                    <td style={styles.td}>{contract.Cont_Comodato}</td>
                                    <td style={{ ...styles.td, textAlign: 'left' }}>{product?.Prod_Nome || 'Produto não encontrado'}</td>
                                    <td style={styles.td}>R$ {product?.Prod_Valor?.toFixed(2) || '0.00'}</td>
                                    <td style={styles.td}>{product?.Prod_Qtde || 0}</td>
                                    <td style={styles.td}>R$ {valorTotal.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* RODAPÉ E TOTAL */}
                <footer style={styles.footer}>
                    <div>
                        <p><strong>Responsável:</strong> Tiago Cernev Neves</p>
                        <p><strong>Data de Emissão:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div style={styles.total}>
                        <p>Valor Total do Contrato:</p>
                        <p style={styles.totalValue}>R$ {valorTotalGeral.toFixed(2)}</p>
                    </div>
                </footer>
            </div>
            
            {/* <button onClick={handleGeneratePdf} style={styles.button}>Gerar PDF</button> */}
            {/* <GenericButton name="voltar" type="button" link="visualizar-clientes" onClick={goBack} /> */}
        </div>
    );
};