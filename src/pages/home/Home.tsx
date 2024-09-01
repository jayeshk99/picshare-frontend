import { useEffect } from 'react';
import apiClient from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../hooks/use-image';

export const HomePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return <div></div>;
};
