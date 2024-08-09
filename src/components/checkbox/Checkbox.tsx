import React from "react";
import { Checkbox, FormControlLabel, SxProps, Theme, Box } from "@mui/material";

interface CustomCheckboxProps {
  label: string;
  required?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
  value?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  sx,
  label,
  required,
  defaultChecked,
  onChange,
  value,
}) => (
  <Box sx={sx}>
    <FormControlLabel
      label={label}
      required={required}
      control={
        <Checkbox
          checked={value}
          defaultChecked={value === undefined ? defaultChecked : undefined}
          onChange={onChange}
        />
      }
    />
  </Box>
);

export default CustomCheckbox;
