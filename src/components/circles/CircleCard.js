import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
  AvatarGroup,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  Place as PlaceIcon,
  VideoCall as VideoIcon
} from '@mui/icons-material';
import { keyframes } from '@mui/material';

// Animation for card hover
const scaleUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-4px);
  }
`;

const CircleCard = ({
  circle,
  onJoin,
  onViewDetails,
  matchScore = null,
  showJoinButton = true
}) => {
  const {
    name,
    description,
    facilitator,
    members,
    capacity,
    meetingSchedule,
    location,
    experienceTypes,
    values,
    image,
    status
  } = circle;

  const isFull = members.length >= capacity;
  const spotsLeft = capacity - members.length;

  const getCategoryColor = (category) => {
    const colors = {
      'psychedelic-integration': '#4CAF50',
      'preparation': '#2196F3',
      'harm-reduction': '#FF9800',
      'clinical-practitioners': '#9C27B0',
      'researchers': '#00BCD4',
      'spiritual-exploration': '#6a52b3'
    };
    return colors[circle.category] || '#6a52b3';
  };

  const formatSchedule = () => {
    const { frequency, dayOfWeek, time } = meetingSchedule;
    const frequencyMap = {
      weekly: 'Weekly',
      biweekly: 'Biweekly',
      monthly: 'Monthly'
    };
    return `${frequencyMap[frequency]} ${dayOfWeek}s at ${time}`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          animation: `${scaleUp} 0.3s forwards`,
          boxShadow: 8
        }
      }}
      onClick={() => onViewDetails(circle.id)}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{
          objectFit: 'cover'
        }}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Match Score Badge */}
        {matchScore !== null && (
          <Box sx={{ mb: 1 }}>
            <Chip
              label={`${Math.round(matchScore * 100)}% Match`}
              size="small"
              sx={{
                bgcolor: 'success.light',
                color: 'success.dark',
                fontWeight: 600
              }}
            />
          </Box>
        )}

        {/* Title */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
          {name}
        </Typography>

        {/* Experience Type Tags */}
        <Box sx={{ mb: 2, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {experienceTypes.slice(0, 3).map((type, index) => (
            <Chip
              key={index}
              label={type}
              size="small"
              sx={{
                bgcolor: getCategoryColor(circle.category),
                color: 'white',
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            />
          ))}
          {experienceTypes.length > 3 && (
            <Chip
              label={`+${experienceTypes.length - 3}`}
              size="small"
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>

        {/* Facilitator */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar
            src={facilitator.avatar_url}
            alt={facilitator.name}
            sx={{ width: 36, height: 36 }}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {facilitator.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Facilitator
            </Typography>
          </Box>
        </Box>

        {/* Meeting Info */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <ScheduleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatSchedule()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {location.type === 'virtual' ? (
              <>
                <VideoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Virtual
                </Typography>
              </>
            ) : (
              <>
                <PlaceIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {location.city}, {location.state}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* Values */}
        <Box sx={{ mb: 2, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {values.slice(0, 2).map((value, index) => (
            <Chip
              key={index}
              label={value}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
          {values.length > 2 && (
            <Chip
              label={`+${values.length - 2}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto'
          }}
        >
          {/* Members */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28 } }}>
              {members.slice(0, 4).map((member, index) => (
                <Avatar
                  key={index}
                  src={member.avatar_url}
                  alt={member.name}
                  sx={{ width: 28, height: 28 }}
                />
              ))}
            </AvatarGroup>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {members.length}/{capacity}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                members
              </Typography>
            </Box>
          </Box>

          {/* Join Button */}
          {showJoinButton && (
            <Button
              variant={isFull ? 'outlined' : 'contained'}
              size="small"
              disabled={isFull || status !== 'active'}
              onClick={(e) => {
                e.stopPropagation();
                if (!isFull) onJoin(circle.id);
              }}
              sx={{
                minWidth: 80,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              {isFull ? 'Full' : status === 'active' ? 'Join' : 'Inactive'}
            </Button>
          )}
        </Box>

        {/* Spots Left Indicator */}
        {!isFull && spotsLeft <= 3 && status === 'active' && (
          <Typography
            variant="caption"
            color="warning.main"
            sx={{ mt: 1, fontWeight: 600, textAlign: 'center' }}
          >
            Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CircleCard;
