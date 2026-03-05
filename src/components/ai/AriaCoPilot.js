import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Drawer,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Fab,
  Zoom,
  useTheme,
  useMediaQuery,
  alpha,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Delete as DeleteIcon,
  Lightbulb as SuggestionIcon,
  Psychology as BrainIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { marked } from 'marked';
import { useAria } from '../../hooks/useAria';
import { fadeInUp, pulse, typingDot, scaleIn } from '../../theme/animations';

/**
 * TypingIndicator Component
 * Animated dots showing Aria is "thinking"
 */
const TypingIndicator = () => (
  <Box
    sx={{
      display: 'flex',
      gap: 0.5,
      padding: 2,
      alignItems: 'center',
    }}
  >
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          animation: `${typingDot} 1.4s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </Box>
);

/**
 * Message Component
 * Renders a single message with markdown support
 */
const Message = ({ message, isUser }) => {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    if (message.loading) {
      return <TypingIndicator />;
    }

    // Render markdown for AI messages
    if (!isUser) {
      const html = marked.parse(message.content);
      return (
        <Box
          sx={{
            '& p': { margin: '0.5em 0' },
            '& ul, & ol': { paddingLeft: 2, margin: '0.5em 0' },
            '& code': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              padding: '2px 6px',
              borderRadius: 1,
              fontFamily: 'monospace',
              fontSize: '0.9em',
            },
            '& pre': {
              bgcolor: alpha(theme.palette.background.paper, 0.5),
              padding: 2,
              borderRadius: 1,
              overflow: 'auto',
            },
            '& h1, & h2, & h3': {
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            '& strong': {
              color: theme.palette.primary.main,
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return <Typography>{message.content}</Typography>;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        animation: `${fadeInUp} 0.3s ease-out`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          maxWidth: '80%',
          flexDirection: isUser ? 'row-reverse' : 'row',
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: isUser ? 'secondary.main' : 'primary.main',
            background: isUser
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {isUser ? 'U' : <BrainIcon fontSize="small" />}
        </Avatar>

        <Paper
          elevation={0}
          sx={{
            padding: 2,
            bgcolor: isUser
              ? alpha(theme.palette.secondary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
            border: `1px solid ${alpha(
              isUser ? theme.palette.secondary.main : theme.palette.primary.main,
              0.2
            )}`,
            position: 'relative',
          }}
        >
          {renderContent()}

          {!isUser && !message.loading && (
            <Tooltip title={copied ? 'Copied!' : 'Copy response'}>
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  opacity: 0.6,
                  '&:hover': { opacity: 1 },
                }}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              opacity: 0.6,
              fontSize: '0.7rem',
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

/**
 * SuggestionChips Component
 * Quick action suggestions based on context
 */
const SuggestionChips = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mb: 2,
        animation: `${fadeInUp} 0.4s ease-out`,
      }}
    >
      {suggestions.map((suggestion, index) => (
        <Chip
          key={index}
          icon={<SuggestionIcon fontSize="small" />}
          label={suggestion}
          onClick={() => onSelect(suggestion)}
          sx={{
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 2,
            },
          }}
          variant="outlined"
          color="primary"
        />
      ))}
    </Box>
  );
};

/**
 * AriaCoPilot Component
 * Main AI Research Co-Pilot interface
 */
const AriaCoPilot = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    isOpen,
    conversationHistory,
    isVoiceActive,
    voiceSupported,
    close,
    sendMessage,
    clearHistory,
    startVoiceInput,
    stopVoiceInput,
    getSuggestions,
  } = useAria();

  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  // Load suggestions when opened
  useEffect(() => {
    if (isOpen && suggestions.length === 0) {
      loadSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMobile) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMobile]);

  const loadSuggestions = async () => {
    const newSuggestions = await getSuggestions();
    setSuggestions(newSuggestions);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setShowSuggestions(false);
    await sendMessage(input);
    setInput('');

    // Reload suggestions after response
    setTimeout(loadSuggestions, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    await sendMessage(suggestion);
    setInput('');
    setTimeout(loadSuggestions, 1000);
  };

  const handleVoiceToggle = () => {
    if (isVoiceActive) {
      stopVoiceInput();
    } else {
      startVoiceInput(
        (transcript) => {
          setInput(transcript);
          // Auto-send voice input
          setTimeout(() => {
            sendMessage(transcript);
            setInput('');
          }, 500);
        },
        (error) => {
          console.error('Voice error:', error);
        }
      );
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      clearHistory();
      setShowSuggestions(true);
      loadSuggestions();
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
          : 'linear-gradient(180deg, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 100%)',
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <AIIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Aria
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              AI Research Co-Pilot
            </Typography>
          </Box>
        </Box>

        <Box>
          <Tooltip title="Clear history">
            <IconButton onClick={handleClearHistory} sx={{ color: 'white' }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={close} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          '&::-webkit-scrollbar': {
            width: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            borderRadius: 4,
          },
        }}
      >
        {/* Welcome Message */}
        {conversationHistory.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              animation: `${scaleIn} 0.5s ease-out`,
            }}
          >
            <AIIcon
              sx={{
                fontSize: 64,
                color: 'primary.main',
                mb: 2,
                animation: `${pulse} 2s ease-in-out infinite`,
              }}
            />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Hello! I'm Aria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your AI research co-pilot. I can help you understand papers, explain concepts,
              and discover related research.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="text.secondary">
              Press <strong>Ctrl+K</strong> to summon me anytime
            </Typography>
          </Box>
        )}

        {/* Suggestions */}
        {showSuggestions && conversationHistory.length === 0 && (
          <SuggestionChips suggestions={suggestions} onSelect={handleSuggestionClick} />
        )}

        {/* Messages */}
        {conversationHistory.map((message) => (
          <Message
            key={message.id}
            message={message}
            isUser={message.type === 'user'}
          />
        ))}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 0,
          background: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about research..."
            variant="outlined"
            disabled={isVoiceActive}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />

          {voiceSupported && (
            <Tooltip title={isVoiceActive ? 'Stop recording' : 'Voice input'}>
              <IconButton
                onClick={handleVoiceToggle}
                color={isVoiceActive ? 'error' : 'default'}
                sx={{
                  animation: isVoiceActive ? `${pulse} 1s ease-in-out infinite` : 'none',
                }}
              >
                {isVoiceActive ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Send message">
            <IconButton
              onClick={handleSend}
              disabled={!input.trim() || isVoiceActive}
              color="primary"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7c8df0 0%, #8a5bb8 100%)',
                },
                '&.Mui-disabled': {
                  background: alpha(theme.palette.action.disabled, 0.12),
                  color: theme.palette.action.disabled,
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 1,
            textAlign: 'center',
            opacity: 0.6,
          }}
        >
          Shift+Enter for new line • Powered by Aria AI
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <>
      {/* Drawer for mobile, Paper for desktop */}
      {isMobile ? (
        <Drawer
          anchor="bottom"
          open={isOpen}
          onClose={close}
          sx={{
            '& .MuiDrawer-paper': {
              height: '90vh',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Zoom in={isOpen}>
          <Paper
            elevation={8}
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 24,
              width: 420,
              height: 600,
              borderRadius: 3,
              overflow: 'hidden',
              zIndex: 1300,
              background: alpha(theme.palette.background.paper, 0.98),
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {drawerContent}
          </Paper>
        </Zoom>
      )}
    </>
  );
};

/**
 * AriaFloatingButton Component
 * Floating action button to open Aria
 */
export const AriaFloatingButton = () => {
  const { isOpen, toggle } = useAria();
  const theme = useTheme();

  return (
    <Zoom in={!isOpen}>
      <Fab
        color="primary"
        aria-label="Open Aria AI Co-Pilot"
        onClick={toggle}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c8df0 0%, #8a5bb8 100%)',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s',
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
        }}
      >
        <AIIcon />
      </Fab>
    </Zoom>
  );
};

export default AriaCoPilot;
