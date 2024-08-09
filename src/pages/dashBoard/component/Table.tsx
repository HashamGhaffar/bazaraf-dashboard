import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import OrderDetailModal from "../../order";

const DetailTable: React.FC<any> = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Items
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Customers
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                orderType
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ borderBottom: "1px solid grey", cursor: "pointer" }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.carts[0]?.item?.name}</TableCell>
                  <TableCell>{row?.carts[0]?.item?.price}</TableCell>
                  <TableCell>{row?.orderType}</TableCell>
                  <TableCell>{row?.orderStatus}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <OrderDetailModal
          open={open}
          onClose={handleClose}
          customerDetails={{
            name: selectedRow.customer,
            phoneNumber: selectedRow.phoneNumber,
            address: "1234 Street, City, Country",
          }}
          orderDetails={{
            id: selectedRow.id,
            date: "2023-07-10",
            paymentMethod: "Credit Card",
            status: selectedRow.status,
            instructions: "Leave at the door",
          }}
        />
      )}
    </Box>
  );
};

export default DetailTable;
