import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  Grid,
  Button
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as BackIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Conversation page
 * Displays message thread with a specific user
 */
const Conversation = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // TODO: Fetch conversation and messages from API
    setTimeout(() => {
      const mockConversation = {
        id: parseInt(conversationId),
        participant: {
          id: 2,
          name: 'Alice Johnson',
          username: 'alice_researcher',
          avatar_url: ''
        }
      };

      const mockMessages = [
        {
          id: 1,
          senderId: 2,
          text: 'Hi! I saw your post about the new psilocybin research. Really interesting!',
          timestamp: '2024-02-20T14:30:00',
          read: true
        },
        {
          id: 2,
          senderId: 1,
          text: 'Thanks! I thought the methodology was particularly innovative.',
          timestamp: '2024-02-20T14:32:00',
          read: true
        },
        {
          id: 3,
          senderId: 2,
          text: 'Absolutely. Have you seen the follow-up study they published?',
          timestamp: '2024-02-20T14:35:00',
          read: true
        },
        {
          id: 4,
          senderId: 1,
          text: 'Not yet! Do you have a link?',
          timestamp: '2024-02-20T14:36:00',
          read: true
        },
        {
          id: 5,
          senderId: 2,
          text: 'Sure, let me find it for you. It was published in Nature last month.',
          timestamp: '2024-02-20T14:38:00',
          read: true
        },
        {
          id: 6,
          senderId: 2,
          text: 'Thanks for sharing that research paper! Really insightful.',
          timestamp: '2024-02-20T15:30:00',
          read: false
        }
      ];

      setConversation(mockConversation);
      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    // TODO: Send message via API
    const message = {
      id: messages.length + 1,
      senderId: currentUser?.id || 1,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};

    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!conversation) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">Conversation not found</Typography>
      </Box>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Box sx={{ py: 3, height: 'calc(100vh - 200px)' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Main Conversation Area */}
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Conversation Header */}
          <Card sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <IconButton
                edge="start"
                onClick={() => navigate('/messages')}
                sx={{ mr: 2 }}
              >
                <BackIcon />
              </IconButton>

              <Avatar
                src={conversation.participant.avatar_url}
                sx={{ mr: 2 }}
              >
                {conversation.participant.name.charAt(0)}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">
                  {conversation.participant.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  @{conversation.participant.username}
                </Typography>
              </Box>

              <IconButton>
                <MoreIcon />
              </IconButton>
            </Box>
          </Card>

          {/* Messages Area */}
          <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {Object.entries(messageGroups).map(([date, dateMessages]) => (
            <Box key={date}>
              {/* Date Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography
                  variant="caption"
                  sx={{
                    mx: 2,
                    px: 2,
                    py: 0.5,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    color: 'text.secondary'
                  }}
                >
                  {formatDateHeader(date)}
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>

              {/* Messages for this date */}
              {dateMessages.map((message, index) => {
                const isOwnMessage = message.senderId === (currentUser?.id || 1);
                const showAvatar = !isOwnMessage;

                return (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    {showAvatar && (
                      <Avatar
                        src={conversation.participant.avatar_url}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      >
                        {conversation.participant.name.charAt(0)}
                      </Avatar>
                    )}

                    <Box sx={{ maxWidth: '70%' }}>
                      <Paper
                        sx={{
                          p: 1.5,
                          bgcolor: isOwnMessage ? 'primary.main' : 'background.default',
                          color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
                          borderRadius: 2,
                          borderTopRightRadius: isOwnMessage ? 0 : 2,
                          borderTopLeftRadius: isOwnMessage ? 2 : 0
                        }}
                      >
                        <Typography variant="body1">
                          {message.text}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          textAlign: isOwnMessage ? 'right' : 'left',
                          px: 1
                        }}
                      >
                        {formatMessageTime(message.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Divider />
        <Box
          component="form"
          onSubmit={handleSendMessage}
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            size="small"
            multiline
            maxRows={4}
          />
          <IconButton
            color="primary"
            type="submit"
            disabled={!newMessage.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Card>
        </Grid>

        {/* Right Sidebar - Participant Profile */}
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Card sx={{ position: 'sticky', top: 16 }}>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              {/* Profile Photo */}
              <Avatar
                src={conversation.participant.avatar_url}
                sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
              >
                {conversation.participant.name.charAt(0)}
              </Avatar>

              {/* Name */}
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {conversation.participant.name}
              </Typography>

              {/* Username */}
              <Typography variant="body2" color="text.secondary" paragraph>
                @{conversation.participant.username}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Basic Info */}
              <Box sx={{ textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    Member
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" noWrap>
                    {conversation.participant.username}@gsaps.org
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Actions */}
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(`/profile/${conversation.participant.username}`)}
                sx={{ mb: 1 }}
              >
                View Profile
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Conversation;
