import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ListComponentProps {
    rows: { thumbnail: string, name: string, description: string }[];
}

const ListComponent: React.FC<ListComponentProps> = ({ rows }) => {
    return (
        <Box sx={{ overflowX: 'auto', }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Thumbnail</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Name</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Description</TableCell>
                            <TableCell sx={{ color: 'white', fontSize: '16px', fontWeight: '400' }}>Edit/Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} sx={{ borderBottom: '1px solid grey' }}>
                                <TableCell>
                                    <Avatar alt={row.name} src={row.thumbnail} style={{width: '50px', height: '50px'}} />
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <IconButton
                                        sx={{ color: 'primary.main', '&:hover': { color: 'primary.main' } }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        sx={{ color: 'gray', '&:hover': { color: 'red' } }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ListComponent;
