import React, { useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Paper
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

/**
 * Certificate Component
 * Generates a professional certificate of completion for courses
 */
const Certificate = ({ course, completionDate, ceCredits, score, credential }) => {
  const { currentUser } = useAuth();
  const certificateRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    alert('Certificate download feature will generate a PDF in production');
  };

  const handleShare = () => {
    const shareText = `I just completed "${course.title}" and earned ${ceCredits || course.ceCredits} CE credits on GSAPS!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Course Certificate',
        text: shareText,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Certificate details copied to clipboard!');
    }
  };

  const certificateId = credential?.id || `GSAPS-${course.id}-${new Date(completionDate).getTime()}`;
  const verificationUrl = credential?.verificationUrl || 'https://gsaps.org/certificates/verify';
  const formattedDate = new Date(completionDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center', '@media print': { display: 'none' } }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
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
          onClick={handleShare}
        >
          Share
        </Button>
      </Box>

      {/* Certificate */}
      <Paper
        ref={certificateRef}
        sx={{
          p: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
          '@media print': {
            boxShadow: 'none',
            p: 8
          }
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            '@media print': { display: 'none' }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            '@media print': { display: 'none' }
          }}
        />

        {/* Certificate Content */}
        <Card sx={{ position: 'relative', zIndex: 1, bgcolor: 'white', p: 6 }}>
          <CardContent>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 3, fontSize: '0.9rem' }}>
                Graduate Student Association for Psychedelic Studies
              </Typography>
              <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', mt: 2, color: 'grey.900' }}>
                Certificate of Completion
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2 }}>
                <VerifiedIcon sx={{ color: 'success.main', fontSize: 28 }} />
                <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                  VERIFIED
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4, borderWidth: 2, borderColor: 'primary.main' }} />

            {/* Main Content */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
                This is to certify that
              </Typography>
              
              <Typography variant="h4" sx={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
                {currentUser?.name || currentUser?.username || 'Student Name'}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem' }}>
                has successfully completed the course
              </Typography>

              <Typography variant="h5" sx={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', mb: 3 }}>
                {course.title}
              </Typography>

              <Box sx={{ my: 4 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Instructed by: <strong>{course.instructor.name}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Duration: <strong>{course.duration}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Total Hours: <strong>{course.totalHours} hours</strong>
                </Typography>
                {score && (
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    Final Score: <strong>{score}%</strong>
                  </Typography>
                )}
              </Box>

              {/* CE Credits */}
              {(ceCredits || course.ceCredits) && (
                <Box sx={{ 
                  bgcolor: 'success.50', 
                  p: 3, 
                  borderRadius: 2, 
                  border: '2px solid', 
                  borderColor: 'success.main',
                  mb: 4
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.dark', mb: 1 }}>
                    {ceCredits || course.ceCredits} Continuing Education Credits
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.ceCategories?.join(', ')}
                  </Typography>
                </Box>
              )}

              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                Awarded on <strong>{formattedDate}</strong>
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Footer */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 4 }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box sx={{ borderTop: '2px solid black', pt: 1, mb: 1, mx: 4 }} />
                <Typography variant="caption" color="text.secondary">
                  {course.instructor.name}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Course Instructor
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Box sx={{ borderTop: '2px solid black', pt: 1, mb: 1, mx: 4 }} />
                <Typography variant="caption" color="text.secondary">
                  GSAPS Administrator
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Director of Education
                </Typography>
              </Box>
            </Box>

            {/* Certificate ID */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                Certificate ID: {certificateId}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                Verify at: {verificationUrl}
              </Typography>
              {credential && (
                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                  Issued to {credential.issuedTo} • {credential.ceCredits || ceCredits || course.ceCredits} CE
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Paper>

      {/* Additional Info */}
      <Box sx={{ mt: 3, textAlign: 'center', '@media print': { display: 'none' } }}>
        <Typography variant="body2" color="text.secondary">
          This certificate is issued in recognition of course completion and is backed by a verifiable credential.
          For official CE credit submission, please contact your licensing board.
        </Typography>
      </Box>
    </Box>
  );
};

export default Certificate;
