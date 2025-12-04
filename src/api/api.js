import axios from 'axios';

let unauthorizedHandler = null;
let refreshPromise = null;

const TOKEN_KEY = 'gsaps_auth_token';

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

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

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
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