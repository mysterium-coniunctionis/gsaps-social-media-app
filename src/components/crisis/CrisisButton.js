import React, { useState } from 'react';
import {
  Fab,
  Tooltip,
  Badge,
  useTheme,
  alpha,
  Zoom,
  keyframes
} from '@mui/material';
import { SupportAgent as SupportIcon } from '@mui/icons-material';
import CrisisModal from './CrisisModal';

// Define pulse animation using MUI keyframes
const pulse = keyframes`
  0% {
    box-shadow: 0 4px 20px rgba(211, 47, 47, 0.4);
  }
  50% {
    box-shadow: 0 4px 30px rgba(211, 47, 47, 0.6);
  }
  100% {
    box-shadow: 0 4px 20px rgba(211, 47, 47, 0.4);
  }
`;

/**
 * CrisisButton - A floating action button that provides one-click access to crisis support resources.
 * Always visible on all pages for immediate accessibility.
 */
const CrisisButton = () => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Tooltip 
        title="Crisis Support - Get Help Now" 
        placement="left"
        arrow
      >
        <Zoom in={true}>
          <Fab
            aria-label="Crisis Support - Get Help Now"
            onClick={handleOpen}
            sx={{
              position: 'fixed',
              bottom: { xs: 80, sm: 24 },
              right: 24,
              zIndex: 1300,
              background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.warning.main})`,
              color: 'white',
              boxShadow: `0 4px 20px ${alpha(theme.palette.error.main, 0.4)}`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.warning.dark})`,
                transform: 'scale(1.1)',
                boxShadow: `0 6px 24px ${alpha(theme.palette.error.main, 0.6)}`
              },
              transition: 'all 0.3s ease-in-out',
              animation: `${pulse} 2s infinite`
            }}
          >
            <Badge
              badgeContent="24/7"
              color="success"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.6rem',
                  height: 16,
                  minWidth: 28,
                  right: -4,
                  top: -4
                }
              }}
            >
              <SupportIcon fontSize="large" />
            </Badge>
          </Fab>
        </Zoom>
      </Tooltip>

      <CrisisModal open={modalOpen} onClose={handleClose} />
    </>
  );
};

export default CrisisButton;
