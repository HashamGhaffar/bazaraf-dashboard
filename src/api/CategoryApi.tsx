import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Category, CategoryFormData } from "../type";

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

export const createCategory = async (
  accessToken?: string | null,
  restaurantId?: string,
  createCategoryRequest?: {
    name: string;
    description: string;
    imageUrl?: string;
  }
): Promise<CategoryFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/categories`;
  try {
    const response: AxiosResponse<CategoryFormData> = await axios.post(
      endpointUrl,
      createCategoryRequest,
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

export const categoriesDeleteCategory = async (
  accessToken: string,
  restaurantId: string,
  categoryId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/categories/${categoryId}`;
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

export const getCategory = async (
  accessToken: string,
  restaurantId: string,
  categoryId: string
): Promise<CategoryFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/categories/${categoryId}`;
  try {
    const response: AxiosResponse<CategoryFormData> = await axios.get(
      endpointUrl
    );
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const getAllCategories = async (
  accessToken: string | null,
  restaurantId: string
): Promise<Category[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/categories`;
  try {
    const response: AxiosResponse<Category[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateCategory = async (
  accessToken: string | null,
  restaurantId: string,
  categoryId: string,
  updateCategoryRequest: CategoryFormData
): Promise<CategoryFormData | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/categories/${categoryId}`;
  try {
    const response = await axios.put(endpointUrl, updateCategoryRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};
