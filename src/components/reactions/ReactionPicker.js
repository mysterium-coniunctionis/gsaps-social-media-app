import React, { useState } from 'react';
import {
  Box,
  Popover,
  IconButton,
  Tooltip,
  Fade,
  Typography,
  alpha
} from '@mui/material';
import { scaleIn, pulse } from '../../theme/animations';

/**
 * Available reaction types
 */
export const REACTIONS = {
  like: { emoji: '👍', label: 'Like', color: '#2196f3' },
  love: { emoji: '❤️', label: 'Love', color: '#f44336' },
  laugh: { emoji: '😂', label: 'Haha', color: '#ff9800' },
  wow: { emoji: '😮', label: 'Wow', color: '#9c27b0' },
  sad: { emoji: '😢', label: 'Sad', color: '#607d8b' },
  angry: { emoji: '😡', label: 'Angry', color: '#ff5722' },
  celebrate: { emoji: '🎉', label: 'Celebrate', color: '#4caf50' },
  think: { emoji: '🤔', label: 'Think', color: '#795548' },
};

/**
 * ReactionPicker Component
 * Displays emoji reactions in a popover for users to select
 */
const ReactionPicker = ({
  anchorEl,
  open,
  onClose,
  onReactionSelect,
  currentReaction
}) => {
  const [hoveredReaction, setHoveredReaction] = useState(null);

  const handleReactionClick = (reactionType) => {
    onReactionSelect(reactionType);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 50,
          p: 1,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.95)
              : alpha(theme.palette.background.paper, 0.98),
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: (theme) =>
            `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        {Object.entries(REACTIONS).map(([type, reaction]) => (
          <Tooltip
            key={type}
            title={reaction.label}
            placement="top"
            arrow
          >
            <IconButton
              onClick={() => handleReactionClick(type)}
              onMouseEnter={() => setHoveredReaction(type)}
              onMouseLeave={() => setHoveredReaction(null)}
              sx={{
                fontSize: '1.5rem',
                width: 48,
                height: 48,
                transition: 'all 0.2s ease',
                transform: hoveredReaction === type ? 'scale(1.3) translateY(-4px)' : 'scale(1)',
                animation: currentReaction === type ? `${pulse} 0.6s ease-in-out` : 'none',
                '&:hover': {
                  backgroundColor: alpha(reaction.color, 0.1),
                },
              }}
            >
              <span role="img" aria-label={reaction.label}>
                {reaction.emoji}
              </span>
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {hoveredReaction && (
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: `${scaleIn} 0.2s ease-out`,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.8),
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {REACTIONS[hoveredReaction].label}
          </Typography>
        </Box>
      )}
    </Popover>
  );
};

export default ReactionPicker;
