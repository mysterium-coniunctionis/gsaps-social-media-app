import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { fadeInUp } from '../../theme/animations';

/**
 * StatCard Component
 * Displays a statistic with an icon and label
 * 
 * @param {ReactNode} icon - Icon to display
 * @param {string} label - Label text
 * @param {number|string} value - Statistic value (required)
 * @param {string} iconColor - Color for the icon
 * @param {number} animationDelay - Animation delay in seconds
 */
const StatCard = ({ icon, label, value = 0, iconColor, animationDelay = 0 }) => {
  return (
    <Card
      elevation={2}
      sx={{
        animation: `${fadeInUp} 0.6s ease-out ${animationDelay}s backwards`
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {React.cloneElement(icon, { sx: { color: iconColor, mr: 1, ...(icon.props.sx || {}) } })}
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
