import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Item, ItemFormData } from "../type";

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

export const createItem = async (
  accessToken?: string | null,
  restaurantId?: string,
  createItemRequest?: any
): Promise<ItemFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/items`;
  try {
    const response: AxiosResponse<ItemFormData> = await axios.post(
      endpointUrl,
      createItemRequest,
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

export const deleteItem = async (
  accessToken: string,
  restaurantId: string,
  itemId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/items/${itemId}`;
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

export const getItem = async (
  accessToken: string,
  restaurantId: string,
  itemId: string
): Promise<ItemFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/items/${itemId}`;
  try {
    const response: AxiosResponse<ItemFormData> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getAllItems = async (
  accessToken: string | null,
  restaurantId: string
): Promise<Item[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/items`;

  try {
    const response: AxiosResponse<Item[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateItem = async (
  accessToken: string | null,
  restaurantId: string,
  itemId: string,
  updateItemRequest: any
): Promise<ItemFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/items/${itemId}`;
  try {
    const response = await axios.put(endpointUrl, updateItemRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
