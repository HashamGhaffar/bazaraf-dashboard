import React from 'react';
import { Box } from '@mui/material';
import ThemeComponent from './component/BackgroundTheme';

const Theme: React.FC = () => {
    return (
        <Box
            sx={{
                mt: 0,
                position: 'relative',
                width: 'auto',
                height: 'auto',
                overflow: 'hidden',
                background: 'linear-gradient(to bottom, #fff, #fff)',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: '15%',
                    right: '15%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #5BB28B 0%, #133250 80%)',
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '0%',
                    left: '15%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #5BB28B 0%, #133250 80%)',
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    "@media (max-width: 500px)": {
                  display: 'block'
                },
                }}
            >
                <ThemeComponent />
            </Box>
        </Box>
    );
};

export default Theme;
