import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Snackbar,
  Alert,
  Slide,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon
} from '@mui/icons-material';

/**
 * Toast Context and Provider
 * Manages toast notifications throughout the app
 */
const ToastContext = createContext();

/**
 * Hook to access toast functions
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

/**
 * Slide transition for toast
 */
const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

/**
 * Toast Provider Component
 * Wraps the app to provide toast functionality
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Hide a specific toast
   */
  const hideToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, open: false } : toast
      )
    );

    // Remove from state after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} severity - 'success' | 'error' | 'warning' | 'info'
   * @param {number} duration - Auto-hide duration in ms (default: 4000)
   */
  const showToast = useCallback((message, severity = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      severity,
      duration,
      open: true,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, duration);
    }
  }, [hideToast]);

  /**
   * Convenience methods for different toast types
   */
  const success = useCallback((message, duration) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const error = useCallback((message, duration) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const warning = useCallback((message, duration) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const info = useCallback((message, duration) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  const value = {
    showToast,
    success,
    error,
    warning,
    info,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={toast.open}
          autoHideDuration={toast.duration}
          onClose={() => hideToast(toast.id)}
          TransitionComponent={SlideTransition}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{
            // Stack multiple toasts
            bottom: `${(toasts.length - index - 1) * 70 + 24}px !important`,
          }}
        >
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => hideToast(toast.id)}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => hideToast(toast.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              width: '100%',
              minWidth: 300,
              boxShadow: 3,
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};

/**
 * Simple Toast Component (for direct use without provider)
 */
export const Toast = ({
  open,
  message,
  severity = 'info',
  onClose,
  duration = 4000,
  ...props
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      {...props}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{
          width: '100%',
          minWidth: 300,
          boxShadow: 3,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
