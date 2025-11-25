import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

/**
 * InstructorDisplay Component
 * Displays instructor information with avatar and name
 * 
 * @param {Object} instructor - Instructor object with avatar_url and name
 * @param {string} variant - Typography variant (default: 'body2')
 * @param {boolean} noWrap - Whether to prevent text wrapping
 */
const InstructorDisplay = ({ instructor, variant = 'body2', noWrap = false }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Avatar
        src={instructor.avatar_url}
        alt={instructor.name}
        sx={{ width: 24, height: 24, mr: 1 }}
      />
      <Typography variant={variant} color="text.secondary" noWrap={noWrap}>
        {instructor.name}
      </Typography>
    </Box>
  );
};

export default InstructorDisplay;
