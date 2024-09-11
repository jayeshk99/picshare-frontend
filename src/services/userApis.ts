import { IPostResponse } from '../types/home';
import { LoginResponse, UserData } from '../types/user';
import apiClient from '../utils/axios';

export const getPosts = async (page: number, limit: number) => {
  const data = await apiClient.get<IPostResponse>('post/all', {
    params: { page, limit },
  });
  return data;
};

export const login = async (userName: string) => {
  try {
    const response: any = await apiClient.post<LoginResponse>('user/login', {
      userName,
    });

    if (response) {
      const { data, statusCode } = response;
      if (statusCode === 200 || statusCode === 201) {
        return data;
      }
      throw new Error('Failed to login');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
