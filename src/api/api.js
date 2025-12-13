import axios from 'axios';

let unauthorizedHandler = null;
let refreshPromise = null;

const TOKEN_KEY = 'gsaps_auth_token';

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

/**
 * @deprecated Authentication now uses httpOnly cookies for security.
 * This function is kept for backward compatibility but will be removed in a future version.
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * @deprecated Authentication now uses httpOnly cookies for security.
 * This function is kept for backward compatibility but will be removed in a future version.
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * @deprecated Authentication now uses httpOnly cookies for security.
 * This function is kept for backward compatibility but will be removed in a future version.
 */
export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const refreshClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor to add Authorization header (deprecated, kept for backward compatibility)
// NOTE: Authentication now primarily uses httpOnly cookies which are sent automatically
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      // Only set Authorization header if there's a token in localStorage
      // This is deprecated and will be removed in a future version
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshClient.post('/auth/refresh').finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

// Response interceptor for handling common errors and silent refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error || {};

    if (response?.status === 401 && !config?.__isRetryRequest) {
      try {
        await refreshAccessToken();
        const retryConfig = { ...config, __isRetryRequest: true };
        return api(retryConfig);
      } catch (refreshError) {
        clearAuthToken();
        unauthorizedHandler?.();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;