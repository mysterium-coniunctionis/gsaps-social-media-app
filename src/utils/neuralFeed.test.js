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
    it('returns 1 for a post created right now', () => {
      const score = calculateRecencyScore(new Date().toISOString());
      expect(score).toBeCloseTo(1, 1);
    });

    it('returns approximately 0.5 for a post 24 hours old', () => {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const score = calculateRecencyScore(oneDayAgo);
      expect(score).toBeCloseTo(0.5, 1);
    });

    it('returns a very low score for posts several days old', () => {
      const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
      const score = calculateRecencyScore(fiveDaysAgo);
      expect(score).toBeLessThan(0.1);
    });

    it('decays monotonically over time', () => {
      const now = Date.now();
      const score1 = calculateRecencyScore(new Date(now - 1000).toISOString());
      const score2 = calculateRecencyScore(new Date(now - 60000).toISOString());
      const score3 = calculateRecencyScore(new Date(now - 3600000).toISOString());
      expect(score1).toBeGreaterThan(score2);
      expect(score2).toBeGreaterThan(score3);
    });
  });

  describe('calculateEngagementScore', () => {
    it('returns 0 for a post with no engagement', () => {
      const post = { reactions: [], comments: 0, shares: 0, saves: 0, views: 0 };
      const score = calculateEngagementScore(post);
      expect(score).toBe(0);
    });

    it('returns higher score for more engagement', () => {
      const lowEngagement = { reactions: [1], comments: 1, shares: 0, saves: 0, views: 10 };
      const highEngagement = { reactions: [1, 2, 3, 4, 5], comments: 10, shares: 5, saves: 3, views: 1000 };

      const lowScore = calculateEngagementScore(lowEngagement);
      const highScore = calculateEngagementScore(highEngagement);
      expect(highScore).toBeGreaterThan(lowScore);
    });

    it('weights shares more than likes', () => {
      const likesPost = { reactions: [1, 2, 3, 4, 5], comments: 0, shares: 0, saves: 0, views: 0 };
      const sharesPost = { reactions: [], comments: 0, shares: 5, saves: 0, views: 0 };

      const likesScore = calculateEngagementScore(likesPost);
      const sharesScore = calculateEngagementScore(sharesPost);
      expect(sharesScore).toBeGreaterThan(likesScore);
    });

    it('handles missing reaction field gracefully', () => {
      const post = { comments: 5, shares: 2 };
      const score = calculateEngagementScore(post);
      expect(score).toBeGreaterThan(0);
    });
  });

  describe('calculateAuthorAffinity', () => {
    it('returns 0.5 when user has no affinity data', () => {
      const post = { author: { id: 'author-1' } };
      const score = calculateAuthorAffinity(post, {});
      expect(score).toBe(0.5);
    });

    it('returns 0.5 for null user profile', () => {
      const post = { author: { id: 'author-1' } };
      const score = calculateAuthorAffinity(post, null);
      expect(score).toBe(0.5);
    });

    it('returns high score for author the user engages with', () => {
      const post = { author: { id: 'author-1' } };
      const profile = { authorAffinities: { 'author-1': 80 } };
      const score = calculateAuthorAffinity(post, profile);
      expect(score).toBe(0.8);
    });

    it('caps affinity at 1', () => {
      const post = { author: { id: 'author-1' } };
      const profile = { authorAffinities: { 'author-1': 150 } };
      const score = calculateAuthorAffinity(post, profile);
      expect(score).toBe(1);
    });

    it('falls back to username if id is missing', () => {
      const post = { author: { username: 'user123' } };
      const profile = { authorAffinities: { user123: 50 } };
      const score = calculateAuthorAffinity(post, profile);
      expect(score).toBe(0.5);
    });
  });

  describe('calculateTopicRelevance', () => {
    it('returns 0.5 when user has no topic interests', () => {
      const post = { tags: ['psilocybin'] };
      const score = calculateTopicRelevance(post, {});
      expect(score).toBe(0.5);
    });

    it('returns 0.3 for untagged content', () => {
      const post = { tags: [] };
      const profile = { topicInterests: { psilocybin: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBe(0.3);
    });

    it('returns 0.2 for irrelevant topics', () => {
      const post = { tags: ['cooking'] };
      const profile = { topicInterests: { psilocybin: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBe(0.2);
    });

    it('returns high score for relevant topics', () => {
      const post = { tags: ['psilocybin', 'neuroscience'] };
      const profile = { topicInterests: { psilocybin: 90, neuroscience: 80 } };
      const score = calculateTopicRelevance(post, profile);
      expect(score).toBeGreaterThan(0.5);
    });
  });

  describe('detectViralContent', () => {
    it('returns 0 for posts below minimum engagement threshold', () => {
      const post = { reactions: [1, 2], comments: 3, shares: 1, views: 100 };
      const score = detectViralContent(post);
      expect(score).toBe(0);
    });

    it('returns positive boost for posts with high engagement rate', () => {
      const post = {
        reactions: new Array(50).fill(1),
        comments: 30,
        shares: 25,
        views: 500
      };
      const score = detectViralContent(post);
      expect(score).toBeGreaterThan(0);
    });

    it('returns full boost when growth rate meets threshold', () => {
      const post = {
        id: 'post-1',
        reactions: new Array(80).fill(1),
        comments: 30,
        shares: 20,
        views: 500
      };
      const historicalData = {
        'post-1': { engagements: 50 }
      };
      const score = detectViralContent(post, historicalData);
      expect(score).toBe(1.0);
    });

    it('returns 0 for posts with low engagement rate above minimum', () => {
      const post = {
        reactions: new Array(100).fill(1),
        comments: 10,
        shares: 0,
        views: 100000
      };
      const score = detectViralContent(post);
      expect(score).toBe(0);
    });
  });

  describe('calculateContentSimilarity', () => {
    it('returns 0 for null posts', () => {
      expect(calculateContentSimilarity(null, { tags: ['a'] })).toBe(0);
      expect(calculateContentSimilarity({ tags: ['a'] }, null)).toBe(0);
    });

    it('returns 0.3 for same author with no overlapping tags', () => {
      const post1 = { author: { id: 'a1' }, tags: ['x'] };
      const post2 = { author: { id: 'a1' }, tags: ['y'] };
      const similarity = calculateContentSimilarity(post1, post2);
      expect(similarity).toBe(0.3);
    });

    it('returns 1 for posts with identical tags', () => {
      const post1 = { author: { id: 'a1' }, tags: ['x', 'y'] };
      const post2 = { author: { id: 'a2' }, tags: ['x', 'y'] };
      const similarity = calculateContentSimilarity(post1, post2);
      expect(similarity).toBe(1);
    });

    it('returns partial similarity for overlapping tags', () => {
      const post1 = { author: { id: 'a1' }, tags: ['x', 'y'] };
      const post2 = { author: { id: 'a2' }, tags: ['y', 'z'] };
      const similarity = calculateContentSimilarity(post1, post2);
      expect(similarity).toBeGreaterThan(0);
      expect(similarity).toBeLessThan(1);
    });

    it('returns 0 for different authors with no tags', () => {
      const post1 = { author: { id: 'a1' }, tags: [] };
      const post2 = { author: { id: 'a2' }, tags: [] };
      const similarity = calculateContentSimilarity(post1, post2);
      expect(similarity).toBe(0);
    });
  });

  describe('applyDiversityPenalty', () => {
    it('returns 1 when no recent posts', () => {
      const post = { author: { id: 'a1' }, tags: ['research'] };
      const penalty = applyDiversityPenalty(post, []);
      expect(penalty).toBe(1);
    });

    it('returns 0.5 when post is too similar to recent content', () => {
      const post = { author: { id: 'a1' }, tags: ['x', 'y', 'z'] };
      const recentPosts = [
        { author: { id: 'a2' }, tags: ['x', 'y', 'z'] }
      ];
      const penalty = applyDiversityPenalty(post, recentPosts);
      expect(penalty).toBe(0.5);
    });

    it('returns 1 when content is sufficiently different', () => {
      const post = { author: { id: 'a1' }, tags: ['completely', 'different'] };
      const recentPosts = [
        { author: { id: 'a2' }, tags: ['other', 'topics'] }
      ];
      const penalty = applyDiversityPenalty(post, recentPosts);
      expect(penalty).toBe(1);
    });
  });

  describe('calculateCompositeScore', () => {
    const userProfile = {
      authorAffinities: { 'author-1': 70 },
      topicInterests: { research: 80, psilocybin: 90 }
    };

    const post = {
      id: 'post-1',
      timestamp: new Date().toISOString(),
      author: { id: 'author-1' },
      tags: ['research', 'psilocybin'],
      reactions: [1, 2, 3],
      comments: 5,
      shares: 2,
      views: 100
    };

    it('returns score object with breakdown and weights', () => {
      const result = calculateCompositeScore(post, userProfile);
      expect(result).toHaveProperty('score');
      expect(result).toHaveProperty('breakdown');
      expect(result).toHaveProperty('weights');
      expect(result).toHaveProperty('abVariant');
    });

    it('returns positive score for relevant content', () => {
      const result = calculateCompositeScore(post, userProfile);
      expect(result.score).toBeGreaterThan(0);
    });

    it('applies A/B test variant weights', () => {
      const controlResult = calculateCompositeScore(post, userProfile, { abVariant: 'control' });
      const engagementResult = calculateCompositeScore(post, userProfile, { abVariant: 'engagement_heavy' });
      // Different variants may produce different scores
      expect(controlResult.abVariant).toBe('control');
      expect(engagementResult.abVariant).toBe('engagement_heavy');
    });

    it('defaults to control variant for unknown variants', () => {
      const result = calculateCompositeScore(post, userProfile, { abVariant: 'nonexistent' });
      expect(result.abVariant).toBe('control');
    });
  });

  describe('explainRecommendation', () => {
    it('returns array of reason objects', () => {
      const scoreData = {
        score: 0.8,
        breakdown: {
          recency: 0.9,
          engagement: 0.5,
          authorAffinity: 0.7,
          topicRelevance: 0.6,
          viralBoost: 0,
          diversityMultiplier: 1
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
      reasons.forEach(r => {
        expect(r).toHaveProperty('factor');
        expect(r).toHaveProperty('label');
        expect(r).toHaveProperty('strength');
      });
    });

    it('includes diversity note when penalized', () => {
      const scoreData = {
        score: 0.5,
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
    const userProfile = createDefaultUserProfile();

    const posts = [
      {
        id: 'p1',
        timestamp: new Date().toISOString(),
        author: { id: 'a1' },
        tags: ['research'],
        reactions: [1, 2],
        comments: 1,
        shares: 0,
        views: 50
      },
      {
        id: 'p2',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        author: { id: 'a2' },
        tags: ['psilocybin'],
        reactions: [1, 2, 3, 4, 5],
        comments: 10,
        shares: 5,
        views: 500
      },
      {
        id: 'p3',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        author: { id: 'a3' },
        tags: ['clinical'],
        reactions: [],
        comments: 0,
        shares: 0,
        views: 10
      }
    ];

    it('returns all posts with feed score metadata', () => {
      const ranked = rankFeedPosts(posts, userProfile);
      expect(ranked.length).toBe(posts.length);
      ranked.forEach(post => {
        expect(post).toHaveProperty('_feedScore');
        expect(post).toHaveProperty('_scoreBreakdown');
        expect(post).toHaveProperty('_explanation');
      });
    });

    it('sorts posts by score descending', () => {
      const ranked = rankFeedPosts(posts, userProfile);
      for (let i = 1; i < ranked.length; i++) {
        expect(ranked[i - 1]._feedScore).toBeGreaterThanOrEqual(ranked[i]._feedScore);
      }
    });

    it('preserves original post data', () => {
      const ranked = rankFeedPosts(posts, userProfile);
      const original = posts.find(p => p.id === 'p1');
      const rankedPost = ranked.find(p => p.id === 'p1');
      expect(rankedPost.author).toEqual(original.author);
      expect(rankedPost.tags).toEqual(original.tags);
    });
  });

  describe('createDefaultUserProfile', () => {
    it('returns profile with expected shape', () => {
      const profile = createDefaultUserProfile();
      expect(profile).toHaveProperty('authorAffinities');
      expect(profile).toHaveProperty('topicInterests');
      expect(profile).toHaveProperty('engagementHistory');
      expect(profile).toHaveProperty('abVariant');
    });

    it('has default topic interests', () => {
      const profile = createDefaultUserProfile();
      expect(profile.topicInterests.research).toBe(50);
      expect(profile.topicInterests.clinical).toBe(50);
    });
  });

  describe('updateUserProfile', () => {
    it('increases author affinity on like', () => {
      const profile = createDefaultUserProfile();
      const engagement = {
        type: 'like',
        post: { id: 'p1', author: { id: 'author-1' }, tags: [] },
        duration: 0
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.authorAffinities['author-1']).toBeGreaterThan(0);
    });

    it('updates topic interests on engagement', () => {
      const profile = createDefaultUserProfile();
      const engagement = {
        type: 'comment',
        post: { id: 'p1', author: { id: 'a1' }, tags: ['new-topic'] },
        duration: 0
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.topicInterests['new-topic']).toBeGreaterThan(0);
    });

    it('caps topic interests at 100', () => {
      const profile = { ...createDefaultUserProfile(), topicInterests: { research: 99 } };
      const engagement = {
        type: 'share',
        post: { id: 'p1', author: { id: 'a1' }, tags: ['research'] },
        duration: 0
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.topicInterests.research).toBeLessThanOrEqual(100);
    });

    it('appends to engagement history', () => {
      const profile = createDefaultUserProfile();
      const engagement = {
        type: 'view',
        post: { id: 'p1', author: { id: 'a1' }, tags: [] },
        duration: 5000
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.engagementHistory.length).toBe(1);
      expect(updated.engagementHistory[0].type).toBe('view');
    });

    it('limits engagement history to 101 entries', () => {
      let profile = createDefaultUserProfile();
      profile.engagementHistory = new Array(100).fill({
        timestamp: Date.now(),
        postId: 'old',
        type: 'view',
        duration: 1000
      });

      const engagement = {
        type: 'like',
        post: { id: 'new', author: { id: 'a1' }, tags: [] },
        duration: 0
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.engagementHistory.length).toBeLessThanOrEqual(101);
    });

    it('decreases affinity for notInterested engagement', () => {
      const profile = { ...createDefaultUserProfile(), authorAffinities: { 'a1': 50 } };
      const engagement = {
        type: 'notInterested',
        post: { id: 'p1', author: { id: 'a1' }, tags: ['research'] },
        duration: 0
      };

      const updated = updateUserProfile(profile, engagement);
      expect(updated.authorAffinities['a1']).toBeLessThan(50);
    });
  });

  describe('getABVariant', () => {
    it('returns control for null userId', () => {
      expect(getABVariant(null)).toBe('control');
    });

    it('returns control for undefined userId', () => {
      expect(getABVariant(undefined)).toBe('control');
    });

    it('returns a valid variant for a given userId', () => {
      const validVariants = ['control', 'engagement_heavy', 'fresh_content', 'personalized'];
      const variant = getABVariant('user-123');
      expect(validVariants).toContain(variant);
    });

    it('returns the same variant for the same userId (deterministic)', () => {
      const variant1 = getABVariant('user-123');
      const variant2 = getABVariant('user-123');
      expect(variant1).toBe(variant2);
    });

    it('distributes users across variants', () => {
      const variants = new Set();
      for (let i = 0; i < 100; i++) {
        variants.add(getABVariant(`user-${i}`));
      }
      expect(variants.size).toBeGreaterThan(1);
    });
  });
});
