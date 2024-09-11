import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ImageCard from '../../components/images/ImageCard';
import { addToFavorites } from '../../services/favourites';
import { Link, useNavigate } from 'react-router-dom';
import { usePost } from '../../context/postContext';
import { useAuth } from '../../context/authContext';

const HomePage = () => {
  const userId = localStorage.getItem('userId');
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  const {
    error,
    fetchData,
    addToFavouriteState,
    isLoading,
    postData,
    totalPages,
  } = usePost();
  const { user, isLoggedIn } = useAuth();

  const handleAddToFavourite = async (postId: string) => {
    try {
      addToFavouriteState(postId, user?.userId as string);
      await addToFavorites(postId);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const loadMorePosts = () => {
    if (page < totalPages && !isLoading) {
      setPage(page + 1);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200 &&
      !isLoading
    ) {
      loadMorePosts();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);
  useEffect(() => {
    if (!isClosed || !isLoading) {
      fetchData(page, 12);
    }
  }, [page, isClosed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);
  return (
    <div>
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

        {postData.length === 0 ? (
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
            {postData.map((image) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                <ImageCard
                  image={image}
                  isFavorite={image.favourites.some(
                    (data) => data.userId === userId
                  )}
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
