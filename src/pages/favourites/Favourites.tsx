import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';
import { getFavorites, removeFromFavorites } from '../../services/favourites';
import { IImageData } from '../../types/home';
// Adjust the import path

const FavouritesPage = () => {
  const [favorites, setFavorites] = useState<IImageData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('favourites');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favData = await getFavorites();
        const normalizedData = favData.map((fav: IImageData) => ({
          ...fav.post, // Spread the 'post' object which matches the IImageData shape
          user: fav.user, // Assuming the 'user' object structure is the same
        }));
        setFavorites(normalizedData);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleRemoveFavorite = async (postId: string) => {
    try {
      await removeFromFavorites(postId);
      setFavorites(favorites.filter((fav) => fav.post?.id !== postId));
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  };

  return (
    <div>
      <Header currentTab={currentTab} onTabChange={handleTabChange} />
      <Container
        style={{ marginTop: '6rem', marginBottom: '2rem', maxWidth: '80%' }}
      >
        <Grid container spacing={2}>
          {favorites.map((image) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <ImageCard
                image={image}
                isFavorite={true}
                toggleFavorite={handleRemoveFavorite}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FavouritesPage;
