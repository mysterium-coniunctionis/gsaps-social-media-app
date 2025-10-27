import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  DynamicFeed as FeedIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

/**
 * Main navigation bar component
 * Displays app branding, navigation links, and user menu
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { toggleTheme, mode } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
    handleUserMenuClose();
    navigate('/login');
  };

  const handleProfile = () => {
    if (currentUser) {
      navigate(`/profile/${currentUser.username || currentUser.id}`);
      handleUserMenuClose();
    }
  };

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Feed', path: '/feed', icon: <FeedIcon />, protected: true },
    { label: 'Members', path: '/members', icon: <PeopleIcon />, protected: true },
    { label: 'Groups', path: '/groups', icon: <GroupsIcon />, protected: true },
    { label: 'Events', path: '/events', icon: <EventIcon /> },
    { label: 'Messages', path: '/messages', icon: <MessageIcon />, protected: true }
  ];

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* App Logo/Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => navigate('/')}
        >
          GSAPS
        </Typography>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box sx={{ ml: 4, display: 'flex', gap: 1 }}>
            {navItems
              .filter(item => !item.protected || currentUser)
              .map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle */}
        <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* User Menu or Login Button */}
        {currentUser ? (
          <>
            <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
              <Avatar
                alt={currentUser.name || currentUser.username}
                src={currentUser.avatar_url}
                sx={{ width: 32, height: 32 }}
              >
                {(currentUser.name || currentUser.username || 'U').charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
        >
          {navItems
            .filter(item => !item.protected || currentUser)
            .map((item) => (
              <MenuItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleMobileMenuClose();
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.icon}
                  {item.label}
                </Box>
              </MenuItem>
            ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
