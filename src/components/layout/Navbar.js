import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="fixed">
    <Toolbar>
      <Typography
        variant="h6"
        component={RouterLink}
        to="/"
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        GSAPS Social
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;

