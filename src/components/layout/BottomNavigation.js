import React, { useState, useEffect } from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import {
  DynamicFeed as FeedIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  Message as MessageIcon,
  Mic as VoiceIcon,
  ViewInAr as VRIcon,
  Hub as NetworkIcon,
  MoreHoriz as MoreIcon,
  LibraryBooks as LibraryIcon,
  School as CoursesIcon,
  EmojiEvents as LeaderboardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Bottom navigation component for mobile devices
 * Provides quick access to main app sections including 2026 killer features
 */
const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState(null);

  // Sync active tab with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/feed' || path === '/') setValue(0);
    else if (path.startsWith('/voice-rooms')) setValue(1);
    else if (path.startsWith('/virtual-space')) setValue(2);
    else if (path.startsWith('/messages')) setValue(3);
    else setValue(4); // More menu for other routes
  }, [location]);

  const handleChange = (event, newValue) => {
    if (newValue === 4) {
      // Open "More" menu
      setMoreMenuAnchor(event.currentTarget);
      return;
    }

    setValue(newValue);

    switch(newValue) {
      case 0:
        navigate('/feed');
        break;
      case 1:
        navigate('/voice-rooms');
        break;
      case 2:
        navigate('/virtual-spaces');
        break;
      case 3:
        navigate('/messages');
        break;
      default:
        break;
    }
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleMoreNavigation = (path) => {
    navigate(path);
    handleMoreMenuClose();
  };

  const moreMenuItems = [
    { label: 'Network', path: '/network', icon: <NetworkIcon />, isNew: true },
    { label: 'Library', path: '/library', icon: <LibraryIcon /> },
    { label: 'Courses', path: '/courses', icon: <CoursesIcon /> },
    { label: 'Events', path: '/events', icon: <EventIcon /> },
    { label: 'Groups', path: '/groups', icon: <GroupsIcon /> },
    { label: 'Leaderboard', path: '/leaderboard', icon: <LeaderboardIcon /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon /> }
  ];

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: { xs: 'block', sm: 'none' },
          zIndex: (theme) => theme.zIndex.appBar
        }}
        elevation={3}
      >
        <MuiBottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction
            label="Feed"
            icon={<FeedIcon />}
          />
          <BottomNavigationAction
            label="Voice"
            icon={
              <Badge
                variant="dot"
                color="secondary"
                sx={{ '& .MuiBadge-badge': { top: 2, right: 2 } }}
              >
                <VoiceIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="3D"
            icon={
              <Badge
                variant="dot"
                color="secondary"
                sx={{ '& .MuiBadge-badge': { top: 2, right: 2 } }}
              >
                <VRIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="Messages"
            icon={
              <Badge badgeContent={0} color="error">
                <MessageIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="More"
            icon={<MoreIcon />}
          />
        </MuiBottomNavigation>
      </Paper>

      {/* More Menu */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          sx: {
            mb: 7,
            maxHeight: 350,
            width: 200
          }
        }}
      >
        {moreMenuItems.map((item, index) => (
          <MenuItem
            key={item.path}
            onClick={() => handleMoreNavigation(item.path)}
            sx={item.isNew ? {
              background: 'linear-gradient(45deg, rgba(156,39,176,0.1), rgba(33,150,243,0.1))'
            } : {}}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
            {item.isNew && (
              <Box
                component="span"
                sx={{
                  fontSize: '0.6rem',
                  bgcolor: 'secondary.main',
                  color: 'white',
                  px: 0.5,
                  py: 0.2,
                  borderRadius: 0.5,
                  ml: 1
                }}
              >
                NEW
              </Box>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BottomNavigation;
