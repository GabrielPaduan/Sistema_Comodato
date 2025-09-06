import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { FormCadastroUser } from "../../shared/components/FormCadastroUser";

export class CadastroUser extends React.Component {
    render() {
        return (
            <>
                <Box textAlign="center" paddingTop={10}>
                    <Typography variant="h4">Cadastro de Usuário</Typography>
                    <FormCadastroUser />
                </Box>
            </>
        );
    }
}
