import api from './api';
import {
  mockLogin,
  mockRegister,
  mockGetCurrentUser,
  mockLogout,
  isDevelopmentMode,
  mockRefreshTokens,
  mockRequestPasswordReset,
  mockResetPassword,
  mockRequestEmailVerification,
  mockVerifyEmailToken,
  mockEnableMfa,
  mockDisableMfa,
  mockGetSessions,
  mockRevokeSession,
  mockOauthLogin
} from './mockAuth';

const persistTokens = (tokens) => {
  if (!tokens) return;
  if (tokens.accessToken) {
    localStorage.setItem('gsaps_token', tokens.accessToken);
  }
  if (tokens.refreshToken) {
    localStorage.setItem('gsaps_refresh_token', tokens.refreshToken);
  }
};

/**
 * Login a user with WordPress/BuddyBoss credentials
 * @param {string} username - User's username or email
 * @param {string} password - User's password
 * @param {string} otpCode - Optional MFA code
 * @returns {Promise} - User data and token
 */
export const loginUser = async (username, password, otpCode = '') => {
  // Use mock authentication in development mode
  if (isDevelopmentMode()) {
    const { tokens, user } = await mockLogin(username, password, otpCode);
    persistTokens(tokens);
    return user;
  }

  // Production: Use real WordPress API
  try {
    const response = await api.post('/jwt-auth/v1/token', {
      username,
      password,
      otp: otpCode
    });

    if (response.data && response.data.token) {
      persistTokens({ accessToken: response.data.token });
      return response.data.user;
    }

    throw new Error('Authentication failed');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(
      error.response?.data?.message || 'Failed to login. Please check your credentials.'
    );
  }
};

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @returns {Promise} - Created user data
 */
export const registerUser = async (userData) => {
  // Use mock authentication in development mode
  if (isDevelopmentMode()) {
    const { tokens, user } = await mockRegister(userData);
    persistTokens(tokens);
    return user;
  }

  // Production: Use real WordPress API
  try {
    // First register the user with WordPress
    const response = await api.post('/wp/v2/users/register', userData);

    if (response.data && response.data.id) {
      // If registration successful, login automatically
      return await loginUser(userData.username, userData.password);
    }

    throw new Error('Registration failed');
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Failed to register. Please try again.');
  }
};

/**
 * Logout the current user
 * @returns {Promise} - Success status
 */
export const logoutUser = async () => {
  // Use mock authentication in development mode
  if (isDevelopmentMode()) {
    await mockLogout();
    localStorage.removeItem('gsaps_token');
    localStorage.removeItem('gsaps_refresh_token');
    return { success: true };
  }

  // Production: JWT tokens are stateless, so we just remove from localStorage
  localStorage.removeItem('gsaps_token');
  localStorage.removeItem('gsaps_refresh_token');
  return { success: true };
};

/**
 * Get the current user data
 * @returns {Promise} - Current user data
 */
export const getCurrentUser = async () => {
  // Use mock authentication in development mode
  if (isDevelopmentMode()) {
    const token = localStorage.getItem('gsaps_token');
    return await mockGetCurrentUser(token);
  }

  // Production: Use real WordPress API
  try {
    const response = await api.get('/wp/v2/users/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw new Error('Failed to fetch user data');
  }
};

export const refreshTokens = async () => {
  if (isDevelopmentMode()) {
    const refreshToken = localStorage.getItem('gsaps_refresh_token');
    const tokens = await mockRefreshTokens(refreshToken);
    persistTokens(tokens);
    return tokens;
  }

  throw new Error('Refresh not implemented for production');
};

export const requestPasswordReset = async (email) => {
  if (isDevelopmentMode()) {
    return mockRequestPasswordReset(email);
  }
  return api.post('/password/reset', { email });
};

export const resetPassword = async (token, password) => {
  if (isDevelopmentMode()) {
    return mockResetPassword(token, password);
  }
  return api.post('/password/reset/confirm', { token, password });
};

export const requestEmailVerification = async (userId) => {
  if (isDevelopmentMode()) {
    return mockRequestEmailVerification(userId);
  }
  return api.post('/email/verify', { userId });
};

export const verifyEmailToken = async (token) => {
  if (isDevelopmentMode()) {
    return mockVerifyEmailToken(token);
  }
  return api.post('/email/verify/confirm', { token });
};

export const enableMfa = async (userId) => {
  if (isDevelopmentMode()) {
    return mockEnableMfa(userId);
  }
  return api.post('/mfa/enable', { userId });
};

export const disableMfa = async (userId) => {
  if (isDevelopmentMode()) {
    return mockDisableMfa(userId);
  }
  return api.post('/mfa/disable', { userId });
};

export const getSessions = async (userId) => {
  if (isDevelopmentMode()) {
    return mockGetSessions(userId);
  }
  return api.get(`/sessions?userId=${userId}`);
};

export const revokeSession = async (sessionId, userId) => {
  if (isDevelopmentMode()) {
    return mockRevokeSession(sessionId, userId);
  }
  return api.post('/sessions/revoke', { sessionId, userId });
};

export const oauthLogin = async (provider) => {
  if (isDevelopmentMode()) {
    const { user, tokens } = await mockOauthLogin(provider);
    persistTokens(tokens);
    return user;
  }

  const response = await api.post('/oauth/login', { provider });
  persistTokens({ accessToken: response.data?.token });
  return response.data?.user;
};
