import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  Avatar,
  Paper,
  Divider,
  LinearProgress,
  Alert,
  Grid,
  Skeleton,
  CircularProgress
} from '@mui/material';
import { Star as StarIcon, Edit as EditIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { useToast } from '../common';
import { formatRelativeTime } from '../../utils/dateUtils';
import { fetchPaperReviews, createPaperReview } from '../../api/backend';

/**
 * PaperReviews Component
 * Display and submit reviews/ratings for research papers - connected to real API
 */
const PaperReviews = ({ paper }) => {
  const { currentUser } = useAuth();
  const { awardXP } = useGamification();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Fetch reviews from API
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['paper-reviews', paper?.id],
    queryFn: () => fetchPaperReviews(paper?.id),
    enabled: Boolean(paper?.id)
  });

  // Create review mutation
  const createReviewMutation = useMutation({
    mutationFn: (reviewData) => createPaperReview(paper.id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['paper-reviews', paper?.id]);
      queryClient.invalidateQueries(['paper', paper?.id]);
      awardXP('WRITE_REVIEW');
      toast.success('Review submitted successfully!');
      setIsWritingReview(false);
      setRating(0);
      setReviewText('');
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        toast.warning('You have already reviewed this paper');
      } else {
        toast.error('Failed to submit review');
      }
    }
  });

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.warning('Please provide a rating');
      return;
    }
    if (!currentUser) {
      toast.warning('Please log in to submit a review');
      return;
    }

    createReviewMutation.mutate({
      rating,
      text: reviewText.trim() || null
    });
  };

  // Check if current user has already reviewed
  const userReview = reviews.find(r => r.userId === currentUser?.id);

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      dist[review.rating] = (dist[review.rating] || 0) + 1;
    });
    return dist;
  };

  const ratingDist = getRatingDistribution();
  const totalReviews = reviews.length;

  // Calculate average rating from reviews
  const avgRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : paper?.rating || 0;

  if (isLoading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={150} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={100} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={100} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={100} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Failed to load reviews. Please try again later.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Overall Rating Summary */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'action.hover' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" fontWeight="bold">
              {avgRating.toFixed(1)}
            </Typography>
            <Rating value={avgRating} precision={0.1} readOnly size="large" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ width: 30 }}>
                  {stars} <StarIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} />
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={totalReviews > 0 ? (ratingDist[stars] / totalReviews) * 100 : 0}
                  sx={{ flexGrow: 1, mx: 2, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>
                  {ratingDist[stars]}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Paper>

      {/* Write Review Button */}
      {!userReview && !isWritingReview && currentUser && (
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setIsWritingReview(true)}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Write a Review
        </Button>
      )}

      {/* Already reviewed message */}
      {userReview && !isWritingReview && (
        <Alert severity="success" sx={{ mb: 3 }}>
          You have already reviewed this paper with a rating of {userReview.rating} stars.
        </Alert>
      )}

      {/* Login prompt */}
      {!currentUser && !isWritingReview && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please log in to write a review.
        </Alert>
      )}

      {/* Review Form */}
      {isWritingReview && (
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Write Your Review
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Overall Rating *
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review (optional)"
            placeholder="Share your thoughts about this paper..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleSubmitReview}
              disabled={rating === 0 || createReviewMutation.isLoading}
            >
              {createReviewMutation.isLoading ? (
                <>
                  <CircularProgress size={16} sx={{ mr: 1 }} />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsWritingReview(false);
                setRating(0);
                setReviewText('');
              }}
              disabled={createReviewMutation.isLoading}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      {/* Reviews List */}
      <Typography variant="h6" gutterBottom>
        Reviews ({totalReviews})
      </Typography>

      {reviews.length === 0 ? (
        <Alert severity="info">No reviews yet. Be the first to review this paper!</Alert>
      ) : (
        reviews.map((review, index) => (
          <Box key={review.id}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Avatar
                src={review.user?.avatarUrl}
                alt={review.user?.name}
                sx={{ width: 48, height: 48 }}
              >
                {review.user?.name?.charAt(0) || 'U'}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {review.user?.name || 'Anonymous'}
                  </Typography>
                  {review.user?.credentials && (
                    <Typography variant="caption" color="text.secondary">
                      • {review.user.credentials}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {formatRelativeTime(review.createdAt)}
                  </Typography>
                </Box>

                {review.text && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {review.text}
                  </Typography>
                )}

                {review.helpful !== undefined && review.helpful > 0 && (
                  <Button
                    size="small"
                    sx={{ textTransform: 'none', minWidth: 'auto', p: 0 }}
                  >
                    Helpful ({review.helpful})
                  </Button>
                )}
              </Box>
            </Box>

            {index < reviews.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))
      )}
    </Box>
  );
};

export default PaperReviews;
