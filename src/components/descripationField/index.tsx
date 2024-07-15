import React from 'react';
import { TextField, Box, InputLabel } from '@mui/material';

interface DescriptionFieldProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rows?: number;
    required?: boolean;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ label, value, onChange, rows = 4, required = false }) => {
    return (
        <Box
            sx={{
                maxWidth: "470px",
                margin: "0 auto",
                mt: 1
            }}
        >
            <InputLabel
                htmlFor="input-with-icon-adornment"
                sx={{ fontSize: "16px", fontWeight: "400", color: "grey.400" }}
            >
                {label}
            </InputLabel>
            <TextField
                value={value}
                onChange={onChange}
                multiline
                rows={rows}
                required={required}
                variant="standard"
                fullWidth
                InputProps={{
                    disableUnderline: true, 
                    sx: {
                        borderRadius: "12px",
                        borderColor: "grey.400",
                        boxShadow: "none",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: "10px",
                        '&:focus': {
                            borderColor: "grey.400",
                        },
                        '&:hover:not(.Mui-disabled):before': {
                            borderColor: "grey.400",
                        },
                        '&:before': {
                            borderColor: "grey.400",
                        },
                        '&:after': {
                            borderColor: "grey.400",
                        },
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    maxWidth: "470px",
                }}
            />
        </Box>
    );
}

export default DescriptionField;
