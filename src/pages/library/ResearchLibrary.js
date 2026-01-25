import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Fab,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add as AddIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
  CollectionsBookmark as CollectionsIcon
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fadeInUp } from '../../theme/animations';
import PaperCard from '../../components/library/PaperCard';
import PaperUploadDialog from '../../components/library/PaperUploadDialog';
import AdvancedSearchFilters from '../../components/library/AdvancedSearchFilters';
import { useToast, SearchTextField } from '../../components/common';
import { useGamification } from '../../context/GamificationContext';
import { createResearchAsset, searchResearchAssets, fetchResearchAssets } from '../../api/backend';

const currentYear = new Date().getFullYear();
const MIN_YEAR = 1990;

const ResearchLibrary = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { awardXP } = useGamification();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Advanced filter state
  const [filters, setFilters] = useState({
    topics: [],
    researchTypes: [],
    methodologies: [],
    journal: null,
    openAccess: false,
    yearFrom: MIN_YEAR,
    yearTo: currentYear,
    sortBy: 'relevance'
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Build search params from filters and query
  const buildSearchParams = useCallback(() => {
    const params = {};

    if (debouncedSearchQuery) {
      params.q = debouncedSearchQuery;
    }

    if (filters.topics.length > 0) {
      params.topics = filters.topics.join(',');
    }

    if (filters.researchTypes.length > 0) {
      params.researchType = filters.researchTypes.join(',');
    }

    if (filters.methodologies.length > 0) {
      params.methodology = filters.methodologies.join(',');
    }

    if (filters.journal) {
      params.journal = filters.journal;
    }

    if (filters.openAccess) {
      params.openAccess = 'true';
    }

    if (filters.yearFrom !== MIN_YEAR) {
      params.yearFrom = filters.yearFrom;
    }

    if (filters.yearTo !== currentYear) {
      params.yearTo = filters.yearTo;
    }

    params.sortBy = filters.sortBy || 'relevance';
    params.limit = 50;

    return params;
  }, [debouncedSearchQuery, filters]);

  // Use advanced search when we have a query or filters
  const hasActiveSearch = debouncedSearchQuery ||
    filters.topics.length > 0 ||
    filters.researchTypes.length > 0 ||
    filters.methodologies.length > 0 ||
    filters.journal ||
    filters.openAccess ||
    filters.yearFrom !== MIN_YEAR ||
    filters.yearTo !== currentYear;

  // Fetch papers using search or basic fetch
  const { data: papers = [], isLoading, isFetching } = useQuery({
    queryKey: ['research-assets', hasActiveSearch ? 'search' : 'all', buildSearchParams()],
    queryFn: () => hasActiveSearch
      ? searchResearchAssets(buildSearchParams())
      : fetchResearchAssets(),
    staleTime: 30000, // Cache for 30 seconds
    keepPreviousData: true
  });

  const uploadMutation = useMutation({
    mutationFn: (payload) => createResearchAsset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['research-assets']);
      awardXP('UPLOAD_PAPER');
      toast.success('Paper uploaded successfully');
    },
    onError: () => toast.error('Failed to upload paper')
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      topics: [],
      researchTypes: [],
      methodologies: [],
      journal: null,
      openAccess: false,
      yearFrom: MIN_YEAR,
      yearTo: currentYear,
      sortBy: 'relevance'
    });
    setSearchQuery('');
  };

  const handleUpload = (payload) => {
    uploadMutation.mutate({
      title: payload.title,
      description: payload.abstract,
      url: payload.url,
      type: payload.topic || 'paper',
      authors: JSON.stringify(payload.authors || []),
      doi: payload.doi,
      journal: payload.journal,
      abstract: payload.abstract,
      keywords: JSON.stringify(payload.keywords || [])
    });
  };

  // Parse authors from JSON string if needed
  const parseAuthors = (paper) => {
    if (Array.isArray(paper.authors)) return paper.authors;
    if (typeof paper.authors === 'string') {
      try {
        return JSON.parse(paper.authors);
      } catch {
        return [paper.authors];
      }
    }
    if (paper.owner) return [paper.owner.name];
    return ['Community member'];
  };

  // Parse topics/keywords from JSON string if needed
  const parseTopics = (paper) => {
    const source = paper.topics || paper.keywords;
    if (Array.isArray(source)) return source;
    if (typeof source === 'string') {
      try {
        return JSON.parse(source);
      } catch {
        return [];
      }
    }
    return [];
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ animation: `${fadeInUp} 0.4s ease-out` }}>
              Research Library
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore peer-reviewed research on psychedelic science and therapy
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CollectionsIcon />}
              onClick={() => navigate('/library/collections')}
            >
              Collections
            </Button>
            <Fab
              color="primary"
              size="medium"
              onClick={() => setUploadDialogOpen(true)}
              aria-label="upload paper"
            >
              <AddIcon />
            </Fab>
          </Box>
        </Box>

        {/* Tabs for Browse/My Library */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Browse All" />
          <Tab label="My Library" />
        </Tabs>

        {/* Search bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <SearchTextField
            placeholder="Search by title, author, keyword, DOI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, maxWidth: 500 }}
          />

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            size="small"
            onChange={(e, value) => value && setViewMode(value)}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Advanced Filters */}
        <AdvancedSearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          resultCount={papers.length}
          isSearching={isFetching}
        />

        {/* Results */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : papers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No papers found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search query or filters
            </Typography>
            {hasActiveSearch && (
              <Button onClick={handleClearFilters} sx={{ mt: 2 }}>
                Clear all filters
              </Button>
            )}
          </Box>
        ) : (
          <Grid container spacing={3}>
            {papers.map((paper, index) => (
              <Grid
                item
                xs={12}
                sm={viewMode === 'grid' ? 6 : 12}
                md={viewMode === 'grid' ? 4 : 12}
                key={paper.id}
                sx={{ animation: `${fadeInUp} 0.3s ease-out ${Math.min(index * 0.03, 0.3)}s backwards` }}
              >
                <PaperCard
                  paper={{
                    ...paper,
                    authors: parseAuthors(paper),
                    journal: paper.journal || 'Research Library',
                    year: paper.publishedDate
                      ? new Date(paper.publishedDate).getFullYear()
                      : new Date(paper.createdAt).getFullYear(),
                    abstract: paper.abstract || paper.description || '',
                    topics: parseTopics(paper),
                    rating: paper.averageRating || 0,
                    ratingCount: paper.reviewCount || 0,
                    views: paper.viewCount || 0,
                    downloads: paper.downloadCount || 0,
                    citations: paper.citationCount || 0,
                    discussionCount: paper.commentCount || 0,
                    fileUrl: paper.url || '#',
                    doi: paper.doi,
                    pmid: paper.pmid,
                    openAccess: paper.openAccess,
                    researchType: paper.researchType,
                    uploadedBy: paper.owner ? {
                      name: paper.owner.name,
                      avatar_url: paper.owner.avatar || paper.owner.avatarUrl
                    } : { name: 'Community', avatar_url: null },
                    uploadedAt: paper.createdAt,
                    relevanceScore: paper.relevanceScore
                  }}
                  viewMode={viewMode}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Show loading indicator when fetching more */}
        {isFetching && !isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Container>

      <PaperUploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onSubmit={handleUpload}
      />
    </Box>
  );
};

export default ResearchLibrary;
