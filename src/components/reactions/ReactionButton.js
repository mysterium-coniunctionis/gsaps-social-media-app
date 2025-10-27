import React, { useState } from 'react';
import {
  Button,
  Box,
  alpha
} from '@mui/material';
import {
  ThumbUpOutlined as LikeIcon,
} from '@mui/icons-material';
import ReactionPicker, { REACTIONS } from './ReactionPicker';
import { heartbeat } from '../../theme/animations';

/**
 * ReactionButton Component
 * Button that opens reaction picker and displays current user reaction
 */
const ReactionButton = ({
  currentReaction,
  onReactionChange,
  count = 0,
  size = 'medium'
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReactionSelect = (reactionType) => {
    // If same reaction, remove it (toggle off)
    if (currentReaction === reactionType) {
      onReactionChange(null);
    } else {
      onReactionChange(reactionType);
      // Trigger animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const open = Boolean(anchorEl);

  // Get current reaction details
  const reaction = currentReaction ? REACTIONS[currentReaction] : null;

  return (
    <>
      <Button
        size={size}
        startIcon={
          reaction ? (
            <Box
              component="span"
              sx={{
                fontSize: '1.2rem',
                animation: isAnimating ? `${heartbeat} 0.6s ease-in-out` : 'none',
              }}
            >
              {reaction.emoji}
            </Box>
          ) : (
            <LikeIcon />
          )
        }
        onClick={handleClick}
        sx={{
          color: reaction ? reaction.color : 'text.secondary',
          fontWeight: reaction ? 600 : 400,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: reaction
              ? alpha(reaction.color, 0.1)
              : 'action.hover',
          },
          transition: 'all 0.2s ease',
        }}
      >
        {reaction ? reaction.label : 'Like'}
        {count > 0 && ` (${count})`}
      </Button>

      <ReactionPicker
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onReactionSelect={handleReactionSelect}
        currentReaction={currentReaction}
      />
    </>
  );
};

export default ReactionButton;
