import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';

const AriaContext = createContext();

export const useAriaContext = () => {
  const context = useContext(AriaContext);
  if (!context) {
    throw new Error('useAriaContext must be used within AriaProvider');
  }
  return context;
};

/**
 * AriaProvider - Global state management for Aria AI Research Co-Pilot
 * Manages conversation history, context awareness, and voice recognition state
 */
export const AriaProvider = ({ children }) => {
  const [isAriaOpen, setIsAriaOpen] = useState(false);
  const [conversationHistory, setConversationHistory] = useState(() => {
    // Load from localStorage on init
    try {
      const saved = localStorage.getItem('aria_conversation_history');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load conversation history:', error);
      return [];
    }
  });

  const [currentContext, setCurrentContext] = useState({
    type: null, // 'paper', 'course', 'post', 'feed'
    data: null,
    paperId: null,
    courseId: null,
    postId: null,
  });

  const [analysisCache, setAnalysisCache] = useState({});
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  // Check voice recognition support on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(!!SpeechRecognition);
  }, []);

  // Persist conversation history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aria_conversation_history', JSON.stringify(conversationHistory));
    } catch (error) {
      console.error('Failed to save conversation history:', error);
    }
  }, [conversationHistory]);

  const openAria = useCallback((context = null) => {
    setIsAriaOpen(true);
    if (context) {
      setCurrentContext(context);
    }
  }, []);

  const closeAria = useCallback(() => {
    setIsAriaOpen(false);
    setIsVoiceActive(false);
  }, []);

  const toggleAria = useCallback(() => {
    setIsAriaOpen(prev => !prev);
    if (isAriaOpen) {
      setIsVoiceActive(false);
    }
  }, [isAriaOpen]);

  const addMessage = useCallback((message) => {
    setConversationHistory(prev => [
      ...prev,
      {
        ...message,
        id: message.id || Date.now(),
        timestamp: message.timestamp || new Date().toISOString(),
      }
    ]);
  }, []);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    try {
      localStorage.removeItem('aria_conversation_history');
    } catch (error) {
      console.error('Failed to clear conversation history:', error);
    }
  }, []);

  const updateContext = useCallback((context) => {
    setCurrentContext(prev => ({
      ...prev,
      ...context,
    }));
  }, []);

  const cacheAnalysis = useCallback((key, data) => {
    setAnalysisCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now(),
      }
    }));
  }, []);

  const getCachedAnalysis = useCallback((key, maxAge = 300000) => {
    // Default max age: 5 minutes
    const cached = analysisCache[key];
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > maxAge) {
      // Cache expired
      return null;
    }

    return cached.data;
  }, [analysisCache]);

  const clearCache = useCallback(() => {
    setAnalysisCache({});
  }, []);

  const contextValue = useMemo(() => ({
    // State
    isAriaOpen,
    conversationHistory,
    currentContext,
    analysisCache,
    isVoiceActive,
    voiceSupported,

    // Actions
    openAria,
    closeAria,
    toggleAria,
    addMessage,
    clearHistory,
    updateContext,
    cacheAnalysis,
    getCachedAnalysis,
    clearCache,
    setIsVoiceActive,
  }), [
    isAriaOpen,
    conversationHistory,
    currentContext,
    analysisCache,
    isVoiceActive,
    voiceSupported,
    openAria,
    closeAria,
    toggleAria,
    addMessage,
    clearHistory,
    updateContext,
    cacheAnalysis,
    getCachedAnalysis,
    clearCache,
  ]);

  return (
    <AriaContext.Provider value={contextValue}>
      {children}
    </AriaContext.Provider>
  );
};

export default AriaContext;
