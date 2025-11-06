import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  LinearProgress,
  useTheme,
  alpha
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  LocalFireDepartment as FireIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useGamification, RANKS } from '../context/GamificationContext';
import { fadeInUp } from '../theme/animations';

/**
 * Leaderboard Page
 * Displays top contributors and competitive rankings
 */
const Leaderboard = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const { userStats } = useGamification();
  const [activeTab, setActiveTab] = useState(0); // 0: Overall, 1: This Week, 2: This Month
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadLeaderboard = () => {
    // TODO: Replace with real API call
    // For now, generate mock leaderboard data
    const mockUsers = [
      {
        id: 1,
        name: 'Dr. Alice Johnson',
        username: 'alice_researcher',
        avatar: 'https://i.pravatar.cc/150?img=1',
        level: 47,
        xp: 23450,
        rank: 'Legend',
        stats: {
          posts_created: 234,
          papers_uploaded: 45,
          courses_created: 12,
          comments_made: 567,
          daily_streak: 89
        }
      },
      {
        id: 2,
        name: 'Bob Williams',
        username: 'bob_neuroscience',
        avatar: 'https://i.pravatar.cc/150?img=2',
        level: 43,
        xp: 19870,
        rank: 'Master',
        stats: {
          posts_created: 198,
          papers_uploaded: 38,
          courses_created: 8,
          comments_made: 445,
          daily_streak: 67
        }
      },
      {
        id: 3,
        name: 'Carol Davis',
        username: 'carol_therapist',
        avatar: 'https://i.pravatar.cc/150?img=3',
        level: 41,
        xp: 18230,
        rank: 'Master',
        stats: {
          posts_created: 176,
          papers_uploaded: 42,
          courses_created: 10,
          comments_made: 389,
          daily_streak: 54
        }
      },
      {
        id: 4,
        name: 'David Martinez',
        username: 'david_student',
        avatar: 'https://i.pravatar.cc/150?img=4',
        level: 38,
        xp: 15670,
        rank: 'Scholar',
        stats: {
          posts_created: 145,
          papers_uploaded: 28,
          courses_created: 5,
          comments_made: 312,
          daily_streak: 45
        }
      },
      {
        id: 5,
        name: 'Emily Rodriguez',
        username: 'emily_r',
        avatar: 'https://i.pravatar.cc/150?img=5',
        level: 35,
        xp: 13890,
        rank: 'Scholar',
        stats: {
          posts_created: 132,
          papers_uploaded: 25,
          courses_created: 6,
          comments_made: 289,
          daily_streak: 38
        }
      },
      {
        id: 6,
        name: 'Frank Chen',
        username: 'frank_researcher',
        avatar: 'https://i.pravatar.cc/150?img=6',
        level: 32,
        xp: 11230,
        rank: 'Scholar',
        stats: {
          posts_created: 98,
          papers_uploaded: 31,
          courses_created: 4,
          comments_made: 234,
          daily_streak: 29
        }
      },
      {
        id: 7,
        name: 'Grace Kim',
        username: 'grace_therapist',
        avatar: 'https://i.pravatar.cc/150?img=7',
        level: 29,
        xp: 9560,
        rank: 'Contributor',
        stats: {
          posts_created: 87,
          papers_uploaded: 19,
          courses_created: 3,
          comments_made: 198,
          daily_streak: 24
        }
      },
      {
        id: 8,
        name: 'Henry Park',
        username: 'henry_student',
        avatar: 'https://i.pravatar.cc/150?img=8',
        level: 27,
        xp: 8340,
        rank: 'Contributor',
        stats: {
          posts_created: 76,
          papers_uploaded: 15,
          courses_created: 2,
          comments_made: 167,
          daily_streak: 19
        }
      },
      {
        id: 9,
        name: 'Isabella Santos',
        username: 'isabella_researcher',
        avatar: 'https://i.pravatar.cc/150?img=9',
        level: 24,
        xp: 6780,
        rank: 'Contributor',
        stats: {
          posts_created: 65,
          papers_uploaded: 12,
          courses_created: 2,
          comments_made: 145,
          daily_streak: 15
        }
      },
      {
        id: 10,
        name: 'Jack Wilson',
        username: 'jack_therapist',
        avatar: 'https://i.pravatar.cc/150?img=10',
        level: 22,
        xp: 5890,
        rank: 'Learner',
        stats: {
          posts_created: 54,
          papers_uploaded: 9,
          courses_created: 1,
          comments_made: 123,
          daily_streak: 12
        }
      }
    ];

    // Add current user if not in top 10
    if (currentUser && userStats) {
      const currentUserInTop10 = mockUsers.some(u => u.id === currentUser.id);
      if (!currentUserInTop10) {
        // Find user's rank
        const userRankNumber = Object.keys(RANKS)
          .reverse()
          .find(level => userStats.level >= parseInt(level));
        const userRank = RANKS[userRankNumber];

        mockUsers.push({
          id: currentUser.id,
          name: currentUser.name || currentUser.username,
          username: currentUser.username,
          avatar: currentUser.avatar || '',
          level: userStats.level,
          xp: userStats.xp,
          rank: userRank.name,
          stats: {
            posts_created: userStats.posts_created || 0,
            papers_uploaded: userStats.papers_uploaded || 0,
            courses_created: userStats.courses_created || 0,
            comments_made: userStats.comments_made || 0,
            daily_streak: userStats.daily_streak || 0
          },
          isCurrentUser: true,
          position: '50+' // Placeholder
        });
      }
    }

    setLeaderboardData(mockUsers);
  };

  const getRankColor = useMemo(() => (rank) => {
    const rankEntry = Object.values(RANKS).find(r => r.name === rank);
    return rankEntry ? rankEntry.color : theme.palette.text.secondary;
  }, [theme.palette.text.secondary]);

  const getRankIcon = useMemo(() => (rank) => {
    const rankEntry = Object.values(RANKS).find(r => r.name === rank);
    return rankEntry ? rankEntry.icon : '🌱';
  }, []);

  const getMedalIcon = useMemo(() => (position) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  }, []);

  const getMedalColor = useMemo(() => (position) => {
    switch (position) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return 'transparent';
    }
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4, animation: `${fadeInUp} 0.6s ease-out` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrophyIcon sx={{ fontSize: 48, color: '#FFD700', mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight="bold">
                Leaderboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Top contributors in the GSAPS community
              </Typography>
            </Box>
          </Box>

          {/* Period Tabs */}
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            <Tab label="All Time" icon={<TrophyIcon />} iconPosition="start" />
            <Tab label="This Week" icon={<FireIcon />} iconPosition="start" />
            <Tab label="This Month" icon={<TrendingIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Top 3 Podium */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 2,
            animation: `${fadeInUp} 0.6s ease-out 0.1s backwards`
          }}
        >
          {leaderboardData.slice(0, 3).map((user, index) => {
            const positions = [1, 0, 2]; // Order: 2nd, 1st, 3rd
            const actualPosition = positions[index];
            const heights = ['180px', '220px', '160px'];
            const medals = ['🥈', '🥇', '🥉'];

            return (
              <Paper
                key={user.id}
                elevation={actualPosition === 1 ? 8 : 4}
                sx={{
                  width: '200px',
                  height: heights[actualPosition],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  background: actualPosition === 1
                    ? `linear-gradient(135deg, ${alpha('#FFD700', 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`
                    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.background.paper, 1)})`,
                  border: actualPosition === 1 ? `2px solid ${alpha('#FFD700', 0.5)}` : 'none',
                  order: actualPosition,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                  {medals[actualPosition]}
                </Typography>
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    border: `3px solid ${getMedalColor(actualPosition + 1)}`
                  }}
                />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {user.name.split(' ')[0]}
                  </Typography>
                  <Chip
                    label={`${getRankIcon(user.rank)} ${user.rank}`}
                    size="small"
                    sx={{
                      bgcolor: alpha(getRankColor(user.rank), 0.1),
                      color: getRankColor(user.rank),
                      fontWeight: 'bold',
                      mt: 1
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Level {user.level}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {user.xp.toLocaleString()} XP
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>

        {/* Full Leaderboard Table */}
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            animation: `${fadeInUp} 0.6s ease-out 0.2s backwards`
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Level</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>XP</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Posts</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Papers</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Courses</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  <FireIcon sx={{ fontSize: '1.2rem', verticalAlign: 'middle' }} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((user, index) => {
                const position = user.position || index + 1;
                const medal = getMedalIcon(position);
                const isCurrentUser = user.isCurrentUser || (currentUser && user.id === currentUser.id);

                return (
                  <TableRow
                    key={user.id}
                    sx={{
                      bgcolor: isCurrentUser ? alpha(theme.palette.primary.main, 0.05) : 'inherit',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08)
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {medal && (
                          <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                            {medal}
                          </Typography>
                        )}
                        <Typography
                          variant="body1"
                          fontWeight={position <= 3 ? 'bold' : 'normal'}
                          color={position <= 3 ? getMedalColor(position) : 'inherit'}
                        >
                          #{position}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
                        <Box>
                          <Typography variant="body1" fontWeight={isCurrentUser ? 'bold' : 'normal'}>
                            {user.name}
                            {isCurrentUser && (
                              <Chip
                                label="You"
                                size="small"
                                color="primary"
                                sx={{ ml: 1, height: 20 }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            @{user.username}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {user.level}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={((user.xp % 1000) / 1000) * 100}
                          sx={{ width: 60, mt: 0.5 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        {user.xp.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${getRankIcon(user.rank)} ${user.rank}`}
                        size="small"
                        sx={{
                          bgcolor: alpha(getRankColor(user.rank), 0.1),
                          color: getRankColor(user.rank),
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{user.stats.posts_created}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{user.stats.papers_uploaded}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{user.stats.courses_created}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={user.stats.daily_streak}
                        size="small"
                        icon={<FireIcon />}
                        color={user.stats.daily_streak >= 30 ? 'error' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Stats Footer */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
            animation: `${fadeInUp} 0.6s ease-out 0.3s backwards`
          }}
        >
          <Typography variant="h6" gutterBottom>
            <StarIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            How to Climb the Leaderboard
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            <li>
              <Typography variant="body2" color="text.secondary">
                Create quality posts and engage with the community (+10-20 XP per post)
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Upload research papers to build the knowledge base (+50 XP per paper)
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Create educational courses to teach others (+100 XP per course)
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Maintain daily login streaks for consistent growth (+5 XP per day)
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Complete achievements to unlock bonus XP rewards
              </Typography>
            </li>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Leaderboard;
