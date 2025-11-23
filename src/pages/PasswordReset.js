import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset, resetPassword } from '../api/auth';

const steps = ['Request reset link', 'Set a new password'];

const PasswordReset = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const response = await requestPasswordReset(email);
      setToken(response.token);
      setMessage('Reset link generated (mock). Use the token below to complete reset.');
      setActiveStep(1);
    } catch (err) {
      setError(err.message || 'Unable to request reset');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await resetPassword(token, password);
      setMessage('Password updated. You can now sign in with your new password.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <Card sx={{ maxWidth: 520, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Reset your password
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            We use mock tokens in development. In production this would send you an email.
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
              {activeStep === 1 && token && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" display="block">
                    Use this mock token:
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {token}
                  </Typography>
                </Box>
              )}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {activeStep === 0 && (
            <>
              <TextField
                fullWidth
                label="Account email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                type="email"
              />
              <Button variant="contained" fullWidth onClick={handleRequest} disabled={loading || !email}>
                {loading ? 'Requesting...' : 'Send reset link'}
              </Button>
            </>
          )}

          {activeStep === 1 && (
            <>
              <TextField
                fullWidth
                label="Reset token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="New password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleReset}
                disabled={loading || !token || !password}
                sx={{ mt: 1 }}
              >
                {loading ? 'Saving...' : 'Update password'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PasswordReset;
