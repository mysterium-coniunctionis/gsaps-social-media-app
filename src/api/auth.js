import api from './api';

/**
 * Login a user with WordPress/BuddyBoss credentials
 * @param {string} username - User's username or email
 * @param {string} password - User's password
 * @returns {Promise} - User data and token
 */
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/jwt-auth/v1/token', {
      username,
      password
    });

    if (response.data && response.data.token) {
      localStorage.setItem('gsaps_token', response.data.token);
      return response.data.user;
    }
    
    throw new Error('Authentication failed');
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Failed to login. Please check your credentials.');
  }
};

/**
 * Register a new user
 * @param {object} userData - User registration data
 * @returns {Promise} - Created user data
 */
export const registerUser = async (userData) => {
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
  // JWT tokens are stateless, so we just remove from localStorage
  localStorage.removeItem('gsaps_token');
  return { success: true };
};

/**
 * Get the current user data
 * @returns {Promise} - Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/wp/v2/users/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw new Error('Failed to fetch user data');
  }
};
