import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const http = {
    post: axiosInstance.post,
    put: axiosInstance.put,
    get: axiosInstance.get,
    delete: axiosInstance.delete,
    patch: axiosInstance.patch,
};

export const setAuthTokenHeader = (token: string) => {
    axiosInstance.defaults.headers.common['x-auth-token'] = token;
};

export default http;