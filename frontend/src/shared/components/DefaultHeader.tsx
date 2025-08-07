import { Box, Typography } from "@mui/material";
import React from "react";

export const DefaultHeader: React.FC = () => {
   return (
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} paddingTop={2} paddingRight={10} paddingBottom={2} paddingLeft={10} bgcolor={'background.default'} color={'white'}>
        <Box padding={1}>
            <Box component={'img'} src={'/logo_empresa.jpg'} alt={'Logo da Empresa'} sx={{minWidth: 50, minHeight: 50, maxWidth: 125, maxHeight: 125, borderRadius: '100%'}} />
        </Box>
        <Typography variant="h5" color="text.primary">
            Sistema Comodato
        </Typography>
      </Box>
  );
}