import { Box, Button, Typography } from "@mui/material";
import React from "react";


export class BoxNavigation extends React.Component {
  render() {
    return (
      <>
        <Box height={"100vh"} width={"50%"} margin={"auto"} display={"flex"}  justifyContent={"center"} alignItems={"flex-start"} gap={4} paddingTop={10}>
            <Button variant="contained" color="secondary">
                <Typography variant="h6" color="text.secondary">
                  Visualizar Clientes
                </Typography>
            </Button>
            <Button variant="contained" color="secondary">
                <Typography variant="h6" color="text.secondary">
                 Cadastrar Clientes
                </Typography>
            </Button>
        </Box>
      </>
    );
  }
}