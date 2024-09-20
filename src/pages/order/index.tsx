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
  SelectChangeEvent,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import OrderTable from "./component/orderTable";
import { updateOrder } from "../../api/orderApi";

import { Order, StatusType } from "../../type";
import { PaymentTypeMap, statusOptions } from "../../utils/constants";

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
  setrefetchOrders: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  onClose,
  orderDetails,
  orderId,
  setrefetchOrders,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedValue, setSelectedValue] = useState<StatusType | "">("");
  const [orderItems, setOrderItems] = useState<OrderItems[]>([]);

  const accessToken: string = useSelector(
    (state: any) => state.auth.accessToken
  );
  const restaurantId: string = useSelector(
    (state: any) => state.auth.restaurant.restaurantId
  );

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
            ? cart.selectedModifiers.map((mod: any) => mod.name).join(", ")
            : "No Modifier",
          price: String((cart.item.price + modifiersPrice) * cart.quantity),
        };
      });
      setOrderItems(items);
    }
  }, []);

  const handleStatusChange = async (event: SelectChangeEvent<StatusType>) => {
    const newStatus = event.target.value as StatusType;

    setSelectedValue(newStatus);

    if (orderDetails) {
      try {
        await updateOrder(
          accessToken,
          restaurantId,
          orderDetails.orderId ?? "",
          newStatus
        );
        setrefetchOrders((prev) => !prev);
        toast.success("Order status updated successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

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
          maxHeight: { xs: "600px", sm: "800px", md: "823px" },
          maxWidth: { xs: "400px", sm: "560px", md: "770px" },
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
              Order ID: #{orderId}
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
                  onChange={handleStatusChange}
                  label="Age"
                  sx={{ border: "none", fontSize: { xs: "13px", md: "16px" } }}
                >
                  {statusOptions.map((option: StatusType) => (
                    <MenuItem key={option} value={option}>
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

        <Table sx={{ width: "auto", float: "right", mt: 2 }}>
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
              0%
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
              RS.{orderDetails?.amountWithDiscount}
            </TableCell>
          </TableRow>
        </Table>
      </Paper>
    </Modal>
  );
};

export default OrderDetailModal;
