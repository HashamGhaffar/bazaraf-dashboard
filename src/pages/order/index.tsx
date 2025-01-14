import React, { useEffect, useState } from "react";

import {
  Typography,
  Modal,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import OrderTable from "./component/orderTable";

import { DiscountTypes, Modifier, Order, StatusType } from "../../type";
import {
  OrderTypeMap,
  PaymentTypeMap,
  statusOptions,
} from "../../utils/constants";

interface OrderItems {
  thumbnail: string;
  name: string;
  itemPrice: string;
  quantity: number;
  modifier: string;
  price: string;
}

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  orderDetails: Order | null;
  orderId: string;
  handleStatusChange: (status: StatusType, orderId: string) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  onClose,
  orderDetails,
  orderId,
  handleStatusChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedValue, setSelectedValue] = useState<StatusType | "">("");
  const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

  useEffect(() => {
    if (orderDetails && orderDetails?.orderStatus) {
      setSelectedValue(orderDetails?.orderStatus ?? "");
    }
    if (orderDetails && orderDetails.carts.length) {
      const items: OrderItems[] = orderDetails.carts.map((cart: any) => {
        let modifiersPrice: number = 0;
        cart.selectedModifiers &&
          cart.selectedModifiers.forEach((modifier: any) => {
            if (modifier?.priceChange) {
              modifiersPrice += modifier?.priceChange;
            }
          });
        return {
          name: cart.item.name,
          thumbnail: cart.item.imageUrl,
          itemPrice: cart.item.price,
          quantity: cart.quantity,
          modifier: cart.selectedModifiers.length
            ? cart.selectedModifiers
              .map((mod: Modifier) => mod.name + `  (${mod?.priceChange})`)
              .join("\n")
            : "No Modifier",
          price: String((cart.item.price + modifiersPrice) * cart?.quantity),
        };
      });
      setOrderItems(items);
    }
  }, []);

  const tableCellStyle = {
    border: "none",
    fontSize: { xs: "13px", md: "16px" },
    fontWeight: "400",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="order-details-modal"
      aria-describedby="order-details-description"
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          maxHeight: "90vh",
          minHeight: "80vh",
          height: "100%",
          maxWidth: "80%",
          minWidth: "70%",
          width: "70%",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: isMobile ? 1 : 4,
          padding: {
            xs: "50px 25px 10px 25px",
            md: "",
            sm: "5px 60px 50px 60px",
          },
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: "600",
            display: { xs: "none", sm: "block" },
          }}
        >
          Orders
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "700", fontSize: { xs: "13px", md: "16px" } }}
            >
              Customer Details
            </Typography>
            {/* Todo: Add customer name */}
            {/* <Typography variant="body2" sx={{ fontSize: { xs: "13px", md: "16px" } }}>
              Name:
            </Typography> */}
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "13px", md: "16px" } }}
            >
              Phone Number: {orderDetails?.customerPhoneNumber}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "13px", md: "16px" } }}
            >
              {orderDetails?.pickupTime ? "Pickup Time" : "Address"}:{" "}
              {orderDetails?.pickupTime || orderDetails?.completeAddress}
            </Typography>
          </Box>

          <Box sx={{ minWidth: "213px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "700", fontSize: { xs: "13px", md: "16px" } }}
            >
              Order Details
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "13px", md: "16px" } }}
            >
              ID: #{orderId}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "13px", md: "16px" } }}
            >
              Type:{" "}
              {orderDetails?.orderType && OrderTypeMap[orderDetails.orderType]}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "13px", md: "16px" } }}
            >
              Date:{" "}
              {new Date(orderDetails?.createdAt ?? "").toLocaleDateString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "13px", md: "16px" } }}
            >
              Payment Method:{" "}
              {orderDetails?.paymentType &&
                PaymentTypeMap[orderDetails?.paymentType]}
            </Typography>
            {orderDetails && (
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "13px", md: "16px" } }}
              >
                Instructions: {orderDetails?.instructions}
              </Typography>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "13px", md: "16px" } }}
              >
                Status:
              </Typography>
              <FormControl
                variant="standard"
                sx={{ marginLeft: "5px", minWidth: 120 }}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedValue}
                  onChange={(e) => {
                    const newStatus = e.target.value as StatusType;
                    setSelectedValue(newStatus);
                    handleStatusChange(newStatus, orderDetails?.orderId ?? "");
                  }}
                  label="Age"
                  sx={{ border: "none", fontSize: { xs: "13px", md: "16px" } }}
                >
                  {statusOptions.map((option: StatusType) => (
                    <MenuItem
                      sx={{ fontSize: { xs: "13px", md: "16px" } }}
                      key={option}
                      value={option}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <OrderTable rows={orderItems} />
        </Box>

        <Table
          sx={{ width: "auto", float: "right", mt: 2, marginRight: "16px" }}
        >
          <TableRow>
            <TableCell sx={{ padding: "0 14px 0 0", ...tableCellStyle }}>
              Amount:
            </TableCell>
            <TableCell
              sx={{ padding: 0, ...tableCellStyle, textAlign: "right" }}
            >
              {orderDetails?.amountWithoutDiscount}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: "0 14px 0 0", ...tableCellStyle }}>
              Discount:
            </TableCell>
            <TableCell
              sx={{ padding: 0, ...tableCellStyle, textAlign: "right" }}
            >
              {orderDetails?.discount?.discountType ===
                DiscountTypes.FIXED_AMOUNT && "AED."}
              {orderDetails?.discount?.discountValue}
              {orderDetails?.discount?.discountType ===
                DiscountTypes.PERCENTAGE && " %"}
            </TableCell>
          </TableRow>

          {/* { TODO: Add VAT } */}
          {/* <TableRow>
            <TableCell sx={{ padding: "0 14px 0 0", ...tableCellStyle }}>VAT:</TableCell>
            <TableCell sx={{ padding: 0, ...tableCellStyle, textAlign: "right" }}>5%</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell sx={{ padding: "0 14px 0 0", ...tableCellStyle }}>
              Total Price:
            </TableCell>
            <TableCell
              sx={{ padding: 0, ...tableCellStyle, textAlign: "right" }}
            >
              AED.{orderDetails?.amountWithDiscount}
            </TableCell>
          </TableRow>
        </Table>
      </Paper>
    </Modal>
  );
};

export default OrderDetailModal;
