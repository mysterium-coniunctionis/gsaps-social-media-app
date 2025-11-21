import { login, register, getCurrentUser as fetchCurrentUser } from './backend';

export const loginUser = async (username, password) => {
  const { token, user } = await login(username, password);
  localStorage.setItem('gsaps_token', token);
  return user;
};

export const registerUser = async (userData) => {
  const { token, user } = await register(userData);
  localStorage.setItem('gsaps_token', token);
  return user;
};

export const logoutUser = async () => {
  localStorage.removeItem('gsaps_token');
  return { success: true };
};

export const getCurrentUser = async () => {
  return fetchCurrentUser();
};
