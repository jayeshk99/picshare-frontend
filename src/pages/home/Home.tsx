import { useEffect, useState } from 'react';
import { getPosts } from '../../services/userApis'; // Ensure this import is correct
import { IImageData } from '../../types/home';
import { Container, Grid } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';
import { addToFavorites, getFavorites } from '../../services/favourites';

const HomePage = () => {
  const [data, setData] = useState<IImageData[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState('home');

  const fetchData = async () => {
    try {
      const posts = await getPosts();
      const favorites = await getFavorites();
      setData(posts);
      setFavoriteIds(favorites.map((fav: any) => fav.post.id));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAddToFavourite = async (postId: string) => {
    try {
      await addToFavorites(postId);
      // Re-fetch favorites to update UI
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

  return (
    <div>
      <Header currentTab={currentTab} onTabChange={handleTabChange} />
      <Container
        style={{ marginTop: '6rem', marginBottom: '2rem', maxWidth: '80%' }}
      >
        <Grid container spacing={2}>
          {data.map((image) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <ImageCard
                image={image}
                isFavorite={favoriteIds.includes(image.id)}
                toggleFavorite={handleAddToFavourite}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
