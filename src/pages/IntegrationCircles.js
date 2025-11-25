import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Paper,
  Tabs,
  Tab,
  alpha,
  useTheme,
  Skeleton
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingIcon,
  People as PeopleIcon,
  Favorite as HeartIcon,
  SupportAgent as SupportIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import CircleCard from '../components/circles/CircleCard';
import GlassCard from '../components/common/GlassCard';
import Toast from '../components/common/Toast';
import {
  circles,
  CIRCLE_CATEGORIES,
  EXPERIENCE_TYPES
} from '../data/circlesData';
import { CIRCLE_GUIDELINES } from '../data/circleResources';
import { fadeInUp } from '../theme/animations';

const IntegrationCircles = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { awardXP } = useGamification();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Get user's circles
  const userCircles = useMemo(() => {
    if (!currentUser) return [];
    return circles.filter(circle => 
      circle.members.some(m => m.id === currentUser.id) ||
      circle.facilitator.id === currentUser.id
    );
  }, [currentUser]);

  // Filter circles
  const filteredCircles = useMemo(() => {
    let result = circles;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(circle =>
        circle.name.toLowerCase().includes(query) ||
        circle.description.toLowerCase().includes(query) ||
        circle.facilitator.name.toLowerCase().includes(query) ||
        circle.topics.some(t => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter(circle => circle.category === categoryFilter);
    }

    // Experience type filter
    if (experienceFilter !== 'all') {
      result = result.filter(circle =>
        circle.experienceTypes.includes(experienceFilter) ||
        circle.experienceTypes.includes('general')
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      result = result.filter(circle => circle.location.type === locationFilter);
    }

    return result;
  }, [searchQuery, categoryFilter, experienceFilter, locationFilter]);

  // Handle joining a circle
  const handleJoinCircle = async (circleId) => {
    if (!currentUser) {
      setToast({
        open: true,
        message: 'Please log in to join a circle',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Award XP for joining (using custom amount since JOIN_CIRCLE isn't in XP_ACTIONS)
    awardXP('JOIN_CIRCLE', 10);
    
    setToast({
      open: true,
      message: 'Successfully joined the circle! +10 XP',
      severity: 'success'
    });
    
    setLoading(false);
  };

  // Handle viewing circle details
  const handleViewCircle = (circleId) => {
    navigate(`/circles/${circleId}`);
  };

  // Stats for hero section
  const stats = [
    { label: 'Active Circles', value: circles.filter(c => c.status === 'active').length, icon: <PeopleIcon /> },
    { label: 'Total Members', value: circles.reduce((sum, c) => sum + c.members.length, 0), icon: <HeartIcon /> },
    { label: 'Weekly Meetings', value: circles.filter(c => c.meetingSchedule.frequency === 'weekly').length, icon: <TrendingIcon /> }
  ];

  const categoryLabels = {
    'psychedelic-integration': 'Psychedelic Integration',
    'preparation': 'Preparation',
    'harm-reduction': 'Harm Reduction',
    'clinical-practitioners': 'Clinical Practitioners',
    'researchers': 'Researchers',
    'spiritual-exploration': 'Spiritual Exploration'
  };

  return (
    <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          mb: 4,
          p: { xs: 3, md: 6 },
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Integration Circles
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3, maxWidth: 600 }}>
              Find your community. Join peer-led circles for psychedelic integration, preparation, and support.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {currentUser && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/circles/create')}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    '&:hover': { bgcolor: alpha('#fff', 0.9) }
                  }}
                >
                  Create a Circle
                </Button>
              )}
              <Button
                variant="outlined"
                startIcon={<SupportIcon />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: 'white', bgcolor: alpha('#fff', 0.1) }
                }}
                href="tel:623-473-7433"
              >
                Crisis Support: 62-FIRESIDE
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: alpha('#fff', 0.2),
                    borderRadius: 2,
                    p: 2,
                    textAlign: 'center',
                    minWidth: 100
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="caption">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs for navigation */}
      {currentUser && (
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="All Circles" />
            <Tab label={`My Circles (${userCircles.length})`} />
          </Tabs>
        </Box>
      )}

      {/* Filters */}
      <GlassCard sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search circles, topics, facilitators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {CIRCLE_CATEGORIES.map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {categoryLabels[cat] || cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Experience Type</InputLabel>
              <Select
                value={experienceFilter}
                label="Experience Type"
                onChange={(e) => setExperienceFilter(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                {EXPERIENCE_TYPES.map(type => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                label="Location"
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="virtual">Virtual Only</MenuItem>
                <MenuItem value="in-person">In-Person Only</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={0.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Chip
              icon={<FilterIcon />}
              label={`${filteredCircles.length} circles`}
              color="primary"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </GlassCard>

      {/* Guidelines Banner */}
      <GlassCard sx={{ mb: 4, p: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <HeartIcon color="primary" />
          <Typography variant="body2">
            <strong>Circle Guidelines:</strong> {CIRCLE_GUIDELINES.general.principles.slice(0, 3).map(p => p.name).join(' • ')}
          </Typography>
          <Button 
            size="small" 
            onClick={() => navigate('/circles/1')}
            aria-label="View all circle guidelines"
          >
            View All Guidelines
          </Button>
        </Box>
      </GlassCard>

      {/* Circles Grid */}
      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <Skeleton variant="rounded" height={400} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {activeTab === 0 ? (
            // All Circles
            <Grid container spacing={3}>
              {filteredCircles.length > 0 ? (
                filteredCircles.map((circle) => (
                  <Grid item xs={12} sm={6} md={4} key={circle.id}>
                    <CircleCard
                      circle={circle}
                      onJoin={handleJoinCircle}
                      onViewDetails={handleViewCircle}
                      showJoinButton={!!currentUser}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No circles found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Try adjusting your filters or search terms
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('all');
                        setExperienceFilter('all');
                        setLocationFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Paper>
                </Grid>
              )}
            </Grid>
          ) : (
            // My Circles
            <Grid container spacing={3}>
              {userCircles.length > 0 ? (
                userCircles.map((circle) => (
                  <Grid item xs={12} sm={6} md={4} key={circle.id}>
                    <CircleCard
                      circle={circle}
                      onJoin={handleJoinCircle}
                      onViewDetails={handleViewCircle}
                      showJoinButton={false}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      You haven't joined any circles yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Browse available circles and find your community
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => setActiveTab(0)}
                    >
                      Browse Circles
                    </Button>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </>
      )}

      {/* Crisis Resources Footer */}
      <Paper
        sx={{
          mt: 6,
          p: 3,
          bgcolor: alpha(theme.palette.warning.main, 0.1),
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SupportIcon color="warning" /> Crisis Support Resources
        </Typography>
        <Grid container spacing={2}>
          {CIRCLE_GUIDELINES.crisisResources.resources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="subtitle2" fontWeight={600}>
                {resource.name}
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={600}>
                {resource.number}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {resource.hours}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Toast notifications */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
};

export default IntegrationCircles;
