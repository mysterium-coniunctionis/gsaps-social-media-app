import React from 'react';
import { Box, Typography, Alert, Stack, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <NotificationsIcon color="primary" />
        <Typography variant="h4" fontWeight="bold">
          Notifications
        </Typography>
      </Stack>

      <Alert
        icon={<MarkEmailReadIcon fontSize="inherit" />}
        severity="info"
        sx={{ mb: 2 }}
      >
        You are all caught up! We will notify you here when there is something new to see.
      </Alert>

      <Typography variant="body1" color="text.secondary" paragraph>
        Looking for conversations you started from a notification? You can continue the
        discussion from the related content or head back to your feed.
      </Typography>

      <Button variant="contained" onClick={() => navigate('/feed')}>
        Go to Feed
      </Button>
    </Box>
  );
};

export default Notifications;
