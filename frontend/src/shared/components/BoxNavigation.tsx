import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export const BoxNavigation: React.FC = () => {
  return (
    <>
      <Box height={"100vh"} width={"50%"} margin={"auto"} display={"flex"}  justifyContent={"center"} alignItems={"flex-start"} gap={4} paddingTop={10}>
          <Button variant="contained" color="secondary">
              <Typography variant="h6" color="text.secondary">
                Visualizar Clientes
              </Typography>
          </Button>
          <Link to="/cadastro-clientes" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary">
                <Typography variant="h6" color="text.secondary">
                  Cadastrar Clientes
                </Typography>
            </Button>
          </Link>
      </Box>
    </>
  );
}