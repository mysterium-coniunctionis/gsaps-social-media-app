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
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Login';
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

describe('Login Page', () => {
  const mockLogin = jest.fn();
  const mockLoginWithProvider = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      login: mockLogin,
      loginWithProvider: mockLoginWithProvider,
      loading: false
    });
  });

  test('renders username and password fields', () => {
    render(<Login />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/username or email/i)).toBeInTheDocument();
    // MUI Password fields use label text directly
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  test('renders Sign In button', () => {
    render(<Login />, { wrapper: createWrapper() });

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows link to register page', () => {
    render(<Login />, { wrapper: createWrapper() });

    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('shows forgot password link', () => {
    render(<Login />, { wrapper: createWrapper() });

    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  test('Login button triggers auth login', async () => {
    mockLogin.mockResolvedValue({});
    render(<Login />, { wrapper: createWrapper() });

    const usernameInput = screen.getByLabelText(/username or email/i);
    const passwordInputs = document.querySelectorAll('input[name="password"]');

    fireEvent.change(usernameInput, { target: { name: 'username', value: 'testuser' } });
    if (passwordInputs.length > 0) {
      fireEvent.change(passwordInputs[0], { target: { name: 'password', value: 'password123' } });
    }

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  test('renders Welcome Back heading', () => {
    render(<Login />, { wrapper: createWrapper() });

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  test('shows loading spinner when loading is true', () => {
    useAuth.mockReturnValue({
      login: mockLogin,
      loginWithProvider: mockLoginWithProvider,
      loading: true
    });

    render(<Login />, { wrapper: createWrapper() });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
