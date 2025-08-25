import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchField } from "./searchField";
import { PdfStructDTO } from "../utils/DTOS";
import { getAllPDFContracts } from "../services/pdfContract";

export const TableHistoricoContract: React.FC = () => {
    const [pdfsData, setPdfsData] = React.useState<PdfStructDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const[page, setPage] = useState(0);
    const[rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    useEffect (() => {
        const fetchPDFContracts = async () => {
        try {
            const data = await getAllPDFContracts();
            setPdfsData(data);
        } catch (err: any) {
            console.error(err);
        } 
        };

        fetchPDFContracts();
    }, []);

    // const filteredClients = clientsData.filter(client =>
    //     client.cli_razaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <></>
        // <Box sx={{ maxWidth: "70%", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto", marginTop: 3}}>
        //     <SearchField onSearchChange={setSearchTerm} />
        //     <TableContainer component={Paper} sx={{margin: "auto", cursor: "default", overflowY: "scroll", maxHeight: "57vh", marginTop: 3 }}>
        //         <Table stickyHeader>
        //             <TableHead>
        //             <TableRow>
        //                 <TableCell  sx={{ fontSize: 20, textAlign: "center" }}>Cliente</TableCell>
        //                 <TableCell sx={{ fontSize: 20, textAlign: "center" }}>E-mail</TableCell>
        //                 <TableCell sx={{ fontSize: 20, textAlign: "center" }}>Endereço</TableCell>
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {
        //                 filteredClients.length === 0 ? (
        //                     <TableRow>
        //                         <TableCell colSpan={5} sx={{ textAlign: "center", fontSize: 20 }}>
        //                             Nenhum cliente cadastrado
        //                         </TableCell>
        //                     </TableRow>
        //                 ) : (
        //                     filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
        //                         <TableRow
        //                             id={String(client.id)}
        //                             key={client.id}
        //                             hover
        //                             style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
        //                             onClick={() => window.location.href = `/contrato-cliente/${client.id}`}
        //                         >
        //                             <TableCell sx={{ fontSize: 16, textAlign: "center" }}>{client.cli_razaoSocial}</TableCell>
        //                             <TableCell sx={{ fontSize: 16, textAlign: "center" }}>{client.cli_email === "" ? "Não informado" : client.cli_email}</TableCell>
        //                             <TableCell sx={{ fontSize: 16, textAlign: "center" }}>{client.cli_end === "" ? "Não informado" : client.cli_end}</TableCell>
        //                         </TableRow>
        //                     ))
        //                 )
        //             }
        //             </TableBody>
        //         </Table>
        //         <TablePagination
        //             component="div"
        //             count={filteredClients.length}
        //             page={page}
        //             onPageChange={handleChangePage}
        //             rowsPerPage={rowsPerPage}
        //             onRowsPerPageChange={handleChangeRowsPerPage}
        //             rowsPerPageOptions={[5, 10, 15]}
        //         />
        //     </TableContainer>
        // </Box>
    )
}
