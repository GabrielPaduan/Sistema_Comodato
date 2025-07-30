import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Form: React.FC = () => {
  return (
    <Box component="form" noValidate autoComplete="off" padding={4} display="flex" flexDirection="column" gap={2} width={"40%"} margin="auto">
        <Typography component="label" htmlFor="nome-cliente">Nome Cliente: </Typography>
        <TextField id="nome-cliente" variant="outlined" fullWidth margin="normal" />

        <Button variant="contained" color="primary" type="submit">
            <Typography variant="button" color="text.secondary">
                Cadastrar
            </Typography>
        </Button>

        <Link to="/pagina-inicial" style={{ textDecoration: 'none', marginTop: '10px' }}>
            <Button variant="contained" color="primary" type="button" style={{ width: '100%' }}>
                <Typography variant="button" color="text.secondary">
                    Voltar
                </Typography>
            </Button>
        </Link>
    </Box>
  );
}