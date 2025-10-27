import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import {
  FavoriteBorder as LikeIcon,
  Comment as CommentIcon,
  PersonAdd as FollowIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

/**
 * Individual notification item component
 * Displays different types of notifications with appropriate icons and actions
 */
const NotificationItem = ({ notification, onRead, onDelete }) => {
  const navigate = useNavigate();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <LikeIcon sx={{ color: '#f44336' }} />;
      case 'comment':
        return <CommentIcon sx={{ color: '#2196f3' }} />;
      case 'follow':
        return <FollowIcon sx={{ color: '#4caf50' }} />;
      case 'group_invite':
        return <GroupIcon sx={{ color: '#ff9800' }} />;
      case 'event_reminder':
        return <EventIcon sx={{ color: '#9c27b0' }} />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      onRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'like':
      case 'comment':
        if (notification.postId) {
          navigate(`/feed?post=${notification.postId}`);
        }
        break;
      case 'follow':
        if (notification.user?.username) {
          navigate(`/profile/${notification.user.username}`);
        }
        break;
      case 'group_invite':
        if (notification.groupId) {
          navigate(`/groups/${notification.groupId}`);
        }
        break;
      case 'event_reminder':
        if (notification.eventId) {
          navigate(`/events/${notification.eventId}`);
        }
        break;
      default:
        break;
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <ListItem
      sx={{
        bgcolor: notification.read ? 'transparent' : 'action.hover',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.selected',
        },
        transition: 'background-color 0.2s',
        position: 'relative',
      }}
      onClick={handleClick}
      secondaryAction={
        <IconButton edge="end" size="small" onClick={handleDelete}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={notification.user?.avatar_url}
            alt={notification.user?.name}
            sx={{ width: 40, height: 40 }}
          >
            {notification.user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              bgcolor: 'background.paper',
              borderRadius: '50%',
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getNotificationIcon(notification.type)}
          </Box>
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
            {notification.message}
          </Typography>
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default NotificationItem;
