import { Button, SxProps } from "@mui/material";
import React from "react";

interface SimpleButtonProps {
  text: string;
  onClick: () => void;
  icon?: string; 
  sx?: SxProps;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ text, onClick, icon, sx }) => {
  return (
    <>
      <Button
        onClick={onClick}
        startIcon={icon && <img src={icon} alt="Icon" style={{ marginRight: "5px", width: '35px', height: '30px'}} />}
        sx={{
          textTransform: "none",
          backgroundColor: "primary.main",
          color: "white",
          width: "146px",
          height: "56px",
          borderRadius: "30px",
          borderStyle: "solid",
          borderColor: "primary.main",
          fontWeight: "bold",
          fontSize: "22px",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            borderColor: "primary.main",
          },
          ...sx,
        }}
      >
        {text}
      </Button>
    </>
  );
};

export default SimpleButton;
