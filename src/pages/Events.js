import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Events listing page
 * Browse upcoming and past community events
 */
const Events = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTime, setFilterTime] = useState('upcoming');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    // TODO: Fetch events from API
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: 'Psychedelic Science Symposium 2025',
          slug: 'psychedelic-science-symposium-2025',
          description: 'Annual symposium featuring leading researchers in psychedelic science',
          startDate: '2025-03-15T09:00:00',
          endDate: '2025-03-17T17:00:00',
          location: 'San Francisco, CA',
          venue: 'Moscone Center',
          attendeeCount: 156,
          isAttending: true,
          category: 'Conference',
          imageUrl: ''
        },
        {
          id: 2,
          title: 'MDMA-Assisted Therapy Workshop',
          slug: 'mdma-therapy-workshop',
          description: 'Hands-on workshop for therapists interested in MDMA-assisted therapy',
          startDate: '2025-02-28T10:00:00',
          endDate: '2025-02-28T16:00:00',
          location: 'Online',
          venue: 'Zoom',
          attendeeCount: 89,
          isAttending: false,
          category: 'Workshop',
          imageUrl: ''
        },
        {
          id: 3,
          title: 'Research Methods Webinar Series',
          slug: 'research-methods-webinar',
          description: 'Monthly webinar series on psychedelic research methodologies',
          startDate: '2025-03-05T14:00:00',
          endDate: '2025-03-05T15:30:00',
          location: 'Online',
          venue: 'Zoom',
          attendeeCount: 234,
          isAttending: true,
          category: 'Webinar',
          imageUrl: ''
        },
        {
          id: 4,
          title: 'Student Networking Mixer',
          slug: 'student-networking-mixer',
          description: 'Casual networking event for graduate students in psychedelic studies',
          startDate: '2025-02-25T18:00:00',
          endDate: '2025-02-25T21:00:00',
          location: 'Berkeley, CA',
          venue: 'The Graduate',
          attendeeCount: 45,
          isAttending: false,
          category: 'Social',
          imageUrl: ''
        }
      ];
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...events];
    const now = new Date();

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply time filter
    if (filterTime === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.startDate) >= now);
    } else if (filterTime === 'past') {
      filtered = filtered.filter(event => new Date(event.startDate) < now);
    } else if (filterTime === 'attending') {
      filtered = filtered.filter(event => event.isAttending);
    }

    // Apply sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    } else if (sortBy === 'attendees') {
      filtered.sort((a, b) => b.attendeeCount - a.attendeeCount);
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredEvents(filtered);
  }, [searchQuery, filterTime, sortBy, events]);

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit' };

    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', dateOptions)} • ${start.toLocaleTimeString('en-US', timeOptions)} - ${end.toLocaleTimeString('en-US', timeOptions)}`;
    } else {
      return `${start.toLocaleDateString('en-US', dateOptions)} - ${end.toLocaleDateString('en-US', dateOptions)}`;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover and attend GSAPS community events
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => alert('Create event functionality coming soon!')}
        >
          Create Event
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search events..."
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
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                  label="Filter"
                >
                  <MenuItem value="all">All Events</MenuItem>
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="past">Past</MenuItem>
                  <MenuItem value="attending">I'm Attending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="attendees">Most Popular</MenuItem>
                  <MenuItem value="title">Title (A-Z)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <EventIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No events found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} key={event.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate(`/events/${event.slug}`)}
              >
                <CardContent>
                  <Grid container spacing={3}>
                    {/* Event Date Display */}
                    <Grid item xs={12} sm={2}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderRadius: 1
                        }}
                      >
                        <Typography variant="h4">
                          {new Date(event.startDate).getDate()}
                        </Typography>
                        <Typography variant="body2">
                          {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Event Details */}
                    <Grid item xs={12} sm={7}>
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {event.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="caption">
                            {formatEventDate(event.startDate, event.endDate)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationIcon fontSize="small" color="action" />
                          <Typography variant="caption">
                            {event.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PeopleIcon fontSize="small" color="action" />
                          <Typography variant="caption">
                            {event.attendeeCount} attending
                          </Typography>
                        </Box>
                      </Box>

                      <Chip
                        label={event.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Grid>

                    {/* RSVP Button */}
                    <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Button
                        fullWidth
                        variant={event.isAttending ? 'outlined' : 'contained'}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(event.isAttending ? 'Cancel RSVP' : 'RSVP to event');
                        }}
                      >
                        {event.isAttending ? 'Attending' : 'RSVP'}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Events;
