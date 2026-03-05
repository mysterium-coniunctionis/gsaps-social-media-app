import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, alpha, useTheme } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import CreateCircleDialog from '../components/circles/CreateCircleDialog';
import Toast from '../components/common/Toast';

const CreateCircle = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { awardXP } = useGamification();
  const [dialogOpen, setDialogOpen] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!currentUser) {
      navigate('/login', { state: { from: '/circles/create' } });
    }
  }, [currentUser, navigate]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/circles');
  };

  const handleCircleCreated = (newCircle) => {
    // Award XP for creating a circle
    awardXP('CREATE_CIRCLE', 30);

    setToast({
      open: true,
      message: 'Circle created successfully! +30 XP',
      severity: 'success'
    });

    // Navigate to the new circle detail page
    setTimeout(() => {
      navigate(`/circles/${newCircle.id}`);
    }, 1500);
  };

  if (!currentUser) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Please log in to create a circle
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/circles')}
        sx={{ mb: 2 }}
      >
        Back to Circles
      </Button>

      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderRadius: 3
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create Your Integration Circle
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Share your knowledge and create a supportive space for others.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => setDialogOpen(true)}
        >
          Start Creating
        </Button>
      </Paper>

      <CreateCircleDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleCircleCreated}
        currentUser={currentUser}
      />

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
};

export default CreateCircle;
