import { useEffect } from 'react';
import apiClient from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../hooks/use-image';
import { ImageCard } from '../../components';
import { IImageData } from '../../types/home';
import { Container, Grid } from '@mui/material';

const HomePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  console.log('data:', data);

  return (
    <Container
      maxWidth="xl"
      style={{ marginTop: '2rem', marginBottom: '2rem' }}
    >
      <Grid container spacing={2}>
        {!isLoading &&
          data.map((image: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <ImageCard image={image} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
