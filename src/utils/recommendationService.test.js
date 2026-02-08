import { logInteraction, getRecommendations, recordExperimentImpression, recordExperimentConversion } from './recommendationService';

describe('recommendationService', () => {
  beforeEach(() => {
    localStorage.clear();
    // Trigger storage event to invalidate internal caches
    window.dispatchEvent(new StorageEvent('storage', { key: 'gsaps_recommendation_signals' }));
    window.dispatchEvent(new StorageEvent('storage', { key: 'gsaps_recommendation_experiments' }));
  });

  describe('logInteraction', () => {
    it('stores interaction signals in localStorage', () => {
      logInteraction('course', { id: 'c1', topics: ['psilocybin'], category: 'research' }, 'view');

      const signals = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(signals.topics.psilocybin).toBeGreaterThan(0);
      expect(signals.categories.research).toBeGreaterThan(0);
    });

    it('applies higher weight for enrollments than views', () => {
      logInteraction('course', { id: 'c1', topics: ['topic-a'], category: 'cat-a' }, 'view');
      const afterView = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const viewWeight = afterView.topics['topic-a'];

      // Clear and reset cache
      localStorage.clear();
      window.dispatchEvent(new StorageEvent('storage', { key: 'gsaps_recommendation_signals' }));

      logInteraction('course', { id: 'c2', topics: ['topic-b'], category: 'cat-b' }, 'enroll');
      const afterEnroll = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const enrollWeight = afterEnroll.topics['topic-b'];

      expect(enrollWeight).toBeGreaterThan(viewWeight);
    });

    it('stores recency data', () => {
      logInteraction('course', { id: 'c1', topics: ['psilocybin'] }, 'click');

      const signals = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(signals.recency.length).toBeGreaterThanOrEqual(1);
      const c1Entry = signals.recency.find(e => e.id === 'c1');
      expect(c1Entry).toBeDefined();
      expect(c1Entry.type).toBe('course');
    });

    it('limits recency to 25 entries', () => {
      for (let i = 0; i < 30; i++) {
        logInteraction('course', { id: `c${i}`, topics: ['t'] }, 'view');
      }

      const signals = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(signals.recency.length).toBeLessThanOrEqual(25);
    });

    it('deduplicates recency entries by id', () => {
      logInteraction('course', { id: 'c1', topics: ['t'] }, 'view');
      logInteraction('course', { id: 'c1', topics: ['t'] }, 'click');

      const signals = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const c1Entries = signals.recency.filter(e => e.id === 'c1');
      expect(c1Entries.length).toBe(1);
    });

    it('accumulates weights for repeated topic interactions', () => {
      logInteraction('course', { id: 'c1', topics: ['topic-a'] }, 'view');
      const afterFirst = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const firstWeight = afterFirst.topics['topic-a'];

      logInteraction('course', { id: 'c2', topics: ['topic-a'] }, 'view');
      const afterSecond = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      const secondWeight = afterSecond.topics['topic-a'];

      expect(secondWeight).toBeGreaterThan(firstWeight);
    });

    it('handles items with tags', () => {
      logInteraction('paper', { id: 'p1', tags: ['neuroscience', 'therapy'] }, 'save');

      const signals = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(signals.topics.neuroscience).toBeGreaterThan(0);
      expect(signals.keywords.neuroscience).toBeGreaterThan(0);
    });

    it('handles items with level', () => {
      logInteraction('course', { id: 'c1', topics: [], level: 'beginner' }, 'view');

      const signals = JSON.parse(localStorage.getItem('gsaps_recommendation_signals'));
      expect(signals.levels.beginner).toBeGreaterThan(0);
    });
  });

  describe('getRecommendations', () => {
    const items = [
      { id: 'i1', category: 'research', topics: ['psilocybin'], rating: 4.5, views: 100 },
      { id: 'i2', category: 'clinical', topics: ['therapy'], rating: 3.0, views: 50 },
      { id: 'i3', category: 'research', topics: ['neuroscience'], rating: 5.0, views: 200 },
      { id: 'i4', category: 'ethics', topics: ['policy'], rating: 4.0, views: 80 },
      { id: 'i5', category: 'clinical', topics: ['MDMA'], rating: 4.2, views: 150 },
      { id: 'i6', category: 'education', topics: ['training'], rating: 3.8, views: 30 },
      { id: 'i7', category: 'research', topics: ['psilocybin', 'neuroscience'], rating: 4.8, views: 300, featured: true }
    ];

    it('returns empty array for empty items', () => {
      expect(getRecommendations('course', [])).toEqual([]);
      expect(getRecommendations('course', null)).toEqual([]);
    });

    it('returns at most limit items', () => {
      const results = getRecommendations('course', items, { limit: 3 });
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it('returns items, not score wrappers', () => {
      const results = getRecommendations('course', items, { limit: 3 });
      results.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('category');
      });
    });

    it('diversifies results by category', () => {
      const results = getRecommendations('course', items, { limit: 6, diversify: true });
      const categories = results.map(r => r.category);
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBeGreaterThan(1);
    });

    it('does not diversify when disabled', () => {
      const results = getRecommendations('course', items, { limit: 6, diversify: false });
      expect(results.length).toBeLessThanOrEqual(6);
    });

    it('prioritizes personalized results when user has signals', () => {
      logInteraction('course', { id: 'x1', topics: ['psilocybin'] }, 'enroll');
      logInteraction('course', { id: 'x2', topics: ['psilocybin'] }, 'complete');

      const results = getRecommendations('course', items, { limit: 3, diversify: false, variant: 'personalized' });
      expect(results.length).toBeGreaterThan(0);
    });

    it('uses control scoring when variant is control', () => {
      const results = getRecommendations('course', items, { limit: 3, variant: 'control' });
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('recordExperimentImpression', () => {
    it('records impression count', () => {
      recordExperimentImpression('exp-1', 'control', 1);

      const experiments = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(experiments['exp-1'].impressions).toBeGreaterThanOrEqual(1);
      expect(experiments['exp-1'].variant).toBe('control');
    });

    it('accumulates impressions', () => {
      recordExperimentImpression('exp-accum-i', 'control', 1);
      const first = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      const firstVal = first['exp-accum-i'].impressions;

      recordExperimentImpression('exp-accum-i', 'control', 3);
      const second = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(second['exp-accum-i'].impressions).toBe(firstVal + 3);
    });
  });

  describe('recordExperimentConversion', () => {
    it('records conversion weight', () => {
      recordExperimentConversion('exp-conv-1', 'personalized', 1);

      const experiments = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(experiments['exp-conv-1'].conversions).toBeGreaterThanOrEqual(1);
    });

    it('accumulates conversions', () => {
      recordExperimentConversion('exp-accum-c', 'personalized', 1);
      const first = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      const firstVal = first['exp-accum-c'].conversions;

      recordExperimentConversion('exp-accum-c', 'personalized', 2);
      const second = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(second['exp-accum-c'].conversions).toBe(firstVal + 2);
    });

    it('initializes experiment data if not present', () => {
      recordExperimentConversion('new-exp-unique', 'control', 1);

      const experiments = JSON.parse(localStorage.getItem('gsaps_recommendation_experiments'));
      expect(experiments['new-exp-unique']).toBeDefined();
      expect(experiments['new-exp-unique'].impressions).toBe(0);
      expect(experiments['new-exp-unique'].conversions).toBeGreaterThanOrEqual(1);
    });
  });
});
