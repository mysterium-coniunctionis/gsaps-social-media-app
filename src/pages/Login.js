import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Stack
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Google,
  Apple,
  VerifiedUser
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CenteredAuthLayout } from '../components/common';

/**
 * Login page component
 * Handles user authentication with WordPress/BuddyBoss
 */
const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithProvider, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    otpCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mfaPrompt, setMfaPrompt] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      await login(formData.username, formData.password, formData.otpCode);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Invalid username or password';
      setError(message);
      if (err.requiresMfa) {
        setMfaPrompt(true);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <CenteredAuthLayout>
      <Card sx={{ maxWidth: 450, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your GSAPS account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username or Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              autoComplete="username"
              autoFocus
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              autoComplete="current-password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {mfaPrompt && (
              <TextField
                fullWidth
                label="MFA Code"
                name="otpCode"
                value={formData.otpCode}
                onChange={handleChange}
                margin="normal"
                autoComplete="one-time-code"
                helperText="Enter the 6-digit code or a recovery code"
              />
            )}

            <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
              <Link
                component="button"
                variant="body2"
                sx={{ textDecoration: 'none' }}
                onClick={() => navigate('/reset')}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 2, mb: 2 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Stack direction="column" spacing={1} sx={{ my: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<VerifiedUser />}
                onClick={async () => {
                  setError('');
                  try {
                    await loginWithProvider('orcid');
                    navigate('/');
                  } catch (err) {
                    setError(err.message || 'ORCID login failed');
                  }
                }}
              >
                Continue with ORCID (mock)
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Google />}
                onClick={async () => {
                  setError('');
                  try {
                    await loginWithProvider('google');
                    navigate('/');
                  } catch (err) {
                    setError(err.message || 'Google login failed');
                  }
                }}
              >
                Continue with Google (mock)
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Apple />}
                onClick={async () => {
                  setError('');
                  try {
                    await loginWithProvider('apple');
                    navigate('/');
                  } catch (err) {
                    setError(err.message || 'Apple login failed');
                  }
                }}
              >
                Continue with Apple (mock)
              </Button>
            </Stack>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  sx={{ textDecoration: 'none', fontWeight: 'bold' }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </CenteredAuthLayout>
  );
};

export default Login;
