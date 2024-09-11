import React from 'react';
import {
  Tabs,
  Tab,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface ResponsiveTabsProps {
  tabs: { label: string; value: string; to: string }[];
  currentTab: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  isMobileMenuOpen: boolean;
  handleOpenNavMenu: () => void;
  handleCloseNavMenu: () => void;
  logoutHandler: () => void;
}

const ResponsiveTabs: React.FC<ResponsiveTabsProps> = ({
  tabs,
  currentTab,
  onTabChange,
  isMobileMenuOpen,
  handleOpenNavMenu,
  handleCloseNavMenu,
  logoutHandler,
}) => {
  return (
    <>
      {/* Desktop Tabs */}
      <Tabs
        value={currentTab}
        onChange={onTabChange}
        textColor="inherit"
        sx={{
          display: { xs: 'none', sm: 'none', md: 'flex' },
          flexDirection: 'row',
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            component={Link}
            to={tab.to}
          />
        ))}
      </Tabs>

      {/* Mobile Menu */}
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={handleCloseNavMenu}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {tabs.map((tab) => (
            <MenuItem key={tab.value} onClick={handleCloseNavMenu}>
              <Tab
                label={tab.label}
                value={tab.value}
                component={Link}
                to={tab.to}
              />
            </MenuItem>
          ))}
          <MenuItem>
            <Button
              variant="text"
              color="primary"
              sx={{
                textTransform: 'none',
                display: { md: 'flex' },
              }}
              onClick={logoutHandler}
              data-testid="logout"
            >
              Log out
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default ResponsiveTabs;
