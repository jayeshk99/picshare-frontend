import { useEffect, useState } from 'react';
import { getPosts } from '../../services/userApis';
import { IImageData } from '../../types/home';
import { Container, Grid } from '@mui/material';
import Header from '../../components/header/Header';
import ImageCard from '../../components/images/ImageCard';

const HomePage = () => {
  const [data, setData] = useState<IImageData[]>();

  useEffect(() => {
    let isIgnore = false;
    const dataHandler = async () => {
      try {
        const response = await getPosts();
        if (!isIgnore) setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    dataHandler();

    return () => {
      isIgnore = true;
    };
  }, []);

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
          {data &&
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
