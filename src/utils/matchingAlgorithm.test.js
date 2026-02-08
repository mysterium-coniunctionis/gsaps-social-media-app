import {
  calculateMatchScore,
  findTopMatches,
  getColdStartRecommendations,
  recordMatchFeedback
} from './matchingAlgorithm';

describe('matchingAlgorithm', () => {
  const createProfile = (overrides = {}) => ({
    id: 'user1',
    expertise: ['neuroscience', 'pharmacology'],
    researchInterests: ['psilocybin', 'therapy'],
    yearsExperience: 10,
    availability: 'medium',
    goals: ['mentor'],
    communicationStyle: 'collaborative',
    connections: [],
    location: 'San Francisco, CA',
    ...overrides
  });

  describe('calculateMatchScore', () => {
    it('should return a score between 0 and 100', () => {
      const person1 = createProfile();
      const person2 = createProfile({ id: 'user2' });
      const result = calculateMatchScore(person1, person2);

      expect(result.totalScore).toBeGreaterThanOrEqual(0);
      expect(result.totalScore).toBeLessThanOrEqual(100);
    });

    it('should return a breakdown with all score components', () => {
      const person1 = createProfile();
      const person2 = createProfile({ id: 'user2' });
      const result = calculateMatchScore(person1, person2);

      expect(result.breakdown).toHaveProperty('expertise');
      expect(result.breakdown).toHaveProperty('experience');
      expect(result.breakdown).toHaveProperty('availability');
      expect(result.breakdown).toHaveProperty('goals');
      expect(result.breakdown).toHaveProperty('communication');
      expect(result.breakdown).toHaveProperty('mutualConnections');
    });

    it('should return a relationship type', () => {
      const person1 = createProfile();
      const person2 = createProfile({ id: 'user2', yearsExperience: 5 });
      const result = calculateMatchScore(person1, person2);

      expect(['mentor', 'peer']).toContain(result.relationshipType);
    });

    it('should score higher for complementary mentor-mentee goals', () => {
      const mentor = createProfile({ goals: ['mentor'], yearsExperience: 15 });
      const mentee = createProfile({ id: 'user2', goals: ['seeking-mentor'], yearsExperience: 3 });
      const peers = createProfile({ id: 'user3', goals: ['peer-collaboration'], yearsExperience: 15 });

      const mentorMenteeScore = calculateMatchScore(mentor, mentee);
      const mentorPeerScore = calculateMatchScore(mentor, peers);

      expect(mentorMenteeScore.totalScore).toBeGreaterThan(mentorPeerScore.totalScore);
    });

    it('should detect peer relationship type', () => {
      const peer1 = createProfile({ goals: ['peer-collaboration'], yearsExperience: 5 });
      const peer2 = createProfile({ id: 'user2', goals: ['peer-collaboration'], yearsExperience: 6 });
      const result = calculateMatchScore(peer1, peer2);

      expect(result.relationshipType).toBe('peer');
    });

    it('should score higher with overlapping expertise', () => {
      const person1 = createProfile({ expertise: ['neuroscience', 'pharmacology', 'therapy'] });
      const similar = createProfile({ id: 'user2', expertise: ['neuroscience', 'pharmacology'] });
      const different = createProfile({ id: 'user3', expertise: ['art', 'music'] });

      const similarScore = calculateMatchScore(person1, similar);
      const differentScore = calculateMatchScore(person1, different);

      expect(similarScore.breakdown.expertise).toBeGreaterThan(differentScore.breakdown.expertise);
    });

    it('should give location bonus for same city', () => {
      const person1 = createProfile({ location: 'San Francisco, CA' });
      const sameCity = createProfile({ id: 'user2', location: 'San Francisco, CA' });
      const diffCity = createProfile({ id: 'user3', location: 'New York, NY' });

      const sameCityScore = calculateMatchScore(person1, sameCity);
      const diffCityScore = calculateMatchScore(person1, diffCity);

      expect(sameCityScore.totalScore).toBeGreaterThan(diffCityScore.totalScore);
    });

    it('should give same-state bonus', () => {
      const person1 = createProfile({ location: 'San Francisco, CA' });
      const sameState = createProfile({ id: 'user2', location: 'Los Angeles, CA' });
      const diffState = createProfile({ id: 'user3', location: 'New York, NY' });

      const sameStateScore = calculateMatchScore(person1, sameState);
      const diffStateScore = calculateMatchScore(person1, diffState);

      expect(sameStateScore.totalScore).toBeGreaterThanOrEqual(diffStateScore.totalScore);
    });

    it('should boost score for mutual connections', () => {
      const person1 = createProfile({ connections: ['a', 'b', 'c'] });
      const withMutual = createProfile({ id: 'user2', connections: ['a', 'b'] });
      const noMutual = createProfile({ id: 'user3', connections: ['x', 'y'] });

      const mutualScore = calculateMatchScore(person1, withMutual);
      const noMutualScore = calculateMatchScore(person1, noMutual);

      expect(mutualScore.breakdown.mutualConnections).toBeGreaterThan(noMutualScore.breakdown.mutualConnections);
    });

    it('should generate match reasoning', () => {
      const person1 = createProfile();
      const person2 = createProfile({ id: 'user2', yearsExperience: 5 });
      const result = calculateMatchScore(person1, person2);

      expect(result.reasoning).toBeDefined();
      expect(Array.isArray(result.reasoning)).toBe(true);
    });

    it('should accept custom weights', () => {
      const person1 = createProfile();
      const person2 = createProfile({ id: 'user2' });

      const defaultResult = calculateMatchScore(person1, person2);
      const customResult = calculateMatchScore(person1, person2, {
        expertiseOverlap: 0.80,
        experienceGap: 0.05,
        availabilityMatch: 0.05,
        goalsAlignment: 0.05,
        mutualConnections: 0.025,
        communicationStyle: 0.025
      });

      // Scores should differ when weights change
      expect(customResult.totalScore).not.toBe(defaultResult.totalScore);
    });

    it('should handle missing expertise gracefully', () => {
      const person1 = createProfile({ expertise: null });
      const person2 = createProfile({ id: 'user2', expertise: null });
      const result = calculateMatchScore(person1, person2);

      expect(result.totalScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('findTopMatches', () => {
    const profiles = [
      createProfile({ id: 'current' }),
      createProfile({ id: 'match1', goals: ['seeking-mentor'], yearsExperience: 3, mentoringPreferences: { seekingMentor: true } }),
      createProfile({ id: 'match2', goals: ['peer-collaboration'], yearsExperience: 10 }),
      createProfile({ id: 'match3', goals: ['research-collaboration'], collaborationInterests: ['neuroscience'] }),
      createProfile({ id: 'lowscore', expertise: [], researchInterests: [], goals: [] })
    ];

    it('should exclude the current user from results', () => {
      const currentUser = createProfile({ id: 'current' });
      const matches = findTopMatches(currentUser, profiles);
      const ids = matches.map(m => m.profile.id);
      expect(ids).not.toContain('current');
    });

    it('should return matches sorted by score (descending)', () => {
      const currentUser = createProfile({ id: 'current' });
      const matches = findTopMatches(currentUser, profiles);

      for (let i = 1; i < matches.length; i++) {
        expect(matches[i - 1].totalScore).toBeGreaterThanOrEqual(matches[i].totalScore);
      }
    });

    it('should respect limit option', () => {
      const currentUser = createProfile({ id: 'current' });
      const matches = findTopMatches(currentUser, profiles, { limit: 2 });
      expect(matches.length).toBeLessThanOrEqual(2);
    });

    it('should respect minScore option', () => {
      const currentUser = createProfile({ id: 'current' });
      const matches = findTopMatches(currentUser, profiles, { minScore: 50 });
      matches.forEach(m => {
        expect(m.totalScore).toBeGreaterThanOrEqual(50);
      });
    });

    it('should filter by mentor type', () => {
      const currentUser = createProfile({ id: 'current', goals: ['seeking-mentor'], mentoringPreferences: { willingToMentor: true } });
      const mentorProfiles = [
        createProfile({ id: 'm1', mentoringPreferences: { willingToMentor: true } }),
        createProfile({ id: 'm2', mentoringPreferences: { willingToMentor: false } })
      ];

      const matches = findTopMatches(currentUser, mentorProfiles, { filterType: 'mentor' });
      const ids = matches.map(m => m.profile.id);
      expect(ids).toContain('m1');
    });

    it('should return empty for no profiles', () => {
      const currentUser = createProfile();
      const matches = findTopMatches(currentUser, []);
      expect(matches).toEqual([]);
    });
  });

  describe('getColdStartRecommendations', () => {
    const allProfiles = [
      createProfile({ id: 'p1', responseRate: 0.95, mentoringPreferences: { willingToMentor: true } }),
      createProfile({ id: 'p2', responseRate: 0.50 }),
      createProfile({ id: 'p3', responseRate: 0.90 })
    ];

    it('should return recommendations for new users', () => {
      const newUser = createProfile({ id: 'newbie', connections: [] });
      const recommendations = getColdStartRecommendations(newUser, allProfiles);

      expect(Array.isArray(recommendations)).toBe(true);
      expect(recommendations.length).toBeLessThanOrEqual(10);
    });

    it('should limit to 10 results', () => {
      const manyProfiles = Array.from({ length: 20 }, (_, i) =>
        createProfile({ id: `p${i}`, responseRate: 0.8 })
      );
      const newUser = createProfile({ id: 'newbie' });
      const recommendations = getColdStartRecommendations(newUser, manyProfiles);
      expect(recommendations.length).toBeLessThanOrEqual(10);
    });
  });

  describe('recordMatchFeedback', () => {
    it('should return success response', () => {
      const result = recordMatchFeedback('match1', 5, { helpful: true });
      expect(result.success).toBe(true);
      expect(result.message).toBe('Feedback recorded successfully');
    });
  });
});
