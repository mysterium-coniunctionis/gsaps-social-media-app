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
  // TODO: Implement password reset request
  // This would typically send a password reset email
  return api.post('/auth/request-reset', { email });
};

export const resetPassword = async (token, newPassword) => {
  // TODO: Implement password reset with token
  return api.post('/auth/reset-password', { token, newPassword });
};

export const refreshAccessToken = async () => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

export const enableMfa = async () => {
  // TODO: Implement MFA enable
  return api.post('/auth/mfa/enable');
};

export const disableMfa = async () => {
  // TODO: Implement MFA disable
  return api.post('/auth/mfa/disable');
};

export const getSessions = async () => {
  // TODO: Implement get active sessions
  return api.get('/auth/sessions');
};

export const revokeSession = async (sessionId) => {
  // TODO: Implement revoke session
  return api.delete(`/auth/sessions/${sessionId}`);
};

export const requestEmailVerification = async () => {
  // TODO: Implement email verification request
  return api.post('/auth/request-verification');
};

export const verifyEmailToken = async (token) => {
  // TODO: Implement email verification with token
  return api.post('/auth/verify-email', { token });
};
