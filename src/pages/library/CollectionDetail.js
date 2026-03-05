import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Chip,
  CircularProgress,
  Avatar,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Alert
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  MoreVert as MoreIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  PersonAdd as FollowIcon,
  Check as FollowingIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { fadeInUp } from '../../theme/animations';
import PaperCard from '../../components/library/PaperCard';
import CollectionManager from '../../components/library/CollectionManager';
import { useToast } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import {
  fetchCollection,
  followCollection,
  unfollowCollection,
  removePaperFromCollection
} from '../../api/backend';

const CollectionDetail = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Fetch collection details
  const { data: collection, isLoading, error } = useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => fetchCollection(collectionId),
    enabled: !!collectionId
  });

  const isOwner = collection?.ownerId === user?.id;
  const isFollowing = collection?.followers?.some(f => f.userId === user?.id);

  // Follow/unfollow mutations
  const followMutation = useMutation({
    mutationFn: followCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(['collection', collectionId]);
      queryClient.invalidateQueries(['collections']);
      toast.success('Now following this collection');
    },
    onError: () => toast.error('Failed to follow collection')
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(['collection', collectionId]);
      queryClient.invalidateQueries(['collections']);
      toast.success('Unfollowed collection');
    },
    onError: () => toast.error('Failed to unfollow collection')
  });

  // Remove paper mutation
  const removePaperMutation = useMutation({
    mutationFn: ({ collectionId, assetId }) => removePaperFromCollection(collectionId, assetId),
    onSuccess: () => {
      queryClient.invalidateQueries(['collection', collectionId]);
      queryClient.invalidateQueries(['collections']);
      toast.success('Paper removed from collection');
    },
    onError: () => toast.error('Failed to remove paper')
  });

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate(collectionId);
    } else {
      followMutation.mutate(collectionId);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } catch {
      toast.error('Failed to copy link');
    }
    setMenuAnchor(null);
  };

  const handleRemovePaper = (assetId) => {
    if (window.confirm('Remove this paper from the collection?')) {
      removePaperMutation.mutate({ collectionId, assetId });
    }
  };

  // Parse authors and topics for paper cards
  const parseAuthors = (paper) => {
    if (Array.isArray(paper.authors)) return paper.authors;
    if (typeof paper.authors === 'string') {
      try { return JSON.parse(paper.authors); }
      catch { return [paper.authors]; }
    }
    return ['Community member'];
  };

  const parseTopics = (paper) => {
    const source = paper.topics || paper.keywords;
    if (Array.isArray(source)) return source;
    if (typeof source === 'string') {
      try { return JSON.parse(source); }
      catch { return []; }
    }
    return [];
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !collection) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          {error?.response?.status === 404
            ? 'Collection not found'
            : 'Failed to load collection'}
        </Alert>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/library/collections')}
          sx={{ mt: 2 }}
        >
          Back to Collections
        </Button>
      </Container>
    );
  }

  const papers = collection.items?.map(item => item.asset) || [];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back button */}
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/library/collections')}
          sx={{ mb: 2 }}
        >
          Back to Collections
        </Button>

        {/* Collection Header */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ animation: `${fadeInUp} 0.4s ease-out` }}
                >
                  {collection.name}
                </Typography>
                <Tooltip title={collection.isPublic ? 'Public collection' : 'Private collection'}>
                  {collection.isPublic ? (
                    <PublicIcon color="action" />
                  ) : (
                    <LockIcon color="action" />
                  )}
                </Tooltip>
              </Box>

              {collection.description && (
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {collection.description}
                </Typography>
              )}

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <Chip
                  label={`${papers.length} paper${papers.length !== 1 ? 's' : ''}`}
                  variant="outlined"
                  size="small"
                />
                {collection.isPublic && (
                  <Chip
                    label={`${collection.followers?.length || 0} follower${collection.followers?.length !== 1 ? 's' : ''}`}
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>

              {/* Owner */}
              {collection.owner && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={collection.owner.avatarUrl}
                    sx={{ width: 28, height: 28 }}
                  >
                    {collection.owner.name?.[0]}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    Curated by {collection.owner.name}
                    {collection.owner.credentials && ` • ${collection.owner.credentials}`}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {collection.isPublic && !isOwner && (
                <Button
                  variant={isFollowing ? 'outlined' : 'contained'}
                  startIcon={isFollowing ? <FollowingIcon /> : <FollowIcon />}
                  onClick={handleFollowToggle}
                  disabled={followMutation.isLoading || unfollowMutation.isLoading}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}

              {isOwner && (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditDialogOpen(true)}
                >
                  Edit
                </Button>
              )}

              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Papers Grid */}
        {papers.length === 0 ? (
          <Alert severity="info">
            This collection is empty.
            {isOwner && ' Start adding papers from the Research Library.'}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {papers.map((paper, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={paper.id}
                sx={{ animation: `${fadeInUp} 0.3s ease-out ${Math.min(index * 0.05, 0.3)}s backwards` }}
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
                    openAccess: paper.openAccess
                  }}
                  viewMode="grid"
                  showRemoveButton={isOwner}
                  onRemove={() => handleRemovePaper(paper.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* More menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={handleShare}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share link</ListItemText>
          </MenuItem>
        </Menu>

        {/* Edit dialog */}
        <CollectionManager
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          collection={collection}
          mode="edit"
        />
      </Container>
    </Box>
  );
};

export default CollectionDetail;
