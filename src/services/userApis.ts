import { LoginResponse } from '../types/user';
import apiClient from '../utils/axios';

export const getPosts = async () => {
  const { data } = await apiClient.get('post/all');
  return data;
};

export const login = async (userName: string) => {
  try {
    const response: any = await apiClient.post<LoginResponse>('user/login', {
      userName,
    });

    const { data, statusCode } = response;
    if (statusCode === 200 || statusCode === 201) {
      console.log('data:', data);
      localStorage.setItem('userId', data.userId); // Ensure local storage access is correct
      return data;
    }
    throw new Error('Failed to login');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
