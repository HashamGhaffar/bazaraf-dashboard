import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { ModifierList, ModifierListFormData } from "../type";

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

export const createModifierList = async (
  accessToken?: string | null,
  restaurantId?: string,
  createModifierListRequest?: ModifierListFormData
): Promise<ModifierListFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifierList`;
  try {
    const response: AxiosResponse<ModifierListFormData> = await axios.post(
      endpointUrl,
      createModifierListRequest,
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

export const deleteModifierList = async (
  accessToken: string,
  restaurantId: string,
  modifierListId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifierList/${modifierListId}`;
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

export const getModifierList = async (
  accessToken: string,
  restaurantId: string,
  modifierListId: string
): Promise<ModifierListFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifierList/${modifierListId}`;
  try {
    const response: AxiosResponse<ModifierListFormData> = await axios.get(
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

export const getAllModifierLists = async (
  accessToken: string | null,
  restaurantId: string
): Promise<ModifierList[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifierList`;
  try {
    const response: AxiosResponse<ModifierList[]> = await axios.get(
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

export const updateModifierList = async (
  accessToken: string | null,
  restaurantId: string,
  modifierListId: string,
  updateModifierListRequest: ModifierListFormData
): Promise<ModifierListFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifierList/${modifierListId}`;
  try {
    const response = await axios.put(endpointUrl, updateModifierListRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error", error);
    handleError(error as AxiosError);
  }
};
