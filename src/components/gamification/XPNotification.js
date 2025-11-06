import React from 'react';
import { Box, Typography, Slide, Paper, alpha } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { useGamification } from '../../context/GamificationContext';

/**
 * XPNotification Component
 * Shows floating notifications when user earns XP
 */
const XPNotification = () => {
  const { recentXP } = useGamification();

  if (!recentXP || recentXP.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 80,
        right: 20,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      {recentXP.map((xp, index) => (
        <Slide key={xp.id} direction="left" in={true} timeout={300}>
          <Paper
            elevation={6}
            sx={{
              p: 2,
              minWidth: 200,
              background: `linear-gradient(135deg, ${alpha('#4caf50', 0.9)} 0%, ${alpha('#8bc34a', 0.9)} 100%)`,
              backdropFilter: 'blur(10px)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              animation: 'pulse 0.5s ease-in-out',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
                '100%': { transform: 'scale(1)' }
              }
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: alpha('#fff', 0.3),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <StarIcon sx={{ fontSize: 24, color: '#ffd700' }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                +{xp.amount} XP
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {formatAction(xp.action)}
              </Typography>
            </Box>
          </Paper>
        </Slide>
      ))}
    </Box>
  );
};

const formatAction = (action) => {
  return action
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default XPNotification;
