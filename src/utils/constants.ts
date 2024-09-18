import { StatusType } from "../type";

// Order Contsants
export const statusOptions: StatusType[] = [
  StatusType.CANCELLED,
  StatusType.DELIVERED,
  StatusType.PENDING,
  StatusType.PROCESSING,
  StatusType.SHIPPED,
  StatusType.RETURNED,
];

export const OrderTypeMap = {
  DELIVERY: "Delivery",
  DINE_IN: "Dine-In",
  TAKE_AWAY: "Take Away",
  DRIVE_THRU: "Drive-Thru",
};

export const PaymentTypeMap = {
  CREDIT_CARD: "Credit Card",
  DEBIT_CARD: "Debit Card",
  PAYPAL: "PayPal",
  CRYPTO: "Cryptocurrency",
  CASH: "Cash",
  OTHER: "Other",
  CASH_ON_DELIVERY: "Cash on Delivery",
};
