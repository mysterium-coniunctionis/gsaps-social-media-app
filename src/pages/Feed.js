import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Box, Container, Typography, Fab, useTheme, useMediaQuery } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostCard from '../components/feed/PostCard';
import PostComposer from '../components/feed/PostComposer';
import { ListSkeleton, PostCardSkeleton } from '../components/common/SkeletonLoader';
import KeyboardShortcutsHelp from '../components/common/KeyboardShortcutsHelp';
import { fadeInUp } from '../theme/animations';
import { useGamification } from '../context/GamificationContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { createPost, deletePost, fetchPosts, reactToPost } from '../api/backend';
import GuidelinesGate from '../components/moderation/GuidelinesGate';

const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { awardXP, updateStat } = useGamification();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });
  const [composerOpen, setComposerOpen] = useState(false);
  const [guidelinesOpen, setGuidelinesOpen] = useState(true);
  const [focusedPostIndex, setFocusedPostIndex] = useState(-1);
  const postRefs = useRef([]);

  // Keyboard shortcuts
  const { showHelp, setShowHelp } = useKeyboardShortcuts({
    onNewPost: () => setComposerOpen(true),
    onEscape: () => setComposerOpen(false),
    onNextPost: () => {
      setFocusedPostIndex((prev) => {
        const next = Math.min(prev + 1, posts.length - 1);
        postRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return next;
      });
    },
    onPrevPost: () => {
      setFocusedPostIndex((prev) => {
        const next = Math.max(prev - 1, 0);
        postRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return next;
      });
    },
    onLikePost: () => {
      if (focusedPostIndex >= 0 && posts[focusedPostIndex]) {
        handleReaction(posts[focusedPostIndex].id, 'like');
      }
    },
  });

  const communityGuidelines = useMemo(
    () => ({
      version: '1.3',
      lastUpdated: 'Mar 14, 2024',
      summary: 'Safety-first moderation with human review for sensitive research topics.',
      items: [
        'No unverified medical advice or sourcing requests.',
        'Use content warnings for challenging experiences and images.',
        'Respect anonymity and never dox participants.',
        'Cite sources when discussing published research.',
        'Report safety issues immediately to moderators.'
      ]
    }),
    []
  );

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post created successfully!');
    },
    onError: () => {
      toast.error('Failed to create post. Please try again.');
    }
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
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post deleted');
    },
    onError: () => {
      toast.error('Failed to delete post');
    }
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

  const handleAcceptGuidelines = () => {
    setGuidelinesOpen(false);
  };

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
          <ListSkeleton count={3} Component={PostCardSkeleton} />
        )}

        {!isLoading && normalizedPosts.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {normalizedPosts.map((post, index) => (
              <Box
                key={post.id}
                ref={(el) => (postRefs.current[index] = el)}
                sx={{
                  animation: `${fadeInUp} 0.5s ease-out ${index * 0.1}s backwards`,
                  outline: focusedPostIndex === index ? '2px solid' : 'none',
                  outlineColor: 'primary.main',
                  outlineOffset: 4,
                  borderRadius: 2,
                  transition: 'outline 0.2s ease',
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

        {/* TODO: Implement GuidelinesGate component when backend support is ready
        <GuidelinesGate
          open={guidelinesOpen}
          guidelines={communityGuidelines}
          onAccept={handleAcceptGuidelines}
          onClose={() => setGuidelinesOpen(false)}
        />
        */}

        {/* Keyboard Shortcuts Help Dialog */}
        <KeyboardShortcutsHelp open={showHelp} onClose={() => setShowHelp(false)} />
      </Container>
    </Box>
  );
};

export default Feed;
