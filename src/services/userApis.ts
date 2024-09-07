import { LoginResponse } from '../types/user';
import apiClient from '../utils/axios';

export const getPosts = async (page: number, limit: number) => {
  const data = await apiClient.get('post/all', { params: { page, limit } });
  return data;
};

export const login = async (userName: string) => {
  try {
    const response: any = await apiClient.post<LoginResponse>('user/login', {
      userName,
    });

    const { data, statusCode } = response;
    if (statusCode === 200 || statusCode === 201) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userName', data.userName);
      return data;
    }
    throw new Error('Failed to login');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// import { useEffect, useState } from 'react';
// import { getPosts } from '../../services/userApis'; // Ensure this import is correct
// import { IImageData } from '../../types/home';
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import Header from '../../components/header/Header';
// import ImageCard from '../../components/images/ImageCard';
// import { addToFavorites, getFavorites } from '../../services/favourites';
// import { Link, useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const [data, setData] = useState<IImageData[]>([]);
//   const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
//   const [currentTab, setCurrentTab] = useState('home');
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem('userName')
//   );
//   const [isClosed, setIsClosed] = useState<boolean>(true);
//   const [page, setPage] = useState(1); // Track the current page
//   const [totalPages, setTotalPages] = useState(1); // Track the total pages
//   const [loading, setLoading] = useState(false); // Track loading state
//   const navigate = useNavigate();

//   const fetchData = async (includeFavorites = true, page = 1) => {
//     try {
//       setLoading(true);
//       const { data: posts, totalPages: pages } = await getPosts(page); // Assuming API returns posts and totalPages

//       setData((prevData) => [...prevData, ...posts]); // Append new posts to existing data
//       setTotalPages(pages); // Set the total number of pages

//       if (includeFavorites && localStorage.getItem('userId')) {
//         const favorites = await getFavorites();
//         setFavoriteIds(favorites.map((fav: any) => fav.post.id));
//       } else {
//         setFavoriteIds([]);
//       }
//     } catch (error) {
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userName');
//     setIsLoggedIn(false);
//     navigate('/');
//     setData([]); // Clear the data on logout
//     setPage(1); // Reset page
//     fetchData(false, 1); // Fetch fresh data without favorites
//   };

//   const handleAddToFavourite = async (postId: string) => {
//     try {
//       await addToFavorites(postId);
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//     } finally {
//       fetchData(true, 1); // Refresh the data after adding to favorites
//     }
//   };

//   const loadMorePosts = () => {
//     if (page < totalPages && !loading) {
//       setPage((prevPage) => prevPage + 1); // Increment page count
//     }
//   };

//   // Detect if user scrolls to the bottom of the page
//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//         document.documentElement.offsetHeight ||
//       loading
//     ) {
//       return;
//     }
//     loadMorePosts();
//   };

//   useEffect(() => {
//     // Fetch data when the component mounts or the page changes
//     fetchData(true, page);
//   }, [page]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [loading]);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
//     setCurrentTab(newValue);
//   };

//   const modalCloseHandler = (isClosed: boolean) => {
//     setIsClosed(isClosed);
//     navigate('/');
//   };

//   return (
//     <div>
//       <Header
//         currentTab={currentTab}
//         onTabChange={handleTabChange}
//         onLogout={handleLogout}
//         isLoggedIn={isLoggedIn}
//         modalCloseHandler={modalCloseHandler}
//       />
//       <Container
//         style={{ marginTop: '6rem', marginBottom: '2rem', maxWidth: '80%' }}
//       >
//         {!isLoggedIn && (
//           <Box
//             sx={{
//               padding: '16px',
//               backgroundColor: '#f5f5f5',
//               textAlign: 'center',
//               marginBottom: '1.5rem',
//               borderRadius: '8px',
//             }}
//           >
//             <Typography variant="body1">
//               <Link to="/login" color="primary">
//                 login
//               </Link>{' '}
//               to start sharing your favourite pictures with others!
//             </Typography>
//           </Box>
//         )}

//         {data.length === 0 && !loading ? (
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '50vh',
//             }}
//           >
//             <Typography variant="h6" color="textSecondary">
//               No posts are available at the moment. Please check back later, or
//               start sharing your own pictures!
//             </Typography>
//           </Box>
//         ) : (
//           <Grid container spacing={2}>
//             {data.map((image) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
//                 <ImageCard
//                   image={image}
//                   isFavorite={favoriteIds.includes(image.id)}
//                   toggleFavorite={handleAddToFavourite}
//                   cardType="home"
//                   isLoggedIn={isLoggedIn}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         )}
//         {loading && (
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               margin: '1.5rem 0',
//             }}
//           >
//             <CircularProgress />
//           </Box>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default HomePage;
