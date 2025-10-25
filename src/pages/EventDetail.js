import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Share as ShareIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Event detail page
 * Displays full event information and attendee list
 */
const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // TODO: Fetch event details from API
    setTimeout(() => {
      const mockEvent = {
        id: parseInt(eventId) || 1,
        title: 'Psychedelic Science Symposium 2025',
        slug: eventId,
        description: 'Annual symposium featuring leading researchers in psychedelic science. Join us for three days of cutting-edge presentations, panel discussions, and networking opportunities with researchers, clinicians, and advocates from around the world.',
        fullDescription: `
          The Psychedelic Science Symposium 2025 brings together the global community of psychedelic researchers, clinicians, and advocates for an unprecedented exploration of the latest developments in the field.

          This year's program includes:
          • Keynote presentations from leading researchers
          • Panel discussions on clinical applications
          • Poster sessions showcasing emerging research
          • Networking events and social activities
          • Workshop sessions on research methodologies

          Join over 500 attendees from around the world for this transformative event.
        `,
        startDate: '2025-03-15T09:00:00',
        endDate: '2025-03-17T17:00:00',
        location: 'San Francisco, CA',
        venue: 'Moscone Center',
        venueAddress: '747 Howard St, San Francisco, CA 94103',
        attendeeCount: 156,
        maxAttendees: 500,
        isAttending: true,
        category: 'Conference',
        organizer: {
          id: 1,
          name: 'GSAPS Events Team',
          avatar_url: ''
        },
        attendees: [
          { id: 1, name: 'Alice Johnson', username: 'alice_researcher', avatar_url: '' },
          { id: 2, name: 'Bob Williams', username: 'bob_neuroscience', avatar_url: '' },
          { id: 3, name: 'Carol Davis', username: 'carol_therapist', avatar_url: '' },
          { id: 4, name: 'David Martinez', username: 'david_student', avatar_url: '' }
        ]
      };
      setEvent(mockEvent);
      setLoading(false);
    }, 500);
  }, [eventId]);

  const handleRSVP = () => {
    if (event.isAttending) {
      if (window.confirm('Are you sure you want to cancel your RSVP?')) {
        alert('Cancel RSVP functionality coming soon!');
      }
    } else {
      alert('RSVP functionality coming soon!');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit' };

    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString('en-US', dateOptions)}\n${start.toLocaleTimeString('en-US', timeOptions)} - ${end.toLocaleTimeString('en-US', timeOptions)}`;
    } else {
      return `${start.toLocaleDateString('en-US', dateOptions)} - ${end.toLocaleDateString('en-US', dateOptions)}`;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">Event not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      {/* Event Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Chip label={event.category} color="primary" sx={{ mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                  <CalendarIcon color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date & Time
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {formatEventDate(event.startDate, event.endDate)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                  <LocationIcon color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {event.venue}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {event.venueAddress}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <PeopleIcon color="action" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Attendees
                    </Typography>
                    <Typography variant="body2">
                      {event.attendeeCount} / {event.maxAttendees} attending
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant={event.isAttending ? 'outlined' : 'contained'}
                    size="large"
                    fullWidth
                    startIcon={<EventIcon />}
                    onClick={handleRSVP}
                  >
                    {event.isAttending ? 'Cancel RSVP' : 'RSVP to Event'}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                  >
                    Share Event
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Event Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About This Event
              </Typography>
              <Typography
                variant="body1"
                sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}
              >
                {event.fullDescription}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Organizer */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Organizer
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={event.organizer.avatar_url}>
                  {event.organizer.name.charAt(0)}
                </Avatar>
                <Typography variant="body1">
                  {event.organizer.name}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Attendees */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendees ({event.attendees.length})
              </Typography>
              <List>
                {event.attendees.slice(0, 5).map((attendee, index) => (
                  <React.Fragment key={attendee.id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/profile/${attendee.username}`)}
                      sx={{ px: 0 }}
                    >
                      <ListItemAvatar>
                        <Avatar src={attendee.avatar_url}>
                          {attendee.name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={attendee.name}
                        secondary={`@${attendee.username}`}
                      />
                    </ListItem>
                    {index < 4 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
              {event.attendeeCount > 5 && (
                <Button fullWidth sx={{ mt: 1 }}>
                  View All Attendees
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventDetail;
