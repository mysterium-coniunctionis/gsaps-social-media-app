jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));
jest.mock('../../api/auth', () => ({ loginUser: jest.fn(), registerUser: jest.fn(), logoutUser: jest.fn(), getCurrentUser: jest.fn() }));
jest.mock('../../api/api', () => ({ setUnauthorizedHandler: jest.fn() }));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' })
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn()
}));
jest.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ toggleTheme: jest.fn(), mode: 'light' })
}));
jest.mock('../notifications/NotificationCenter', () => () => <div data-testid="notification-center" />);
jest.mock('../accessibility/AccessibilityMenu', () => () => <div data-testid="accessibility-menu" />);

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './Navbar';
import { useAuth } from '../../context/AuthContext';

const theme = createTheme();

const renderNavbar = () => {
  return render(
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders app title "GSAPS"', () => {
    useAuth.mockReturnValue({ currentUser: null, logout: jest.fn() });
    renderNavbar();

    expect(screen.getByText('GSAPS')).toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    useAuth.mockReturnValue({ currentUser: null, logout: jest.fn() });
    renderNavbar();

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows user avatar/menu when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: {
        id: 'user-1',
        name: 'Test User',
        username: 'testuser',
        avatar_url: '',
        role: 'user'
      },
      logout: jest.fn()
    });
    renderNavbar();

    expect(screen.getByLabelText('Open user menu')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
  });

  it('contains navigation links', () => {
    useAuth.mockReturnValue({ currentUser: null, logout: jest.fn() });
    renderNavbar();

    expect(screen.getByLabelText('Go to Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Circles')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to Library')).toBeInTheDocument();
  });
});
