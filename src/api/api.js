import axios from 'axios';

let unauthorizedHandler = null;
let refreshPromise = null;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
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
        unauthorizedHandler?.();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;