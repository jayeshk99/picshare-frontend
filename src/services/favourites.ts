import apiClient from '../utils/axios';
export const addToFavorites = async (postId: string) => {
  try {
    const response = await apiClient.post('post/favourites/add', { postId });
    return response.data;
  } catch (error) {
    console.error('Add to Favorites Error:', error);
    throw error;
  }
};

export const getFavorites = async () => {
  try {
    const response = await apiClient.get('post/favourites');
    return response.data;
  } catch (error) {
    console.error('Get Favorites Error:', error);
    throw error;
  }
};

export const removeFromFavorites = async (favId: string): Promise<void> => {
  try {
    await apiClient.delete(`post/favourites/${favId}`);
    console.log('Successfully removed from favorites:', favId);
  } catch (error) {
    console.error('Failed to remove from favorites:', error);
    throw error;
  }
};
