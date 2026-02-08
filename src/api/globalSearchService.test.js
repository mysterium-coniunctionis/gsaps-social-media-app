import {
  globalSearch,
  quickSearch,
  getTrendingSearches,
  getRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  CONTENT_TYPES
} from './globalSearchService';

describe('globalSearchService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('CONTENT_TYPES', () => {
    it('should define all content types', () => {
      expect(CONTENT_TYPES.ALL).toBe('all');
      expect(CONTENT_TYPES.POSTS).toBe('posts');
      expect(CONTENT_TYPES.PAPERS).toBe('papers');
      expect(CONTENT_TYPES.COURSES).toBe('courses');
      expect(CONTENT_TYPES.USERS).toBe('users');
      expect(CONTENT_TYPES.VOICE_ROOMS).toBe('voice_rooms');
      expect(CONTENT_TYPES.VIRTUAL_SPACES).toBe('virtual_spaces');
      expect(CONTENT_TYPES.EVENTS).toBe('events');
    });
  });

  describe('globalSearch', () => {
    it('should return empty results for empty query', async () => {
      const result = await globalSearch('');
      expect(result.totalResults).toBe(0);
      expect(result.results).toEqual({});
    });

    it('should return empty results for very short query', async () => {
      const result = await globalSearch('a');
      expect(result.totalResults).toBe(0);
    });

    it('should return results for valid query', async () => {
      const result = await globalSearch('psilocybin');
      expect(result.query).toBe('psilocybin');
      expect(result.totalResults).toBeGreaterThanOrEqual(0);
      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('suggestions');
      expect(result).toHaveProperty('timestamp');
    });

    it('should search specific content type when specified', async () => {
      const result = await globalSearch('therapy', { type: CONTENT_TYPES.PAPERS });
      // Should only have papers in results
      const resultKeys = Object.keys(result.results);
      if (resultKeys.length > 0) {
        expect(resultKeys).toContain(CONTENT_TYPES.PAPERS);
        expect(resultKeys.length).toBe(1);
      }
    });

    it('should respect limit option', async () => {
      const result = await globalSearch('research', { limit: 2 });
      Object.values(result.results).forEach(typeResults => {
        expect(typeResults.length).toBeLessThanOrEqual(2);
      });
    });

    it('should return results sorted by relevance within each type', async () => {
      const result = await globalSearch('psilocybin');
      Object.values(result.results).forEach(typeResults => {
        for (let i = 1; i < typeResults.length; i++) {
          expect(typeResults[i - 1].relevanceScore).toBeGreaterThanOrEqual(typeResults[i].relevanceScore);
        }
      });
    });

    it('should include metadata in results', async () => {
      const result = await globalSearch('psilocybin', { type: CONTENT_TYPES.PAPERS });
      if (result.results[CONTENT_TYPES.PAPERS]?.length > 0) {
        const paper = result.results[CONTENT_TYPES.PAPERS][0];
        expect(paper).toHaveProperty('type');
        expect(paper).toHaveProperty('id');
        expect(paper).toHaveProperty('title');
        expect(paper).toHaveProperty('description');
        expect(paper).toHaveProperty('url');
        expect(paper).toHaveProperty('metadata');
        expect(paper).toHaveProperty('relevanceScore');
      }
    });
  });

  describe('quickSearch', () => {
    it('should return flattened results across all types', async () => {
      const result = await quickSearch('research');
      expect(result).toHaveProperty('query');
      expect(result).toHaveProperty('results');
      expect(result).toHaveProperty('totalResults');
      expect(Array.isArray(result.results)).toBe(true);
    });

    it('should respect limit', async () => {
      const result = await quickSearch('therapy', 3);
      expect(result.results.length).toBeLessThanOrEqual(3);
    });

    it('should sort results by relevance', async () => {
      const result = await quickSearch('psilocybin');
      for (let i = 1; i < result.results.length; i++) {
        expect(result.results[i - 1].relevanceScore).toBeGreaterThanOrEqual(result.results[i].relevanceScore);
      }
    });
  });

  describe('getTrendingSearches', () => {
    it('should return an array of trending searches', async () => {
      const trending = await getTrendingSearches();
      expect(Array.isArray(trending)).toBe(true);
      expect(trending.length).toBeGreaterThan(0);
    });

    it('should have query and count for each trending item', async () => {
      const trending = await getTrendingSearches();
      trending.forEach(item => {
        expect(item).toHaveProperty('query');
        expect(item).toHaveProperty('count');
        expect(typeof item.query).toBe('string');
        expect(typeof item.count).toBe('number');
      });
    });

    it('should include psychedelic-related trending searches', async () => {
      const trending = await getTrendingSearches();
      const queries = trending.map(t => t.query);
      expect(queries.some(q => q.includes('psilocybin'))).toBe(true);
    });
  });

  describe('recent searches', () => {
    it('should return empty array when no searches saved', () => {
      const recent = getRecentSearches();
      expect(recent).toEqual([]);
    });

    it('should save and retrieve recent searches', () => {
      saveRecentSearch('psilocybin');
      saveRecentSearch('MDMA therapy');

      const recent = getRecentSearches();
      expect(recent.length).toBe(2);
      expect(recent[0]).toBe('MDMA therapy');
      expect(recent[1]).toBe('psilocybin');
    });

    it('should not duplicate entries', () => {
      saveRecentSearch('psilocybin');
      saveRecentSearch('MDMA');
      saveRecentSearch('psilocybin');

      const recent = getRecentSearches();
      expect(recent.length).toBe(2);
      expect(recent[0]).toBe('psilocybin');
    });

    it('should limit to 10 recent searches', () => {
      for (let i = 0; i < 15; i++) {
        saveRecentSearch(`search-${i}`);
      }

      const recent = getRecentSearches();
      expect(recent.length).toBeLessThanOrEqual(10);
    });

    it('should clear recent searches', () => {
      saveRecentSearch('test1');
      saveRecentSearch('test2');
      clearRecentSearches();

      const recent = getRecentSearches();
      expect(recent).toEqual([]);
    });
  });
});
