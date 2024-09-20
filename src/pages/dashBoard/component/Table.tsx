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
  Skeleton,
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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleRowClick = (row: Order, index: number) => {
    setSelectedRow(row);
    setSelectedIndex(index + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    setSelectedIndex(0);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="order table">
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
            {loading
              ? Array.from(new Array(10)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={120} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={60} />
                    </TableCell>
                  </TableRow>
                ))
              : // Display actual data once it's loaded
                rows?.map((row: Order, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ borderBottom: "1px solid grey", cursor: "pointer" }}
                    onClick={() => handleRowClick(row, index)}
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
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedRow && (
        <OrderDetailModal
          open={open}
          onClose={handleClose}
          orderDetails={selectedRow}
          orderId={selectedIndex.toString()}
          setrefetchOrders={setrefetchOrders}
        />
      )}
    </Box>
  );
};

export default DetailTable;
