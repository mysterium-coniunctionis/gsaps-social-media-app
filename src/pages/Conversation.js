import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
  InputAdornment,
  Chip,
  Fade,
  Zoom,
  Tooltip
} from '@mui/material';
import {
  Send as SendIcon,
  ArrowBack as BackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  VideoCall as VideoIcon,
  AttachFile as AttachIcon,
  EmojiEmotions as EmojiIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { mockConversations, getMockConversationById, getMockMessages } from '../utils/mockConversations';
import { formatShortRelativeTime } from '../utils/dateUtils';

/**
 * Conversation page
 * Full-featured messaging interface with 3-column layout
 */
const Conversation = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConversationsList, setShowConversationsList] = useState(true);
  const [showProfileSidebar, setShowProfileSidebar] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Fetch conversations list and current conversation
    setTimeout(() => {
      const activeConv = getMockConversationById(conversationId);
      const mockMessages = getMockMessages(activeConv);

      setConversations(mockConversations);
      setConversation(activeConv);
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

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!conversation) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">Conversation not found</Typography>
        <Button onClick={() => navigate('/messages')} sx={{ mt: 2 }}>
          Back to Messages
        </Button>
      </Box>
    );
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        bgcolor: 'background.default'
      }}
    >
      {/* Left Sidebar - Conversations List */}
      <Fade in={showConversationsList} timeout={300}>
        <Box
          sx={{
            width: showConversationsList ? 320 : 0,
            minWidth: showConversationsList ? 280 : 0,
            maxWidth: 480,
            transition: 'width 0.3s ease',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {showConversationsList && (
            <>
              {/* Conversations Header */}
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    Messages
                  </Typography>
                  <IconButton size="small" onClick={() => setShowConversationsList(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              {/* Conversations List */}
              <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                {filteredConversations.map((conv) => (
                  <ListItem
                    key={conv.id}
                    button
                    selected={conv.id === parseInt(conversationId)}
                    onClick={() => navigate(`/messages/${conv.id}`)}
                    sx={{
                      py: 2,
                      px: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      bgcolor: conv.unreadCount > 0 ? 'action.hover' : 'transparent',
                      '&.Mui-selected': {
                        bgcolor: 'action.selected',
                        borderLeft: '3px solid',
                        borderLeftColor: 'primary.main'
                      },
                      '&:hover': {
                        bgcolor: 'action.selected'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={conv.unreadCount}
                        color="primary"
                      >
                        <Avatar src={conv.participant.avatar_url}>
                          {conv.participant.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: conv.unreadCount > 0 ? 700 : 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              flex: 1
                            }}
                          >
                            {conv.participant.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            {formatShortRelativeTime(conv.lastMessage.timestamp)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: conv.unreadCount > 0 ? 500 : 400
                          }}
                        >
                          {conv.lastMessage.senderId === 1 ? 'You: ' : ''}
                          {conv.lastMessage.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Fade>

      {/* Main Message Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0
        }}
      >
        {/* Message Header */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!showConversationsList && (
              <IconButton onClick={() => setShowConversationsList(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Avatar
              src={conversation.participant.avatar_url}
              sx={{ width: 40, height: 40 }}
            >
              {conversation.participant.name.charAt(0)}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {conversation.participant.name}
                </Typography>
                {conversation.participant.verified && (
                  <Chip label="Verified" size="small" color="primary" sx={{ height: 20 }} />
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                @{conversation.participant.username}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Voice call">
              <IconButton size="small">
                <PhoneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Video call">
              <IconButton size="small">
                <VideoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={showProfileSidebar ? 'Hide info' : 'Show info'}>
              <IconButton size="small" onClick={() => setShowProfileSidebar(!showProfileSidebar)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              onClick={() => navigate('/messages')}
            >
              <BackIcon />
            </IconButton>
          </Box>
        </Paper>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.03), transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.05), transparent 50%)'
          }}
        >
          {Object.entries(messageGroups).map(([date, dateMessages]) => (
            <Box key={date}>
              {/* Date Divider */}
              <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                <Divider sx={{ flex: 1 }} />
                <Chip
                  label={formatDateHeader(date)}
                  size="small"
                  sx={{
                    mx: 2,
                    bgcolor: 'background.paper',
                    fontWeight: 600
                  }}
                />
                <Divider sx={{ flex: 1 }} />
              </Box>

              {/* Messages for this date */}
              {dateMessages.map((message, index) => {
                const isOwnMessage = message.senderId === (currentUser?.id || 1);
                const showAvatar = !isOwnMessage;

                return (
                  <Zoom in={true} timeout={300} key={message.id}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                        mb: 2
                      }}
                    >
                      {showAvatar && (
                        <Avatar
                          src={conversation.participant.avatar_url}
                          sx={{ width: 36, height: 36, mr: 1.5, mt: 0.5 }}
                        >
                          {conversation.participant.name.charAt(0)}
                        </Avatar>
                      )}

                      <Box sx={{ maxWidth: '65%' }}>
                        <Paper
                          elevation={isOwnMessage ? 1 : 0}
                          sx={{
                            p: 1.5,
                            px: 2,
                            bgcolor: isOwnMessage ? 'primary.main' : 'background.paper',
                            color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
                            borderRadius: 3,
                            borderTopRightRadius: isOwnMessage ? 4 : 16,
                            borderTopLeftRadius: isOwnMessage ? 16 : 4,
                            borderBottomRightRadius: 16,
                            borderBottomLeftRadius: 16,
                            position: 'relative',
                            backdropFilter: isOwnMessage ? 'none' : 'blur(10px)',
                            border: isOwnMessage ? 'none' : '1px solid',
                            borderColor: 'divider',
                            boxShadow: isOwnMessage
                              ? '0 2px 8px rgba(0,0,0,0.15)'
                              : '0 1px 3px rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              boxShadow: isOwnMessage
                                ? '0 4px 12px rgba(0,0,0,0.2)'
                                : '0 2px 6px rgba(0,0,0,0.1)'
                            }
                          }}
                        >
                          <Typography variant="body1" sx={{ lineHeight: 1.6, wordBreak: 'break-word' }}>
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
                            px: 1,
                            fontSize: '0.7rem'
                          }}
                        >
                          {formatMessageTime(message.timestamp)}
                          {isOwnMessage && message.read && ' · Read'}
                        </Typography>
                      </Box>
                    </Box>
                  </Zoom>
                );
              })}
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        {/* Message Input */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1
            }}
          >
            <Tooltip title="Attach file">
              <IconButton size="small" sx={{ mb: 0.5 }}>
                <AttachIcon />
              </IconButton>
            </Tooltip>
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              variant="outlined"
              size="medium"
              multiline
              maxRows={4}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'background.default',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }
              }}
            />
            <Tooltip title="Add emoji">
              <IconButton size="small" sx={{ mb: 0.5 }}>
                <EmojiIcon />
              </IconButton>
            </Tooltip>
            <IconButton
              color="primary"
              type="submit"
              disabled={!newMessage.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                mb: 0.5,
                '&:hover': {
                  bgcolor: 'primary.dark'
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>

      {/* Right Sidebar - Participant Profile */}
      <Fade in={showProfileSidebar} timeout={300}>
        <Box
          sx={{
            width: showProfileSidebar ? 280 : 0,
            minWidth: showProfileSidebar ? 250 : 0,
            maxWidth: 400,
            transition: 'width 0.3s ease',
            borderLeft: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {showProfileSidebar && (
            <Box sx={{ p: 3 }}>
              {/* Close button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <IconButton size="small" onClick={() => setShowProfileSidebar(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Profile Photo */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  src={conversation.participant.avatar_url}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2, boxShadow: 3 }}
                >
                  {conversation.participant.name.charAt(0)}
                </Avatar>

                {/* Name & Verification */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {conversation.participant.name}
                  </Typography>
                  {conversation.participant.verified && (
                    <Chip label="Verified" size="small" color="primary" />
                  )}
                </Box>

                {/* Username */}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  @{conversation.participant.username}
                </Typography>

                {/* Credentials */}
                {conversation.participant.credentials && (
                  <Chip
                    label={conversation.participant.credentials}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Bio */}
              {conversation.participant.bio && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {conversation.participant.bio}
                  </Typography>
                </Box>
              )}

              {/* Location */}
              {conversation.participant.location && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Location
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {conversation.participant.location}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Quick Actions */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  onClick={() => navigate(`/profile/${conversation.participant.username}`)}
                >
                  View Profile
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PhoneIcon />}
                >
                  Voice Call
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VideoIcon />}
                >
                  Video Call
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Additional Info */}
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Contact
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                  <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {conversation.participant.username}@gsaps.org
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default Conversation;
