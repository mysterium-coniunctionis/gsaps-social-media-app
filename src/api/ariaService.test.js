jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
    get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn()
  }))
}));

import {
  analyzePaper,
  explainTerm,
  findRelatedPapers,
  answerQuestion,
  generateSuggestions
} from './ariaService';

describe('ariaService', () => {
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

  describe('analyzePaper', () => {
    it('returns analysis object with expected fields', async () => {
      const paper = { title: 'Test Paper on Psilocybin' };
      const promise = analyzePaper(paper);
      await flushPromises();
      const result = await promise;
      expect(result).toHaveProperty('summary');
      expect(result).toHaveProperty('keyFindings');
      expect(result).toHaveProperty('strengths');
      expect(result).toHaveProperty('limitations');
      expect(result).toHaveProperty('methodology');
      expect(result).toHaveProperty('implications');
      expect(result).toHaveProperty('controversies');
      expect(typeof result.summary).toBe('string');
      expect(Array.isArray(result.keyFindings)).toBe(true);
      expect(Array.isArray(result.strengths)).toBe(true);
      expect(Array.isArray(result.limitations)).toBe(true);
    });
  });

  describe('explainTerm', () => {
    it('returns a definition for a known term', async () => {
      const promise = explainTerm('psilocybin');
      await flushPromises();
      const result = await promise;
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain('serotonin');
    });

    it('returns a fallback message for unknown terms', async () => {
      const promise = explainTerm('xyznonexistent');
      await flushPromises();
      const result = await promise;
      expect(typeof result).toBe('string');
      expect(result).toContain("don't have a specific definition");
    });
  });

  describe('findRelatedPapers', () => {
    it('returns an array of papers with relevance scores', async () => {
      const promise = findRelatedPapers('psilocybin');
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach(paper => {
        expect(paper).toHaveProperty('id');
        expect(paper).toHaveProperty('title');
        expect(paper).toHaveProperty('relevanceScore');
        expect(paper).toHaveProperty('reason');
      });
    });

    it('returns papers for a general query', async () => {
      const promise = findRelatedPapers('general research');
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('answerQuestion', () => {
    it('returns a string answer', async () => {
      const promise = answerQuestion('How do psychedelics work in the brain?');
      await flushPromises();
      const result = await promise;
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('provides context-aware responses for paper context', async () => {
      const context = { type: 'paper', data: { title: 'Psilocybin Study' } };
      const promise = answerQuestion('summarize this paper', context);
      await flushPromises();
      const result = await promise;
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('generateSuggestions', () => {
    it('returns an array of suggestion strings for paper context', async () => {
      const promise = generateSuggestions({ type: 'paper' });
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      result.forEach(suggestion => {
        expect(typeof suggestion).toBe('string');
      });
    });

    it('returns suggestions for course context', async () => {
      const promise = generateSuggestions({ type: 'course' });
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('returns default suggestions for unknown context', async () => {
      const promise = generateSuggestions({ type: 'unknown' });
      await flushPromises();
      const result = await promise;
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
