/**
 * Neural Feed Algorithm - ML-powered content discovery system
 *
 * A sophisticated feed ranking algorithm that combines multiple signals
 * to deliver hyper-personalized content while maintaining diversity
 * and transparency.
 *
 * Algorithm Factors:
 * - Recency Score: exponential decay (half-life 24h)
 * - Engagement Score: likes*1 + comments*3 + shares*5 + saves*4
 * - Author Affinity: based on past interactions
 * - Topic Relevance: cosine similarity with user interests
 * - Diversity Penalty: penalize similar consecutive content
 * - Viral Boost: trending content gets temporary boost
 *
 * @version 2.0.0
 * @author GSAPS ML Team
 */

// Configuration constants
const ALGORITHM_CONFIG = {
  // Recency decay - half-life of 24 hours
  RECENCY_HALF_LIFE_MS: 24 * 60 * 60 * 1000,

  // Engagement weights
  ENGAGEMENT_WEIGHTS: {
    likes: 1,
    comments: 3,
    shares: 5,
    saves: 4,
    views: 0.1
  },

  // Score component weights
  SCORE_WEIGHTS: {
    recency: 0.25,
    engagement: 0.30,
    authorAffinity: 0.20,
    topicRelevance: 0.15,
    viralBoost: 0.10
  },

  // Viral detection thresholds
  VIRAL_THRESHOLDS: {
    engagementRate: 0.15, // 15% engagement rate
    minimumEngagements: 100,
    growthRate: 2.0, // 2x growth in last hour
    circuitBreakerLimit: 3 // Max viral posts in feed
  },

  // Diversity settings
  DIVERSITY: {
    similarityThreshold: 0.7, // 70% topic overlap triggers penalty
    consecutivePenalty: 0.5, // Reduce score by 50%
    windowSize: 3 // Check last 3 posts for diversity
  },

  // A/B test variants
  AB_VARIANTS: {
    control: { name: 'control', adjustments: {} },
    engagement_heavy: {
      name: 'engagement_heavy',
      adjustments: { engagement: 0.40, recency: 0.15 }
    },
    fresh_content: {
      name: 'fresh_content',
      adjustments: { recency: 0.40, engagement: 0.20 }
    },
    personalized: {
      name: 'personalized',
      adjustments: { authorAffinity: 0.30, topicRelevance: 0.25 }
    }
  }
};

/**
 * Calculate recency score using exponential decay
 * Score decreases by half every 24 hours
 */
export const calculateRecencyScore = (timestamp) => {
  const now = Date.now();
  const ageMs = now - new Date(timestamp).getTime();
  const halfLife = ALGORITHM_CONFIG.RECENCY_HALF_LIFE_MS;

  // Exponential decay: score = 2^(-age/halfLife)
  return Math.pow(2, -ageMs / halfLife);
};

/**
 * Calculate engagement score based on interaction metrics
 * Weighted sum of likes, comments, shares, and saves
 */
export const calculateEngagementScore = (post) => {
  const { ENGAGEMENT_WEIGHTS } = ALGORITHM_CONFIG;

  const likes = post.reactions?.length || 0;
  const comments = post.comments || 0;
  const shares = post.shares || 0;
  const saves = post.saves || post.isBookmarked ? 1 : 0;
  const views = post.views || 0;

  const rawScore =
    likes * ENGAGEMENT_WEIGHTS.likes +
    comments * ENGAGEMENT_WEIGHTS.comments +
    shares * ENGAGEMENT_WEIGHTS.shares +
    saves * ENGAGEMENT_WEIGHTS.saves +
    views * ENGAGEMENT_WEIGHTS.views;

  // Normalize using log scale to prevent outliers from dominating
  return Math.log1p(rawScore) / 10; // Scale to 0-1 range
};

/**
 * Calculate author affinity based on user's interaction history
 * Higher score for authors the user frequently engages with
 */
export const calculateAuthorAffinity = (post, userProfile) => {
  if (!userProfile?.authorAffinities) return 0.5; // Neutral score

  const authorId = post.author?.id || post.author?.username;
  const affinity = userProfile.authorAffinities[authorId] || 0;

  // Normalize to 0-1 range
  return Math.min(1, affinity / 100);
};

/**
 * Calculate topic relevance using cosine similarity
 * Compares post topics with user's interest profile
 */
export const calculateTopicRelevance = (post, userProfile) => {
  if (!userProfile?.topicInterests || !post.tags) return 0.5; // Neutral score

  const postTopics = new Set(post.tags.map(t => t.toLowerCase()));
  const userTopics = userProfile.topicInterests;

  if (postTopics.size === 0) return 0.3; // Slight penalty for untagged content

  // Calculate intersection and union for Jaccard similarity
  const intersection = [...postTopics].filter(topic =>
    userTopics[topic] > 0
  ).length;

  if (intersection === 0) return 0.2; // Low score for irrelevant topics

  // Weight by user's interest strength
  let weightedScore = 0;
  postTopics.forEach(topic => {
    weightedScore += (userTopics[topic] || 0) / 100;
  });

  return Math.min(1, weightedScore / postTopics.size);
};

/**
 * Detect if content is going viral
 * Returns boost multiplier if viral, 0 otherwise
 */
export const detectViralContent = (post, historicalData = {}) => {
  const { VIRAL_THRESHOLDS } = ALGORITHM_CONFIG;

  const totalEngagements =
    (post.reactions?.length || 0) +
    (post.comments || 0) +
    (post.shares || 0);

  // Must meet minimum engagement threshold
  if (totalEngagements < VIRAL_THRESHOLDS.minimumEngagements) return 0;

  // Calculate engagement rate (engagements per view)
  const views = post.views || totalEngagements * 10; // Estimate if not available
  const engagementRate = totalEngagements / views;

  if (engagementRate < VIRAL_THRESHOLDS.engagementRate) return 0;

  // Check growth rate if historical data available
  if (historicalData[post.id]) {
    const previousEngagements = historicalData[post.id].engagements || 0;
    const growthRate = totalEngagements / Math.max(1, previousEngagements);

    if (growthRate >= VIRAL_THRESHOLDS.growthRate) {
      return 1.0; // Full viral boost
    }
  }

  // Partial boost for high engagement
  return engagementRate / VIRAL_THRESHOLDS.engagementRate * 0.5;
};

/**
 * Calculate content similarity for diversity checks
 * Returns similarity score 0-1 (1 = identical)
 */
export const calculateContentSimilarity = (post1, post2) => {
  if (!post1 || !post2) return 0;

  // Check author similarity
  const sameAuthor = post1.author?.id === post2.author?.id ? 0.3 : 0;

  // Check topic overlap
  const topics1 = new Set(post1.tags || []);
  const topics2 = new Set(post2.tags || []);

  if (topics1.size === 0 || topics2.size === 0) return sameAuthor;

  const intersection = [...topics1].filter(t => topics2.has(t)).length;
  const union = new Set([...topics1, ...topics2]).size;

  const topicSimilarity = union > 0 ? intersection / union : 0;

  return Math.max(sameAuthor, topicSimilarity);
};

/**
 * Apply diversity penalty to prevent filter bubbles
 * Penalizes posts too similar to recent content
 */
export const applyDiversityPenalty = (post, recentPosts) => {
  const { DIVERSITY } = ALGORITHM_CONFIG;
  const checkWindow = recentPosts.slice(-DIVERSITY.windowSize);

  let maxSimilarity = 0;

  for (const recentPost of checkWindow) {
    const similarity = calculateContentSimilarity(post, recentPost);
    maxSimilarity = Math.max(maxSimilarity, similarity);
  }

  // Apply penalty if similarity exceeds threshold
  if (maxSimilarity >= DIVERSITY.similarityThreshold) {
    return DIVERSITY.consecutivePenalty;
  }

  return 1.0; // No penalty
};

/**
 * Calculate composite score for a post
 * Combines all signals with configurable weights
 */
export const calculateCompositeScore = (post, userProfile, context = {}) => {
  const { recentPosts = [], historicalData = {}, abVariant = 'control' } = context;

  // Get weight configuration (possibly adjusted for A/B test)
  const variant = ALGORITHM_CONFIG.AB_VARIANTS[abVariant] || ALGORITHM_CONFIG.AB_VARIANTS.control;
  const weights = {
    ...ALGORITHM_CONFIG.SCORE_WEIGHTS,
    ...variant.adjustments
  };

  // Calculate individual scores
  const recencyScore = calculateRecencyScore(post.timestamp);
  const engagementScore = calculateEngagementScore(post);
  const authorAffinity = calculateAuthorAffinity(post, userProfile);
  const topicRelevance = calculateTopicRelevance(post, userProfile);
  const viralBoost = detectViralContent(post, historicalData);

  // Calculate weighted composite score
  const baseScore =
    recencyScore * weights.recency +
    engagementScore * weights.engagement +
    authorAffinity * weights.authorAffinity +
    topicRelevance * weights.topicRelevance +
    viralBoost * weights.viralBoost;

  // Apply diversity penalty
  const diversityMultiplier = applyDiversityPenalty(post, recentPosts);

  const finalScore = baseScore * diversityMultiplier;

  // Return score with explainability data
  return {
    score: finalScore,
    breakdown: {
      recency: recencyScore,
      engagement: engagementScore,
      authorAffinity,
      topicRelevance,
      viralBoost,
      diversityMultiplier
    },
    weights,
    abVariant: variant.name
  };
};

/**
 * Generate human-readable explanation for why content was recommended
 */
export const explainRecommendation = (scoreData, post) => {
  const { breakdown, weights } = scoreData;
  const reasons = [];

  // Find top contributing factors
  const factors = [
    { name: 'recency', score: breakdown.recency * weights.recency, label: 'Recent content' },
    { name: 'engagement', score: breakdown.engagement * weights.engagement, label: 'High engagement' },
    { name: 'authorAffinity', score: breakdown.authorAffinity * weights.authorAffinity, label: 'Author you follow' },
    { name: 'topicRelevance', score: breakdown.topicRelevance * weights.topicRelevance, label: 'Topics you like' },
    { name: 'viralBoost', score: breakdown.viralBoost * weights.viralBoost, label: 'Trending now' }
  ].sort((a, b) => b.score - a.score);

  // Add top 3 reasons
  factors.slice(0, 3).forEach(factor => {
    if (factor.score > 0.1) {
      reasons.push({
        factor: factor.name,
        label: factor.label,
        strength: factor.score,
        percentage: Math.round(factor.score / scoreData.score * 100)
      });
    }
  });

  // Add diversity note if penalized
  if (breakdown.diversityMultiplier < 1.0) {
    reasons.push({
      factor: 'diversity',
      label: 'Similar to recent posts',
      strength: 1 - breakdown.diversityMultiplier,
      percentage: Math.round((1 - breakdown.diversityMultiplier) * 100),
      isNegative: true
    });
  }

  return reasons;
};

/**
 * Rank and sort posts using the neural feed algorithm
 * Main entry point for feed generation
 */
export const rankFeedPosts = (posts, userProfile, options = {}) => {
  const {
    abVariant = 'control',
    applyViralCircuitBreaker = true,
    historicalData = {}
  } = options;

  const recentPosts = [];
  let viralCount = 0;

  // Score all posts
  const scoredPosts = posts.map(post => {
    const scoreData = calculateCompositeScore(post, userProfile, {
      recentPosts,
      historicalData,
      abVariant
    });

    // Circuit breaker: limit viral content
    if (applyViralCircuitBreaker && scoreData.breakdown.viralBoost > 0.5) {
      if (viralCount >= ALGORITHM_CONFIG.VIRAL_THRESHOLDS.circuitBreakerLimit) {
        scoreData.score *= 0.5; // Reduce score for excess viral content
        scoreData.breakdown.viralBoost = 0;
      } else {
        viralCount++;
      }
    }

    return {
      ...post,
      _feedScore: scoreData.score,
      _scoreBreakdown: scoreData.breakdown,
      _scoreWeights: scoreData.weights,
      _explanation: explainRecommendation(scoreData, post),
      _abVariant: scoreData.abVariant
    };
  });

  // Sort by score (highest first)
  const rankedPosts = scoredPosts.sort((a, b) => b._feedScore - a._feedScore);

  // Track posts for diversity in next iteration
  rankedPosts.forEach(post => recentPosts.push(post));

  return rankedPosts;
};

/**
 * Create default user profile for new users
 */
export const createDefaultUserProfile = () => ({
  authorAffinities: {},
  topicInterests: {
    research: 50,
    clinical: 50,
    psilocybin: 50,
    neuroscience: 50
  },
  engagementHistory: [],
  abVariant: 'control'
});

/**
 * Update user profile based on engagement
 * Implicit signal learning
 */
export const updateUserProfile = (userProfile, engagement) => {
  const { type, post, duration } = engagement;

  const updated = { ...userProfile };

  // Update author affinity
  const authorId = post.author?.id || post.author?.username;
  if (authorId) {
    updated.authorAffinities = {
      ...updated.authorAffinities,
      [authorId]: (updated.authorAffinities[authorId] || 0) + getAffinityDelta(type, duration)
    };
  }

  // Update topic interests
  if (post.tags) {
    updated.topicInterests = { ...updated.topicInterests };
    post.tags.forEach(topic => {
      const current = updated.topicInterests[topic] || 0;
      updated.topicInterests[topic] = Math.min(100, current + getTopicDelta(type, duration));
    });
  }

  // Add to engagement history
  updated.engagementHistory = [
    ...(updated.engagementHistory || []).slice(-100), // Keep last 100
    {
      timestamp: Date.now(),
      postId: post.id,
      type,
      duration
    }
  ];

  return updated;
};

/**
 * Calculate affinity delta based on engagement type
 */
const getAffinityDelta = (type, duration = 0) => {
  const deltas = {
    view: duration > 3000 ? 2 : 1, // Long view = more interest
    like: 5,
    comment: 10,
    share: 15,
    save: 12,
    notInterested: -20
  };

  return deltas[type] || 0;
};

/**
 * Calculate topic interest delta based on engagement
 */
const getTopicDelta = (type, duration = 0) => {
  const deltas = {
    view: duration > 3000 ? 1 : 0.5,
    like: 3,
    comment: 5,
    share: 8,
    save: 6,
    notInterested: -10
  };

  return deltas[type] || 0;
};

/**
 * Get A/B test variant for user
 * Simple deterministic assignment based on user ID
 */
export const getABVariant = (userId) => {
  if (!userId) return 'control';

  const variants = Object.keys(ALGORITHM_CONFIG.AB_VARIANTS);
  const hash = userId.toString().split('').reduce((acc, char) =>
    acc + char.charCodeAt(0), 0
  );

  return variants[hash % variants.length];
};

const neuralFeed = {
  rankFeedPosts,
  calculateCompositeScore,
  explainRecommendation,
  createDefaultUserProfile,
  updateUserProfile,
  getABVariant,
  ALGORITHM_CONFIG
};

export default neuralFeed;
