import React from 'react';
import SellingOrderCard from './component/CardComponent';
import OrderDetailCard from './component/OrderDetailCard';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { orderFill, orderList, orderTrunk } from '../../utils';
import DetailTable from './component/Table';

const data = [
    { id: '1', items: 'Pizza', customer: 'Amina', phoneNumber: '0345767676', status: 'pending' },
];

const DashBoard: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ marginX: "15px" }}>
            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center',
                margin: '0 auto',
                gap: isMobile ? 2 : 6,
            }}>
                <SellingOrderCard
                    orderCount={10}
                    backgroundImage={orderTrunk}
                    OrderText="Selling Orders"
                    sx={{ backgroundColor: '#468A6C' }}
                />
                <SellingOrderCard
                    orderCount={12}
                    backgroundImage={orderList}
                    OrderText="Product Sells"
                    sx={{ backgroundColor: '#194D7C' }}
                />
                <SellingOrderCard
                    orderCount={14}
                    backgroundImage={orderFill}
                    OrderText="New Orders"
                    sx={{ backgroundColor: '#B12A20' }}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 2 : 4,
                mt: 5,
                maxWidth: isMobile ? '400px' : 'auto',
                justifyContent: 'center',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? 1 : 2,
                    ml: isMobile ? 0 : 1,
                    alignItems: isMobile ? 'center' : 'flex-start',
                }}>
                    <OrderDetailCard
                        value='Total Sales'
                        averageOrderValue={86784.93}
                        percentage={12.5}
                        fromDate="Jan"
                    />
                    <OrderDetailCard
                        value='Avg. Order Value'
                        averageOrderValue={234.14}
                        percentage={12.5}
                        fromDate="Jan"
                    />
                    <OrderDetailCard
                        value='Conversion Rate'
                        averageOrderValue={82.94}
                        percentage={0.32}
                        fromDate="Jan"
                    />
                </Box>
                <Box sx={{
                    padding: '0 12px',
                    borderRadius: '12px',
                    border: '1px solid grey.400',
                    overflow: 'hidden',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.2)',
                    width: isMobile ? '400px' : 'auto',
                }}>
                    <Typography sx={{ color: 'black', fontSize: '30px', mt: 4, textAlign: isMobile ? 'center' : 'left' }}>Orders</Typography>
                    <DetailTable rows={data} />
                </Box>
            </Box>
        </Box>
    );
}

export default DashBoard;
