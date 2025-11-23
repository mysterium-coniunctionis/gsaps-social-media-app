import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Alert, Button } from '@mui/material';
import { verifyEmailToken } from '../api/auth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmailToken(token);
        setStatus('success');
        setMessage('Email verified successfully.');
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Verification failed');
      }
    };

    if (token) {
      verify();
    } else {
      setStatus('error');
      setMessage('Missing verification token.');
    }
  }, [token]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <Card sx={{ maxWidth: 480, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Verify your email
          </Typography>
          <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
          <Button variant="contained" onClick={() => navigate('/login')} fullWidth>
            Return to login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyEmail;
