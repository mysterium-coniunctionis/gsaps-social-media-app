import React, { useState, useCallback, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  Collapse,
  Divider,
  Button
} from '@mui/material';
import {
  Comment as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Report as ReportIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import CommentSection from './CommentSection';
import ReactionButton from '../reactions/ReactionButton';
import ReactionsSummary from '../reactions/ReactionsSummary';
import { formatRelativeTime } from '../../utils/dateUtils';

/**
 * PostCard Component - Displays a single post with all engagement features
 * Modern design with glassmorphism and smooth animations
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const PostCard = React.memo(({
  post,
  onReaction,
  onComment,
  onShare,
  onBookmark,
  onDelete,
  currentUserId = 'current-user'
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isOwnPost = useMemo(() => post.author.id === currentUserId, [post.author.id, currentUserId]);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleReactionChange = useCallback((reactionType) => {
    onReaction(post.id, reactionType);
  }, [onReaction, post.id]);

  const handleCommentClick = useCallback(() => {
    setShowComments(prev => !prev);
  }, []);

  const handleShare = useCallback(() => {
    onShare(post.id);
    // TODO: Show share dialog
  }, [onShare, post.id]);

  const handleBookmark = useCallback(() => {
    onBookmark(post.id);
  }, [onBookmark, post.id]);

  const handleDelete = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
    handleMenuClose();
  }, [onDelete, post.id, handleMenuClose]);

  const formattedTimestamp = useMemo(() => 
    formatRelativeTime(post.timestamp), 
    [post.timestamp]
  );

  return (
    <Card
      elevation={isHovered ? 8 : 2}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        borderRadius: 2,
        overflow: 'visible',
        position: 'relative',
        '&:hover': {
          '& .post-actions': {
            opacity: 1
          }
        }
      }}
    >
      {/* Header with Author Info */}
      <CardHeader
        avatar={
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            sx={{
              width: 48,
              height: 48,
              border: '2px solid',
              borderColor: 'primary.main',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            {post.author.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton
            onClick={handleMenuOpen}
            size="small"
            sx={{
              opacity: isHovered ? 1 : 0.6,
              transition: 'opacity 0.2s'
            }}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.author.name}
            </Typography>
            {post.author.verified && (
              <Tooltip title="Verified">
                <VerifiedIcon color="primary" sx={{ fontSize: 18 }} />
              </Tooltip>
            )}
          </Box>
        }
        subheader={
          <Box>
            <Typography variant="body2" color="text.secondary">
              @{post.author.username}
              {post.author.credentials && ` • ${post.author.credentials}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedTimestamp}
            </Typography>
          </Box>
        }
        sx={{ pb: 1 }}
      />

      {/* Post Content */}
      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography
          variant="body1"
          sx={{
            whiteSpace: 'pre-wrap',
            lineHeight: 1.6,
            mb: post.tags?.length > 0 ? 2 : 0
          }}
        >
          {post.content}
        </Typography>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                variant="outlined"
                clickable
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText'
                  }
                }}
              />
            ))}
          </Box>
        )}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <Box
            sx={{
              mt: 2,
              display: 'grid',
              gridTemplateColumns: post.images.length === 1 ? '1fr' : 'repeat(2, 1fr)',
              gap: 1,
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            {post.images.map((image, index) => (
              <Box
                key={index}
                component="img"
                src={image}
                alt={`Post image ${index + 1}`}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: post.images.length === 1 ? 'auto' : 200,
                  objectFit: 'cover',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <Divider />

      {/* Engagement Stats */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'action.hover'
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Reactions Summary */}
          {post.reactions && post.reactions.length > 0 && (
            <ReactionsSummary reactions={post.reactions} />
          )}

          {/* Comment and Share counts */}
          {post.comments > 0 && (
            <Typography variant="caption" color="text.secondary">
              <strong>{post.comments}</strong> {post.comments === 1 ? 'comment' : 'comments'}
            </Typography>
          )}
          {post.shares > 0 && (
            <Typography variant="caption" color="text.secondary">
              <strong>{post.shares}</strong> {post.shares === 1 ? 'share' : 'shares'}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Action Buttons */}
      <CardActions
        className="post-actions"
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'space-around',
          opacity: 1,
          transition: 'opacity 0.2s'
        }}
      >
        {/* Reaction Button */}
        <ReactionButton
          currentReaction={post.currentUserReaction}
          onReactionChange={handleReactionChange}
          count={post.reactions?.length || 0}
          size="small"
        />

        {/* Comment Button */}
        <Tooltip title="Comment">
          <Button
            size="small"
            startIcon={<CommentIcon />}
            onClick={handleCommentClick}
            sx={{
              textTransform: 'none',
              minWidth: 'auto',
              px: 2,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'primary.lighter',
                transform: 'scale(1.05)'
              }
            }}
          >
            Comment
          </Button>
        </Tooltip>

        <Tooltip title="Share">
          <Button
            size="small"
            startIcon={<ShareIcon />}
            onClick={handleShare}
            sx={{
              textTransform: 'none',
              minWidth: 'auto',
              px: 2,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'success.lighter',
                transform: 'scale(1.05)'
              }
            }}
          >
            <Typography variant="body2">Share</Typography>
          </Button>
        </Tooltip>

        <Tooltip title={post.isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
          <IconButton
            size="small"
            onClick={handleBookmark}
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            {post.isBookmarked ? (
              <BookmarkIcon color="warning" />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </Tooltip>
      </CardActions>

      {/* Comments Section */}
      <Collapse in={showComments}>
        <Divider />
        <CommentSection postId={post.id} onComment={onComment} />
      </Collapse>

      {/* More Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {isOwnPost ? (
          [
            <MenuItem key="edit" onClick={handleMenuClose}>
              <EditIcon sx={{ mr: 1, fontSize: 20 }} />
              Edit post
            </MenuItem>,
            <MenuItem key="delete" onClick={handleDelete} sx={{ color: 'error.main' }}>
              <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
              Delete post
            </MenuItem>
          ]
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <ReportIcon sx={{ mr: 1, fontSize: 20 }} />
            Report post
          </MenuItem>
        )}
      </Menu>
    </Card>
  );
});

PostCard.displayName = 'PostCard';

// Memoize PostCard to prevent unnecessary re-renders
export default React.memo(PostCard);
