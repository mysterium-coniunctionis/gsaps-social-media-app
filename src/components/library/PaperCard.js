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
  Article as ArticleIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
  CollectionsBookmark as CollectionsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/dateUtils';
import AddToCollectionMenu from './AddToCollectionMenu';

/**
 * PaperCard Component
 * Displays research paper in grid or list view
 */
const PaperCard = ({
  paper,
  viewMode = 'grid',
  onToggleLibrary,
  onClick,
  showRemoveButton = false,
  onRemove
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [collectionMenuAnchor, setCollectionMenuAnchor] = useState(null);

  const isGridView = viewMode === 'grid';

  const handleClick = (e) => {
    if (onClick) {
      onClick(paper);
    } else {
      navigate(`/library/${paper.id}`);
    }
  };

  const handleToggleLibrary = (e) => {
    e.stopPropagation();
    if (onToggleLibrary) {
      onToggleLibrary(paper.id);
    }
  };

  const handleSaveToCollection = (e) => {
    e.stopPropagation();
    setCollectionMenuAnchor(e.currentTarget);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    window.open(paper.fileUrl, '_blank');
  };

  const handleDiscuss = (e) => {
    e.stopPropagation();
    navigate(`/library/${paper.id}#discussion`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove?.(paper.id);
  };

  const formatAuthors = (authors) => {
    if (!Array.isArray(authors)) return authors || 'Unknown';
    if (authors.length <= 3) {
      return authors.join(', ');
    }
    return `${authors.slice(0, 3).join(', ')}, et al.`;
  };

  // Research type badge color
  const getResearchTypeBadge = () => {
    const typeColors = {
      'clinical-trial': { bg: 'success.main', label: 'Clinical Trial' },
      'review': { bg: 'info.main', label: 'Review' },
      'meta-analysis': { bg: 'secondary.main', label: 'Meta-Analysis' },
      'basic-science': { bg: 'warning.main', label: 'Basic Science' },
      'qualitative': { bg: 'primary.main', label: 'Qualitative' }
    };
    return typeColors[paper.researchType] || null;
  };

  const researchTypeBadge = getResearchTypeBadge();

  return (
    <>
      <Card
        elevation={isHovered ? 8 : 2}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
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
        {/* Badges row */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            gap: 0.5,
            zIndex: 1,
            flexWrap: 'wrap',
            maxWidth: 'calc(100% - 60px)'
          }}
        >
          {/* PDF Icon Badge */}
          <Box
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              px: 1,
              py: 0.25,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}
          >
            <ArticleIcon sx={{ fontSize: 12 }} />
            PDF
          </Box>

          {/* Open Access Badge */}
          {paper.openAccess && (
            <Tooltip title="Open Access">
              <Box
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}
              >
                OA
              </Box>
            </Tooltip>
          )}

          {/* Research Type Badge */}
          {researchTypeBadge && !isGridView && (
            <Box
              sx={{
                bgcolor: researchTypeBadge.bg,
                color: 'white',
                px: 1,
                py: 0.25,
                borderRadius: 1,
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}
            >
              {researchTypeBadge.label}
            </Box>
          )}
        </Box>

        {/* Action Icons */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 0.5,
            zIndex: 1
          }}
        >
          {showRemoveButton && (
            <Tooltip title="Remove from collection">
              <IconButton
                onClick={handleRemove}
                size="small"
                sx={{
                  bgcolor: alpha('#fff', 0.9),
                  '&:hover': { bgcolor: alpha('#fff', 1) }
                }}
              >
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Save to collection">
            <IconButton
              onClick={handleSaveToCollection}
              size="small"
              sx={{
                bgcolor: alpha('#fff', 0.9),
                '&:hover': { bgcolor: alpha('#fff', 1) }
              }}
            >
              <CollectionsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <CardContent sx={{ flexGrow: 1, pt: 6 }}>
          {/* Title */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: isGridView ? '0.95rem' : '1.125rem',
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
              overflow: 'hidden',
              fontSize: '0.8rem'
            }}
          >
            {formatAuthors(paper.authors)}
          </Typography>

          {/* Journal, Year, DOI */}
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
            {paper.journal} • {paper.year}
            {paper.doi && (
              <span> • <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ color: 'inherit' }}
              >
                DOI
              </a></span>
            )}
          </Typography>

          {/* Abstract (list view only) */}
          {!isGridView && paper.abstract && (
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
          {paper.topics && paper.topics.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
              {paper.topics.slice(0, isGridView ? 2 : 4).map((topic, idx) => (
                <Chip
                  key={`${topic}-${idx}`}
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
          )}

          {/* Rating */}
          {paper.rating > 0 && (
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
                {paper.rating.toFixed(1)} ({paper.ratingCount || 0})
              </Typography>
            </Box>
          )}

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {paper.views > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ViewIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {paper.views.toLocaleString()}
                </Typography>
              </Box>
            )}
            {paper.downloads > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DownloadIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {paper.downloads.toLocaleString()}
                </Typography>
              </Box>
            )}
            {paper.citations > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CitationIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {paper.citations}
                </Typography>
              </Box>
            )}
            {paper.discussionCount > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CommentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {paper.discussionCount}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Uploader */}
          {paper.uploadedBy && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Avatar
                src={paper.uploadedBy.avatar_url}
                alt={paper.uploadedBy.name}
                sx={{ width: 24, height: 24 }}
              >
                {paper.uploadedBy.name?.charAt(0)}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                Uploaded by <strong>{paper.uploadedBy.name}</strong>
                {paper.uploadedAt && ` • ${formatRelativeTime(paper.uploadedAt)}`}
              </Typography>
            </Box>
          )}
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
            onClick={handleDiscuss}
            sx={{ textTransform: 'none' }}
          >
            Discuss
          </Button>
        </CardActions>
      </Card>

      {/* Add to Collection Menu */}
      <AddToCollectionMenu
        anchorEl={collectionMenuAnchor}
        open={Boolean(collectionMenuAnchor)}
        onClose={() => setCollectionMenuAnchor(null)}
        paperId={paper.id}
        paperTitle={paper.title}
      />
    </>
  );
};

export default React.memo(PaperCard);
