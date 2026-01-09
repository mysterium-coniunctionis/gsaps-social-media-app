import React, { useState, useCallback } from 'react';
import {
  Button,
  Box,
  alpha
} from '@mui/material';
import {
  ThumbUpOutlined as LikeIcon,
} from '@mui/icons-material';
import ReactionPicker, { REACTIONS } from './ReactionPicker';
import EmojiReactionBurst from './EmojiReactionBurst';
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
  const [burstEmoji, setBurstEmoji] = useState(null);
  const [showBurst, setShowBurst] = useState(false);

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
      // Trigger animations
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);

      // Trigger emoji burst
      const reaction = REACTIONS[reactionType];
      if (reaction) {
        setBurstEmoji(reaction.emoji);
        setShowBurst(true);
      }
    }
  };

  const handleBurstComplete = useCallback(() => {
    setShowBurst(false);
    setBurstEmoji(null);
  }, []);

  const open = Boolean(anchorEl);

  // Get current reaction details
  const reaction = currentReaction ? REACTIONS[currentReaction] : null;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
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

      {/* Emoji burst animation */}
      <EmojiReactionBurst
        emoji={burstEmoji}
        trigger={showBurst}
        onComplete={handleBurstComplete}
      />

      <ReactionPicker
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onReactionSelect={handleReactionSelect}
        currentReaction={currentReaction}
      />
    </Box>
  );
};

export default ReactionButton;
