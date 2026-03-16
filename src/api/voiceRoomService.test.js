jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

import {
  getVoiceRooms,
  getVoiceRoom,
  createVoiceRoom,
  joinVoiceRoom,
  leaveVoiceRoom
} from './voiceRoomService';

describe('voiceRoomService', () => {
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

  describe('getVoiceRooms', () => {
    it('returns an array of voice rooms', async () => {
      const promise = getVoiceRooms();
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
    });

    it('returns rooms filtered by category', async () => {
      const promise = getVoiceRooms({ category: 'all' });
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getVoiceRoom', () => {
    it('returns a room object with expected properties', async () => {
      const roomsPromise = getVoiceRooms();
      await flushPromises();
      const rooms = await roomsPromise;

      if (rooms.length > 0) {
        const roomId = rooms[0].id;
        const promise = getVoiceRoom(roomId);
        await flushPromises();
        const result = await promise;
        expect(result).toHaveProperty('id', roomId);
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('speakers');
        expect(result).toHaveProperty('listeners');
      }
    });

    it('throws an error for non-existent room', async () => {
      const promise = getVoiceRoom('nonexistent-room-id');
      await flushPromises();
      await expect(promise).rejects.toThrow('Room not found');
    });
  });

  describe('createVoiceRoom', () => {
    it('creates a room and returns it with an id', async () => {
      const roomData = {
        title: 'Test Room',
        description: 'A test voice room',
        category: 'General',
        startNow: true,
        host: { id: 'user1', username: 'testuser', displayName: 'Test User' },
        tags: ['test']
      };
      const promise = createVoiceRoom(roomData);
      await flushPromises();
      const result = await promise;
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Test Room');
      expect(result.status).toBe('live');
      expect(result.category).toBe('General');
    });

    it('creates a scheduled room when startNow is false', async () => {
      const roomData = {
        title: 'Scheduled Room',
        description: 'A scheduled voice room',
        startNow: false,
        scheduledFor: new Date(Date.now() + 86400000).toISOString(),
        host: { id: 'user1', username: 'testuser', displayName: 'Test User' }
      };
      const promise = createVoiceRoom(roomData);
      await flushPromises();
      const result = await promise;
      expect(result.status).toBe('scheduled');
    });
  });

  describe('joinVoiceRoom', () => {
    it('returns room and user status on successful join', async () => {
      // Use real timers for this test to avoid timing issues with chained async
      jest.useRealTimers();

      const createdRoom = await createVoiceRoom({
        title: 'Join Test Room',
        description: 'Room to test joining',
        startNow: true,
        host: { id: 'host1', username: 'host', displayName: 'Host User' }
      });

      const user = { id: 'joiner1', username: 'joiner', displayName: 'Joiner User' };
      const result = await joinVoiceRoom(createdRoom.id, user);

      expect(result).toHaveProperty('room');
      expect(result).toHaveProperty('userStatus');
      expect(result.userStatus.role).toBe('listener');

      jest.useFakeTimers();
    });

    it('throws error for non-existent room', async () => {
      const promise = joinVoiceRoom('nonexistent', { id: 'user1' });
      await flushPromises();
      await expect(promise).rejects.toThrow('Room not found');
    });
  });

  describe('leaveVoiceRoom', () => {
    it('returns success on leave', async () => {
      const createPromise = createVoiceRoom({
        title: 'Leave Test Room',
        description: 'Room to test leaving',
        startNow: true,
        host: { id: 'host2', username: 'host', displayName: 'Host User' }
      });
      await flushPromises();
      const createdRoom = await createPromise;

      const leavePromise = leaveVoiceRoom(createdRoom.id, 'host2');
      await flushPromises();
      const result = await leavePromise;
      expect(result.success).toBe(true);
    });

    it('throws error for non-existent room', async () => {
      const promise = leaveVoiceRoom('nonexistent', 'user1');
      await flushPromises();
      await expect(promise).rejects.toThrow('Room not found');
    });
  });
});
