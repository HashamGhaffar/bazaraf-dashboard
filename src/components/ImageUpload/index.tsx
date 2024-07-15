import React, { useState } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {
            console.log('File to upload:', selectedFile);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: isMobile ? '355px' : '470px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                border: '1px solid grey',
                borderRadius: 2,
            }}
        >
            <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{color: '#fff'}}
            >
                Upload Image
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Button>
            {preview && (
                <Box
                    component="img"
                    src={preview}
                    alt="Preview"
                    sx={{ width: '300px', height: '200px', marginTop: 2 }}
                />
            )}
            {selectedFile && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {selectedFile.name}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleUploadClick}
                disabled={!selectedFile}
                sx={{color: '#fff'}}
            >
                Upload
            </Button>
        </Box>
    );
};

export default ImageUpload;
