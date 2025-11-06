import React, { useState, useEffect } from 'react';
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
  Grid
} from '@mui/material';
import { Star as StarIcon, Edit as EditIcon } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '../common';

/**
 * PaperReviews Component
 * Display and submit reviews/ratings for research papers
 */
const PaperReviews = ({ paper }) => {
  const toast = useToast();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    // TODO: Replace with real API call
    const mockReviews = [
      {
        id: 1,
        user: {
          name: 'Dr. Sarah Mitchell',
          username: 'sarah_m',
          avatar_url: 'https://i.pravatar.cc/150?img=5',
          credentials: 'PhD, Clinical Psychology'
        },
        rating: 5,
        text: 'Excellent study with rigorous methodology. The 6-month follow-up data is particularly valuable and demonstrates sustained effects. This is a landmark paper in the field of psychedelic-assisted therapy.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        helpful: 12
      },
      {
        id: 2,
        user: {
          name: 'Prof. Michael Chen',
          username: 'mchen',
          avatar_url: 'https://i.pravatar.cc/150?img=7',
          credentials: 'MD, Psychiatry'
        },
        rating: 4,
        text: 'Strong results, though the small sample size (n=20) limits generalizability. Would have liked to see a control group. Nevertheless, the effect sizes are impressive and warrant larger trials.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        helpful: 8
      },
      {
        id: 3,
        user: {
          name: 'Emily Rodriguez',
          username: 'emily_r',
          avatar_url: 'https://i.pravatar.cc/150?img=3',
          credentials: 'Graduate Student'
        },
        rating: 5,
        text: 'Clear presentation of findings and excellent discussion of implications. The psychological support protocol is well-described and could be replicated. Highly recommended reading for anyone interested in psychedelic therapy.',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        helpful: 6
      }
    ];

    setReviews(mockReviews);
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.warning('Please provide a rating');
      return;
    }

    const newReview = {
      id: Date.now(),
      user: {
        name: 'You',
        username: 'your_username',
        avatar_url: '',
        credentials: 'Researcher'
      },
      rating,
      text: reviewText.trim(),
      createdAt: new Date(),
      helpful: 0
    };

    setReviews([newReview, ...reviews]);
    setUserReview(newReview);
    setIsWritingReview(false);
    setRating(0);
    setReviewText('');
    toast.success('Review submitted successfully!');
  };

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      dist[review.rating] = (dist[review.rating] || 0) + 1;
    });
    return dist;
  };

  const ratingDist = getRatingDistribution();
  const totalReviews = reviews.length;

  return (
    <Box>
      {/* Overall Rating Summary */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'action.hover' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" fontWeight="bold">
              {paper.rating.toFixed(1)}
            </Typography>
            <Rating value={paper.rating} precision={0.1} readOnly size="large" />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Based on {paper.ratingCount} ratings
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
      {!userReview && !isWritingReview && (
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => setIsWritingReview(true)}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Write a Review
        </Button>
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
              disabled={rating === 0}
            >
              Submit Review
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsWritingReview(false);
                setRating(0);
                setReviewText('');
              }}
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
              <Avatar src={review.user.avatar_url} alt={review.user.name} sx={{ width: 48, height: 48 }}>
                {review.user.name.charAt(0)}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {review.user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    • {review.user.credentials}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" color="text.secondary">
                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                  </Typography>
                </Box>

                {review.text && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {review.text}
                  </Typography>
                )}

                <Button
                  size="small"
                  sx={{ textTransform: 'none', minWidth: 'auto', p: 0 }}
                >
                  Helpful ({review.helpful})
                </Button>
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
