import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SharePictureModal from '../Modal/SharePictureModal';

interface HeaderProps {
  currentTab: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  modalCloseHandler: (isClosed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onLogout,
  isLoggedIn,
  modalCloseHandler,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'user';

  const handleOpenModal = () => {
    setModalOpen(true);
    modalCloseHandler(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    modalCloseHandler(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '22%',
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              PicShare
            </Typography>

            {isLoggedIn && (
              <Tabs
                value={currentTab}
                onChange={onTabChange}
                textColor="inherit"
              >
                <Tab
                  label="Home"
                  value="home"
                  component={Link}
                  to="/"
                  data-testid="homeTab"
                />
                <Tab
                  label="Favorite"
                  value="favorites"
                  component={Link}
                  to="/favourites"
                  data-testid="favoriteTab"
                />
              </Tabs>
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
                  Hi {userName}
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: 'none' }}
                  onClick={onLogout}
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
