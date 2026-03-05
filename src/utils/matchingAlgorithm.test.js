import {
  calculateMatchScore,
  findTopMatches,
  getColdStartRecommendations,
  recordMatchFeedback
} from './matchingAlgorithm';

describe('matchingAlgorithm', () => {
  const basePerson = {
    id: 'user-1',
    expertise: ['Psilocybin', 'Neuroscience', 'Clinical Trials'],
    researchInterests: ['psychedelic therapy', 'depression treatment'],
    yearsExperience: 10,
    availability: 'high',
    goals: ['mentor'],
    communicationStyle: 'collaborative',
    connections: ['c1', 'c2', 'c3'],
    location: 'San Francisco, CA'
  };

  const matchingPerson = {
    id: 'user-2',
    expertise: ['Psilocybin', 'Clinical Trials', 'MDMA'],
    researchInterests: ['psychedelic therapy', 'PTSD'],
    yearsExperience: 5,
    availability: 'medium',
    goals: ['seeking-mentor'],
    communicationStyle: 'collaborative',
    connections: ['c1', 'c3', 'c5'],
    location: 'San Francisco, CA'
  };

  describe('calculateMatchScore', () => {
    it('returns a score object with totalScore, breakdown, relationshipType, and reasoning', () => {
      const result = calculateMatchScore(basePerson, matchingPerson);

      expect(result).toHaveProperty('totalScore');
      expect(result).toHaveProperty('breakdown');
      expect(result).toHaveProperty('relationshipType');
      expect(result).toHaveProperty('reasoning');
      expect(typeof result.totalScore).toBe('number');
      expect(result.totalScore).toBeGreaterThanOrEqual(0);
      expect(result.totalScore).toBeLessThanOrEqual(100);
    });

    it('returns breakdown with all expected components', () => {
      const result = calculateMatchScore(basePerson, matchingPerson);
      const { breakdown } = result;

      expect(breakdown).toHaveProperty('expertise');
      expect(breakdown).toHaveProperty('experience');
      expect(breakdown).toHaveProperty('availability');
      expect(breakdown).toHaveProperty('goals');
      expect(breakdown).toHaveProperty('communication');
      expect(breakdown).toHaveProperty('mutualConnections');
    });

    it('produces high score for well-matched mentor-mentee pair', () => {
      const result = calculateMatchScore(basePerson, matchingPerson);
      expect(result.totalScore).toBeGreaterThan(50);
      expect(result.relationshipType).toBe('mentor');
    });

    it('detects peer relationship type', () => {
      const peer1 = { ...basePerson, goals: ['peer-collaboration'] };
      const peer2 = { ...matchingPerson, goals: ['peer-collaboration'] };

      const result = calculateMatchScore(peer1, peer2);
      expect(result.relationshipType).toBe('peer');
    });

    it('returns lower score when expertise does not overlap', () => {
      const noOverlap = { ...matchingPerson, expertise: ['Sociology', 'Anthropology'] };
      const withOverlap = calculateMatchScore(basePerson, matchingPerson);
      const withoutOverlap = calculateMatchScore(basePerson, noOverlap);

      expect(withoutOverlap.totalScore).toBeLessThan(withOverlap.totalScore);
    });

    it('handles missing expertise gracefully', () => {
      const noExpertise = { ...matchingPerson, expertise: null, researchInterests: null };
      const result = calculateMatchScore(basePerson, noExpertise);
      expect(result.breakdown.expertise).toBe(0);
    });

    it('handles missing goals gracefully', () => {
      const noGoals = { ...matchingPerson, goals: null };
      const result = calculateMatchScore(basePerson, noGoals);
      expect(result.breakdown.goals).toBe(0);
    });

    it('handles missing connections gracefully', () => {
      const noConnections = { ...matchingPerson, connections: undefined };
      const result = calculateMatchScore(basePerson, noConnections);
      expect(result.breakdown.mutualConnections).toBe(0);
    });

    it('applies custom weights', () => {
      const customWeights = {
        expertiseOverlap: 1.0,
        experienceGap: 0,
        availabilityMatch: 0,
        goalsAlignment: 0,
        mutualConnections: 0,
        communicationStyle: 0
      };

      const result = calculateMatchScore(basePerson, matchingPerson, customWeights);
      // Score should be driven mainly by expertise when other weights are zero
      expect(result.totalScore).toBeGreaterThan(0);
    });

    it('includes location bonus for same city', () => {
      const sameCity = calculateMatchScore(basePerson, matchingPerson);

      const differentCity = { ...matchingPerson, location: 'New York, NY' };
      const diffResult = calculateMatchScore(basePerson, differentCity);

      // Same city should score higher due to location bonus
      expect(sameCity.totalScore).toBeGreaterThanOrEqual(diffResult.totalScore);
    });

    it('includes reasoning array', () => {
      const result = calculateMatchScore(basePerson, matchingPerson);
      expect(Array.isArray(result.reasoning)).toBe(true);
    });

    it('generates reasoning for high expertise overlap', () => {
      const result = calculateMatchScore(basePerson, matchingPerson);
      const hasExpertiseReason = result.reasoning.some(
        r => r.includes('overlap') || r.includes('Complementary')
      );
      expect(hasExpertiseReason).toBe(true);
    });

    it('generates reasoning for mentor-mentee alignment', () => {
      const result = calculateMatchScore(basePerson, matchingPerson);
      const hasMentorReason = result.reasoning.some(r => r.includes('mentor'));
      expect(hasMentorReason).toBe(true);
    });
  });

  describe('experience gap scoring', () => {
    it('scores optimal mentor gap (3-7 years) as 1', () => {
      const mentor = { ...basePerson, yearsExperience: 10, goals: ['mentor'] };
      const mentee = { ...matchingPerson, yearsExperience: 5, goals: ['seeking-mentor'] };
      const result = calculateMatchScore(mentor, mentee);
      expect(result.breakdown.experience).toBe(100);
    });

    it('gives lower score for very large experience gaps', () => {
      const mentor = { ...basePerson, yearsExperience: 30, goals: ['mentor'] };
      const mentee = { ...matchingPerson, yearsExperience: 1, goals: ['seeking-mentor'] };
      const result = calculateMatchScore(mentor, mentee);
      expect(result.breakdown.experience).toBeLessThan(100);
    });

    it('scores peers with similar experience highly', () => {
      const peer1 = { ...basePerson, yearsExperience: 8, goals: ['peer-collaboration'] };
      const peer2 = { ...matchingPerson, yearsExperience: 7, goals: ['peer-collaboration'] };
      const result = calculateMatchScore(peer1, peer2);
      expect(result.breakdown.experience).toBe(100);
    });
  });

  describe('availability matching', () => {
    it('scores high-medium availability pairing well', () => {
      const person1 = { ...basePerson, availability: 'high' };
      const person2 = { ...matchingPerson, availability: 'medium' };
      const result = calculateMatchScore(person1, person2);
      expect(result.breakdown.availability).toBe(100);
    });

    it('scores low-low availability poorly', () => {
      const person1 = { ...basePerson, availability: 'low' };
      const person2 = { ...matchingPerson, availability: 'low' };
      const result = calculateMatchScore(person1, person2);
      expect(result.breakdown.availability).toBe(30);
    });
  });

  describe('communication style compatibility', () => {
    it('scores same collaborative style as 1', () => {
      const person1 = { ...basePerson, communicationStyle: 'collaborative' };
      const person2 = { ...matchingPerson, communicationStyle: 'collaborative' };
      const result = calculateMatchScore(person1, person2);
      expect(result.breakdown.communication).toBe(100);
    });

    it('scores directive-collaborative pairing lower', () => {
      const person1 = { ...basePerson, communicationStyle: 'directive' };
      const person2 = { ...matchingPerson, communicationStyle: 'collaborative' };
      const result = calculateMatchScore(person1, person2);
      expect(result.breakdown.communication).toBe(60);
    });
  });

  describe('findTopMatches', () => {
    const profiles = [
      basePerson,
      matchingPerson,
      {
        id: 'user-3',
        expertise: ['Sociology'],
        researchInterests: ['social psychology'],
        yearsExperience: 3,
        availability: 'low',
        goals: ['peer-collaboration'],
        communicationStyle: 'directive',
        connections: [],
        location: 'Chicago, IL'
      },
      {
        id: 'user-4',
        expertise: ['Psilocybin', 'Neuroscience'],
        researchInterests: ['psychedelic therapy'],
        yearsExperience: 7,
        availability: 'high',
        goals: ['seeking-mentor'],
        communicationStyle: 'flexible',
        connections: ['c1', 'c2'],
        location: 'San Francisco, CA',
        mentoringPreferences: { seekingMentor: true }
      }
    ];

    it('excludes current user from matches', () => {
      const matches = findTopMatches(basePerson, profiles);
      const ids = matches.map(m => m.profile.id);
      expect(ids).not.toContain('user-1');
    });

    it('respects the limit option', () => {
      const matches = findTopMatches(basePerson, profiles, { limit: 2 });
      expect(matches.length).toBeLessThanOrEqual(2);
    });

    it('filters by minimum score', () => {
      const matches = findTopMatches(basePerson, profiles, { minScore: 90 });
      matches.forEach(m => {
        expect(m.totalScore).toBeGreaterThanOrEqual(90);
      });
    });

    it('returns matches sorted by score descending', () => {
      const matches = findTopMatches(basePerson, profiles);
      for (let i = 1; i < matches.length; i++) {
        expect(matches[i - 1].totalScore).toBeGreaterThanOrEqual(matches[i].totalScore);
      }
    });

    it('filters by mentee type', () => {
      const mentor = {
        ...basePerson,
        mentoringPreferences: { willingToMentor: true }
      };
      const matches = findTopMatches(mentor, profiles, { filterType: 'mentee' });
      matches.forEach(m => {
        expect(m.profile.mentoringPreferences?.seekingMentor).toBe(true);
      });
    });

    it('returns empty array when no profiles match', () => {
      const matches = findTopMatches(basePerson, [basePerson]);
      expect(matches).toEqual([]);
    });
  });

  describe('getColdStartRecommendations', () => {
    const profiles = [
      matchingPerson,
      {
        id: 'user-3',
        expertise: ['Sociology'],
        researchInterests: ['social psychology'],
        yearsExperience: 3,
        availability: 'low',
        goals: ['peer-collaboration'],
        communicationStyle: 'directive',
        connections: [],
        location: 'Chicago, IL',
        responseRate: 0.95
      },
      {
        id: 'user-4',
        expertise: ['Psilocybin'],
        researchInterests: ['psychedelic therapy'],
        yearsExperience: 7,
        availability: 'high',
        goals: ['mentor'],
        communicationStyle: 'flexible',
        connections: [],
        location: 'Austin, TX',
        responseRate: 0.5
      }
    ];

    it('returns at most 10 recommendations', () => {
      const newUser = {
        id: 'new-user',
        expertise: ['Psilocybin'],
        researchInterests: ['psychedelic therapy'],
        yearsExperience: 1,
        availability: 'high',
        goals: ['seeking-mentor'],
        communicationStyle: 'flexible',
        connections: []
      };

      const recs = getColdStartRecommendations(newUser, profiles);
      expect(recs.length).toBeLessThanOrEqual(10);
    });

    it('returns recommendations as an array', () => {
      const newUser = {
        id: 'new-user',
        expertise: ['Psilocybin'],
        researchInterests: ['psychedelic therapy'],
        yearsExperience: 1,
        availability: 'high',
        goals: ['seeking-mentor'],
        communicationStyle: 'flexible',
        connections: []
      };

      const recs = getColdStartRecommendations(newUser, profiles);
      expect(Array.isArray(recs)).toBe(true);
    });
  });

  describe('recordMatchFeedback', () => {
    it('returns success response', () => {
      const result = recordMatchFeedback('match-1', 5, { helpful: true });
      expect(result).toEqual({
        success: true,
        message: 'Feedback recorded successfully'
      });
    });

    it('works with minimal arguments', () => {
      const result = recordMatchFeedback('match-1', 3);
      expect(result.success).toBe(true);
    });
  });
});
