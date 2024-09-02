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
import { Link } from 'react-router-dom';
import SharePictureModal from '../Modal/SharePictureModal';

interface HeaderProps {
  currentTab: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleShare = (url: string, title: string) => {
    console.log('Shared Picture:', { url, title });
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
          {/* Left Section: Logo */}
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

            <Tabs value={currentTab} onChange={onTabChange} textColor="inherit">
              <Tab label="Home" value="home" component={Link} to="/" />
              <Tab
                label="Favorite"
                value="favorite"
                component={Link}
                to="/favourites"
              />
            </Tabs>
          </Box>

          {/* Right Section: Share Button and User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', marginRight: '16px' }}
              onClick={handleOpenModal}
            >
              Share Pic
            </Button>
            <Typography sx={{ marginRight: '16px' }}>Hi Neekey</Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <SharePictureModal
        open={modalOpen}
        onClose={handleCloseModal}
        onShare={handleShare}
      />
    </>
  );
};

export default Header;
