import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

/**
 * CommentSection Component - Display and add comments
 * Supports nested replies and reactions
 */
const CommentSection = ({ postId, onComment }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    // TODO: Fetch comments from API
    // Mock comments for now
    const mockComments = [
      {
        id: 1,
        author: {
          id: 2,
          name: 'Bob Williams',
          username: 'bob_neuroscience',
          avatar: ''
        },
        content: 'This is fascinating! Would love to learn more about the methodology.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        likes: 12,
        isLiked: false,
        replies: [
          {
            id: 2,
            author: {
              id: 1,
              name: 'Dr. Alice Johnson',
              username: 'alice_researcher',
              avatar: ''
            },
            content: 'Thanks Bob! The full paper will be out next week with all the details.',
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
            likes: 8,
            isLiked: true
          }
        ]
      },
      {
        id: 3,
        author: {
          id: 4,
          name: 'David Martinez',
          username: 'david_student',
          avatar: ''
        },
        content: 'As a grad student, this gives me so much hope for the future of psychedelic research!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 24,
        isLiked: true,
        replies: []
      }
    ];
    setComments(mockComments);
  }, [postId]);

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: {
        id: 'current-user',
        name: 'You',
        username: 'your_username',
        avatar: ''
      },
      content: commentText.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    if (replyingTo) {
      // Add as reply
      setComments(comments.map(comment =>
        comment.id === replyingTo
          ? { ...comment, replies: [...(comment.replies || []), newComment] }
          : comment
      ));
      setReplyingTo(null);
    } else {
      // Add as top-level comment
      setComments([...comments, newComment]);
    }

    setCommentText('');
    onComment(postId, commentText.trim());
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(comments.map(comment =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? {
                      ...reply,
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
    }
  };

  const formatTimestamp = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'recently';
    }
  };

  const CommentItem = ({ comment, isReply = false, parentId = null }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    return (
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          mb: 2,
          ml: isReply ? 6 : 0
        }}
      >
        <Avatar
          src={comment.author.avatar}
          alt={comment.author.name}
          sx={{ width: 32, height: 32 }}
        >
          {comment.author.name.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              bgcolor: 'action.hover',
              borderRadius: 2,
              p: 1.5,
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {comment.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  @{comment.author.username}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ ml: 1 }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>

            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              {comment.content}
            </Typography>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => setAnchorEl(null)}>Edit</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Delete</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>Report</MenuItem>
            </Menu>
          </Box>

          {/* Comment Actions */}
          <Box sx={{ display: 'flex', gap: 2, mt: 0.5, pl: 1.5 }}>
            <Button
              size="small"
              startIcon={
                comment.isLiked ? (
                  <ThumbUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />
                )
              }
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              sx={{
                minWidth: 'auto',
                textTransform: 'none',
                fontSize: '0.75rem',
                color: comment.isLiked ? 'primary.main' : 'text.secondary',
                p: 0.5,
                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'primary.main'
                }
              }}
            >
              {comment.likes > 0 && comment.likes}
            </Button>

            {!isReply && (
              <Button
                size="small"
                onClick={() => {
                  setReplyingTo(comment.id);
                  setCommentText(`@${comment.author.username} `);
                }}
                sx={{
                  minWidth: 'auto',
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                  p: 0.5,
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: 'primary.main'
                  }
                }}
              >
                Reply
              </Button>
            )}

            <Typography variant="caption" color="text.secondary" sx={{ pt: 0.5 }}>
              {formatTimestamp(comment.timestamp)}
            </Typography>
          </Box>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {comment.replies.map(reply => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply
                  parentId={comment.id}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Comments List */}
      {comments.length > 0 ? (
        <Box sx={{ mb: 3 }}>
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </Box>
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ py: 3 }}
        >
          No comments yet. Be the first to comment!
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* Add Comment */}
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Avatar sx={{ width: 32, height: 32 }}>
          Y
        </Avatar>

        <Box sx={{ flex: 1 }}>
          {replyingTo && (
            <Box
              sx={{
                mb: 1,
                p: 1,
                bgcolor: 'primary.lighter',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="caption">
                Replying to comment
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  setReplyingTo(null);
                  setCommentText('');
                }}
                sx={{ minWidth: 'auto', textTransform: 'none', fontSize: '0.75rem' }}
              >
                Cancel
              </Button>
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            maxRows={4}
            size="small"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleSubmitComment}
              disabled={!commentText.trim()}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 2
              }}
            >
              Comment
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentSection;
