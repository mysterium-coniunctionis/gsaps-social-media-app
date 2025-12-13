import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Groups as GroupsIcon,
  Lock as LockIcon,
  Public as PublicIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { SearchTextField } from '../components/common';
import {
  getRecommendations,
  logInteraction,
  recordExperimentConversion,
  recordExperimentImpression,
  useExperiment
} from '../utils/recommendationService';

/**
 * Groups listing page
 * Browse and search community groups
 */
const Groups = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('active');
  const groupVariant = useExperiment('group-feed', ['control', 'personalized']);

  useEffect(() => {
    // TODO: Fetch groups from API
    // For now, use mock data
    setTimeout(() => {
      const mockGroups = [
        {
          id: 1,
          name: 'Psychedelic Research Network',
          slug: 'psychedelic-research',
          description: 'A community for researchers studying psychedelics and their therapeutic applications. Share papers, discuss methodologies, and collaborate on studies.',
          avatar_url: 'https://i.pravatar.cc/150?img=70',
          memberCount: 342,
          privacy: 'public',
          category: 'Research',
          isJoined: true,
          lastActivity: '2024-10-30'
        },
        {
          id: 2,
          name: 'MDMA-Assisted Therapy Practitioners',
          slug: 'mdma-therapy',
          description: 'Private group for MAPS-trained therapists and clinicians conducting MDMA-assisted psychotherapy. Case consultations and peer supervision.',
          avatar_url: 'https://i.pravatar.cc/150?img=25',
          memberCount: 156,
          privacy: 'private',
          category: 'Clinical',
          isJoined: true,
          lastActivity: '2024-10-30'
        },
        {
          id: 3,
          name: 'Neuroscience & Consciousness',
          slug: 'neuroscience-consciousness',
          description: 'Exploring the neuroscience behind altered states of consciousness. fMRI studies, neuroplasticity, default mode network, and brain imaging research.',
          avatar_url: 'https://i.pravatar.cc/150?img=60',
          memberCount: 289,
          privacy: 'public',
          category: 'Science',
          isJoined: true,
          lastActivity: '2024-10-29'
        },
        {
          id: 4,
          name: 'Student Study Group',
          slug: 'student-study-group',
          description: 'For graduate and undergraduate students in psychedelic studies programs. Study resources, career advice, and networking opportunities.',
          avatar_url: 'https://i.pravatar.cc/150?img=35',
          memberCount: 167,
          privacy: 'public',
          category: 'Education',
          isJoined: true,
          lastActivity: '2024-10-29'
        },
        {
          id: 5,
          name: 'Integration Circles',
          slug: 'integration-circles',
          description: 'Community support for psychedelic integration. Share experiences, processing techniques, and post-journey practices. Peer support and guidance.',
          avatar_url: 'https://i.pravatar.cc/150?img=45',
          memberCount: 428,
          privacy: 'public',
          category: 'Integration',
          isJoined: true,
          lastActivity: '2024-10-30'
        },
        {
          id: 6,
          name: 'Harm Reduction Coalition',
          slug: 'harm-reduction',
          description: 'Advancing harm reduction principles in psychedelic use. Drug testing, safety protocols, crisis support, and evidence-based risk mitigation strategies.',
          avatar_url: 'https://i.pravatar.cc/150?img=50',
          memberCount: 234,
          privacy: 'public',
          category: 'Safety',
          isJoined: false,
          lastActivity: '2024-10-29'
        },
        {
          id: 7,
          name: 'Mycology & Cultivation',
          slug: 'mycology',
          description: 'For mushroom enthusiasts! Identification, cultivation techniques, spore prints, and mycology science. Focus on education and responsible practices.',
          avatar_url: 'https://i.pravatar.cc/150?img=40',
          memberCount: 312,
          privacy: 'public',
          category: 'Education',
          isJoined: false,
          lastActivity: '2024-10-28'
        },
        {
          id: 8,
          name: 'Indigenous Wisdom Keepers',
          slug: 'indigenous-wisdom',
          description: 'Honoring indigenous traditions and plant medicine practices. Cultural education, reciprocity, and respectful engagement with sacred medicines.',
          avatar_url: 'https://i.pravatar.cc/150?img=30',
          memberCount: 389,
          privacy: 'public',
          category: 'Culture',
          isJoined: true,
          lastActivity: '2024-10-30'
        },
        {
          id: 9,
          name: 'Ketamine Therapy Network',
          slug: 'ketamine-therapy',
          description: 'For clinicians and patients exploring ketamine-assisted psychotherapy. Clinical protocols, patient experiences, and treatment innovations.',
          avatar_url: 'https://i.pravatar.cc/150?img=55',
          memberCount: 198,
          privacy: 'private',
          category: 'Clinical',
          isJoined: false,
          lastActivity: '2024-10-28'
        },
        {
          id: 10,
          name: 'Policy & Legalization',
          slug: 'policy-reform',
          description: 'Advocating for evidence-based psychedelic policy reform. Legislative updates, decriminalization efforts, and grassroots organizing strategies.',
          avatar_url: 'https://i.pravatar.cc/150?img=65',
          memberCount: 267,
          privacy: 'public',
          category: 'Advocacy',
          isJoined: false,
          lastActivity: '2024-10-27'
        },
        {
          id: 11,
          name: 'Breathwork & Holotropic States',
          slug: 'breathwork',
          description: 'Exploring non-pharmacological methods for achieving altered states. Holotropic breathwork, pranayama, and somatic practices.',
          avatar_url: 'https://i.pravatar.cc/150?img=20',
          memberCount: 145,
          privacy: 'public',
          category: 'Practice',
          isJoined: false,
          lastActivity: '2024-10-26'
        },
        {
          id: 12,
          name: 'Psychedelic Art & Creativity',
          slug: 'art-creativity',
          description: 'For artists and creatives exploring psychedelic-inspired work. Share art, discuss creative processes, and connect with fellow artists.',
          avatar_url: 'https://i.pravatar.cc/150?img=15',
          memberCount: 423,
          privacy: 'public',
          category: 'Creative',
          isJoined: true,
          lastActivity: '2024-10-29'
        },
        {
          id: 13,
          name: 'Microdosing Research',
          slug: 'microdosing',
          description: 'Scientific discussion of microdosing research and practices. Protocol design, citizen science studies, and controlled trials.',
          avatar_url: 'https://i.pravatar.cc/150?img=75',
          memberCount: 512,
          privacy: 'public',
          category: 'Research',
          isJoined: true,
          lastActivity: '2024-10-30'
        },
        {
          id: 14,
          name: 'PTSD & Trauma Healing',
          slug: 'ptsd-trauma',
          description: 'Support group for trauma survivors exploring psychedelic-assisted healing. Safe space for sharing experiences and evidence-based treatments.',
          avatar_url: 'https://i.pravatar.cc/150?img=10',
          memberCount: 278,
          privacy: 'private',
          category: 'Support',
          isJoined: false,
          lastActivity: '2024-10-29'
        },
        {
          id: 15,
          name: 'Pharmacology Deep Dive',
          slug: 'pharmacology',
          description: 'Advanced pharmacology discussions: receptor binding, synthesis pathways, structure-activity relationships, and drug metabolism.',
          avatar_url: 'https://i.pravatar.cc/150?img=80',
          memberCount: 187,
          privacy: 'public',
          category: 'Science',
          isJoined: false,
          lastActivity: '2024-10-27'
        }
      ];
      setGroups(mockGroups);
      setLoading(false);
    }, 500);
  }, []);

  // Memoize filtered groups to prevent recalculation on every render
  const filteredGroups = useMemo(() => {
    let filtered = [...groups];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(query) ||
        group.description.toLowerCase().includes(query)
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

    return filtered;
  }, [searchQuery, filterType, sortBy, groups]);

  // Memoize recommended groups
  const recommendedGroups = useMemo(() => {
    if (!groups.length) return [];
    const recommendations = getRecommendations('group', groups, {
      variant: groupVariant,
      limit: 6
    });
    // Record impression when recommendations change
    if (recommendations.length > 0) {
      recordExperimentImpression('group-feed', groupVariant, recommendations.length);
    }
    return recommendations;
  }, [groups, groupVariant]);

  // Memoize related categories to avoid recalculating on every render
  const relatedGroupCategories = useMemo(
    () => Array.from(new Set(recommendedGroups.map(group => group.category))).slice(0, 4),
    [recommendedGroups]
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleGroupClick = (group) => {
    logInteraction('group', group, 'click');
    recordExperimentConversion('group-feed', groupVariant, 1);
    navigate(`/groups/${group.slug}`);
  };

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

      {recommendedGroups.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                For You
                <Chip
                  sx={{ ml: 1 }}
                  size="small"
                  color={groupVariant === 'control' ? 'default' : 'primary'}
                  label={groupVariant === 'control' ? 'Baseline' : 'Personalized'}
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clicks, joins, and searches help rank relevant communities.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {recommendedGroups.map(group => (
                <Grid item xs={12} md={6} key={`rec-group-${group.id}`}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 }
                    }}
                    onClick={() => handleGroupClick(group)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar src={group.avatar_url} sx={{ width: 48, height: 48 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {group.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {group.description.slice(0, 90)}...
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip label={group.category} size="small" variant="outlined" />
                            <Chip label={`${group.memberCount} members`} size="small" />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <SearchTextField
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      {relatedGroupCategories.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Related categories from your activity:
          </Typography>
            {relatedGroupCategories.map(category => (
              <Chip
                key={category}
                label={category}
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setFilterType('all');
                  setSearchQuery(category);
                }}
              />
            ))}
          </Box>
        )}

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
                onClick={() => handleGroupClick(group)}
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
                            logInteraction('group', group, 'join');
                            recordExperimentConversion('group-feed', groupVariant, 0.5);
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
