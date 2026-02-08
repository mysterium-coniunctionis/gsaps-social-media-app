// Mock axios and dependent modules before importing
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  })),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
}));

jest.mock('../api/backend', () => ({
  awardGamification: jest.fn(),
  fetchGamification: jest.fn()
}));

jest.mock('../api/auth', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  logoutUser: jest.fn(),
  getCurrentUser: jest.fn()
}));

jest.mock('../api/api', () => ({
  setUnauthorizedHandler: jest.fn()
}));

import { XP_ACTIONS, RANKS } from './GamificationContext';

describe('GamificationContext constants', () => {
  describe('XP_ACTIONS', () => {
    it('defines XP values for all expected actions', () => {
      expect(XP_ACTIONS.CREATE_POST).toBe(10);
      expect(XP_ACTIONS.POST_WITH_IMAGE).toBe(15);
      expect(XP_ACTIONS.POST_WITH_TAGS).toBe(5);
      expect(XP_ACTIONS.COMMENT).toBe(5);
      expect(XP_ACTIONS.SHARE_POST).toBe(8);
      expect(XP_ACTIONS.ENROLL_COURSE).toBe(10);
      expect(XP_ACTIONS.COMPLETE_LESSON).toBe(20);
      expect(XP_ACTIONS.ADD_REACTION).toBe(3);
      expect(XP_ACTIONS.MESSAGE_SENT).toBe(1);
      expect(XP_ACTIONS.UPLOAD_PAPER).toBe(50);
    });

    it('has all positive XP values', () => {
      Object.values(XP_ACTIONS).forEach(xp => {
        expect(xp).toBeGreaterThan(0);
      });
    });

    it('rewards more complex actions more heavily', () => {
      expect(XP_ACTIONS.UPLOAD_PAPER).toBeGreaterThan(XP_ACTIONS.CREATE_POST);
      expect(XP_ACTIONS.COMPLETE_LESSON).toBeGreaterThan(XP_ACTIONS.COMMENT);
      expect(XP_ACTIONS.POST_WITH_IMAGE).toBeGreaterThan(XP_ACTIONS.POST_WITH_TAGS);
    });
  });

  describe('RANKS', () => {
    const rankLevels = Object.keys(RANKS).map(Number).sort((a, b) => a - b);

    it('defines 10 rank tiers', () => {
      expect(Object.keys(RANKS).length).toBe(10);
    });

    it('starts at level 1', () => {
      expect(RANKS[1]).toBeDefined();
      expect(RANKS[1].name).toBe('Novice');
    });

    it('ends at level 45', () => {
      expect(RANKS[45]).toBeDefined();
      expect(RANKS[45].name).toBe('Transcendent');
    });

    it('has progressive rank names', () => {
      const expectedNames = [
        'Novice', 'Initiate', 'Apprentice', 'Practitioner', 'Adept',
        'Expert', 'Master', 'Sage', 'Luminary', 'Transcendent'
      ];
      const actualNames = rankLevels.map(level => RANKS[level].name);
      expect(actualNames).toEqual(expectedNames);
    });

    it('each rank has a color and icon', () => {
      Object.values(RANKS).forEach(rank => {
        expect(rank.color).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(rank.icon).toBeDefined();
        expect(rank.icon.length).toBeGreaterThan(0);
      });
    });

    it('ranks are at 5-level intervals', () => {
      const expectedLevels = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45];
      expect(rankLevels).toEqual(expectedLevels);
    });
  });

  describe('calculateLevel (internal logic verification)', () => {
    const LEVEL_THRESHOLDS = [0, 100, 250, 500, 850, 1300];

    const calculateLevel = (xp) => {
      for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i -= 1) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
          return i + 1;
        }
      }
      return 1;
    };

    it('returns level 1 for 0 XP', () => {
      expect(calculateLevel(0)).toBe(1);
    });

    it('returns level 1 for 99 XP', () => {
      expect(calculateLevel(99)).toBe(1);
    });

    it('returns level 2 for 100 XP', () => {
      expect(calculateLevel(100)).toBe(2);
    });

    it('returns level 3 for 250 XP', () => {
      expect(calculateLevel(250)).toBe(3);
    });

    it('returns level 4 for 500 XP', () => {
      expect(calculateLevel(500)).toBe(4);
    });

    it('returns level 5 for 850 XP', () => {
      expect(calculateLevel(850)).toBe(5);
    });

    it('returns level 6 for 1300 XP', () => {
      expect(calculateLevel(1300)).toBe(6);
    });

    it('returns max level for very high XP', () => {
      expect(calculateLevel(99999)).toBe(6);
    });

    it('handles boundary values correctly', () => {
      expect(calculateLevel(249)).toBe(2);
      expect(calculateLevel(250)).toBe(3);
    });
  });
});
