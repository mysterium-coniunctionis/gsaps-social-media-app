import React, { useState, useCallback, useMemo } from 'react';
import {
  Alert,
  Box,
  Container,
  Typography,
  Fab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Button
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { fadeInUp } from '../theme/animations';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { createPost, deletePost, fetchPosts, reactToPost } from '../api/backend';

const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { awardXP, updateStat } = useGamification();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });
  const [composerOpen, setComposerOpen] = useState(false);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries(['posts'])
  });

  const reactMutation = useMutation({
    mutationFn: reactToPost,
    onSuccess: ({ postId, reactions }) => {
      queryClient.setQueryData(['posts'], (previous) => {
        if (!previous) return previous;
        return previous.map((post) =>
          post.id === postId
            ? {
                ...post,
                reactions,
                currentUserReaction: reactions.find((r) => r.userId === currentUser?.id)?.type || null
              }
            : post
        );
      });
    }
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries(['posts'])
  });

  const handleCreatePost = useCallback(
    (newPost) => {
      createPostMutation.mutate({
        ...newPost,
        tags: newPost.tags || []
      });
      setComposerOpen(false);

      if (newPost.images && newPost.images.length > 0) {
        awardXP('POST_WITH_IMAGE');
      } else {
        awardXP('CREATE_POST');
      }

      if (newPost.tags && newPost.tags.length > 0) {
        awardXP('POST_WITH_TAGS');
      }

      updateStat('posts_created');
    },
    [awardXP, createPostMutation, updateStat]
  );

  const handleReaction = useCallback(
    (postId, reactionType) => {
      reactMutation.mutate({ postId, type: reactionType });
      awardXP('ADD_REACTION');
      updateStat('reactions_given');
    },
    [awardXP, reactMutation, updateStat]
  );

  const handleBookmark = useCallback(
    (postId) => {
      queryClient.setQueryData(['posts'], (prev) =>
        prev?.map((post) =>
          post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
        )
      );
    },
    [queryClient]
  );

  const handleComment = useCallback(
    (postId, comment) => {
      awardXP('COMMENT');
      updateStat('comments_made');
    },
    [awardXP, updateStat]
  );

  const handleShare = useCallback(
    (postId) => {
      awardXP('SHARE_POST');
      updateStat('posts_shared');
    },
    [awardXP, updateStat]
  );

  const handleDelete = useCallback(
    (postId) => {
      deletePostMutation.mutate(postId);
    },
    [deletePostMutation]
  );

  const normalizedPosts = useMemo(
    () => posts.map((post) => ({ ...post, timestamp: new Date(post.timestamp) })),
    [posts]
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="md" sx={{ pt: 3 }}>
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

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && normalizedPosts.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {normalizedPosts.map((post, index) => (
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
                  currentUserId={currentUser?.id || 'current-user'}
                />
              </Box>
            ))}
          </Box>
        )}

        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setComposerOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: isMobile ? 16 : 32,
            boxShadow: 8,
            animation: `${fadeInUp} 0.5s ease-out 0.2s backwards`
          }}
        >
          <AddIcon />
        </Fab>

        <PostComposer
          open={composerOpen}
          onClose={() => setComposerOpen(false)}
          onSubmit={handleCreatePost}
        />

        <GuidelinesGate
          open={guidelinesOpen}
          guidelines={communityGuidelines}
          onAccept={handleAcceptGuidelines}
          onClose={() => setGuidelinesOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default Feed;
