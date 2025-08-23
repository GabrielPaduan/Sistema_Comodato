import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { LoginDTO } from "../utils/DTOS";
import { Typography } from "@mui/material";
import { FormField } from "./FormField";

export const LoginForm: React.FC = () => {
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const formData = new FormData(event.currentTarget);
                const login: LoginDTO = {
                    email: formData.get("email") as string,
                    password: formData.get("password") as string,
                };
                console.log("Submitting login:", login);
                // Here you would typically send the login to your backend
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
            onSubmit={submitForm}
            maxWidth={"45%"}
            margin={"auto"}
            gap={2}
        >
            <FormField mTopTxt={2} flex={1} mr={2} width={"75%"} label={"Email"} name="email" content="space-evenly" />
            <FormField mTopTxt={2} flex={1} mr={2} width={"75%"} label={"Senha"} name="senha" content="space-evenly" />
        </Box>
    );
};