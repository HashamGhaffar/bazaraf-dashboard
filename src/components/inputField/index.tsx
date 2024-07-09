import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Box, InputLabel, SxProps, Theme } from "@mui/material";

interface InputFieldProps {
  label: string;
  iconColor?: string;
  sx?: SxProps<Theme>;
  onChange: (value: string) => void;
  Icon?: React.ElementType;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconColor = "black",
  sx,
  onChange,
  Icon,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box sx={sx} mt={1}>
      <InputLabel
        htmlFor="input-with-icon-adornment"
        sx={{ fontSize: "16px", fontWeight: "400", color: "grey.400" }}
      >
        {label}
      </InputLabel>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          borderColor: "grey.400",
          width: 470,
          boxShadow: "none",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <IconButton sx={{ p: "10px" }}>
          {Icon && <Icon sx={{ color: iconColor }} />}
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder=""
          value={value}
          onChange={handleChange}
        />
      </Paper>
    </Box>
  );
};

export default InputField;
