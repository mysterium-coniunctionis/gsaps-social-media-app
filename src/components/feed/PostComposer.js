import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Chip,
  Typography,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Image as ImageIcon,
  EmojiEmotions as EmojiIcon,
  AttachFile as AttachFileIcon,
  Public as PublicIcon
} from '@mui/icons-material';
import MentionInput from '../common/MentionInput';

/**
 * PostComposer Component - Create new posts with rich features
 * Includes text input, image upload, and tagging
 */
const PostComposer = ({ open, onClose, onSubmit, currentUser = null }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const MAX_CONTENT_LENGTH = 5000;
  const MAX_IMAGES = 4;

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) {
      setError('Please add some content or images');
      return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      setError(`Content must be less than ${MAX_CONTENT_LENGTH} characters`);
      return;
    }

    onSubmit({
      content: content.trim(),
      images,
      tags,
      mentions: mentionedUsers
    });

    // Reset form
    setContent('');
    setImages([]);
    setTags([]);
    setMentionedUsers([]);
    setError('');
  };

  const handleMentionSelect = (user) => {
    // Add user to mentioned users list if not already there
    if (!mentionedUsers.find(u => u.id === user.id)) {
      setMentionedUsers([...mentionedUsers, user]);
    }
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images`);
      return;
    }

    setUploading(true);
    setError('');

    // TODO: Upload images to server
    // For now, create local URLs
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddTag = (event) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      event.preventDefault();
      const tag = tagInput.trim().toLowerCase().replace(/^#/, '');

      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleClose = () => {
    if (content.trim() || images.length > 0) {
      if (window.confirm('Discard this post?')) {
        setContent('');
        setImages([]);
        setTags([]);
        setMentionedUsers([]);
        setError('');
        onClose();
      }
    } else {
      onClose();
    }
  };

  const user = currentUser || {
    name: 'You',
    username: 'your_username',
    avatar: ''
  };

  const contentLength = content.length;
  const contentProgress = (contentLength / MAX_CONTENT_LENGTH) * 100;
  const isNearLimit = contentLength > MAX_CONTENT_LENGTH * 0.9;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: 400
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Create Post
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Author Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={user.avatar} sx={{ width: 40, height: 40, mr: 1.5 }}>
            {user.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              {user.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PublicIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Public
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Content Input with Mentions */}
        <MentionInput
          autoFocus
          value={content}
          onChange={setContent}
          onMentionSelect={handleMentionSelect}
          placeholder="What's on your mind?"
          rows={4}
          maxLength={MAX_CONTENT_LENGTH}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: '1rem',
              lineHeight: 1.5
            }
          }}
          sx={{ mb: 2 }}
        />

        {/* Progress Bar for content length */}
        {contentLength > 0 && isNearLimit && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(contentProgress, 100)}
              color="error"
              sx={{ height: 2, borderRadius: 1 }}
            />
          </Box>
        )}

        {/* Image Previews */}
        {images.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: images.length === 1 ? '1fr' : 'repeat(2, 1fr)',
              gap: 1,
              mb: 2
            }}
          >
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`Upload ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: images.length === 1 ? 300 : 150,
                    objectFit: 'cover'
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.8)'
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                onDelete={() => handleRemoveTag(tag)}
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        )}

        {/* Tag Input */}
        {tags.length < 5 && (
          <TextField
            fullWidth
            size="small"
            placeholder="Add tags (press Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleAddTag}
            variant="outlined"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: '#',
              sx: { fontSize: '0.875rem' }
            }}
            helperText={`${tags.length}/5 tags`}
          />
        )}

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mb: 2 }}>
            <LinearProgress />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              Uploading images...
            </Typography>
          </Box>
        )}

        {/* Media Options */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageSelect}
            disabled={images.length >= MAX_IMAGES}
          />

          <IconButton
            size="small"
            onClick={() => fileInputRef.current?.click()}
            disabled={images.length >= MAX_IMAGES}
            sx={{
              color: images.length >= MAX_IMAGES ? 'text.disabled' : 'success.main'
            }}
          >
            <ImageIcon />
          </IconButton>

          <IconButton
            size="small"
            disabled
            sx={{ color: 'text.disabled' }}
          >
            <EmojiIcon />
          </IconButton>

          <IconButton
            size="small"
            disabled
            sx={{ color: 'text.disabled' }}
          >
            <AttachFileIcon />
          </IconButton>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={(!content.trim() && images.length === 0) || contentLength > MAX_CONTENT_LENGTH || uploading}
          sx={{
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostComposer;
