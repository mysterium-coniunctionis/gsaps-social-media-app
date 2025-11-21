import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  CircularProgress,
  Alert,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fadeInUp } from '../../theme/animations';
import PaperCard from '../../components/library/PaperCard';
import PaperUploadDialog from '../../components/library/PaperUploadDialog';
import { useToast } from '../../components/common';
import { useGamification } from '../../context/GamificationContext';
import { RESEARCH_PAPERS } from '../../data/researchPapersData';
import {
  getRecommendations,
  logInteraction,
  recordExperimentConversion,
  recordExperimentImpression,
  useExperiment
} from '../../utils/recommendationService';

/**
 * ResearchLibrary Page
 * Browse, search, and upload research papers
 * Member-driven content library for GSAPS community
 */
const ResearchLibrary = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { awardXP, updateStat } = useGamification();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [recommendedPapers, setRecommendedPapers] = useState([]);
  const recommendationVariant = useExperiment('library-feed', ['control', 'personalized']);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!loading && papers.length) {
      const recommendations = getRecommendations('paper', papers, {
        variant: recommendationVariant,
        limit: 6
      });
      setRecommendedPapers(recommendations);
      recordExperimentImpression('library-feed', recommendationVariant, recommendations.length);
    }
  }, [papers, loading, recommendationVariant]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      logInteraction(
        'paper',
        { id: `search-${debouncedSearchQuery}`, keywords: [debouncedSearchQuery] },
        'search'
      );
    }
  }, [debouncedSearchQuery]);

  // Available filter options
  const topics = [
    'all',
    'psilocybin',
    'mdma',
    'lsd',
    'ayahuasca',
    'dmt',
    'ketamine',
    'neuroscience',
    'therapy',
    'consciousness',
    'clinical-trials'
  ];

  const years = ['all', '2025', '2024', '2023', '2022', '2021', '2020', 'older'];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'citations', label: 'Most Cited' },
    { value: 'discussed', label: 'Most Discussed' }
  ];

  // Fetch papers from API (mock data for now)
  useEffect(() => {
    fetchPapers();
  }, [filterTopic, filterYear, sortBy]);

  const fetchPapers = async () => {
    setLoading(true);

    // TODO: Replace with real API call when backend is ready
    // For now, using comprehensive data from researchPapersData.js
    setTimeout(() => {
      setPapers(RESEARCH_PAPERS);
      setLoading(false);
    }, 800);
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleUploadSuccess = useCallback((newPaper) => {
    setPapers(prevPapers => [newPaper, ...prevPapers]);
    setUploadDialogOpen(false);
    toast.success('Research paper uploaded successfully!');

    // Award XP for uploading paper (major contribution!)
    awardXP('UPLOAD_PAPER'); // +50 XP for uploading research paper
    updateStat('papers_uploaded');
  }, [toast, awardXP, updateStat]);

  const handlePaperClick = useCallback((paper) => {
    logInteraction('paper', paper, 'click');
    recordExperimentConversion('library-feed', recommendationVariant, 1);
    navigate(`/library/${paper.id}`);
  }, [navigate, recommendationVariant]);

  const handleToggleLibrary = useCallback((paperId) => {
    setPapers(prevPapers => {
      const updatedPapers = prevPapers.map(paper =>
        paper.id === paperId
          ? { ...paper, inMyLibrary: !paper.inMyLibrary }
          : paper
      );

      // Find paper and show toast
      const paper = updatedPapers.find(p => p.id === paperId);
      if (paper) {
        toast.success(paper.inMyLibrary ? 'Added to your library' : 'Removed from your library');
        logInteraction('paper', paper, paper.inMyLibrary ? 'save' : 'view');
        recordExperimentConversion('library-feed', recommendationVariant, 0.5);
      }

      return updatedPapers;
    });
  }, [toast, recommendationVariant]);

  // Filter papers based on search and filters - memoized for performance
  const filteredPapers = useMemo(() => papers.filter(paper => {
    // Search filter - use debounced query
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      const matchesTitle = paper.title.toLowerCase().includes(query);
      const matchesAuthors = paper.authors.some(author => author.toLowerCase().includes(query));
      const matchesAbstract = paper.abstract.toLowerCase().includes(query);
      const matchesDOI = paper.doi.toLowerCase().includes(query);

      if (!matchesTitle && !matchesAuthors && !matchesAbstract && !matchesDOI) {
        return false;
      }
    }

    // Topic filter
    if (filterTopic !== 'all' && !paper.topics.includes(filterTopic)) {
      return false;
    }

    // Year filter
    if (filterYear !== 'all') {
      if (filterYear === 'older' && paper.year >= 2020) return false;
      if (filterYear !== 'older' && paper.year !== parseInt(filterYear)) return false;
    }

    return true;
  }), [papers, debouncedSearchQuery, filterTopic, filterYear]);

  const relatedTopics = useMemo(() => {
    const topics = new Set();
    recommendedPapers.forEach(paper => paper.topics?.forEach(topic => topics.add(topic)));
    return Array.from(topics).slice(0, 6);
  }, [recommendedPapers]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  animation: `${fadeInUp} 0.5s ease-out`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                📚 Research Library
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ animation: `${fadeInUp} 0.5s ease-out 0.1s backwards` }}
              >
                Member-driven collection of psychedelic research papers
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setUploadDialogOpen(true)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                animation: `${fadeInUp} 0.5s ease-out 0.2s backwards`
              }}
            >
              Upload Paper
            </Button>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
            <Chip
              icon={<TrendingIcon />}
              label={`${papers.length} Papers`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`${papers.reduce((sum, p) => sum + p.views, 0).toLocaleString()} Total Views`}
              variant="outlined"
            />
          <Chip
            label={`${papers.reduce((sum, p) => sum + p.citations, 0)} Citations`}
            variant="outlined"
          />
        </Box>

        {recommendedPapers.length > 0 && (
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              For You
              <Chip
                size="small"
                color={recommendationVariant === 'control' ? 'default' : 'primary'}
                label={recommendationVariant === 'control' ? 'Baseline' : 'Personalized'}
              />
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We capture your searches, saves, and clicks to tune this feed and compare lift against a trending baseline.
            </Typography>
            <Grid container spacing={2}>
              {recommendedPapers.map(paper => (
                <Grid item xs={12} md={4} key={`rec-${paper.id}`}>
                  <PaperCard
                    paper={paper}
                    viewMode="grid"
                    onToggleLibrary={handleToggleLibrary}
                    onClick={() => handlePaperClick(paper)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        </Box>

        {/* Search and Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search by title, author, DOI, or keywords..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Grid>

            {/* Topic Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Topic</InputLabel>
                <Select
                  value={filterTopic}
                  label="Topic"
                  onChange={(e) => setFilterTopic(e.target.value)}
                  startAdornment={<FilterIcon sx={{ mr: 1, color: 'action.active' }} />}
                >
                  {topics.map(topic => (
                    <MenuItem key={topic} value={topic}>
                      {topic === 'all' ? 'All Topics' : topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Year Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Year</InputLabel>
                <Select
                  value={filterYear}
                  label="Year"
                  onChange={(e) => setFilterYear(e.target.value)}
                >
                  {years.map(year => (
                    <MenuItem key={year} value={year}>
                      {year === 'all' ? 'All Years' : year === 'older' ? 'Before 2020' : year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Sort */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* View Mode Toggle */}
            <Grid item xs={12} sm={6} md={1}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                size="small"
                fullWidth
              >
                <ToggleButton value="grid">
                  <GridIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="list">
                  <ListIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>

        {/* Active Filters */}
        {(searchQuery || filterTopic !== 'all' || filterYear !== 'all') && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Active filters:
            </Typography>
            {searchQuery && (
              <Chip
                label={`Search: "${searchQuery}"`}
                size="small"
                onDelete={() => setSearchQuery('')}
              />
            )}
            {filterTopic !== 'all' && (
              <Chip
                label={`Topic: ${filterTopic}`}
                size="small"
                onDelete={() => setFilterTopic('all')}
              />
            )}
            {filterYear !== 'all' && (
              <Chip
                label={`Year: ${filterYear}`}
                size="small"
                onDelete={() => setFilterYear('all')}
              />
            )}
          </Box>
        )}

        {/* Results Count */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {filteredPapers.length} {filteredPapers.length === 1 ? 'paper' : 'papers'} found
        </Typography>

        {!loading && relatedTopics.length > 0 && (
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Related topics from your signals:
            </Typography>
            {relatedTopics.map(topic => (
              <Chip
                key={topic}
                size="small"
                label={topic}
                color="primary"
                variant="outlined"
                onClick={() => setFilterTopic(topic)}
              />
            ))}
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Papers Grid/List */}
        {!loading && filteredPapers.length > 0 && (
          <Grid container spacing={3}>
            {filteredPapers.map((paper, index) => (
              <Grid
                item
                xs={12}
                sm={viewMode === 'grid' ? 6 : 12}
                md={viewMode === 'grid' ? 4 : 12}
                key={paper.id}
                sx={{
                  animation: `${fadeInUp} 0.5s ease-out ${index * 0.05}s backwards`
                }}
              >
                <PaperCard
                  paper={paper}
                  viewMode={viewMode}
                  onToggleLibrary={handleToggleLibrary}
                  onClick={() => handlePaperClick(paper)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && filteredPapers.length === 0 && (
          <Alert severity="info" sx={{ mt: 4 }}>
            No papers found matching your criteria. Try adjusting your filters or{' '}
            <Button size="small" onClick={() => setUploadDialogOpen(true)}>
              upload a paper
            </Button>
            .
          </Alert>
        )}

        {/* Upload FAB (mobile) */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            display: { xs: 'flex', md: 'none' }
          }}
          onClick={() => setUploadDialogOpen(true)}
        >
          <AddIcon />
        </Fab>

        {/* Upload Dialog */}
        <PaperUploadDialog
          open={uploadDialogOpen}
          onClose={() => setUploadDialogOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      </Container>
    </Box>
  );
};

export default ResearchLibrary;
