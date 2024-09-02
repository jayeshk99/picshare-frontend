// src/utils/axiosInstance.js
import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: 'http://localhost:3002/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      config.headers.Authorization = `Bearer ${userId}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default apiClient;
