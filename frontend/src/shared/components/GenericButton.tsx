import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const GenericButton: React.FC<{ name: string, type: "button" | "submit", link: string }> = ({ name, type, link }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" type={type} sx={{ margin: '10px auto', padding: "15px" }}>
                <Typography variant="h6" color="text.secondary">
                {name}
                </Typography>
            </Button>
        </Link>
    );
}