import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Keyboard shortcuts configuration
 */
export const SHORTCUTS = {
  // Navigation shortcuts (g + key)
  GO_HOME: { keys: ['g', 'h'], description: 'Go to Home', category: 'Navigation' },
  GO_FEED: { keys: ['g', 'f'], description: 'Go to Feed', category: 'Navigation' },
  GO_MESSAGES: { keys: ['g', 'm'], description: 'Go to Messages', category: 'Navigation' },
  GO_GROUPS: { keys: ['g', 'g'], description: 'Go to Groups', category: 'Navigation' },
  GO_EVENTS: { keys: ['g', 'e'], description: 'Go to Events', category: 'Navigation' },
  GO_LIBRARY: { keys: ['g', 'l'], description: 'Go to Library', category: 'Navigation' },
  GO_COURSES: { keys: ['g', 'c'], description: 'Go to Courses', category: 'Navigation' },
  GO_SETTINGS: { keys: ['g', 's'], description: 'Go to Settings', category: 'Navigation' },

  // Actions
  NEW_POST: { keys: ['n'], description: 'New post', category: 'Actions' },
  SEARCH: { keys: ['/'], description: 'Focus search', category: 'Actions' },
  HELP: { keys: ['?'], description: 'Show keyboard shortcuts', category: 'Actions' },
  ESCAPE: { keys: ['Escape'], description: 'Close dialog / Cancel', category: 'Actions' },

  // Feed navigation
  NEXT_POST: { keys: ['j'], description: 'Next post', category: 'Feed' },
  PREV_POST: { keys: ['k'], description: 'Previous post', category: 'Feed' },
  LIKE_POST: { keys: ['l'], description: 'Like current post', category: 'Feed' },
  COMMENT_POST: { keys: ['c'], description: 'Comment on post', category: 'Feed' },
};

/**
 * Hook to detect if user is typing in an input field
 */
const isTypingInInput = () => {
  const activeElement = document.activeElement;
  const tagName = activeElement?.tagName?.toLowerCase();
  const isEditable = activeElement?.isContentEditable;

  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    isEditable
  );
};

/**
 * useKeyboardShortcuts hook
 * Provides keyboard shortcut functionality throughout the app
 */
export const useKeyboardShortcuts = (handlers = {}) => {
  const navigate = useNavigate();
  const [keySequence, setKeySequence] = useState([]);
  const [showHelp, setShowHelp] = useState(false);

  const handleKeyDown = useCallback((event) => {
    // Don't trigger shortcuts when typing in inputs
    if (isTypingInInput()) {
      // Allow Escape to blur input
      if (event.key === 'Escape') {
        document.activeElement?.blur();
      }
      return;
    }

    // Don't trigger on modifier keys alone
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const key = event.key;

    // Handle key sequences (e.g., g + h for go home)
    setKeySequence((prev) => {
      const newSequence = [...prev, key].slice(-2); // Keep last 2 keys

      // Check for two-key sequences
      if (newSequence.length === 2 && newSequence[0] === 'g') {
        switch (newSequence[1]) {
          case 'h':
            navigate('/');
            break;
          case 'f':
            navigate('/feed');
            break;
          case 'm':
            navigate('/messages');
            break;
          case 'g':
            navigate('/groups');
            break;
          case 'e':
            navigate('/events');
            break;
          case 'l':
            navigate('/library');
            break;
          case 'c':
            navigate('/courses');
            break;
          case 's':
            navigate('/settings');
            break;
          default:
            break;
        }
        return []; // Reset sequence after handling
      }

      return newSequence;
    });

    // Handle single-key shortcuts
    switch (key) {
      case 'n':
        handlers.onNewPost?.();
        break;
      case '/':
        event.preventDefault(); // Prevent browser search
        handlers.onSearch?.();
        break;
      case '?':
        setShowHelp(true);
        break;
      case 'Escape':
        setShowHelp(false);
        handlers.onEscape?.();
        break;
      case 'j':
        handlers.onNextPost?.();
        break;
      case 'k':
        handlers.onPrevPost?.();
        break;
      case 'l':
        handlers.onLikePost?.();
        break;
      case 'c':
        handlers.onCommentPost?.();
        break;
      default:
        break;
    }

    // Clear sequence after a delay
    setTimeout(() => {
      setKeySequence((prev) => (prev.length > 0 ? [] : prev));
    }, 1000);
  }, [navigate, handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    showHelp,
    setShowHelp,
    keySequence,
  };
};

/**
 * Get shortcuts grouped by category
 */
export const getShortcutsByCategory = () => {
  const categories = {};

  Object.values(SHORTCUTS).forEach((shortcut) => {
    if (!categories[shortcut.category]) {
      categories[shortcut.category] = [];
    }
    categories[shortcut.category].push(shortcut);
  });

  return categories;
};

export default useKeyboardShortcuts;
