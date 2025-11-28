import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  alpha,
  useTheme,
  Fab,
  Drawer,
  CircularProgress
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as AIIcon,
  Close as CloseIcon,
  QuestionAnswer as ChatIcon,
  Lightbulb as SuggestionIcon,
  School as CourseIcon
} from '@mui/icons-material';
import { fadeInUp } from '../../theme/animations';

/**
 * AI Course Assistant
 * Provides intelligent Q&A for course content, explains concepts,
 * and suggests related resources.
 */

// Simulated AI responses (replace with actual API integration)
const getAIResponse = async (question, courseContext) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Mock responses based on keywords
  const responses = {
    default: "I'm here to help you understand the course material better. Could you tell me more specifically what you'd like to know?",
    mechanism: "Psychedelics primarily work by binding to serotonin 2A receptors (5-HT2A) in the brain, particularly in the prefrontal cortex. This leads to increased neural connectivity, reduced activity in the Default Mode Network (DMN), and enhanced neuroplasticity. Would you like me to explain any of these concepts in more detail?",
    therapy: "Psychedelic-assisted therapy typically follows a three-phase model: 1) Preparation sessions to build rapport and set intentions, 2) The dosing session itself with therapeutic support, and 3) Integration sessions to process and apply insights. Each phase is crucial for therapeutic outcomes.",
    safety: "Key safety considerations include: medical screening for contraindications, psychological preparation, appropriate set and setting, trained facilitator support, and integration support afterward. The most common contraindications include personal/family history of psychosis and certain cardiac conditions.",
    integration: "Integration is the process of making meaning from and applying insights gained during psychedelic experiences to daily life. Key practices include journaling, therapy, bodywork, mindfulness, community support, and gradual lifestyle changes aligned with new insights."
  };
  
  const questionLower = question.toLowerCase();
  if (questionLower.includes('mechanism') || questionLower.includes('how do') || questionLower.includes('brain')) {
    return responses.mechanism;
  } else if (questionLower.includes('therapy') || questionLower.includes('session') || questionLower.includes('treatment')) {
    return responses.therapy;
  } else if (questionLower.includes('safety') || questionLower.includes('risk') || questionLower.includes('contraindication')) {
    return responses.safety;
  } else if (questionLower.includes('integration') || questionLower.includes('after') || questionLower.includes('insight')) {
    return responses.integration;
  }
  return responses.default;
};

const suggestedQuestions = [
  "How do psychedelics work in the brain?",
  "What are the key phases of psychedelic therapy?",
  "What safety considerations are important?",
  "How does integration work after a session?"
];

const AICourseAssistant = ({ course, isOpen, onClose }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm your AI assistant for "${course?.title || 'this course'}". I can help explain concepts, answer questions about the material, and suggest related resources. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(input, course);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (question) => {
    setInput(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100%'
        }
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AIIcon />
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              AI Course Assistant
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Powered by AI
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }} aria-label="Close AI assistant">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              animation: `${fadeInUp} 0.3s ease-out`
            }}
          >
            {message.type === 'ai' && (
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 32,
                  height: 32,
                  mr: 1
                }}
              >
                <AIIcon fontSize="small" />
              </Avatar>
            )}
            <Paper
              sx={{
                p: 2,
                maxWidth: '85%',
                borderRadius: 2,
                bgcolor: message.type === 'user'
                  ? theme.palette.primary.main
                  : alpha(theme.palette.grey[100], 1),
                color: message.type === 'user' ? 'white' : 'text.primary',
                ...(message.isError && {
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  borderLeft: `3px solid ${theme.palette.error.main}`
                })
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </Typography>
            </Paper>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
              <AIIcon fontSize="small" />
            </Avatar>
            <Paper sx={{ p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  Thinking...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Suggested Questions */}
      {messages.length < 3 && (
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            <SuggestionIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
            Suggested questions:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {suggestedQuestions.map((q, idx) => (
              <Chip
                key={idx}
                label={q}
                size="small"
                onClick={() => handleSuggestion(q)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Input */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            multiline
            maxRows={3}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <SendIcon />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          AI responses are for educational purposes only.
        </Typography>
      </Box>
    </Drawer>
  );
};

/**
 * Floating AI Assistant Button
 * Shows on course pages to open the assistant
 */
export const AIAssistantButton = ({ onClick }) => {
  const theme = useTheme();
  
  return (
    <Fab
      color="primary"
      onClick={onClick}
      aria-label="Open AI course assistant"
      sx={{
        position: 'fixed',
        bottom: { xs: 140, sm: 90 },
        right: 24,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        '&:hover': {
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        }
      }}
    >
      <ChatIcon />
    </Fab>
  );
};

export default AICourseAssistant;
