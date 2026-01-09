import { useState, useEffect, useCallback, useRef } from 'react';
import {
  rankFeedPosts,
  createDefaultUserProfile,
  updateUserProfile,
  getABVariant
} from '../utils/neuralFeed';

/**
 * useFeedAlgorithm - Custom hook for ML-powered feed management
 *
 * Manages feed state, pagination, engagement tracking, and content caching
 * Integrates with the neural feed algorithm for personalized content delivery
 *
 * @param {Array} rawPosts - Unranked posts from API/mock data
 * @param {Object} options - Configuration options
 * @returns {Object} Feed state and control functions
 */
const useFeedAlgorithm = (rawPosts = [], options = {}) => {
  const {
    userId = 'current-user',
    pageSize = 10,
    enableTracking = true,
    persistProfile = true,
    abTestEnabled = true
  } = options;

  // State management
  const [userProfile, setUserProfile] = useState(() => {
    if (persistProfile) {
      const stored = localStorage.getItem(`feedProfile_${userId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.warn('Failed to parse stored profile:', e);
        }
      }
    }
    return createDefaultUserProfile();
  });

  const [rankedPosts, setRankedPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [historicalData, setHistoricalData] = useState({});
  const [abVariant, setAbVariant] = useState('control');

  // Refs for tracking
  const viewTimers = useRef({});
  const engagementQueue = useRef([]);
  const lastRankTime = useRef(Date.now());

  /**
   * Initialize A/B test variant
   */
  useEffect(() => {
    if (abTestEnabled) {
      const variant = getABVariant(userId);
      setAbVariant(variant);
    }
  }, [userId, abTestEnabled]);

  /**
   * Rank posts when raw posts change or profile updates
   */
  useEffect(() => {
    if (rawPosts.length === 0) {
      setRankedPosts([]);
      setDisplayedPosts([]);
      setHasMore(false);
      return;
    }

    setIsLoading(true);

    // Simulate async ranking (can be replaced with worker thread)
    const rankingTimeout = setTimeout(() => {
      const ranked = rankFeedPosts(rawPosts, userProfile, {
        abVariant,
        applyViralCircuitBreaker: true,
        historicalData
      });

      setRankedPosts(ranked);
      setDisplayedPosts(ranked.slice(0, pageSize));
      setCurrentPage(1);
      setHasMore(ranked.length > pageSize);
      lastRankTime.current = Date.now();
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(rankingTimeout);
  }, [rawPosts, userProfile, abVariant, historicalData, pageSize]);

  /**
   * Persist user profile to localStorage
   */
  useEffect(() => {
    if (persistProfile) {
      try {
        localStorage.setItem(`feedProfile_${userId}`, JSON.stringify(userProfile));
      } catch (e) {
        console.warn('Failed to persist profile:', e);
      }
    }
  }, [userProfile, userId, persistProfile]);

  /**
   * Process engagement queue periodically
   */
  useEffect(() => {
    if (!enableTracking) return;

    const interval = setInterval(() => {
      if (engagementQueue.current.length > 0) {
        const engagements = [...engagementQueue.current];
        engagementQueue.current = [];

        // Batch update profile
        let updatedProfile = userProfile;
        engagements.forEach(engagement => {
          updatedProfile = updateUserProfile(updatedProfile, engagement);
        });

        setUserProfile(updatedProfile);
      }
    }, 2000); // Process every 2 seconds

    return () => clearInterval(interval);
  }, [userProfile, enableTracking]);

  /**
   * Load more posts (pagination)
   */
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate async loading
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIdx = (nextPage - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const nextPosts = rankedPosts.slice(startIdx, endIdx);

      if (nextPosts.length > 0) {
        setDisplayedPosts(prev => [...prev, ...nextPosts]);
        setCurrentPage(nextPage);
        setHasMore(endIdx < rankedPosts.length);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    }, 300);
  }, [currentPage, rankedPosts, pageSize, isLoading, hasMore]);

  /**
   * Track post view
   */
  const trackView = useCallback((postId) => {
    if (!enableTracking) return;

    // Start timer for view duration
    viewTimers.current[postId] = Date.now();
  }, [enableTracking]);

  /**
   * Track post view end (calculate duration)
   */
  const trackViewEnd = useCallback((postId) => {
    if (!enableTracking || !viewTimers.current[postId]) return;

    const duration = Date.now() - viewTimers.current[postId];
    delete viewTimers.current[postId];

    // Only track views longer than 500ms (meaningful engagement)
    if (duration > 500) {
      const post = rankedPosts.find(p => p.id === postId);
      if (post) {
        engagementQueue.current.push({
          type: 'view',
          post,
          duration
        });
      }
    }
  }, [rankedPosts, enableTracking]);

  /**
   * Track scroll depth
   */
  const trackScrollDepth = useCallback((postId, depth) => {
    if (!enableTracking || depth < 0.5) return; // Only track >50% scroll

    const post = rankedPosts.find(p => p.id === postId);
    if (post && depth > 0.8) { // Deep scroll = high interest
      engagementQueue.current.push({
        type: 'view',
        post,
        duration: 5000 // Treat as extended view
      });
    }
  }, [rankedPosts, enableTracking]);

  /**
   * Track engagement (like, comment, share, save)
   */
  const trackEngagement = useCallback((postId, engagementType) => {
    if (!enableTracking) return;

    const post = rankedPosts.find(p => p.id === postId);
    if (!post) return;

    engagementQueue.current.push({
      type: engagementType,
      post,
      duration: 0
    });

    // Update historical data for viral detection
    setHistoricalData(prev => ({
      ...prev,
      [postId]: {
        engagements: (post.reactions?.length || 0) + (post.comments || 0) + (post.shares || 0),
        timestamp: Date.now()
      }
    }));
  }, [rankedPosts, enableTracking]);

  /**
   * Mark content as "not interested"
   */
  const markNotInterested = useCallback((postId) => {
    const post = rankedPosts.find(p => p.id === postId);
    if (!post) return;

    // Strong negative signal
    engagementQueue.current.push({
      type: 'notInterested',
      post,
      duration: 0
    });

    // Immediately remove from displayed posts
    setDisplayedPosts(prev => prev.filter(p => p.id !== postId));
  }, [rankedPosts]);

  /**
   * Refresh feed (re-rank with current profile)
   */
  const refreshFeed = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      const ranked = rankFeedPosts(rawPosts, userProfile, {
        abVariant,
        applyViralCircuitBreaker: true,
        historicalData
      });

      setRankedPosts(ranked);
      setDisplayedPosts(ranked.slice(0, pageSize));
      setCurrentPage(1);
      setHasMore(ranked.length > pageSize);
      lastRankTime.current = Date.now();
      setIsLoading(false);
    }, 500);
  }, [rawPosts, userProfile, abVariant, historicalData, pageSize]);

  /**
   * Reset user profile (for testing/debugging)
   */
  const resetProfile = useCallback(() => {
    const newProfile = createDefaultUserProfile();
    setUserProfile(newProfile);
    if (persistProfile) {
      localStorage.removeItem(`feedProfile_${userId}`);
    }
  }, [userId, persistProfile]);

  /**
   * Update topic interests manually
   */
  const updateTopicInterests = useCallback((topicUpdates) => {
    setUserProfile(prev => ({
      ...prev,
      topicInterests: {
        ...prev.topicInterests,
        ...topicUpdates
      }
    }));
  }, []);

  /**
   * Get cached post score (for UI display)
   */
  const getPostScore = useCallback((postId) => {
    const post = rankedPosts.find(p => p.id === postId);
    return post?._feedScore || 0;
  }, [rankedPosts]);

  /**
   * Get post explanation (for transparency)
   */
  const getPostExplanation = useCallback((postId) => {
    const post = rankedPosts.find(p => p.id === postId);
    return post?._explanation || [];
  }, [rankedPosts]);

  /**
   * Prefetch next page (for smart prefetching)
   */
  const prefetchNextPage = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIdx = (nextPage - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    return rankedPosts.slice(startIdx, endIdx);
  }, [currentPage, pageSize, rankedPosts]);

  return {
    // State
    posts: displayedPosts,
    isLoading,
    hasMore,
    currentPage,
    userProfile,
    abVariant,

    // Actions
    loadMore,
    refreshFeed,
    resetProfile,
    updateTopicInterests,

    // Tracking
    trackView,
    trackViewEnd,
    trackScrollDepth,
    trackEngagement,
    markNotInterested,

    // Utilities
    getPostScore,
    getPostExplanation,
    prefetchNextPage,

    // Stats (for debugging/analytics)
    stats: {
      totalPosts: rankedPosts.length,
      displayedCount: displayedPosts.length,
      lastRankTime: lastRankTime.current,
      engagementQueueSize: engagementQueue.current.length,
      authorAffinityCount: Object.keys(userProfile.authorAffinities || {}).length,
      topicInterestCount: Object.keys(userProfile.topicInterests || {}).length
    }
  };
};

export default useFeedAlgorithm;
