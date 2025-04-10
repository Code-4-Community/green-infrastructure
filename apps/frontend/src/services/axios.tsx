import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useAxios = () => {
  const { token } = useAuth();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    //withCredentials: true,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
  });

  return axiosInstance;
};

export default useAxios;
