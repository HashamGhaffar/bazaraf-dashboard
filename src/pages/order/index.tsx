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
import OrderTable from "./component/orderTable";
import { Order, StatusType } from "../../type";
import { updateOrder } from "../../api/orderApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
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
        await updateOrder(accessToken, restaurantId, orderId ?? "", newStatus);
        setrefetchOrders((prev) => !prev);
        toast.success("Order status updated successfully");
      } catch (error) {
        console.error(error);
      }
    }
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
          transform: "translate(-50%, -50%)",
          width: isMobile ? "400px" : "auto",
          height: isMobile ? "700px" : "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: isMobile ? 1 : 4,
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", fontSize: "30px" }}
        >
          Order Detail
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "600", fontSize: "18px" }}
            >
              Customer Details
            </Typography>
            {/* Todo: Add customer name */}
            {/* <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Name:
            </Typography> */}
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Phone: {orderDetails?.customerPhoneNumber}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              {orderDetails?.pickupTime ? "Pickup Time" : "Address"}:{" "}
              {orderDetails?.pickupTime || orderDetails?.completeAddress}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "600", fontSize: "18px" }}
            >
              Order Details
            </Typography>
            {/* Todo: Add order id */}
            {/* <Typography variant="body2" sx={{ fontSize: "18px" }}>
              ID: {orderDetails?.orderId}
            </Typography> */}
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Date:{" "}
              {new Date(orderDetails?.createdAt ?? "").toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Payment Method:{" "}
              {orderDetails?.paymentType &&
                PaymentTypeMap[orderDetails?.paymentType]}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="body2" sx={{ fontSize: "18px" }}>
                Status:
              </Typography>
              <FormControl sx={{ marginLeft: "5px" }}>
                <Select
                  value={selectedValue}
                  label="Select Option"
                  onChange={handleStatusChange}
                  sx={{
                    height: "30px",
                    width: "150px",
                    ".MuiSelect-select": {
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: "200px",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {statusOptions.map((option: StatusType) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {orderDetails && (
              <Typography variant="body2" sx={{ fontSize: "18px" }}>
                Instructions: {orderDetails?.instructions}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <OrderTable rows={orderItems} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            Amount: {orderDetails?.amountWithoutDiscount}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            Discount: 10%
          </Typography>
          {/* { TODO: Add VAT } */}
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            VAT: 5%
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            Total Price: RS.{orderDetails?.amountWithDiscount}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
};

export default OrderDetailModal;
