import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownComponentProps {
  title: string;
  value: string | number;
  onChange: (event: SelectChangeEvent) => void;
  data?: any;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  title,
  value,
  onChange,
  data = ["default1", "default2"],
}) => {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      style={{
        maxWidth: "470px",
        backgroundColor: "white",
        borderColor: "black",
        margin: "0 auto",
      }}
    >
      <InputLabel id="dropdown-label" sx={{ color: "black" }}>
        {title}
      </InputLabel>
      <Select
        labelId="dropdown-label"
        value={value}
        onChange={onChange}
        label={title}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "12px",
          "& .MuiSelect-outlined": {
            color: "black",
          },
          "& .MuiSelect-icon": {
            color: "black",
          },
        }}
      >
        {data.map((item) => (
          <MenuItem key={item} value={item} sx={{ color: "black" }}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComponent;
