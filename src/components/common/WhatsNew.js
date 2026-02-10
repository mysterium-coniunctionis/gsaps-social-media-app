import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  IconButton,
  MobileStepper,
  alpha,
  useTheme,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  Mic as VoiceIcon,
  ViewInAr as VRIcon,
  Hub as NetworkIcon,
  SmartToy as AIIcon,
  TrendingUp as FeedIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  AutoAwesome as SparkleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CURRENT_VERSION = '2026.1';
const STORAGE_KEY = 'gsaps_seen_version';

/**
 * What's New Feature Discovery Modal
 * Shows users the new 2026 killer features
 */
const WhatsNew = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const features = [
    {
      title: 'Aria AI Research Co-Pilot',
      subtitle: 'Your Intelligent Assistant',
      description: 'Press Ctrl+K anywhere to summon Aria, your AI-powered research assistant. Get instant paper summaries, explanations, and discover related research with a simple conversation.',
      icon: <AIIcon sx={{ fontSize: 48 }} />,
      color: '#9C27B0',
      action: () => { setOpen(false); /* Trigger Aria */ },
      actionLabel: 'Try Aria Now',
      tips: ['Ask "Summarize this paper"', 'Use voice input', 'Find related research']
    },
    {
      title: 'Live Voice Rooms',
      subtitle: 'Real-Time Audio Discussions',
      description: 'Join or create live audio discussions with researchers worldwide. Features AI-powered live transcription, speaker stages, and room reactions.',
      icon: <VoiceIcon sx={{ fontSize: 48 }} />,
      color: '#2196F3',
      action: () => { setOpen(false); navigate('/voice-rooms'); },
      actionLabel: 'Explore Voice Rooms',
      tips: ['Join live discussions', 'Raise your hand to speak', 'Read AI transcripts']
    },
    {
      title: 'Immersive 3D Spaces',
      subtitle: 'Virtual Reality Environments',
      description: 'Step into virtual symposium halls, networking lounges, and study pods. Connect with colleagues in immersive 3D environments with spatial audio.',
      icon: <VRIcon sx={{ fontSize: 48 }} />,
      color: '#00BCD4',
      action: () => { setOpen(false); navigate('/virtual-spaces'); },
      actionLabel: 'Enter 3D Spaces',
      tips: ['Join virtual symposia', 'Network in 3D', 'Study together']
    },
    {
      title: 'Smart Mentor Matching',
      subtitle: 'AI-Powered Networking',
      description: 'Our intelligent matching algorithm connects you with the perfect mentors, collaborators, and peers based on your research interests, experience, and goals.',
      icon: <NetworkIcon sx={{ fontSize: 48 }} />,
      color: '#4CAF50',
      action: () => { setOpen(false); navigate('/network'); },
      actionLabel: 'Find Your Match',
      tips: ['Get personalized matches', 'View compatibility scores', 'Connect with experts']
    },
    {
      title: 'Neural Feed Algorithm',
      subtitle: 'Personalized Discovery',
      description: 'Your feed now learns from your interests. See why content is recommended, tune your preferences, and discover research that matters to you.',
      icon: <FeedIcon sx={{ fontSize: 48 }} />,
      color: '#FF9800',
      action: () => { setOpen(false); navigate('/feed'); },
      actionLabel: 'See Your Feed',
      tips: ['Tap "Why am I seeing this?"', 'Tune your interests', 'Discover trending topics']
    }
  ];

  // Check if user has seen this version
  useEffect(() => {
    const seenVersion = localStorage.getItem(STORAGE_KEY);
    if (seenVersion !== CURRENT_VERSION) {
      // Delay showing to not interrupt initial load
      const timer = setTimeout(() => setOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSkip = () => {
    handleClose();
  };

  const currentFeature = features[activeStep];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(currentFeature?.color || '#9C27B0', 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%)`
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SparkleIcon color="secondary" />
          <Typography variant="h6" fontWeight="bold">
            What's New in 2026
          </Typography>
          <Chip label="5 Features" size="small" color="secondary" />
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Feature Card */}
        <Card
          elevation={0}
          sx={{
            bgcolor: 'transparent',
            textAlign: 'center',
            py: 2
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              bgcolor: alpha(currentFeature.color, 0.15),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              color: currentFeature.color,
              animation: 'pulse 2s infinite'
            }}
          >
            {currentFeature.icon}
          </Box>

          {/* Title */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {currentFeature.title}
          </Typography>
          <Chip
            label={currentFeature.subtitle}
            size="small"
            sx={{
              mb: 2,
              bgcolor: alpha(currentFeature.color, 0.1),
              color: currentFeature.color
            }}
          />

          {/* Description */}
          <Typography color="text.secondary" sx={{ mb: 3, px: 2 }}>
            {currentFeature.description}
          </Typography>

          {/* Tips */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {currentFeature.tips.map((tip, i) => (
              <Chip
                key={i}
                label={tip}
                size="small"
                variant="outlined"
                sx={{ borderStyle: 'dashed' }}
              />
            ))}
          </Box>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={currentFeature.action}
            sx={{
              bgcolor: currentFeature.color,
              '&:hover': { bgcolor: alpha(currentFeature.color, 0.9) },
              borderRadius: 2,
              px: 4
            }}
          >
            {currentFeature.actionLabel}
          </Button>
        </Card>

        {/* Progress Stepper */}
        <MobileStepper
          variant="dots"
          steps={features.length}
          position="static"
          activeStep={activeStep}
          sx={{
            bgcolor: 'transparent',
            justifyContent: 'center',
            mt: 2,
            '& .MuiMobileStepper-dot': {
              mx: 0.5
            },
            '& .MuiMobileStepper-dotActive': {
              bgcolor: currentFeature.color
            }
          }}
          nextButton={<Box />}
          backButton={<Box />}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'space-between' }}>
        <Button onClick={handleSkip} color="inherit">
          Skip Tour
        </Button>
        <Box>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<KeyboardArrowLeft />}
          >
            Back
          </Button>
          {activeStep < features.length - 1 ? (
            <Button
              onClick={handleNext}
              endIcon={<KeyboardArrowRight />}
              variant="outlined"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Get Started
            </Button>
          )}
        </Box>
      </DialogActions>

      {/* CSS for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Dialog>
  );
};

export default WhatsNew;
