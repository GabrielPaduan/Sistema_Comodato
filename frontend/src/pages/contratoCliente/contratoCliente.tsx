import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom"; // Importe o hook
import { LayoutBaseContrato } from "../../shared/components";

export const ContratoCliente: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <Box textAlign={"center"}>
            <LayoutBaseContrato id={Number(id || 0)} />
        </Box>
    );
};