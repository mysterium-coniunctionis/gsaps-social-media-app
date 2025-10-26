import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
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
  Groups as GroupsIcon,
  Lock as LockIcon,
  Public as PublicIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Groups listing page
 * Browse and search community groups
 */
const Groups = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('active');

  useEffect(() => {
    // TODO: Fetch groups from API
    // For now, use mock data
    setTimeout(() => {
      const mockGroups = [
        {
          id: 1,
          name: 'Psychedelic Research Network',
          slug: 'psychedelic-research',
          description: 'A community for researchers studying psychedelics and their therapeutic applications',
          avatar_url: '',
          memberCount: 234,
          privacy: 'public',
          category: 'Research',
          isJoined: true,
          lastActivity: '2024-02-20'
        },
        {
          id: 2,
          name: 'Clinical Applications',
          slug: 'clinical-applications',
          description: 'Discussion group for clinical practitioners and therapists',
          avatar_url: '',
          memberCount: 156,
          privacy: 'private',
          category: 'Clinical',
          isJoined: false,
          lastActivity: '2024-02-19'
        },
        {
          id: 3,
          name: 'Neuroscience & Consciousness',
          slug: 'neuroscience-consciousness',
          description: 'Exploring the neuroscience behind altered states of consciousness',
          avatar_url: '',
          memberCount: 189,
          privacy: 'public',
          category: 'Science',
          isJoined: true,
          lastActivity: '2024-02-21'
        },
        {
          id: 4,
          name: 'Student Study Group',
          slug: 'student-study-group',
          description: 'For graduate students in psychedelic studies programs',
          avatar_url: '',
          memberCount: 92,
          privacy: 'public',
          category: 'Education',
          isJoined: false,
          lastActivity: '2024-02-18'
        }
      ];
      setGroups(mockGroups);
      setFilteredGroups(mockGroups);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...groups];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType === 'my-groups') {
      filtered = filtered.filter(group => group.isJoined);
    } else if (filterType === 'public') {
      filtered = filtered.filter(group => group.privacy === 'public');
    } else if (filterType === 'private') {
      filtered = filtered.filter(group => group.privacy === 'private');
    }

    // Apply sorting
    if (sortBy === 'active') {
      filtered.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    } else if (sortBy === 'members') {
      filtered.sort((a, b) => b.memberCount - a.memberCount);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredGroups(filtered);
  }, [searchQuery, filterType, sortBy, groups]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Groups
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join groups to connect with like-minded members
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => alert('Create group functionality coming soon!')}
        >
          Create Group
        </Button>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search groups..."
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Filter"
                >
                  <MenuItem value="all">All Groups</MenuItem>
                  <MenuItem value="my-groups">My Groups</MenuItem>
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
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
                  <MenuItem value="active">Most Active</MenuItem>
                  <MenuItem value="members">Most Members</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Groups List */}
      {filteredGroups.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <GroupsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No groups found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredGroups.map((group) => (
            <Grid item xs={12} md={6} key={group.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate(`/groups/${group.slug}`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      src={group.avatar_url}
                      sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}
                    >
                      <GroupsIcon />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6">
                          {group.name}
                        </Typography>
                        {group.privacy === 'private' ? (
                          <LockIcon fontSize="small" color="action" />
                        ) : (
                          <PublicIcon fontSize="small" color="action" />
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {group.description}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip
                            label={group.category}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={`${group.memberCount} members`}
                            size="small"
                          />
                        </Box>

                        <Button
                          size="small"
                          variant={group.isJoined ? 'outlined' : 'contained'}
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement join/leave functionality
                            alert(group.isJoined ? 'Leave group' : 'Join group');
                          }}
                        >
                          {group.isJoined ? 'Joined' : 'Join'}
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Groups;
