import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { GenericButton } from "./GenericButton";


export const BoxNavigation: React.FC = () => {
  return (
    <>
      <Box width={"50%"} margin={"auto"} display={"flex"}  justifyContent={"center"} alignItems={"flex-start"} gap={4} paddingTop={10}>
          <GenericButton name="Visualizar Clientes" type="button" link="/visualizar-clientes" />
          <GenericButton name="Cadastrar Cliente" type="button" link="/cadastro-clientes" />
          <GenericButton name="Histórico de Contratos" type="button" link="/historico-contratos" />
      </Box>
    </>
  );
}