import React from 'react';
import { Box, Typography, Card, IconButton, useMediaQuery, useTheme } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalMallIcon from '@mui/icons-material/LocalMall';

interface OrderDetailCardProps {
    averageOrderValue: number;
    percentage: number;
    fromDate: string;
    value: string;
}

const getIcon = (value: string) => {
    switch (value) {
        case 'Total Sales':
            return <LocalMallIcon sx={{ color: 'darkblue', fontSize: '24px' }} />;
        case 'Conversion Rate':
            return <AttachMoneyIcon sx={{ color: 'darkblue', fontSize: '24px' }}/>;
        default:
            return <WalletIcon sx={{ color: 'darkblue', fontSize: '24px' }} />;
    }
};

const OrderDetailCard: React.FC<OrderDetailCardProps> = ({ averageOrderValue, percentage, fromDate, value }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            overflow: 'hidden',
            width: isMobile ? '330px' : '300px',
            height: isMobile ? '190px' : '180px',
            position: 'relative',
            padding: isMobile ? '20px' : '16px',
            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
            marginBottom: isMobile ? '16px' : '0',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <IconButton sx={{ color: 'darkblue', backgroundColor: '#EBEBEB', width: '48px', height: '48px' }}>
                    {getIcon(value)}
                </IconButton>
                <IconButton sx={{ color: 'darkblue', backgroundColor: '#EBEBEB', width: '48px', height: '48px' }}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Typography sx={{ color: 'gray', fontSize: '18px' }}>{value}</Typography>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>${averageOrderValue.toFixed(2)}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                {percentage > 0 ? (
                    <TrendingUpIcon sx={{ color: 'green', fontSize: '24px' }} />
                ) : (
                    <TrendingDownIcon sx={{ color: 'red', fontSize: '24px' }} />
                )}
                <Typography sx={{ color: percentage > 0 ? 'green' : 'red', fontSize: '14px', marginLeft: '4px' }}>
                    {percentage}%
                </Typography>
                <Typography sx={{ color: 'gray', fontSize: '14px', marginLeft: '8px' }}>
                    From {fromDate}
                </Typography>
            </Box>
        </Card>
    );
};

export default OrderDetailCard;
