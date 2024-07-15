import React from 'react';
import { Checkbox, FormControlLabel, SxProps, Theme, Box } from '@mui/material';

interface CustomCheckboxProps {
    label: string;
    required?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sx?: SxProps<Theme>;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ sx, label, required = false, defaultChecked = false, onChange }) => (
    <Box sx={sx}>
        <FormControlLabel
            label={label}
            required={required}
            control={<Checkbox defaultChecked={defaultChecked} onChange={onChange} />}
        />
    </Box>
);

export default CustomCheckbox;
