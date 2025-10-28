import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Chip,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  School as SchoolIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

/**
 * CreateCourseDialog Component
 * Quick course creation dialog
 */
const CreateCourseDialog = ({ open, onClose, onCourseCreated }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'psychedelic-therapy',
    level: 'beginner',
    duration: '4 weeks',
    ceCredits: 0,
    price: 0
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'psychedelic-therapy', label: 'Psychedelic Therapy' },
    { value: 'neuroscience', label: 'Neuroscience' },
    { value: 'clinical-research', label: 'Clinical Research' },
    { value: 'harm-reduction', label: 'Harm Reduction' },
    { value: 'integration', label: 'Integration' },
    { value: 'ethics', label: 'Ethics' },
    { value: 'pharmacology', label: 'Pharmacology' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'meditation', label: 'Meditation' }
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'professional', label: 'Professional' }
  ];

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    setError('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      setError('Course title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Course description is required');
      return;
    }
    if (formData.title.length < 10) {
      setError('Course title must be at least 10 characters');
      return;
    }
    if (formData.description.length < 50) {
      setError('Course description must be at least 50 characters');
      return;
    }

    setSubmitting(true);

    // TODO: Replace with real API call
    setTimeout(() => {
      const newCourse = {
        id: Date.now(),
        ...formData,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        instructor: {
          id: currentUser.id,
          name: currentUser.name,
          avatar_url: currentUser.avatar_url,
          credentials: currentUser.credentials,
          verified: currentUser.verified
        },
        thumbnail: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400`,
        lessonsCount: 0,
        studentsEnrolled: 0,
        rating: 0,
        ratingCount: 0,
        featured: false,
        ceCategories: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        modules: []
      };

      onCourseCreated(newCourse);
      setSubmitting(false);

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'psychedelic-therapy',
        level: 'beginner',
        duration: '4 weeks',
        ceCredits: 0,
        price: 0
      });
    }, 1000);
  };

  const handleClose = () => {
    if (!submitting) {
      onClose();
      setError('');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon color="primary" />
            <Typography variant="h6">Create New Course</Typography>
          </Box>
          <Button
            onClick={handleClose}
            disabled={submitting}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create a new course to share your knowledge with the GSAPS community.
          After creating, you'll be able to add modules, lessons, and content.
        </Typography>

        {/* Title */}
        <TextField
          fullWidth
          label="Course Title"
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="e.g., Introduction to Psychedelic-Assisted Therapy"
          required
          sx={{ mb: 2 }}
          helperText={`${formData.title.length}/100 characters`}
          inputProps={{ maxLength: 100 }}
        />

        {/* Description */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Course Description"
          value={formData.description}
          onChange={handleChange('description')}
          placeholder="Provide a detailed description of what students will learn..."
          required
          sx={{ mb: 2 }}
          helperText={`${formData.description.length}/500 characters (minimum 50)`}
          inputProps={{ maxLength: 500 }}
        />

        {/* Category and Level */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={handleChange('category')}
              label="Category"
            >
              {categories.map(cat => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Difficulty Level</InputLabel>
            <Select
              value={formData.level}
              onChange={handleChange('level')}
              label="Difficulty Level"
            >
              {levels.map(level => (
                <MenuItem key={level.value} value={level.value}>
                  {level.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Duration, CE Credits, Price */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Duration"
            value={formData.duration}
            onChange={handleChange('duration')}
            placeholder="e.g., 8 weeks"
            helperText="Estimated course duration"
          />

          <TextField
            fullWidth
            type="number"
            label="CE Credits"
            value={formData.ceCredits}
            onChange={handleChange('ceCredits')}
            InputProps={{
              inputProps: { min: 0, max: 100 }
            }}
            helperText="Continuing Education credits"
          />

          <TextField
            fullWidth
            type="number"
            label="Price"
            value={formData.price}
            onChange={handleChange('price')}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { min: 0, max: 9999 }
            }}
            helperText="Set to 0 for free"
          />
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          After creating your course, you'll be able to add modules, lessons, videos,
          quizzes, and other content through the course builder.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleClose}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
        >
          {submitting ? 'Creating...' : 'Create Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseDialog;
