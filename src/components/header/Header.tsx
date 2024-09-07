import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
  const [isShowMenu, setIsShowMenu] = useState(false);

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
  const handleCloseNavMenu = () => {
    setIsShowMenu(false);
  };

  const handleOpenNavMenu = () => {
    setIsShowMenu(true);
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
              <Box>
                <Tabs
                  value={currentTab}
                  onChange={onTabChange}
                  textColor="inherit"
                  sx={{
                    display: { xs: 'none', sm: 'none', md: 'flex' },
                    flexDirection: 'row',
                  }}
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
              </Box>
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
                  sx={{
                    textTransform: 'none',
                    display: { xs: 'none', sm: 'none', md: 'flex' },
                  }}
                  onClick={onLogout}
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
            {isLoggedIn && (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handleCloseNavMenu}
                  open={isShowMenu}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  <MenuItem>
                    <Tab label="Home" value="home" component={Link} to="/" />
                  </MenuItem>
                  <MenuItem>
                    <Tab
                      label="Favorite"
                      value="favorites"
                      component={Link}
                      to="/favourites"
                    />
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="text"
                      color="primary"
                      sx={{ textTransform: 'none' }}
                      onClick={onLogout}
                    >
                      Log out
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
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
