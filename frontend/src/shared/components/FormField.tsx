import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import React from "react";

type FormFieldProps = TextFieldProps & {
  label: string;
  width: string;
  flex: number;
  mr: number;
  mTopTxt?: number;
};

export const FormField: React.FC<FormFieldProps> = ({mTopTxt, flex, mr, width, label, name, ...rest }) => {
    const fieldId = name || label.toLowerCase().replace(/\s+/g, '-');
  
    return (
    <Box flex={flex} display="flex" justifyContent="space-between" alignItems="center">
        <Typography component="label" htmlFor={fieldId} maxWidth={"25%"} variant="h6">
            {label}:
        </Typography>
      <TextField id={fieldId} name={name} variant="outlined" sx={{ width: width }} {...rest} />
    </Box>
  );
}