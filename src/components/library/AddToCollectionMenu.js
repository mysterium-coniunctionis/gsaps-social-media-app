import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  CircularProgress,
  TextField,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Check as CheckIcon,
  CreateNewFolder as NewFolderIcon,
  Lock as LockIcon,
  Public as PublicIcon
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyCollections, addPaperToCollection, removePaperFromCollection, createCollection } from '../../api/backend';
import { useToast } from '../common';
import { useGamification } from '../../context/GamificationContext';

const AddToCollectionMenu = ({
  anchorEl,
  open,
  onClose,
  paperId,
  paperTitle
}) => {
  const toast = useToast();
  const { awardXP } = useGamification();
  const queryClient = useQueryClient();
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Fetch user's collections
  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['collections', 'my'],
    queryFn: fetchMyCollections,
    enabled: open
  });

  // Check which collections already contain this paper
  const collectionsWithPaper = collections.filter(c =>
    c.items?.some(item => item.assetId === paperId)
  );

  const addMutation = useMutation({
    mutationFn: ({ collectionId, assetId }) => addPaperToCollection(collectionId, assetId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries(['collections']);
      queryClient.invalidateQueries(['collection', collectionId]);
      toast.success('Added to collection');
    },
    onError: () => toast.error('Failed to add to collection')
  });

  const removeMutation = useMutation({
    mutationFn: ({ collectionId, assetId }) => removePaperFromCollection(collectionId, assetId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries(['collections']);
      queryClient.invalidateQueries(['collection', collectionId]);
      toast.success('Removed from collection');
    },
    onError: () => toast.error('Failed to remove from collection')
  });

  const createMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: async (newCollection) => {
      // Add paper to the new collection
      await addPaperToCollection(newCollection.id, paperId);
      queryClient.invalidateQueries(['collections']);
      awardXP('CREATE_COLLECTION');
      toast.success(`Created "${newCollection.name}" and added paper`);
      setShowNewCollection(false);
      setNewCollectionName('');
      onClose();
    },
    onError: () => toast.error('Failed to create collection')
  });

  const handleToggleCollection = (collection) => {
    const isInCollection = collectionsWithPaper.some(c => c.id === collection.id);

    if (isInCollection) {
      removeMutation.mutate({ collectionId: collection.id, assetId: paperId });
    } else {
      addMutation.mutate({ collectionId: collection.id, assetId: paperId });
    }
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;

    createMutation.mutate({
      name: newCollectionName.trim(),
      isPublic: false
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateCollection();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { minWidth: 280, maxHeight: 400 }
      }}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Save to collection
        </Typography>
      </Box>

      <Divider />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : collections.length === 0 ? (
        <Box sx={{ px: 2, py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            You don't have any collections yet.
          </Typography>
        </Box>
      ) : (
        collections.map((collection) => {
          const isInCollection = collectionsWithPaper.some(c => c.id === collection.id);
          const isLoading = addMutation.isLoading || removeMutation.isLoading;

          return (
            <MenuItem
              key={collection.id}
              onClick={() => handleToggleCollection(collection)}
              disabled={isLoading}
            >
              <ListItemIcon>
                {isInCollection ? (
                  <CheckIcon color="primary" />
                ) : collection.isPublic ? (
                  <PublicIcon fontSize="small" />
                ) : (
                  <LockIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={collection.name}
                secondary={`${collection._count?.items || collection.items?.length || 0} papers`}
                primaryTypographyProps={{
                  noWrap: true,
                  sx: { fontWeight: isInCollection ? 600 : 400 }
                }}
              />
            </MenuItem>
          );
        })
      )}

      <Divider sx={{ my: 1 }} />

      {showNewCollection ? (
        <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            sx={{ flexGrow: 1 }}
          />
          <IconButton
            size="small"
            color="primary"
            onClick={handleCreateCollection}
            disabled={!newCollectionName.trim() || createMutation.isLoading}
          >
            <CheckIcon />
          </IconButton>
        </Box>
      ) : (
        <MenuItem onClick={() => setShowNewCollection(true)}>
          <ListItemIcon>
            <NewFolderIcon />
          </ListItemIcon>
          <ListItemText primary="Create new collection" />
        </MenuItem>
      )}
    </Menu>
  );
};

export default AddToCollectionMenu;
