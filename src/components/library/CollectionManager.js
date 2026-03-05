import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCollection, updateCollection, deleteCollection } from '../../api/backend';
import { useToast } from '../common';
import { useGamification } from '../../context/GamificationContext';

const CollectionManager = ({
  open,
  onClose,
  collection = null, // Pass collection for editing, null for creating
  mode = 'create' // 'create' | 'edit'
}) => {
  const toast = useToast();
  const { awardXP } = useGamification();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Reset form when dialog opens/closes or collection changes
  useEffect(() => {
    if (open) {
      if (collection && mode === 'edit') {
        setName(collection.name || '');
        setDescription(collection.description || '');
        setIsPublic(collection.isPublic || false);
      } else {
        setName('');
        setDescription('');
        setIsPublic(false);
      }
      setConfirmDelete(false);
    }
  }, [open, collection, mode]);

  const createMutation = useMutation({
    mutationFn: createCollection,
    onSuccess: (newCollection) => {
      queryClient.invalidateQueries(['collections']);
      awardXP('CREATE_COLLECTION');
      toast.success('Collection created!');
      onClose(newCollection);
    },
    onError: () => toast.error('Failed to create collection')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateCollection(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']);
      queryClient.invalidateQueries(['collection', collection?.id]);
      toast.success('Collection updated!');
      onClose();
    },
    onError: () => toast.error('Failed to update collection')
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries(['collections']);
      toast.success('Collection deleted');
      onClose();
    },
    onError: () => toast.error('Failed to delete collection')
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter a collection name');
      return;
    }

    const data = {
      name: name.trim(),
      description: description.trim() || null,
      isPublic
    };

    if (mode === 'edit' && collection) {
      updateMutation.mutate({ id: collection.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteMutation.mutate(collection.id);
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading || deleteMutation.isLoading;

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
      fullWidth
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
    >
      <DialogTitle>
        {mode === 'edit' ? 'Edit Collection' : 'Create New Collection'}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Collection Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            autoFocus
            placeholder="e.g., Psilocybin Depression Research"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            placeholder="Describe what this collection is about..."
          />

          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            }
            label={
              <Box>
                <Typography variant="body2">Make this collection public</Typography>
                <Typography variant="caption" color="text.secondary">
                  {isPublic
                    ? 'Other members can view and follow this collection'
                    : 'Only you can see this collection'}
                </Typography>
              </Box>
            }
          />

          {mode === 'edit' && (
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              {confirmDelete ? (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Are you sure you want to delete this collection? This action cannot be undone.
                  The papers themselves will not be deleted.
                </Alert>
              ) : null}
              <Button
                color="error"
                variant={confirmDelete ? 'contained' : 'outlined'}
                onClick={handleDelete}
                disabled={isLoading}
              >
                {confirmDelete ? 'Confirm Delete' : 'Delete Collection'}
              </Button>
              {confirmDelete && (
                <Button
                  sx={{ ml: 1 }}
                  onClick={() => setConfirmDelete(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading || !name.trim()}
        >
          {mode === 'edit' ? 'Save Changes' : 'Create Collection'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectionManager;
