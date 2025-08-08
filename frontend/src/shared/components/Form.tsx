import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FormField } from "./FormField";
import { GenericButton } from "./GenericButton";
import { useState } from "react";
import { ClientDTO } from "../utils/DTOS";

export const Form: React.FC = () => {
    const [client, setClient] = useState<ClientDTO | null>(null);
    
    return (
        <Box component="form" noValidate autoComplete="off" padding={4} display="flex" flexDirection="column" gap={2} maxWidth={"70%"} margin="auto">
            <FormField label="Razão Social" name="razaosocial" required placeholder="Digite a razão social" width="75%" flex={1} mr={2} mTopTxt={0} />
            <FormField label="Nome Fantasia" name="nomefantasia" required placeholder="Digite o nome fantasia" width="75%" flex={1} mr={2} mTopTxt={0} />

            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <FormField flex={9.5} mr={2} label="Documento" name="documento" required placeholder="Digite o documento" width="73.1%" mTopTxt={0} />
                <Box flex={0.5} marginLeft={2}>
                    <Select
                        labelId="doc-select-label"
                        id="doc-select"
                        label="doc"
                        name="docType"
                        defaultValue={"CPF"}
                        fullWidth
                    >
                        <MenuItem value={"CPF"}>CPF</MenuItem>
                        <MenuItem value={"CNPJ"}>CNPJ</MenuItem>
                    </Select>
                </Box>
            </Box>
            <FormField flex={1} mr={2} label="Endereço" name="endereco" required placeholder="Digite o endereço" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="CEP" name="cep" required placeholder="Digite o CEP" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="Telefone Celular" name="telefone" required placeholder="(43) 00000-0000" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="Telefone Fixo" name="telefone-fixo" required placeholder="(43) 0000-0000" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="E-mail" name="email" required placeholder="Digite o e-mail" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="Responsável" name="responsavel" required placeholder="Digite o nome do responsável" width="75%" mTopTxt={0} />

            <Box display={"flex"} justifyContent={"center"} gap={2}>
                <GenericButton name="Cadastrar" type="submit" link="/none" />
                <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
            </Box>
        </Box>
    );
}