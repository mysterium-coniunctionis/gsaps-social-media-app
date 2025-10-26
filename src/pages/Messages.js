import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
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

/**
 * Messages page
 * Displays list of conversations
 */
const Messages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Fetch conversations from API
    setTimeout(() => {
      const mockConversations = [
        {
          id: 1,
          participant: {
            id: 2,
            name: 'Alice Johnson',
            username: 'alice_researcher',
            avatar_url: ''
          },
          lastMessage: {
            text: 'Thanks for sharing that research paper! Really insightful.',
            timestamp: '2024-02-20T15:30:00',
            senderId: 2,
            read: false
          },
          unreadCount: 2
        },
        {
          id: 2,
          participant: {
            id: 3,
            name: 'Bob Williams',
            username: 'bob_neuroscience',
            avatar_url: ''
          },
          lastMessage: {
            text: 'Are you attending the symposium next month?',
            timestamp: '2024-02-20T10:15:00',
            senderId: 3,
            read: true
          },
          unreadCount: 0
        },
        {
          id: 3,
          participant: {
            id: 4,
            name: 'Carol Davis',
            username: 'carol_therapist',
            avatar_url: ''
          },
          lastMessage: {
            text: "I'd love to collaborate on that project!",
            timestamp: '2024-02-19T16:45:00',
            senderId: 1,
            read: true
          },
          unreadCount: 0
        },
        {
          id: 4,
          participant: {
            id: 5,
            name: 'David Martinez',
            username: 'david_student',
            avatar_url: ''
          },
          lastMessage: {
            text: 'Great meeting you at the conference!',
            timestamp: '2024-02-18T14:20:00',
            senderId: 5,
            read: false
          },
          unreadCount: 1
        }
      ];
      setConversations(mockConversations);
      setFilteredConversations(mockConversations);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = conversations.filter(conv =>
        conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchQuery, conversations]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Messages
          </Typography>
          {totalUnread > 0 && (
            <Chip
              label={`${totalUnread} unread`}
              color="primary"
              size="small"
            />
          )}
        </Box>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Search Bar */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
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
            />
          </Box>

          {/* Conversations List */}
          {filteredConversations.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <MessageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
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
                    py: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: conversation.unreadCount > 0 ? 'action.hover' : 'transparent',
                    '&:hover': {
                      bgcolor: 'action.selected'
                    }
                  }}
                  secondaryAction={
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        {formatTimestamp(conversation.lastMessage.timestamp)}
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
                      <Avatar src={conversation.participant.avatar_url}>
                        {conversation.participant.name.charAt(0)}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
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
                          pr: 8
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Messages;
