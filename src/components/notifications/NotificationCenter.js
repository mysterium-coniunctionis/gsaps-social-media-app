import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  List,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NotificationItem from './NotificationItem';
import { badgePulse } from '../../theme/animations';
import { getMockNotifications } from '../../data/mockNotifications';

/**
 * Notification Center component
 * Displays notification bell with badge and dropdown menu
 */
const NotificationCenter = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - will be replaced with real API
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      setNotifications(getMockNotifications());
      setLoading(false);
    }, 500);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notif => notif.id !== notificationId)
    );
  };

  const handleViewAll = () => {
    handleClose();
    navigate('/notifications');
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        sx={{ mr: 1 }}
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              animation: unreadCount > 0 ? `${badgePulse} 2s infinite` : 'none',
            }
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 380,
            maxHeight: 500,
            mt: 1.5,
          }
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              startIcon={<CheckIcon />}
              onClick={handleMarkAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </Box>

        <Divider />

        {/* Notifications List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              No notifications yet
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleMarkAsRead}
                onDelete={handleDeleteNotification}
              />
            ))}
          </List>
        )}

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Button
                fullWidth
                onClick={handleViewAll}
              >
                See all notifications
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotificationCenter;
