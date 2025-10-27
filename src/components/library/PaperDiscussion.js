/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import {
  Reply as ReplyIcon,
  ThumbUp as LikeIcon,
  ThumbUpOutlined as LikeOutlinedIcon
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '../common';

/**
 * PaperDiscussion Component
 * Threaded discussion system for research papers
 */
const PaperDiscussion = ({ paperId }) => {
  const toast = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchComments();
  }, [paperId]);

  const fetchComments = () => {
    // TODO: Replace with real API call
    const mockComments = [
      {
        id: 1,
        user: {
          name: 'Dr. James Wilson',
          username: 'jwilson',
          avatar_url: 'https://i.pravatar.cc/150?img=8',
          credentials: 'PhD, Pharmacology'
        },
        text: 'The methodology here is particularly interesting. The use of psychological support sessions before and after dosing seems crucial. Has anyone tried to replicate this protocol?',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        likes: 5,
        isLiked: false,
        replies: [
          {
            id: 11,
            user: {
              name: 'Lisa Anderson',
              username: 'lisa_a',
              avatar_url: 'https://i.pravatar.cc/150?img=9'
            },
            text: 'We\'re currently running a similar study with a larger sample size. The integration sessions are indeed critical. Will share results when published.',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            likes: 3,
            isLiked: true
          }
        ]
      },
      {
        id: 2,
        user: {
          name: 'Maria Garcia',
          username: 'maria_g',
          avatar_url: 'https://i.pravatar.cc/150?img=10'
        },
        text: 'The 6-month follow-up data showing sustained effects is remarkable. This addresses one of the key criticisms of psychedelic therapy - durability of effects.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        likes: 8,
        isLiked: false,
        replies: []
      },
      {
        id: 3,
        user: {
          name: 'Tom Baker',
          username: 'tbaker',
          avatar_url: 'https://i.pravatar.cc/150?img=11'
        },
        text: 'Would love to see more details on the psychological support protocol. Is there a supplementary materials section with the session outlines?',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        likes: 2,
        isLiked: false,
        replies: []
      }
    ];

    setComments(mockComments);
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: {
        name: 'You',
        username: 'your_username',
        avatar_url: ''
      },
      text: newComment.trim(),
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment posted!');
  };

  const handlePostReply = (parentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      user: {
        name: 'You',
        username: 'your_username',
        avatar_url: ''
      },
      text: replyText.trim(),
      createdAt: new Date(),
      likes: 0,
      isLiked: false
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    setReplyingTo(null);
    setReplyText('');
    toast.success('Reply posted!');
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }
        return comment;
      }));
    }
  };

  const CommentItem = ({ comment, isReply = false, parentId = null }) => (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Avatar src={comment.user.avatar_url} alt={comment.user.name} sx={{ width: 40, height: 40 }}>
        {comment.user.name.charAt(0)}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="body2" fontWeight="bold">
            {comment.user.name}
          </Typography>
          {comment.user.credentials && (
            <Typography variant="caption" color="text.secondary">
              • {comment.user.credentials}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mb: 1 }}>
          {comment.text}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            size="small"
            startIcon={comment.isLiked ? <LikeIcon /> : <LikeOutlinedIcon />}
            onClick={() => handleLikeComment(comment.id, isReply, parentId)}
            sx={{
              textTransform: 'none',
              minWidth: 'auto',
              p: 0,
              color: comment.isLiked ? 'primary.main' : 'text.secondary'
            }}
          >
            {comment.likes > 0 && comment.likes}
          </Button>

          {!isReply && (
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
                disabled={!replyText.trim()}
              >
                Reply
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

  return (
    <Box>
      {/* New Comment Form */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Start a Discussion
        </Typography>
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
          disabled={!newComment.trim()}
          sx={{ textTransform: 'none' }}
        >
          Post Comment
        </Button>
      </Box>

      {/* Comments List */}
      <Typography variant="h6" gutterBottom>
        Discussion ({comments.length})
      </Typography>

      {comments.length === 0 ? (
        <Alert severity="info">
          No discussions yet. Start the conversation!
        </Alert>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </Box>
  );
};

export default PaperDiscussion;
