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
