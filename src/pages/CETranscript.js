import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Grid,
  Divider,
  Alert,
  Skeleton,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  School as SchoolIcon,
  Download as DownloadIcon,
  Verified as VerifiedIcon,
  OpenInNew as OpenIcon,
  Print as PrintIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUserCredentials } from '../api/backend';
import { useAuth } from '../context/AuthContext';
import { fadeInUp } from '../theme/animations';

const CETranscript = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['credentials', currentUser?.id],
    queryFn: () => fetchUserCredentials(currentUser?.id),
    enabled: !!currentUser?.id
  });

  const handlePrint = () => {
    window.print();
  };

  const handleVerify = (verificationUrl) => {
    const fullUrl = window.location.origin + verificationUrl;
    window.open(fullUrl, '_blank');
  };

  const getCETypeColor = (type) => {
    const colors = {
      APA: 'primary',
      CME: 'success',
      CNE: 'info',
      CEU: 'secondary'
    };
    return colors[type] || 'default';
  };

  if (!currentUser) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Please Log In</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          You need to be logged in to view your CE transcript.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Log In
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4, '@media print': { py: 0, bgcolor: 'white' } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, animation: `${fadeInUp} 0.4s ease-out`, '@media print': { mb: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                CE Transcript
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your continuing education credits and credentials
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, '@media print': { display: 'none' } }}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard');
                }}
              >
                Share
              </Button>
            </Box>
          </Box>
        </Box>

        {/* User Info Card (for print) */}
        <Card sx={{ mb: 4, '@media screen': { display: 'none' }, '@media print': { display: 'block' } }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              GSAPS Official CE Transcript
            </Typography>
            <Typography variant="body2">
              Issued to: {currentUser.name}
            </Typography>
            <Typography variant="body2">
              Email: {currentUser.email}
            </Typography>
            <Typography variant="body2">
              Generated: {new Date().toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>

        {/* CE Totals Summary */}
        <Grid container spacing={3} sx={{ mb: 4, animation: `${fadeInUp} 0.5s ease-out` }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                <SchoolIcon sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                <Typography variant="h3" fontWeight="bold">
                  {isLoading ? <Skeleton width={60} sx={{ mx: 'auto' }} /> : data?.ceTotals?.total || 0}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total CE Credits
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {data?.ceTotals && Object.entries(data.ceTotals)
            .filter(([key]) => key !== 'total')
            .map(([type, credits]) => (
              <Grid item xs={12} sm={6} md={3} key={type}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chip
                      label={type}
                      color={getCETypeColor(type)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h4" fontWeight="bold">
                      {credits}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type} Credits
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          {!isLoading && (!data?.ceTotals || Object.keys(data.ceTotals).length <= 1) && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chip label="APA" color="primary" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">0</Typography>
                    <Typography variant="body2" color="text.secondary">APA Credits</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chip label="CME" color="success" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">0</Typography>
                    <Typography variant="body2" color="text.secondary">CME Credits</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Chip label="CNE" color="info" size="small" sx={{ mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">0</Typography>
                    <Typography variant="body2" color="text.secondary">CNE Credits</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>

        {/* Credentials Table */}
        <Card sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Earned Credentials
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {isLoading ? (
              <Box>
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} height={60} sx={{ mb: 1 }} />
                ))}
              </Box>
            ) : error ? (
              <Alert severity="error">
                Failed to load credentials. Please try again later.
              </Alert>
            ) : !data?.credentials?.length ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  No Credentials Yet
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Complete courses to earn CE credits and credentials.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              </Box>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell><strong>Course</strong></TableCell>
                      <TableCell align="center"><strong>CE Credits</strong></TableCell>
                      <TableCell align="center"><strong>Type</strong></TableCell>
                      <TableCell align="center"><strong>Score</strong></TableCell>
                      <TableCell align="center"><strong>Date Issued</strong></TableCell>
                      <TableCell align="center"><strong>Certificate ID</strong></TableCell>
                      <TableCell align="center" sx={{ '@media print': { display: 'none' } }}><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.credentials.map((credential) => (
                      <TableRow key={credential.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <VerifiedIcon sx={{ color: 'success.main', fontSize: 20 }} />
                            <Box>
                              <Typography variant="body2" fontWeight="bold">
                                {credential.course.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {credential.course.instructorName}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontWeight="bold">
                            {credential.ceCredits || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {credential.ceType ? (
                            <Chip
                              label={credential.ceType}
                              color={getCETypeColor(credential.ceType)}
                              size="small"
                            />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {credential.score ? `${credential.score}%` : '-'}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(credential.issuedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                            {credential.certificateId}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ '@media print': { display: 'none' } }}>
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Verify Certificate">
                              <IconButton
                                size="small"
                                onClick={() => handleVerify(credential.verificationUrl)}
                              >
                                <OpenIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download PDF">
                              <IconButton
                                size="small"
                                onClick={() => alert('PDF download coming soon')}
                              >
                                <DownloadIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Footer Note */}
        <Box sx={{ mt: 4, textAlign: 'center', '@media print': { mt: 2 } }}>
          <Typography variant="body2" color="text.secondary">
            This transcript is issued by the Graduate Student Association for Psychedelic Studies (GSAPS).
          </Typography>
          <Typography variant="caption" color="text.secondary">
            For official CE credit submission, please contact your licensing board.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CETranscript;
