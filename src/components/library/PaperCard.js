/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Avatar,
  Rating,
  Tooltip,
  Button,
  alpha
} from '@mui/material';
import {
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  Visibility as ViewIcon,
  GetApp as DownloadIcon,
  Comment as CommentIcon,
  FormatQuote as CitationIcon,
  Star as StarIcon,
  Article as ArticleIcon
} from '@mui/icons-material';
import { formatRelativeTime } from '../../utils/dateUtils';

/**
 * PaperCard Component
 * Displays research paper in grid or list view
 */
const PaperCard = ({ paper, viewMode = 'grid', onToggleLibrary, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isGridView = viewMode === 'grid';

  const handleToggleLibrary = (e) => {
    e.stopPropagation();
    onToggleLibrary(paper.id);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    // TODO: Implement download
    window.open(paper.fileUrl, '_blank');
  };

  const formatAuthors = (authors) => {
    if (authors.length <= 3) {
      return authors.join(', ');
    }
    return `${authors.slice(0, 3).join(', ')}, et al.`;
  };

  return (
    <Card
      elevation={isHovered ? 8 : 2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          '& .paper-actions': {
            opacity: 1
          }
        }
      }}
    >
      {/* PDF Icon Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          bgcolor: 'error.main',
          color: 'white',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          fontSize: '0.75rem',
          fontWeight: 'bold',
          zIndex: 1
        }}
      >
        <ArticleIcon sx={{ fontSize: 14 }} />
        PDF
      </Box>

      {/* Bookmark Icon */}
      <IconButton
        onClick={handleToggleLibrary}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: alpha('#fff', 0.9),
          zIndex: 1,
          '&:hover': {
            bgcolor: alpha('#fff', 1)
          }
        }}
      >
        {paper.inMyLibrary ? (
          <BookmarkIcon color="primary" />
        ) : (
          <BookmarkBorderIcon />
        )}
      </IconButton>

      <CardContent sx={{ flexGrow: 1, pt: 6 }}>
        {/* Title */}
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: isGridView ? '1rem' : '1.125rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: isGridView ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1.5
          }}
        >
          {paper.title}
        </Typography>

        {/* Authors */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {formatAuthors(paper.authors)}
        </Typography>

        {/* Journal and Year */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          {paper.journal} • {paper.year}
        </Typography>

        {/* Abstract (list view only) */}
        {!isGridView && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {paper.abstract}
          </Typography>
        )}

        {/* Topics */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
          {paper.topics.slice(0, isGridView ? 2 : 4).map((topic) => (
            <Chip
              key={topic}
              label={topic}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: 20,
                bgcolor: alpha('#2196f3', 0.1),
                color: 'primary.main',
                '&:hover': {
                  bgcolor: alpha('#2196f3', 0.2)
                }
              }}
            />
          ))}
          {paper.topics.length > (isGridView ? 2 : 4) && (
            <Chip
              label={`+${paper.topics.length - (isGridView ? 2 : 4)}`}
              size="small"
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          )}
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating
            value={paper.rating}
            precision={0.1}
            readOnly
            size="small"
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarIcon fontSize="inherit" />}
          />
          <Typography variant="caption" color="text.secondary">
            {paper.rating.toFixed(1)} ({paper.ratingCount})
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {paper.views.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DownloadIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {paper.downloads.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CitationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {paper.citations}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CommentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {paper.discussionCount}
            </Typography>
          </Box>
        </Box>

        {/* Uploader */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Avatar
            src={paper.uploadedBy.avatar_url}
            alt={paper.uploadedBy.name}
            sx={{ width: 24, height: 24 }}
          >
            {paper.uploadedBy.name.charAt(0)}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            Uploaded by <strong>{paper.uploadedBy.name}</strong> •{' '}
            {formatRelativeTime(paper.uploadedAt)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        className="paper-actions"
        sx={{
          px: 2,
          pb: 2,
          opacity: isGridView ? 0 : 1,
          transition: 'opacity 0.2s'
        }}
      >
        <Button
          size="small"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{ textTransform: 'none' }}
        >
          Download
        </Button>
        <Button
          size="small"
          startIcon={<CommentIcon />}
          sx={{ textTransform: 'none' }}
        >
          Discuss
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(PaperCard);
