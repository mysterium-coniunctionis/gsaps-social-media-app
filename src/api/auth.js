import api from './api';
import { login, register, getCurrentUser as fetchCurrentUser } from './backend';

const MOCK_SESSIONS = [
  {
    id: 'sess-current',
    device: 'Chrome on macOS',
    location: 'San Francisco, US',
    lastActive: new Date().toISOString(),
    current: true
  },
  {
    id: 'sess-remote',
    device: 'Firefox on Linux',
    location: 'Toronto, CA',
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    current: false
  }
];

export const loginUser = async (username, password) => {
  const { user } = await login(username, password);
  return user;
};

export const registerUser = async (userData) => {
  const { user } = await register(userData);
  return user;
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    // Best-effort logout; ignore errors to allow UI state to clear
  }
  return { success: true };
};

export const getCurrentUser = async () => {
  return fetchCurrentUser();
};

export const requestPasswordReset = async (email) => {
  return {
    success: true,
    email,
    token: 'mock-reset-token'
  };
};

export const resetPassword = async () => {
  return { success: true };
};

export const getSessions = async () => {
  return MOCK_SESSIONS;
};

export const enableMfa = async () => {
  return {
    recoveryCodes: ['4YK7J', '9PA2L', 'C7M3B', 'D2Q9Z', 'J5X1T']
  };
};

export const disableMfa = async () => {
  return { success: true };
};

export const revokeSession = async () => {
  return { success: true };
};

export const requestEmailVerification = async () => {
  return {
    token: 'mock-verification-token'
  };
};

export const verifyEmailToken = async () => {
  return { success: true };
};
