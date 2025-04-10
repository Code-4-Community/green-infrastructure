import axios from 'axios';
import { useAuth } from './AuthContext';

const useAxios = () => {
  const { token, logout } = useAuth();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
