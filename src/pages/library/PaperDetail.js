/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  IconButton,
  Avatar,
  Rating,
  Divider,
  Card,
  CardContent,
  Grid,
  Paper,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  GetApp as DownloadIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  FormatQuote as QuoteIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  Comment as CommentIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { fadeInUp } from '../../theme/animations';
import { useToast } from '../../components/common';
import PaperDiscussion from '../../components/library/PaperDiscussion';
import PaperReviews from '../../components/library/PaperReviews';
import CitationExport from '../../components/library/CitationExport';
import { formatRelativeTime } from '../../utils/dateUtils';
import RelatedPapers from '../../components/library/RelatedPapers';

/**
 * PaperDetail Page
 * Displays full research paper details with reviews, discussions, and citations
 */
const PaperDetail = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [citationMenuAnchor, setCitationMenuAnchor] = useState(null);

  // Fetch paper data
  useEffect(() => {
    fetchPaper();
    // Track view
    trackView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId]);

  const fetchPaper = async () => {
    setLoading(true);

    // TODO: Replace with real API call
    setTimeout(() => {
      // Mock data - would come from API
      const mockPaper = {
        id: parseInt(paperId),
        title: 'Psilocybin with psychological support for treatment-resistant depression: six-month follow-up',
        authors: [
          { name: 'Robin L. Carhart-Harris', affiliation: 'Imperial College London' },
          { name: 'Briony Bolstridge', affiliation: 'Imperial College London' },
          { name: 'James Rucker', affiliation: 'King\'s College London' },
          { name: 'Camilla M. Day', affiliation: 'Imperial College London' },
          { name: 'David Erritzoe', affiliation: 'Imperial College London' },
          { name: 'Mendel Kaelen', affiliation: 'Imperial College London' },
          { name: 'Michael Bloomfield', affiliation: 'University College London' },
          { name: 'James A. Rickard', affiliation: 'Imperial College London' },
          { name: 'Ben Forbes', affiliation: 'Imperial College London' },
          { name: 'Amanda Feilding', affiliation: 'Beckley Foundation' },
          { name: 'David Taylor', affiliation: 'King\'s College London' },
          { name: 'Steve Pilling', affiliation: 'University College London' },
          { name: 'Valerie H. Curran', affiliation: 'University College London' },
          { name: 'David J. Nutt', affiliation: 'Imperial College London' }
        ],
        year: 2024,
        journal: 'Psychopharmacology',
        volume: '241',
        issue: '3',
        pages: '439-452',
        doi: '10.1007/s00213-024-12345-6',
        pmid: '38234567',
        abstract: 'Background: Psilocybin has shown promise in treating treatment-resistant depression (TRD). This study reports on the 6-month follow-up of patients who received psilocybin with psychological support.\n\nMethods: Twenty patients with TRD received two oral doses of psilocybin (10 mg and 25 mg, 7 days apart) plus psychological support (before, during and after sessions). Depression severity was assessed using the QIDS-SR16 at baseline and at 1, 2, 3, and 6 months post-treatment.\n\nResults: Marked reductions in depressive symptoms were observed at all follow-up time points. At 6 months, 9 patients (45%) met criteria for response and 4 patients (20%) for remission. The treatment was well tolerated with no serious adverse events.\n\nConclusions: These findings support the potential of psilocybin-assisted therapy for TRD, with effects sustained at 6 months in a substantial proportion of patients. Larger, controlled trials are warranted.',
        keywords: ['psilocybin', 'depression', 'treatment-resistant depression', 'psychedelic therapy', 'mental health', 'clinical trial'],
        topics: ['psilocybin', 'therapy', 'clinical-trials', 'mental-health'],
        fileUrl: '#',
        fileSize: '2.4 MB',
        uploadedBy: {
          id: 1,
          name: 'Dr. Alice Johnson',
          username: 'alice_researcher',
          avatar_url: 'https://i.pravatar.cc/150?img=1',
          credentials: 'PhD, Neuroscience',
          verified: true
        },
        uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        views: 1547,
        downloads: 342,
        citations: 23,
        rating: 4.8,
        ratingCount: 45,
        reviews: [],
        discussionCount: 12,
        inMyLibrary: false,
        relatedPapers: [2, 3, 4] // IDs of related papers
      };

      setPaper(mockPaper);
      setLoading(false);
    }, 800);
  };

  const trackView = () => {
    // TODO: Track view in analytics
  };

  const handleDownload = () => {
    if (paper) {
      window.open(paper.fileUrl, '_blank');
      toast.success('Download started');
      // TODO: Track download
    }
  };

  const handleToggleLibrary = () => {
    if (paper) {
      setPaper({ ...paper, inMyLibrary: !paper.inMyLibrary });
      toast.success(paper.inMyLibrary ? 'Removed from your library' : 'Added to your library');
    }
  };

  const handleShare = () => {
    // Copy link to clipboard
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard!');
  };

  const handleCitationClick = (event) => {
    setCitationMenuAnchor(event.currentTarget);
  };

  const handleCitationClose = () => {
    setCitationMenuAnchor(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!paper) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Paper not found</Alert>
        <Button startIcon={<BackIcon />} onClick={() => navigate('/library')} sx={{ mt: 2 }}>
          Back to Library
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Back Button */}
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/library')}
          sx={{
            mb: 3,
            textTransform: 'none',
            animation: `${fadeInUp} 0.5s ease-out`
          }}
        >
          Back to Library
        </Button>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                animation: `${fadeInUp} 0.5s ease-out 0.1s backwards`
              }}
            >
              {/* PDF Badge */}
              <Chip
                label="PDF"
                icon={<SchoolIcon />}
                color="error"
                sx={{ mb: 2, fontWeight: 'bold' }}
              />

              {/* Title */}
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ lineHeight: 1.3 }}>
                {paper.title}
              </Typography>

              {/* Authors */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {paper.authors.map((author, index) => (
                    <span key={index}>
                      {author.name}
                      {author.affiliation && <sup style={{ fontSize: '0.7em', marginLeft: 2 }}>{index + 1}</sup>}
                      {index < paper.authors.length - 1 && ', '}
                    </span>
                  ))}
                </Typography>

                {/* Affiliations */}
                <Box sx={{ mt: 1 }}>
                  {paper.authors.filter((a, i, arr) =>
                    arr.findIndex(b => b.affiliation === a.affiliation) === i
                  ).map((author, index) => (
                    <Typography key={index} variant="caption" color="text.secondary" display="block">
                      <sup>{index + 1}</sup> {author.affiliation}
                    </Typography>
                  ))}
                </Box>
              </Box>

              {/* Publication Info */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>{paper.journal}</strong> {paper.volume && `${paper.volume}${paper.issue ? `(${paper.issue})` : ''}`}
                  {paper.pages && `, pp. ${paper.pages}`} ({paper.year})
                </Typography>
                {paper.doi && (
                  <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                    DOI: <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">{paper.doi}</a>
                  </Typography>
                )}
                {paper.pmid && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    PMID: {paper.pmid}
                  </Typography>
                )}
              </Box>

              {/* Topics */}
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 3 }}>
                {paper.topics.map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    size="small"
                    sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Abstract */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Abstract
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                  {paper.abstract}
                </Typography>
              </Box>

              {/* Keywords */}
              {paper.keywords && paper.keywords.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Keywords
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {paper.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              {/* Tabs for Reviews and Discussion */}
              <Box sx={{ mb: 2 }}>
                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
                  <Tab label={`Reviews (${paper.ratingCount})`} />
                  <Tab label={`Discussion (${paper.discussionCount})`} />
                  <Tab label="Citation" />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ mt: 3 }}>
                {activeTab === 0 && <PaperReviews paper={paper} />}
                {activeTab === 1 && <PaperDiscussion paperId={paper.id} />}
                {activeTab === 2 && <CitationExport paper={paper} />}
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Actions Card */}
            <Card
              elevation={2}
              sx={{
                mb: 3,
                animation: `${fadeInUp} 0.5s ease-out 0.2s backwards`
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Actions
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  sx={{ mb: 1, textTransform: 'none' }}
                >
                  Download PDF ({paper.fileSize})
                </Button>

                <Button
                  fullWidth
                  variant={paper.inMyLibrary ? 'contained' : 'outlined'}
                  startIcon={paper.inMyLibrary ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  onClick={handleToggleLibrary}
                  sx={{ mb: 1, textTransform: 'none' }}
                >
                  {paper.inMyLibrary ? 'In Library' : 'Save to Library'}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<QuoteIcon />}
                  onClick={handleCitationClick}
                  sx={{ mb: 1, textTransform: 'none' }}
                >
                  Cite Paper
                </Button>

                <Menu
                  anchorEl={citationMenuAnchor}
                  open={Boolean(citationMenuAnchor)}
                  onClose={handleCitationClose}
                >
                  <MenuItem onClick={() => { handleCitationClose(); setActiveTab(2); }}>
                    View All Formats
                  </MenuItem>
                </Menu>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                  sx={{ textTransform: 'none' }}
                >
                  Share
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card
              elevation={2}
              sx={{
                mb: 3,
                animation: `${fadeInUp} 0.5s ease-out 0.3s backwards`
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Statistics
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ViewIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    <strong>{paper.views.toLocaleString()}</strong> views
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DownloadIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    <strong>{paper.downloads.toLocaleString()}</strong> downloads
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <QuoteIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    <strong>{paper.citations}</strong> citations
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CommentIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    <strong>{paper.discussionCount}</strong> discussions
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography variant="body2">
                    <strong>{paper.rating.toFixed(1)}</strong> / 5.0 ({paper.ratingCount} ratings)
                  </Typography>
                </Box>
                <Rating value={paper.rating} precision={0.1} readOnly size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>

            {/* Uploader Card */}
            <Card
              elevation={2}
              sx={{
                mb: 3,
                animation: `${fadeInUp} 0.5s ease-out 0.4s backwards`
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Uploaded By
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={paper.uploadedBy.avatar_url}
                    alt={paper.uploadedBy.name}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  >
                    {paper.uploadedBy.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {paper.uploadedBy.name}
                      {paper.uploadedBy.verified && ' ✓'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {paper.uploadedBy.credentials}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Uploaded {formatRelativeTime(paper.uploadedAt)}
                </Typography>
              </CardContent>
            </Card>

            {/* Related Papers */}
            <RelatedPapers paperId={paper.id} relatedIds={paper.relatedPapers} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PaperDetail;
