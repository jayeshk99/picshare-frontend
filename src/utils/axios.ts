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
    // const token = localStorage.getItem('token');
    // console.log('token:', token);
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page or show a login modal
    }
    return Promise.reject(error);
  }
);

export default apiClient;
