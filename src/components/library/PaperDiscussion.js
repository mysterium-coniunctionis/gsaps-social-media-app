import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Alert,
  CircularProgress,
  Skeleton
} from '@mui/material';
import {
  Reply as ReplyIcon,
  ThumbUp as LikeIcon,
  ThumbUpOutlined as LikeOutlinedIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { useToast } from '../common';
import { formatRelativeTime } from '../../utils/dateUtils';
import {
  fetchPaperComments,
  createPaperComment,
  deletePaperComment,
  togglePaperCommentLike
} from '../../api/backend';

/**
 * PaperDiscussion Component
 * Threaded discussion system for research papers - connected to real API
 */
const PaperDiscussion = ({ paperId }) => {
  const { currentUser } = useAuth();
  const { awardXP } = useGamification();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Fetch comments from API
  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['paper-comments', paperId],
    queryFn: () => fetchPaperComments(paperId),
    enabled: Boolean(paperId)
  });

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: ({ content, parentId }) => createPaperComment(paperId, content, parentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['paper-comments', paperId]);
      if (variables.parentId) {
        awardXP('DISCUSSION_REPLY');
        toast.success('Reply posted!');
      } else {
        awardXP('DISCUSSION_POST');
        toast.success('Comment posted!');
      }
    },
    onError: () => toast.error('Failed to post comment')
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deletePaperComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(['paper-comments', paperId]);
      toast.success('Comment deleted');
    },
    onError: () => toast.error('Failed to delete comment')
  });

  // Like comment mutation
  const likeCommentMutation = useMutation({
    mutationFn: (commentId) => togglePaperCommentLike(commentId),
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries(['paper-comments', paperId]);
    },
    onError: () => toast.error('Failed to update like')
  });

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    if (!currentUser) {
      toast.warning('Please log in to comment');
      return;
    }

    createCommentMutation.mutate({ content: newComment.trim(), parentId: null });
    setNewComment('');
  };

  const handlePostReply = (parentId) => {
    if (!replyText.trim()) return;
    if (!currentUser) {
      toast.warning('Please log in to reply');
      return;
    }

    createCommentMutation.mutate({ content: replyText.trim(), parentId });
    setReplyingTo(null);
    setReplyText('');
  };

  const handleLikeComment = (commentId) => {
    if (!currentUser) {
      toast.warning('Please log in to like comments');
      return;
    }
    likeCommentMutation.mutate(commentId);
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  // Organize comments into threads (parent comments with their replies)
  const organizeComments = (flatComments) => {
    const parentComments = flatComments.filter(c => !c.parentId);
    const replies = flatComments.filter(c => c.parentId);

    return parentComments.map(parent => ({
      ...parent,
      replies: replies.filter(r => r.parentId === parent.id)
    }));
  };

  const threadedComments = organizeComments(comments);

  const CommentItem = ({ comment, isReply = false, parentId = null }) => {
    const isOwner = currentUser?.id === comment.userId;
    const likeCount = comment._count?.likes || comment.likes?.length || 0;
    const isLiked = comment.likes?.some(like => like.userId === currentUser?.id) || false;

    return (
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Avatar
          src={comment.user?.avatarUrl}
          alt={comment.user?.name}
          sx={{ width: 40, height: 40 }}
        >
          {comment.user?.name?.charAt(0) || 'U'}
        </Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="body2" fontWeight="bold">
              {comment.user?.name || 'Unknown User'}
            </Typography>
            {comment.user?.credentials && (
              <Typography variant="caption" color="text.secondary">
                • {comment.user.credentials}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              • {formatRelativeTime(comment.createdAt)}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {comment.content}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              size="small"
              startIcon={isLiked ? <LikeIcon /> : <LikeOutlinedIcon />}
              onClick={() => handleLikeComment(comment.id)}
              disabled={likeCommentMutation.isLoading}
              sx={{
                textTransform: 'none',
                minWidth: 'auto',
                p: 0,
                color: isLiked ? 'primary.main' : 'text.secondary'
              }}
            >
              {likeCount > 0 && likeCount}
            </Button>

            {!isReply && currentUser && (
              <Button
                size="small"
                startIcon={<ReplyIcon />}
                onClick={() => {
                  setReplyingTo(comment.id);
                  setReplyText('');
                }}
                sx={{ textTransform: 'none', minWidth: 'auto', p: 0 }}
              >
                Reply
              </Button>
            )}

            {isOwner && (
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteComment(comment.id)}
                disabled={deleteCommentMutation.isLoading}
                sx={{ textTransform: 'none', minWidth: 'auto', p: 0, color: 'error.main' }}
              >
                Delete
              </Button>
            )}
          </Box>

          {/* Reply Form */}
          {!isReply && replyingTo === comment.id && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handlePostReply(comment.id)}
                  disabled={!replyText.trim() || createCommentMutation.isLoading}
                >
                  {createCommentMutation.isLoading ? 'Posting...' : 'Reply'}
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          {/* Replies */}
          {!isReply && comment.replies && comment.replies.length > 0 && (
            <Box sx={{ mt: 2, ml: 4, borderLeft: 2, borderColor: 'divider', pl: 2 }}>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  parentId={comment.id}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={80} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={80} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load discussion. Please try again later.
      </Alert>
    );
  }

  return (
    <Box>
      {/* New Comment Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Start a Discussion
        </Typography>
        {currentUser ? (
          <>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your thoughts, questions, or insights about this paper..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handlePostComment}
              disabled={!newComment.trim() || createCommentMutation.isLoading}
              sx={{ textTransform: 'none' }}
            >
              {createCommentMutation.isLoading ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Posting...
                </>
              ) : (
                'Post Comment'
              )}
            </Button>
          </>
        ) : (
          <Alert severity="info">
            Please log in to participate in the discussion.
          </Alert>
        )}
      </Box>

      {/* Comments List */}
      <Typography variant="h6" gutterBottom>
        Discussion ({comments.length})
      </Typography>

      {threadedComments.length === 0 ? (
        <Alert severity="info">
          No discussions yet. Start the conversation!
        </Alert>
      ) : (
        threadedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </Box>
  );
};

export default PaperDiscussion;
