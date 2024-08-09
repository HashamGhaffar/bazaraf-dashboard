import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Restaurant, RestaurantUpdateInterface } from "../type";

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

// Create Restaurant
export const createRestaurant = async (
  accessToken: string | null,
  userId: string,
  createRestaurantRequest: any
): Promise<RestaurantUpdateInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants`;
  try {
    const response: AxiosResponse<RestaurantUpdateInterface> = await axios.post(
      endpointUrl,
      createRestaurantRequest,
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

// Delete Restaurant
export const deleteRestaurant = async (
  accessToken: string,
  userId: string,
  restaurantId: string
): Promise<number | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants/${restaurantId}`;
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

// Retrieve Restaurant
export const getRestaurant = async (
  accessToken: any,
  userId: string,
  restaurantId: string
): Promise<RestaurantUpdateInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants/${restaurantId}`;
  try {
    const response: AxiosResponse<RestaurantUpdateInterface> = await axios.get(
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

// Retrieve User Restaurants
export const getUserRestaurants = async (
  accessToken: string | null,
  userId: string
): Promise<Restaurant[] | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants`;
  try {
    const response: AxiosResponse<Restaurant[]> = await axios.get(endpointUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Retrieve Restaurant by Name
export const getRestaurantByName = async (
  restaurantName: string
): Promise<RestaurantUpdateInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantName}`;
  try {
    const response: AxiosResponse<RestaurantUpdateInterface> = await axios.get(
      endpointUrl
    );
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Update Restaurant
export const updateRestaurant = async (
  accessToken: string | null,
  userId: string,
  restaurantId: string,
  updateRestaurantRequest: RestaurantUpdateInterface
): Promise<RestaurantUpdateInterface | undefined> => {
  const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants/${restaurantId}`;
  try {
    const response: AxiosResponse<RestaurantUpdateInterface> = await axios.put(
      endpointUrl,
      updateRestaurantRequest,
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
