import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  Divider,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Chip
} from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import NotificationItem from '../components/notifications/NotificationItem';
import { getMockNotifications } from '../data/mockNotifications';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setNotifications(getMockNotifications());
  }, []);

  const handleFilterChange = (_, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case 'unread':
        return notifications.filter(notification => !notification.read);
      case 'read':
        return notifications.filter(notification => notification.read);
      default:
        return notifications;
    }
  }, [filter, notifications]);

  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Notifications
          </Typography>
          <Typography color="text.secondary">
            Stay up to date with activity across your GSAPS network.
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="unread">Unread</ToggleButton>
              <ToggleButton value="read">Read</ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={`${notifications.filter(n => !n.read).length} unread`} color="error" variant="outlined" />
              <Button
                size="small"
                startIcon={<CheckIcon />}
                onClick={handleMarkAllAsRead}
                disabled={notifications.every(n => n.read)}
              >
                Mark all read
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          {filteredNotifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, px: 4 }}>
              <Typography variant="h6" gutterBottom>
                {filter === 'unread' ? 'You are all caught up!' : 'No notifications yet'}
              </Typography>
              <Typography color="text.secondary">
                {filter === 'unread'
                  ? 'We will let you know when something new happens.'
                  : 'Engage with the community to start receiving updates.'}
              </Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Showing {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
              <List sx={{ p: 0 }}>
                {filteredNotifications.map(notification => (
                  <React.Fragment key={notification.id}>
                    <NotificationItem
                      notification={notification}
                      onRead={handleMarkAsRead}
                      onDelete={handleDeleteNotification}
                    />
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
        </Paper>
      </Stack>
    </Box>
  );
};

export default Notifications;
