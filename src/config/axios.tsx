import axios from "axios";
// import { APP_ROUTES, CONSTANTS } from "./Constants";
import { useNavigate } from "react-router-dom";

export const PublicAxiosInstance = axios.create({
  // baseURL: CONSTANTS?.BACKEND_URL_PUBLIC,
  baseURL: 'http://207.180.210.136:81/api/',
});

export const PrivateAxiosInstance = axios.create({
  // baseURL: CONSTANTS?.BACKEND_URL_PUBLIC,
  baseURL: 'http://207.180.210.136:81/api/',
});


const setupInterceptor = (axiosInstance: any, navigateL: any, user: any) => {
  // Request 
  axiosInstance.interceptors.request.use(
    (config: any) => {
      if (user ? user.token : '') {
        config.headers["Authorization"] = `Bearer ${user?.token}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );

  // Response
  axiosInstance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      if (error.response?.status === 401) {
        // localStorage.clear();
        // navigate(APP_ROUTES?.LOGIN);
      }
      return Promise.reject(error);
    }
  );

};

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const user: any = JSON.parse(localStorage.getItem("userInfo") || '{}');
  setupInterceptor(PrivateAxiosInstance, navigate, user);

};
