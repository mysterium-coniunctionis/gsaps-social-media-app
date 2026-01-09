import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Alert
} from '@mui/material';
import {
  School as MentorIcon,
  People as PeopleIcon,
  Handshake as CollaborateIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { SearchTextField } from '../components/common';
import MatchCard from '../components/network/MatchCard';
import CompatibilityRadar from '../components/network/CompatibilityRadar';
import ConnectionRequest from '../components/network/ConnectionRequest';
import NetworkStats from '../components/network/NetworkStats';
import {
  getMatchRecommendations,
  getUserConnections,
  getNetworkAnalytics,
  getSuccessStories,
  sendConnectionRequest,
  getIntroMessageSuggestions,
  searchProfessionals
} from '../api/networkService';
import { professionalProfiles } from '../data/networkData';

/**
 * Mentor Network Page
 * AI-powered professional networking and mentor matching
 */
const MentorNetwork = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [connections, setConnections] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [successStories, setSuccessStories] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [connectionType, setConnectionType] = useState('peer');
  const [message, setMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  const expertiseOptions = [
    'MDMA Therapy',
    'Psilocybin Research',
    'Clinical Trials',
    'Neuroscience',
    'Integration Therapy',
    'Ketamine Therapy',
    'Harm Reduction',
    'Data Analysis',
    'Pharmacology',
    'Ethnobotany'
  ];

  const experienceLevels = [
    { value: 'student', label: 'Student' },
    { value: 'early-career', label: 'Early Career (0-5 years)' },
    { value: 'mid-career', label: 'Mid Career (5-15 years)' },
    { value: 'senior', label: 'Senior (15+ years)' }
  ];

  useEffect(() => {
    loadData();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
      loadMatches();
    }
  }, [activeTab, expertiseFilter, locationFilter, experienceLevelFilter, availabilityFilter, searchQuery]);

  const loadData = async () => {
    try {
      setLoading(true);

      if (activeTab === 0 || activeTab === 1 || activeTab === 2) {
        await loadMatches();
      } else if (activeTab === 3) {
        const [conns, stats] = await Promise.all([
          getUserConnections(currentUser?.id),
          getNetworkAnalytics(currentUser?.id)
        ]);
        setConnections(conns);
        setAnalytics(stats);
      }

      // Load success stories for the first time
      if (successStories.length === 0) {
        const stories = await getSuccessStories();
        setSuccessStories(stories);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMatches = async () => {
    try {
      let filterType = null;
      if (activeTab === 0) filterType = 'mentor';
      else if (activeTab === 1) filterType = 'mentee';
      else if (activeTab === 2) filterType = 'collaborator';

      let results;

      if (searchQuery || expertiseFilter.length > 0 || locationFilter || experienceLevelFilter || availabilityFilter) {
        // Use search when filters are applied
        results = await searchProfessionals({
          query: searchQuery,
          expertise: expertiseFilter,
          location: locationFilter,
          experienceLevel: experienceLevelFilter,
          availability: availabilityFilter
        });

        // Convert to match format
        results = results.map(profile => ({
          profile,
          totalScore: 75, // Default score for search results
          breakdown: {
            expertise: 70,
            experience: 75,
            availability: 80,
            goals: 70,
            communication: 75,
            mutualConnections: 60
          },
          reasoning: ['Found via search']
        }));
      } else {
        // Use AI matching
        results = await getMatchRecommendations(currentUser, {
          type: filterType,
          expertise: expertiseFilter,
          location: locationFilter,
          experienceLevel: experienceLevelFilter,
          limit: 12
        });
      }

      setMatches(results);
    } catch (error) {
      console.error('Error loading matches:', error);
      setMatches([]);
    }
  };

  const handleConnect = async (profile) => {
    setSelectedMatch(profile);
    setSendDialogOpen(true);
    setMessage('');

    // Determine connection type based on active tab
    let type = 'peer';
    if (activeTab === 0) type = 'mentor';
    else if (activeTab === 1) type = 'mentee';
    else if (activeTab === 2) type = 'collaboration';

    setConnectionType(type);

    // Get AI suggestions
    try {
      const introSuggestions = await getIntroMessageSuggestions(
        currentUser,
        profile,
        type
      );
      setSuggestions(introSuggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSendRequest = async () => {
    try {
      await sendConnectionRequest({
        fromUserId: currentUser?.id,
        toUserId: selectedMatch.id,
        type: connectionType,
        message
      });
      setSuccessMessage('Connection request sent successfully!');
      setSendDialogOpen(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setExpertiseFilter([]);
    setLocationFilter('');
    setExperienceLevelFilter('');
    setAvailabilityFilter('');
  };

  const hasActiveFilters = searchQuery || expertiseFilter.length > 0 || locationFilter || experienceLevelFilter || availabilityFilter;

  // Get featured match (highest scoring) for radar chart
  const featuredMatch = matches.length > 0 ? matches[0] : null;

  const tabLabels = [
    { label: 'Find Mentors', icon: <MentorIcon /> },
    { label: 'Find Mentees', icon: <MentorIcon sx={{ transform: 'rotate(180deg)' }} /> },
    { label: 'Collaborators', icon: <CollaborateIcon /> },
    { label: 'My Network', icon: <PeopleIcon /> }
  ];

  return (
    <Box sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Smart Mentor Matching
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered professional networking to accelerate your career in psychedelic research
        </Typography>
      </Box>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {tabLabels.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Card>

      {/* Search and Filters (for Find tabs) */}
      {activeTab < 3 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <SearchTextField
                  placeholder="Search professionals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Autocomplete
                  multiple
                  options={expertiseOptions}
                  value={expertiseFilter}
                  onChange={(e, newValue) => setExpertiseFilter(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Expertise" size="small" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.slice(0, 1).map((option, index) => (
                      <Chip
                        label={value.length > 1 ? `${option} +${value.length - 1}` : option}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    value={experienceLevelFilter}
                    onChange={(e) => setExperienceLevelFilter(e.target.value)}
                    label="Experience Level"
                  >
                    <MenuItem value="">All Levels</MenuItem>
                    {experienceLevels.map((level) => (
                      <MenuItem key={level.value} value={level.value}>
                        {level.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Availability</InputLabel>
                  <Select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    label="Availability"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {hasActiveFilters && (
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={clearFilters}
                      fullWidth
                      size="small"
                    >
                      Clear
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    onClick={loadMatches}
                    fullWidth
                    size="small"
                  >
                    Apply
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Find Mentors/Mentees/Collaborators Tabs */}
          {activeTab < 3 && (
            <Grid container spacing={3}>
              {/* Featured Match with Radar Chart */}
              {featuredMatch && (
                <Grid item xs={12} md={4}>
                  <CompatibilityRadar breakdown={featuredMatch.breakdown} />
                </Grid>
              )}

              {/* Matches Grid */}
              <Grid item xs={12} md={featuredMatch ? 8 : 12}>
                {matches.length === 0 ? (
                  <Card>
                    <CardContent sx={{ textAlign: 'center', py: 6 }}>
                      <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No matches found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or check back later for new professionals
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  <Grid container spacing={3}>
                    {matches.map((match, index) => (
                      <Grid item xs={12} sm={6} lg={featuredMatch ? 6 : 4} key={match.profile.id}>
                        <MatchCard
                          match={match}
                          onConnect={handleConnect}
                          compact={index > 2}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>

              {/* Success Stories Section */}
              {successStories.length > 0 && (
                <Grid item xs={12}>
                  <Card sx={{ bgcolor: 'background.default' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <TrophyIcon sx={{ color: 'primary.main' }} />
                        <Typography variant="h6">Success Stories</Typography>
                      </Box>
                      <Grid container spacing={2}>
                        {successStories.map((story) => (
                          <Grid item xs={12} md={4} key={story.id}>
                            <Card>
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  {story.mentorName} & {story.menteeName}
                                </Typography>
                                <Chip
                                  label={story.relationship}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                  sx={{ mb: 1 }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  {story.story}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    display: 'block',
                                    fontWeight: 'bold',
                                    color: 'success.main'
                                  }}
                                >
                                  {story.outcome}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
                                  {story.tags.slice(0, 2).map((tag, i) => (
                                    <Chip key={i} label={tag} size="small" variant="outlined" />
                                  ))}
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}

          {/* My Network Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              {/* Network Analytics */}
              <Grid item xs={12}>
                <NetworkStats analytics={analytics} />
              </Grid>

              {/* Connection Requests */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Connection Requests
                    </Typography>
                    <ConnectionRequest currentUser={currentUser} />
                  </CardContent>
                </Card>
              </Grid>

              {/* My Connections */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                      My Connections ({connections.length})
                    </Typography>
                    <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                      {connections.map((connection) => (
                        <Box
                          key={connection.id}
                          sx={{
                            display: 'flex',
                            gap: 2,
                            p: 2,
                            mb: 1,
                            borderRadius: 1,
                            bgcolor: 'background.default',
                            '&:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          <Box
                            component="img"
                            src={connection.avatar_url}
                            sx={{ width: 48, height: 48, borderRadius: 1 }}
                          />
                          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography variant="subtitle2" noWrap>
                              {connection.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" noWrap>
                              {connection.title}
                            </Typography>
                            <Chip
                              label={connection.relationshipType}
                              size="small"
                              variant="outlined"
                              sx={{ mt: 0.5, textTransform: 'capitalize' }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </>
      )}

      {/* Send Connection Request Dialog */}
      <Dialog
        open={sendDialogOpen}
        onClose={() => setSendDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Connect with {selectedMatch?.name}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
            <InputLabel>Connection Type</InputLabel>
            <Select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              label="Connection Type"
            >
              <MenuItem value="mentor">Seeking Mentor</MenuItem>
              <MenuItem value="mentee">Willing to Mentor</MenuItem>
              <MenuItem value="peer">Peer Connection</MenuItem>
              <MenuItem value="collaboration">Research Collaboration</MenuItem>
            </Select>
          </FormControl>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                AI-Suggested Messages
              </Typography>
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={() => setMessage(suggestion)}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography variant="body2" color="text.secondary">
                      {suggestion}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Message"
            placeholder="Introduce yourself and explain why you'd like to connect..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSendRequest}
            disabled={!message.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MentorNetwork;
