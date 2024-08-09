import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";
import { Discount } from "../type";

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

export const createDiscount = async (
    accessToken?: string | null,
    restaurantId?: string,
    createDiscountRequest?: Discount 
): Promise<Discount | undefined> => {
    const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/discounts`;
    try {
        const response: AxiosResponse<Discount> = await axios.post(
            endpointUrl,
            createDiscountRequest,
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

export const deleteDiscount = async (
    accessToken: string,
    restaurantId: string,
    discountId: string
): Promise<number | undefined> => {
    const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/discounts/${discountId}`;
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

export const getDiscount = async (
    accessToken: string,
    restaurantId: string,
    discountId: string
): Promise<Discount | undefined> => {
    const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantId}/discounts/${discountId}`;
    try {
        const response: AxiosResponse<Discount> = await axios.get(endpointUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const getAllDiscount = async (
    accessToken: string | null,
    restaurantId: string
): Promise<Discount[] | undefined> => {
    const endpointUrl = `${API_URL}/api/v1/public/restaurants/${restaurantId}/discounts`;
    try {
        const response: AxiosResponse<Discount[]> = await axios.get(endpointUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error as AxiosError);
    }
};

export const updateDiscount = async (
    accessToken: string | null,
    restaurantId: string,
    discountId: string,
    updateDiscountRequest: Discount 
): Promise<Discount | undefined> => {
    const endpointUrl = `${API_URL}/api/v1/restaurants/${restaurantId}/discounts/${discountId}`;
    try {
        const response = await axios.put(endpointUrl, updateDiscountRequest, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error as AxiosError);
    }
};
