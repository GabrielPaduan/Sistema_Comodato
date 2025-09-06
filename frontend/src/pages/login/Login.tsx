import { Box, Typography } from "@mui/material";
import React from "react";
import { LoginForm } from "../../shared/components/LoginForm";

export class Login extends React.Component {
    render() {
        return (
            <>  
                <Box textAlign={"center"} bgcolor={"#eeeeeeff"} height={"100vh"} paddingTop={5}>
                    <Typography variant="h4" color="text.primary" textAlign={"center"} paddingTop={10}>
                        Login                    
                    </Typography>
                    <LoginForm />
                </Box>
            </>
        );
    }
}
