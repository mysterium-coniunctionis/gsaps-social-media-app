import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Fab,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { fadeInUp } from '../theme/animations';
import { useGamification } from '../context/GamificationContext';
import fetchMockPosts from '../data/feed/mockPosts';

/**
 * Activity Feed Page - The heart of the social platform
 * Displays posts from the community with engagement features
 */
const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { awardXP, updateStat } = useGamification();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [composerOpen, setComposerOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState('all'); // all, following, trending - TODO: implement filter UI

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    try {
      const mockPosts = await fetchMockPosts(filter);
      setPosts(mockPosts);
    } catch (error) {
      console.error('Failed to load feed posts', error);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = useCallback((newPost) => {
    // Add new post to the feed
    const post = {
      id: Date.now(),
      author: {
        id: 'current-user',
        name: 'You',
        username: 'your_username',
        avatar: ''
      },
      content: newPost.content,
      images: newPost.images || [],
      timestamp: new Date(),
      reactions: [],
      currentUserReaction: null,
      comments: 0,
      shares: 0,
      isBookmarked: false,
      tags: newPost.tags || []
    };

    setPosts(prevPosts => [post, ...prevPosts]);
    setComposerOpen(false);

    // Award XP for creating post
    if (newPost.images && newPost.images.length > 0) {
      awardXP('POST_WITH_IMAGE'); // +15 XP for post with image
    } else {
      awardXP('CREATE_POST'); // +10 XP for regular post
    }

    // Bonus XP for using tags
    if (newPost.tags && newPost.tags.length > 0) {
      awardXP('POST_WITH_TAGS'); // +5 XP bonus for tagging
    }

    // Update stats
    updateStat('posts_created');
  }, [awardXP, updateStat]);

  const handleReaction = useCallback((postId, reactionType) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const currentUserReaction = post.currentUserReaction;
        let newReactions = [...post.reactions];

        // Remove current user's existing reaction
        newReactions = newReactions.filter(r => r.user.id !== 'current-user');

        // If different reaction or no previous reaction, add new one
        if (reactionType !== null && reactionType !== currentUserReaction) {
          newReactions.push({
            type: reactionType,
            user: {
              id: 'current-user',
              name: 'You',
              username: 'your_username',
              avatar_url: ''
            }
          });

          // Award XP for adding reaction
          awardXP('ADD_REACTION'); // +3 XP for reacting to post
          updateStat('reactions_given');
        }

        return {
          ...post,
          reactions: newReactions,
          currentUserReaction: (reactionType === currentUserReaction) ? null : reactionType
        };
      }
      return post;
    }));
  }, [awardXP, updateStat]);

  const handleBookmark = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  }, []);

  const handleComment = useCallback((postId, comment) => {
    // TODO: Add comment to post

    // Award XP for commenting
    awardXP('COMMENT'); // +5 XP for commenting
    updateStat('comments_made');
  }, [awardXP, updateStat]);

  const handleShare = useCallback((postId) => {
    // TODO: Share functionality

    // Award XP for sharing
    awardXP('SHARE_POST'); // +8 XP for sharing
    updateStat('posts_shared');
  }, [awardXP, updateStat]);

  const handleDelete = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="md" sx={{ pt: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 1,
              animation: `${fadeInUp} 0.5s ease-out`
            }}
          >
            Activity Feed
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              animation: `${fadeInUp} 0.5s ease-out 0.1s backwards`
            }}
          >
            Stay updated with the latest from the GSAPS community
          </Typography>
        </Box>

        {/* Filter Tabs - Future enhancement */}
        {/* <Tabs value={filter} onChange={(e, v) => setFilter(v)}>
          <Tab label="All Posts" value="all" />
          <Tab label="Following" value="following" />
          <Tab label="Trending" value="trending" />
        </Tabs> */}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Posts Feed */}
        {!loading && posts.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map((post, index) => (
              <Box
                key={post.id}
                sx={{
                  animation: `${fadeInUp} 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <PostCard
                  post={post}
                  onReaction={handleReaction}
                  onComment={handleComment}
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                  onDelete={handleDelete}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              animation: `${fadeInUp} 0.5s ease-out`
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No posts yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Be the first to share something with the community!
            </Typography>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => setComposerOpen(true)}
            >
              <AddIcon sx={{ mr: 1 }} />
              Create Post
            </Fab>
          </Box>
        )}

        {/* Floating Action Button */}
        {!loading && posts.length > 0 && (
          <Fab
            color="primary"
            aria-label="create post"
            onClick={() => setComposerOpen(true)}
            sx={{
              position: 'fixed',
              bottom: isMobile ? 80 : 24,
              right: 24,
              boxShadow: 6,
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 8
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Post Composer Modal */}
        <PostComposer
          open={composerOpen}
          onClose={() => setComposerOpen(false)}
          onSubmit={handleCreatePost}
        />
      </Container>
    </Box>
  );
};

export default Feed;
