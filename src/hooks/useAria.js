import { useEffect, useCallback, useRef } from 'react';
import { useAriaContext } from '../context/AriaContext';
import * as ariaService from '../api/ariaService';

/**
 * useAria Hook
 * Provides easy access to Aria AI Co-Pilot functionality
 * Includes keyboard shortcuts, voice recognition, and AI interactions
 */
export const useAria = () => {
  const context = useAriaContext();
  const recognitionRef = useRef(null);

  const {
    isAriaOpen,
    conversationHistory,
    currentContext,
    isVoiceActive,
    voiceSupported,
    openAria,
    closeAria,
    toggleAria,
    addMessage,
    clearHistory,
    updateContext,
    setIsVoiceActive,
    cacheAnalysis,
    getCachedAnalysis,
  } = context;

  /**
   * Handle keyboard shortcut (Ctrl/Cmd + K)
   */
  const handleKeyboardShortcut = useCallback((event) => {
    // Ctrl+K or Cmd+K to toggle Aria
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      toggleAria();
    }

    // Escape to close Aria
    if (event.key === 'Escape' && isAriaOpen) {
      closeAria();
    }
  }, [toggleAria, closeAria, isAriaOpen]);

  /**
   * Register keyboard shortcuts
   */
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, [handleKeyboardShortcut]);

  /**
   * Detect current page context automatically
   */
  const detectContext = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('/library/') || path.includes('/paper/')) {
      const paperId = path.split('/').pop();
      return {
        type: 'paper',
        paperId,
        data: null, // Should be populated with actual paper data
      };
    }

    if (path.includes('/courses/')) {
      const courseId = path.split('/').pop();
      return {
        type: 'course',
        courseId,
        data: null,
      };
    }

    if (path.includes('/post/')) {
      const postId = path.split('/').pop();
      return {
        type: 'post',
        postId,
        data: null,
      };
    }

    if (path.includes('/feed')) {
      return {
        type: 'feed',
        data: null,
      };
    }

    return {
      type: 'general',
      data: null,
    };
  }, []);

  /**
   * Auto-update context when location changes
   */
  useEffect(() => {
    const newContext = detectContext();
    updateContext(newContext);
  }, [detectContext, updateContext]);

  /**
   * Send a message to Aria
   */
  const sendMessage = useCallback(async (messageText, options = {}) => {
    const {
      type = 'question',
      skipResponse = false,
      context: messageContext = null,
    } = options;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);

    // Skip AI response if requested
    if (skipResponse) return;

    // Add loading message
    const loadingMessage = {
      id: Date.now() + 1,
      type: 'ai',
      content: '',
      loading: true,
      timestamp: new Date().toISOString(),
    };
    addMessage(loadingMessage);

    try {
      // Get AI response based on message type
      let response;
      const ctx = messageContext || currentContext;

      switch (type) {
        case 'analyze':
          response = await ariaService.analyzePaper(ctx.data);
          // Format analysis response
          response = formatAnalysisResponse(response);
          break;

        case 'explain':
          response = await ariaService.explainTerm(messageText);
          break;

        case 'find-papers':
          const papers = await ariaService.findRelatedPapers(messageText, ctx.data);
          response = formatPapersResponse(papers);
          break;

        case 'question':
        default:
          response = await ariaService.answerQuestion(messageText, ctx);
          break;
      }

      // Replace loading message with actual response
      const aiMessage = {
        id: Date.now() + 2,
        type: 'ai',
        content: response,
        timestamp: new Date().toISOString(),
      };
      addMessage(aiMessage);

      return aiMessage;
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 2,
        type: 'ai',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        error: true,
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMessage);
      return errorMessage;
    }
  }, [addMessage, currentContext]);

  /**
   * Format analysis response for display
   */
  const formatAnalysisResponse = (analysis) => {
    return `**Summary:**\n${analysis.summary}\n\n**Key Findings:**\n${analysis.keyFindings.map(f => `- ${f}`).join('\n')}\n\n**Strengths:**\n${analysis.strengths.map(s => `- ${s}`).join('\n')}\n\n**Limitations:**\n${analysis.limitations.map(l => `- ${l}`).join('\n')}`;
  };

  /**
   * Format papers response for display
   */
  const formatPapersResponse = (papers) => {
    if (!papers || papers.length === 0) {
      return 'I couldn\'t find any related papers at the moment. Try refining your search terms.';
    }

    let response = 'Here are some related papers I found:\n\n';
    papers.forEach((paper, index) => {
      response += `**${index + 1}. ${paper.title}**\n`;
      response += `${paper.authors} (${paper.year})\n`;
      response += `DOI: ${paper.doi}\n`;
      if (paper.relevanceScore) {
        response += `Relevance: ${(paper.relevanceScore * 100).toFixed(0)}%\n`;
      }
      response += '\n';
    });

    return response;
  };

  /**
   * Quick actions for common tasks
   */
  const quickActions = {
    summarizePaper: async (paper) => {
      updateContext({ type: 'paper', data: paper });
      return sendMessage('Summarize this paper in 3 bullet points', { type: 'analyze' });
    },

    explainTerm: async (term) => {
      return sendMessage(term, { type: 'explain' });
    },

    findRelatedPapers: async (query) => {
      return sendMessage(query, { type: 'find-papers' });
    },

    analyzeKeyFindings: async (paper) => {
      updateContext({ type: 'paper', data: paper });
      return sendMessage('What are the key findings?', { type: 'question' });
    },
  };

  /**
   * Initialize voice recognition
   */
  const initVoiceRecognition = useCallback(() => {
    if (!voiceSupported) return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    return recognition;
  }, [voiceSupported]);

  /**
   * Start voice input
   */
  const startVoiceInput = useCallback((onResult, onError) => {
    if (!voiceSupported) {
      console.warn('Voice recognition not supported');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = initVoiceRecognition();
    }

    const recognition = recognitionRef.current;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsVoiceActive(false);
      onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      setIsVoiceActive(false);
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      setIsVoiceActive(false);
    };

    try {
      recognition.start();
      setIsVoiceActive(true);
    } catch (error) {
      console.error('Failed to start voice recognition:', error);
      setIsVoiceActive(false);
    }
  }, [voiceSupported, initVoiceRecognition, setIsVoiceActive]);

  /**
   * Stop voice input
   */
  const stopVoiceInput = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
    }
  }, [setIsVoiceActive]);

  /**
   * Get context-aware suggestions
   */
  const getSuggestions = useCallback(async () => {
    try {
      const suggestions = await ariaService.generateSuggestions(currentContext);
      return suggestions;
    } catch (error) {
      console.error('Error getting suggestions:', error);
      return [];
    }
  }, [currentContext]);

  return {
    // State
    isOpen: isAriaOpen,
    conversationHistory,
    currentContext,
    isVoiceActive,
    voiceSupported,

    // Actions
    open: openAria,
    close: closeAria,
    toggle: toggleAria,
    sendMessage,
    clearHistory,
    updateContext,

    // Quick actions
    ...quickActions,

    // Voice
    startVoiceInput,
    stopVoiceInput,

    // Utilities
    getSuggestions,
    detectContext,
    cacheAnalysis,
    getCachedAnalysis,
  };
};

export default useAria;
