import React, { useState, useEffect } from 'react';
import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge
} from '@mui/material';
import {
  Home as HomeIcon,
  Groups as GroupsIcon,
  Event as EventIcon,
  People as PeopleIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Bottom navigation component for mobile devices
 * Provides quick access to main app sections
 */
const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Sync active tab with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setValue(0);
    else if (path.startsWith('/members')) setValue(1);
    else if (path.startsWith('/groups')) setValue(2);
    else if (path.startsWith('/events')) setValue(3);
    else if (path.startsWith('/messages')) setValue(4);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch(newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/members');
        break;
      case 2:
        navigate('/groups');
        break;
      case 3:
        navigate('/events');
        break;
      case 4:
        navigate('/messages');
        break;
      default:
        break;
    }
  };

  return (
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
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Members"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          label="Groups"
          icon={<GroupsIcon />}
        />
        <BottomNavigationAction
          label="Events"
          icon={<EventIcon />}
        />
        <BottomNavigationAction
          label="Messages"
          icon={
            <Badge badgeContent={0} color="error">
              <MessageIcon />
            </Badge>
          }
        />
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
