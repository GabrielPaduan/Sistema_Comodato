import { Box, Button, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import { ClientDTO } from "../utils/DTOS";
import React, { useEffect, useState } from "react";
import { getAllClients } from "../services/clientService";
import { SearchField } from "./searchField";

export const TableClients: React.FC = () => {
    const [clientsData, setClientsData] = React.useState<ClientDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect (() => {
        const fetchClients = async () => {
        try {
            const data = await getAllClients();
            setClientsData(data);
        } catch (err: any) {
            console.error(err);
        } 
        };

        fetchClients();
    }, []);

    const filteredClients = clientsData.filter(client =>
        client.cli_razaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ maxWidth: "70%", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", marginTop: 3}}>
            <SearchField onSearchChange={setSearchTerm} />
            <TableContainer component={Paper} sx={{margin: "auto", cursor: "default", overflowY: "scroll", maxHeight: "57vh", marginTop: 3 }}>
                <Table stickyHeader>
                    <TableHead>
                    <TableRow>
                        <TableCell  sx={{ fontSize: 20, textAlign: "center" }}>Cliente</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>E-mail</TableCell>
                        <TableCell sx={{ fontSize: 20, textAlign: "center" }}>Endereço</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        filteredClients.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} sx={{ textAlign: "center", fontSize: 20 }}>
                                    Nenhum contrato cadastrado
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredClients.map((client) => (
                                <TableRow
                                    id={String(client.id)}
                                    key={client.id}
                                    hover
                                    style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                                    onClick={() => window.location.href = `/contrato-cliente/${client.id}`}
                                >
                                    <TableCell sx={{ fontSize: 16, textAlign: "center" }}>{client.cli_razaoSocial}</TableCell>
                                    <TableCell sx={{ fontSize: 16, textAlign: "center" }}>{client.cli_email === "" ? "Não informado" : client.cli_email}</TableCell>
                                    <TableCell sx={{ fontSize: 16, textAlign: "center" }}>{client.cli_end === "" ? "Não informado" : client.cli_end}</TableCell>
                                </TableRow>
                            ))
                        )
                    }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

function setError(arg0: string) {
    throw new Error("Function not implemented.");
}


