import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Stack,
  Chip,
  Menu,
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';
import {
  Send as SendIcon,
  EmojiEmotions as EmojiIcon,
  Link as LinkIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

/**
 * ChatMessage - Individual chat message component
 */
const ChatMessage = ({ message, currentUserId, onReact }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOwnMessage = message.userId === currentUserId;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReact = (reactionType) => {
    onReact(message.id, reactionType);
    handleMenuClose();
  };

  const reactionEmojis = {
    heart: '❤️',
    thumbs_up: '👍',
    fire: '🔥',
    laugh: '😄',
    clap: '👏'
  };

  // Detect and linkify URLs
  const linkifyText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <Box
            key={index}
            component="a"
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              textDecoration: 'underline',
              '&:hover': {
                color: 'primary.light'
              }
            }}
          >
            {part}
          </Box>
        );
      }
      return part;
    });
  };

  // Detect and highlight @mentions
  const highlightMentions = (text) => {
    const mentionRegex = /(@\w+)/g;
    const parts = text.split(mentionRegex);

    return parts.map((part, index) => {
      if (part.match(mentionRegex)) {
        return (
          <Box
            key={index}
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              px: 0.5,
              py: 0.25,
              borderRadius: 0.5
            }}
          >
            {part}
          </Box>
        );
      }
      return linkifyText(part);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.paper, 0.05),
          '& .message-actions': {
            opacity: 1
          }
        }
      }}
    >
      <Avatar
        src={message.avatar}
        alt={message.username}
        sx={{ width: 32, height: 32, mt: 0.5 }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {message.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {format(new Date(message.timestamp), 'h:mm a')}
          </Typography>
          <IconButton
            className="message-actions"
            size="small"
            onClick={handleMenuOpen}
            sx={{
              ml: 'auto',
              opacity: 0,
              transition: 'opacity 0.2s ease'
            }}
          >
            <MoreIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          sx={{
            wordWrap: 'break-word',
            lineHeight: 1.5
          }}
        >
          {highlightMentions(message.message)}
        </Typography>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
            {message.reactions.map((reaction, index) => (
              <Chip
                key={index}
                label={`${reactionEmojis[reaction.type]} ${reaction.count}`}
                size="small"
                onClick={() => handleReact(reaction.type)}
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Message menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleReact('heart')}>❤️ React</MenuItem>
        <MenuItem onClick={() => handleReact('thumbs_up')}>👍 Like</MenuItem>
        <MenuItem onClick={() => handleReact('fire')}>🔥 Fire</MenuItem>
        <MenuItem onClick={() => handleReact('clap')}>👏 Applaud</MenuItem>
        {isOwnMessage && <MenuItem onClick={handleMenuClose}>Delete</MenuItem>}
      </Menu>
    </Box>
  );
};

/**
 * RoomChat - Side chat for voice rooms
 */
const RoomChat = ({ messages, currentUserId, onSendMessage }) => {
  const theme = useTheme();
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    onSendMessage({
      text: messageText,
      timestamp: new Date()
    });

    setMessageText('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const quickEmojis = ['👍', '❤️', '🔥', '👏', '🤔', '💯', '🙌', '✨'];

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji);
  };

  const handleReactToMessage = (messageId, reactionType) => {
    console.log('React to message:', messageId, reactionType);
    // In a real app, this would call an API
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Chat
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {messages.length} messages
          </Typography>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        ref={containerRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 1,
          '&::-webkit-scrollbar': {
            width: 8
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: alpha(theme.palette.background.paper, 0.1),
            borderRadius: 4
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: alpha(theme.palette.text.secondary, 0.2),
            borderRadius: 4,
            '&:hover': {
              bgcolor: alpha(theme.palette.text.secondary, 0.3)
            }
          }
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              color: 'text.secondary'
            }}
          >
            <Typography variant="body2">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0.5}>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUserId={currentUserId}
                onReact={handleReactToMessage}
              />
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        )}
      </Box>

      {/* Quick emoji reactions */}
      {showEmojiPicker && (
        <Box
          sx={{
            p: 1.5,
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          {quickEmojis.map((emoji, index) => (
            <Box
              key={index}
              onClick={() => handleEmojiClick(emoji)}
              sx={{
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: 0.5,
                borderRadius: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'scale(1.2)'
                }
              }}
            >
              {emoji}
            </Box>
          ))}
        </Box>
      )}

      {/* Input */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          bgcolor: alpha(theme.palette.background.paper, 0.2)
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  color={showEmojiPicker ? 'primary' : 'default'}
                >
                  <EmojiIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  color="primary"
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: alpha(theme.palette.background.paper, 0.6),
              borderRadius: 2
            }
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          Use @ to mention someone • Shift+Enter for new line
        </Typography>
      </Box>
    </Paper>
  );
};

export default RoomChat;
