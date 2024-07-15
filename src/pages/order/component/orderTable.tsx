import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Box, useMediaQuery, useTheme } from '@mui/material';

interface ListComponentProps {
    rows: { thumbnail: string, name: string, itemPrice: string, quantity: number, modifier: string, price: string }[];
}

const  OrderTable: React.FC<ListComponentProps> = ({ rows }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: isMobile ? '350px' : '650px', }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Item Price</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>QTY</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Modifiers</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} sx={{ borderBottom: '1px solid grey' }}>
                                <TableCell>
                                    <Avatar alt={row.name} src={row.thumbnail} style={{width: '50px', height: '50px'}} />
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.itemPrice}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.modifier}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default OrderTable;
