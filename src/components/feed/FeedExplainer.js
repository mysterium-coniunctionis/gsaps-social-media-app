import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Button,
  Divider,
  IconButton,
  Slider,
  Stack,
  Paper,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Info as InfoIcon,
  TrendingUp as TrendingIcon,
  Schedule as ScheduleIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  Topic as TopicIcon,
  Tune as TuneIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';

/**
 * FeedExplainer - Transparency component showing why content was recommended
 *
 * Features:
 * - Visual breakdown of recommendation factors
 * - Explains each scoring component
 * - Shows author affinity and topic relevance
 * - Allows users to tune their feed preferences
 * - Helps users understand and control the algorithm
 */
const FeedExplainer = ({
  open,
  onClose,
  post,
  explanation = [],
  userProfile,
  onUpdatePreferences
}) => {
  const [showTuning, setShowTuning] = useState(false);
  const [localPreferences, setLocalPreferences] = useState(
    userProfile?.topicInterests || {}
  );

  if (!post) return null;

  const getFactorIcon = (factor) => {
    const icons = {
      recency: <ScheduleIcon />,
      engagement: <TrendingIcon />,
      authorAffinity: <PersonIcon />,
      topicRelevance: <TopicIcon />,
      viralBoost: <FavoriteIcon />
    };
    return icons[factor] || <InfoIcon />;
  };

  const getFactorColor = (factor) => {
    const colors = {
      recency: '#4CAF50',
      engagement: '#FF9800',
      authorAffinity: '#2196F3',
      topicRelevance: '#9C27B0',
      viralBoost: '#F44336'
    };
    return colors[factor] || '#757575';
  };

  const getFactorDescription = (factor) => {
    const descriptions = {
      recency: 'This post is recent and fresh',
      engagement: 'Many people are interacting with this post',
      authorAffinity: 'You frequently engage with this author',
      topicRelevance: 'This matches your interests',
      viralBoost: 'This content is trending right now',
      diversity: 'Similar to recent posts you viewed'
    };
    return descriptions[factor] || 'Contributing factor';
  };

  const handleTopicChange = (topic, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [topic]: value
    }));
  };

  const handleSavePreferences = () => {
    if (onUpdatePreferences) {
      onUpdatePreferences(localPreferences);
    }
    setShowTuning(false);
  };

  const handleResetPreferences = () => {
    setLocalPreferences(userProfile?.topicInterests || {});
  };

  // Calculate total positive score
  const totalScore = explanation
    .filter(e => !e.isNegative)
    .reduce((sum, e) => sum + (e.percentage || 0), 0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(10px)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <LightbulbIcon sx={{ color: '#FF9800' }} />
            <Typography variant="h6" fontWeight={600}>
              Why you're seeing this
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Post Preview */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            bgcolor: 'rgba(0,0,0,0.02)',
            borderRadius: 2,
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5} mb={1}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              style={{ width: 32, height: 32, borderRadius: '50%' }}
            />
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {post.author.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                @{post.author.username}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" noWrap>
            {post.content.substring(0, 100)}...
          </Typography>
        </Paper>

        {/* Recommendation Factors */}
        <Box mb={3}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
            Recommendation Factors
          </Typography>

          {explanation.length === 0 && (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              No explanation data available for this post.
            </Alert>
          )}

          <Stack spacing={2.5}>
            {explanation.map((reason, index) => (
              <Box key={index}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box
                      sx={{
                        color: reason.isNegative ? '#757575' : getFactorColor(reason.factor),
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {getFactorIcon(reason.factor)}
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {reason.label}
                    </Typography>
                    <Tooltip title={getFactorDescription(reason.factor)} arrow>
                      <InfoIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'help' }} />
                    </Tooltip>
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: reason.isNegative ? '#757575' : getFactorColor(reason.factor) }}
                  >
                    {reason.isNegative ? '-' : '+'}{reason.percentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, reason.percentage)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: reason.isNegative ? '#757575' : getFactorColor(reason.factor),
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Author Affinity */}
        {userProfile?.authorAffinities && (
          <Box mb={3}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Your connection with {post.author.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, userProfile.authorAffinities[post.author.id] || 0)}
                sx={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#2196F3',
                    borderRadius: 3
                  }
                }}
              />
              <Typography variant="caption" fontWeight={600} color="primary">
                {userProfile.authorAffinities[post.author.id] || 0}/100
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              Based on your past interactions with their content
            </Typography>
          </Box>
        )}

        {/* Topic Relevance */}
        {post.tags && post.tags.length > 0 && (
          <Box mb={3}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Related Topics
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {post.tags.map((tag, index) => {
                const interest = userProfile?.topicInterests?.[tag] || 0;
                return (
                  <Tooltip
                    key={index}
                    title={`Your interest: ${interest}/100`}
                    arrow
                  >
                    <Chip
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: interest > 50 ? 'rgba(156, 39, 176, 0.1)' : 'rgba(0,0,0,0.05)',
                        color: interest > 50 ? '#9C27B0' : 'text.secondary',
                        fontWeight: interest > 50 ? 600 : 400,
                        border: interest > 50 ? '1px solid rgba(156, 39, 176, 0.3)' : 'none'
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Feed Tuning Section */}
        <Box>
          <Button
            startIcon={<TuneIcon />}
            onClick={() => setShowTuning(!showTuning)}
            variant="outlined"
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            {showTuning ? 'Hide' : 'Tune Your Feed'}
          </Button>

          {showTuning && (
            <Box mt={3}>
              <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                Adjust your topic interests to personalize your feed. Higher values show more content on these topics.
              </Alert>

              <Stack spacing={2.5}>
                {Object.entries(localPreferences).map(([topic, value]) => (
                  <Box key={topic}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2" fontWeight={500} textTransform="capitalize">
                        {topic.replace('-', ' ')}
                      </Typography>
                      <Chip
                        label={value}
                        size="small"
                        sx={{
                          minWidth: 45,
                          fontWeight: 600,
                          bgcolor: value > 70 ? '#4CAF50' : value > 40 ? '#FF9800' : '#757575',
                          color: 'white'
                        }}
                      />
                    </Box>
                    <Slider
                      value={value}
                      onChange={(e, newValue) => handleTopicChange(topic, newValue)}
                      min={0}
                      max={100}
                      step={5}
                      marks={[
                        { value: 0, label: 'Less' },
                        { value: 50, label: 'Neutral' },
                        { value: 100, label: 'More' }
                      ]}
                      sx={{
                        '& .MuiSlider-thumb': {
                          width: 16,
                          height: 16
                        },
                        '& .MuiSlider-track': {
                          height: 6
                        },
                        '& .MuiSlider-rail': {
                          height: 6
                        }
                      }}
                    />
                  </Box>
                ))}
              </Stack>

              <Box display="flex" gap={1} mt={3}>
                <Button
                  variant="contained"
                  onClick={handleSavePreferences}
                  fullWidth
                  sx={{ borderRadius: 2 }}
                >
                  Save Preferences
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleResetPreferences}
                  sx={{ borderRadius: 2 }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        {/* Algorithm Transparency Note */}
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 2,
            bgcolor: 'rgba(33, 150, 243, 0.05)',
            borderRadius: 2,
            border: '1px solid rgba(33, 150, 243, 0.1)'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            <strong>Transparency Note:</strong> Our algorithm combines multiple signals to personalize your feed
            while maintaining diversity. We never sell your data or manipulate your feed for commercial purposes.
            You're always in control.
          </Typography>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedExplainer;
