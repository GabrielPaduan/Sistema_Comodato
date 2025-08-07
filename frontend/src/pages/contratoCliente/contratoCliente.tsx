import { Box, Button, Tab, Typography } from "@mui/material";
import React from "react";
import { LayoutBaseContrato } from "../../shared/components";
import { generateReport } from "../../shared/utils/Report";
import { Link } from "react-router-dom";

export class ContratoCliente extends React.Component {
  render() {
    return (
      <Box textAlign={"center"}>
        <LayoutBaseContrato />
      </Box>

    );
  }
}