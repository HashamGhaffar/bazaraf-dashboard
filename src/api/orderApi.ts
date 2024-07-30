import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Order } from "../type";

// Handle API errors
const handleError = (error: AxiosError): void => {
  if (error.response) {
    console.error("Error status:", error.response.status);
    console.error("Error data:", error.response.data);
  } else if (error.request) {
    console.error("Error request:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
  throw error;
};

// Create an order
export const createOrder = async (
  accessToken?: string | null,
  restaurantId?: string,
  createOrderRequest?: {
    // Define your order request payload here
  }
): Promise<Order | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/orders`;
  try {
    const response: AxiosResponse<Order> = await axios.post(
      endpointUrl,
      createOrderRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Delete an order
export const deleteOrder = async (
  accessToken: string,
  restaurantId: string,
  orderId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/orders/${orderId}`;
  try {
    const response = await axios.delete(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 204) {
      return response.status;
    }
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Retrieve a single order
export const getOrder = async (
  accessToken: string,
  restaurantId: string,
  orderId: string
): Promise<Order | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/orders/${orderId}`;
  try {
    const response: AxiosResponse<Order> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Retrieve all orders
export const getAllOrders = async (
  accessToken: string | null,
  restaurantId: string
): Promise<Order[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/orders`;
  try {
    const response: AxiosResponse<Order[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Update an order
export const updateOrder = async (
  accessToken: string | null,
  restaurantId: string,
  orderId: string,
  updateOrderRequest: Order
): Promise<Order | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/orders/${orderId}`;
  try {
    const response = await axios.put(endpointUrl, updateOrderRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
