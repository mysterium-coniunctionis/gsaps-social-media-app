jest.mock('./api', () => {
  const api = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  };
  api.clearAuthToken = jest.fn();
  api.default = api;
  return {
    __esModule: true,
    default: api,
    clearAuthToken: api.clearAuthToken
  };
});

jest.mock('./backend', () => ({
  login: jest.fn(),
  register: jest.fn(),
  getCurrentUser: jest.fn()
}));

import api, { clearAuthToken } from './api';
import { login, register, getCurrentUser as fetchCurrentUser } from './backend';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  requestPasswordReset,
  resetPassword,
  refreshAccessToken,
  getSessions,
  revokeSession,
  enableMfa,
  disableMfa,
  requestEmailVerification,
  verifyEmailToken
} from './auth';

describe('auth API service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('calls backend login and returns the user', async () => {
      const user = { id: '1', name: 'Alice' };
      login.mockResolvedValue({ user });

      const result = await loginUser('alice', 'password123');

      expect(login).toHaveBeenCalledWith('alice', 'password123');
      expect(result).toEqual(user);
    });

    it('propagates errors from backend login', async () => {
      login.mockRejectedValue(new Error('Invalid credentials'));

      await expect(loginUser('alice', 'wrong')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('registerUser', () => {
    it('calls backend register and returns the user', async () => {
      const user = { id: '2', name: 'Bob' };
      const userData = { username: 'bob', email: 'bob@test.com', password: 'pass' };
      register.mockResolvedValue({ user });

      const result = await registerUser(userData);

      expect(register).toHaveBeenCalledWith(userData);
      expect(result).toEqual(user);
    });

    it('propagates errors from backend register', async () => {
      register.mockRejectedValue(new Error('Username taken'));

      await expect(registerUser({ username: 'taken' })).rejects.toThrow('Username taken');
    });
  });

  describe('logoutUser', () => {
    it('calls api.post and clearAuthToken, returns {success: true}', async () => {
      api.post.mockResolvedValue({});

      const result = await logoutUser();

      expect(api.post).toHaveBeenCalledWith('/auth/logout');
      expect(clearAuthToken).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it('swallows errors from api.post and still clears token', async () => {
      api.post.mockRejectedValue(new Error('Network error'));

      const result = await logoutUser();

      expect(clearAuthToken).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });
  });

  describe('getCurrentUser', () => {
    it('calls backend fetchCurrentUser and returns the result', async () => {
      const user = { id: '1', name: 'Alice' };
      fetchCurrentUser.mockResolvedValue(user);

      const result = await getCurrentUser();

      expect(fetchCurrentUser).toHaveBeenCalled();
      expect(result).toEqual(user);
    });
  });

  describe('requestPasswordReset', () => {
    it('calls api.post with the email and returns response data', async () => {
      api.post.mockResolvedValue({ data: { message: 'Email sent' } });

      const result = await requestPasswordReset('alice@test.com');

      expect(api.post).toHaveBeenCalledWith('/auth/request-reset', { email: 'alice@test.com' });
      expect(result).toEqual({ message: 'Email sent' });
    });
  });

  describe('resetPassword', () => {
    it('calls api.post with token and newPassword, returns response data', async () => {
      api.post.mockResolvedValue({ data: { message: 'Password reset' } });

      const result = await resetPassword('tok123', 'newPass');

      expect(api.post).toHaveBeenCalledWith('/auth/reset-password', { token: 'tok123', newPassword: 'newPass' });
      expect(result).toEqual({ message: 'Password reset' });
    });
  });

  describe('refreshAccessToken', () => {
    it('calls api.post and returns response data', async () => {
      api.post.mockResolvedValue({ data: { accessToken: 'new-token' } });

      const result = await refreshAccessToken();

      expect(api.post).toHaveBeenCalledWith('/auth/refresh');
      expect(result).toEqual({ accessToken: 'new-token' });
    });
  });

  describe('getSessions', () => {
    it('calls api.get without userId', async () => {
      api.get.mockResolvedValue({ data: [{ id: 's1' }] });

      const result = await getSessions();

      expect(api.get).toHaveBeenCalledWith('/auth/sessions');
      expect(result).toEqual([{ id: 's1' }]);
    });

    it('calls api.get with userId', async () => {
      api.get.mockResolvedValue({ data: [{ id: 's2' }] });

      const result = await getSessions('user-42');

      expect(api.get).toHaveBeenCalledWith('/auth/sessions/user-42');
      expect(result).toEqual([{ id: 's2' }]);
    });
  });

  describe('revokeSession', () => {
    it('calls api.delete with sessionId and returns response data', async () => {
      api.delete.mockResolvedValue({ data: { revoked: true } });

      const result = await revokeSession('sess-1');

      expect(api.delete).toHaveBeenCalledWith('/auth/sessions/sess-1');
      expect(result).toEqual({ revoked: true });
    });
  });

  describe('enableMfa', () => {
    it('calls api.post and returns response data', async () => {
      api.post.mockResolvedValue({ data: { qrCode: 'data:image/png;...' } });

      const result = await enableMfa();

      expect(api.post).toHaveBeenCalledWith('/auth/mfa/enable');
      expect(result).toEqual({ qrCode: 'data:image/png;...' });
    });
  });

  describe('disableMfa', () => {
    it('calls api.post and returns response data', async () => {
      api.post.mockResolvedValue({ data: { disabled: true } });

      const result = await disableMfa();

      expect(api.post).toHaveBeenCalledWith('/auth/mfa/disable');
      expect(result).toEqual({ disabled: true });
    });
  });

  describe('requestEmailVerification', () => {
    it('calls api.post and returns response data', async () => {
      api.post.mockResolvedValue({ data: { sent: true } });

      const result = await requestEmailVerification();

      expect(api.post).toHaveBeenCalledWith('/auth/verify-email/request');
      expect(result).toEqual({ sent: true });
    });
  });

  describe('verifyEmailToken', () => {
    it('calls api.post with token and returns response data', async () => {
      api.post.mockResolvedValue({ data: { verified: true } });

      const result = await verifyEmailToken('verify-tok');

      expect(api.post).toHaveBeenCalledWith('/auth/verify-email', { token: 'verify-tok' });
      expect(result).toEqual({ verified: true });
    });
  });
});
