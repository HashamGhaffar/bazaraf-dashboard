import { Order, StatusType } from "../type";

export const getNewOrders = (orders: Order[]) => {
  const newOrders = orders.filter(
    (order: Order) => order.orderStatus === StatusType.PENDING
  );
  return newOrders.length;
};

export const getCompletedOrders = (orders: Order[]) => {
  const completedOrders = orders.filter(
    (order: Order) => order.orderStatus === StatusType.DELIVERED
  );
  return completedOrders.length;
};

export const getAverageOrderValue = (orders: Order[]) => {
  const filteredOrders = orders.filter(
    (order: Order) => order.amountWithDiscount
  );

  const totalValue = filteredOrders.reduce((acc: number, order: Order) => {
    return acc + order.amountWithDiscount;
  }, 0);
  return totalValue / filteredOrders.length;
};

export const getTotalSales = (orders: Order[]) => {
  const totalValue = orders.reduce((acc: number, order: Order) => {
    return acc + order.amountWithDiscount;
  }, 0);
  return totalValue;
};

export const getOrderConversionRate = (
  orders: Order[]
): { sales: number; conversionRate: number } => {
  const totalSales = getTotalSales(orders);
  const completedOrders = getCompletedOrders(orders);
  const conversionRate = Math.round((completedOrders / orders.length) * 100);
  return { sales: totalSales, conversionRate };
};

export const getCancelledOrders = (orders: Order[]) => {
  const cancelledOrders = orders.filter(
    (order: Order) => order.orderStatus === StatusType.CANCELLED
  );
  return cancelledOrders.length;
};
