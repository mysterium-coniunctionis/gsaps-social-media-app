import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <Box>
      {/* Hero Section for non-authenticated users */}
      {!currentUser && (
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: 'white',
            mb: 4,
            overflow: 'hidden',
            borderRadius: 2,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            p: { xs: 3, md: 6 },
          }}
        >
          <Box sx={{ maxWidth: 'md' }}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Welcome to GSAPS Social
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Connect with graduate students, trainees, scholars, and professionals engaged in psychedelic research and practice.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/register"
              sx={{ mt: 2 }}
            >
              Join Our Community
            </Button>
          </Box>
        </Paper>
      )}

      {/* Main content */}
      <Grid container spacing={4}>
        {/* Features */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Features
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Connect
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Network with other members in the field of psychedelic studies. Find collaborators, mentors, and peers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Collaborate
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Join groups focused on specific research areas, share resources, and work together on projects.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Learn
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Stay updated on events, conferences, and educational opportunities in the field. Share and access resources.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* About section */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            About GSAPS
          </Typography>
          <Typography variant="body1" paragraph>
            The Graduate Student Association for Psychedelic Studies (GSAPS) is dedicated to supporting collaboration among students, trainees, scholars, and professionals engaged in psychedelic learning, teaching, research, and practice.
          </Typography>
          <Typography variant="body1">
            Our online community provides a space for connection, knowledge sharing, and collaboration in this growing field.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;