import { Box, TableCell, Typography } from "@mui/material";
import React from "react";
import { GenericButton, TableClients } from "../../shared/components";


export class VisualizarClientes extends React.Component {
  render() {
      return (
        <>  
          <Box textAlign={"center"}>
            <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
              Listagem de Clientes
            </Typography>
            <TableClients />
            <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
          </Box>
        </>
      );
  }
}