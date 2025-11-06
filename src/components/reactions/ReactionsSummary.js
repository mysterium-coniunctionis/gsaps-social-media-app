import React, { useState } from 'react';
import {
  Box,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  alpha
} from '@mui/material';
import { REACTIONS } from './ReactionPicker';

/**
 * ReactionsSummary Component
 * Displays aggregated reactions with emoji icons and counts
 * Click to see detailed list of who reacted
 */
const ReactionsSummary = ({ reactions = [], onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Aggregate reactions by type
  const reactionCounts = reactions.reduce((acc, reaction) => {
    const type = reaction.type;
    if (!acc[type]) {
      acc[type] = {
        count: 0,
        users: [],
      };
    }
    acc[type].count++;
    acc[type].users.push(reaction.user);
    return acc;
  }, {});

  // Get top 3 reaction types
  const topReactions = Object.entries(reactionCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3);

  const totalCount = reactions.length;

  if (totalCount === 0) {
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onClick) onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          py: 0.5,
          '&:hover': {
            '& .reaction-emoji': {
              transform: 'scale(1.2)',
            },
            '& .reaction-count': {
              textDecoration: 'underline',
            }
          },
        }}
      >
        {/* Emoji icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {topReactions.map(([type, data], index) => (
            <Box
              key={type}
              className="reaction-emoji"
              sx={{
                fontSize: '1rem',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                bgcolor: 'background.paper',
                border: (theme) => `2px solid ${theme.palette.background.default}`,
                marginLeft: index > 0 ? '-6px' : 0,
                zIndex: topReactions.length - index,
                transition: 'transform 0.2s ease',
              }}
            >
              <span role="img" aria-label={REACTIONS[type]?.label}>
                {REACTIONS[type]?.emoji}
              </span>
            </Box>
          ))}
        </Box>

        {/* Count */}
        <Typography
          className="reaction-count"
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          }}
        >
          {totalCount}
        </Typography>
      </Box>

      {/* Popover with detailed reactions */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            maxWidth: 320,
            maxHeight: 400,
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight="bold">
            All Reactions
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
            {Object.entries(reactionCounts)
              .sort((a, b) => b[1].count - a[1].count)
              .map(([type, data]) => (
                <Chip
                  key={type}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span role="img" aria-label={REACTIONS[type]?.label}>
                        {REACTIONS[type]?.emoji}
                      </span>
                      <Typography variant="caption">
                        {data.count}
                      </Typography>
                    </Box>
                  }
                  size="small"
                  sx={{
                    bgcolor: alpha(REACTIONS[type]?.color, 0.1),
                    color: REACTIONS[type]?.color,
                  }}
                />
              ))}
          </Box>
        </Box>

        <List sx={{ maxHeight: 300, overflow: 'auto', p: 0 }}>
          {reactions.map((reaction, index) => (
            <ListItem
              key={`${reaction.user.id}-${index}`}
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={reaction.user.avatar_url}
                  alt={reaction.user.name}
                  sx={{ width: 36, height: 36 }}
                >
                  {reaction.user.name?.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={reaction.user.name}
                secondary={reaction.user.username}
              />
              <Box sx={{ fontSize: '1.2rem' }}>
                <span role="img" aria-label={REACTIONS[reaction.type]?.label}>
                  {REACTIONS[reaction.type]?.emoji}
                </span>
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default ReactionsSummary;
