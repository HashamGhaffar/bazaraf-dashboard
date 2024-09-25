import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

async function makeRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance[method]<T>(url, body);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        `Request failed: ${error.response?.status} ${error.response?.statusText}`
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}

const get = <T>(url: string): Promise<ApiResponse<T>> =>
  makeRequest<T>("get", url);
const post = <T>(url: string, body: any): Promise<ApiResponse<T>> =>
  makeRequest<T>("post", url, body);
const put = <T>(url: string, body: any): Promise<ApiResponse<T>> =>
  makeRequest<T>("put", url, body);
const del = <T>(url: string): Promise<ApiResponse<T>> =>
  makeRequest<T>("delete", url);

export { get, post, put, del };
