import React from 'react';
import { Box, Typography, Card, CardContent, SxProps, Theme, useMediaQuery, useTheme } from '@mui/material';

interface SellingOrderCardProps {
    orderCount: number;
    backgroundImage: string;
    sx?: SxProps<Theme>;
    OrderText: string;
}

const SellingOrderCard: React.FC<SellingOrderCardProps> = ({ orderCount, backgroundImage, sx, OrderText }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ marginX: isMobile ? "auto" : "0px"}}>
        <Card sx={{ borderRadius: '12px', overflow: 'hidden', position: 'relative',
            width: isMobile ? '330px' : '300px',
            height: '150px',
         ...sx }}>
            <Box
                component="img"
                src={backgroundImage}
                alt="Background"
                sx={{
                    position: 'absolute',
                    top: 15,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.3,
                }}
            />
            <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" color="white" sx={{ textAlign: 'center', marginBottom: '20px', fontSize: isMobile ? '26px' : '26px', }}>
                    {OrderText}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h4" color="white" sx={{ fontWeight: 'bold', marginLeft: 'auto', mr: 2 }}>
                        {orderCount}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
        </Box>
    );
}

export default SellingOrderCard;
