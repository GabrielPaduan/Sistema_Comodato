import { Typography } from "@mui/material";
import React from "react";
import { Form } from "../../shared/components";

export class CadastroCliente extends React.Component {
    render() {
        return (
          <>
            <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
              Cadastro de Clientes 
            </Typography>
            <Form />
          </>
        );
    }
}