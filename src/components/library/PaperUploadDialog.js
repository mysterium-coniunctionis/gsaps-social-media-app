/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Alert,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  alpha
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  CheckCircle as SuccessIcon
} from '@mui/icons-material';
import { useToast } from '../common';

/**
 * PaperUploadDialog Component
 * Upload research papers with metadata
 */
const PaperUploadDialog = ({ open, onClose, onSuccess }) => {
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    journal: '',
    doi: '',
    abstract: '',
    topics: [],
    keywords: ''
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const availableTopics = [
    'psilocybin',
    'mdma',
    'lsd',
    'ayahuasca',
    'dmt',
    'ketamine',
    'neuroscience',
    'therapy',
    'consciousness',
    'clinical-trials',
    'pharmacology',
    'mental-health'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }

      // Validate file size (max 25MB)
      const maxSize = 25 * 1024 * 1024; // 25MB in bytes
      if (selectedFile.size > maxSize) {
        setError('File size must be less than 25MB');
        return;
      }

      setFile(selectedFile);
      setError('');
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError('');
  };

  const handleTopicsChange = (event) => {
    const value = event.target.value;
    setFormData({ ...formData, topics: typeof value === 'string' ? value.split(',') : value });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }

    if (!formData.authors.trim()) {
      setError('At least one author is required');
      return false;
    }

    if (!file) {
      setError('Please upload a PDF file');
      return false;
    }

    if (formData.topics.length === 0) {
      setError('Please select at least one topic');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    // TODO: Replace with real API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Create new paper object
      const newPaper = {
        id: Date.now(),
        title: formData.title,
        authors: formData.authors.split(',').map(a => a.trim()),
        year: formData.year,
        journal: formData.journal,
        doi: formData.doi,
        abstract: formData.abstract,
        topics: formData.topics,
        fileUrl: URL.createObjectURL(file),
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedBy: {
          id: 'current-user',
          name: 'You',
          username: 'your_username',
          avatar_url: ''
        },
        uploadedAt: new Date(),
        views: 0,
        downloads: 0,
        citations: 0,
        rating: 0,
        ratingCount: 0,
        discussionCount: 0,
        inMyLibrary: true
      };

      onSuccess(newPaper);
      handleReset();
      setUploading(false);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      authors: '',
      year: new Date().getFullYear(),
      journal: '',
      doi: '',
      abstract: '',
      topics: [],
      keywords: ''
    });
    setFile(null);
    setUploadProgress(0);
    setError('');
  };

  const handleClose = () => {
    if (uploading) return;

    if (file || formData.title) {
      if (window.confirm('Discard upload?')) {
        handleReset();
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: 500
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          📤 Upload Research Paper
        </Typography>
        <IconButton onClick={handleClose} size="small" disabled={uploading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Error Alert */}
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <UploadIcon color="primary" />
              <Typography variant="body2">Uploading paper...</Typography>
              <Typography variant="body2" fontWeight="bold">
                {uploadProgress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}

        {/* File Upload */}
        <Box sx={{ mb: 3 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            disabled={uploading}
          />

          {!file ? (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha('#2196f3', 0.05)
                }
              }}
            >
              <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" gutterBottom>
                Click to upload PDF
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Maximum file size: 25MB
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                border: 1,
                borderColor: 'success.main',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: alpha('#4caf50', 0.05)
              }}
            >
              <FileIcon color="success" sx={{ fontSize: 40 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>
              <SuccessIcon color="success" />
              {!uploading && (
                <IconButton
                  size="small"
                  onClick={() => setFile(null)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          )}
        </Box>

        {/* Title */}
        <TextField
          fullWidth
          label="Paper Title *"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          disabled={uploading}
          sx={{ mb: 2 }}
          helperText="Full title of the research paper"
        />

        {/* Authors */}
        <TextField
          fullWidth
          label="Authors *"
          value={formData.authors}
          onChange={(e) => handleChange('authors', e.target.value)}
          disabled={uploading}
          sx={{ mb: 2 }}
          helperText="Comma-separated list of authors (e.g., John Smith, Jane Doe)"
          multiline
          rows={2}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {/* Year */}
          <FormControl fullWidth>
            <InputLabel>Year *</InputLabel>
            <Select
              value={formData.year}
              label="Year *"
              onChange={(e) => handleChange('year', e.target.value)}
              disabled={uploading}
            >
              {years.map(year => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Journal */}
          <TextField
            fullWidth
            label="Journal/Publication"
            value={formData.journal}
            onChange={(e) => handleChange('journal', e.target.value)}
            disabled={uploading}
          />
        </Box>

        {/* DOI */}
        <TextField
          fullWidth
          label="DOI"
          value={formData.doi}
          onChange={(e) => handleChange('doi', e.target.value)}
          disabled={uploading}
          sx={{ mb: 2 }}
          helperText="Digital Object Identifier (e.g., 10.1038/s41586-021-03813-8)"
        />

        {/* Topics */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Topics *</InputLabel>
          <Select
            multiple
            value={formData.topics}
            onChange={handleTopicsChange}
            input={<OutlinedInput label="Topics *" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
            disabled={uploading}
          >
            {availableTopics.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Abstract */}
        <TextField
          fullWidth
          label="Abstract"
          value={formData.abstract}
          onChange={(e) => handleChange('abstract', e.target.value)}
          disabled={uploading}
          multiline
          rows={4}
          sx={{ mb: 2 }}
          helperText="Brief summary of the paper's content and findings"
        />

        {/* Keywords */}
        <TextField
          fullWidth
          label="Keywords"
          value={formData.keywords}
          onChange={(e) => handleChange('keywords', e.target.value)}
          disabled={uploading}
          helperText="Comma-separated keywords for better searchability"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={uploading || !file || !formData.title.trim()}
          startIcon={uploading ? null : <UploadIcon />}
          sx={{
            px: 4,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Paper'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaperUploadDialog;
