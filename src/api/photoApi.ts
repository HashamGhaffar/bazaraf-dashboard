import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../constants/config";

const handleError = (error: AxiosError): void => {
  if (error.response) {
    console.error("Error status:", error.response.status);
    console.error("Error data:", error.response.data);
  } else if (error.request) {
    console.error("Error request:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
};

export const photoUpload = async (
  file: any,
  accessToken: any
): Promise<any> => {
  const endpointUrl: string = `${API_URL}/api/v1/photos`;

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response: AxiosResponse = await axios.post(endpointUrl, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    handleError(error as AxiosError); // Ensure handleError is defined in the scope
  }
};
