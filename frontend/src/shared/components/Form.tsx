import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FormField } from "./FormField";
import { GenericButton } from "./GenericButton";
import { useState } from "react";
import { ClientDTOInsert } from "../utils/DTOS";
import { createClient } from "../services/clientService";
import { create } from "domain";

export const Form: React.FC = () => {
    const [client, setClient] = useState<ClientDTOInsert | null>(null);
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const newClient: ClientDTOInsert = {
                cli_razaoSocial: formData.get("razaosocial") as string,
                cli_doc: formData.get("documento") as string,
                cli_typeDoc: formData.get("docType") as unknown as number,
                cli_end: formData.get("endereco") as string,
                cli_cep: formData.get("cep") as string,
                cli_email: formData.get("email") as string,
            };
            setClient(newClient);
            console.log("Submitting client:", newClient);
            // Here you would typically send the newClient to your backend
            createClient(newClient);
            setClient(null);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            padding={4}
            display="flex"
            flexDirection="column"
            gap={2}
            maxWidth={"70%"}
            margin="auto"
            onSubmit={submitForm}
        >
            <FormField label="Razão Social" name="razaosocial" required placeholder="Digite a razão social" width="75%" flex={1} mr={2} mTopTxt={0} />
         
            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <FormField flex={9.5} mr={2} label="Documento" name="documento" required placeholder="Digite o documento" width="73.3%" mTopTxt={0} />
                <Box flex={0.5} marginLeft={2}>
                    <Select
                        labelId="doc-select-label"
                        id="doc-select"
                        label="doc"
                        name="docType"
                        defaultValue={0}
                        fullWidth
                    >
                        <MenuItem value={0}>CPF</MenuItem>
                        <MenuItem value={1}>CNPJ</MenuItem>
                    </Select>
                </Box>
            </Box>
            <FormField flex={1} mr={2} label="Endereço" name="endereco" required placeholder="Digite o endereço" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="CEP" name="cep" required placeholder="Digite o CEP" width="75%" mTopTxt={0} />
            <FormField flex={1} mr={2} label="E-mail" name="email" required placeholder="Digite o e-mail" width="75%" mTopTxt={0} />
        
            <Box display={"flex"} justifyContent={"center"} gap={2}>
                <Box>
                    <Button variant="contained" color="primary" type="submit" sx={{ margin: "10px auto", padding: "15px" }}>
                        <Typography variant="h6" color="text.secondary">
                            Cadastrar
                        </Typography>
                    </Button>
                </Box>
                <GenericButton name="Voltar" type="button" link="/pagina-inicial" />
            </Box>
        </Box>
    );
}