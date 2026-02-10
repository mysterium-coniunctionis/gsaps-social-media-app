import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  Avatar,
  AvatarGroup,
  Chip,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  FiberManualRecord as LiveIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';

/**
 * VoiceRoomCard - Preview card for voice rooms
 * Displays room info with glassmorphism design
 */
const VoiceRoomCard = ({ room, showAnimation = true }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/voice-rooms/${room.id}`);
  };

  const isLive = room.status === 'live';
  const isScheduled = room.status === 'scheduled';

  const getDurationText = () => {
    if (isLive && room.startedAt) {
      return `Started ${formatDistanceToNow(new Date(room.startedAt), { addSuffix: true })}`;
    }
    if (isScheduled && room.scheduledFor) {
      return `Scheduled for ${format(new Date(room.scheduledFor), 'MMM d, h:mm a')}`;
    }
    return '';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Integration: 'primary',
      Science: 'info',
      Education: 'success',
      Culture: 'warning',
      Research: 'secondary',
      Practice: 'primary'
    };
    return colors[category] || 'default';
  };

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
        },
        animation: showAnimation ? 'fadeInUp 0.5s ease-out' : 'none',
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent sx={{ p: 3 }}>
          {/* Status and Category */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {isLive && (
              <Chip
                icon={<LiveIcon />}
                label="LIVE"
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: 'error.main',
                  fontWeight: 700,
                  '& .MuiChip-icon': {
                    color: 'error.main',
                    animation: 'pulse 2s infinite'
                  },
                  '@keyframes pulse': {
                    '0%, 100%': {
                      opacity: 1
                    },
                    '50%': {
                      opacity: 0.5
                    }
                  }
                }}
              />
            )}
            {isScheduled && (
              <Chip
                icon={<ScheduleIcon />}
                label="Scheduled"
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: 'info.main',
                  fontWeight: 600
                }}
              />
            )}
            <Chip
              label={room.category}
              size="small"
              color={getCategoryColor(room.category)}
              sx={{ fontWeight: 600 }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3
            }}
          >
            {room.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5
            }}
          >
            {room.description}
          </Typography>

          {/* Speakers */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <AvatarGroup
              max={4}
              sx={{
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  border: `2px solid ${theme.palette.background.paper}`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    zIndex: 10
                  }
                }
              }}
            >
              {room.speakers.map((speaker) => (
                <Avatar
                  key={speaker.id}
                  src={speaker.avatar}
                  alt={speaker.displayName}
                  title={speaker.displayName}
                />
              ))}
            </AvatarGroup>
            <Typography variant="caption" color="text.secondary" fontWeight="medium">
              {room.speakers.length} {room.speakers.length === 1 ? 'Speaker' : 'Speakers'}
            </Typography>
          </Box>

          {/* Stats */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2" fontWeight="medium">
                {room.listenerCount}
              </Typography>
              {isLive && (
                <Typography variant="caption" color="text.secondary">
                  listening
                </Typography>
              )}
              {isScheduled && (
                <Typography variant="caption" color="text.secondary">
                  interested
                </Typography>
              )}
            </Box>

            {room.isPrivate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  Private
                </Typography>
              </Box>
            )}

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 'auto !important' }}
            >
              {getDurationText()}
            </Typography>
          </Stack>

          {/* Tags */}
          {room.tags && room.tags.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {room.tags.slice(0, 3).map((tag, index) => (
                <Chip
                  key={index}
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    borderColor: alpha(theme.palette.text.secondary, 0.3),
                    color: 'text.secondary'
                  }}
                />
              ))}
              {room.tags.length > 3 && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, mt: 0.3 }}>
                  +{room.tags.length - 3} more
                </Typography>
              )}
            </Box>
          )}

          {/* Recording Indicator */}
          {room.isRecording && isLive && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: alpha(theme.palette.background.paper, 0.9),
                border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'error.main',
                  animation: 'pulse 2s infinite'
                }}
              />
              <Typography variant="caption" fontSize="0.65rem" fontWeight="medium">
                REC
              </Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VoiceRoomCard;
