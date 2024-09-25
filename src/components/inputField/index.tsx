import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Box, InputLabel, SxProps, Theme } from "@mui/material";
import { ChangeEvent } from "react";
interface InputFieldProps {
  label: string;
  iconColor?: string;
  sx?: SxProps<Theme>;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  Icon?: React.ElementType;
  value?: string | number | undefined;
  errorMessage?: string;
  type?: string;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  iconColor = "black",
  sx,
  onChange,
  Icon,
  errorMessage,
  value,
  type,
  disabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <Box
      sx={{
        maxWidth: "470px",
        margin: "0 auto",
      }}
    >
      <Box sx={sx} mt={1}>
        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          display={"flex"}
        >
          <InputLabel
            htmlFor="input-with-icon-adornment"
            sx={{ fontSize: "16px", fontWeight: "400", color: "grey.400" }}
          >
            {label}
          </InputLabel>
          {errorMessage && (
            <Box sx={{ color: "error.main" }}>{errorMessage}</Box>
          )}
        </Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            borderRadius: "12px",
            borderColor: "grey.400",
            maxWidth: "470px",
            boxShadow: "none",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        >
          <IconButton disabled sx={{ p: "10px" }}>
            {Icon && <Icon sx={{ color: iconColor }} />}
          </IconButton>
          <InputBase
            sx={{ ml: 1 }}
            placeholder=""
            value={value}
            type={type}
            disabled={disabled}
            onChange={handleChange}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default InputField;
