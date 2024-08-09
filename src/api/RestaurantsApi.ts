import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { RestaurantInterface, RestaurantUpdateInterface } from "../type/index";

const useRestaurantsApi = (accessToken: string) => {
  const handleError = (error: AxiosError) => {
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

  const restaurantsGetAllUserRestaurant = async (user: string) => {
    const endpointUrl = `${API_URL}/api/v1/users/${user}/restaurants`;

    try {
      const response = await axios.get(endpointUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  const restaurantsGetRestaurant = async (
    userId: string,
    restaurantId: string
  ) => {
    const endpointUrl = `${API_URL}/v1/users/${userId}/restaurants/${restaurantId}`;

    try {
      const response = await axios.get(endpointUrl);
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  const restaurantsCreateRestaurant = async (
    userId: string,
    createRestaurantRequest: RestaurantInterface
  ) => {
    const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants`;

    try {
      const response: AxiosResponse = await axios.post(
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

  const restaurantsUpdateRestaurant = async (
    userId: string,
    restaurantId: string,
    updateRestaurantRequest: RestaurantUpdateInterface
  ) => {
    const endpointUrl = `${API_URL}/api/v1/users/${userId}/restaurants/${restaurantId}`;

    try {
      const response = await axios.put(endpointUrl, updateRestaurantRequest, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  const restaurantsDeleteRestaurant = async (
    userId: string,
    restaurantId: string
  ) => {
    const endpointUrl = `${API_URL}/v1/users/${userId}/restaurants/${restaurantId}`;

    try {
      await axios.delete(endpointUrl);
    } catch (error) {
      handleError(error as AxiosError);
    }
  };

  return {
    restaurantsGetAllUserRestaurant,
    restaurantsGetRestaurant,
    restaurantsCreateRestaurant,
    restaurantsUpdateRestaurant,
    restaurantsDeleteRestaurant,
  };
};

export default useRestaurantsApi;
