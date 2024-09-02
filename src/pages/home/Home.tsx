import { useEffect, useState } from 'react';
import { getPosts } from '../../services/userApis'; // Ensure this import is correct
import { IImageData } from '../../types/home';
import { Box, Container, Grid, Typography } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';
import { addToFavorites, getFavorites } from '../../services/favourites';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState<IImageData[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userName')
  );
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchData = async (includeFavorites = true) => {
    try {
      const posts: IImageData[] = await getPosts();

      setData(posts);
      if (includeFavorites && localStorage.getItem('userId')) {
        const favorites = await getFavorites();
        setFavoriteIds(favorites.map((fav: any) => fav.post.id));
      } else {
        setFavoriteIds([]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
    fetchData(false);
  };

  const handleAddToFavourite = async (postId: string) => {
    try {
      await addToFavorites(postId);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    } finally {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  const modalCloseHandler = (isClosed: boolean) => {
    setIsClosed(isClosed);
    navigate('/');
  };
  useEffect(() => {
    if (!isClosed) fetchData();
  }, [isClosed]);

  return (
    <div>
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        modalCloseHandler={modalCloseHandler}
      />
      <Container
        style={{ marginTop: '6rem', marginBottom: '2rem', maxWidth: '80%' }}
      >
        {!isLoggedIn && (
          <Box
            sx={{
              padding: '16px',
              backgroundColor: '#f5f5f5',
              textAlign: 'center',
              marginBottom: '1.5rem',
              borderRadius: '8px',
            }}
          >
            <Typography variant="body1">
              <Link to="/login" color="primary">
                login
              </Link>{' '}
              to start sharing your favourite pictures with others!
            </Typography>
          </Box>
        )}

        {data.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <Typography variant="h6" color="textSecondary">
              No posts are available at the moment. Please check back later, or
              start sharing your own pictures!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {data.map((image) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                <ImageCard
                  image={image}
                  isFavorite={favoriteIds.includes(image.id)}
                  toggleFavorite={handleAddToFavourite}
                  cardType="home"
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

export default HomePage;
