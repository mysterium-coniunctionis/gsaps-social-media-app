import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { Add as AddIcon, ViewList as ListIcon, ViewModule as GridIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fadeInUp } from '../../theme/animations';
import PaperCard from '../../components/library/PaperCard';
import PaperUploadDialog from '../../components/library/PaperUploadDialog';
import { useToast, SearchTextField } from '../../components/common';
import { useGamification } from '../../context/GamificationContext';
import { createResearchAsset, fetchResearchAssets } from '../../api/backend';
import { useExperiment } from '../../utils/recommendationService';

const ResearchLibrary = () => {
  const toast = useToast();
  const { awardXP } = useGamification();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [filterTopic, setFilterTopic] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [recommendedPapers, setRecommendedPapers] = useState([]);
  // TODO: Implement useExperiment hook for A/B testing
  const recommendationVariant = 'control'; // useExperiment('library-feed', ['control', 'personalized']);

  const { data: papers = [], isLoading } = useQuery({ queryKey: ['research-assets'], queryFn: fetchResearchAssets });

  const uploadMutation = useMutation({
    mutationFn: (payload) => createResearchAsset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['research-assets']);
      awardXP('UPLOAD_PAPER');
      toast.success('Paper uploaded');
    },
    onError: () => toast.error('Failed to upload paper')
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const topics = ['all', 'psilocybin', 'mdma', 'lsd', 'ayahuasca', 'neuroscience', 'therapy'];

  const filteredPapers = useMemo(() => {
    const query = debouncedSearchQuery.toLowerCase();
    return papers
      .filter((paper) => {
        if (query) {
          const matchesTitle = paper.title.toLowerCase().includes(query);
          const matchesDesc = paper.description?.toLowerCase().includes(query);
          if (!matchesTitle && !matchesDesc) return false;
        }
        if (filterTopic !== 'all' && paper.type !== filterTopic) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.reactions || 0) - (a.reactions || 0);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [papers, debouncedSearchQuery, filterTopic, sortBy]);

  const handleUpload = (payload) => {
    uploadMutation.mutate({
      title: payload.title,
      description: payload.abstract,
      url: payload.url,
      type: payload.topic || 'paper'
    });
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ animation: `${fadeInUp} 0.4s ease-out` }}>
              Research Library
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access shared datasets, papers, and assets from the community.
            </Typography>
          </Box>
          <Fab color="primary" size="medium" onClick={() => setUploadDialogOpen(true)} aria-label="upload">
            <AddIcon />
          </Fab>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <SearchTextField
            placeholder="Search research"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ minWidth: 240 }}
          />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Topic</InputLabel>
            <Select value={filterTopic} label="Topic" onChange={(e) => setFilterTopic(e.target.value)}>
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Sort</InputLabel>
            <Select value={sortBy} label="Sort" onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="recent">Most recent</MenuItem>
              <MenuItem value="popular">Most popular</MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            size="small"
            onChange={(e, value) => value && setViewMode(value)}
          >
            <ToggleButton value="grid">
              <GridIcon />
            </ToggleButton>
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredPapers.map((paper, index) => (
              <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} key={paper.id} sx={{ animation: `${fadeInUp} 0.3s ease-out ${index * 0.05}s backwards` }}>
                <PaperCard
                  paper={{
                    ...paper,
                    authors: paper.owner ? [paper.owner.name] : ['Community member'],
                    published: paper.createdAt,
                    citations: paper.citations || 0
                  }}
                  viewMode={viewMode}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <PaperUploadDialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} onSubmit={handleUpload} />
    </Box>
  );
};

export default ResearchLibrary;
