import { Box, Button, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ClientDTO } from "../utils/DTOS";
import React, { useEffect } from "react";
import { getAllClients } from "../services/clientService";

export const TableClients: React.FC = () => {
    const [clientsData, setClientsData] = React.useState<ClientDTO[]>([]);

    useEffect (() => {
        const fetchClients = async () => {
        try {
            const data = await getAllClients();
            setClientsData(data);
        } catch (err: any) {
            setError('Não foi possível carregar os dados dos clientes.');
            console.error(err);
        } 
        };

        fetchClients();
    }, []);

    return (
        <TableContainer component={"table"} sx={{ width: "50%", margin: "auto", paddingTop: 10, cursor: "default" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell  sx={{ fontSize: 20, textAlign: "center" }}>Nome da Empresa</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>Responsável</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>Telefone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        clientsData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ textAlign: "center", fontSize: 20 }}>
                                    Nenhum contrato cadastrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            clientsData.map((client) => (
                                <TableRow
                                    id={String(client.id)}
                                    key={client.id}
                                    hover
                                    style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                                    onClick={() => window.location.href = `/contrato-cliente/${client.id}`}
                                >
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{client.cli_razaoSocial}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{client.cli_responsavel}</TableCell>
                                    <TableCell sx={{ fontSize: 20, textAlign: "center" }}>{client.cli_telCelular !== "" ? client.cli_telCelular : client.cli_telFixo}</TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function setError(arg0: string) {
    throw new Error("Function not implemented.");
}


