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

/**
 * Activity Feed Page - The heart of the social platform
 * Displays posts from the community with engagement features
 */
const Feed = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [composerOpen, setComposerOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // all, following, trending

  // Mock data for now - replace with API call
  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      const mockPosts = [
        {
          id: 1,
          author: {
            id: 1,
            name: 'Dr. Alice Johnson',
            username: 'alice_researcher',
            avatar: '',
            credentials: 'PhD, Neuroscience',
            verified: true
          },
          content: 'Excited to share our latest findings on psilocybin and neuroplasticity! The results from our 6-month study show remarkable improvements in neural connectivity. Full paper coming soon. 🧠✨',
          images: [],
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          likes: 156,
          comments: 23,
          shares: 12,
          isLiked: false,
          isBookmarked: false,
          tags: ['research', 'psilocybin', 'neuroscience']
        },
        {
          id: 2,
          author: {
            id: 2,
            name: 'Bob Williams',
            username: 'bob_neuroscience',
            avatar: '',
            credentials: 'Postdoc Researcher'
          },
          content: 'Anyone attending the Psychedelic Science Symposium next month? Would love to connect and discuss collaboration opportunities!',
          images: [],
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          likes: 89,
          comments: 34,
          shares: 5,
          isLiked: true,
          isBookmarked: false,
          tags: ['conference', 'networking']
        },
        {
          id: 3,
          author: {
            id: 3,
            name: 'Carol Davis',
            username: 'carol_therapist',
            avatar: '',
            credentials: 'Licensed Therapist',
            verified: true
          },
          content: 'Just completed my first MDMA-assisted therapy training session. The integration of psychedelic medicine into mainstream therapy is happening, and it\'s beautiful to witness. 💚',
          images: [],
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          likes: 234,
          comments: 67,
          shares: 45,
          isLiked: false,
          isBookmarked: true,
          tags: ['therapy', 'mdma', 'training']
        },
        {
          id: 4,
          author: {
            id: 4,
            name: 'David Martinez',
            username: 'david_student',
            avatar: '',
            credentials: 'Graduate Student'
          },
          content: 'Reading list for anyone new to psychedelic research:\n\n1. "How to Change Your Mind" - Michael Pollan\n2. "The Psychedelic Explorer\'s Guide" - James Fadiman\n3. "LSD: My Problem Child" - Albert Hofmann\n\nWhat would you add to this list?',
          images: [],
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          likes: 178,
          comments: 92,
          shares: 56,
          isLiked: true,
          isBookmarked: true,
          tags: ['books', 'education', 'resources']
        }
      ];
      setPosts(mockPosts);
      setLoading(false);
    }, 800);
  };

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
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      tags: newPost.tags || []
    };

    setPosts([post, ...posts]);
    setComposerOpen(false);
  }, [posts]);

  const handleLike = useCallback((postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  }, [posts]);

  const handleBookmark = useCallback((postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  }, [posts]);

  const handleComment = useCallback((postId, comment) => {
    // TODO: Add comment to post
    console.log('Comment on post', postId, comment);
  }, []);

  const handleShare = useCallback((postId) => {
    // TODO: Share functionality
    console.log('Share post', postId);
  }, []);

  const handleDelete = useCallback((postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  }, [posts]);

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
                  onLike={handleLike}
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
