import React from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { photoUpload } from "../../api/ThemeApi";
import { useSelector } from "react-redux";
import { RootState } from "../../type";
interface ImageUploadProps {
  onChange: (imageUrl: string) => void;
  url: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, url }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const res = await photoUpload(file, accessToken);

    onChange(res.imageUrl);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: isMobile ? "355px" : "470px",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: 2,
        border: "1px solid grey",
        borderRadius: 2,
      }}
    >
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ color: "#fff" }}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      {url && (
        <Box
          component="img"
          src={url}
          alt="Preview"
          sx={{ width: "300px", height: "200px", marginTop: 2 }}
        />
      )}
      {/* {selectedFile && (
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {selectedFile.name}
        </Typography>
      )} */}
    </Box>
  );
};

export default ImageUpload;
