jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../theme/animations', () => ({
  fadeInUp: 'mock-animation'
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './Home';
import { useAuth } from '../context/AuthContext';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const theme = createTheme();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      currentUser: null
    });
  });

  test('renders the hero title', () => {
    render(<Home />, { wrapper: createWrapper() });

    expect(
      screen.getByText(/the gold standard in psychedelic education/i)
    ).toBeInTheDocument();
  });

  test('renders hero subtitle', () => {
    render(<Home />, { wrapper: createWrapper() });

    const elements = screen.getAllByText(/join 2,500\+ professionals/i);
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  test('renders platform stats', () => {
    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('2,500+')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('1,200+')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
  });

  test('renders feature sections', () => {
    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('Comprehensive Platform Features')).toBeInTheDocument();
    expect(screen.getByText('Graduate-Level Courses')).toBeInTheDocument();
    expect(screen.getByText('Research Library')).toBeInTheDocument();
    expect(screen.getByText(/gamification & leaderboards/i)).toBeInTheDocument();
    expect(screen.getByText('Events & Networking')).toBeInTheDocument();
    expect(screen.getByText('Professional Community')).toBeInTheDocument();
    expect(screen.getByText('Integration Circles')).toBeInTheDocument();
  });

  test('contains links to join/register when not logged in', () => {
    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText(/join free today/i)).toBeInTheDocument();
    expect(screen.getByText(/create free account/i)).toBeInTheDocument();
    expect(screen.getByText(/browse courses/i)).toBeInTheDocument();
  });

  test('shows dashboard link when user is logged in', () => {
    useAuth.mockReturnValue({
      currentUser: { id: 'user-1', username: 'testuser' }
    });

    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText(/go to dashboard/i)).toBeInTheDocument();
    expect(screen.queryByText(/join free today/i)).not.toBeInTheDocument();
  });

  test('renders featured courses section', () => {
    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('Featured Courses')).toBeInTheDocument();
    expect(screen.getByText('Psychedelic-Assisted Therapy')).toBeInTheDocument();
    expect(screen.getByText('MDMA-Assisted Therapy for PTSD')).toBeInTheDocument();
    expect(screen.getByText('Neuroscience of Psychedelics')).toBeInTheDocument();
  });

  test('renders About GSAPS section', () => {
    render(<Home />, { wrapper: createWrapper() });

    expect(screen.getByText('About GSAPS')).toBeInTheDocument();
  });
});
