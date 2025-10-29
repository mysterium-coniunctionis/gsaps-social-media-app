import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  EmojiEvents as TrophyIcon,
  LocalFireDepartment as FireIcon,
  TrendingUp as TrendingIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGamification, RANKS } from '../context/GamificationContext';
import UserStatsCard from '../components/gamification/UserStatsCard';
import { fadeInUp } from '../theme/animations';

/**
 * User Profile Page
 * Displays user information, stats, achievements, and activity
 */
const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { currentUser } = useAuth();
  const { userStats } = useGamification();
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const loadProfile = () => {
    // TODO: Replace with real API call
    // For now, use mock data or current user data
    if (currentUser && (currentUser.username === username || currentUser.id.toString() === username)) {
      // Get user's rank
      const userLevel = userStats?.level || 1;
      const rankNumber = Object.keys(RANKS)
        .reverse()
        .find(level => userLevel >= parseInt(level));
      const rank = RANKS[rankNumber];

      setProfileData({
        id: currentUser.id,
        name: currentUser.name || currentUser.username,
        username: currentUser.username,
        email: currentUser.email,
        avatar: currentUser.avatar || '',
        bio: 'Passionate about psychedelic research and consciousness studies.',
        credentials: 'PhD Candidate, Neuroscience',
        location: 'San Francisco, CA',
        website: 'https://example.com',
        joined: new Date('2024-01-15'),
        verified: true,
        level: userLevel,
        xp: userStats?.xp || 0,
        rank: rank?.name || 'Novice',
        rankColor: rank?.color || '#9e9e9e',
        rankIcon: rank?.icon || '🌱',
        stats: {
          posts_created: userStats?.posts_created || 0,
          papers_uploaded: userStats?.papers_uploaded || 0,
          courses_created: userStats?.courses_created || 0,
          comments_made: userStats?.comments_made || 0,
          reactions_given: userStats?.reactions_given || 0,
          daily_streak: userStats?.daily_streak || 0,
          total_contributions: (userStats?.posts_created || 0) +
                             (userStats?.papers_uploaded || 0) +
                             (userStats?.courses_created || 0) +
                             (userStats?.comments_made || 0)
        },
        achievements: userStats?.achievements || []
      });
    } else {
      // Load other user's profile (mock data for now)
      setProfileData({
        id: 'other-user',
        name: 'Other User',
        username: username,
        avatar: 'https://i.pravatar.cc/150?img=5',
        bio: 'Researcher in the field of psychedelic studies.',
        credentials: 'PhD, Clinical Psychology',
        location: 'New York, NY',
        joined: new Date('2023-06-20'),
        verified: true,
        level: 25,
        xp: 12500,
        rank: 'Expert',
        rankColor: '#9c27b0',
        rankIcon: '⭐',
        stats: {
          posts_created: 145,
          papers_uploaded: 23,
          courses_created: 5,
          comments_made: 289,
          reactions_given: 456,
          daily_streak: 42,
          total_contributions: 462
        },
        achievements: []
      });
    }
  };

  if (!profileData) {
    return (
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Typography>Loading profile...</Typography>
      </Container>
    );
  }

  const isOwnProfile = currentUser && (
    currentUser.username === profileData.username ||
    currentUser.id === profileData.id
  );

  // Calculate level progress
  const currentLevelXP = userStats?.xp || 0;
  const nextLevel = (profileData.level || 0) + 1;
  const xpForNextLevel = 1000; // Simplified for display
  const progressPercent = ((currentLevelXP % xpForNextLevel) / xpForNextLevel) * 100;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Profile Header */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.background.paper, 1)})`,
            animation: `${fadeInUp} 0.6s ease-out`
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <Avatar
              src={profileData.avatar}
              sx={{
                width: 150,
                height: 150,
                border: `4px solid ${profileData.rankColor}`,
                boxShadow: 4
              }}
            />

            {/* Profile Info */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h4" fontWeight="bold">
                  {profileData.name}
                </Typography>
                {profileData.verified && (
                  <Chip
                    label="Verified"
                    color="primary"
                    size="small"
                    icon={<StarIcon />}
                  />
                )}
              </Box>

              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{profileData.username}
              </Typography>

              {profileData.credentials && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {profileData.credentials}
                </Typography>
              )}

              {/* Rank Badge */}
              <Box sx={{ my: 2 }}>
                <Chip
                  label={`${profileData.rankIcon} ${profileData.rank}`}
                  sx={{
                    bgcolor: alpha(profileData.rankColor, 0.2),
                    color: profileData.rankColor,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    height: 36,
                    px: 1
                  }}
                />
              </Box>

              {/* Level & XP */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Level {profileData.level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profileData.xp.toLocaleString()} XP
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: profileData.rankColor
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {Math.round(progressPercent)}% to Level {nextLevel}
                </Typography>
              </Box>

              {/* Bio */}
              {profileData.bio && (
                <Typography variant="body2" sx={{ mb: 2, maxWidth: 600 }}>
                  {profileData.bio}
                </Typography>
              )}

              {/* Meta Info */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                {profileData.location && (
                  <Chip
                    icon={<PersonIcon />}
                    label={profileData.location}
                    size="small"
                    variant="outlined"
                  />
                )}
                {profileData.joined && (
                  <Chip
                    icon={<CalendarIcon />}
                    label={`Joined ${profileData.joined.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                    size="small"
                    variant="outlined"
                  />
                )}
                {profileData.stats.daily_streak > 0 && (
                  <Chip
                    icon={<FireIcon />}
                    label={`${profileData.stats.daily_streak} day streak`}
                    size="small"
                    color={profileData.stats.daily_streak >= 30 ? 'error' : 'default'}
                  />
                )}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {isOwnProfile ? (
                  <Button
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                    onClick={() => navigate('/settings')}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      startIcon={<MessageIcon />}
                      onClick={() => navigate('/messages')}
                      title={`Send a message to ${profileData.username}`}
                    >
                      Message
                    </Button>
                    <Button variant="outlined">
                      Follow
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={2}
              sx={{
                animation: `${fadeInUp} 0.6s ease-out 0.1s backwards`
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ArticleIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {profileData.stats.posts_created}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={2}
              sx={{
                animation: `${fadeInUp} 0.6s ease-out 0.2s backwards`
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ArticleIcon sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Papers
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {profileData.stats.papers_uploaded}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={2}
              sx={{
                animation: `${fadeInUp} 0.6s ease-out 0.3s backwards`
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SchoolIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Courses
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {profileData.stats.courses_created}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              elevation={2}
              sx={{
                animation: `${fadeInUp} 0.6s ease-out 0.4s backwards`
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Total XP
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {profileData.xp.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Content Tabs */}
        <Paper
          elevation={2}
          sx={{
            animation: `${fadeInUp} 0.6s ease-out 0.5s backwards`
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Activity" icon={<TrendingIcon />} iconPosition="start" />
            <Tab label="Achievements" icon={<TrophyIcon />} iconPosition="start" />
            <Tab label="Stats" icon={<StarIcon />} iconPosition="start" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Activity Tab */}
            {activeTab === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activity feed coming soon...
                </Typography>
              </Box>
            )}

            {/* Achievements Tab */}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Achievements
                </Typography>
                <Grid container spacing={2}>
                  {profileData.achievements.length > 0 ? (
                    profileData.achievements.map((achievement) => (
                      <Grid item xs={6} sm={4} md={3} key={achievement.id}>
                        <Card
                          elevation={1}
                          sx={{
                            textAlign: 'center',
                            p: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.05)
                          }}
                        >
                          <Typography variant="h3">{achievement.icon}</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {achievement.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            +{achievement.xp} XP
                          </Typography>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        No achievements unlocked yet. Keep contributing to earn achievements!
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}

            {/* Stats Tab */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Detailed Statistics
                </Typography>
                {isOwnProfile && userStats ? (
                  <UserStatsCard fullMode />
                ) : (
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h5" fontWeight="bold">
                          {profileData.stats.comments_made}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Comments
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h5" fontWeight="bold">
                          {profileData.stats.reactions_given}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Reactions
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <Typography variant="h5" fontWeight="bold">
                          {profileData.stats.total_contributions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Contributions
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfile;
