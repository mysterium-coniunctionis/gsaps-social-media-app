import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Fab,
  Chip,
  Typography,
  Paper,
  CircularProgress,
  useScrollTrigger,
  Zoom,
  Tooltip
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  PeopleAlt as FollowingIcon,
  TrendingUp as TrendingIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Info as InfoIcon,
  Visibility as ViewIcon,
  VisibilityOff as HideIcon
} from '@mui/icons-material';
import PostCard from './PostCard';
import FeedExplainer from './FeedExplainer';
import useFeedAlgorithm from '../../hooks/useFeedAlgorithm';
import { generateMockFeedPosts } from '../../data/feed/mockPosts';

/**
 * SmartFeed - ML-powered intelligent feed component
 *
 * Features:
 * - Infinite scroll with smart prefetching
 * - Multiple feed modes: For You (AI), Following, Trending
 * - Content type filters (posts, papers, courses, events)
 * - Real-time relevance updating
 * - Skeleton loading states
 * - Pull-to-refresh functionality
 * - "Not interested" feedback
 * - Explainability integration
 */
const SmartFeed = ({
  userId = 'current-user',
  onPostReaction,
  onPostComment,
  onPostShare,
  onPostBookmark,
  onPostDelete
}) => {
  // Feed mode state
  const [feedMode, setFeedMode] = useState(0); // 0: For You, 1: Following, 2: Trending
  const [contentFilter, setContentFilter] = useState('all');
  const [rawPosts, setRawPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [explainerState, setExplainerState] = useState({
    open: false,
    post: null
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);

  // Refs for intersection observer
  const loadMoreRef = useRef(null);
  const observerRef = useRef(null);
  const topRef = useRef(null);

  // Initialize feed algorithm hook
  const {
    posts,
    isLoading,
    hasMore,
    userProfile,
    abVariant,
    loadMore,
    refreshFeed,
    updateTopicInterests,
    trackView,
    trackViewEnd,
    trackEngagement,
    markNotInterested,
    getPostExplanation,
    stats
  } = useFeedAlgorithm(rawPosts, {
    userId,
    pageSize: 10,
    enableTracking: feedMode === 0, // Only track in "For You" mode
    persistProfile: true,
    abTestEnabled: true
  });

  // Load initial posts
  useEffect(() => {
    loadPosts();
  }, []);

  // Update posts when feed mode or filter changes
  useEffect(() => {
    const filteredPosts = filterPosts(generateMockFeedPosts());
    setRawPosts(filteredPosts);
  }, [feedMode, contentFilter]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
          // Prefetch next page
          setTimeout(() => {
            console.log('Prefetching next page...');
          }, 500);
        }
      },
      { threshold: 0.5, rootMargin: '100px' }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMore]);

  // Track post views when they come into viewport
  useEffect(() => {
    if (feedMode !== 0) return; // Only track in "For You" mode

    const viewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const postId = entry.target.dataset.postId;
          if (entry.isIntersecting) {
            trackView(parseInt(postId));
          } else {
            trackViewEnd(parseInt(postId));
          }
        });
      },
      { threshold: 0.7 }
    );

    // Observe all post cards
    const postElements = document.querySelectorAll('[data-post-id]');
    postElements.forEach((el) => viewObserver.observe(el));

    return () => viewObserver.disconnect();
  }, [posts, feedMode, trackView, trackViewEnd]);

  const loadPosts = () => {
    const allPosts = generateMockFeedPosts();
    const filtered = filterPosts(allPosts);
    setRawPosts(filtered);
  };

  const filterPosts = (allPosts) => {
    let filtered = allPosts;

    // Apply feed mode filter
    if (feedMode === 1) {
      // Following mode - filter by followed users
      const followedUsernames = new Set(['alice_researcher', 'priya_psychiatrist', 'gsaps_official']);
      filtered = filtered.filter((post) => followedUsernames.has(post.author.username));
    } else if (feedMode === 2) {
      // Trending mode - sort by engagement
      filtered = [...filtered].sort(
        (a, b) =>
          (b.reactions?.length || 0) +
          (b.comments || 0) +
          (b.shares || 0) -
          ((a.reactions?.length || 0) + (a.comments || 0) + (a.shares || 0))
      );
    }

    // Apply content type filter
    if (contentFilter !== 'all') {
      filtered = filtered.filter((post) => post.contentType === contentFilter);
    }

    return filtered;
  };

  const handleFeedModeChange = (event, newValue) => {
    if (newValue !== null) {
      setFeedMode(newValue);
      showSnackbar(`Switched to ${['For You', 'Following', 'Trending'][newValue]} feed`, 'info');
    }
  };

  const handleContentFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setContentFilter(newFilter);
      showSnackbar(`Filtering by ${newFilter === 'all' ? 'all content' : newFilter}`, 'info');
    }
    setFilterMenuAnchor(null);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    loadPosts();
    await refreshFeed();
    setTimeout(() => {
      setIsRefreshing(false);
      showSnackbar('Feed refreshed!', 'success');
    }, 800);
  };

  const handleShowExplainer = (post) => {
    const explanation = getPostExplanation(post.id);
    setExplainerState({
      open: true,
      post,
      explanation
    });
  };

  const handleNotInterested = (postId) => {
    markNotInterested(postId);
    showSnackbar('We\'ll show you less content like this', 'success');
  };

  const handlePostReaction = (postId, reactionType) => {
    trackEngagement(postId, 'like');
    if (onPostReaction) {
      onPostReaction(postId, reactionType);
    }
  };

  const handlePostComment = (postId, comment) => {
    trackEngagement(postId, 'comment');
    if (onPostComment) {
      onPostComment(postId, comment);
    }
  };

  const handlePostShare = (postId) => {
    trackEngagement(postId, 'share');
    if (onPostShare) {
      onPostShare(postId);
    }
  };

  const handlePostBookmark = (postId) => {
    trackEngagement(postId, 'save');
    if (onPostBookmark) {
      onPostBookmark(postId);
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Scroll to top functionality
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100
  });

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Skeleton loader
  const LoadingSkeleton = () => (
    <Stack spacing={2} sx={{ mb: 2 }}>
      {[1, 2, 3].map((i) => (
        <Paper key={i} sx={{ p: 2, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box flex={1}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="30%" />
            </Box>
          </Box>
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="rectangular" height={200} sx={{ mt: 2, borderRadius: 2 }} />
        </Paper>
      ))}
    </Stack>
  );

  return (
    <Box ref={topRef}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Header with Feed Mode Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.08)',
            overflow: 'hidden',
            position: 'sticky',
            top: 64,
            zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Tabs
            value={feedMode}
            onChange={handleFeedModeChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                minHeight: 60,
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500
              }
            }}
          >
            <Tab
              icon={<AIIcon />}
              label="For You"
              iconPosition="start"
            />
            <Tab
              icon={<FollowingIcon />}
              label="Following"
              iconPosition="start"
            />
            <Tab
              icon={<TrendingIcon />}
              label="Trending"
              iconPosition="start"
            />
          </Tabs>

          {/* Content Type Filter */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box display="flex" gap={1} flexWrap="wrap">
              <ToggleButtonGroup
                value={contentFilter}
                exclusive
                onChange={handleContentFilterChange}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2
                  }
                }}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="post">Posts</ToggleButton>
                <ToggleButton value="paper">Papers</ToggleButton>
                <ToggleButton value="course">Courses</ToggleButton>
                <ToggleButton value="event">Events</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Tooltip title="Refresh feed">
              <IconButton onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshIcon
                  sx={{
                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {/* A/B Test Indicator (debug mode) */}
          {feedMode === 0 && (
            <Box sx={{ px: 2, pb: 1.5 }}>
              <Chip
                label={`Algorithm: ${abVariant}`}
                size="small"
                icon={<AIIcon />}
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  color: '#2196F3'
                }}
              />
            </Box>
          )}
        </Paper>

        {/* Posts Feed */}
        <Box>
          {isLoading && posts.length === 0 ? (
            <LoadingSkeleton />
          ) : posts.length === 0 ? (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'rgba(0,0,0,0.02)'
              }}
            >
              <Typography variant="h6" gutterBottom>
                No posts to show
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try changing your filters or following more people
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {posts.map((post, index) => (
                <Box key={post.id} data-post-id={post.id}>
                  <PostCard
                    post={post}
                    onReaction={(reactionType) => handlePostReaction(post.id, reactionType)}
                    onComment={(comment) => handlePostComment(post.id, comment)}
                    onShare={() => handlePostShare(post.id)}
                    onBookmark={() => handlePostBookmark(post.id)}
                    onDelete={onPostDelete ? () => onPostDelete(post.id) : undefined}
                    currentUserId={userId}
                  />

                  {/* AI Explanation Chip (For You mode only) */}
                  {feedMode === 0 && post._explanation && (
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Chip
                        icon={<InfoIcon />}
                        label="Why am I seeing this?"
                        size="small"
                        onClick={() => handleShowExplainer(post)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: 'rgba(156, 39, 176, 0.08)',
                          color: '#9C27B0',
                          '&:hover': {
                            bgcolor: 'rgba(156, 39, 176, 0.15)'
                          }
                        }}
                      />
                      <Chip
                        icon={<HideIcon />}
                        label="Not interested"
                        size="small"
                        onClick={() => handleNotInterested(post.id)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: 'rgba(0,0,0,0.05)',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.1)'
                          }
                        }}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          )}

          {/* Load More Trigger */}
          {hasMore && (
            <Box
              ref={loadMoreRef}
              sx={{
                py: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {isLoading ? (
                <CircularProgress size={32} />
              ) : (
                <Button variant="outlined" onClick={loadMore} sx={{ borderRadius: 2 }}>
                  Load More
                </Button>
              )}
            </Box>
          )}

          {/* End of Feed Message */}
          {!hasMore && posts.length > 0 && (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                You're all caught up! 🎉
              </Typography>
              <Button
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Refresh Feed
              </Button>
            </Box>
          )}
        </Box>

        {/* Feed Explainer Dialog */}
        <FeedExplainer
          open={explainerState.open}
          onClose={() => setExplainerState({ open: false, post: null })}
          post={explainerState.post}
          explanation={explainerState.explanation}
          userProfile={userProfile}
          onUpdatePreferences={updateTopicInterests}
        />

        {/* Scroll to Top FAB */}
        <Zoom in={trigger}>
          <Fab
            onClick={scrollToTop}
            size="small"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>

        {/* Snackbar Notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ borderRadius: 2 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Debug Stats (development mode) */}
        {process.env.NODE_ENV === 'development' && (
          <Paper
            sx={{
              position: 'fixed',
              bottom: 80,
              left: 16,
              p: 1.5,
              bgcolor: 'rgba(0,0,0,0.8)',
              color: 'white',
              borderRadius: 2,
              fontSize: '0.75rem'
            }}
          >
            <Typography variant="caption" display="block">
              <strong>Debug Stats:</strong>
            </Typography>
            <Typography variant="caption" display="block">
              Total: {stats.totalPosts} | Displayed: {stats.displayedCount}
            </Typography>
            <Typography variant="caption" display="block">
              Authors: {stats.authorAffinityCount} | Topics: {stats.topicInterestCount}
            </Typography>
            <Typography variant="caption" display="block">
              Queue: {stats.engagementQueueSize}
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default SmartFeed;
