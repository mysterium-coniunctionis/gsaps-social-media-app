import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from './StatCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

const theme = createTheme();

describe('StatCard', () => {
  it('should render with label and value', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatCard
          icon={<PersonIcon />}
          label="Users"
          value={42}
          iconColor="primary"
        />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('should render with string value', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatCard
          icon={<PersonIcon />}
          label="Status"
          value="Active"
          iconColor="green"
        />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
