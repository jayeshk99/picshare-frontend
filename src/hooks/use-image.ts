import apiClient from '../utils/axios';

export const getPosts = async () => {
  const { data } = await apiClient.get('post/all');
  return data;
};
