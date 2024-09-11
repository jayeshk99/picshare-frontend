import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ImageCard from '../../components/images/ImageCard';
import { getFavorites, removeFromFavorites } from '../../services/favourites';
import { IFavouriteData } from '../../types/home';
import { useAuth } from '../../context/authContext';

const FavouritesPage = () => {
  const [favorites, setFavorites] = useState<IFavouriteData[]>([]);
  const { user, isLoggedIn, logoutHandler, loginHandler } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favData = await getFavorites();
        const normalizedData = favData.map((fav: IFavouriteData) => ({
          ...fav,
        }));
        setFavorites(normalizedData);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favouriteId: string) => {
    try {
      await removeFromFavorites(favouriteId);
      setFavorites(favorites.filter((fav) => fav.id !== favouriteId));
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  };

  return (
    <div>
      <Container
        style={{ marginTop: '6rem', marginBottom: '2rem', maxWidth: '80%' }}
      >
        {favorites.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              You haven't added any pictures to your favorites yet. Start adding
              some!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {favorites.map((image) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                <ImageCard
                  image={{ ...image.post, user: image.user }}
                  isFavorite={true}
                  toggleFavorite={handleRemoveFavorite}
                  cardType="favourite"
                  favouriteId={image.id}
                  isLoggedIn={isLoggedIn}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default FavouritesPage;
