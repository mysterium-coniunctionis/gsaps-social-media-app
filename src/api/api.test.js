// Mock axios before importing api.js
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }
}));

import { setAuthToken, getAuthToken, clearAuthToken, setUnauthorizedHandler } from './api';

describe('api utilities', () => {
  const TOKEN_KEY = 'gsaps_auth_token';

  beforeEach(() => {
    localStorage.clear();
  });

  describe('setAuthToken', () => {
    it('should store a token in localStorage', () => {
      setAuthToken('test-token-123');
      expect(localStorage.getItem(TOKEN_KEY)).toBe('test-token-123');
    });

    it('should remove token from localStorage when called with falsy value', () => {
      localStorage.setItem(TOKEN_KEY, 'existing-token');
      setAuthToken(null);
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });

    it('should remove token when called with empty string', () => {
      localStorage.setItem(TOKEN_KEY, 'existing-token');
      setAuthToken('');
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });
  });

  describe('getAuthToken', () => {
    it('should return null when no token is stored', () => {
      expect(getAuthToken()).toBeNull();
    });

    it('should return the stored token', () => {
      localStorage.setItem(TOKEN_KEY, 'my-secret-token');
      expect(getAuthToken()).toBe('my-secret-token');
    });
  });

  describe('clearAuthToken', () => {
    it('should remove the token from localStorage', () => {
      localStorage.setItem(TOKEN_KEY, 'token-to-clear');
      clearAuthToken();
      expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    });

    it('should not throw when no token exists', () => {
      expect(() => clearAuthToken()).not.toThrow();
    });
  });

  describe('setUnauthorizedHandler', () => {
    it('should accept a function without throwing', () => {
      expect(() => setUnauthorizedHandler(() => {})).not.toThrow();
    });

    it('should accept null without throwing', () => {
      expect(() => setUnauthorizedHandler(null)).not.toThrow();
    });
  });
});
