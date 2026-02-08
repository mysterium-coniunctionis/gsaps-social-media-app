// Mock axios before any imports that depend on it
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
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

import { XP_ACTIONS, RANKS } from './GamificationContext';

// Test the exported constants and pure logic
// The provider itself requires AuthContext and react-query which makes unit testing complex.
// These tests validate the gamification data model.

describe('GamificationContext', () => {
  describe('XP_ACTIONS', () => {
    it('should define social action XP values', () => {
      expect(XP_ACTIONS.CREATE_POST).toBe(10);
      expect(XP_ACTIONS.POST_WITH_IMAGE).toBe(15);
      expect(XP_ACTIONS.POST_WITH_TAGS).toBe(5);
      expect(XP_ACTIONS.COMMENT).toBe(5);
      expect(XP_ACTIONS.SHARE_POST).toBe(8);
      expect(XP_ACTIONS.ADD_REACTION).toBe(3);
      expect(XP_ACTIONS.MESSAGE_SENT).toBe(1);
    });

    it('should define course action XP values', () => {
      expect(XP_ACTIONS.ENROLL_COURSE).toBe(10);
      expect(XP_ACTIONS.COMPLETE_LESSON).toBe(20);
    });

    it('should define research library XP values', () => {
      expect(XP_ACTIONS.UPLOAD_PAPER).toBe(50);
      expect(XP_ACTIONS.PAPER_APPROVED).toBe(25);
      expect(XP_ACTIONS.WRITE_REVIEW).toBe(20);
      expect(XP_ACTIONS.CREATE_COLLECTION).toBe(15);
      expect(XP_ACTIONS.SHARE_COLLECTION).toBe(10);
      expect(XP_ACTIONS.DISCUSSION_POST).toBe(10);
      expect(XP_ACTIONS.DISCUSSION_REPLY).toBe(5);
      expect(XP_ACTIONS.LIKE_COMMENT).toBe(2);
      expect(XP_ACTIONS.SAVE_TO_COLLECTION).toBe(5);
    });

    it('should have all positive XP values', () => {
      Object.values(XP_ACTIONS).forEach(xp => {
        expect(xp).toBeGreaterThan(0);
      });
    });

    it('should have higher-value actions for harder tasks', () => {
      expect(XP_ACTIONS.UPLOAD_PAPER).toBeGreaterThan(XP_ACTIONS.CREATE_POST);
      expect(XP_ACTIONS.COMPLETE_LESSON).toBeGreaterThan(XP_ACTIONS.COMMENT);
      expect(XP_ACTIONS.WRITE_REVIEW).toBeGreaterThan(XP_ACTIONS.ADD_REACTION);
    });
  });

  describe('RANKS', () => {
    it('should define ranks at correct level thresholds', () => {
      expect(RANKS[1]).toBeDefined();
      expect(RANKS[1].name).toBe('Novice');

      expect(RANKS[5]).toBeDefined();
      expect(RANKS[5].name).toBe('Initiate');

      expect(RANKS[10]).toBeDefined();
      expect(RANKS[10].name).toBe('Apprentice');

      expect(RANKS[45]).toBeDefined();
      expect(RANKS[45].name).toBe('Transcendent');
    });

    it('should have name, color, and icon for each rank', () => {
      Object.values(RANKS).forEach(rank => {
        expect(rank.name).toBeDefined();
        expect(rank.name.length).toBeGreaterThan(0);
        expect(rank.color).toBeDefined();
        expect(rank.color).toMatch(/^#[0-9a-f]{6}$/i);
        expect(rank.icon).toBeDefined();
      });
    });

    it('should have 10 ranks total', () => {
      expect(Object.keys(RANKS).length).toBe(10);
    });

    it('should have ranks in ascending level order', () => {
      const levels = Object.keys(RANKS).map(Number);
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).toBeGreaterThan(levels[i - 1]);
      }
    });

    it('should have unique rank names', () => {
      const names = Object.values(RANKS).map(r => r.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });
});
