import { Box, Typography } from "@mui/material";
import { DefaultHeader, GenericButton } from "../../shared/components";
import React from "react";

export class HistoricoContratos extends React.Component {
  render() {
    return (
      <>
        <Box textAlign={"center"}>
            <DefaultHeader />
            <Typography variant="h4" paddingTop={"10px"}>Histórico de Contratos</Typography>
            <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
        </Box>
      </>
    );
  }
}                                                       