import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Tooltip,
  Grid,
  alpha
} from '@mui/material';
import {
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  EmojiEvents as TrophyIcon,
  Whatshot as FireIcon
} from '@mui/icons-material';
import { useGamification } from '../../context/GamificationContext';

/**
 * UserStatsCard Component
 * Displays user's gamification stats, level, and progress
 */
const UserStatsCard = ({ compact = false }) => {
  const {
    userStats,
    loading,
    getCurrentRank,
    getLevelProgress
  } = useGamification();

  if (loading || !userStats) {
    return null;
  }

  const rank = getCurrentRank(userStats.level);
  const progress = getLevelProgress();
  const { xp, level, achievements, stats } = userStats;

  if (compact) {
    return (
      <Card
        sx={{
          background: `linear-gradient(135deg, ${alpha(rank.color, 0.1)} 0%, ${alpha(rank.color, 0.05)} 100%)`,
          border: `2px solid ${alpha(rank.color, 0.3)}`
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${rank.color}, ${alpha(rank.color, 0.6)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}
            >
              {rank.icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                Level {level}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rank.name}
              </Typography>
            </Box>
            <Chip
              label={`${xp.toLocaleString()} XP`}
              color="primary"
              size="small"
              icon={<StarIcon />}
            />
          </Box>

          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Progress to Level {level + 1}
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {progress.percent.toFixed(0)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress.percent}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: alpha(rank.color, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${rank.color}, ${alpha(rank.color, 0.7)})`,
                  borderRadius: 4
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              {progress.current.toLocaleString()} / {progress.needed.toLocaleString()} XP
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Full view
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(rank.color, 0.1)} 0%, ${alpha(rank.color, 0.05)} 100%)`,
        border: `2px solid ${alpha(rank.color, 0.3)}`
      }}
    >
      <CardContent>
        {/* Header with Level and Rank */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${rank.color}, ${alpha(rank.color, 0.6)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: `0 4px 20px ${alpha(rank.color, 0.4)}`
            }}
          >
            {rank.icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              Level {level}
            </Typography>
            <Typography variant="h6" sx={{ color: rank.color, fontWeight: 600 }}>
              {rank.name}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Total XP
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="primary.main">
              {xp.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress to Level {level + 1}
            </Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ color: rank.color }}>
              {progress.percent.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress.percent}
            sx={{
              height: 12,
              borderRadius: 6,
              bgcolor: alpha(rank.color, 0.1),
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${rank.color}, ${alpha(rank.color, 0.7)})`,
                borderRadius: 6
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            {progress.current.toLocaleString()} / {progress.needed.toLocaleString()} XP needed
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Tooltip title="Total posts and comments">
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#2196f3', 0.1), borderRadius: 2 }}>
                <TrendingIcon sx={{ fontSize: 32, color: '#2196f3', mb: 0.5 }} />
                <Typography variant="h6" fontWeight="bold">
                  {(stats.posts_created + stats.comments_created).toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Contributions
                </Typography>
              </Box>
            </Tooltip>
          </Grid>

          <Grid item xs={6}>
            <Tooltip title="Papers uploaded">
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#4caf50', 0.1), borderRadius: 2 }}>
                <TrophyIcon sx={{ fontSize: 32, color: '#4caf50', mb: 0.5 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.papers_uploaded}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Papers
                </Typography>
              </Box>
            </Tooltip>
          </Grid>

          <Grid item xs={6}>
            <Tooltip title="Courses created">
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#ff9800', 0.1), borderRadius: 2 }}>
                <StarIcon sx={{ fontSize: 32, color: '#ff9800', mb: 0.5 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.courses_created}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Courses
                </Typography>
              </Box>
            </Tooltip>
          </Grid>

          <Grid item xs={6}>
            <Tooltip title="Login streak">
              <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: alpha('#f44336', 0.1), borderRadius: 2 }}>
                <FireIcon sx={{ fontSize: 32, color: '#f44336', mb: 0.5 }} />
                <Typography variant="h6" fontWeight="bold">
                  {stats.login_streak}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Day Streak
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>

        {/* Achievements */}
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Achievements Unlocked
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon sx={{ color: 'gold' }} />
            <Typography variant="h5" fontWeight="bold">
              {achievements.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              / {require('../../context/GamificationContext').ACHIEVEMENTS.length}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserStatsCard;
