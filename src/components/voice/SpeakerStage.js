import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Star as StarIcon,
  Shield as ShieldIcon,
  PersonRemove as RemoveIcon
} from '@mui/icons-material';

/**
 * SpeakerAvatar - Individual speaker with audio visualization
 */
const SpeakerAvatar = ({ speaker, isSpeaking, isCurrentUser, onRemove, canManage }) => {
  const theme = useTheme();
  const [audioLevel, setAudioLevel] = useState(0);

  // Simulate audio visualization
  useEffect(() => {
    if (!isSpeaking) {
      setAudioLevel(0);
      return;
    }

    const interval = setInterval(() => {
      // Random audio level simulation
      setAudioLevel(Math.random() * 0.7 + 0.3);
    }, 100);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  const getRoleIcon = () => {
    if (speaker.role === 'host') {
      return <StarIcon sx={{ fontSize: 14 }} />;
    }
    if (speaker.role === 'moderator') {
      return <ShieldIcon sx={{ fontSize: 14 }} />;
    }
    return null;
  };

  const getRoleColor = () => {
    if (speaker.role === 'host') return 'warning';
    if (speaker.role === 'moderator') return 'info';
    return 'default';
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        p: 2,
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.background.paper, 0.05),
          '& .remove-button': {
            opacity: 1
          }
        }
      }}
    >
      {/* Avatar with audio visualization ring */}
      <Box sx={{ position: 'relative' }}>
        {/* Outer ring - audio visualization */}
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            left: -8,
            right: -8,
            bottom: -8,
            borderRadius: '50%',
            border: `3px solid ${theme.palette.primary.main}`,
            opacity: isSpeaking ? audioLevel : 0,
            transform: `scale(${isSpeaking ? 1 + audioLevel * 0.2 : 1})`,
            transition: 'all 0.1s ease',
            boxShadow: isSpeaking
              ? `0 0 ${20 + audioLevel * 20}px ${alpha(theme.palette.primary.main, audioLevel)}`
              : 'none'
          }}
        />

        {/* Middle ring - static glow when speaking */}
        {isSpeaking && (
          <Box
            sx={{
              position: 'absolute',
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              borderRadius: '50%',
              border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              animation: 'pulse 2s infinite'
            }}
          />
        )}

        {/* Avatar */}
        <Avatar
          src={speaker.avatar}
          alt={speaker.displayName}
          sx={{
            width: 80,
            height: 80,
            border: `3px solid ${theme.palette.background.paper}`,
            boxShadow: theme.shadows[3],
            transition: 'all 0.3s ease',
            filter: speaker.isMuted ? 'grayscale(0.3)' : 'none'
          }}
        />

        {/* Mute indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -4,
            right: -4,
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: speaker.isMuted ? 'error.main' : 'success.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${theme.palette.background.paper}`,
            boxShadow: theme.shadows[2]
          }}
        >
          {speaker.isMuted ? (
            <MicOffIcon sx={{ fontSize: 16, color: 'white' }} />
          ) : (
            <MicIcon sx={{ fontSize: 16, color: 'white' }} />
          )}
        </Box>

        {/* Role badge */}
        {speaker.role !== 'speaker' && (
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}
          >
            <Chip
              icon={getRoleIcon()}
              label={speaker.role}
              size="small"
              color={getRoleColor()}
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                '& .MuiChip-icon': {
                  fontSize: 12
                }
              }}
            />
          </Box>
        )}
      </Box>

      {/* Speaker name */}
      <Box sx={{ textAlign: 'center', maxWidth: 120 }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%'
          }}
        >
          {speaker.displayName}
          {isCurrentUser && ' (You)'}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
            display: 'block'
          }}
        >
          @{speaker.username}
        </Typography>
      </Box>

      {/* Remove button (for hosts) */}
      {canManage && speaker.role !== 'host' && (
        <IconButton
          className="remove-button"
          size="small"
          onClick={() => onRemove(speaker.id)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0,
            transition: 'opacity 0.2s ease',
            bgcolor: alpha(theme.palette.error.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.2)
            }
          }}
        >
          <RemoveIcon sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </Box>
  );
};

/**
 * SpeakerStage - Display area for active speakers
 */
const SpeakerStage = ({ speakers, currentUserId, isHost, onRemoveSpeaker }) => {
  const theme = useTheme();
  const [speakingStates, setSpeakingStates] = useState({});

  // Simulate random speaking activity
  useEffect(() => {
    const interval = setInterval(() => {
      const newStates = {};
      speakers.forEach((speaker) => {
        if (!speaker.isMuted) {
          // Random chance of speaking
          newStates[speaker.id] = Math.random() > 0.7;
        } else {
          newStates[speaker.id] = false;
        }
      });
      setSpeakingStates(newStates);
    }, 1500);

    return () => clearInterval(interval);
  }, [speakers]);

  if (!speakers || speakers.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: 'blur(10px)',
          borderRadius: 3
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No speakers on stage yet
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          On Stage
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {speakers.length} {speakers.length === 1 ? 'speaker' : 'speakers'}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)'
          },
          gap: 2,
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1
            },
            '50%': {
              opacity: 0.6
            }
          }
        }}
      >
        {speakers.map((speaker) => (
          <SpeakerAvatar
            key={speaker.id}
            speaker={speaker}
            isSpeaking={speakingStates[speaker.id] || false}
            isCurrentUser={speaker.id === currentUserId}
            canManage={isHost}
            onRemove={onRemoveSpeaker}
          />
        ))}
      </Box>

      {/* Stage info */}
      <Box
        sx={{
          mt: 3,
          pt: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
        <Tooltip title="Active speakers (unmuted)">
          <Chip
            icon={<MicIcon />}
            label={`${speakers.filter((s) => !s.isMuted).length} active`}
            size="small"
            variant="outlined"
          />
        </Tooltip>
        <Tooltip title="Muted speakers">
          <Chip
            icon={<MicOffIcon />}
            label={`${speakers.filter((s) => s.isMuted).length} muted`}
            size="small"
            variant="outlined"
          />
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default SpeakerStage;
