import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  alpha,
  useTheme,
  IconButton
} from '@mui/material';
import {
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  EmojiEvents as AchievementIcon,
  Star as XPIcon
} from '@mui/icons-material';
import { bounceIn } from '../../theme/animations';

/**
 * FeedbackModal - Enhanced feedback dialogs for user actions
 * Provides visual celebration for achievements and clear feedback for errors
 */

const typeConfig = {
  success: {
    icon: SuccessIcon,
    color: 'success',
    bgcolor: '#e8f5e9'
  },
  error: {
    icon: ErrorIcon,
    color: 'error',
    bgcolor: '#ffebee'
  },
  warning: {
    icon: WarningIcon,
    color: 'warning',
    bgcolor: '#fff3e0'
  },
  info: {
    icon: InfoIcon,
    color: 'info',
    bgcolor: '#e3f2fd'
  },
  achievement: {
    icon: AchievementIcon,
    color: 'primary',
    bgcolor: '#f3e5f5'
  },
  xp: {
    icon: XPIcon,
    color: 'secondary',
    bgcolor: '#fff8e1'
  }
};

const FeedbackModal = ({
  open,
  onClose,
  type = 'success',
  title,
  message,
  xpEarned,
  achievement,
  primaryAction,
  primaryActionLabel = 'Continue',
  secondaryAction,
  secondaryActionLabel
}) => {
  const theme = useTheme();
  const config = typeConfig[type] || typeConfig.success;
  const IconComponent = config.icon;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'visible'
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'text.secondary'
        }}
        aria-label="Close feedback dialog"
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        {/* Icon with animation */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: alpha(theme.palette[config.color].main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            animation: `${bounceIn} 0.6s ease-out`
          }}
        >
          <IconComponent
            sx={{
              fontSize: 56,
              color: theme.palette[config.color].main
            }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        {/* Message */}
        {message && (
          <Typography variant="body1" color="text.secondary" paragraph>
            {message}
          </Typography>
        )}

        {/* XP Earned */}
        {xpEarned && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.5,
              borderRadius: 3,
              bgcolor: alpha(theme.palette.secondary.main, 0.1),
              mb: 2
            }}
          >
            <XPIcon sx={{ color: theme.palette.secondary.main }} />
            <Typography variant="h6" color="secondary" fontWeight={600}>
              +{xpEarned} XP
            </Typography>
          </Box>
        )}

        {/* Achievement */}
        {achievement && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              mb: 2
            }}
          >
            <AchievementIcon sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              Achievement Unlocked!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {achievement}
            </Typography>
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          {secondaryAction && (
            <Button variant="outlined" onClick={secondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            variant="contained"
            color={config.color}
            onClick={primaryAction || onClose}
          >
            {primaryActionLabel}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Quick toast-style success notification
 */
export const SuccessToast = ({ open, onClose, message, xp }) => (
  <FeedbackModal
    open={open}
    onClose={onClose}
    type="success"
    title="Success!"
    message={message}
    xpEarned={xp}
    primaryActionLabel="Got it"
  />
);

/**
 * Achievement unlock modal
 */
export const AchievementModal = ({ open, onClose, title, description, xp }) => (
  <FeedbackModal
    open={open}
    onClose={onClose}
    type="achievement"
    title={title || "Achievement Unlocked!"}
    message={description}
    xpEarned={xp}
    primaryActionLabel="Awesome!"
  />
);

/**
 * Error feedback modal
 */
export const ErrorModal = ({ open, onClose, title, message, onRetry }) => (
  <FeedbackModal
    open={open}
    onClose={onClose}
    type="error"
    title={title || "Something went wrong"}
    message={message}
    primaryAction={onRetry}
    primaryActionLabel={onRetry ? "Try Again" : "Close"}
  />
);

export default FeedbackModal;
