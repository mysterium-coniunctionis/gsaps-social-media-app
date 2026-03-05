// VirtualSpaces.js - Hub for browsing and entering virtual 3D spaces
// Gallery view with previews, filters, and upcoming events

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Button,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  alpha,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  People as PeopleIcon,
  Event as EventIcon,
  VrpanoOutlined as VRIcon,
  DesktopWindows as DesktopIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  PersonOutline as PersonIcon,
  Theaters as TheaterIcon
} from '@mui/icons-material';
import { getAllSpaces, getUpcomingEvents } from '../api/virtualSpaceService';
import { useAuth } from '../context/AuthContext';
import { fadeInUp } from '../theme/animations';
import { format } from 'date-fns';

const VirtualSpaces = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { currentUser } = useAuth();

  // State
  const [spaces, setSpaces] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('desktop'); // desktop or vr

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [spacesResult, eventsResult] = await Promise.all([
        getAllSpaces(),
        getUpcomingEvents()
      ]);

      if (spacesResult.success) {
        setSpaces(spacesResult.data);
      }
      if (eventsResult.success) {
        setEvents(eventsResult.data);
      }
    } catch (error) {
      console.error('Error loading virtual spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter spaces
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || space.type === filterType;

    return matchesSearch && matchesType;
  });

  // Get space type icon
  const getSpaceTypeIcon = (type) => {
    switch (type) {
      case 'symposium':
        return <TheaterIcon />;
      case 'networking':
        return <PeopleIcon />;
      case 'study':
        return <PersonIcon />;
      case 'gallery':
        return <StarIcon />;
      default:
        return <VRIcon />;
    }
  };

  // Get space type color
  const getSpaceTypeColor = (type) => {
    switch (type) {
      case 'symposium':
        return theme.palette.primary.main;
      case 'networking':
        return theme.palette.success.main;
      case 'study':
        return theme.palette.info.main;
      case 'gallery':
        return theme.palette.secondary.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Enter space
  const enterSpace = (spaceId) => {
    navigate(`/virtual-space/${spaceId}?mode=${viewMode}`);
  };

  // Render space card
  const renderSpaceCard = (space) => (
    <Grid item xs={12} sm={6} md={4} key={space.id}>
      <Card
        elevation={3}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 8
          }
        }}
      >
        <CardActionArea onClick={() => enterSpace(space.id)}>
          <CardMedia
            component="img"
            height="200"
            image={space.thumbnail}
            alt={space.name}
            sx={{
              filter: 'brightness(0.9)',
              '&:hover': {
                filter: 'brightness(1.1)'
              }
            }}
          />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ color: getSpaceTypeColor(space.type), mr: 1 }}>
                {getSpaceTypeIcon(space.type)}
              </Box>
              <Typography variant="h6" component="h3" fontWeight="bold">
                {space.name}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {space.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {space.tags.slice(0, 3).map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {space.currentOccupancy}/{space.capacity}
                </Typography>
              </Box>
              <Chip
                label={space.type}
                size="small"
                sx={{
                  bgcolor: alpha(getSpaceTypeColor(space.type), 0.2),
                  color: getSpaceTypeColor(space.type),
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </CardContent>
        </CardActionArea>

        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={viewMode === 'vr' ? <VRIcon /> : <DesktopIcon />}
            onClick={() => enterSpace(space.id)}
          >
            Enter Space
          </Button>
        </Box>
      </Card>
    </Grid>
  );

  // Render event card
  const renderEventCard = (event) => (
    <Card
      key={event.id}
      elevation={2}
      sx={{
        mb: 2,
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {event.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ScheduleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(event.startTime), 'MMM d, yyyy h:mm a')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {event.attendees} attending
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {event.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => enterSpace(event.spaceId)}
            sx={{ ml: 2 }}
          >
            Join Event
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, animation: `${fadeInUp} 0.6s ease-out` }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Virtual Spaces
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Immersive 3D environments for symposia, networking, and learning
        </Typography>

        {!currentUser && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Sign in to access virtual spaces and join events
          </Alert>
        )}
      </Box>

      {/* View Mode Toggle */}
      <Box sx={{ mb: 3, animation: `${fadeInUp} 0.6s ease-out 0.1s backwards` }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Experience Mode:
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="desktop">
            <DesktopIcon sx={{ mr: 1 }} />
            Desktop
          </ToggleButton>
          <ToggleButton value="vr">
            <VRIcon sx={{ mr: 1 }} />
            VR Mode
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Tabs */}
      <Box sx={{ mb: 3, animation: `${fadeInUp} 0.6s ease-out 0.2s backwards` }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Spaces" icon={<VRIcon />} iconPosition="start" />
          <Tab label={`Upcoming Events (${events.length})`} icon={<EventIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* All Spaces Tab */}
      {selectedTab === 0 && (
        <Box>
          {/* Search and Filters */}
          <Box sx={{ mb: 3, animation: `${fadeInUp} 0.6s ease-out 0.3s backwards` }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search spaces by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ToggleButtonGroup
                  value={filterType}
                  exclusive
                  onChange={(e, newType) => newType && setFilterType(newType)}
                  size="small"
                  fullWidth
                >
                  <ToggleButton value="all">All</ToggleButton>
                  <ToggleButton value="symposium">Symposium</ToggleButton>
                  <ToggleButton value="networking">Networking</ToggleButton>
                  <ToggleButton value="study">Study</ToggleButton>
                  <ToggleButton value="gallery">Gallery</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>

          {/* Spaces Grid */}
          {filteredSpaces.length > 0 ? (
            <Grid
              container
              spacing={3}
              sx={{ animation: `${fadeInUp} 0.6s ease-out 0.4s backwards` }}
            >
              {filteredSpaces.map(space => renderSpaceCard(space))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <VRIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No spaces found matching your criteria
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Events Tab */}
      {selectedTab === 1 && (
        <Box sx={{ animation: `${fadeInUp} 0.6s ease-out 0.3s backwards` }}>
          {events.length > 0 ? (
            <Box>
              {events.map(event => renderEventCard(event))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No upcoming events scheduled
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* Feature Info */}
      <Box sx={{ mt: 6, p: 4, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          About Virtual Spaces
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={3}>
            <Box>
              <TheaterIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Symposium Hall</Typography>
              <Typography variant="body2" color="text.secondary">
                Large auditorium for lectures and conferences with stage and presentation screen
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <PeopleIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Networking Lounge</Typography>
              <Typography variant="body2" color="text.secondary">
                Casual space with conversation pods for socializing and informal discussions
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <PersonIcon sx={{ fontSize: 40, color: theme.palette.info.main, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Study Pod</Typography>
              <Typography variant="body2" color="text.secondary">
                Private room with shared screen and whiteboard for small group collaboration
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <StarIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
              <Typography variant="h6" gutterBottom>Art Gallery</Typography>
              <Typography variant="body2" color="text.secondary">
                Exhibition space for research posters and visual displays
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default VirtualSpaces;
