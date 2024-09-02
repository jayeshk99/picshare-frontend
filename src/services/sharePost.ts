import apiClient from '../utils/axios';

export const sharePost = async (
  imageUrl: string,
  title: string
): Promise<void> => {
  const payload = {
    imageUrl,
    title,
  };
  await apiClient.post('post/share', payload);
};
