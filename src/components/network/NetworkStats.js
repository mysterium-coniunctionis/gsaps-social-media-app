import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Handshake as HandshakeIcon,
  TrendingUp as TrendingUpIcon,
  Message as MessageIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

/**
 * Network Analytics Component
 * Displays user's networking statistics and metrics
 */
const NetworkStats = ({ analytics, loading = false }) => {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Network Analytics</Typography>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return null;
  }

  const {
    totalConnections = 0,
    mentoringRelationships = 0,
    collaborationProjects = 0,
    averageResponseRate = 0,
    growthRate = 0,
    activeConversations = 0,
    completedProjects = 0
  } = analytics;

  const stats = [
    {
      label: 'Total Connections',
      value: totalConnections,
      icon: PeopleIcon,
      color: '#1976d2'
    },
    {
      label: 'Mentoring Relationships',
      value: mentoringRelationships,
      icon: SchoolIcon,
      color: '#2e7d32'
    },
    {
      label: 'Active Collaborations',
      value: collaborationProjects,
      icon: HandshakeIcon,
      color: '#ed6c02'
    },
    {
      label: 'Response Rate',
      value: `${Math.round(averageResponseRate * 100)}%`,
      icon: MessageIcon,
      color: '#9c27b0'
    },
    {
      label: 'Network Growth',
      value: `+${Math.round(growthRate * 100)}%`,
      icon: TrendingUpIcon,
      color: '#0288d1',
      subtitle: 'This month'
    },
    {
      label: 'Completed Projects',
      value: completedProjects,
      icon: CheckCircleIcon,
      color: '#388e3c'
    }
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Network Analytics
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 2
                    }
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 40,
                      color: stat.color,
                      mb: 1
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: stat.color,
                      mb: 0.5
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block' }}
                  >
                    {stat.label}
                  </Typography>
                  {stat.subtitle && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.65rem' }}
                    >
                      {stat.subtitle}
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Network Growth Visualization */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Active Conversations
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min((activeConversations / totalConnections) * 100, 100)}
              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" color="text.secondary">
              {activeConversations} / {totalConnections}
            </Typography>
          </Box>
        </Box>

        {/* Engagement Metrics */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Project Completion Rate
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min((completedProjects / (collaborationProjects + completedProjects || 1)) * 100, 100)}
              sx={{
                flexGrow: 1,
                height: 8,
                borderRadius: 4,
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#388e3c'
                }
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {Math.round((completedProjects / (collaborationProjects + completedProjects || 1)) * 100)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NetworkStats;
