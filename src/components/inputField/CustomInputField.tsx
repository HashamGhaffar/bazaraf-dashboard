import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Box, InputLabel, SxProps, Theme, Switch } from "@mui/material";

interface InputFieldProps {
  label: string;
  iconColor?: string;
  sx?: SxProps<Theme>;
  onChange: (value: string) => void;
  Icon?: React.ElementType;
  showSwitch?: boolean;
  type?: string;
  value: string;
  disabled?: boolean;
}

const CustomInputField: React.FC<InputFieldProps> = ({
  label,
  iconColor = "black",
  sx,
  onChange,
  value,
  Icon,
  showSwitch = false,
  type = "default",
  disabled = false,
}) => {
  console.log(value, "value");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box sx={{ ...sx, flex: 1 }}>
      <InputLabel
        htmlFor="input-with-icon-adornment"
        sx={{ fontSize: "16px", fontWeight: "400", color: "grey.400", mt: 1 }}
      >
        {label}
      </InputLabel>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderRadius: "10px",
          borderColor: "grey.400",
          boxShadow: "none",
          borderWidth: "1px",
          borderStyle: "solid",
          height: "50px",
        }}
      >
        {Icon && (
          <IconButton sx={{ p: 0 }}>
            <Icon sx={{ color: iconColor }} />
          </IconButton>
        )}

        <InputBase
          disabled={disabled}
          type={type}
          sx={{ ml: 1, flex: 1 }}
          placeholder=""
          value={value}
          onChange={handleChange}
        />
        {showSwitch && (
          <Switch
            checked={value === "AVAILABLE"}
            value={false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onChange(event.target.value);
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default CustomInputField;
