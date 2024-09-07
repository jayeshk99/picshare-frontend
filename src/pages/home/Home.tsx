import { useCallback, useEffect, useState } from 'react';
import { getPosts } from '../../services/userApis';
import { IImageData } from '../../types/home';
import { Box, Container, Grid, Typography } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';
import { addToFavorites, getFavorites } from '../../services/favourites';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState<IImageData[]>([]);
  const [currentTab, setCurrentTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userName')
  );
  const userId = localStorage.getItem('userId');
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response: any = await getPosts(page, 12);

      setData((prevData) => [
        ...prevData,
        ...response.data.filter(
          (newPost: IImageData) =>
            !prevData.some((post) => post.id === newPost.id)
        ),
      ]);

      setTotalPages(response.totalPages || totalPages);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
    fetchData();
  };

  const handleAddToFavourite = async (postId: string) => {
    try {
      const newData = data.map((image) => {
        if (image.id === postId)
          return {
            ...image,
            favourites: [{ userId: userId || '', postId: image.id }],
          };
        return image;
      });
      setData(newData);
      await addToFavorites(postId);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const loadMorePosts = () => {
    if (page < totalPages && !loading) {
      setPage(page + 1);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200 &&
      !loading
    ) {
      loadMorePosts();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  useEffect(() => {
    if (!isClosed || !loading) {
      fetchData();
    }
  }, [page, isClosed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  const modalCloseHandler = (isClosed: boolean) => {
    setIsClosed(isClosed);
    if (!isClosed) setData([]);
    setPage(1);
    navigate('/');
  };

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
