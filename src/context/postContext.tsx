import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getPosts } from '../services/userApis';
import { IImageData } from '../types/home';

interface User {
  userId: string;
  userName: string;
}
interface IPostContext {
  totalPages: number;
  postData: IImageData[];
  isLoading: boolean;
  fetchData: (page: number, limit: number, resetData?: boolean) => any;
  addToFavouriteState: (postId: string, userId: string) => void;
  error: string | null;
}

export const PostContext = createContext<IPostContext | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [postData, setPostData] = useState<IImageData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async (
    page: number = 1,
    limit: number = 12,
    resetData = false
  ) => {
    try {
      setIsLoading(true);
      const response = await getPosts(page, limit);
      // @ts-ignore
      setPostData((prevData) => {
        return resetData
          ? response.data
          : [
              ...prevData,
              // @ts-ignore
              ...response.data.filter(
                (newPost: IImageData) =>
                  !prevData.some((post) => post.id === newPost.id)
              ),
            ];
      });
      // @ts-ignore
      setTotalPages(response.totalPages || totalPages);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };
  const addToFavouriteState = async (postId: string, userId: string) => {
    try {
      const newData = postData.map((image) => {
        if (image.id === postId)
          return {
            ...image,
            favourites: [{ userId: userId || '', postId: image.id }],
          };
        return image;
      });
      setPostData(newData);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PostContext.Provider
      value={{
        fetchData,
        addToFavouriteState,
        isLoading,
        postData,
        totalPages,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = (): IPostContext => {
  const context = React.useContext(PostContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
