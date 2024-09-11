import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SharePictureModal from '../Modal/SharePictureModal';
import { useAuth } from '../../context/authContext';
import ResponsiveTabs from './Tabs';

const Header: React.FC = () => {
  const { user, isLoggedIn, logoutHandler } = useAuth();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentTab('home');
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    setCurrentTab('home');
    navigate('/');
    logoutHandler();
  };

  const handleOpenNavMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const tabs = [
    { label: 'Home', value: 'home', to: '/' },
    { label: 'Favorite', value: 'favorites', to: '/favourites' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          background: 'white',
          zIndex: 1,
          padding: '5px',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              PicShare
            </Typography>
            {isLoggedIn && (
              <ResponsiveTabs
                tabs={tabs}
                currentTab={currentTab}
                onTabChange={handleTabChange}
                isMobileMenuOpen={isMobileMenuOpen}
                handleOpenNavMenu={handleOpenNavMenu}
                handleCloseNavMenu={handleCloseNavMenu}
                logoutHandler={handleLogout}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none', marginRight: '16px' }}
                  onClick={handleOpenModal}
                  data-testid="sharePicBtn"
                >
                  Share Pic
                </Button>
                <Typography sx={{ marginRight: '16px' }}>
                  Hi {user?.userName}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    textTransform: 'none',
                    display: { xs: 'none', md: 'flex' },
                  }}
                  onClick={handleLogout}
                  data-testid="logout"
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none' }}
                onClick={handleLogin}
              >
                Log in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {modalOpen && isLoggedIn && (
        <SharePictureModal open={modalOpen} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Header;
