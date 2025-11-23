import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Container,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import {
  School as SchoolIcon,
  LibraryBooks as LibraryIcon,
  EmojiEvents as TrophyIcon,
  People as PeopleIcon,
  Event as EventIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  CoPresent as CoPresentIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { fadeInUp } from '../theme/animations';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  // Platform statistics
  const stats = [
    { label: 'Active Members', value: '2,500+', icon: <PeopleIcon /> },
    { label: 'Graduate Courses', value: '50+', icon: <SchoolIcon /> },
    { label: 'Research Papers', value: '1,200+', icon: <LibraryIcon /> },
    { label: 'CE Credits Available', value: '500+', icon: <VerifiedIcon /> }
  ];

  // Featured courses
  const featuredCourses = [
    {
      title: 'Psychedelic-Assisted Therapy',
      instructor: 'Dr. Jane Smith',
      ceCredits: 15,
      students: 142,
      rating: 4.8,
      price: 'Free',
      image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400'
    },
    {
      title: 'MDMA-Assisted Therapy for PTSD',
      instructor: 'Dr. Michael Chen',
      ceCredits: 24,
      students: 89,
      rating: 4.9,
      price: '$299',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
    },
    {
      title: 'Neuroscience of Psychedelics',
      instructor: 'Prof. Sarah Rodriguez',
      ceCredits: 20,
      students: 67,
      rating: 4.7,
      price: '$399',
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400'
    }
  ];

  // Key features
  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Graduate-Level Courses',
      description: 'Comprehensive post-graduate courses with full curriculum, quizzes, and 3-24 CE credits. TutorLMS-style learning platform.',
      link: '/courses',
      color: theme.palette.primary.main
    },
    {
      icon: <LibraryIcon sx={{ fontSize: 40 }} />,
      title: 'Research Library',
      description: 'Member-driven repository of 1,200+ peer-reviewed papers with citation export, reviews, and discussions.',
      link: '/library',
      color: theme.palette.secondary.main
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40 }} />,
      title: 'Gamification & Leaderboards',
      description: 'Earn XP for contributions, level up through 50 levels, unlock achievements, and compete on leaderboards.',
      link: '/leaderboard',
      color: '#FFD700'
    },
    {
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      title: 'Events & Networking',
      description: 'Guest lectures, conferences, book clubs, workshops, and networking events with field leaders.',
      link: '/events',
      color: theme.palette.success.main
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Professional Community',
      description: 'Connect with researchers, clinicians, students, and advocates. Join specialized interest groups.',
      link: '/members',
      color: theme.palette.info.main
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 40 }} />,
      title: 'Activity Feed & Engagement',
      description: 'Share updates, react, comment, mention colleagues, and stay current with community discussions.',
      link: '/feed',
      color: theme.palette.warning.main
    },
    {
      icon: <CoPresentIcon sx={{ fontSize: 40 }} />,
      title: 'Live Symposia',
      description: 'Join moderated rooms with live agenda, stage chat, and AI notetaking.',
      link: '/symposia/symp-001',
      color: theme.palette.secondary.light
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          mb: 6,
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
          animation: `${fadeInUp} 0.8s ease-out`
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                component="h1"
                variant="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                The Gold Standard in Psychedelic Education
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{
                  opacity: 0.95,
                  mb: 3,
                  fontSize: { xs: '1.1rem', md: '1.4rem' }
                }}
              >
                Join 2,500+ professionals in the world's most comprehensive platform for psychedelic research, education, and collaboration.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <Chip
                  label="50+ Graduate Courses"
                  sx={{ bgcolor: alpha('#fff', 0.3), color: 'white', fontWeight: 'bold' }}
                />
                <Chip
                  label="500+ CE Credits"
                  sx={{ bgcolor: alpha('#fff', 0.3), color: 'white', fontWeight: 'bold' }}
                />
                <Chip
                  label="1,200+ Papers"
                  sx={{ bgcolor: alpha('#fff', 0.3), color: 'white', fontWeight: 'bold' }}
                />
                <Chip
                  label="Gamification"
                  sx={{ bgcolor: alpha('#fff', 0.3), color: 'white', fontWeight: 'bold' }}
                />
              </Box>

              {!currentUser ? (
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/register"
                    sx={{
                      bgcolor: 'white',
                      color: theme.palette.primary.main,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: alpha('#fff', 0.9)
                      }
                    }}
                  >
                    Join Free Today
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/courses"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: alpha('#fff', 0.1)
                      }
                    }}
                  >
                    Browse Courses
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/feed"
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.9)
                    }
                  }}
                >
                  Go to Dashboard
                </Button>
              )}
            </Grid>

            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    bgcolor: alpha('#fff', 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 3s infinite'
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 150, opacity: 0.8 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Stats Section */}
        <Grid
          container
          spacing={3}
          sx={{
            mb: 8,
            animation: `${fadeInUp} 0.8s ease-out 0.2s backwards`
          }}
        >
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.background.paper, 1)})`,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" component="p" fontWeight="bold" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ animation: `${fadeInUp} 0.8s ease-out 0.3s backwards` }}
          >
            Comprehensive Platform Features
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            paragraph
            sx={{ animation: `${fadeInUp} 0.8s ease-out 0.4s backwards`, mb: 6 }}
          >
            Everything you need for professional development in psychedelic science
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                sx={{ animation: `${fadeInUp} 0.8s ease-out ${0.5 + index * 0.1}s backwards` }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: 8
                    }
                  }}
                  onClick={() => navigate(feature.link)}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: feature.color,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                    >
                      {feature.icon}
                      <Typography variant="h5" component="div" fontWeight="bold">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                    <Button
                      size="small"
                      sx={{ mt: 2 }}
                      endIcon={<TrendingIcon />}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Courses Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3" component="h2" fontWeight="bold">
              Featured Courses
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/courses"
              endIcon={<SchoolIcon />}
            >
              View All Courses
            </Button>
          </Box>

          <Grid container spacing={4}>
            {featuredCourses.map((course, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6
                    }
                  }}
                  onClick={() => navigate('/courses')}
                >
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${course.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <CardContent>
                    <Chip
                      label={`${course.ceCredits} CE Credits`}
                      size="small"
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="h6" component="p" fontWeight="bold" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {course.instructor}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ color: '#FFD700', fontSize: 18 }} />
                        <Typography variant="body2">{course.rating}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({course.students})
                        </Typography>
                      </Box>
                      <Typography variant="h6" component="p" fontWeight="bold" color="primary">
                        {course.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        {!currentUser && (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
              borderRadius: 3,
              mb: 6
            }}
          >
            <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
              Ready to Join the Community?
            </Typography>
            <Typography variant="h6" component="p" color="text.secondary" paragraph>
              Start learning, contributing, and advancing your career in psychedelic science today.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
            >
              Create Free Account
            </Button>
          </Paper>
        )}

        {/* About Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
            About GSAPS
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            The Graduate Student Association for Psychedelic Studies (GSAPS) is the world's premier platform for collaboration among students, trainees, scholars, and professionals engaged in psychedelic learning, teaching, research, and practice.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Our comprehensive platform combines graduate-level education (50+ courses with 500+ CE credits), a member-driven research library (1,200+ papers), competitive gamification (50 levels, leaderboards, achievements), and vibrant community engagement (events, networking, discussions).
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Join 2,500+ professionals who are shaping the future of psychedelic science and therapy.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
