import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Message as MessageIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatShortRelativeTime } from '../utils/dateUtils';
import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '../api/backend';

/**
 * Messages page
 * Displays list of conversations
 */
const Messages = () => {
  const navigate = useNavigate();
  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages
  });
  const [displayedConversations, setDisplayedConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setDisplayedConversations(conversations);
    setFilteredConversations(conversations);
  }, [conversations]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = displayedConversations.filter(conv =>
        conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(displayedConversations);
    }
  }, [searchQuery, displayedConversations]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <Box sx={{
      height: 'calc(100vh - 64px)', // Full height minus navbar
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      {/* Header */}
      <Box sx={{
        p: 3,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Messages
            </Typography>
            {totalUnread > 0 && (
              <Chip
                label={`${totalUnread} unread`}
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Search Bar */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <TextField
          fullWidth
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          size="small"
        />
      </Box>

      {/* Conversations List */}
      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'background.paper' }}>
        {filteredConversations.length === 0 ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            p: 4
          }}>
            <MessageIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery
                ? 'Try adjusting your search query'
                : 'Start a conversation with a community member'}
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {filteredConversations.map((conversation) => (
              <ListItem
                key={conversation.id}
                button
                onClick={() => navigate(`/messages/${conversation.id}`)}
                sx={{
                  py: 2.5,
                  px: 3,
                  borderBottom: 1,
                  borderColor: 'divider',
                  bgcolor: conversation.unreadCount > 0 ? 'action.hover' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.selected'
                  }
                }}
                secondaryAction={
                  <Box sx={{ textAlign: 'right', mr: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      {formatShortRelativeTime(conversation.lastMessage.timestamp)}
                    </Typography>
                    {conversation.unreadCount > 0 && (
                      <Badge
                        badgeContent={conversation.unreadCount}
                        color="primary"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                }
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                    invisible={true} // TODO: Connect to online status
                  >
                    <Avatar
                      src={conversation.participant.avatar_url}
                      sx={{ width: 56, height: 56 }}
                    >
                      {conversation.participant.name.charAt(0)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  sx={{ ml: 2 }}
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: conversation.unreadCount > 0 ? 600 : 400
                      }}
                    >
                      {conversation.participant.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: conversation.unreadCount > 0 ? 500 : 400,
                        pr: 10
                      }}
                    >
                      {conversation.lastMessage.senderId === 1 ? 'You: ' : ''}
                      {conversation.lastMessage.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Messages;
