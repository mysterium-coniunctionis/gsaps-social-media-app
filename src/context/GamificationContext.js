import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

/**
 * XP Actions and their point values
 */
export const XP_ACTIONS = {
  // Posts & Content
  CREATE_POST: 10,
  POST_WITH_IMAGE: 15,
  POST_WITH_TAGS: 5,
  RECEIVE_REACTION: 2,
  RECEIVE_COMMENT: 3,
  MENTION_USER: 3,

  // Comments & Engagement
  COMMENT: 5,
  REPLY_TO_COMMENT: 3,
  RECEIVE_COMMENT_REACTION: 1,

  // Research Library
  UPLOAD_PAPER: 50,
  RATE_PAPER: 5,
  REVIEW_PAPER: 15,
  DISCUSS_PAPER: 10,
  CITE_PAPER: 3,
  BOOKMARK_PAPER: 2,

  // Courses
  CREATE_COURSE: 100,
  ENROLL_COURSE: 10,
  COMPLETE_LESSON: 20,
  COMPLETE_MODULE: 50,
  COMPLETE_COURSE: 150,
  PASS_QUIZ: 30,
  ACHIEVE_100_QUIZ: 50,
  REVIEW_COURSE: 15,

  // Social
  FOLLOW_USER: 2,
  GAIN_FOLLOWER: 5,
  JOIN_GROUP: 5,
  ATTEND_EVENT: 10,
  SEND_MESSAGE: 1,

  // Daily Activities
  DAILY_LOGIN: 5,
  WEEKLY_STREAK: 20,
  MONTHLY_STREAK: 100,

  // Special
  FIRST_POST: 25,
  FIRST_PAPER: 75,
  FIRST_COURSE: 150,
  HELP_NEW_USER: 30,
  REACH_LEVEL_MILESTONE: 200
};

/**
 * Level thresholds - XP required for each level
 */
const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1900,   // Level 7
  2600,   // Level 8
  3400,   // Level 9
  4300,   // Level 10
  5300,   // Level 11
  6400,   // Level 12
  7600,   // Level 13
  8900,   // Level 14
  10300,  // Level 15
  11800,  // Level 16
  13400,  // Level 17
  15100,  // Level 18
  16900,  // Level 19
  18800,  // Level 20
  21000,  // Level 21
  23500,  // Level 22
  26300,  // Level 23
  29400,  // Level 24
  32800,  // Level 25
  36500,  // Level 26
  40500,  // Level 27
  44800,  // Level 28
  49400,  // Level 29
  54300,  // Level 30
  59500,  // Level 31
  65000,  // Level 32
  70800,  // Level 33
  76900,  // Level 34
  83300,  // Level 35
  90000,  // Level 36
  97000,  // Level 37
  104300, // Level 38
  111900, // Level 39
  119800, // Level 40
  128000, // Level 41
  136500, // Level 42
  145300, // Level 43
  154400, // Level 44
  163800, // Level 45
  173500, // Level 46
  183500, // Level 47
  193800, // Level 48
  204400, // Level 49
  215300  // Level 50 (max)
];

/**
 * Rank names based on level
 */
const RANKS = {
  1: { name: 'Novice', color: '#9e9e9e', icon: '🌱' },
  5: { name: 'Learner', color: '#8bc34a', icon: '📚' },
  10: { name: 'Contributor', color: '#4caf50', icon: '✍️' },
  15: { name: 'Researcher', color: '#00bcd4', icon: '🔬' },
  20: { name: 'Scholar', color: '#2196f3', icon: '🎓' },
  25: { name: 'Expert', color: '#9c27b0', icon: '⭐' },
  30: { name: 'Master', color: '#e91e63', icon: '👑' },
  35: { name: 'Sage', color: '#ff9800', icon: '🧙' },
  40: { name: 'Legend', color: '#ff5722', icon: '🏆' },
  45: { name: 'Mythic', color: '#f44336', icon: '💎' }
};

/**
 * Achievement definitions
 */
export const ACHIEVEMENTS = [
  // First Steps
  {
    id: 'first_post',
    name: 'First Post',
    description: 'Created your first post',
    icon: '📝',
    xp: 25,
    category: 'social'
  },
  {
    id: 'first_paper',
    name: 'Researcher',
    description: 'Uploaded your first research paper',
    icon: '📄',
    xp: 75,
    category: 'research'
  },
  {
    id: 'first_course',
    name: 'Educator',
    description: 'Created your first course',
    icon: '🎓',
    xp: 150,
    category: 'teaching'
  },

  // Engagement
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Received 100 reactions on your posts',
    icon: '🦋',
    xp: 100,
    category: 'social',
    requirement: { type: 'reactions_received', count: 100 }
  },
  {
    id: 'conversation_starter',
    name: 'Conversation Starter',
    description: 'Started 50 discussions',
    icon: '💬',
    xp: 75,
    category: 'social',
    requirement: { type: 'posts_created', count: 50 }
  },
  {
    id: 'helpful_commenter',
    name: 'Helpful Commenter',
    description: 'Left 100 comments',
    icon: '💭',
    xp: 50,
    category: 'social',
    requirement: { type: 'comments_created', count: 100 }
  },

  // Research
  {
    id: 'paper_curator',
    name: 'Paper Curator',
    description: 'Uploaded 10 research papers',
    icon: '📚',
    xp: 200,
    category: 'research',
    requirement: { type: 'papers_uploaded', count: 10 }
  },
  {
    id: 'peer_reviewer',
    name: 'Peer Reviewer',
    description: 'Reviewed 25 research papers',
    icon: '✍️',
    xp: 150,
    category: 'research',
    requirement: { type: 'reviews_written', count: 25 }
  },
  {
    id: 'citation_master',
    name: 'Citation Master',
    description: 'Exported 100 citations',
    icon: '📖',
    xp: 75,
    category: 'research',
    requirement: { type: 'citations_exported', count: 100 }
  },

  // Learning
  {
    id: 'eager_learner',
    name: 'Eager Learner',
    description: 'Enrolled in 5 courses',
    icon: '📖',
    xp: 50,
    category: 'learning',
    requirement: { type: 'courses_enrolled', count: 5 }
  },
  {
    id: 'course_completer',
    name: 'Course Completer',
    description: 'Completed your first course',
    icon: '🎓',
    xp: 200,
    category: 'learning',
    requirement: { type: 'courses_completed', count: 1 }
  },
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Achieved 100% on 10 quizzes',
    icon: '💯',
    xp: 150,
    category: 'learning',
    requirement: { type: 'perfect_quizzes', count: 10 }
  },

  // Teaching
  {
    id: 'course_creator',
    name: 'Course Creator',
    description: 'Created 5 courses',
    icon: '👨‍🏫',
    xp: 300,
    category: 'teaching',
    requirement: { type: 'courses_created', count: 5 }
  },
  {
    id: 'popular_instructor',
    name: 'Popular Instructor',
    description: 'Have 100 students enrolled in your courses',
    icon: '⭐',
    xp: 500,
    category: 'teaching',
    requirement: { type: 'total_students', count: 100 }
  },

  // Streaks
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Logged in for 7 consecutive days',
    icon: '🔥',
    xp: 50,
    category: 'dedication',
    requirement: { type: 'login_streak', count: 7 }
  },
  {
    id: 'month_master',
    name: 'Month Master',
    description: 'Logged in for 30 consecutive days',
    icon: '🔥🔥',
    xp: 200,
    category: 'dedication',
    requirement: { type: 'login_streak', count: 30 }
  },
  {
    id: 'year_legend',
    name: 'Year Legend',
    description: 'Logged in for 365 consecutive days',
    icon: '🔥🔥🔥',
    xp: 1000,
    category: 'dedication',
    requirement: { type: 'login_streak', count: 365 }
  },

  // Special
  {
    id: 'community_helper',
    name: 'Community Helper',
    description: 'Helped 10 new users get started',
    icon: '🤝',
    xp: 150,
    category: 'special',
    requirement: { type: 'users_helped', count: 10 }
  },
  {
    id: 'pioneer',
    name: 'Pioneer',
    description: 'One of the first 100 members',
    icon: '🏔️',
    xp: 500,
    category: 'special',
    requirement: { type: 'early_member', rank: 100 }
  }
];

export const GamificationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentXP, setRecentXP] = useState([]); // For showing XP notifications

  // Load user stats
  useEffect(() => {
    if (currentUser) {
      loadUserStats();
    } else {
      setUserStats(null);
      setLoading(false);
    }
  }, [currentUser]);

  const loadUserStats = () => {
    setLoading(true);

    // Get stats from localStorage or create new
    const storageKey = `gamification_${currentUser.id}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      setUserStats(JSON.parse(stored));
    } else {
      // Initialize new user stats
      const newStats = {
        xp: 0,
        level: 1,
        achievements: [],
        stats: {
          posts_created: 0,
          comments_created: 0,
          reactions_received: 0,
          papers_uploaded: 0,
          reviews_written: 0,
          citations_exported: 0,
          courses_created: 0,
          courses_enrolled: 0,
          courses_completed: 0,
          perfect_quizzes: 0,
          total_students: 0,
          login_streak: 1,
          users_helped: 0
        },
        lastLogin: new Date().toISOString(),
        joinDate: new Date().toISOString()
      };
      setUserStats(newStats);
      localStorage.setItem(storageKey, JSON.stringify(newStats));
    }

    setLoading(false);
  };

  const saveUserStats = (stats) => {
    const storageKey = `gamification_${currentUser.id}`;
    localStorage.setItem(storageKey, JSON.stringify(stats));
    setUserStats(stats);
  };

  // Calculate level from XP
  const calculateLevel = useCallback((xp) => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  }, []);

  // Get XP needed for next level
  const getXPForNextLevel = useCallback((level) => {
    if (level >= LEVEL_THRESHOLDS.length) {
      return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    }
    return LEVEL_THRESHOLDS[level];
  }, []);

  // Get current rank
  const getCurrentRank = useCallback((level) => {
    let currentRank = RANKS[1];
    Object.keys(RANKS).forEach(threshold => {
      if (level >= parseInt(threshold)) {
        currentRank = RANKS[threshold];
      }
    });
    return currentRank;
  }, []);

  // Award XP
  const awardXP = useCallback((action, customAmount = null) => {
    if (!currentUser || !userStats) return;

    const xpAmount = customAmount || XP_ACTIONS[action] || 0;
    if (xpAmount === 0) return;

    const newXP = userStats.xp + xpAmount;
    const oldLevel = userStats.level;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > oldLevel;

    // Add XP notification
    setRecentXP(prev => [
      ...prev,
      {
        id: Date.now(),
        action,
        amount: xpAmount,
        timestamp: new Date()
      }
    ]);

    // Remove notification after 3 seconds
    setTimeout(() => {
      setRecentXP(prev => prev.slice(1));
    }, 3000);

    const updatedStats = {
      ...userStats,
      xp: newXP,
      level: newLevel
    };

    // Award bonus XP for leveling up
    if (leveledUp) {
      updatedStats.xp += XP_ACTIONS.REACH_LEVEL_MILESTONE;
    }

    saveUserStats(updatedStats);

    return {
      xpAwarded: xpAmount,
      newXP,
      newLevel,
      leveledUp
    };
  }, [currentUser, userStats, calculateLevel]);

  // Update stat
  const updateStat = useCallback((statName, increment = 1) => {
    if (!currentUser || !userStats) return;

    const updatedStats = {
      ...userStats,
      stats: {
        ...userStats.stats,
        [statName]: (userStats.stats[statName] || 0) + increment
      }
    };

    saveUserStats(updatedStats);
    checkAchievements(updatedStats);
  }, [currentUser, userStats]);

  // Check for new achievements
  const checkAchievements = useCallback((stats) => {
    if (!stats) return;

    const unlockedAchievements = [...stats.achievements];
    let newAchievements = [];

    ACHIEVEMENTS.forEach(achievement => {
      // Skip if already unlocked
      if (unlockedAchievements.includes(achievement.id)) return;

      // Check if requirement is met
      if (achievement.requirement) {
        const { type, count, rank } = achievement.requirement;
        const statValue = stats.stats[type] || 0;

        if (count && statValue >= count) {
          newAchievements.push(achievement.id);
          unlockedAchievements.push(achievement.id);
          // Award achievement XP
          stats.xp += achievement.xp;
        } else if (rank && stats.stats.early_member && stats.stats.early_member <= rank) {
          newAchievements.push(achievement.id);
          unlockedAchievements.push(achievement.id);
          stats.xp += achievement.xp;
        }
      }
    });

    if (newAchievements.length > 0) {
      const updatedStats = {
        ...stats,
        achievements: unlockedAchievements,
        xp: stats.xp, // Already updated above
        level: calculateLevel(stats.xp)
      };
      saveUserStats(updatedStats);
    }
  }, [calculateLevel]);

  // Get progress to next level
  const getLevelProgress = useCallback(() => {
    if (!userStats) return { percent: 0, current: 0, needed: 100 };

    const currentLevelXP = LEVEL_THRESHOLDS[userStats.level - 1];
    const nextLevelXP = getXPForNextLevel(userStats.level);
    const xpInCurrentLevel = userStats.xp - currentLevelXP;
    const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

    return {
      percent: (xpInCurrentLevel / xpNeededForNextLevel) * 100,
      current: xpInCurrentLevel,
      needed: xpNeededForNextLevel
    };
  }, [userStats, getXPForNextLevel]);

  const value = {
    userStats,
    loading,
    recentXP,
    awardXP,
    updateStat,
    calculateLevel,
    getXPForNextLevel,
    getCurrentRank,
    getLevelProgress,
    XP_ACTIONS,
    ACHIEVEMENTS
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};
