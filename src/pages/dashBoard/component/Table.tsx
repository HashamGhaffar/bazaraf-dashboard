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
  CircularProgress,
} from "@mui/material";
import OrderDetailModal from "../../order";
import { Order } from "../../../type";
import { OrderTypeMap, PaymentTypeMap } from "../../../utils/constants";

const DetailTable: React.FC<{
  rows: Order[] | undefined;
  setrefetchOrders: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}> = ({ rows, setrefetchOrders, loading }) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Order | null>(null);

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
                Customer Phone
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Order Type
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Payment Type
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "14px", fontWeight: "400" }}
              >
                Total Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows?.map((row: Order, index: number) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid grey", cursor: "pointer" }}
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{row.customerPhoneNumber}</TableCell>
                    <TableCell>
                      {row.orderType && OrderTypeMap[row.orderType]}
                    </TableCell>
                    <TableCell>
                      {row.paymentType && PaymentTypeMap[row.paymentType]}
                    </TableCell>
                    <TableCell>{row.orderStatus}</TableCell>
                    <TableCell>{row.amountWithDiscount}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <OrderDetailModal
          open={open}
          onClose={handleClose}
          orderDetails={selectedRow}
          orderId={selectedRow?.orderId ?? ""}
          setrefetchOrders={setrefetchOrders}
        />
      )}
    </Box>
  );
};

export default DetailTable;
