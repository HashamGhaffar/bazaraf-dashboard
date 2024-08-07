import React, { useRef, useState } from 'react';
import { Radio, Box, Typography, IconButton } from '@mui/material';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

const SelectImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRadioClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file.name);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid',
        borderRadius: '10px',
        height: '50px',
        borderColor: 'grey.400',
        width: '230px',
        margin: "0 auto",
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Radio onClick={handleRadioClick} />
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <Box sx={{ flexGrow: 1, marginLeft: '4px', display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1">{selectedImage ? selectedImage : 'Selected Logo'}</Typography>
      </Box>
      <IconButton color="primary">
        <PhotoCameraBackIcon />
      </IconButton>
    </Box>
  );
};

export default SelectImage;