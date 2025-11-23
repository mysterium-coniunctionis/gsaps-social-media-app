import api from './api';
import { login, register, getCurrentUser as fetchCurrentUser } from './backend';

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
  const response = await api.post('/auth/request-reset', { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post('/auth/refresh');
  return response.data;
};

export const getSessions = async (userId) => {
  const response = await api.get(`/auth/sessions${userId ? `/${userId}` : ''}`);
  return response.data;
};

export const revokeSession = async (sessionId) => {
  const response = await api.delete(`/auth/sessions/${sessionId}`);
  return response.data;
};

export const enableMfa = async () => {
  const response = await api.post('/auth/mfa/enable');
  return response.data;
};

export const disableMfa = async () => {
  const response = await api.post('/auth/mfa/disable');
  return response.data;
};

export const requestEmailVerification = async () => {
  const response = await api.post('/auth/verify-email/request');
  return response.data;
};

export const verifyEmailToken = async (token) => {
  const response = await api.post('/auth/verify-email', { token });
  return response.data;
};
