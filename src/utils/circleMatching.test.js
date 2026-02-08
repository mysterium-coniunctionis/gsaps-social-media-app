import {
  calculateMatchScore,
  matchUserToCircles,
  getMatchReasons,
  getQuickRecommendations,
  DEFAULT_PREFERENCES,
  PREFERENCE_OPTIONS
} from './circleMatching';

describe('circleMatching', () => {
  const createCircle = (overrides = {}) => ({
    id: 'circle-1',
    name: 'Psilocybin Integration Circle',
    status: 'active',
    experienceTypes: ['psilocybin', 'general'],
    location: { type: 'virtual', city: null, state: null },
    meetingSchedule: { dayOfWeek: 'Wednesday', time: '18:00' },
    values: ['trauma-informed', 'confidential'],
    members: ['m1', 'm2', 'm3', 'm4', 'm5'],
    capacity: 12,
    category: 'psychedelic-integration',
    ...overrides
  });

  const createPreferences = (overrides = {}) => ({
    ...DEFAULT_PREFERENCES,
    experienceType: 'psilocybin',
    locationType: 'virtual',
    preferredDays: ['Wednesday'],
    values: ['trauma-informed'],
    ...overrides
  });

  describe('calculateMatchScore', () => {
    it('should return a score between 0 and 1', () => {
      const prefs = createPreferences();
      const circle = createCircle();
      const score = calculateMatchScore(prefs, circle);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1);
    });

    it('should give full experience type score for exact match', () => {
      const prefs = createPreferences({ experienceType: 'psilocybin' });
      const circle = createCircle({ experienceTypes: ['psilocybin'] });
      const score = calculateMatchScore(prefs, circle);
      // Experience match = 0.3 contribution
      expect(score).toBeGreaterThanOrEqual(0.3);
    });

    it('should give partial experience score for general circle', () => {
      const prefs = createPreferences({ experienceType: 'MDMA' });
      const circleGeneral = createCircle({ experienceTypes: ['general'] });
      const circleExact = createCircle({ experienceTypes: ['MDMA'] });

      const generalScore = calculateMatchScore(prefs, circleGeneral);
      const exactScore = calculateMatchScore(prefs, circleExact);
      expect(exactScore).toBeGreaterThan(generalScore);
    });

    it('should give full location score for virtual preference with virtual circle', () => {
      const prefs = createPreferences({ locationType: 'virtual' });
      const circle = createCircle({ location: { type: 'virtual' } });
      const score = calculateMatchScore(prefs, circle);
      expect(score).toBeGreaterThan(0.5);
    });

    it('should give full location score for in-person match with same city', () => {
      const prefs = createPreferences({ locationType: 'in-person', city: 'Denver', state: 'CO' });
      const circle = createCircle({ location: { type: 'in-person', city: 'Denver', state: 'CO' } });
      const score = calculateMatchScore(prefs, circle);
      expect(score).toBeGreaterThan(0.4);
    });

    it('should give partial location score for same state but different city', () => {
      const prefs = createPreferences({ locationType: 'in-person', city: 'Denver', state: 'CO' });
      const sameState = createCircle({ location: { type: 'in-person', city: 'Boulder', state: 'CO' } });
      const sameCity = createCircle({ location: { type: 'in-person', city: 'Denver', state: 'CO' } });

      const sameStateScore = calculateMatchScore(prefs, sameState);
      const sameCityScore = calculateMatchScore(prefs, sameCity);
      expect(sameCityScore).toBeGreaterThan(sameStateScore);
    });

    it('should give full schedule score for preferred day match', () => {
      const prefs = createPreferences({ preferredDays: ['Wednesday'] });
      const matchCircle = createCircle({ meetingSchedule: { dayOfWeek: 'Wednesday', time: '18:00' } });
      const noMatchCircle = createCircle({ meetingSchedule: { dayOfWeek: 'Monday', time: '18:00' } });

      const matchScore = calculateMatchScore(prefs, matchCircle);
      const noMatchScore = calculateMatchScore(prefs, noMatchCircle);
      expect(matchScore).toBeGreaterThan(noMatchScore);
    });

    it('should give partial schedule score for adjacent day', () => {
      const prefs = createPreferences({ preferredDays: ['Wednesday'] });
      const adjacent = createCircle({ meetingSchedule: { dayOfWeek: 'Thursday', time: '18:00' } });
      const far = createCircle({ meetingSchedule: { dayOfWeek: 'Sunday', time: '18:00' } });

      const adjacentScore = calculateMatchScore(prefs, adjacent);
      const farScore = calculateMatchScore(prefs, far);
      expect(adjacentScore).toBeGreaterThanOrEqual(farScore);
    });

    it('should score values alignment based on overlap ratio', () => {
      const prefs = createPreferences({ values: ['trauma-informed', 'confidential'] });
      const highOverlap = createCircle({ values: ['trauma-informed', 'confidential', 'peer-led'] });
      const noOverlap = createCircle({ values: ['scientific', 'secular'] });

      const highScore = calculateMatchScore(prefs, highOverlap);
      const lowScore = calculateMatchScore(prefs, noOverlap);
      expect(highScore).toBeGreaterThan(lowScore);
    });

    it('should give capacity bonus for circles with available spots', () => {
      const prefs = createPreferences();
      const hasSpace = createCircle({ members: ['m1', 'm2'], capacity: 12 });
      const full = createCircle({ members: new Array(12).fill('m'), capacity: 12 });

      const spaceScore = calculateMatchScore(prefs, hasSpace);
      const fullScore = calculateMatchScore(prefs, full);
      expect(spaceScore).toBeGreaterThan(fullScore);
    });

    it('should give bonus for circle purpose match', () => {
      const prefs = createPreferences({ circlePurpose: 'integration' });
      const matchCircle = createCircle({ category: 'psychedelic-integration' });
      const noMatch = createCircle({ category: 'professional-development' });

      const matchScore = calculateMatchScore(prefs, matchCircle);
      const noMatchScore = calculateMatchScore(prefs, noMatch);
      expect(matchScore).toBeGreaterThan(noMatchScore);
    });

    it('should handle empty preferences gracefully', () => {
      const prefs = {};
      const circle = createCircle();
      const score = calculateMatchScore(prefs, circle);
      expect(score).toBeGreaterThanOrEqual(0);
    });
  });

  describe('matchUserToCircles', () => {
    const circles = [
      createCircle({ id: 'c1', status: 'active', experienceTypes: ['psilocybin'] }),
      createCircle({ id: 'c2', status: 'active', experienceTypes: ['MDMA'] }),
      createCircle({ id: 'c3', status: 'inactive', experienceTypes: ['psilocybin'] }),
      createCircle({ id: 'c4', status: 'active', experienceTypes: ['general'] })
    ];

    it('should return matches sorted by score', () => {
      const prefs = createPreferences();
      const matches = matchUserToCircles(prefs, circles);

      for (let i = 1; i < matches.length; i++) {
        expect(matches[i - 1].score).toBeGreaterThanOrEqual(matches[i].score);
      }
    });

    it('should only return active circles', () => {
      const prefs = createPreferences();
      const matches = matchUserToCircles(prefs, circles);
      matches.forEach(m => {
        expect(m.circle.status).toBe('active');
      });
    });

    it('should respect minScore option', () => {
      const prefs = createPreferences();
      const matches = matchUserToCircles(prefs, circles, { minScore: 0.5 });
      matches.forEach(m => {
        expect(m.score).toBeGreaterThanOrEqual(0.5);
      });
    });

    it('should respect maxResults option', () => {
      const prefs = createPreferences();
      const matches = matchUserToCircles(prefs, circles, { maxResults: 1 });
      expect(matches.length).toBeLessThanOrEqual(1);
    });

    it('should return empty for no circles', () => {
      expect(matchUserToCircles(createPreferences(), [])).toEqual([]);
      expect(matchUserToCircles(createPreferences(), null)).toEqual([]);
    });

    it('should return popular circles when no preferences are set', () => {
      const matches = matchUserToCircles({}, circles);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].matchReasons[0]).toContain('No preferences');
    });

    it('should include match reasons', () => {
      const prefs = createPreferences();
      const matches = matchUserToCircles(prefs, circles);
      matches.forEach(m => {
        expect(Array.isArray(m.matchReasons)).toBe(true);
        expect(m.matchReasons.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getMatchReasons', () => {
    it('should include experience type reason for match', () => {
      const prefs = createPreferences({ experienceType: 'psilocybin' });
      const circle = createCircle({ experienceTypes: ['psilocybin'] });
      const reasons = getMatchReasons(prefs, circle);
      expect(reasons.some(r => r.includes('psilocybin'))).toBe(true);
    });

    it('should include virtual meetings reason', () => {
      const prefs = createPreferences({ locationType: 'virtual' });
      const circle = createCircle({ location: { type: 'virtual' } });
      const reasons = getMatchReasons(prefs, circle);
      expect(reasons.some(r => r.includes('Virtual'))).toBe(true);
    });

    it('should include schedule match reason', () => {
      const prefs = createPreferences({ preferredDays: ['Wednesday'] });
      const circle = createCircle({ meetingSchedule: { dayOfWeek: 'Wednesday' } });
      const reasons = getMatchReasons(prefs, circle);
      expect(reasons.some(r => r.includes('Wednesday'))).toBe(true);
    });

    it('should include availability info', () => {
      const prefs = createPreferences();
      const circle = createCircle({ members: ['m1', 'm2'], capacity: 12 });
      const reasons = getMatchReasons(prefs, circle);
      expect(reasons.some(r => r.includes('available') || r.includes('spots'))).toBe(true);
    });

    it('should return default reason when nothing matches', () => {
      const prefs = { experienceType: 'unknown' };
      const circle = createCircle({ experienceTypes: ['other'], location: { type: 'in-person' }, values: [] });
      const reasons = getMatchReasons(prefs, circle);
      expect(reasons.length).toBeGreaterThan(0);
    });
  });

  describe('getQuickRecommendations', () => {
    const circles = [
      createCircle({ id: 'c1', status: 'active' }),
      createCircle({ id: 'c2', status: 'active' }),
      createCircle({ id: 'c3', status: 'active' })
    ];

    it('should return up to 3 recommendations', () => {
      const user = { interests: 'psilocybin research' };
      const result = getQuickRecommendations(user, circles);
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should exclude circles user is already in', () => {
      const user = { interests: 'psilocybin' };
      const userCircles = [{ id: 'c1' }];
      const result = getQuickRecommendations(user, circles, userCircles);
      const ids = result.map(r => r.circle.id);
      expect(ids).not.toContain('c1');
    });

    it('should infer experience type from interests', () => {
      const user = { interests: 'I am studying psilocybin therapy' };
      const result = getQuickRecommendations(user, circles);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('constants', () => {
    it('should have valid DEFAULT_PREFERENCES', () => {
      expect(DEFAULT_PREFERENCES).toHaveProperty('experienceType');
      expect(DEFAULT_PREFERENCES).toHaveProperty('locationType');
      expect(DEFAULT_PREFERENCES).toHaveProperty('preferredDays');
      expect(DEFAULT_PREFERENCES).toHaveProperty('values');
      expect(DEFAULT_PREFERENCES.locationType).toBe('either');
    });

    it('should have valid PREFERENCE_OPTIONS', () => {
      expect(PREFERENCE_OPTIONS.experienceTypes.length).toBeGreaterThan(0);
      expect(PREFERENCE_OPTIONS.circlePurposes.length).toBeGreaterThan(0);
      expect(PREFERENCE_OPTIONS.locationTypes.length).toBeGreaterThan(0);
      expect(PREFERENCE_OPTIONS.days.length).toBe(7);
      expect(PREFERENCE_OPTIONS.values.length).toBeGreaterThan(0);
    });
  });
});
