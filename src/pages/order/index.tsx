import React, {useState} from "react";
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
import { modifier } from "../../utils";

const data = [
  {
    thumbnail: modifier,
    name: "Drink",
    itemPrice: "Rs.12",
    quantity: 2,
    modifier: "Extra Cheese",
    price: "Rs.18",
  },
];

interface OrderDetailModalProps {
  open: boolean;
  onClose: () => void;
  customerDetails: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  orderDetails: {
    id: string;
    date: string;
    paymentMethod: string;
    status: string;
    instructions?: string;
  };
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  onClose,
  customerDetails,
  orderDetails,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
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
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Name: {customerDetails.name}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Phone: {customerDetails.phoneNumber}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Address: {customerDetails.address}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "600", fontSize: "18px" }}
            >
              Order Details
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              ID: {orderDetails.id}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Date: {orderDetails.date}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "18px" }}>
              Payment Method: {orderDetails.paymentMethod}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="body2" sx={{ fontSize: '18px' }}>Status:</Typography>
              <FormControl sx={{ marginLeft: '5px' }}>
                <Select
                  value={selectedValue}
                  label="Select Option"
                  onChange={handleChange}
                  sx={{
                    height: '30px',
                    width: '150px',
                    '.MuiSelect-select': {
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: '200px',
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="option1">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {orderDetails.instructions && (
              <Typography variant="body2" sx={{ fontSize: "18px" }}>
                Instructions: {orderDetails.instructions}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <OrderTable rows={data} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            Amount: 200
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            Discount: 10%
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            VAT: 5%
          </Typography>
          <Typography variant="body2" sx={{ fontSize: "18px" }}>
            Total Price: RS.230
          </Typography>
        </Box>
      </Paper>
    </Modal>
  );
};

export default OrderDetailModal;
