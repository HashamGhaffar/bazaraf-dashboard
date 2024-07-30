import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Table } from "../type";

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

export const createTable = async (
  accessToken?: string | null,
  restaurantId?: string,
  createTableRequest?: {
    tableNumber: string;
    seatCapacity: number;
    isReserved: boolean;
  }
): Promise<Table | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/tables`;
  try {
    const response: AxiosResponse<Table> = await axios.post(
      endpointUrl,
      createTableRequest,
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

export const deleteTable = async (
  accessToken: string,
  restaurantId: string,
  tableId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/tables/${tableId}`;
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

export const getTable = async (
  accessToken: string,
  restaurantId: string,
  tableId: string
): Promise<Table | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/tables/${tableId}`;
  try {
    const response: AxiosResponse<Table> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getAllTables = async (
  accessToken: string | null,
  restaurantId: string
): Promise<Table[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/tables`;
  try {
    const response: AxiosResponse<Table[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateTable = async (
  accessToken: string | null,
  restaurantId: string,
  tableId: string,
  updateTableRequest: Table
): Promise<Table | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/tables/${tableId}`;
  try {
    const response = await axios.put(endpointUrl, updateTableRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
