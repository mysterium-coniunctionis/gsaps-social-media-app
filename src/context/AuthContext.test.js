jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }))
}));

jest.mock('../api/auth', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  logoutUser: jest.fn(),
  getCurrentUser: jest.fn()
}));

jest.mock('../api/api', () => ({
  setUnauthorizedHandler: jest.fn()
}));

import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './AuthContext';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../api/auth';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
}

function TestComponent() {
  const { currentUser, loading, error, login, logout } = useAuth();

  return (
    <div>
      {loading && <span data-testid="loading">Loading</span>}
      {error && <span data-testid="error">{error.message}</span>}
      {currentUser && <span data-testid="user">{currentUser.name}</span>}
      {!loading && !currentUser && !error && <span data-testid="no-user">No user</span>}
      <button data-testid="login-btn" onClick={() => login('alice', 'pass')}>Login</button>
      <button data-testid="logout-btn" onClick={() => logout()}>Logout</button>
    </div>
  );
}

function renderWithProviders(ui) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading initially, then displays the current user', async () => {
    const user = { id: '1', name: 'Alice' };
    getCurrentUser.mockResolvedValue(user);

    renderWithProviders(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Alice');
    });
  });

  it('login calls loginUser and updates the current user', async () => {
    const user = { id: '1', name: 'Alice' };
    // Initially no user; after login the refetch should also return the user
    getCurrentUser.mockResolvedValueOnce(null);
    loginUser.mockResolvedValue(user);
    getCurrentUser.mockResolvedValue(user);

    renderWithProviders(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    await act(async () => {
      screen.getByTestId('login-btn').click();
    });

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('alice', 'pass');
      expect(screen.getByTestId('user')).toHaveTextContent('Alice');
    });
  });

  it('logout calls logoutUser and clears the user', async () => {
    const user = { id: '1', name: 'Alice' };
    getCurrentUser.mockResolvedValue(user);
    logoutUser.mockResolvedValue({ success: true });

    renderWithProviders(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Alice');
    });

    await act(async () => {
      screen.getByTestId('logout-btn').click();
    });

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
      expect(screen.queryByTestId('user')).not.toBeInTheDocument();
    });
  });

  it('shows error state when getCurrentUser fails', async () => {
    getCurrentUser.mockRejectedValue(new Error('Unauthorized'));

    renderWithProviders(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Unauthorized');
    });
  });
});
