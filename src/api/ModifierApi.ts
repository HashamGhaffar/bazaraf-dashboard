import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Modifier, ModifierFormData } from "../type";

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

export const createModifier = async (
  accessToken?: string | null,
  restaurantId?: string,
  createModifierRequest?: {
    name: string;
    description: string;
    priceChange?: number | null;
    imageUrl?: string | null;
  }
): Promise<ModifierFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifiers`;
  try {
    const response: AxiosResponse<ModifierFormData> = await axios.post(
      endpointUrl,
      createModifierRequest,
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

export const deleteModifier = async (
  accessToken: string,
  restaurantId: string,
  modifierId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifiers/${modifierId}`;
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

export const getModifier = async (
  accessToken: string,
  restaurantId: string,
  modifierId: string
): Promise<ModifierFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifiers/${modifierId}`;
  try {
    const response: AxiosResponse<ModifierFormData> = await axios.get(
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

export const getAllModifiers = async (
  accessToken: string | null,
  restaurantId: string
): Promise<Modifier[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifiers`;
  try {
    const response: AxiosResponse<Modifier[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateModifier = async (
  accessToken: string | null,
  restaurantId: string,
  modifierId: string,
  updateModifierRequest: ModifierFormData
): Promise<ModifierFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/modifiers/${modifierId}`;
  try {
    const response = await axios.put(endpointUrl, updateModifierRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
