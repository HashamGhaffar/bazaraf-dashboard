import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Theme } from "../type";

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

export const createTheme = async (
  accessToken?: string | null,
  restaurantId?: string,
  createThemeRequest?: Theme
): Promise<Theme | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/themes`;
  try {
    const response: AxiosResponse<Theme> = await axios.post(
      endpointUrl,
      createThemeRequest,
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

export const deleteTheme = async (
  accessToken: string,
  restaurantId: string,
  themeId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/themes/${themeId}`;
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

export const getTheme = async (
  accessToken: string,
  restaurantId: string,
  themeId: string
): Promise<Theme | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantId}/themes/${themeId}`;
  try {
    const response: AxiosResponse<Theme> = await axios.get(endpointUrl);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getAllThemes = async (
  accessToken: string | null,
  restaurantId: string
): Promise<Theme[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantId}/themes`;
  try {
    const response: AxiosResponse<Theme[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateTheme = async (
  accessToken: string | null,
  restaurantId: string,
  themeId: string,
  updateThemeRequest: Theme
): Promise<Theme | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/themes/${themeId}`;
  try {
    const response = await axios.put(endpointUrl, updateThemeRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
