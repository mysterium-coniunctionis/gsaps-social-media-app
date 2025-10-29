import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * Members directory page
 * Browse and search GSAPS community members
 * Optimized with useMemo for filtering
 */
const Members = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterInterest, setFilterInterest] = useState('all');

  const interests = ['All', 'Psychedelics', 'Neuroscience', 'Psychology', 'Research', 'Therapy'];

  useEffect(() => {
    // TODO: Fetch members from API
    // For now, use mock data
    setTimeout(() => {
      const mockMembers = [
        {
          id: 1,
          username: 'alice_researcher',
          name: 'Alice Johnson',
          avatar_url: '',
          bio: 'PhD candidate studying psychedelic therapy',
          interests: ['Psychedelics', 'Therapy', 'Research'],
          location: 'Berkeley, CA',
          memberSince: '2024-01-15'
        },
        {
          id: 2,
          username: 'bob_neuroscience',
          name: 'Bob Williams',
          avatar_url: '',
          bio: 'Neuroscience researcher focused on consciousness',
          interests: ['Neuroscience', 'Psychology'],
          location: 'Boston, MA',
          memberSince: '2024-02-01'
        },
        {
          id: 3,
          username: 'carol_therapist',
          name: 'Carol Davis',
          avatar_url: '',
          bio: 'Licensed therapist integrating psychedelic-assisted therapy',
          interests: ['Therapy', 'Psychology'],
          location: 'Portland, OR',
          memberSince: '2024-01-20'
        },
        {
          id: 4,
          username: 'david_student',
          name: 'David Martinez',
          avatar_url: '',
          bio: 'Graduate student in clinical psychology',
          interests: ['Psychology', 'Research'],
          location: 'New York, NY',
          memberSince: '2024-03-01'
        }
      ];
      setMembers(mockMembers);
      setLoading(false);
    }, 500);
  }, []);

  // Memoize filtered and sorted members to prevent recalculation on every render
  const filteredMembers = useMemo(() => {
    // Filter and search members
    let filtered = [...members];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.username.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query)
      );
    }

    // Apply interest filter
    if (filterInterest !== 'all') {
      filtered = filtered.filter(member =>
        member.interests.includes(filterInterest)
      );
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.memberSince) - new Date(a.memberSince));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.memberSince) - new Date(b.memberSince));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, sortBy, filterInterest, members]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Members Directory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with {members.length} GSAPS community members
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search members..."
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
                <InputLabel>Interest</InputLabel>
                <Select
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                  label="Interest"
                >
                  <MenuItem value="all">All Interests</MenuItem>
                  {interests.filter(i => i !== 'All').map((interest) => (
                    <MenuItem key={interest} value={interest}>{interest}</MenuItem>
                  ))}
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
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="name">Name (A-Z)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No members found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate(`/profile/${member.username}`)}
              >
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar
                      src={member.avatar_url}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      @{member.username}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      minHeight: 40,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {member.bio}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {member.interests.slice(0, 3).map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    {member.location}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Members;
