/**
 * Aria AI Co-Pilot - Usage Examples
 *
 * This file demonstrates how to integrate Aria into different parts of your app.
 * Copy and adapt these examples for your specific use cases.
 */

import React from 'react';
import { Button, IconButton } from '@mui/material';
import { AutoAwesome as AIIcon } from '@mui/icons-material';
import { useAria } from '../../hooks/useAria';

/**
 * Example 1: Quick Action Button in a Paper Detail Page
 * Opens Aria with paper context and asks it to summarize
 */
export const PaperSummaryButton = ({ paper }) => {
  const { open, summarizePaper } = useAria();

  const handleSummarize = () => {
    open({ type: 'paper', data: paper });
    summarizePaper(paper);
  };

  return (
    <Button
      variant="outlined"
      startIcon={<AIIcon />}
      onClick={handleSummarize}
    >
      AI Summary
    </Button>
  );
};

/**
 * Example 2: Explain Term Button
 * Click any term to get an AI explanation
 */
export const ExplainTermButton = ({ term }) => {
  const { open, explainTerm } = useAria();

  const handleExplain = () => {
    open();
    explainTerm(term);
  };

  return (
    <IconButton
      size="small"
      onClick={handleExplain}
      title={`Ask Aria to explain "${term}"`}
    >
      <AIIcon fontSize="small" />
    </IconButton>
  );
};

/**
 * Example 3: Find Related Papers Button
 * Search for papers related to a topic
 */
export const FindRelatedPapersButton = ({ topic }) => {
  const { open, findRelatedPapers } = useAria();

  const handleFindPapers = () => {
    open();
    findRelatedPapers(topic);
  };

  return (
    <Button
      variant="text"
      startIcon={<AIIcon />}
      onClick={handleFindPapers}
    >
      Find Related Papers
    </Button>
  );
};

/**
 * Example 4: Context-Aware Aria in Course Page
 * Automatically sets course context when Aria is opened
 */
export const CourseAriaButton = ({ course }) => {
  const { open, updateContext } = useAria();

  const handleOpen = () => {
    updateContext({ type: 'course', data: course, courseId: course.id });
    open();
  };

  return (
    <Button
      variant="contained"
      startIcon={<AIIcon />}
      onClick={handleOpen}
    >
      Ask Aria About This Course
    </Button>
  );
};

/**
 * Example 5: Programmatic Message Sending
 * Send a message to Aria without user interaction
 */
export const AutoAnalyzeComponent = ({ paper }) => {
  const { sendMessage, updateContext } = useAria();

  const handleAutoAnalyze = async () => {
    updateContext({ type: 'paper', data: paper });
    await sendMessage('What are the key findings of this paper?', {
      type: 'question',
    });
  };

  return (
    <Button onClick={handleAutoAnalyze}>
      Auto-Analyze with Aria
    </Button>
  );
};

/**
 * Example 6: Check if Aria is Open
 * Conditional rendering based on Aria state
 */
export const AriaStatusIndicator = () => {
  const { isOpen, toggle } = useAria();

  return (
    <div>
      {isOpen ? (
        <p>Aria is helping you right now...</p>
      ) : (
        <Button onClick={toggle}>Need AI Help?</Button>
      )}
    </div>
  );
};

/**
 * Example 7: Voice Input Example
 * Trigger voice input from your component
 */
export const VoiceInputButton = () => {
  const { startVoiceInput, stopVoiceInput, isVoiceActive, voiceSupported } = useAria();

  if (!voiceSupported) {
    return <p>Voice input not supported in your browser</p>;
  }

  const handleVoiceClick = () => {
    if (isVoiceActive) {
      stopVoiceInput();
    } else {
      startVoiceInput(
        (transcript) => {
          console.log('User said:', transcript);
          // Transcript is automatically sent to Aria
        },
        (error) => {
          console.error('Voice error:', error);
        }
      );
    }
  };

  return (
    <Button
      variant={isVoiceActive ? 'contained' : 'outlined'}
      color={isVoiceActive ? 'error' : 'primary'}
      onClick={handleVoiceClick}
    >
      {isVoiceActive ? 'Stop Recording' : 'Start Voice Input'}
    </Button>
  );
};

/**
 * Example 8: Get Context-Aware Suggestions
 * Load and display suggestions based on current page
 */
export const AriaSuggestionsComponent = () => {
  const { getSuggestions, sendMessage } = useAria();
  const [suggestions, setSuggestions] = React.useState([]);

  React.useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    const sug = await getSuggestions();
    setSuggestions(sug);
  };

  return (
    <div>
      <h3>Suggested Questions:</h3>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          onClick={() => sendMessage(suggestion)}
          variant="outlined"
          size="small"
          sx={{ m: 0.5 }}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};

/**
 * Example 9: Clear Conversation History
 * Allow users to start fresh
 */
export const ClearHistoryButton = () => {
  const { clearHistory } = useAria();

  const handleClear = () => {
    if (window.confirm('Clear Aria conversation history?')) {
      clearHistory();
    }
  };

  return (
    <Button onClick={handleClear} color="warning">
      Clear Aria History
    </Button>
  );
};

/**
 * Example 10: Keyboard Shortcut Info
 * The useAria hook automatically registers Ctrl+K shortcut
 * No additional code needed - it's built in!
 */
export const KeyboardShortcutInfo = () => {
  return (
    <div>
      <p>Press <kbd>Ctrl+K</kbd> (or <kbd>Cmd+K</kbd> on Mac) to open Aria from anywhere!</p>
      <p>Press <kbd>Esc</kbd> to close Aria.</p>
    </div>
  );
};

// Export all examples
export default {
  PaperSummaryButton,
  ExplainTermButton,
  FindRelatedPapersButton,
  CourseAriaButton,
  AutoAnalyzeComponent,
  AriaStatusIndicator,
  VoiceInputButton,
  AriaSuggestionsComponent,
  ClearHistoryButton,
  KeyboardShortcutInfo,
};
