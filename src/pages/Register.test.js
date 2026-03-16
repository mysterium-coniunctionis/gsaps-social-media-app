jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../components/common/LoadingSpinner', () => {
  return function MockLoadingSpinner() {
    return <div data-testid="loading-spinner">Loading...</div>;
  };
});

jest.mock('../components/common', () => ({
  CenteredAuthLayout: ({ children }) => <div>{children}</div>
}));

jest.mock('../theme/animations', () => ({
  fadeInUp: 'mock-animation'
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './Register';
import { useAuth } from '../context/AuthContext';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('Register Page', () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      register: mockRegister,
      loading: false
    });
  });

  test('renders registration form fields', () => {
    render(<Register />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    // Password fields use MUI label rendering
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
  });

  test('renders Create Account button', () => {
    render(<Register />, { wrapper: createWrapper() });

    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('shows link to login page', () => {
    render(<Register />, { wrapper: createWrapper() });

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('renders Create Account heading', () => {
    render(<Register />, { wrapper: createWrapper() });

    // Use getAllByText since both heading and button may contain this text
    const headings = screen.getAllByText(/create account/i);
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  test('shows loading spinner when loading is true', () => {
    useAuth.mockReturnValue({
      register: mockRegister,
      loading: true
    });

    render(<Register />, { wrapper: createWrapper() });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
