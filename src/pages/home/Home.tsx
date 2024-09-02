import { useEffect, useState } from 'react';
import apiClient from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../../hooks/use-image';
import { IImageData } from '../../types/home';
import { Container, Grid } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';

const HomePage = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const [currentTab, setCurrentTab] = useState('home');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <Header currentTab={currentTab} onTabChange={handleTabChange} />
      <Container
        style={{ marginTop: '6rem', marginBottom: '2rem', maxWidth: '80%' }}
      >
        <Grid container spacing={2}>
          {!isLoading &&
            data.map((image: IImageData) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                <ImageCard image={image} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
