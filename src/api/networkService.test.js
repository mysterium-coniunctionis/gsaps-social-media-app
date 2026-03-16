jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

import {
  getMatchRecommendations,
  getConnectionRequests,
  sendConnectionRequest,
  acceptConnectionRequest,
  declineConnectionRequest,
  getNetworkAnalytics,
  getSuccessStories
} from './networkService';

describe('networkService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const flushPromises = async () => {
    jest.runAllTimers();
    await Promise.resolve();
  };

  describe('getMatchRecommendations', () => {
    it('returns an array of matches', async () => {
      const promise = getMatchRecommendations({ id: 'user1' }, { limit: 5 });
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
    });

    it('respects the limit filter', async () => {
      const limit = 3;
      const promise = getMatchRecommendations({ id: 'user1' }, { limit });
      await flushPromises();
      const result = await promise;
      expect(result.length).toBeLessThanOrEqual(limit);
    });
  });

  describe('getConnectionRequests', () => {
    it('returns an object with incoming and outgoing arrays', async () => {
      const promise = getConnectionRequests('user1');
      await flushPromises();
      const result = await promise;
      expect(result).toHaveProperty('incoming');
      expect(result).toHaveProperty('outgoing');
      expect(result).toHaveProperty('total');
      expect(Array.isArray(result.incoming)).toBe(true);
      expect(Array.isArray(result.outgoing)).toBe(true);
      expect(typeof result.total).toBe('number');
    });
  });

  describe('sendConnectionRequest', () => {
    it('returns success with created request', async () => {
      const requestData = { fromUserId: 'user1', toUserId: 'user2', message: 'Hello' };
      const promise = sendConnectionRequest(requestData);
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(true);
      expect(result.request).toBeDefined();
      expect(result.request.status).toBe('pending');
      expect(result.message).toBe('Connection request sent successfully');
    });
  });

  describe('acceptConnectionRequest', () => {
    it('returns success with accepted status', async () => {
      const promise = acceptConnectionRequest('req_123', 'Welcome!');
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(true);
      expect(result.status).toBe('accepted');
      expect(result.requestId).toBe('req_123');
    });
  });

  describe('declineConnectionRequest', () => {
    it('returns success with declined status', async () => {
      const promise = declineConnectionRequest('req_456');
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(true);
      expect(result.status).toBe('declined');
      expect(result.requestId).toBe('req_456');
    });
  });

  describe('getNetworkAnalytics', () => {
    it('returns analytics object with userId', async () => {
      const promise = getNetworkAnalytics('user1');
      await flushPromises();
      const result = await promise;
      expect(result).toBeDefined();
      expect(result.userId).toBe('user1');
      expect(result.fetchedAt).toBeDefined();
    });
  });

  describe('getSuccessStories', () => {
    it('returns an array of success stories', async () => {
      const promise = getSuccessStories();
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
