import { Box, Typography } from "@mui/material";
import React from "react";

export const DefaultHeader: React.FC = () => {
   return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} paddingTop={2} paddingRight={10} paddingBottom={2} paddingLeft={10} bgcolor={'background.default'} color={'white'} sx={{ '@media ( min-width: 320px) and (max-width: 600px)': { padding: 0.5 } }} >
        <Box padding={1} >
            <Box component={'img'} src={'/logo_empresa.jpg'} alt={'Logo da Empresa'} sx={{minWidth: 50, minHeight: 50, maxWidth: 125, maxHeight: 125, borderRadius: '100%', 
            '@media (min-width: 320px) and (max-width: 600px)': {
              width: '80px',
              height: '80px',
            }
            }} />
        </Box>
        <Typography variant="h5" color="text.primary" sx={{ '@media ( min-width: 320px) and (max-width: 600px)': { fontSize: '1.4rem', paddingRight: 0.5 } }}>
            Sistema Comodato
        </Typography>
      </Box>
  );
}