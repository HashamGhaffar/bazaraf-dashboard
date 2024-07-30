import axios, { AxiosResponse, AxiosError } from "axios";
import { API_URL } from "../constants/config";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}
interface AuthRequest {
  username: string;
  password: string;
}

const authLoginUser = async (
  authRequest: AuthRequest
): Promise<AuthResponse> => {
  const endpointUrl = `${API_URL}/api/v1/login`;
  console.log("authRequest");
  try {
    console.log("authRequest1111", authRequest);

    const response: AxiosResponse<AuthResponse> = await axios.post(
      endpointUrl,
      authRequest
    );
    console.log("authRequest222");

    console.log(response.data, "response.data");
    return response.data;
  } catch (error) {
    console.log(error, "error");
    throw handleError(error as AxiosError);
  }
};

const authRefreshToken = async (
  refreshToken: string | null
): Promise<AuthResponse> => {
  const endpointUrl = `${API_URL}/api/v1/refreshToken`;
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      endpointUrl,
      { refreshToken }
    );
    return response.data;
  } catch (error) {
    throw handleError(error as AxiosError);
  }
};

const authSignUp = async (
  createUserRequest: CreateUserRequest
): Promise<void> => {
  const endpointUrl = `${API_URL}/api/v1/signup`;
  try {
    await axios.post(endpointUrl, createUserRequest);
    // Handle successful response
    console.log("Sign up successful");
  } catch (error) {
    // Handle error
    handleError(error as AxiosError);
  }
};

const authVerifyUser = async (
  username: string,
  code: string
): Promise<void> => {
  const endpointUrl = `${API_URL}/api/v1/verify`;
  try {
    await axios.post(endpointUrl, { username, code });
    // Handle successful response
    console.log("User verified");
  } catch (error) {
    // Handle error
    handleError(error as AxiosError);
  }
};

const handleError = (error: AxiosError): void => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error("Error status:", error.response.status);
    console.error("Error data:", error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Error request:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error message:", error.message);
  }
  // Propagate the error
  throw error;
};

export { authLoginUser, authRefreshToken, authSignUp, authVerifyUser };
