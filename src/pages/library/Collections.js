import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fadeInUp } from '../../theme/animations';
import CollectionCard from '../../components/library/CollectionCard';
import CollectionManager from '../../components/library/CollectionManager';
import { useToast } from '../../components/common';
import { useAuth } from '../../context/AuthContext';
import {
  fetchMyCollections,
  fetchPublicCollections,
  followCollection,
  unfollowCollection
} from '../../api/backend';

const Collections = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Fetch my collections
  const { data: myCollections = [], isLoading: loadingMy } = useQuery({
    queryKey: ['collections', 'my'],
    queryFn: fetchMyCollections
  });

  // Fetch public collections
  const { data: publicCollections = [], isLoading: loadingPublic } = useQuery({
    queryKey: ['collections', 'public'],
    queryFn: () => fetchPublicCollections()
  });

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: followCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']);
      toast.success('Now following this collection');
    },
    onError: () => toast.error('Failed to follow collection')
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: unfollowCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']);
      toast.success('Unfollowed collection');
    },
    onError: () => toast.error('Failed to unfollow collection')
  });

  // Separate my collections by ownership and following
  const ownedCollections = myCollections.filter(c => c.ownerId === user?.id);
  const followedCollections = myCollections.filter(c => c.ownerId !== user?.id);

  // Filter out my own collections from public collections
  const otherPublicCollections = publicCollections.filter(
    c => c.ownerId !== user?.id && !followedCollections.some(f => f.id === c.id)
  );

  const handleCreateDialogClose = (newCollection) => {
    setCreateDialogOpen(false);
    if (newCollection?.id) {
      navigate(`/library/collections/${newCollection.id}`);
    }
  };

  const isFollowing = (collection) => {
    return followedCollections.some(c => c.id === collection.id);
  };

  const isLoading = loadingMy || loadingPublic;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ animation: `${fadeInUp} 0.4s ease-out` }}
            >
              Collections
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Organize and discover curated collections of research papers
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
          >
            New Collection
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="My Collections" />
          <Tab label="Following" />
          <Tab label="Discover" />
        </Tabs>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* My Collections Tab */}
            {activeTab === 0 && (
              <>
                {ownedCollections.length === 0 ? (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    You haven't created any collections yet. Create one to start organizing your research!
                  </Alert>
                ) : (
                  <Grid container spacing={3}>
                    {ownedCollections.map((collection, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={collection.id}
                        sx={{ animation: `${fadeInUp} 0.3s ease-out ${index * 0.05}s backwards` }}
                      >
                        <CollectionCard
                          collection={collection}
                          showOwner={false}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* Following Tab */}
            {activeTab === 1 && (
              <>
                {followedCollections.length === 0 ? (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    You're not following any collections yet. Discover public collections to follow!
                  </Alert>
                ) : (
                  <Grid container spacing={3}>
                    {followedCollections.map((collection, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={collection.id}
                        sx={{ animation: `${fadeInUp} 0.3s ease-out ${index * 0.05}s backwards` }}
                      >
                        <CollectionCard
                          collection={collection}
                          onFollow={(id) => followMutation.mutate(id)}
                          onUnfollow={(id) => unfollowMutation.mutate(id)}
                          isFollowing={true}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* Discover Tab */}
            {activeTab === 2 && (
              <>
                {otherPublicCollections.length === 0 ? (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    No public collections available to discover right now.
                  </Alert>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Public Collections
                    </Typography>
                    <Grid container spacing={3}>
                      {otherPublicCollections.map((collection, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          key={collection.id}
                          sx={{ animation: `${fadeInUp} 0.3s ease-out ${index * 0.05}s backwards` }}
                        >
                          <CollectionCard
                            collection={collection}
                            onFollow={(id) => followMutation.mutate(id)}
                            onUnfollow={(id) => unfollowMutation.mutate(id)}
                            isFollowing={isFollowing(collection)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>

      {/* Create Collection Dialog */}
      <CollectionManager
        open={createDialogOpen}
        onClose={handleCreateDialogClose}
        mode="create"
      />
    </Box>
  );
};

export default Collections;
