import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';
import { getFavorites, removeFromFavorites } from '../../services/favourites';
import { IFavouriteData } from '../../types/home';
import { useNavigate } from 'react-router-dom';

const FavouritesPage = () => {
  const [favorites, setFavorites] = useState<IFavouriteData[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('favorites');
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userName')
  );
  const [isClosed, setIsClosed] = useState<boolean>(true);

  const navigate = useNavigate();

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleRemoveFavorite = async (favouriteId: string) => {
    try {
      await removeFromFavorites(favouriteId);
      setFavorites(favorites.filter((fav) => fav.id !== favouriteId));
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
    setIsLoggedIn(false);
  };

  const modalCloseHandler = (isClosed: boolean) => {
    !isClosed && navigate('/');
  };
  return (
    <div>
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        modalCloseHandler={modalCloseHandler}
      />
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
