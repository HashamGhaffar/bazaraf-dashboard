import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { DeliveryLocationInterface } from "../type";

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

export const createDeliveryLocation = async (
  accessToken?: string | null,
  restaurantId?: string,
  createDeliveryLocationRequest?: {
    areaName: string;
    city: string;
    minimumOrder: number;
    deliveryFee: number;
    storeNextBy: string;
  }
): Promise<DeliveryLocationInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/deliveryLocations`;
  try {
    const response: AxiosResponse<DeliveryLocationInterface> = await axios.post(
      endpointUrl,
      createDeliveryLocationRequest,
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

export const deleteDeliveryLocation = async (
  accessToken: string,
  restaurantId: string,
  deliveryLocationId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/deliveryLocations/${deliveryLocationId}`;
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

export const getDeliveryLocation = async (
  accessToken: string,
  restaurantId: string,
  deliveryLocationId: string
): Promise<DeliveryLocationInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantId}/deliveryLocations/${deliveryLocationId}`;
  try {
    const response: AxiosResponse<DeliveryLocationInterface> = await axios.get(
      endpointUrl,
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

export const getAllDeliveryLocations = async (
  accessToken: string | null,
  restaurantId: string
): Promise<DeliveryLocationInterface[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantId}/deliveryLocations`;
  try {
    const response: AxiosResponse<DeliveryLocationInterface[]> =
      await axios.get(endpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateDeliveryLocation = async (
  accessToken: string | null,
  restaurantId: string,
  deliveryLocationId: string,
  updateDeliveryLocationRequest: DeliveryLocationInterface
): Promise<DeliveryLocationInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/deliveryLocations/${deliveryLocationId}`;
  try {
    const response = await axios.put(
      endpointUrl,
      updateDeliveryLocationRequest,
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
