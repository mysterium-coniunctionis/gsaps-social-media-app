import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Rating,
  Skeleton,
  alpha
} from '@mui/material';
import {
  Visibility as ViewIcon,
  FormatQuote as CitationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * RelatedPapers Component
 * Shows papers related to the current paper based on topics and keywords
 */
const RelatedPapers = ({ paperId, topics = [] }) => {
  const navigate = useNavigate();
  const [relatedPapers, setRelatedPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId, topics]);

  const fetchRelatedPapers = () => {
    setLoading(true);

    // TODO: Replace with real API call
    setTimeout(() => {
      const mockRelatedPapers = [
        {
          id: 2,
          title: 'MDMA-assisted therapy for severe PTSD: a randomized, double-blind, placebo-controlled phase 3 study',
          authors: ['Jennifer M. Mitchell', 'Michael Bogenschutz', 'et al.'],
          year: 2024,
          journal: 'Nature Medicine',
          topics: ['mdma', 'therapy', 'clinical-trials'],
          rating: 4.9,
          ratingCount: 78,
          views: 2834,
          citations: 45
        },
        {
          id: 3,
          title: 'Neural mechanisms of psychedelic-induced neuroplasticity',
          authors: ['David E. Olson', 'Calvin Ly', 'Lindsay P. Cameron'],
          year: 2023,
          journal: 'Cell',
          topics: ['neuroscience', 'psilocybin', 'lsd'],
          rating: 4.7,
          ratingCount: 56,
          views: 1923,
          citations: 67
        },
        {
          id: 5,
          title: 'Long-term follow-up of psilocybin-assisted psychotherapy for treatment-resistant depression',
          authors: ['Sarah Johnson', 'et al.'],
          year: 2024,
          journal: 'JAMA Psychiatry',
          topics: ['psilocybin', 'depression', 'therapy'],
          rating: 4.6,
          ratingCount: 34,
          views: 1456,
          citations: 28
        },
        {
          id: 6,
          title: 'Comparative efficacy of psychedelic compounds in the treatment of mood disorders',
          authors: ['Michael Chen', 'et al.'],
          year: 2023,
          journal: 'Lancet Psychiatry',
          topics: ['psilocybin', 'therapy', 'clinical-trials'],
          rating: 4.5,
          ratingCount: 42,
          views: 1234,
          citations: 31
        }
      ];

      // Filter out current paper
      const filtered = mockRelatedPapers.filter(p => p.id !== paperId);
      setRelatedPapers(filtered);
      setLoading(false);
    }, 500);
  };

  const formatAuthors = (authors) => {
    if (authors.length <= 2) {
      return authors.join(', ');
    }
    return `${authors[0]}, et al.`;
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Related Papers
        </Typography>
        {[1, 2, 3].map((n) => (
          <Card key={n} sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="90%" height={24} />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="50%" />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (relatedPapers.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Related Papers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No related papers found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Related Papers
      </Typography>

      {relatedPapers.map((paper) => (
        <Card
          key={paper.id}
          sx={{
            mb: 2,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 3
            }
          }}
        >
          <CardActionArea onClick={() => navigate(`/library/${paper.id}`)}>
            <CardContent>
              {/* Title */}
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.3,
                  mb: 1
                }}
              >
                {paper.title}
              </Typography>

              {/* Authors */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                {formatAuthors(paper.authors)}
              </Typography>

              {/* Journal and Year */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 1 }}
              >
                {paper.journal} • {paper.year}
              </Typography>

              {/* Topics */}
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                {paper.topics.slice(0, 2).map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    size="small"
                    sx={{
                      fontSize: '0.65rem',
                      height: 18,
                      bgcolor: alpha('#2196f3', 0.1),
                      color: 'primary.main'
                    }}
                  />
                ))}
                {paper.topics.length > 2 && (
                  <Chip
                    label={`+${paper.topics.length - 2}`}
                    size="small"
                    sx={{ fontSize: '0.65rem', height: 18 }}
                  />
                )}
              </Box>

              {/* Rating and Stats */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Rating
                  value={paper.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{ fontSize: '0.875rem' }}
                />
                <Typography variant="caption" color="text.secondary">
                  {paper.rating.toFixed(1)}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ViewIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {paper.views.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CitationIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {paper.citations}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default RelatedPapers;
