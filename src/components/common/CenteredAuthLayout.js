import React from 'react';
import { Box } from '@mui/material';

/**
 * Reusable centered layout for authentication pages
 * @param {React.ReactNode} children - Child components to render
 */
const CenteredAuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredAuthLayout;
