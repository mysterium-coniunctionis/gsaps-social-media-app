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
  useMediaQuery,
  Chip,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  DynamicFeed as FeedIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  LibraryBooks as LibraryIcon,
  Science,
  School as CoursesIcon,
  EmojiEvents as LeaderboardIcon,
  CoPresent,
  Security as SecurityIcon,
  Brightness4,
  Brightness7,
  Favorite as CirclesIcon,
  MenuBook as PrepIcon,
  Explore as CareerIcon,
  Mic as VoiceIcon,
  ViewInAr as VRIcon,
  Hub as NetworkIcon,
  AutoAwesome as NewIcon
} from '@mui/icons-material';
import { CreditCard as CreditCardIcon, Analytics as AnalyticsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';
import NotificationCenter from '../notifications/NotificationCenter';
import AccessibilityMenu from '../accessibility/AccessibilityMenu';

/**
 * Main navigation bar component
 * Displays app branding, navigation links, and user menu
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { toggleTheme, mode, colorMode } = useCustomTheme();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleThemeToggle = toggleTheme || colorMode?.toggleColorMode || (() => {});

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
    // 2026 Killer Features - Prominent placement
    { label: 'Voice Rooms', path: '/voice-rooms', icon: <VoiceIcon />, protected: true, isNew: true },
    { label: '3D Spaces', path: '/virtual-spaces', icon: <VRIcon />, protected: true, isNew: true },
    { label: 'Network', path: '/network', icon: <NetworkIcon />, protected: true, isNew: true },
    // Community & Learning
    { label: 'Circles', path: '/circles', icon: <CirclesIcon /> },
    { label: 'Library', path: '/library', icon: <LibraryIcon /> },
    { label: 'Courses', path: '/courses', icon: <CoursesIcon /> },
    { label: 'Events', path: '/events', icon: <EventIcon /> },
    { label: 'Leaderboard', path: '/leaderboard', icon: <LeaderboardIcon /> },
    currentUser && ['administrator', 'moderator'].includes(currentUser.role)
      ? { label: 'Admin', path: '/admin/moderation', icon: <SecurityIcon />, protected: true }
      : null
  ].filter(Boolean);

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
                <Badge
                  key={item.path}
                  badgeContent={item.isNew ? "NEW" : null}
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.6rem',
                      height: '14px',
                      minWidth: '28px',
                      right: -8,
                      top: 4
                    }
                  }}
                >
                  <Button
                    color="inherit"
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                    aria-label={`Go to ${item.label}`}
                    sx={item.isNew ? {
                      background: 'linear-gradient(45deg, rgba(156,39,176,0.15), rgba(33,150,243,0.15))',
                      '&:hover': {
                        background: 'linear-gradient(45deg, rgba(156,39,176,0.25), rgba(33,150,243,0.25))'
                      }
                    } : {}}
                  >
                    {item.label}
                  </Button>
                </Badge>
              ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <AccessibilityMenu />

        {/* Theme Toggle */}
        <IconButton
          color="inherit"
          onClick={toggleTheme}
          sx={{ mr: 1 }}
          aria-label={`Activate ${mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {/* Notification Center (only for logged-in users) */}
        {currentUser && <NotificationCenter />}

        {/* User Menu or Login Button */}
        {currentUser ? (
          <>
            <IconButton
              onClick={handleUserMenuOpen}
              sx={{ p: 0 }}
              aria-label="Open user menu"
            >
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
              <MenuItem onClick={() => { navigate('/settings'); handleUserMenuClose(); }}>Settings</MenuItem>
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
                sx={item.isNew ? {
                  background: 'linear-gradient(45deg, rgba(156,39,176,0.1), rgba(33,150,243,0.1))'
                } : {}}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                  {item.icon}
                  {item.label}
                  {item.isNew && (
                    <Chip
                      label="NEW"
                      size="small"
                      color="secondary"
                      sx={{ ml: 'auto', height: 18, fontSize: '0.65rem' }}
                    />
                  )}
                </Box>
              </MenuItem>
            ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
