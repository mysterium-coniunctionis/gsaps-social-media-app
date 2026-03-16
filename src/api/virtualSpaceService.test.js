jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

import {
  getAllSpaces,
  getSpaceById,
  getSpaceEvents,
  getUpcomingEvents,
  joinSpace
} from './virtualSpaceService';

describe('virtualSpaceService', () => {
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

  describe('getAllSpaces', () => {
    it('returns success with array of spaces', async () => {
      const promise = getAllSpaces();
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('each space has expected properties', async () => {
      const promise = getAllSpaces();
      await flushPromises();
      const result = await promise;
      if (result.data.length > 0) {
        const space = result.data[0];
        expect(space).toHaveProperty('id');
        expect(space).toHaveProperty('name');
      }
    });
  });

  describe('getSpaceById', () => {
    it('returns success with space data for valid id', async () => {
      const allPromise = getAllSpaces();
      await flushPromises();
      const allResult = await allPromise;

      if (allResult.data.length > 0) {
        const spaceId = allResult.data[0].id;
        const promise = getSpaceById(spaceId);
        await flushPromises();
        const result = await promise;
        expect(result.success).toBe(true);
        expect(result.data).toHaveProperty('id', spaceId);
      }
    });

    it('returns failure for non-existent space', async () => {
      const promise = getSpaceById('nonexistent-space');
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(false);
      expect(result.error).toBe('Space not found');
    });
  });

  describe('getSpaceEvents', () => {
    it('returns success with array of events', async () => {
      const promise = getSpaceEvents('space-1');
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('getUpcomingEvents', () => {
    it('returns success with array of upcoming events', async () => {
      const promise = getUpcomingEvents();
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe('joinSpace', () => {
    it('returns success with session data for valid space', async () => {
      const allPromise = getAllSpaces();
      await flushPromises();
      const allResult = await allPromise;

      if (allResult.data.length > 0) {
        const spaceId = allResult.data[0].id;
        const promise = joinSpace(spaceId, 'user1', { name: 'Test User' });
        await flushPromises();
        const result = await promise;
        expect(result.success).toBe(true);
        expect(result.data).toHaveProperty('space');
        expect(result.data).toHaveProperty('userSession');
        expect(result.data).toHaveProperty('activeUsers');
      }
    });

    it('returns failure for non-existent space', async () => {
      const promise = joinSpace('nonexistent', 'user1', { name: 'Test' });
      await flushPromises();
      const result = await promise;
      expect(result.success).toBe(false);
      expect(result.error).toBe('Space not found');
    });
  });
});
