import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Chip,
  Button,
  IconButton,
  Collapse,
  CircularProgress,
  Tooltip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Message as MessageIcon,
  PersonAdd as PersonAddIcon,
  Info as InfoIcon,
  LocationOn as LocationOnIcon,
  Work as WorkIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * Match Card Component
 * Displays a recommended professional connection with compatibility details
 */
const MatchCard = ({ match, onConnect, compact = false }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [connecting, setConnecting] = useState(false);

  if (!match || !match.profile) return null;

  const { profile, totalScore, breakdown, reasoning } = match;

  const {
    name,
    avatar_url,
    title,
    organization,
    location,
    expertise,
    yearsExperience,
    publications,
    responseRate,
    mentoringCount
  } = profile;

  // Calculate color based on match score
  const getScoreColor = (score) => {
    if (score >= 80) return '#2e7d32'; // Green
    if (score >= 60) return '#1976d2'; // Blue
    if (score >= 40) return '#ed6c02'; // Orange
    return '#757575'; // Gray
  };

  const scoreColor = getScoreColor(totalScore);

  // Animated ring component
  const MatchRing = ({ score, size = 80 }) => {
    const radius = size / 2 - 4;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <svg width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: scoreColor }}>
            {score}%
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
            Match
          </Typography>
        </Box>
      </Box>
    );
  };

  const handleConnect = async () => {
    setConnecting(true);
    try {
      await onConnect?.(profile);
    } finally {
      setConnecting(false);
    }
  };

  const handleViewProfile = () => {
    navigate(`/profile/${profile.username}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header with Avatar and Match Score */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar
            src={avatar_url}
            sx={{
              width: 64,
              height: 64,
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={handleViewProfile}
          >
            {name?.charAt(0)}
          </Avatar>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' }
              }}
              onClick={handleViewProfile}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <WorkIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" noWrap>
                {organization}
              </Typography>
            </Box>
          </Box>

          <MatchRing score={totalScore} />
        </Box>

        {/* Location and Experience */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {location}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {yearsExperience} years exp.
          </Typography>
        </Box>

        {/* Compatibility Breakdown */}
        {!compact && breakdown && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '0.85rem' }}>
              Compatibility Breakdown
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(breakdown).slice(0, 3).map(([key, value]) => (
                <Chip
                  key={key}
                  label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: value >= 70 ? 'success.main' : 'default',
                    color: value >= 70 ? 'success.main' : 'text.secondary'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Why Matched */}
        {reasoning && reasoning.length > 0 && (
          <Box
            sx={{
              bgcolor: 'action.hover',
              p: 1.5,
              borderRadius: 1,
              mb: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <InfoIcon sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Why matched
              </Typography>
            </Box>
            <Box component="ul" sx={{ margin: 0, pl: 2 }}>
              {reasoning.slice(0, expanded ? undefined : 2).map((reason, index) => (
                <Typography
                  component="li"
                  key={index}
                  variant="caption"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {reason}
                </Typography>
              ))}
            </Box>
            {reasoning.length > 2 && (
              <Button
                size="small"
                onClick={() => setExpanded(!expanded)}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s'
                    }}
                  />
                }
                sx={{ mt: 0.5, fontSize: '0.7rem' }}
              >
                {expanded ? 'Show less' : `+${reasoning.length - 2} more`}
              </Button>
            )}
          </Box>
        )}

        {/* Expertise Tags */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          {expertise?.slice(0, 3).map((exp, index) => (
            <Chip
              key={index}
              label={exp}
              size="small"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
          {expertise?.length > 3 && (
            <Chip
              label={`+${expertise.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          )}
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Tooltip title="Publications">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrophyIcon sx={{ fontSize: 16, color: 'primary.main' }} />
              <Typography variant="caption" color="text.secondary">
                {publications} papers
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Response rate">
            <Typography variant="caption" color="text.secondary">
              {Math.round(responseRate * 100)}% response
            </Typography>
          </Tooltip>
          {mentoringCount > 0 && (
            <Tooltip title="Current mentees">
              <Typography variant="caption" color="text.secondary">
                {mentoringCount} mentees
              </Typography>
            </Tooltip>
          )}
        </Box>

        {/* Mutual Connections */}
        {breakdown?.mutualConnections > 0 && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            {Math.round((breakdown.mutualConnections / 100) * 7)} mutual connections
          </Typography>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={connecting ? <CircularProgress size={16} /> : <MessageIcon />}
            onClick={handleConnect}
            disabled={connecting}
            fullWidth
            sx={{ flexGrow: 1 }}
          >
            {connecting ? 'Connecting...' : 'Quick Intro'}
          </Button>
          <Tooltip title="View full profile">
            <IconButton
              onClick={handleViewProfile}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1
              }}
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
