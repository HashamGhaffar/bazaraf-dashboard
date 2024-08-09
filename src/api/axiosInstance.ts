import axios, { AxiosInstance } from "axios";

// Create an Axios instance with default settings
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://44.220.156.10:8065",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
