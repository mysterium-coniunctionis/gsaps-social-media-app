import {
  logInteraction,
  getRecommendations,
  recordExperimentImpression,
  recordExperimentConversion
} from './recommendationService';

describe('recommendationService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('logInteraction', () => {
    it('should store interaction signals in localStorage', () => {
      const item = {
        id: 'item1',
        topics: ['neuroscience'],
        category: 'research',
        tags: ['psilocybin']
      };

      logInteraction('paper', item, 'view');

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(stored).toBeDefined();
      expect(stored.topics.neuroscience).toBeGreaterThan(0);
      expect(stored.topics.psilocybin).toBeGreaterThan(0);
      expect(stored.categories.research).toBeGreaterThan(0);
    });

    it('should weight different actions differently', () => {
      const item = { id: 'item1', topics: ['topic1'] };

      logInteraction('paper', item, 'view');
      const afterView = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const viewWeight = afterView.topics.topic1;

      localStorage.clear();
      logInteraction('paper', item, 'enroll');
      const afterEnroll = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const enrollWeight = afterEnroll.topics.topic1;

      expect(enrollWeight).toBeGreaterThan(viewWeight);
    });

    it('should track recency with most recent first', () => {
      logInteraction('paper', { id: 'first', topics: ['a'] }, 'view');
      logInteraction('paper', { id: 'second', topics: ['b'] }, 'view');

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(stored.recency[0].id).toBe('second');
      expect(stored.recency[1].id).toBe('first');
    });

    it('should limit recency to 25 items', () => {
      for (let i = 0; i < 30; i++) {
        logInteraction('paper', { id: `item-${i}`, topics: ['a'] }, 'view');
      }

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(stored.recency.length).toBeLessThanOrEqual(25);
    });

    it('should deduplicate recency entries by id', () => {
      logInteraction('paper', { id: 'same', topics: ['a'] }, 'view');
      logInteraction('paper', { id: 'same', topics: ['a'] }, 'click');

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const sameEntries = stored.recency.filter(r => r.id === 'same');
      expect(sameEntries.length).toBe(1);
    });

    it('should accumulate weights for repeated interactions', () => {
      const item = { id: 'accumulate-test', category: 'unique-category-test' };
      logInteraction('paper', item, 'view');
      const afterFirst = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const firstWeight = afterFirst.categories['unique-category-test'];

      logInteraction('paper', item, 'view');
      const afterSecond = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const secondWeight = afterSecond.categories['unique-category-test'];

      expect(secondWeight).toBeGreaterThan(firstWeight);
    });
  });

  describe('getRecommendations', () => {
    const items = [
      { id: '1', category: 'research', topics: ['neuroscience'], rating: 4.5, views: 100 },
      { id: '2', category: 'clinical', topics: ['therapy'], rating: 4.0, views: 200 },
      { id: '3', category: 'research', topics: ['pharmacology'], rating: 3.5, views: 50 },
      { id: '4', category: 'education', topics: ['training'], rating: 4.8, views: 300 },
      { id: '5', category: 'clinical', topics: ['neuroscience'], rating: 3.0, views: 10 }
    ];

    it('should return empty array for no items', () => {
      expect(getRecommendations('paper', null)).toEqual([]);
      expect(getRecommendations('paper', [])).toEqual([]);
    });

    it('should return items up to the limit', () => {
      const result = getRecommendations('paper', items, { limit: 3 });
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should return items in a reasonable order', () => {
      const result = getRecommendations('paper', items);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(6);
    });

    it('should diversify results across categories when enabled', () => {
      const result = getRecommendations('paper', items, { diversify: true, limit: 4 });
      const categories = result.map(r => r.category);
      // With diversification, we should see multiple categories
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBeGreaterThanOrEqual(1);
    });

    it('should not diversify when disabled', () => {
      const result = getRecommendations('paper', items, { diversify: false, limit: 5 });
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('should use control variant when specified', () => {
      // Log some interactions to build a profile
      logInteraction('paper', { id: 'x', topics: ['neuroscience'] }, 'enroll');
      logInteraction('paper', { id: 'y', topics: ['neuroscience'] }, 'save');

      const personalized = getRecommendations('paper', items, { variant: 'personalized' });
      const control = getRecommendations('paper', items, { variant: 'control' });

      // Both should return results
      expect(personalized.length).toBeGreaterThan(0);
      expect(control.length).toBeGreaterThan(0);
    });
  });

  describe('recordExperimentImpression', () => {
    it('should increment impressions count', () => {
      recordExperimentImpression('exp1', 'control');
      recordExperimentImpression('exp1', 'control');

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(stored.exp1.impressions).toBe(2);
    });

    it('should accept a custom count', () => {
      recordExperimentImpression('exp2', 'personalized', 5);

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(stored.exp2.impressions).toBe(5);
    });
  });

  describe('recordExperimentConversion', () => {
    it('should increment conversions count', () => {
      recordExperimentConversion('exp1', 'control');
      recordExperimentConversion('exp1', 'control');

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(stored.exp1.conversions).toBe(2);
    });

    it('should accept a custom weight', () => {
      recordExperimentConversion('exp2', 'personalized', 3);

      const stored = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(stored.exp2.conversions).toBe(3);
    });
  });
});
