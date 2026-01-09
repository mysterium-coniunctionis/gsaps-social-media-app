import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Stack,
  TextField,
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  useTheme,
  alpha,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FiberManualRecord as LiveIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import VoiceRoomCard from '../components/voice/VoiceRoomCard';
import { getVoiceRooms, createVoiceRoom } from '../api/voiceRoomService';
import { roomCategories } from '../data/voiceRoomsData';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { fadeInUp } from '../theme/animations';

/**
 * VoiceRooms - Main voice rooms listing page
 */
const VoiceRooms = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const toast = useToast();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0); // 0: Live, 1: Scheduled, 2: All
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Form state for creating a room
  const [newRoom, setNewRoom] = useState({
    title: '',
    description: '',
    category: 'Integration',
    startNow: true,
    scheduledFor: '',
    duration: 3600,
    maxListeners: 500,
    isRecording: true,
    allowHandRaise: true,
    isPrivate: false,
    tags: ''
  });

  useEffect(() => {
    loadRooms();
  }, [selectedCategory, searchQuery, tabValue]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory,
        search: searchQuery
      };

      // Add status filter based on tab
      if (tabValue === 0) filters.status = 'live';
      if (tabValue === 1) filters.status = 'scheduled';

      const data = await getVoiceRooms(filters);
      setRooms(data);
    } catch (error) {
      console.error('Failed to load rooms:', error);
      toast.error('Failed to load voice rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    try {
      const roomData = {
        ...newRoom,
        tags: newRoom.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        host: {
          id: currentUser?.id || 'current-user',
          username: currentUser?.username || 'host',
          displayName: currentUser?.displayName || 'Host User',
          avatar: currentUser?.avatar || 'https://i.pravatar.cc/150?img=1'
        }
      };

      const createdRoom = await createVoiceRoom(roomData);
      toast.success('Voice room created successfully!');
      setCreateDialogOpen(false);

      // Reset form
      setNewRoom({
        title: '',
        description: '',
        category: 'Integration',
        startNow: true,
        scheduledFor: '',
        duration: 3600,
        maxListeners: 500,
        isRecording: true,
        allowHandRaise: true,
        isPrivate: false,
        tags: ''
      });

      // Navigate to the room if starting now
      if (roomData.startNow) {
        navigate(`/voice-rooms/${createdRoom.id}`);
      } else {
        loadRooms();
      }
    } catch (error) {
      console.error('Failed to create room:', error);
      toast.error('Failed to create voice room');
    }
  };

  const liveRoomsCount = rooms.filter(r => r.status === 'live').length;
  const scheduledRoomsCount = rooms.filter(r => r.status === 'scheduled').length;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: 3,
        pb: 10
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            animation: `${fadeInUp} 0.5s ease-out`
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Voice Rooms
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join live audio conversations or schedule your own room
          </Typography>
        </Box>

        {/* Stats */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 3,
            animation: `${fadeInUp} 0.5s ease-out 0.1s backwards`
          }}
        >
          <Chip
            icon={<LiveIcon />}
            label={`${liveRoomsCount} Live Now`}
            sx={{
              bgcolor: alpha(theme.palette.error.main, 0.1),
              color: 'error.main',
              fontWeight: 700,
              '& .MuiChip-icon': {
                color: 'error.main',
                animation: 'pulse 2s infinite'
              }
            }}
          />
          <Chip
            icon={<EventIcon />}
            label={`${scheduledRoomsCount} Scheduled`}
            sx={{
              bgcolor: alpha(theme.palette.info.main, 0.1),
              color: 'info.main',
              fontWeight: 600
            }}
          />
        </Stack>

        {/* Tabs */}
        <Box
          sx={{
            mb: 3,
            animation: `${fadeInUp} 0.5s ease-out 0.2s backwards`
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                fontWeight: 600
              }
            }}
          >
            <Tab label="Live Now" />
            <Tab label="Scheduled" />
            <Tab label="All Rooms" />
          </Tabs>
        </Box>

        {/* Search and Filters */}
        <Stack
          spacing={2}
          sx={{
            mb: 4,
            animation: `${fadeInUp} 0.5s ease-out 0.3s backwards`
          }}
        >
          <TextField
            fullWidth
            placeholder="Search rooms by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)'
              }
            }}
          />

          {/* Category filters */}
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {roomCategories.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? 'primary' : 'default'}
                sx={{
                  cursor: 'pointer',
                  fontWeight: selectedCategory === category.id ? 700 : 500
                }}
              />
            ))}
          </Stack>
        </Stack>

        {/* Rooms Grid */}
        {loading ? (
          <Typography variant="body1" color="text.secondary">
            Loading rooms...
          </Typography>
        ) : rooms.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              animation: `${fadeInUp} 0.5s ease-out 0.4s backwards`
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No rooms found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your filters'
                : 'Be the first to create a room!'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Create Room
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {rooms.map((room, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={room.id}
                sx={{
                  animation: `${fadeInUp} 0.5s ease-out ${0.4 + index * 0.05}s backwards`
                }}
              >
                <VoiceRoomCard room={room} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Create Room FAB */}
        <Fab
          color="primary"
          aria-label="create room"
          onClick={() => setCreateDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: { xs: 80, sm: 32 },
            right: { xs: 16, sm: 32 },
            boxShadow: 8,
            animation: `${fadeInUp} 0.5s ease-out 0.5s backwards`
          }}
        >
          <AddIcon />
        </Fab>

        {/* Create Room Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create Voice Room</DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Room Title"
                value={newRoom.title}
                onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
                placeholder="e.g., Integration Best Practices"
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={newRoom.description}
                onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                placeholder="What will you discuss in this room?"
              />

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newRoom.category}
                  onChange={(e) => setNewRoom({ ...newRoom, category: e.target.value })}
                  label="Category"
                >
                  {roomCategories
                    .filter(cat => cat.id !== 'all')
                    .map((category) => (
                      <MenuItem key={category.id} value={category.label}>
                        {category.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={newRoom.tags}
                onChange={(e) => setNewRoom({ ...newRoom, tags: e.target.value })}
                placeholder="e.g., therapy, mindfulness, research"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={newRoom.startNow}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, startNow: e.target.checked })
                    }
                  />
                }
                label="Start room immediately"
              />

              {!newRoom.startNow && (
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Schedule For"
                  value={newRoom.scheduledFor}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, scheduledFor: e.target.value })
                  }
                  InputLabelProps={{ shrink: true }}
                />
              )}

              <FormControl fullWidth>
                <InputLabel>Max Listeners</InputLabel>
                <Select
                  value={newRoom.maxListeners}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, maxListeners: e.target.value })
                  }
                  label="Max Listeners"
                >
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value={300}>300</MenuItem>
                  <MenuItem value={500}>500</MenuItem>
                  <MenuItem value={1000}>1000</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={newRoom.isRecording}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, isRecording: e.target.checked })
                    }
                  />
                }
                label="Record this room"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={newRoom.allowHandRaise}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, allowHandRaise: e.target.checked })
                    }
                  />
                }
                label="Allow listeners to raise hand"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={newRoom.isPrivate}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, isPrivate: e.target.checked })
                    }
                  />
                }
                label="Make room private (invite-only)"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreateRoom}
              disabled={!newRoom.title || !newRoom.description}
            >
              {newRoom.startNow ? 'Start Room' : 'Schedule Room'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default VoiceRooms;
