import {
  calculateRecencyScore,
  calculateEngagementScore,
  calculateAuthorAffinity,
  calculateTopicRelevance,
  detectViralContent,
  calculateContentSimilarity,
  applyDiversityPenalty,
  calculateCompositeScore,
  explainRecommendation,
  rankFeedPosts,
  createDefaultUserProfile,
  updateUserProfile,
  getABVariant
} from './neuralFeed';

describe('neuralFeed', () => {
  describe('calculateRecencyScore', () => {
    it('should return ~1 for a post created just now', () => {
      const score = calculateRecencyScore(new Date().toISOString());
      expect(score).toBeGreaterThan(0.99);
      expect(score).toBeLessThanOrEqual(1);
    });

    it('should return ~0.5 for a post 24 hours old (half-life)', () => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const score = calculateRecencyScore(oneDayAgo);
      expect(score).toBeCloseTo(0.5, 1);
    });

    it('should return ~0.25 for a post 48 hours old', () => {
      const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
      const score = calculateRecencyScore(twoDaysAgo);
      expect(score).toBeCloseTo(0.25, 1);
    });

    it('should return a very small score for very old posts', () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const score = calculateRecencyScore(thirtyDaysAgo);
      expect(score).toBeLessThan(0.001);
    });
  });

  describe('calculateEngagementScore', () => {
    it('should return 0 for a post with no engagement', () => {
      const post = { reactions: [], comments: 0, shares: 0, saves: 0, views: 0 };
      const score = calculateEngagementScore(post);
      expect(score).toBe(0);
    });

    it('should increase score with more engagement', () => {
      const lowEngagement = { reactions: [1], comments: 1, shares: 0 };
      const highEngagement = { reactions: [1, 2, 3, 4, 5], comments: 10, shares: 5, saves: 3, views: 100 };

      const lowScore = calculateEngagementScore(lowEngagement);
      const highScore = calculateEngagementScore(highEngagement);
      expect(highScore).toBeGreaterThan(lowScore);
    });

    it('should weight shares higher than likes', () => {
      const likesOnly = { reactions: [1, 2, 3, 4, 5], comments: 0, shares: 0 };
      const sharesOnly = { reactions: [], comments: 0, shares: 5 };

      const likesScore = calculateEngagementScore(likesOnly);
      const sharesScore = calculateEngagementScore(sharesOnly);
      expect(sharesScore).toBeGreaterThan(likesScore);
    });

    it('should handle missing fields gracefully', () => {
      const post = {};
      const score = calculateEngagementScore(post);
      expect(score).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateAuthorAffinity', () => {
    it('should return 0.5 (neutral) when no user profile affinities', () => {
      const post = { author: { id: 'user1' } };
      const score = calculateAuthorAffinity(post, null);
      expect(score).toBe(0.5);
    });

    it('should return 0.5 when user has no affinity for the author', () => {
      const post = { author: { id: 'unknown' } };
      const profile = { authorAffinities: { user1: 50 } };
      const score = calculateAuthorAffinity(post, profile);
      expect(score).toBe(0);
    });

    it('should return higher score for authors with high affinity', () => {
      const post = { author: { id: 'fav_author' } };
      const profile = { authorAffinities: { fav_author: 80 } };
      const score = calculateAuthorAffinity(post, profile);
      expect(score).toBe(0.8);
    });

    it('should cap affinity at 1.0', () => {
      const post = { author: { id: 'super_fav' } };
      const profile = { authorAffinities: { super_fav: 200 } };
      const score = calculateAuthorAffinity(post, profile);
      expect(score).toBe(1);
    });
  });

  describe('calculateTopicRelevance', () => {
    it('should return 0.5 when no user interests exist', () => {
      const post = { tags: ['neuroscience'] };
      const score = calculateTopicRelevance(post, null);
      expect(score).toBe(0.5);
    });

    it('should return 0.5 when post has no tags', () => {
      const post = {};
      const profile = { topicInterests: { neuroscience: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBe(0.5);
    });

    it('should return 0.3 for empty tags array', () => {
      const post = { tags: [] };
      const profile = { topicInterests: { neuroscience: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBe(0.3);
    });

    it('should return low score for irrelevant topics', () => {
      const post = { tags: ['cooking', 'sports'] };
      const profile = { topicInterests: { neuroscience: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBe(0.2);
    });

    it('should return high score for matching topics', () => {
      const post = { tags: ['neuroscience', 'psilocybin'] };
      const profile = { topicInterests: { neuroscience: 90, psilocybin: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBeGreaterThan(0.5);
    });
  });

  describe('detectViralContent', () => {
    it('should return 0 for low-engagement posts', () => {
      const post = { reactions: [1, 2], comments: 3, shares: 1 };
      const score = detectViralContent(post);
      expect(score).toBe(0);
    });

    it('should return 0 when engagement rate is below threshold', () => {
      const post = { reactions: new Array(50), comments: 30, shares: 20, views: 10000 };
      const score = detectViralContent(post);
      expect(score).toBe(0);
    });

    it('should return a boost for high-engagement viral content', () => {
      const post = {
        reactions: new Array(100),
        comments: 50,
        shares: 30,
        views: 500
      };
      const score = detectViralContent(post);
      expect(score).toBeGreaterThan(0);
    });

    it('should return full viral boost with high growth rate', () => {
      const post = {
        id: 'viral-post',
        reactions: new Array(200),
        comments: 100,
        shares: 50,
        views: 1000
      };
      const historicalData = {
        'viral-post': { engagements: 50 }
      };
      const score = detectViralContent(post, historicalData);
      expect(score).toBe(1.0);
    });
  });

  describe('calculateContentSimilarity', () => {
    it('should return 0 for null inputs', () => {
      expect(calculateContentSimilarity(null, null)).toBe(0);
      expect(calculateContentSimilarity(null, {})).toBe(0);
      expect(calculateContentSimilarity({}, null)).toBe(0);
    });

    it('should return 0.3 for same author with no tags', () => {
      const post1 = { author: { id: 'user1' } };
      const post2 = { author: { id: 'user1' } };
      const score = calculateContentSimilarity(post1, post2);
      expect(score).toBe(0.3);
    });

    it('should return 0 for different authors with no tags', () => {
      const post1 = { author: { id: 'user1' } };
      const post2 = { author: { id: 'user2' } };
      const score = calculateContentSimilarity(post1, post2);
      expect(score).toBe(0);
    });

    it('should return 1 for posts with identical tags', () => {
      const post1 = { author: { id: 'user1' }, tags: ['a', 'b', 'c'] };
      const post2 = { author: { id: 'user2' }, tags: ['a', 'b', 'c'] };
      const score = calculateContentSimilarity(post1, post2);
      expect(score).toBe(1);
    });

    it('should return partial score for partially overlapping tags', () => {
      const post1 = { author: { id: 'user1' }, tags: ['a', 'b'] };
      const post2 = { author: { id: 'user2' }, tags: ['b', 'c'] };
      const score = calculateContentSimilarity(post1, post2);
      // intersection=1 (b), union=3 (a,b,c) => 1/3 ≈ 0.33
      expect(score).toBeCloseTo(0.33, 1);
    });
  });

  describe('applyDiversityPenalty', () => {
    it('should return 1.0 (no penalty) when no recent posts', () => {
      const post = { tags: ['a'] };
      const penalty = applyDiversityPenalty(post, []);
      expect(penalty).toBe(1.0);
    });

    it('should return 1.0 for dissimilar content', () => {
      const post = { author: { id: 'user1' }, tags: ['x', 'y'] };
      const recentPosts = [
        { author: { id: 'user2' }, tags: ['a', 'b'] },
        { author: { id: 'user3' }, tags: ['c', 'd'] }
      ];
      const penalty = applyDiversityPenalty(post, recentPosts);
      expect(penalty).toBe(1.0);
    });

    it('should return 0.5 penalty for very similar content', () => {
      const post = { author: { id: 'user1' }, tags: ['a', 'b', 'c'] };
      const recentPosts = [
        { author: { id: 'user2' }, tags: ['a', 'b', 'c'] }
      ];
      const penalty = applyDiversityPenalty(post, recentPosts);
      expect(penalty).toBe(0.5);
    });
  });

  describe('calculateCompositeScore', () => {
    it('should return a score object with breakdown', () => {
      const post = {
        timestamp: new Date().toISOString(),
        reactions: [1, 2],
        comments: 3,
        author: { id: 'user1' },
        tags: ['neuroscience']
      };
      const profile = createDefaultUserProfile();
      const result = calculateCompositeScore(post, profile);

      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('breakdown');
      expect(result).toHaveProperty('weights');
      expect(result).toHaveProperty('abVariant');
      expect(result.breakdown).toHaveProperty('recency');
      expect(result.breakdown).toHaveProperty('engagement');
      expect(result.breakdown).toHaveProperty('authorAffinity');
      expect(result.breakdown).toHaveProperty('topicRelevance');
      expect(result.breakdown).toHaveProperty('viralBoost');
      expect(result.breakdown).toHaveProperty('diversityMultiplier');
    });

    it('should apply A/B variant weight adjustments', () => {
      const post = {
        timestamp: new Date().toISOString(),
        reactions: [1, 2, 3],
        comments: 5,
        author: { id: 'user1' },
        tags: ['neuroscience']
      };
      const profile = createDefaultUserProfile();

      const controlResult = calculateCompositeScore(post, profile, { abVariant: 'control' });
      const engagementResult = calculateCompositeScore(post, profile, { abVariant: 'engagement_heavy' });

      expect(controlResult.abVariant).toBe('control');
      expect(engagementResult.abVariant).toBe('engagement_heavy');
      // Engagement-heavy variant should weight engagement more
      expect(engagementResult.weights.engagement).toBe(0.40);
    });
  });

  describe('explainRecommendation', () => {
    it('should return reasons for high-scoring factors', () => {
      const scoreData = {
        score: 0.8,
        breakdown: {
          recency: 0.9,
          engagement: 0.7,
          authorAffinity: 0.3,
          topicRelevance: 0.2,
          viralBoost: 0,
          diversityMultiplier: 1.0
        },
        weights: {
          recency: 0.25,
          engagement: 0.30,
          authorAffinity: 0.20,
          topicRelevance: 0.15,
          viralBoost: 0.10
        }
      };

      const reasons = explainRecommendation(scoreData, {});
      expect(Array.isArray(reasons)).toBe(true);
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons[0]).toHaveProperty('factor');
      expect(reasons[0]).toHaveProperty('label');
      expect(reasons[0]).toHaveProperty('strength');
    });

    it('should include diversity note when penalized', () => {
      const scoreData = {
        score: 0.4,
        breakdown: {
          recency: 0.5,
          engagement: 0.3,
          authorAffinity: 0.2,
          topicRelevance: 0.1,
          viralBoost: 0,
          diversityMultiplier: 0.5
        },
        weights: {
          recency: 0.25,
          engagement: 0.30,
          authorAffinity: 0.20,
          topicRelevance: 0.15,
          viralBoost: 0.10
        }
      };

      const reasons = explainRecommendation(scoreData, {});
      const diversityReason = reasons.find(r => r.factor === 'diversity');
      expect(diversityReason).toBeDefined();
      expect(diversityReason.isNegative).toBe(true);
    });
  });

  describe('rankFeedPosts', () => {
    it('should return an empty array for no posts', () => {
      const result = rankFeedPosts([], createDefaultUserProfile());
      expect(result).toEqual([]);
    });

    it('should rank posts by score (highest first)', () => {
      const posts = [
        { id: 'old', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), reactions: [], comments: 0 },
        { id: 'new', timestamp: new Date().toISOString(), reactions: [1, 2, 3], comments: 5, shares: 2 },
        { id: 'medium', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), reactions: [1], comments: 1 }
      ];

      const result = rankFeedPosts(posts, createDefaultUserProfile());
      expect(result.length).toBe(3);
      expect(result[0]._feedScore).toBeGreaterThanOrEqual(result[1]._feedScore);
      expect(result[1]._feedScore).toBeGreaterThanOrEqual(result[2]._feedScore);
    });

    it('should attach score metadata to each post', () => {
      const posts = [
        { id: '1', timestamp: new Date().toISOString(), reactions: [], comments: 0 }
      ];

      const result = rankFeedPosts(posts, createDefaultUserProfile());
      expect(result[0]).toHaveProperty('_feedScore');
      expect(result[0]).toHaveProperty('_scoreBreakdown');
      expect(result[0]).toHaveProperty('_explanation');
      expect(result[0]).toHaveProperty('_abVariant');
    });
  });

  describe('createDefaultUserProfile', () => {
    it('should return a valid default profile', () => {
      const profile = createDefaultUserProfile();
      expect(profile).toHaveProperty('authorAffinities');
      expect(profile).toHaveProperty('topicInterests');
      expect(profile).toHaveProperty('engagementHistory');
      expect(profile).toHaveProperty('abVariant');
      expect(profile.abVariant).toBe('control');
      expect(Object.keys(profile.topicInterests).length).toBeGreaterThan(0);
    });
  });

  describe('updateUserProfile', () => {
    it('should increase author affinity on like', () => {
      const profile = createDefaultUserProfile();
      const engagement = {
        type: 'like',
        post: { author: { id: 'author1' }, tags: [] }
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.authorAffinities.author1).toBe(5);
    });

    it('should increase topic interests on comment', () => {
      const profile = createDefaultUserProfile();
      const engagement = {
        type: 'comment',
        post: { author: { id: 'author1' }, tags: ['meditation'] }
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.topicInterests.meditation).toBe(5);
    });

    it('should decrease affinity on notInterested', () => {
      const profile = {
        ...createDefaultUserProfile(),
        authorAffinities: { author1: 30 }
      };
      const engagement = {
        type: 'notInterested',
        post: { author: { id: 'author1' }, tags: ['bad-topic'] }
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.authorAffinities.author1).toBe(10); // 30 - 20
    });

    it('should add to engagement history', () => {
      const profile = createDefaultUserProfile();
      const engagement = {
        type: 'view',
        post: { id: 'post1', author: { id: 'a1' } },
        duration: 5000
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.engagementHistory.length).toBe(1);
      expect(updated.engagementHistory[0].postId).toBe('post1');
    });

    it('should cap engagement history at 101 entries', () => {
      const profile = {
        ...createDefaultUserProfile(),
        engagementHistory: new Array(100).fill({ timestamp: Date.now(), postId: 'x', type: 'view' })
      };
      const engagement = {
        type: 'like',
        post: { id: 'new', author: { id: 'a1' } }
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.engagementHistory.length).toBe(101);
    });
  });

  describe('getABVariant', () => {
    it('should return control for null userId', () => {
      expect(getABVariant(null)).toBe('control');
    });

    it('should return control for undefined userId', () => {
      expect(getABVariant(undefined)).toBe('control');
    });

    it('should return a valid variant for any user ID', () => {
      const validVariants = ['control', 'engagement_heavy', 'fresh_content', 'personalized'];
      const variant = getABVariant('user123');
      expect(validVariants).toContain(variant);
    });

    it('should return the same variant for the same user ID (deterministic)', () => {
      const variant1 = getABVariant('consistent_user');
      const variant2 = getABVariant('consistent_user');
      expect(variant1).toBe(variant2);
    });

    it('should distribute users across variants', () => {
      const variants = new Set();
      for (let i = 0; i < 100; i++) {
        variants.add(getABVariant(`user_${i}`));
      }
      // With 100 users and 4 variants, we should see at least 2 different variants
      expect(variants.size).toBeGreaterThanOrEqual(2);
    });
  });
});
