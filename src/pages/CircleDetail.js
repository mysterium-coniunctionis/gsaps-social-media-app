import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Chip,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  IconButton,
  alpha,
  useTheme,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Schedule as ScheduleIcon,
  Place as PlaceIcon,
  VideoCall as VideoIcon,
  People as PeopleIcon,
  Send as SendIcon,
  Favorite as HeartIcon,
  ExpandMore as ExpandIcon,
  SupportAgent as SupportIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useGamification } from '../context/GamificationContext';
import GlassCard from '../components/common/GlassCard';
import Toast from '../components/common/Toast';
import { circles } from '../data/circlesData';
import {
  CIRCLE_GUIDELINES,
  OPENING_PROMPTS,
  DISCUSSION_PROMPTS,
  GROUNDING_EXERCISES
} from '../data/circleResources';
import { fadeInUp } from '../theme/animations';
import { format } from 'date-fns';

const CircleDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { circleId } = useParams();
  const { currentUser } = useAuth();
  const { awardXP } = useGamification();

  // State
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  // Mock discussion messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: { name: 'Sarah Chen', avatar_url: 'https://i.pravatar.cc/150?img=5' },
      content: 'Welcome to our circle! Looking forward to connecting with everyone this week.',
      timestamp: new Date(Date.now() - 86400000),
      type: 'message'
    },
    {
      id: 2,
      author: { name: 'Michael Torres', avatar_url: 'https://i.pravatar.cc/150?img=12' },
      content: 'I had a really profound experience last week that I\'d love to share. The insights about self-compassion are still unfolding.',
      timestamp: new Date(Date.now() - 43200000),
      type: 'message'
    }
  ]);

  // Load circle data
  useEffect(() => {
    const loadCircle = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const foundCircle = circles.find(c => c.id === parseInt(circleId));
      setCircle(foundCircle);
      setLoading(false);
    };

    loadCircle();
  }, [circleId]);

  // Check if user is member or facilitator
  const isMember = useMemo(() => {
    if (!currentUser || !circle) return false;
    return circle.members.some(m => m.id === currentUser.id);
  }, [currentUser, circle]);

  const isFacilitator = useMemo(() => {
    if (!currentUser || !circle) return false;
    return circle.facilitator.id === currentUser.id ||
           circle.coFacilitators?.some(f => f.id === currentUser.id);
  }, [currentUser, circle]);

  const canJoin = useMemo(() => {
    if (!currentUser || !circle) return false;
    return !isMember && !isFacilitator && 
           circle.members.length < circle.capacity && 
           circle.status === 'active' &&
           circle.privacy === 'public';
  }, [currentUser, circle, isMember, isFacilitator]);

  // Handle joining circle
  const handleJoin = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    awardXP(10, 'Joined an integration circle');
    
    setToast({
      open: true,
      message: 'Successfully joined the circle! +10 XP',
      severity: 'success'
    });
    
    setLoading(false);
  };

  // Handle leaving circle
  const handleLeave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setToast({
      open: true,
      message: 'You have left the circle',
      severity: 'info'
    });
    
    setLoading(false);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      author: {
        name: currentUser?.displayName || 'You',
        avatar_url: currentUser?.avatarUrl || 'https://i.pravatar.cc/150?img=1'
      },
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    // Award XP for participation
    awardXP(5, 'Participated in circle discussion');
    
    setToast({
      open: true,
      message: 'Message posted! +5 XP',
      severity: 'success'
    });
  };

  if (loading && !circle) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rounded" height={300} sx={{ mb: 3 }} />
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={40} width="60%" />
      </Box>
    );
  }

  if (!circle) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Circle not found</Typography>
        <Button onClick={() => navigate('/circles')} startIcon={<BackIcon />}>
          Back to Circles
        </Button>
      </Box>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      'psychedelic-integration': '#4CAF50',
      'preparation': '#2196F3',
      'harm-reduction': '#FF9800',
      'clinical-practitioners': '#9C27B0',
      'researchers': '#00BCD4',
      'spiritual-exploration': '#6a52b3'
    };
    return colors[category] || '#6a52b3';
  };

  const formatSchedule = () => {
    const { frequency, dayOfWeek, time, timezone, duration } = circle.meetingSchedule;
    const frequencyMap = {
      weekly: 'Every',
      biweekly: 'Every other',
      monthly: 'Monthly on'
    };
    return `${frequencyMap[frequency]} ${dayOfWeek} at ${time} (${timezone}) • ${duration} min`;
  };

  return (
    <Box sx={{ animation: `${fadeInUp} 0.5s ease-out` }}>
      {/* Back Button */}
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate('/circles')}
        sx={{ mb: 2 }}
      >
        Back to Circles
      </Button>

      {/* Hero Image */}
      <Paper
        sx={{
          position: 'relative',
          height: 300,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${circle.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          mb: 3,
          display: 'flex',
          alignItems: 'flex-end',
          p: 4,
          color: 'white'
        }}
      >
        <Box>
          <Chip
            label={circle.category.replace(/-/g, ' ').toUpperCase()}
            size="small"
            sx={{
              bgcolor: getCategoryColor(circle.category),
              color: 'white',
              fontWeight: 600,
              mb: 2
            }}
          />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {circle.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={circle.facilitator.avatar_url} />
            <Box>
              <Typography variant="body1">
                Facilitated by <strong>{circle.facilitator.name}</strong>
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {circle.facilitator.credentials}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Quick Info Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <GlassCard sx={{ p: 2, textAlign: 'center' }}>
                <PeopleIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {circle.members.length}/{circle.capacity}
                </Typography>
                <Typography variant="caption">Members</Typography>
              </GlassCard>
            </Grid>
            <Grid item xs={6} sm={3}>
              <GlassCard sx={{ p: 2, textAlign: 'center' }}>
                <ScheduleIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {circle.meetingSchedule.frequency.charAt(0).toUpperCase() + circle.meetingSchedule.frequency.slice(1)}
                </Typography>
                <Typography variant="caption">Meetings</Typography>
              </GlassCard>
            </Grid>
            <Grid item xs={6} sm={3}>
              <GlassCard sx={{ p: 2, textAlign: 'center' }}>
                <HeartIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  {circle.stats.totalMeetings}
                </Typography>
                <Typography variant="caption">Sessions Held</Typography>
              </GlassCard>
            </Grid>
            <Grid item xs={6} sm={3}>
              <GlassCard sx={{ p: 2, textAlign: 'center' }}>
                {circle.location.type === 'virtual' ? (
                  <VideoIcon color="primary" />
                ) : (
                  <PlaceIcon color="primary" />
                )}
                <Typography variant="h6" fontWeight="bold">
                  {circle.location.type === 'virtual' ? 'Virtual' : 'In-Person'}
                </Typography>
                <Typography variant="caption">
                  {circle.location.city || 'Global'}
                </Typography>
              </GlassCard>
            </Grid>
          </Grid>

          {/* Tabs */}
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="About" />
              <Tab label="Discussion" disabled={!isMember && !isFacilitator} />
              <Tab label="Members" />
              {isFacilitator && <Tab label="Facilitator Tools" />}
            </Tabs>
          </Paper>

          {/* Tab Content */}
          {activeTab === 0 && (
            <Box>
              {/* Description */}
              <GlassCard sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>About This Circle</Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {circle.description}
                </Typography>
              </GlassCard>

              {/* Schedule */}
              <GlassCard sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Meeting Schedule</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ScheduleIcon color="primary" fontSize="large" />
                  <Typography variant="body1">{formatSchedule()}</Typography>
                </Box>
              </GlassCard>

              {/* Values & Topics */}
              <GlassCard sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Values & Topics</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Circle Values
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {circle.values.map((value, i) => (
                      <Chip key={i} label={value} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Topics Covered
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {circle.topics.map((topic, i) => (
                      <Chip key={i} label={topic} size="small" />
                    ))}
                  </Box>
                </Box>
              </GlassCard>

              {/* Guidelines */}
              <GlassCard sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Circle Guidelines</Typography>
                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                  {circle.guidelines}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>Community Guidelines</Typography>
                <List dense>
                  {CIRCLE_GUIDELINES.general.principles.map((principle, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span>{principle.icon}</span>
                            <strong>{principle.name}</strong>
                          </Box>
                        }
                        secondary={principle.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </GlassCard>
            </Box>
          )}

          {activeTab === 1 && (isMember || isFacilitator) && (
            <Box>
              {/* Discussion */}
              <GlassCard sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Circle Discussion</Typography>
                
                {/* Messages */}
                <List>
                  {messages.map((message) => (
                    <ListItem key={message.id} alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar src={message.author.avatar_url} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">{message.author.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {format(message.timestamp, 'MMM d, h:mm a')}
                            </Typography>
                          </Box>
                        }
                        secondary={message.content}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* New Message Input */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Share your thoughts..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </GlassCard>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              {/* Members List */}
              <GlassCard sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Members ({circle.members.length})
                </Typography>
                
                {/* Facilitator */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Facilitator
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={circle.facilitator.avatar_url}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {circle.facilitator.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {circle.facilitator.credentials}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {circle.facilitator.bio}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Co-Facilitators */}
                {circle.coFacilitators?.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Co-Facilitators
                    </Typography>
                    {circle.coFacilitators.map((coFac, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Avatar src={coFac.avatar_url} />
                        <Box>
                          <Typography variant="body1">{coFac.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {coFac.credentials}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Members */}
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Circle Members
                </Typography>
                <Grid container spacing={2}>
                  {circle.members.map((member, i) => (
                    <Grid item xs={6} sm={4} key={i}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={member.avatar_url} sx={{ width: 40, height: 40 }} />
                        <Typography variant="body2">{member.name}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </GlassCard>
            </Box>
          )}

          {activeTab === 3 && isFacilitator && (
            <Box>
              {/* Facilitator Tools */}
              <GlassCard sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Facilitation Resources</Typography>
                
                {/* Opening Prompts */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography fontWeight={600}>Opening Prompts</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {OPENING_PROMPTS.slice(0, 5).map((prompt) => (
                        <ListItem key={prompt.id}>
                          <ListItemText
                            primary={prompt.name}
                            secondary={prompt.prompt}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                {/* Discussion Prompts */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography fontWeight={600}>Discussion Prompts</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {DISCUSSION_PROMPTS.slice(0, 8).map((prompt) => (
                        <ListItem key={prompt.id}>
                          <ListItemText
                            primary={prompt.topic}
                            secondary={prompt.prompt}
                          />
                          <Chip label={prompt.depth} size="small" variant="outlined" />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                {/* Grounding Exercises */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Typography fontWeight={600}>Grounding Exercises</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {GROUNDING_EXERCISES.slice(0, 5).map((exercise) => (
                        <ListItem key={exercise.id}>
                          <ListItemText
                            primary={exercise.name}
                            secondary={exercise.description}
                          />
                          <Chip label={exercise.duration} size="small" />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </GlassCard>
            </Box>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Join/Leave Card */}
          <GlassCard sx={{ p: 3, mb: 3, textAlign: 'center' }}>
            {isMember || isFacilitator ? (
              <>
                <CheckIcon color="success" sx={{ fontSize: 48 }} />
                <Typography variant="h6" gutterBottom>
                  {isFacilitator ? 'You are facilitating this circle' : 'You are a member'}
                </Typography>
                {!isFacilitator && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLeave}
                    sx={{ mt: 2 }}
                  >
                    Leave Circle
                  </Button>
                )}
              </>
            ) : canJoin ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Join This Circle
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {circle.capacity - circle.members.length} spots remaining
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleJoin}
                  disabled={loading}
                >
                  Join Circle
                </Button>
              </>
            ) : !currentUser ? (
              <>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Log in to join this circle
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </>
            ) : (
              <>
                <WarningIcon color="warning" sx={{ fontSize: 48 }} />
                <Typography variant="body1">
                  {circle.members.length >= circle.capacity
                    ? 'This circle is currently full'
                    : circle.privacy !== 'public'
                    ? 'This is a private circle'
                    : 'Unable to join this circle'}
                </Typography>
              </>
            )}
          </GlassCard>

          {/* Crisis Resources */}
          <GlassCard
            sx={{
              p: 3,
              bgcolor: alpha(theme.palette.warning.main, 0.1)
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SupportIcon color="warning" /> Crisis Support
            </Typography>
            <Typography variant="body2" paragraph>
              If you or someone in your circle is in crisis:
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Fireside Project
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={600}>
                62-FIRESIDE (623-473-7433)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Daily 11am-11pm PT
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                988 Suicide & Crisis Lifeline
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={600}>
                988
              </Typography>
              <Typography variant="caption" color="text.secondary">
                24/7
              </Typography>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>

      {/* Toast */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
};

export default CircleDetail;
